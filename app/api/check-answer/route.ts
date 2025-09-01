// app/api/check-answer/route.ts
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question, answer, context, attempt } = body ?? {};

    if (!question) {
      return NextResponse.json({ feedback: "Missing question in request", reaction: "⚠️" }, { status: 400 });
    }

    const prompt = `
Context: ${context ?? ""}
Question: ${question}
Student Answer: ${answer ?? ""}
Attempt Number: ${attempt ?? 1}

Evaluate the student's answer and provide progressive guidance:

FULLY CORRECT ANSWER (must mention "doubly linked list" specifically):
- feedback: "✅ Correct! [brief explanation why it's right]"
- reaction: one of: 🎉 🥳 🚀 🏆 🎊

PARTIALLY CORRECT (mentions concepts like "two pointers", "bidirectional" but not "doubly linked list"):
- feedback: "Good thinking! You're on the right track with [acknowledge their concept]. However, what is the specific NAME of the linked list structure that uses two pointers per node to enable bidirectional movement?"
- reaction: one of: 🤨 👌 😅

WRONG ANSWER - Progressive Hints (DO NOT reveal the answer):
- Attempt 1: Give a gentle nudge about the concept without revealing answer
- Attempt 2: Provide a more specific hint about what to consider
- Attempt 3: Give a concrete scenario/analogy to help them think
- Attempt 4: Provide the correct answer with full explanation
- reaction: 🤔 (attempt 1), 💡 (attempt 2), 🚀 (attempt 3), ❌ (attempt 4+)

For photo viewer/linked list scenarios, use these visualization hints:
- "Think about connecting photos like beads on a string..."
- "Imagine each photo knowing about its neighbors..."
- "What if each photo could point to both the previous AND next photo?"

Return ONLY this JSON:
{
  "feedback": "your feedback here", 
  "reaction": "emoji_here"
}`;

    const apiKey = process.env.GEMINI_API_KEY;
    console.log("API key loaded?", !!process.env.GEMINI_API_KEY);
    console.log("API key length:", process.env.GEMINI_API_KEY?.length);
    if (!apiKey) {
      console.error("Missing GEMINI_API_KEY");
      return NextResponse.json({ feedback: "Server misconfiguration: missing API key" }, { status: 500 });
    }

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
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
      return NextResponse.json({ feedback: "Gemini API request failed" }, { status: 500 });
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
        reaction: parsed.reaction ?? "🎉",
      });
    }

    // Heuristic fallback if model didn't return JSON
    const lower = (raw || "").toLowerCase();
    const chooseByAttempt = (n: number) => {
      if (!n || n < 1) return "🤔";
      if (n >= 4) return "❌";
      if (n === 3) return "🚀";
      if (n === 2) return "💡";
      return "🤔";
    };
    let reaction = "🤔";
    if (lower.includes("correct")) reaction = "🎉";
    else if (lower.includes("partially")) reaction = "🤨";
    else reaction = chooseByAttempt(Number(attempt) || 1);

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
