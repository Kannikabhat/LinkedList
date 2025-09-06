"use client";

import { lessons } from '@/lib/lessons-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Clock, Target } from 'lucide-react';

interface LessonSelectorProps {
  onLessonSelect: (lessonId: number) => void;
}

export default function LessonSelector({ onLessonSelect }: LessonSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            DSA Tutor: Linked Lists
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Master linked lists through interactive visualizations, step-by-step explanations, 
            and hands-on practice. Learn with synchronized pseudocode execution and engaging quizzes.
          </p>
          <div className="flex justify-center items-center gap-8 mt-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              <span>6 Comprehensive Lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              <span>Interactive Visualizations</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>Self-Paced Learning</span>
            </div>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <Card 
              key={lesson.id} 
              className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    {lesson.id}
                  </div>
                  <div className="text-xs text-gray-500">
                    {lesson.steps.length} steps
                  </div>
                </div>
                <CardTitle className="text-xl text-gray-900 leading-tight">
                  {lesson.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-gray-600 mb-6 leading-relaxed text-base">
                  {lesson.description}
                </CardDescription>
                <Button 
                  onClick={() => onLessonSelect(lesson.id)}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200"
                >
                  Start Lesson
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500">
          <p className="text-lg">
            Ready to master linked lists? Choose a lesson above to begin your journey!
          </p>
        </div>
      </div>
    </div>
  );
}