"use client";

import { LessonStep } from "@/lib/lessons-data";
import ReactMarkdown from "react-markdown";
import { useState } from "react";

interface ContentStepProps {
  step: LessonStep;
}

export default function ContentStep({ step }: ContentStepProps) {
  // Track answers & feedback for each chatbot question separately
  const [answers, setAnswers] = useState<string[]>([]);
  const [feedbacks, setFeedbacks] = useState<string[]>([]);
  const [loading, setLoading] = useState<number | null>(null);

  async function checkAnswer(question: string, idx: number) {
    setLoading(idx);
    setFeedbacks((prev) => {
      const copy = [...prev];
      copy[idx] = "";
      return copy;
    });

    try {
      const res = await fetch("/api/check-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          answer: answers[idx] || "",
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        const msg = `Server error ${res.status}: ${res.statusText} — ${text}`;
        setFeedbacks((prev) => {
          const copy = [...prev];
          copy[idx] = msg;
          return copy;
        });
        setLoading(null);
        return;
      }

      const data = await res.json();
      setFeedbacks((prev) => {
        const copy = [...prev];
        copy[idx] = data.feedback;
        return copy;
      });
    } catch (error) {
      console.error(error);
      setFeedbacks((prev) => {
        const copy = [...prev];
        copy[idx] = "Error: Could not check your answer.";
        return copy;
      });
    }
    setLoading(null);
  }

  return (
    <div className="max-w-4xl">
      {/* Lesson Title */}
      <h2 className="text-3xl font-bold text-gray-900 mb-8">{step.title}</h2>

      {/* Lesson Markdown Content */}
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
            ul: ({ children }) => <ul className="space-y-2 mb-6">{children}</ul>,
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
            thead: ({ children }) => <thead className="bg-gray-100">{children}</thead>,
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

      {/* Chatbot Questions (Optional) */}
      {step.chatbot &&
        step.chatbot.map((q, idx) => (
          <div
            key={idx}
            className="mt-10 p-6 bg-gray-50 rounded-xl shadow border border-gray-200"
          >
            <p className="font-semibold text-gray-900">{q.question}</p>
            {q.hint && (
              <p className="text-sm text-gray-500 mb-3">Hint: {q.hint}</p>
            )}

            {/* Answer box */}
            <textarea
              className="w-full p-3 border rounded-lg mb-3 text-gray-800"
              rows={3}
              placeholder="Type your answer..."
              value={answers[idx] || ""}
              onChange={(e) =>
                setAnswers((prev) => {
                  const copy = [...prev];
                  copy[idx] = e.target.value;
                  return copy;
                })
              }
            />

            {/* Submit button */}
            <button
              onClick={() => checkAnswer(q.question, idx)}
              disabled={loading === idx}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {loading === idx ? "Checking..." : "Submit Answer"}
            </button>

            {/* Feedback */}
            {feedbacks[idx] && (
              <div className="mt-4 p-3 border-l-4 border-blue-500 bg-blue-50 text-gray-800 rounded">
                <strong>Feedback:</strong> {feedbacks[idx]}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
