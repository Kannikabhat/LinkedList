"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

export default function ChatbotSidebar() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Load chat from sessionStorage
  useEffect(() => {
    const saved = sessionStorage.getItem("dsa_chat_session");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  // Save chat to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("dsa_chat_session", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    const userQuestion = input;
    setInput("");
    setLoading(true);

    try {
      // SEND DIRECTLY TO FASTAPI RAG BACKEND
      const res = await fetch("http://localhost:8000/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userQuestion }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", text: data.answer ?? "No response." },
      ]);
    } catch (err) {
      console.error("API Error:", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "⚠️ Server error. Make sure FastAPI is running on port 8000.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-3 rounded-full shadow-xl hover:bg-blue-700 z-50"
      >
        💬 Chat
      </button>

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">DSA Tutor</h2>
          <X
            onClick={() => setOpen(false)}
            className="cursor-pointer text-gray-600 hover:text-black"
          />
        </div>

        {/* Messages */}
        <div className="p-4 space-y-3 overflow-y-auto h-[80%]">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-2 rounded-lg max-w-[90%] ${
                msg.role === "user"
                  ? "bg-blue-100 self-end"
                  : "bg-gray-200 self-start"
              }`}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div className="p-2 bg-gray-200 rounded-lg max-w-[70%]">
              Thinking...
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-3 border-t flex gap-2">
          <input
            className="flex-grow border rounded-lg px-3 py-2"
            placeholder="Ask about DSA..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </>
  );
}
