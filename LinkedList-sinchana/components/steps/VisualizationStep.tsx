// // "use client";

// // import { useState, useEffect, useCallback } from 'react';
// // import { LessonStep } from '@/lib/lessons-data';
// // import { Button } from '@/components/ui/button';
// // import { Play, Pause, RotateCcw, SkipForward } from 'lucide-react';
// // import LinkedListVisualization from '@/components/LinkedListVisualization';
// // import CodePanel from '@/components/CodePanel';
// // import OutputPanel from '@/components/OutputPanel';

// // interface VisualizationStepProps {
// //   step: LessonStep;
// // }

// // export default function VisualizationStep({ step }: VisualizationStepProps) {
// //   const [isPlaying, setIsPlaying] = useState(false);
// //   const [currentStepIndex, setCurrentStepIndex] = useState(0);
// //   const [outputHistory, setOutputHistory] = useState<string[]>([]);

// //   const code = step.code || [];
// //   const executionSteps = step.executionSteps || [];
// //   const visualization = step.visualization!;

// //   const currentStep = executionSteps.length > 0 ? executionSteps[currentStepIndex] : null;
// //   const currentVisualization = currentStep || visualization;

// //   useEffect(() => {
// //     let interval: NodeJS.Timeout;
    
// //     if (isPlaying && executionSteps.length > 0) {
// //       interval = setInterval(() => {
// //         setCurrentStepIndex(prev => {
// //           if (prev >= executionSteps.length - 1) {
// //             setIsPlaying(false);
// //             return prev;
// //           }
// //           return prev + 1;
// //         });
// //       }, 2000);
// //     }

// //     return () => {
// //       if (interval) clearInterval(interval);
// //     };
// //   }, [isPlaying, executionSteps.length]);

// //   useEffect(() => {
// //     if (currentStep?.outputText && currentStep.action === 'print') {
// //       setOutputHistory(prev => {
// //         const newOutput = currentStep.outputText!;
// //         if (prev[prev.length - 1] !== newOutput) {
// //           return [...prev, newOutput];
// //         }
// //         return prev;
// //       });
// //     }
// //   }, [currentStep]);

// //   const handlePlay = () => {
// //     setIsPlaying(!isPlaying);
// //   };

// //   const handleNext = useCallback(() => {
// //     if (currentStepIndex < executionSteps.length - 1) {
// //       setCurrentStepIndex(prev => prev + 1);
// //     }
// //   }, [currentStepIndex, executionSteps.length]);

// //   const handleReset = () => {
// //     setIsPlaying(false);
// //     setCurrentStepIndex(0);
// //     setOutputHistory([]);
// //   };

// //   return (
// //     <div>
// //       <h2 className="text-3xl font-bold text-gray-900 mb-6">
// //         {step.title}
// //       </h2>

// //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
// //         {/* Code Panel */}
// //         {code.length > 0 && (
// //           <div className="space-y-4">
// //             <div className="flex items-center gap-3">
// //               <h3 className="text-xl font-semibold text-gray-800">Pseudocode</h3>
// //               <div className="flex items-center gap-2">
// //                 <Button
// //                   size="sm"
// //                   onClick={handlePlay}
// //                   className="flex items-center gap-2"
// //                   disabled={executionSteps.length === 0}
// //                 >
// //                   {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
// //                   {isPlaying ? 'Pause' : 'Play'}
// //                 </Button>
// //                 <Button
// //                   size="sm"
// //                   onClick={handleNext}
// //                   className="flex items-center gap-2"
// //                   disabled={isPlaying || currentStepIndex >= executionSteps.length - 1}
// //                 >
// //                   <SkipForward className="w-4 h-4" />
// //                   Step
// //                 </Button>
// //                 <Button
// //                   size="sm"
// //                   variant="outline"
// //                   onClick={handleReset}
// //                   className="flex items-center gap-2"
// //                   disabled={executionSteps.length === 0}
// //                 >
// //                   <RotateCcw className="w-4 h-4" />
// //                   Reset
// //                 </Button>
// //               </div>
// //             </div>
// //             <CodePanel 
// //               code={code} 
// //               activeLineIndex={currentStep?.lineIndex ?? visualization.activeLineIndex}
// //               condition={currentStep?.condition}
// //             />
// //           </div>
// //         )}

