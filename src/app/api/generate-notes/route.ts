import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const topic = body?.topic;

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 });
    }

    const simulatedNotes = {
      title: `Handwritten Exam Study Guide: ${topic}`,
      metadata: {
        generatedFor: "Telangana Affiliated Campus (CSE Specialty)",
        university: "JNTUH Core Syllabus Matrix",
        timestamp: new Date().toLocaleDateString(),
      },
      chapters: [
        {
          title: "Unit 1: Core Architecture & Syntactic Rules",
          content: `Comprehensive syllabus architecture analysis for ${topic}. This segment breaks down fundamental operations, performance constraints, and regular examination distribution targets.`
        },
        {
          title: "Unit 2: Implementation Models & Edge Cases",
          content: `Advanced technical deep-dive regarding execution mechanics for ${topic}, explicitly focusing on long-form question modules and evaluation criteria.`
        }
      ],
      vivaHighlights: [
        `Explain the primary execution objective of ${topic}.`,
        `Describe worst-case runtime complexity constraints for this configuration.`
      ]
    };

    return NextResponse.json(simulatedNotes);
  } catch (error: any) {
    console.error("AI Route Exception:", error);
    return NextResponse.json({ error: "Internal processing error." }, { status: 500 });
  }
}