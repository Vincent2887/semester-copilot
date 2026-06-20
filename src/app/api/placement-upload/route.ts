import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize secure production administrative Supabase client
const supabaseStorageAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || "" // Uses service role to bypass RLS safely for administrative uploads
);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const company = formData.get("company") as string;
    const roundType = formData.get("roundType") as string; // 'aptitude' | 'technical' | 'hr'

    if (!file || !company || !roundType) {
      return NextResponse.json({ error: "Missing required upload parameters matrix." }, { status: 400 });
    }

    // Standardize file paths inside your storage bucket: e.g., google/technical-blueprint.pdf
    const fileExtension = file.name.split(".").pop();
    const cleanCompanyName = company.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const storageFilePath = `${cleanCompanyName}/${roundType}-blueprint.${fileExtension}`;

    // Convert file array buffer into standard upload stream blob
    const fileBuffer = await file.arrayBuffer();

    // Push raw buffer array directly into your public Supabase Storage bucket
    const { data: uploadData, error: uploadError } = await supabaseStorageAdmin.storage
      .from("placement-blueprints")
      .upload(storageFilePath, fileBuffer, {
        contentType: file.type,
        upsert: true, // Upsert true allows you to easily overwrite files anytime later!
      });

    if (uploadError) throw uploadError;

    // Extract public live URL mapping vector for the uploaded asset
    const { data: urlData } = supabaseStorageAdmin.storage
      .from("placement-blueprints")
      .getPublicUrl(storageFilePath);

    return NextResponse.json({
      success: true,
      publicUrl: urlData.publicUrl,
      fileName: file.name
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to commit asset to storage bucket." }, { status: 500 });
  }
}