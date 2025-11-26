// import { useState, useEffect } from "react";
// import {
//   Play,
//   Pause,
//   SkipBack,
//   SkipForward,
//   RotateCcw,
// } from "lucide-react";

// import type { VisualizationStep } from "@/lib/turing-machine/types";

// interface SortingTMVisualizationProps {
//   steps: VisualizationStep[];
// }

// export default function SortingTMVisualization({
//   steps,
// }: SortingTMVisualizationProps) {
//   const [currentStepIndex, setCurrentStepIndex] = useState(0);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [speed, setSpeed] = useState(1000);

//   const currentStep = steps[currentStepIndex];

//   useEffect(() => {
//     let interval: ReturnType<typeof setInterval> | undefined;

//     if (isPlaying && currentStepIndex < steps.length - 1) {
//       interval = setInterval(() => {
//         setCurrentStepIndex((prev) => {
//           if (prev >= steps.length - 1) {
//             setIsPlaying(false);
//             return prev;
//           }
//           return prev + 1;
//         });
//       }, speed);
//     }

//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [isPlaying, currentStepIndex, steps.length, speed]);

//   const handleNext = () => {
//     if (currentStepIndex < steps.length - 1) {
//       setCurrentStepIndex(currentStepIndex + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentStepIndex > 0) {
//       setCurrentStepIndex(currentStepIndex - 1);
//     }
//   };

//   const handleReset = () => {
//     setCurrentStepIndex(0);
//     setIsPlaying(false);
//   };

