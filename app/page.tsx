"use client"; // Ensure this is a client component

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, BookOpen, PlayCircle } from "lucide-react";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white p-6">
      <motion.h1
        className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to DSA AI Tutor
      </motion.h1>

      <motion.p
        className="text-lg text-gray-300 mb-6 text-center max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Your personal AI-powered Data Structures & Algorithms learning assistant.
      </motion.p>

      {/* Navigation Buttons */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-gray-800 p-6 shadow-2xl rounded-2xl border border-gray-700"
      >
        <Card className="p-6 text-center">
          <p className="text-gray-300 text-lg">Start learning with interactive lessons.</p>
          
          <Button 
            onClick={() => router.push("/signup")} 
            className="mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Get Started
          </Button>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-6 flex items-center space-x-6"
      >
        <motion.div
          whileHover={{ scale: 1.2, rotate: 10 }}
          className="p-4 bg-yellow-500 rounded-full shadow-xl"
        >
          <Trophy className="w-12 h-12 text-white" />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.2, rotate: -10 }}
          className="p-4 bg-green-500 rounded-full shadow-xl"
        >
          <BookOpen className="w-12 h-12 text-white" />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.2, rotate: 10 }}
          className="p-4 bg-red-500 rounded-full shadow-xl"
        >
          <PlayCircle className="w-12 h-12 text-white" />
        </motion.div>
      </motion.div>
    </div>
  );
}





