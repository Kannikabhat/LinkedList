"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Terminal } from 'lucide-react';

interface OutputPanelProps {
  output: string[];
  title?: string;
}

export default function OutputPanel({ output, title = "Output" }: OutputPanelProps) {
  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-green-400" />
          <span className="text-gray-400 text-sm font-medium">{title}</span>
        </div>
      </div>
      <div className="p-4 min-h-[80px] max-h-[200px] overflow-y-auto">
        <AnimatePresence>
          {output.length === 0 ? (
            <div className="text-gray-500 text-sm font-mono">
              Waiting for output...
            </div>
          ) : (
            output.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="text-green-400 font-mono text-sm py-1"
              >
                {line}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}