//   const togglePlay = () => {
//     if (currentStepIndex >= steps.length - 1) {
//       setCurrentStepIndex(0);
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const getHighlightColor = (index: number): string | null => {
//     if (!currentStep.highlights) return null;
//     const highlight = currentStep.highlights.find((h) => h.index === index);
//     return highlight ? highlight.color : null;
//   };

//   return (
//     <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold text-gray-800 mb-2">
//           Turing Machine: Insertion Sort
//         </h2>
//         <p className="text-gray-600">
//           Visualizing insertion sort using a single-tape Turing machine
//         </p>
//       </div>

//       {/* State & Action */}
//       <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//         <div className="flex items-center justify-between mb-2">
//           <span className="text-sm font-semibold text-gray-700">
//             Current State:
//           </span>
//           <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-mono">
//             {currentStep.currentState}
//           </span>
//         </div>
//         <div className="text-sm text-gray-700">
//           <span className="font-semibold">Action:</span>{" "}
//           {currentStep.actionDescription}
//         </div>
//       </div>

//       {/* Tape */}
//       <div className="mb-8 overflow-x-auto">
//         <div className="inline-flex items-start gap-1 min-w-full pb-4">
//           {currentStep.tape.map((cell, idx) => {
//             const isHead = idx === currentStep.headPosition;
//             const highlightColor = getHighlightColor(idx);
//             const isDelimiter = cell.symbol === "#";
//             const isMarker = cell.symbol === ">";
//             const isBlank = cell.symbol === "_";
//             const isData = ["A", "B", "C", "D", "E"].includes(cell.symbol);
//             const isTemp = cell.symbol === "*";

//             return (
//               <div key={idx} className="flex flex-col items-center">
//                 {isHead ? (
//                   <div className="mb-2 text-red-500 animate-bounce">
//                     <svg
//                       width="24"
//                       height="24"
//                       viewBox="0 0 24 24"
//                       fill="currentColor"
//                     >
//                       <path
//                         d="M12 2L12 18M12 18L6 12M12 18L18 12"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                         fill="none"
//                       />
//                     </svg>
//                   </div>
//                 ) : (
//                   <div className="mb-2 h-6"></div>
//                 )}

//                 <div
//                   className={`
//                     w-12 h-12 flex items-center justify-center border-2 rounded
//                     font-mono text-lg font-bold transition-all duration-300
//                     ${isHead ? "border-red-500 shadow-lg scale-110" : "border-gray-300"}
//                     ${highlightColor ? "shadow-lg" : ""}
//                     ${isDelimiter ? "bg-gray-200 text-gray-500" : ""}
//                     ${isMarker ? "bg-green-100 text-green-700" : ""}
//                     ${isBlank ? "bg-gray-50 text-gray-300" : ""}
//                     ${isData ? "bg-blue-50 text-blue-700" : ""}
//                     ${isTemp ? "bg-yellow-100 text-yellow-700" : ""}
//                   `}
//                   style={
//                     highlightColor
//                       ? {
//                           backgroundColor: highlightColor + "20",
//                           borderColor: highlightColor,
//                         }
//                       : {}
//                   }
//                 >
//                   {cell.symbol}
//                 </div>

//                 <div className="mt-1 text-xs text-gray-400 font-mono">{idx}</div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Speed Controls */}
//       <div className="mb-6">
//         <div className="flex items-center justify-between mb-2">
//           <span className="text-sm font-semibold text-gray-700">Speed:</span>
//           <div className="flex gap-2">
//             {[
//               { label: "0.5x", value: 2000 },
//               { label: "1x", value: 1000 },
//               { label: "2x", value: 500 },
//               { label: "4x", value: 250 },
//             ].map(({ label, value }) => (
//               <button
//                 key={value}
//                 onClick={() => setSpeed(value)}
//                 className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
//                   speed === value
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                 }`}
//               >
//                 {label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Controls */}
//       <div className="flex items-center justify-center gap-4 mb-4">
//         <button
//           onClick={handleReset}
//           className="p-3 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
//           title="Reset"
//         >
//           <RotateCcw className="w-5 h-5 text-gray-700" />
//         </button>

//         <button
//           onClick={handlePrev}
//           disabled={currentStepIndex === 0}
//           className="p-3 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           title="Previous"
//         >
//           <SkipBack className="w-5 h-5 text-gray-700" />
//         </button>

//         <button
//           onClick={togglePlay}
//           className="p-4 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors shadow-lg"
//           title={isPlaying ? "Pause" : "Play"}
//         >
//           {isPlaying ? (
//             <Pause className="w-6 h-6 text-white" />
//           ) : (
//             <Play className="w-6 h-6 text-white" />
//           )}
//         </button>

//         <button
//           onClick={handleNext}
//           disabled={currentStepIndex === steps.length - 1}
//           className="p-3 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           title="Next"
//         >
//           <SkipForward className="w-5 h-5 text-gray-700" />
//         </button>
//       </div>

//       {/* Step indicator */}
//       <div className="text-center">
//         <div className="inline-flex items-center gap-2 text-sm text-gray-600">
//           <span>Step</span>
//           <span className="font-mono font-bold text-blue-600">
//             {currentStepIndex + 1}
//           </span>
//           <span>of</span>
//           <span className="font-mono font-bold">{steps.length}</span>
//         </div>

//         <div className="mt-2">
//           <input
//             type="range"
//             min={0}
//             max={steps.length - 1}
//             value={currentStepIndex}
//             onChange={(e) => setCurrentStepIndex(parseInt(e.target.value))}
//             className="w-full max-w-md"
//           />
//         </div>
//       </div>

//       {/* Legend */}
//       <div className="mt-8 p-4 bg-gray-50 rounded-lg">
//         <h3 className="text-sm font-semibold text-gray-700 mb-2">Legend:</h3>

//         <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
//           <div className="flex items-center gap-2">
//             <div className="w-6 h-6 bg-blue-50 border-2 border-gray-300 rounded"></div>
//             <span>Data (A-E)</span>
//           </div>

//           <div className="flex items-center gap-2">
//             <div className="w-6 h-6 bg-gray-200 border-2 border-gray-300 rounded flex items-center justify-center text-gray-500">
//               #
//             </div>
//             <span>Delimiter</span>
//           </div>

//           <div className="flex items-center gap-2">
//             <div className="w-6 h-6 bg-green-100 border-2 border-gray-300 rounded flex items-center justify-center text-green-700">
//               &gt;
//             </div>
//             <span>Start Marker</span>
//           </div>

//           <div className="flex items-center gap-2">
//             <div className="w-6 h-6 bg-gray-50 border-2 border-gray-300 rounded flex items-center justify-center text-gray-300">
//               _
//             </div>
//             <span>Blank</span>
//           </div>

//           <div className="flex items-center gap-2">
//             <div className="w-6 h-6 bg-yellow-100 border-2 border-gray-300 rounded flex items-center justify-center text-yellow-700">
//               *
//             </div>
//             <span>Temp/Marker</span>
//           </div>

//           <div className="flex items-center gap-2">
//             <div className="w-6 h-6 border-2 border-red-500 rounded"></div>
//             <span>Head Position</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
} from "lucide-react";

import type { VisualizationStep } from "@/lib/turing-machine/types";

interface SortingTMVisualizationProps {
  steps: VisualizationStep[];
}

export default function SortingTMVisualization({
  steps,
}: SortingTMVisualizationProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);

  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (isPlaying && currentStepIndex < steps.length - 1) {
      interval = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, speed);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentStepIndex, steps.length, speed]);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (currentStepIndex >= steps.length - 1) {
      setCurrentStepIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const getHighlightColor = (index: number): string | null => {
    if (!currentStep.highlights) return null;
    const highlight = currentStep.highlights.find((h) => h.index === index);
    return highlight ? highlight.color : null;
  };

  const pseudoCodeLines = [
    "for i = 1 to length(arr) - 1",
    "    key = arr[i]",
    "    j = i - 1",
    "    while j >= 0 and arr[j] > key",
    "        arr[j + 1] = arr[j]",
    "        j = j - 1",
    "    arr[j + 1] = key",
  ];

  const isPseudoLineActive = (lineIndex: number): boolean => {
    if (!currentStep.pseudoCodeLines) return false;
    return currentStep.pseudoCodeLines.includes(lineIndex);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Turing Machine: Insertion Sort
        </h2>
        <p className="text-gray-600">
          Visualizing insertion sort using a single-tape Turing machine
        </p>
      </div>

      {/* Pseudo-code and State in Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Pseudo-code */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Insertion Sort Algorithm
          </h3>
          <div className="bg-slate-900 rounded-lg p-4 font-mono text-sm">
            {pseudoCodeLines.map((line, index) => (
              <div
                key={index}
                className={`py-1 px-2 rounded transition-all duration-300 ${
                  isPseudoLineActive(index)
                    ? "bg-yellow-500 text-slate-900 font-semibold"
                    : "text-gray-300"
                }`}
              >
                {line}
              </div>
            ))}
          </div>
        </div>

        {/* State & Action */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700">
              Current State:
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-mono">
              {currentStep.currentState}
            </span>
          </div>
          <div className="text-sm text-gray-700 mb-4">
            <span className="font-semibold">Action:</span>{" "}
            {currentStep.actionDescription}
          </div>
          <div className="mt-4 p-3 bg-white rounded border border-gray-200">
            <div className="text-xs text-gray-500 mb-1">Legend</div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-xs">Active Line</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tape */}
      <div className="mb-8 overflow-x-auto">
        <div className="inline-flex items-start gap-1 min-w-full pb-4">
          {currentStep.tape.map((cell, idx) => {
            const isHead = idx === currentStep.headPosition;
            const highlightColor = getHighlightColor(idx);
            const isDelimiter = cell.symbol === "#";
            const isMarker = cell.symbol === ">";
            const isBlank = cell.symbol === "_";
            const isData = ["A", "B", "C", "D", "E"].includes(cell.symbol);
            const isTemp = cell.symbol === "*";

            return (
              <div key={idx} className="flex flex-col items-center">
                {isHead ? (
                  <div className="mb-2 text-red-500 animate-bounce">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="M12 2L12 18M12 18L6 12M12 18L18 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="mb-2 h-6"></div>
                )}

                <div
                  className={`
                    w-12 h-12 flex items-center justify-center border-2 rounded
                    font-mono text-lg font-bold transition-all duration-300
                    ${isHead ? "border-red-500 shadow-lg scale-110" : "border-gray-300"}
                    ${highlightColor ? "shadow-lg" : ""}
                    ${isDelimiter ? "bg-gray-200 text-gray-500" : ""}
                    ${isMarker ? "bg-green-100 text-green-700" : ""}
                    ${isBlank ? "bg-gray-50 text-gray-300" : ""}
                    ${isData ? "bg-blue-50 text-blue-700" : ""}
                    ${isTemp ? "bg-yellow-100 text-yellow-700" : ""}
                  `}
                  style={
                    highlightColor
                      ? {
                          backgroundColor: highlightColor + "20",
                          borderColor: highlightColor,
                        }
                      : {}
                  }
                >
                  {cell.symbol}
                </div>

                <div className="mt-1 text-xs text-gray-400 font-mono">{idx}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Speed Controls */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-gray-700">Speed:</span>
          <div className="flex gap-2">
            {[
              { label: "0.5x", value: 2000 },
              { label: "1x", value: 1000 },
              { label: "2x", value: 500 },
              { label: "4x", value: 250 },
            ].map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setSpeed(value)}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  speed === value
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-4">
        <button
          onClick={handleReset}
          className="p-3 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
          title="Reset"
        >
          <RotateCcw className="w-5 h-5 text-gray-700" />
        </button>

        <button
          onClick={handlePrev}
          disabled={currentStepIndex === 0}
          className="p-3 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Previous"
        >
          <SkipBack className="w-5 h-5 text-gray-700" />
        </button>

        <button
          onClick={togglePlay}
          className="p-4 bg-blue-500 hover:bg-blue-600 rounded-full transition-colors shadow-lg"
          title={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white" />
          )}
        </button>

        <button
          onClick={handleNext}
          disabled={currentStepIndex === steps.length - 1}
          className="p-3 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Next"
        >
          <SkipForward className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Step indicator */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 text-sm text-gray-600">
          <span>Step</span>
          <span className="font-mono font-bold text-blue-600">
            {currentStepIndex + 1}
          </span>
          <span>of</span>
          <span className="font-mono font-bold">{steps.length}</span>
        </div>

        <div className="mt-2">
          <input
            type="range"
            min={0}
            max={steps.length - 1}
            value={currentStepIndex}
            onChange={(e) => setCurrentStepIndex(parseInt(e.target.value))}
            className="w-full max-w-md"
          />
        </div>
      </div>

      {/* Legend */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">Legend:</h3>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-50 border-2 border-gray-300 rounded"></div>
            <span>Data (A-E)</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-200 border-2 border-gray-300 rounded flex items-center justify-center text-gray-500">
              #
            </div>
            <span>Delimiter</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-100 border-2 border-gray-300 rounded flex items-center justify-center text-green-700">
              &gt;
            </div>
            <span>Start Marker</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-50 border-2 border-gray-300 rounded flex items-center justify-center text-gray-300">
              _
            </div>
            <span>Blank</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-yellow-100 border-2 border-gray-300 rounded flex items-center justify-center text-yellow-700">
              *
            </div>
            <span>Temp/Marker</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-6 h-6 border-2 border-red-500 rounded"></div>
            <span>Head Position</span>
          </div>
        </div>
      </div>
    </div>
  );
}
