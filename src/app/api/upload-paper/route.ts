import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Initialize server-side client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, university, college, branch, year, examType, fileUrl } = body;

    // Direct database write on the server background layer
    const { data, error } = await supabase.from("papers").insert([
      {
        title: title.trim(),
        university,
        college,
        branch,
        year: year || "2nd Year",
        exam_type: examType || "Mid",
        file_url: fileUrl,
      }
    ]).select();

    if (error) throw error;

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    console.error("Server Insert Error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}