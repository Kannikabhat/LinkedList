"use client";

import { motion } from 'framer-motion';

interface CodePanelProps {
  code: string[];
  activeLineIndex?: number;
  condition?: boolean;
}

export default function CodePanel({ code, activeLineIndex, condition }: CodePanelProps) {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-2 text-gray-400 text-sm font-medium">Algorithm</span>
        </div>
      </div>
      <div className="p-4">
        {code.map((line, index) => (
          <motion.div
            key={index}
            className={`flex items-center py-1 px-2 rounded transition-all duration-300 ${
              activeLineIndex === index
                ? condition === false
                  ? 'bg-red-600/20 border-l-2 border-red-400'
                  : condition === true
                  ? 'bg-green-600/20 border-l-2 border-green-400'
                  : 'bg-blue-600/20 border-l-2 border-blue-400'
                : ''
            }`}
            animate={{
              backgroundColor: activeLineIndex === index 
                ? condition === false 
                  ? 'rgba(220, 38, 38, 0.2)'
                  : condition === true
                  ? 'rgba(22, 163, 74, 0.2)'
                  : 'rgba(37, 99, 235, 0.2)'
                : 'transparent',
            }}
          >
            <div className="w-8 text-gray-500 text-sm text-right mr-4 font-mono">
              {index + 1}
            </div>
            <div
              className={`font-mono text-sm flex-1 transition-colors duration-300 ${
                activeLineIndex === index 
                  ? condition === false
                    ? 'text-red-100'
                    : condition === true
                    ? 'text-green-100'
                    : 'text-blue-100'
                  : 'text-gray-300'
              }`}
              style={{ whiteSpace: 'pre' }}
            >
              {line}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}