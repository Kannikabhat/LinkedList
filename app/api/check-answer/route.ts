// app/api/check-answer/route.ts
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { question, answer,context} = body ?? {};

    if (!question) {
      return NextResponse.json({ feedback: "Missing question in request" }, { status: 400 });
    }

    const prompt = `
Context: ${context ?? ""}

Question: ${question}
Student Answer: ${answer ?? ""}

Please evaluate the student's answer based on the context:
- First, clearly state if the answer is Correct, Wrong, or Partially Correct.
- If Wrong → explain briefly why and provide the correct answer.
- If Partially Correct → acknowledge what is right, point out what is missing/incorrect, and then provide the correct answer.
- Keep the feedback concise (max 3 sentences) and talk directly to the student.
`;

    const apiKey = process.env.GEMINI_API_KEY;
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
    const feedback =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "No feedback generated.";

    return NextResponse.json({ feedback });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json({ feedback: "Error contacting Gemini API" }, { status: 500 });
  }
}
