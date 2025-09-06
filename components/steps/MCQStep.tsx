"use client";

import { useState } from 'react';
import { LessonStep } from '@/lib/lessons-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react';

interface MCQStepProps {
  step: LessonStep;
  onAnswer: () => void;
}

export default function MCQStep({ step, onAnswer }: MCQStepProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const mcq = step.mcq!;

  const handleOptionSelect = (optionId: string) => {
    if (showFeedback) return;
    
    setSelectedOption(optionId);
    setShowFeedback(true);
    onAnswer();
  };

  const selectedOptionData = mcq.options.find(opt => opt.id === selectedOption);
  const isCorrect = selectedOptionData?.isCorrect || false;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <HelpCircle className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {step.title}
        </h2>
        <p className="text-lg text-gray-600">
          Test your understanding with this quick question
        </p>
      </div>

      <Card className="mb-8 border-2 border-gray-200">
        <CardContent className="p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 leading-relaxed">
            {mcq.question}
          </h3>

          <div className="space-y-4">
            {mcq.options.map((option) => {
              let buttonClass = "w-full p-6 text-left text-lg rounded-lg border-2 transition-all duration-200 ";
              
              if (!showFeedback) {
                buttonClass += selectedOption === option.id 
                  ? "border-blue-500 bg-blue-50 text-blue-900" 
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50 text-gray-700";
              } else {
                if (option.isCorrect) {
                  buttonClass += "border-green-500 bg-green-50 text-green-900";
                } else if (selectedOption === option.id && !option.isCorrect) {
                  buttonClass += "border-red-500 bg-red-50 text-red-900";
                } else {
                  buttonClass += "border-gray-200 bg-gray-50 text-gray-500";
                }
              }

              return (
                <Button
                  key={option.id}
                  onClick={() => handleOptionSelect(option.id)}
                  className={buttonClass}
                  disabled={showFeedback}
                  variant="ghost"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-medium">
                      {option.id.toUpperCase()}) {option.text}
                    </span>
                    {showFeedback && (
                      <span>
                        {option.isCorrect ? (
                          <CheckCircle2 className="w-6 h-6 text-green-600" />
                        ) : selectedOption === option.id ? (
                          <XCircle className="w-6 h-6 text-red-600" />
                        ) : null}
                      </span>
                    )}
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Feedback */}
      {showFeedback && (
        <Card className={`border-2 ${isCorrect ? 'border-green-500' : 'border-red-500'}`}>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isCorrect ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
              <div>
                <h4 className={`font-semibold text-lg mb-2 ${
                  isCorrect ? 'text-green-800' : 'text-red-800'
                }`}>
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </h4>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {mcq.explanation}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}