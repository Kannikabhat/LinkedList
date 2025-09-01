"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface HintVisualizationProps {
  attempt: number;
  lessonType?: string;
  scenario?: string;
  isCorrect?: boolean;
}

export default function HintVisualization({ attempt, lessonType, scenario, isCorrect = false }: HintVisualizationProps) {
  const [showVisualization, setShowVisualization] = useState(false);

  useEffect(() => {
    // Show visualization for correct answers immediately, or for hints after delay
    if (isCorrect || (attempt >= 2 && attempt <= 3)) {
      const timer = setTimeout(() => setShowVisualization(true), isCorrect ? 100 : 500);
      return () => clearTimeout(timer);
    } else {
      setShowVisualization(false);
    }
  }, [attempt, isCorrect]);

  if (!showVisualization) return null;

  const isDoublyLinkedList = lessonType?.toLowerCase().includes("doubly") || scenario?.toLowerCase().includes("photo");
  const isCircular = lessonType?.toLowerCase().includes("circular") || scenario?.toLowerCase().includes("music");
  const isUndoRedo = scenario?.toLowerCase().includes("undo") || scenario?.toLowerCase().includes("redo");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`mt-4 p-4 rounded-lg border ${
        isCorrect 
          ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200" 
          : "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200"
      }`}
    >
      <div className={`text-sm font-medium mb-3 ${
        isCorrect ? "text-green-700" : "text-purple-700"
      }`}>
        {isCorrect ? "🎉 Success Visualization: " : "💡 Visual Hint: "}
        {isCorrect ? "See how it works!" : (attempt === 2 ? "Think about connections..." : "See the pattern?")}
      </div>
      
      {/* Success Visualizations for Correct Answers */}
      {isCorrect && (
        <div className="flex items-center justify-center space-x-2">
          {/* Photo Viewer Success */}
          {isDoublyLinkedList && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-1"
            >
              <div className="w-12 h-8 bg-green-300 rounded flex items-center justify-center text-xs">📸</div>
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="text-green-600 text-xs font-bold"
                >
                  →
                </motion.div>
                <motion.div
                  animate={{ x: [0, -3, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.6 }}
                  className="text-green-600 text-xs font-bold"
                >
                  ←
                </motion.div>
              </div>
              <div className="w-12 h-8 bg-green-300 rounded flex items-center justify-center text-xs">📸</div>
              <div className="flex flex-col items-center">
                <motion.div
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="text-green-600 text-xs font-bold"
                >
                  →
                </motion.div>
                <motion.div
                  animate={{ x: [0, -3, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: 0.6 }}
                  className="text-green-600 text-xs font-bold"
                >
                  ←
                </motion.div>
              </div>
              <div className="w-12 h-8 bg-green-300 rounded flex items-center justify-center text-xs">📸</div>
              <span className="text-xs text-green-700 font-bold">Perfect! 🎯</span>
            </motion.div>
          )}

          {/* Music Player Success */}
          {isCircular && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-1"
            >
              <div className="w-10 h-8 bg-purple-300 rounded flex items-center justify-center text-xs">🎵</div>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-purple-600 text-xs"
              >
                ↻
              </motion.div>
              <div className="w-10 h-8 bg-purple-300 rounded flex items-center justify-center text-xs">🎵</div>
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="text-purple-600 text-xs"
              >
                ↻
              </motion.div>
              <div className="w-10 h-8 bg-purple-300 rounded flex items-center justify-center text-xs">🎵</div>
              <span className="text-xs text-purple-700 font-bold">Loop Complete! 🔄</span>
            </motion.div>
          )}

          {/* Undo/Redo Success */}
          {isUndoRedo && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-2"
            >
              <motion.div
                animate={{ x: [0, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-blue-600 text-lg"
              >
                ↩️
              </motion.div>
              <div className="w-8 h-6 bg-blue-300 rounded flex items-center justify-center text-xs">A</div>
              <div className="w-8 h-6 bg-blue-300 rounded flex items-center justify-center text-xs">B</div>
              <div className="w-8 h-6 bg-blue-300 rounded flex items-center justify-center text-xs">C</div>
              <motion.div
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.75 }}
                className="text-blue-600 text-lg"
              >
                ↪️
              </motion.div>
              <span className="text-xs text-blue-700 font-bold">Undo/Redo Ready! ⚡</span>
            </motion.div>
          )}

          {/* Generic Success - Make it scenario-relevant */}
          {!isDoublyLinkedList && !isCircular && !isUndoRedo && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-2"
            >
              {/* Detect scenario from question text */}
              {scenario?.toLowerCase().includes("linked list") && (
                <>
                  <div className="w-10 h-8 bg-emerald-300 rounded flex items-center justify-center text-xs">🔗</div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-emerald-600 text-lg"
                  >
                    ✨
                  </motion.div>
                  <div className="w-10 h-8 bg-emerald-300 rounded flex items-center justify-center text-xs">🔗</div>
                  <span className="text-xs text-emerald-700 font-bold">Linked List Master! 🎯</span>
                </>
              )}
              
              {scenario?.toLowerCase().includes("data structure") && (
                <>
                  <div className="w-10 h-8 bg-emerald-300 rounded flex items-center justify-center text-xs">🏗️</div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-emerald-600 text-lg"
                  >
                    ✨
                  </motion.div>
                  <div className="w-10 h-8 bg-emerald-300 rounded flex items-center justify-center text-xs">🏗️</div>
                  <span className="text-xs text-emerald-700 font-bold">Data Structure Pro! 🎯</span>
                </>
              )}
              
              {scenario?.toLowerCase().includes("algorithm") && (
                <>
                  <div className="w-10 h-8 bg-emerald-300 rounded flex items-center justify-center text-xs">⚡</div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-emerald-600 text-lg"
                  >
                    ✨
                  </motion.div>
                  <div className="w-10 h-8 bg-emerald-300 rounded flex items-center justify-center text-xs">⚡</div>
                  <span className="text-xs text-emerald-700 font-bold">Algorithm Genius! 🎯</span>
                </>
              )}
              
              {/* Default fallback */}
              {!scenario?.toLowerCase().includes("linked list") && 
               !scenario?.toLowerCase().includes("data structure") && 
               !scenario?.toLowerCase().includes("algorithm") && (
                <>
                  <div className="w-10 h-8 bg-emerald-300 rounded flex items-center justify-center text-xs">🎓</div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="text-emerald-600 text-lg"
                  >
                    ✨
                  </motion.div>
                  <div className="w-10 h-8 bg-emerald-300 rounded flex items-center justify-center text-xs">🎓</div>
                  <span className="text-xs text-emerald-700 font-bold">Learning Champion! 🎯</span>
                </>
              )}
            </motion.div>
          )}
        </div>
      )}

      {/* Hint Visualizations for Wrong Answers */}
      {!isCorrect && (
        <>
          {/* Photo Viewer / Doubly Linked List Visualization */}
          {isDoublyLinkedList && (
            <div className="flex items-center justify-center space-x-2">
              {attempt === 2 && (
                <>
                  {/* Single direction - showing limitation */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-12 h-8 bg-pink-200 rounded flex items-center justify-center text-xs">📸</div>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="text-pink-500"
                    >
                      →
                    </motion.div>
                    <div className="w-12 h-8 bg-pink-200 rounded flex items-center justify-center text-xs">📸</div>
                    <span className="text-xs text-gray-500">Only forward?</span>
                  </motion.div>
                </>
              )}
              
              {attempt === 3 && (
                <>
                  {/* Bidirectional - showing solution */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center space-x-1"
                  >
                    <div className="w-12 h-8 bg-green-200 rounded flex items-center justify-center text-xs">📸</div>
                    <div className="flex flex-col items-center">
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        className="text-green-500 text-xs"
                      >
                        →
                      </motion.div>
                      <motion.div
                        animate={{ x: [0, -3, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.6 }}
                        className="text-green-500 text-xs"
                      >
                        ←
                      </motion.div>
                    </div>
                    <div className="w-12 h-8 bg-green-200 rounded flex items-center justify-center text-xs">📸</div>
                    <div className="flex flex-col items-center">
                      <motion.div
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        className="text-green-500 text-xs"
                      >
                        →
                      </motion.div>
                      <motion.div
                        animate={{ x: [0, -3, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.6 }}
                        className="text-green-500 text-xs"
                      >
                        ←
                      </motion.div>
                    </div>
                    <div className="w-12 h-8 bg-green-200 rounded flex items-center justify-center text-xs">📸</div>
                    <span className="text-xs text-green-600">Both directions! ✨</span>
                  </motion.div>
                </>
              )}
            </div>
          )}

          {/* Generic Linked List Visualization */}
          {!isDoublyLinkedList && (
            <div className="flex items-center justify-center space-x-2">
              {attempt === 2 && (
                <>
                  {/* Single linked list */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-10 h-8 bg-blue-200 rounded flex items-center justify-center text-xs">A</div>
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="text-blue-500"
                    >
                      →
                    </motion.div>
                    <div className="w-10 h-8 bg-blue-200 rounded flex items-center justify-center text-xs">B</div>
                    <span className="text-xs text-gray-500">One way only?</span>
                  </motion.div>
                </>
              )}
              
              {attempt === 3 && (
                <>
                  {/* Enhanced structure hint */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center space-x-1"
                  >
                    <div className="w-10 h-8 bg-purple-200 rounded flex items-center justify-center text-xs">A</div>
                    <div className="flex flex-col items-center">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="text-purple-500 text-xs"
                      >
                        ⟷
                      </motion.div>
                    </div>
                    <div className="w-10 h-8 bg-purple-200 rounded flex items-center justify-center text-xs">B</div>
                    <span className="text-xs text-purple-600">What structure allows this? 🤔</span>
                  </motion.div>
                </>
              )}
            </div>
          )}
        </>
      )}
      
      <div className="text-xs text-gray-600 mt-2 text-center">
        {attempt === 2 && "Think about what's missing..."}
        {attempt === 3 && "What type of linked list enables bidirectional movement?"}
      </div>
    </motion.div>
  );
}
