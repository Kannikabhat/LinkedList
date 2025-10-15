
// "use client";

// import { useState, useEffect, useCallback, useMemo } from "react";
// import { Button } from "@/components/ui/button";
// import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";
// import LinkedListVisualization from "@/components/LinkedListVisualization";
// import HashVisualization, { HashSlot, HashExecutionStep } from "@/components/HashVisualization";
// import CodePanel from "@/components/CodePanel";
// import OutputPanel from "@/components/OutputPanel";

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
//   visualization?: {
//     slots?: HashSlot[];
//     activeSlotIndex?: number;
//     message?: string;
//     hashValue?: number;
//     nodes?: any[];
//     pointers?: any[];
//   };
// }

// export interface GenericLessonStep {
//   id: string;
//   title: string;
//   type: string;
//   code?: (string | GenericCodeLine)[];
//   executionSteps?: GenericExecutionStep[];
//   visualization?: {
//     slots?: HashSlot[];
//     activeSlotIndex?: number;
//     message?: string;
//     hashValue?: number;
//     nodes?: any[];
//     pointers?: any[];
//   };
// }

// interface VisualizationStepProps {
//   step: GenericLessonStep;
// }

// export default function VisualizationStep({ step }: VisualizationStepProps) {
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentStepIndex, setCurrentStepIndex] = useState(0);
//   const [outputHistory, setOutputHistory] = useState<string[]>([]);

//   const codeRaw = step.code ?? [];
//   const codeLines: string[] = codeRaw.map((c) => (typeof c === "string" ? c : c.line));
//   const executionSteps = step.executionSteps ?? [];
//   const currentStep = executionSteps.length > 0 ? executionSteps[currentStepIndex] : null;
//   const currentVisualization = currentStep?.visualization ?? step.visualization ?? {};

//   // ---------------- Animation Controls ----------------
//   useEffect(() => {
//     if (!isPlaying || executionSteps.length === 0) return;

//     const interval = setInterval(() => {
//       setCurrentStepIndex((prev) => {
//         if (prev >= executionSteps.length - 1) {
//           setIsPlaying(false);
//           return prev;
//         }
//         return prev + 1;
//       });
//     }, 2000);

//     return () => clearInterval(interval);
//   }, [isPlaying, executionSteps.length]);

//   // ---------------- Output Panel ----------------
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

//   // ---------------- Handlers ----------------
//   const handlePlay = () => {
//     if (currentStepIndex >= executionSteps.length - 1 && executionSteps.length > 0) {
//       setCurrentStepIndex(0);
//       setTimeout(() => setIsPlaying(true), 0);
//       return;
//     }
//     setIsPlaying((prev) => !prev);
//   };

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

//   // ---------------- Visualization Props ----------------
//   const isHashLesson = useMemo(
//     () =>
//       (currentVisualization.slots?.length ?? 0) > 0 ||
//       executionSteps.some((s) => (s.visualization?.slots?.length ?? 0) > 0),
//     [currentVisualization, executionSteps]
//   );

//   const visualizationProp = {
//     slots: currentStep?.visualization?.slots ?? currentVisualization.slots ?? [],
//     activeSlotIndex:
//       currentStep?.visualization?.activeSlotIndex ?? currentVisualization.activeSlotIndex,
//     message:
//       currentStep?.visualization?.message ?? currentStep?.message ?? currentVisualization.message,
//     hashValue: currentStep?.visualization?.hashValue ?? currentVisualization.hashValue,
//     outputText: currentStep?.outputText,
//     code: codeLines,
//   };

//   const hashExecutionSteps: HashExecutionStep[] = useMemo(
//     () =>
//       executionSteps
//         .filter((s) => s.visualization?.slots && s.visualization.slots.length > 0)
//         .map((s) => s as HashExecutionStep),
//     [executionSteps]
//   );