// //         {/* Visualization Panel */}
// //         <div className="space-y-4">
// //           <h3 className="text-xl font-semibold text-gray-800">Visualization</h3>
// //           <LinkedListVisualization
// //             nodes={currentVisualization.nodes}
// //             pointers={currentVisualization.pointers}
// //           />
// //         </div>
// //       </div>

// //       {/* Output Panel */}
// //       {executionSteps.some(step => step.action === 'print') && (
// //         <div className="mb-6">
// //           <OutputPanel 
// //             output={outputHistory} 
// //             title="Execution Output"
// //           />
// //         </div>
// //       )}

// //       {/* Message */}
// //       {currentVisualization.message && (
// //         <div className={`border rounded-lg p-4 ${
// //           currentStep?.condition === false 
// //             ? 'bg-red-50 border-red-200' 
// //             : currentStep?.condition === true
// //             ? 'bg-green-50 border-green-200'
// //             : 'bg-blue-50 border-blue-200'
// //         }`}>
// //           <p className="text-blue-800 text-lg leading-relaxed">
// //             {currentVisualization.message}
// //           </p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { Button } from "@/components/ui/button";
// import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";
// import LinkedListVisualization from "@/components/LinkedListVisualization";
// import CodePanel from "@/components/CodePanel";
// import OutputPanel from "@/components/OutputPanel";

// /* --------------------------------------------
//    🧩 Generic Type Definitions
// --------------------------------------------- */
// export interface GenericCodeLine {
//   line: string;
//   highlight?: boolean;
// }

// export interface GenericExecutionStep {
//   lineIndex?: number;
//   action?: string;
//   condition?: boolean;
//   message?: string;
//   outputText?: string;
//   visualization?: GenericVisualization;
// }

// export interface GenericVisualization {
//   message?: string;
//   nodes?: any[];         // structure differs by domain (linked list, hash table, etc.)
//   pointers?: any[];
//   buckets?: any[];       // for hashing
//   table?: any;           // for arrays/tables
//   activeLineIndex?: number;
// }

// export interface GenericLessonStep {
//   id: string;
//   title: string;
//   type: string;
//   code?: GenericCodeLine[];
//   executionSteps?: GenericExecutionStep[];
//   visualization?: GenericVisualization;
// }

// interface VisualizationStepProps {
//   step: GenericLessonStep;
//   customVisualization?: React.ComponentType<{ visualization: GenericVisualization }>;
// }

// /* --------------------------------------------
//    ⚙️ Component Definition
// --------------------------------------------- */
// export default function VisualizationStep({
//   step,
//   customVisualization: CustomVisualization,
// }: VisualizationStepProps) {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentStepIndex, setCurrentStepIndex] = useState(0);
//   const [outputHistory, setOutputHistory] = useState<string[]>([]);

//   const code = step.code || [];
//   const executionSteps = step.executionSteps || [];
//   const visualization = step.visualization;

//   const currentStep =
//     executionSteps.length > 0 ? executionSteps[currentStepIndex] : null;
//   const currentVisualization =
//     currentStep?.visualization || visualization || {};

//   /* --------------------------------------------
//      ⏱️ Animation Controls
//   --------------------------------------------- */
//   useEffect(() => {
//     let interval: NodeJS.Timeout;

//     if (isPlaying && executionSteps.length > 0) {
//       interval = setInterval(() => {
//         setCurrentStepIndex((prev) => {
//           if (prev >= executionSteps.length - 1) {
//             setIsPlaying(false);
//             return prev;
//           }
//           return prev + 1;
//         });
//       }, 2000);
//     }

//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [isPlaying, executionSteps.length]);

//   /* --------------------------------------------
//      📤 Output Panel Handling
//   --------------------------------------------- */
//   useEffect(() => {
//     if (currentStep?.outputText && currentStep.action === "print") {
//       setOutputHistory((prev) => {
//         const newOutput = currentStep.outputText!;
//         if (prev[prev.length - 1] !== newOutput) {
//           return [...prev, newOutput];
//         }
//         return prev;
//       });
//     }
//   }, [currentStep]);

