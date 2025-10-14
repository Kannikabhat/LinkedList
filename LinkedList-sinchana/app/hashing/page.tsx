// "use client";

// import { useState } from 'react';
// import { hashingLessons } from '@/lib/hashing-data';
// import LessonViewer from '@/components/LessonViewer';
// import LessonSelector from '@/components/LessonSelector';

// export default function Home() {
//   const [currentLessonId, setCurrentLessonId] = useState<number | null>(null);
//   const [currentStep, setCurrentStep] = useState(0);

//   const handleLessonSelect = (lessonId: number) => {
//     setCurrentLessonId(lessonId);
//     setCurrentStep(0);
//   };

//   const handleBackToMenu = () => {
//     setCurrentLessonId(null);
//     setCurrentStep(0);
//   };

//   const handleStepChange = (step: number) => {
//     setCurrentStep(step);
//   };

//   if (currentLessonId === null) {
//     return <LessonSelector onLessonSelect={handleLessonSelect} />;
//   }

//   const currentLesson = hashingLessons.find(l => l.id === currentLessonId);
//   if (!currentLesson) {
//     return <div>Lesson not found</div>;
//   }

//   return (
//     <LessonViewer
//       lesson={currentLesson}
//       currentStep={currentStep}
//       onStepChange={handleStepChange}
//       onBackToMenu={handleBackToMenu}
//     />
//   );
// }

"use client";

import { useState } from 'react';
import { hashingLessons } from '@/lib/hashing-data';
import HashLessonViewer from '@/components/HashLessonViewer'
import LessonSelector from '@/components/LessonSelector';

export default function HashingPage() {
  const [currentLessonId, setCurrentLessonId] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const handleLessonSelect = (lessonId: number) => {
    setCurrentLessonId(lessonId);
    setCurrentStep(0);
  };

  const handleBackToMenu = () => {
    setCurrentLessonId(null);
    setCurrentStep(0);
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  if (currentLessonId === null) {
    return <LessonSelector lessons={hashingLessons} topic="Hashing" onLessonSelect={handleLessonSelect} />;
  }

  const currentLesson = hashingLessons.find(l => l.id === currentLessonId);
  if (!currentLesson) return <div>Lesson not found</div>;

  return (
   <HashLessonViewer
  lesson={currentLesson}
  currentStep={currentStep}
  onStepChange={handleStepChange}
  onBackToMenu={handleBackToMenu}
/>
  );
}
