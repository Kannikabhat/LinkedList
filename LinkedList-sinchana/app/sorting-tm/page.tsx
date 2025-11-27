'use client';

import { useState } from 'react';
import SortingTMVisualization from '@/components/SortingTMVisualization';
import { generateSortingTMSteps } from '@/lib/turing-machine';
import type { VisualizationStep } from '@/lib/turing-machine';
import ChatbotSidebar from '@/components/ChatbotSidebar';

export default function SortingTMPage() {
  const [input, setInput] = useState('');
  const [steps, setSteps] = useState<VisualizationStep[] | null>(null);

  const [error, setError] = useState('');

  const handleRun = () => {
    setError('');
    setSteps(null);

    if (!input.trim()) {
      setError('Please enter symbols like: A B C D');
      return;
    }

    const symbols = input
      .trim()
      .toUpperCase()
      .split(/\s+/)
      .filter(Boolean);

    const allowed = ['A', 'B', 'C', 'D', 'E'];

    const invalid = symbols.filter((s) => !allowed.includes(s));
    if (invalid.length > 0) {
      setError(`Invalid symbols: ${invalid.join(', ')}. Allowed: A–E`);
      return;
    }

    try {
      const generated = generateSortingTMSteps(symbols);
      setSteps(generated);
    } catch (e) {
      console.error(e);
      setError('Something went wrong while generating TM steps.');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Turing Machine – Sorting Visualization</h1>
      <p className="text-gray-600 mb-6">
        Enter a sequence of symbols (A–E). The Turing machine will sort them using
        Insertion Sort logic on a single tape.
      </p>

      <div className="mb-6 p-4 bg-gray-50 border rounded-lg">
        <label className="block mb-2 font-semibold">Input Symbols:</label>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Example: C A B D"
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {error && (
          <p className="text-red-600 text-sm mt-2">{error}</p>
        )}

        <button
          onClick={handleRun}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Run Turing Machine
        </button>
      </div>

      {steps && (
        <>
        <div className="mt-10">
          <SortingTMVisualization steps={steps} />
        </div>
        <ChatbotSidebar />
        </>
      )}
    </div>
  );
}
