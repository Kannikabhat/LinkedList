

export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

type Topic =
  | "linked list"
  | "doubly linked list"
  | "circular linked list"
  | "circular doubly linked list"
  | "hashing";

// const RULES: Record<Topic, string> = {
//   "linked list": `
// FULLY CORRECT ANSWER (must mention "linked list" specifically):
// - feedback: "✅ Correct! A linked list connects nodes where each node points to the next, avoiding array shifts and allowing dynamic growth."
// - reaction: one of: 🎉 🥳 🚀 🏆 🎊

// PARTIALLY CORRECT (mentions dynamic memory, pointers, nodes but not the term "linked list"):
// - feedback: "Good thinking! You're on the right track with dynamic memory and pointers. However, what's the specific NAME of this structure where each node links to the next?"
// - reaction: one of: 🤨 👌 😅

// WRONG ANSWER - Progressive Hints (DO NOT reveal the answer):
// - Attempt 1: Give a gentle nudge: "Think about a structure that doesn't need continuous memory and can insert/remove without shifting many elements."
// - Attempt 2: More specific hint: "Each element stores data and ONE link to the NEXT element."
// - Attempt 3: Analogy: "Imagine train coaches connected in one direction — each knows only the next coach."
// - Attempt 4: Provide the correct answer with full explanation.
// - reaction: 🤔 (attempt 1), 💡 (attempt 2), 🚀 (attempt 3), ❌ (attempt 4+)
// `,

//   "doubly linked list": `
// FULLY CORRECT ANSWER (must mention "doubly linked list" specifically):
// - feedback: "✅ Correct! A doubly linked list has nodes with two pointers: previous and next, enabling efficient bidirectional traversal."
// - reaction: one of: 🎉 🥳 🚀 🏆 🎊

// PARTIALLY CORRECT (mentions 'two pointers', 'bidirectional', previous/next but not the exact term):
// - feedback: "Good thinking! You're on the right track with two pointers and bidirectional movement. However, what is the specific NAME of this structure?"
// - reaction: one of: 🤨 👌 😅

// WRONG ANSWER - Progressive Hints (DO NOT reveal the answer):
// - Attempt 1: "Think about moving both FORWARD and BACKWARD efficiently..."
// - Attempt 2: "Each node connects to BOTH its neighbors (prev and next)."
// - Attempt 3: "Like a photo viewer with Next and Previous buttons."
// - Attempt 4: Provide the correct answer with full explanation.
// - reaction: 🤔 (attempt 1), 💡 (attempt 2), 🚀 (attempt 3), ❌ (attempt 4+)
// `,

//   "circular linked list": `
// FULLY CORRECT ANSWER (must mention "circular linked list" specifically):
// - feedback: "✅ Correct! In a circular linked list the last node links back to the first, forming a loop for continuous traversal."
// - reaction: one of: 🎉 🥳 🚀 🏆 🎊

// PARTIALLY CORRECT (mentions loop, ring, cycle but not the exact term):
// - feedback: "You're close! You're describing a looping structure. What's the NAME for this linked list variant where the last connects to the first?"
// - reaction: one of: 🤨 👌 😅

// WRONG ANSWER - Progressive Hints (DO NOT reveal the answer):
// - Attempt 1: "Think about a list with no true end — it keeps going."
// - Attempt 2: "The last node's next pointer doesn't point to null."
// - Attempt 3: "Like a repeating playlist or a round-robin scheduler."
// - Attempt 4: Provide the correct answer with full explanation.
// - reaction: 🤔 (attempt 1), 💡 (attempt 2), 🚀 (attempt 3), ❌ (attempt 4+)
// `,

//   "circular doubly linked list": `
// FULLY CORRECT ANSWER (must mention "circular doubly linked list" specifically):
// - feedback: "✅ Correct! A circular doubly linked list has prev and next pointers AND the last connects back to the first, enabling looped bidirectional traversal."
// - reaction: one of: 🎉 🥳 🚀 🏆 🎊

// PARTIALLY CORRECT (mentions loop + bidirectional / two pointers but not exact term):
// - feedback: "Great intuition! You're describing a loop that also supports back/forward via two pointers. What's the precise NAME of that structure?"
// - reaction: one of: 🤨 👌 😅

// WRONG ANSWER - Progressive Hints (DO NOT reveal the answer):
// - Attempt 1: "Think about a list that loops AND lets you go both ways."
// - Attempt 2: "Each node knows previous and next; tail links to head too."
// - Attempt 3: "Like a carousel you can spin left or right forever."
// - Attempt 4: Provide the correct answer with full explanation.
// - reaction: 🤔 (attempt 1), 💡 (attempt 2), 🚀 (attempt 3), ❌ (attempt 4+)
// `,
// };

