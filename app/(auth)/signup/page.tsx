'use client';
import { auth, db } from './../../../lib/firebase';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {Input}  from '../../../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader2, Mail, User, Lock, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(72, 'Password must be less than 72 characters')
    .regex(/^(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter and one number'),
  confirmPassword: z.string(),
  experienceLevel: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  primaryLanguage: z.enum(['cpp', 'java', 'python', 'javascript']).optional(),
  learningGoals: z.array(z.string()).optional(),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and privacy policy',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type SignupForm = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const form = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false,
      learningGoals: [],
    },
  });

const onSubmit = async (values: SignupForm) => {
  setIsLoading(true);
  setServerError(null);

  try {
    // 1. Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );

    const user = userCredential.user;

    // 2. Update profile (optional: set displayName)
    await updateProfile(user, {
      displayName: values.name,
    });

    // 3. Store extra details in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: values.name,
      email: values.email,
      experienceLevel: values.experienceLevel || null,
      primaryLanguage: values.primaryLanguage || null,
      learningGoals: values.learningGoals || [],
      createdAt: new Date().toISOString(),
    });

    toast.success("Account created! Redirecting...");
    setTimeout(() => {
      router.replace("/linkedlist");
    }, 1000);
  } catch (error: any) {
    if (error.code === "auth/email-already-in-use") {
      setServerError("An account with this email already exists");
      form.setError("email", {
        type: "manual",
        message: "An account with this email already exists",
      });
    } else {
      setServerError(error.message || "Something went wrong. Please try again.");
    }
  } finally {
    setIsLoading(false);
  }
};

  const learningGoalOptions = [
    { id: 'interviews', label: 'Technical Interviews' },
    { id: 'academics', label: 'Academic Studies' },
    { id: 'skill-building', label: 'Skill Building' },
    { id: 'competitive', label: 'Competitive Programming' },
  ];

  const handleGoalChange = (goalId: string, checked: boolean) => {
    if (checked) {
      setSelectedGoals(prev => [...prev, goalId]);
    } else {
      setSelectedGoals(prev => prev.filter(id => id !== goalId));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="bg-gray-900/60 border-gray-700 rounded-2xl shadow-2xl backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              Create your account
            </CardTitle>
            <p className="text-gray-400 mt-2">Start learning DSA with personalized lessons</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {serverError && (
              <Alert className="border-red-500 bg-red-500/10">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <AlertDescription className="text-red-400">{serverError}</AlertDescription>
              </Alert>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white flex items-center gap-1">
                        <User className="h-4 w-4" />
                        Full Name *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter your full name"
                          className="bg-gray-900/60 border-gray-700 text-white placeholder:text-gray-400 focus:ring-purple-500/40"
                          aria-invalid={!!form.formState.errors.name}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        Email *
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Enter your email"
                          className="bg-gray-900/60 border-gray-700 text-white placeholder:text-gray-400 focus:ring-purple-500/40"
                          aria-invalid={!!form.formState.errors.email}
                        />
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white flex items-center gap-1">
                        <Lock className="h-4 w-4" />
                        Password *
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Create a strong password"
                            className="bg-gray-900/60 border-gray-700 text-white placeholder:text-gray-400 focus:ring-purple-500/40 pr-10"
                            aria-invalid={!!form.formState.errors.password}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white flex items-center gap-1">
                        <Lock className="h-4 w-4" />
                        Confirm Password *
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            type={showConfirmPassword ? 'text' : 'password'}
                            placeholder="Confirm your password"
                            className="bg-gray-900/60 border-gray-700 text-white placeholder:text-gray-400 focus:ring-purple-500/40 pr-10"
                            aria-invalid={!!form.formState.errors.confirmPassword}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                          >
                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="experienceLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Experience Level</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-gray-900/60 border-gray-700 text-white">
                              <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-gray-900 border-gray-700">
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="primaryLanguage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Primary Language</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-gray-900/60 border-gray-700 text-white">
                              <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-gray-900 border-gray-700">
                            <SelectItem value="cpp">C++</SelectItem>
                            <SelectItem value="java">Java</SelectItem>
                            <SelectItem value="python">Python</SelectItem>
                            <SelectItem value="javascript">JavaScript</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <FormLabel className="text-white mb-3 block">Learning Goals</FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {learningGoalOptions.map((goal) => (
                      <div key={goal.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={goal.id}
                          checked={selectedGoals.includes(goal.id)}
                          onCheckedChange={(checked) => handleGoalChange(goal.id, !!checked)}
                          className="border-gray-700 data-[state=checked]:bg-purple-500"
                        />
                        <label
                          htmlFor={goal.id}
                          className="text-sm text-gray-300 cursor-pointer"
                        >
                          {goal.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="border-gray-700 data-[state=checked]:bg-purple-500"
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-gray-300">
                          I accept the{' '}
                          <Link href="/terms" className="text-blue-400 hover:text-blue-300 underline">
                            Terms of Service
                          </Link>{' '}
                          and{' '}
                          <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline">
                            Privacy Policy
                          </Link>{' '}
                          *
                        </FormLabel>
                        <FormMessage className="text-red-400" />
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg border-0 transition-all duration-300 transform hover:scale-[1.02]"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </form>
            </Form>

            <div className="text-center pt-4">
              <p className="text-gray-400">
                Already have an account?{' '}
                <Link 
                  href="/login" 
                  className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                >
                  Log in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

