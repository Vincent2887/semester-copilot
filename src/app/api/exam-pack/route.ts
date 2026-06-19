import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { createClient } from '@supabase/supabase-js';

// 1. Initialize the official Google Gen AI SDK
// It automatically handles process.env.GEMINI_API_KEY under the hood
const ai = new GoogleGenAI({});

// 2. Initialize the Supabase Admin Client using service role for secure database updates
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const PACK_COST = 5;

export async function POST(req: Request) {
  try {
    // Parse the incoming body properties
    const { userId, university, subject, unit, topics } = await req.json();

    // Field Validation Check
    if (!userId || !subject || !unit) {
      return NextResponse.json(
        { error: "Missing required fields (userId, subject, unit)" }, 
        { status: 400 }
      );
    }

    // 3. Fetch current user balance securely from Supabase
    const { data: userProfile, error: fetchError } = await supabaseAdmin
      .from('users') 
      .select('credits')
      .eq('id', userId)
      .single();

    if (fetchError || !userProfile) {
      return NextResponse.json({ error: "User profile or balance ledger not found" }, { status: 404 });
    }

    // 4. Enforce credit limitation check
    if (userProfile.credits < PACK_COST) {
      return NextResponse.json({ 
        error: `Insufficient credits. This action costs ${PACK_COST} credits, but you only have ${userProfile.credits}.` 
      }, { status: 403 });
    }

    // 5. Deduct credits first before running the AI processing to avoid race-condition updates
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({ credits: userProfile.credits - PACK_COST })
      .eq('id', userId);

    if (updateError) {
      return NextResponse.json({ error: "Failed to process security credit deduction" }, { status: 500 });
    }

    // 6. Define strict system rules for university-grade exam night packets
    const systemInstruction = `
      You are Topperdeck's premium AI Exam Night Pack engine. Your job is to help a student pass their university exam tomorrow.
      Analyze the provided university, subject, unit, and specific topics. 
      Generate a condensed, high-yield "Exam Night Pack" containing:
      1. Core Concepts Blueprint: Bullet points of absolute must-know definitions and formulas.
      2. Top 3 Expected Exam Questions: Formulate realistic university-style questions based on the topics.
      3. Master Answers: Provide clear, structured, step-by-step model answers for those 3 questions, optimizing for maximum marks.
      Keep the tone encouraging, highly technical, and direct. Cut out fluff.
    `;

    // 7. Execute content generation using the optimal low-latency academic model
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: `University: ${university || 'General Standard'} \nSubject: ${subject} \nUnit: ${unit} \nSpecific Topics: ${topics || 'All standard syllabus topics'}`,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.3, // Keeps answers highly precise and accurate to formulas
      }
    });

    // 8. Return data output along with user's remaining balance
    return NextResponse.json({ 
      data: response.text, 
      remainingCredits: userProfile.credits - PACK_COST 
    });

  } catch (error: any) {
    console.error("Exam Pack Pipeline Error:", error);
    return NextResponse.json(
      { error: "Internal server error running pipeline compilation" }, 
      { status: 500 }
    );
  }
}