//   // ---------------- Render ----------------
//   return (
//     <div>
//       <h2 className="text-3xl font-bold text-gray-900 mb-6">{step.title}</h2>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
//         {/* Code Panel + Controls */}
//         <div className="space-y-4">
//           {codeLines.length > 0 && <h3 className="text-xl font-semibold text-gray-800">Pseudocode</h3>}

//           {executionSteps.length > 0 && (
//             <div className="flex items-center gap-2">
//               <Button size="sm" onClick={handlePlay} disabled={executionSteps.length === 0}>
//                 {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
//                 {isPlaying ? "Pause" : "Play"}
//               </Button>
//               <Button
//                 size="sm"
//                 onClick={handleNext}
//                 disabled={isPlaying || currentStepIndex >= executionSteps.length - 1}
//               >
//                 <SkipForward className="w-4 h-4" />
//                 Step
//               </Button>
//               <Button size="sm" variant="outline" onClick={handleReset}>
//                 <RotateCcw className="w-4 h-4" />
//                 Reset
//               </Button>
//             </div>
//           )}

//           {codeLines.length > 0 && (
//             <CodePanel
//               code={codeLines}
//               activeLineIndex={currentStep?.lineIndex}
//               condition={currentStep?.condition}
//             />
//           )}
//         </div>

//         {/* Visualization Panel */}
//         <div className="space-y-4">
//           <h3 className="text-xl font-semibold text-gray-800">Visualization</h3>
//           {isHashLesson ? (
//             <HashVisualization
//               visualization={visualizationProp}
//               executionSteps={hashExecutionSteps}
//               currentStepIndex={currentStepIndex}
//             />
//           ) : (
//             <LinkedListVisualization
//               nodes={currentVisualization.nodes ?? []}
//               pointers={currentVisualization.pointers ?? []}
//             />
//           )}
//         </div>
//       </div>

//       {/* Output Panel */}
//       {executionSteps.some((s) => s.action === "print") && (
//         <div className="mb-6">
//           <OutputPanel output={outputHistory} title="Execution Output" />
//         </div>
//       )}

//       {/* Message Section */}
//       {currentStep?.message && (
//         <div
//           className={`border rounded-lg p-4 ${
//             currentStep?.condition === false
//               ? "bg-red-50 border-red-200"
//               : currentStep?.condition === true
//               ? "bg-green-50 border-green-200"
//               : "bg-blue-50 border-blue-200"
//           }`}
//         >
//           <p className="text-blue-800 text-lg leading-relaxed">{currentStep.message}</p>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, SkipForward } from "lucide-react";
import LinkedListVisualization from "@/components/LinkedListVisualization";
import HashVisualization, { HashSlot, HashExecutionStep } from "@/components/HashVisualization";
import CodePanel from "@/components/CodePanel";
import OutputPanel from "@/components/OutputPanel";

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
  visualization?: {
    slots?: HashSlot[];
    activeSlotIndex?: number;
    message?: string;
    hashValue?: number;
    nodes?: any[];
    pointers?: any[];
  };
}

export interface GenericLessonStep {
  id: string;
  title: string;
  type: string;
  code?: (string | GenericCodeLine)[];
  executionSteps?: GenericExecutionStep[];
  visualization?: {
    slots?: HashSlot[];
    activeSlotIndex?: number;
    message?: string;
    hashValue?: number;
    nodes?: any[];
    pointers?: any[];
  };
}

interface VisualizationStepProps {
  step: GenericLessonStep;
}

