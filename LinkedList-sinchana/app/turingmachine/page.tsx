"use client";

import TuringMachineSorting from "@/components/TuringMachineSorting";

export default function TuringMachinePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Turing Machine – Sorting 0, 1, 2
        </h1>

        <p className="text-lg text-gray-700 mb-8">
          This visualization shows how a Turing Machine sorts a tape consisting
          of 0s, 1s, and 2s while also showing the equivalent array representation
          updating simultaneously.
        </p>

        <TuringMachineSorting />
      </div>
    </div>
  );
}
