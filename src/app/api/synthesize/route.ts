import { NextResponse } from 'next/server';
import { GoogleGenAI, Type } from '@google/genai';

// 1. Initialize the official Google Gen AI SDK
const ai = new GoogleGenAI({});

export async function POST(req: Request) {
  try {
    const { rawText } = await req.json();

    // Guard constraint check
    if (!rawText || rawText.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter a valid study concept or passage." }, 
        { status: 400 }
      );
    }

    const systemInstruction = `
      You are Topperdeck's premium AI Context Extraction Engine.
      Analyze the provided user text, topic, or formula. Synthesize it into high-yield study fragments structured exactly into the requested JSON schema.
      Cut out all conversation and pleasantries. Focus on dense, academic engineering value.
    `;

    // 2. Execute content generation with structured output constraint schema
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-lite',
      contents: `Extract this context: ${rawText}`,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.2,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            concepts: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 3 short core concepts, conditions, or insights isolated from the context."
            },
            queries: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 2 highly probable conceptual exam or viva questions derived from this topic."
            },
            formulas: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING, description: "The title or name of the formula/metric (e.g. Force Equation)" },
                  expression: { type: Type.STRING, description: "The mathematical formula using standard symbols (e.g. F = m × a)" }
                },
                required: ["label", "expression"]
              },
              description: "List of key mathematical formulas or structural expressions related to the text."
            }
          },
          required: ["concepts", "queries", "formulas"]
        }
      }
    });

    // 3. Extract safe string fallback text to satisfy TypeScript compilation checks
    const responseText = response.text || '{}';
    const parsedData = JSON.parse(responseText);

    return NextResponse.json(parsedData);

  } catch (error: any) {
    console.error("Synthesizer Pipeline Error:", error);
    return NextResponse.json(
      { error: "Failed to compile live asset vectors." }, 
      { status: 500 }
    );
  }
}