// const VISUAL_HINTS: Record<Topic, string> = {
//   "linked list": `
// - "Think about connecting items like beads on a single string."
// - "Each item only points to the NEXT one."
// - "Imagine train coaches — each knows only the next coach."
// `,
//   "doubly linked list": `
// - "Think about connecting photos like beads on a string..."
// - "Imagine each photo knowing about its neighbors..."
// - "What if each photo could point to both the previous AND next photo?"
// `,
//   "circular linked list": `
// - "Picture a ring where the last bead connects back to the first."
// - "No true end; traversal can continue indefinitely."
// - "Like a playlist that repeats."
// `,
//   "circular doubly linked list": `
// - "A carousel that loops and supports both left and right moves."
// - "Each node knows previous and next; the chain is a closed loop."
// `,
// };

function detectTopic(q?: string, c?: string): Topic {
  const s = `${q ?? ""} ${c ?? ""}`.toLowerCase();
  // Abbreviation support
  if (/(cdll|circular\s+doubly)/.test(s)) return "circular doubly linked list";
  if (/(dll|doubly|two\s+pointers?|bidirectional|previous|prev)/.test(s)) return "doubly linked list";
  if (/(cll|circular|loop|ring|wrap(-| )?around)/.test(s)) return "circular linked list";
  return "linked list";
}

function buildPrompt({
  context,
  question,
  answer,
  attempt,
  topic,
}: {
  context?: string;
  question: string;
  answer?: string;
  attempt?: number;
  topic: Topic;
}) {
  // const ruleSet = RULES[topic];
  // const hints = VISUAL_HINTS[topic];
return `
Context: ${context ?? ""}
Question: ${question}
Student Answer: ${answer ?? ""}
Attempt Number: ${attempt ?? 1}

Your task:
1. Evaluate the student's answer based on the question and the given context.
2. If the student’s answer shows partial understanding or is close to the correct answer, provide encouraging feedback and stop (no further hints).
3. If the answer is incorrect or far from the context, give progressive, step-by-step guidance to help the student arrive at the correct answer.
4. If the student misses any question, ask him the question again.
5. If the student makes multiple incorrect attempts, eventually provide the correct answer with a full explanation.
6. Keep the feedback short, clear, and constructive.
7. If the student says he doesn't know the answer, give them the answer and do not ask further questions.
8. Dont give any visuals hint.
Respond ONLY in this exact JSON format (no extra text, no explanations):
{
  "feedback": "your feedback here",
  "reaction": "an appropriate emoji that reflects your feedback tone"
}
`;
}

function chooseByAttempt(n: number) {
  if (!n || n < 1) return "🤔";
  if (n >= 4) return "❌";
  if (n === 3) return "🚀";
  if (n === 2) return "💡";
  return "🤔";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question, answer, context, attempt } = body ?? {};
    let { topic } = body ?? {} as { topic?: string };

    if (!question) {
      return NextResponse.json(
        { feedback: "Missing question in request", reaction: "⚠️" },
        { status: 400 }
      );
    }

    const normalizedTopic = (topic?.toLowerCase?.().trim?.() || "") as Topic | "";
    const resolvedTopic: Topic =
      (normalizedTopic as Topic) || detectTopic(question, context);

    const prompt = buildPrompt({
      context,
      question,
      answer,
      attempt,
      topic: resolvedTopic,
    });

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Missing GEMINI_API_KEY");
      return NextResponse.json(
        { feedback: "Server misconfiguration: missing API key" },
        { status: 500 }
      );
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}
`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    );

    if (!res.ok) {
      const errText = await res.text();
      console.error("Gemini API error:", res.status, errText);
      return NextResponse.json(
        { feedback: "Gemini API request failed" },
        { status: 500 }
      );
    }

    const data = await res.json();
    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    // Attempt to extract JSON strictly
    let parsed: any = null;
    try {
      const match = typeof raw === "string" ? raw.match(/\{[\s\S]*\}/) : null;
      if (match) parsed = JSON.parse(match[0]);
    } catch (_) {
      // fall through to heuristic parsing
    }

    if (parsed && typeof parsed.feedback === "string") {
      return NextResponse.json({
        feedback: parsed.feedback,
        reaction: parsed.reaction ?? chooseByAttempt(Number(attempt) || 1),
      });
    }

    // Heuristic fallback if model didn't return JSON
    const lower = (raw || "").toLowerCase();
    let reaction = chooseByAttempt(Number(attempt) || 1);
    if (lower.includes("correct")) reaction = "🎉";
    else if (lower.includes("partially")) reaction = "🤨";

    const feedback = raw || "No feedback generated.";
    return NextResponse.json({ feedback, reaction });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { feedback: "Error contacting Gemini API", reaction: "⚠️" },
      { status: 500 }
    );
  }
}