//   /* --------------------------------------------
//      🎛️ Handlers
//   --------------------------------------------- */
//   const handlePlay = () => setIsPlaying((prev) => !prev);
//   const handleNext = useCallback(() => {
//     if (currentStepIndex < executionSteps.length - 1) {
//       setCurrentStepIndex((prev) => prev + 1);
//     }
//   }, [currentStepIndex, executionSteps.length]);
//   const handleReset = () => {
//     setIsPlaying(false);
//     setCurrentStepIndex(0);
//     setOutputHistory([]);
//   };

//   /* --------------------------------------------
//      🧠 UI Rendering
//   --------------------------------------------- */
//   return (
//     <div>
//       <h2 className="text-3xl font-bold text-gray-900 mb-6">{step.title}</h2>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
//         {/* 🧾 Code Panel */}
//         {code.length > 0 && (
//           <div className="space-y-4">
//             <div className="flex items-center gap-3">
//               <h3 className="text-xl font-semibold text-gray-800">Pseudocode</h3>
//               <div className="flex items-center gap-2">
//                 <Button
//                   size="sm"
//                   onClick={handlePlay}
//                   className="flex items-center gap-2"
//                   disabled={executionSteps.length === 0}
//                 >
//                   {isPlaying ? (
//                     <Pause className="w-4 h-4" />
//                   ) : (
//                     <Play className="w-4 h-4" />
//                   )}
//                   {isPlaying ? "Pause" : "Play"}
//                 </Button>
//                 <Button
//                   size="sm"
//                   onClick={handleNext}
//                   className="flex items-center gap-2"
//                   disabled={isPlaying || currentStepIndex >= executionSteps.length - 1}
//                 >
//                   <SkipForward className="w-4 h-4" />
//                   Step
//                 </Button>
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   onClick={handleReset}
//                   className="flex items-center gap-2"
//                   disabled={executionSteps.length === 0}
//                 >
//                   <RotateCcw className="w-4 h-4" />
//                   Reset
//                 </Button>
//               </div>
//             </div>
//             <CodePanel
//               code={code.map((line) => line.line)}
//               activeLineIndex={
//                 currentStep?.lineIndex ?? visualization?.activeLineIndex
//               }
//               condition={currentStep?.condition}
//             />
//           </div>
//         )}

//         {/* 🎨 Visualization Panel */}
//         <div className="space-y-4">
//           <h3 className="text-xl font-semibold text-gray-800">Visualization</h3>
//           {CustomVisualization ? (
//             <CustomVisualization visualization={currentVisualization} />
//           ) : (
//             // Default: Linked List Visualization
//             <LinkedListVisualization
//               nodes={currentVisualization.nodes || []}
//               pointers={currentVisualization.pointers || []}
//             />
//           )}
//         </div>
//       </div>

//       {/* 🖥️ Output Panel */}
//       {executionSteps.some((s) => s.action === "print") && (
//         <div className="mb-6">
//           <OutputPanel output={outputHistory} title="Execution Output" />
//         </div>
//       )}

//       {/* 💬 Message Section */}
//       {currentVisualization.message && (
//         <div
//           className={`border rounded-lg p-4 ${
//             currentStep?.condition === false
//               ? "bg-red-50 border-red-200"
//               : currentStep?.condition === true
//               ? "bg-green-50 border-green-200"
//               : "bg-blue-50 border-blue-200"
//           }`}
//         >
//           <p className="text-blue-800 text-lg leading-relaxed">
//             {currentVisualization.message}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";
import LinkedListVisualization from "@/components/LinkedListVisualization";
import HashVisualization, { HashSlot } from "@/components/HashVisualization";
import CodePanel from "@/components/CodePanel";
import OutputPanel from "@/components/OutputPanel";

/* --------------------------------------------
   🧩 Generic Type Definitions
--------------------------------------------- */
export interface GenericCodeLine {
  line: string;
  highlight?: boolean;
}

export interface GenericExecutionStep {
  lineIndex?: number;
  action?: string;
  condition?: boolean;
  message?: string;
  outputText?: string;
  visualization?: GenericVisualization;
}

export interface GenericVisualization {
  message?: string;
  nodes?: any[];
  pointers?: any[];
  slots?: HashSlot[];
  activeLineIndex?: number;
  activeSlotIndex?: number;
  hashValue?: number;
}

