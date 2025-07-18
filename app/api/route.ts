
'use server';
import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = user.id;

    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }



    const prompt = `You are an AI startup assistant. For each startup idea, provide a market fit score, SWOT analysis, and pitch deck summary — all within 30 words.\n\nStartup idea: ${message}`;

    const response = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "phi3:mini", prompt, stream: false }),
    });

    if (!response.ok) {
      const text = await response.text();
      return NextResponse.json({ error: "Ollama error", detail: text }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json({ reply: data.response ?? "No response" });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json({ error: "Unexpected server error" }, { status: 500 });
  }
}
