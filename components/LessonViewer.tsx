"use client";

import { useState } from 'react';
import { Lesson, LessonStep } from '@/lib/lessons-data';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ChevronLeft, ChevronRight, Home } from 'lucide-react';
import ContentStep from '@/components/steps/ContentStep';
import VisualizationStep from '@/components/steps/VisualizationStep';
import MCQStep from '@/components/steps/MCQStep';

interface LessonViewerProps {
  lesson: Lesson;
  currentStep: number;
  onStepChange: (step: number) => void;
  onBackToMenu: () => void;
}

export default function LessonViewer({ 
  lesson, 
  currentStep, 
  onStepChange, 
  onBackToMenu 
}: LessonViewerProps) {
  const [mcqAnswered, setMcqAnswered] = useState(false);
  const currentStepData = lesson.steps[currentStep];
  const totalSteps = lesson.steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      onStepChange(currentStep + 1);
      setMcqAnswered(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      onStepChange(currentStep - 1);
      setMcqAnswered(false);
    }
  };

  const handleMCQAnswer = () => {
    setMcqAnswered(true);
  };

  const canProceed = currentStepData.type !== 'mcq' || mcqAnswered;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={onBackToMenu}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <Home className="w-4 h-4" />
              Back to Menu
            </Button>
            <div className="h-6 w-px bg-gray-300" />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Lesson {lesson.id}: {lesson.title}
              </h1>
              <p className="text-sm text-gray-500">
                Step {currentStep + 1} of {totalSteps}: {currentStepData.title}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500 min-w-[100px] text-right">
              {Math.round(progress)}% Complete
            </div>
            <Progress value={progress} className="w-32" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[600px]">
          {/* Step Content */}
          <div className="p-8">
            {currentStepData.type === 'content' && (
              <ContentStep step={currentStepData} />
            )}
            {currentStepData.type === 'visualization' && (
              <VisualizationStep step={currentStepData} />
            )}
            {currentStepData.type === 'mcq' && (
              <MCQStep step={currentStepData} onAnswer={handleMCQAnswer} />
            )}
          </div>

          {/* Navigation */}
          <div className="border-t border-gray-200 px-8 py-6 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {lesson.steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep
                      ? 'bg-blue-500'
                      : index < currentStep
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {currentStep < totalSteps - 1 ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed}
                className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                onClick={onBackToMenu}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600"
              >
                Complete Lesson
                <Home className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}