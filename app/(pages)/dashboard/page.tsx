"use client";

import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "@/utils/providers/ContextAPI"; // or wherever your auth is
import { toast } from "sonner";

type Message = { role: "user" | "assistant"; content: string };

const StartupAssistantPage = () => {
  const { session, isSubscribed } = useAuth(); // Assuming isSubscribed boolean here
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    if (!isSubscribed) {
      setError("You must subscribe to use this feature.");
      toast.error("You must subscribe to use this feature.");
      return;
    }

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    setError(null);
    setInput("");
    try {
      const res = await fetch("/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input.trim() }),
      });

      if (!res.ok) throw new Error("Server error. Please try again.");
      const data = await res.json();

      const aiMessage: Message = {
        role: "assistant",
        content: data.reply || "No response from AI",
      };

      setMessages((prev) => [...prev, aiMessage]);
      setInput("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!loading && isSubscribed) handleSubmit();
      if (!isSubscribed) {
        setError("You must subscribe to use this feature.");
        toast.error("You must subscribe to use this feature.");
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0f0f0f] text-gray-100 flex flex-col items-center px-4 py-8 sm:px-6 ">
      <h1 className="text-4xl sm:text-5xl pt-[45px] font-bold mb-10 text-center bg-gradient-to-r from-blue-500 via-purple-400 to-pink-500 bg-clip-text text-transparent">
        AI Startup Assistant
      </h1>

      <div className="w-full max-w-3xl bg-[#1a1a1a] border border-gray-700 rounded-xl shadow-lg flex flex-col h-[75vh] overflow-hidden">
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
          {messages.length === 0 ? (
            <p className="text-gray-500 italic text-center">
              Start by typing your startup idea below.
            </p>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] px-4 py-3 rounded-lg shadow-sm ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-800 text-gray-200 rounded-bl-none border border-gray-700"
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t border-gray-700 bg-[#121212]">
          {!isSubscribed && (
            <p className="mb-4 text-center text-red-500 font-semibold">
              You must subscribe to use the assistant.
            </p>
          )}

          <textarea
            className="w-full h-28 p-4 rounded-lg bg-[#1e1e1e] text-gray-100 placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter your startup idea..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading || !isSubscribed}
          />

          <div className="flex justify-end mt-3">
            <button
              onClick={handleSubmit}
              disabled={loading || !input.trim() || !isSubscribed}
              className="px-6 py-2 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center space-x-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  <span>Analyzing...</span>
                </span>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <p
          className="mt-6 max-w-xl text-red-500 text-center font-medium cursor-pointer"
          onClick={() => setError(null)}
          title="Click to dismiss"
        >
          {error} (click to dismiss)
        </p>
      )}
    </div>
  );
};

export default StartupAssistantPage;