export interface GenericLessonStep {
  id: string;
  title: string;
  type: string; // "linkedlist" | "hash" | etc
  code?: GenericCodeLine[];
  executionSteps?: GenericExecutionStep[];
  visualization?: GenericVisualization;
}

/* --------------------------------------------
   ⚙️ Component Definition
--------------------------------------------- */
interface VisualizationStepProps {
  step: GenericLessonStep;
}

export default function VisualizationStep({ step }: VisualizationStepProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [outputHistory, setOutputHistory] = useState<string[]>([]);

  const code = step.code || [];
  const executionSteps = step.executionSteps || [];
  const visualization = step.visualization;

  const currentStep =
    executionSteps.length > 0 ? executionSteps[currentStepIndex] : null;
  const currentVisualization =
    currentStep?.visualization || visualization || {};

  /* --------------------------------------------
     ⏱️ Animation Controls
  --------------------------------------------- */
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && executionSteps.length > 0) {
      interval = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= executionSteps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 2000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, executionSteps.length]);

  /* --------------------------------------------
     📤 Output Panel Handling
  --------------------------------------------- */
  useEffect(() => {
    if (currentStep?.outputText && currentStep.action === "print") {
      setOutputHistory((prev) => {
        const newOutput = currentStep.outputText!;
        if (prev[prev.length - 1] !== newOutput) {
          return [...prev, newOutput];
        }
        return prev;
      });
    }
  }, [currentStep]);

  /* --------------------------------------------
     🎛️ Handlers
  --------------------------------------------- */
  const handlePlay = () => setIsPlaying((prev) => !prev);
  const handleNext = useCallback(() => {
    if (currentStepIndex < executionSteps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  }, [currentStepIndex, executionSteps.length]);
  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
    setOutputHistory([]);
  };

  /* --------------------------------------------
     🧠 UI Rendering
  --------------------------------------------- */
  const isHashLesson = step.type === "hash" && currentVisualization.slots;

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">{step.title}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
        {/* 🧾 Code Panel */}
        {code.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-semibold text-gray-800">Pseudocode</h3>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  onClick={handlePlay}
                  className="flex items-center gap-2"
                  disabled={executionSteps.length === 0}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? "Pause" : "Play"}
                </Button>
                <Button
                  size="sm"
                  onClick={handleNext}
                  className="flex items-center gap-2"
                  disabled={isPlaying || currentStepIndex >= executionSteps.length - 1}
                >
                  <SkipForward className="w-4 h-4" />
                  Step
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleReset}
                  className="flex items-center gap-2"
                  disabled={executionSteps.length === 0}
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </Button>
              </div>
            </div>
            <CodePanel
              code={code.map((line) => line.line)}
              activeLineIndex={currentStep?.lineIndex ?? currentVisualization?.activeLineIndex}
              condition={currentStep?.condition}
            />
          </div>
        )}

        {/* 🎨 Visualization Panel */}
 <div className="space-y-4">
  <h3 className="text-xl font-semibold text-gray-800">Visualization</h3>

  {currentVisualization.slots ? (
    // Render hash visualization if slots exist
    <HashVisualization
      visualization={{
        slots: currentVisualization.slots,
        activeSlotIndex: currentVisualization.activeSlotIndex,
        message: currentVisualization.message,
        hashValue: currentVisualization.hashValue,
        outputText: currentStep?.outputText, // optional
      }}
    />
  ) : (
    // Default: linked list visualization
    <LinkedListVisualization
      nodes={currentVisualization.nodes || []}
      pointers={currentVisualization.pointers || []}
    />
  )}
</div>
      </div>

      {/* 🖥️ Output Panel */}
      {executionSteps.some((s) => s.action === "print") && (
        <div className="mb-6">
          <OutputPanel output={outputHistory} title="Execution Output" />
        </div>
      )}

      {/* 💬 Message Section */}
      {currentVisualization.message && (
        <div
          className={`border rounded-lg p-4 ${
            currentStep?.condition === false
              ? "bg-red-50 border-red-200"
              : currentStep?.condition === true
              ? "bg-green-50 border-green-200"
              : "bg-blue-50 border-blue-200"
          }`}
        >
          <p className="text-blue-800 text-lg leading-relaxed">
            {currentVisualization.message}
          </p>
        </div>
      )}
    </div>
  );
}