export default function VisualizationStep({ step }: VisualizationStepProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [outputHistory, setOutputHistory] = useState<string[]>([]);

  const codeRaw = step.code ?? [];
  const codeLines: string[] = codeRaw.map((c) => (typeof c === "string" ? c : c.line));
  const executionSteps = step.executionSteps ?? [];
  const currentStep = executionSteps.length > 0 ? executionSteps[currentStepIndex] : null;
  const currentVisualization = currentStep?.visualization ?? step.visualization ?? {};

  // ---------------- Animation Controls ----------------
  useEffect(() => {
    if (!isPlaying || executionSteps.length === 0) return;

    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev >= executionSteps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying, executionSteps.length]);

  // ---------------- Output Panel ----------------
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

  // ---------------- Handlers ----------------
  const handlePlay = () => {
    if (currentStepIndex >= executionSteps.length - 1 && executionSteps.length > 0) {
      setCurrentStepIndex(0);
      setTimeout(() => setIsPlaying(true), 0);
      return;
    }
    setIsPlaying((prev) => !prev);
  };

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

  // ---------------- Visualization Props ----------------
  const isHashLesson = useMemo(
    () =>
      (currentVisualization.slots?.length ?? 0) > 0 ||
      executionSteps.some((s) => (s.visualization?.slots?.length ?? 0) > 0),
    [currentVisualization, executionSteps]
  );

  const visualizationProp = {
    slots: currentStep?.visualization?.slots ?? currentVisualization.slots ?? [],
    activeSlotIndex:
      currentStep?.visualization?.activeSlotIndex ?? currentVisualization.activeSlotIndex,
    message:
      currentStep?.visualization?.message ?? currentStep?.message ?? currentVisualization.message,
    hashValue: currentStep?.visualization?.hashValue ?? currentVisualization.hashValue,
    outputText: currentStep?.outputText,
    code: codeLines,
  };

  const hashExecutionSteps: HashExecutionStep[] = useMemo(
    () =>
      executionSteps
        .filter((s) => s.visualization?.slots && s.visualization.slots.length > 0)
        .map((s) => s as HashExecutionStep),
    [executionSteps]
  );

  // ---------------- Render ----------------
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">{step.title}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
        {/* Code Panel + Controls */}
        <div className="space-y-4">
          {codeLines.length > 0 && <h3 className="text-xl font-semibold text-gray-800">Pseudocode</h3>}

          {executionSteps.length > 0 && (
            <div className="flex items-center gap-2">
              <Button size="sm" onClick={handlePlay} disabled={executionSteps.length === 0}>
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying ? "Pause" : "Play"}
              </Button>
              <Button
                size="sm"
                onClick={handleNext}
                disabled={isPlaying || currentStepIndex >= executionSteps.length - 1}
              >
                <SkipForward className="w-4 h-4" />
                Step
              </Button>
              <Button size="sm" variant="outline" onClick={handleReset}>
                <RotateCcw className="w-4 h-4" />
                Reset
              </Button>
            </div>
          )}

          {codeLines.length > 0 && (
            <CodePanel
              code={codeLines}
              activeLineIndex={currentStep?.lineIndex}
              condition={currentStep?.condition}
            />
          )}
        </div>

        {/* Visualization Panel */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">Visualization</h3>
          {isHashLesson ? (
            <HashVisualization
              visualization={visualizationProp}
              executionSteps={hashExecutionSteps}
              //currentStepIndex={currentStepIndex}
            />
          ) : (
            <LinkedListVisualization
              nodes={currentVisualization.nodes ?? []}
              pointers={currentVisualization.pointers ?? []}
            />
          )}
        </div>
      </div>

      {/* Output Panel */}
      {executionSteps.some((s) => s.action === "print") && (
        <div className="mb-6">
          <OutputPanel output={outputHistory} title="Execution Output" />
        </div>
      )}

      {/* Message Section */}
      {currentStep?.message && (
        <div
          className={`border rounded-lg p-4 ${
            currentStep?.condition === false
              ? "bg-red-50 border-red-200"
              : currentStep?.condition === true
              ? "bg-green-50 border-green-200"
              : "bg-blue-50 border-blue-200"
          }`}
        >
          <p className="text-blue-800 text-lg leading-relaxed">{currentStep.message}</p>
        </div>
      )}
    </div>
  );
}
