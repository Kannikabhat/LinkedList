"use client";

import { LessonStep } from '@/lib/lessons-data';
import ReactMarkdown from 'react-markdown';

interface ContentStepProps {
  step: LessonStep;
}

export default function ContentStep({ step }: ContentStepProps) {
  return (
    <div className="max-w-4xl">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        {step.title}
      </h2>
      
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 className="text-2xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl font-semibold text-gray-800 mt-6 mb-3">{children}</h2>
            ),
            p: ({ children }) => (
              <p className="text-lg text-gray-700 mb-4 leading-relaxed">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="space-y-2 mb-6">{children}</ul>
            ),
            li: ({ children }) => (
              <li className="text-lg text-gray-700 flex items-start">
                <span className="text-blue-500 mr-3 mt-1">•</span>
                <span>{children}</span>
              </li>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-gray-900">{children}</strong>
            ),
            code: ({ children }) => (
              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6">
                {children}
              </pre>
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto mb-6">
                <table className="w-full border-collapse border border-gray-300">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead className="bg-gray-100">{children}</thead>
            ),
            th: ({ children }) => (
              <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border border-gray-300 px-4 py-3 text-gray-700">
                {children}
              </td>
            ),
          }}
        >
          {step.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}