"use client";

import { LessonStep } from "@/lib/lessons-data";
import ReactMarkdown from "react-markdown";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import HintVisualization from "../HintVisualization";

interface ContentStepProps {
  step: LessonStep;
}

export default function ContentStep({ step }: ContentStepProps) {
  // Track answers & feedback for each chatbot question separately
  const [answers, setAnswers] = useState<string[]>([]);
  const [feedbacks, setFeedbacks] = useState<string[]>([]);
  const [loading, setLoading] = useState<number | null>(null);
  const [reactions, setReactions] = useState<string[]>([]);
  const [attempts, setAttempts] = useState<number[]>([]);
  const confettiLaunchedRef = useRef<Record<number, number>>({});

  async function checkAnswer(question: string, idx: number, questionObj?: any) {
    setLoading(idx);
    setFeedbacks((prev) => {
      const copy = [...prev];
      copy[idx] = "";
      return copy;
    });
    const nextAttempt = (attempts[idx] || 0) + 1;
    setAttempts((prev) => {
      const copy = [...prev];
      copy[idx] = nextAttempt;
      return copy;
    });

    try {
      const res = await fetch("/api/check-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          answer: answers[idx] || "",
          attempt: nextAttempt,
          context: `Lesson: ${step.title}. ${questionObj?.hint ? `Hint provided: ${questionObj.hint}` : ""}`,
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
      setReactions((prev) => {
        const copy = [...prev];
        copy[idx] = data.reaction || "";
        return copy;
      });

      // Success handling: trigger confetti and prepend a clear success message
      const successEmoji = ["🎉", "🥳", "🚀", "🏆", "🎊"]; 
      const isSuccessEmoji = successEmoji.includes(data.reaction);
      // Conservative fallback: only if no reaction provided AND clearly positive without negations
      const hasNoReaction = !data.reaction;
      const text = typeof data.feedback === "string" ? data.feedback : "";
      const looksPositive = /\b(correct|exactly|right|perfect)\b/i.test(text);
      const hasNegation = /\b(not|isn['’]?t|however|but|although)\b/i.test(text);
      const fallbackSuccess = hasNoReaction && looksPositive && !hasNegation;
      const isSuccess = isSuccessEmoji || fallbackSuccess;
      if (isSuccess) {
        // Avoid spamming confetti if user repeatedly submits success
        const last = confettiLaunchedRef.current[idx] || 0;
        const now = Date.now();
        if (now - last > 1500) {
          confettiLaunchedRef.current[idx] = now;
          confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
          confetti({ particleCount: 60, angle: 60, spread: 55, origin: { x: 0 } });
          confetti({ particleCount: 60, angle: 120, spread: 55, origin: { x: 1 } });
        }
        setFeedbacks((prev) => {
          const copy = [...prev];
          copy[idx] = `✅ Yes, you are correct! ` + copy[idx];
          return copy;
        });
      }
    } catch (error) {
      console.error(error);
      setFeedbacks((prev) => {
        const copy = [...prev];
        copy[idx] = "Error: Could not check your answer.";
        return copy;
      });
      setReactions((prev) => {
        const copy = [...prev];
        copy[idx] = "⚠️";
        return copy;
      });
    }
    setLoading(null);
  }

  return (
    <div className="max-w-4xl">
      {/* Lesson Title with Pastel Gradient */}
      <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-300 via-pink-200 to-blue-200 bg-clip-text text-transparent">
        {step.title}
      </h2>

      {/* Lesson Markdown Content with Pastel Styling */}
      <div className="prose prose-lg max-w-none">
        <ReactMarkdown
          components={{
            h1: ({ children }) => (
              <h1 className="text-2xl font-bold text-white mt-8 mb-4 bg-gradient-to-r from-purple-800 to-purple-900 p-3 rounded-lg shadow-lg">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl font-semibold text-indigo-700 mt-6 mb-3 bg-gradient-to-r from-indigo-100 to-purple-100 p-2 rounded">
                {children}
              </h2>
            ),
            p: ({ children }) => (
              <p className="text-lg text-gray-700 mb-4 leading-relaxed bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border-l-4 border-pink-200">
                {children}
              </p>
            ),
            ul: ({ children }) => <ul className="space-y-2 mb-6 bg-gradient-to-br from-pink-50 to-blue-50 p-4 rounded-lg">{children}</ul>,
            li: ({ children }) => (
              <li className="text-lg text-gray-700 flex items-start bg-white bg-opacity-70 p-2 rounded mb-2">
                <span className="text-pink-400 mr-3 mt-1 text-xl">•</span>
                <span>{children}</span>
              </li>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-purple-700 bg-gradient-to-r from-purple-100 to-pink-100 px-2 py-1 rounded">
                {children}
              </strong>
            ),
            code: ({ children }) => (
              <code className="bg-gradient-to-r from-blue-100 to-purple-100 px-2 py-1 rounded text-sm font-mono text-indigo-800 border border-purple-200">
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre className="bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-6 border border-purple-300">
                {children}
              </pre>
            ),
            table: ({ children }) => (
              <div className="overflow-x-auto mb-6 bg-gradient-to-r from-pink-50 to-blue-50 p-4 rounded-lg">
                <table className="w-full border-collapse border border-purple-200 table-fixed">
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => <thead className="bg-gradient-to-r from-purple-200 to-pink-200">{children}</thead>,
            th: ({ children }) => (
              <th className="border border-purple-300 px-4 py-3 text-left font-semibold text-purple-800 w-1/3">
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td className="border border-purple-200 px-4 py-3 text-gray-700 bg-white bg-opacity-70 w-1/3">
                {children}
              </td>
            ),
          }}
        >
          {step.content}
        </ReactMarkdown>
      </div>

      {/* Chatbot Questions with Pastel Styling */}
      {step.chatbot &&
        step.chatbot.map((q, idx) => (
          <div
            key={idx}
            className="mt-10 p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 rounded-xl shadow-lg border border-purple-200 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="flex-1 font-semibold text-purple-800 bg-white bg-opacity-70 p-3 rounded-lg">
                {q.question}
              </p>
              {reactions[idx] && (
                <motion.span
                  key={reactions[idx]}
                  className="text-5xl select-none"
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {reactions[idx]}
                </motion.span>
              )}
            </div>
            {q.hint && (
              <p className="text-sm text-indigo-600 mb-3 bg-gradient-to-r from-indigo-100 to-purple-100 p-2 rounded">
                💡 Hint: {q.hint}
              </p>
            )}

            {/* Answer box with Pastel Styling */}
            <textarea
              className="w-full p-3 border-2 border-purple-200 rounded-lg mb-3 text-gray-800 bg-white bg-opacity-80 focus:border-pink-300 focus:ring-2 focus:ring-pink-200 transition-all duration-300"
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

            {/* Submit button with Pastel Gradient */}
            <button
              onClick={() => checkAnswer(q.question, idx, q)}
              disabled={loading === idx}
              className="px-6 py-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white rounded-lg hover:from-purple-500 hover:to-pink-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading === idx ? "Checking..." : "Submit Answer"}
            </button>

            {/* Hint Visualization */}
            <HintVisualization 
              attempt={attempts[idx] || 0}
              lessonType={step.title}
              scenario={q.question}
              isCorrect={["🎉", "🥳", "🚀", "🏆", "🎊"].includes(reactions[idx] || "")}
            />

            {/* Feedback with Pastel Styling */}
            {feedbacks[idx] && (
              <div className="mt-4 p-4 border-l-4 border-purple-400 bg-gradient-to-r from-purple-50 to-pink-50 text-gray-800 rounded-lg shadow-md flex items-center justify-between">
                <div>
                  <strong className="text-purple-700">🎓 Tutor:</strong> {feedbacks[idx]}
                </div>
                {reactions[idx] && (
                  <motion.span
                    key={"feedback-" + reactions[idx]}
                    className="text-5xl ml-4 select-none"
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 1.1, repeat: Infinity }}
                  >
                    {reactions[idx]}
                  </motion.span>
                )}
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
