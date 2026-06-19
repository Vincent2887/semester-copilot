import { NextResponse } from "next/server";

/**
 * 🔍 SERVER-SIDE PLACEMENT REGISTRY GATEWAY
 * Dynamically streams verified professional prep modules from Supabase tables.
 */
export async function GET() {
  try {
    const { supabase } = await import("../../../lib/supabase");

    // Fetch resources directly from the custom placement matrix table
    const { data: records, error } = await supabase
      .from("placement_resources")
      .select("category, title, description, resources");

    if (error) {
      throw new Error(`Database catalog matrix lookup faulted: ${error.message}`);
    }

    // Restructure the array records into the key-value dictionary map the frontend UI expects
    const dynamicModuleRegistry = records.reduce((acc: any, currentItem: any) => {
      acc[currentItem.category] = {
        title: currentItem.title,
        description: currentItem.description,
        resources: currentItem.resources
      };
      return acc;
    }, {});

    return NextResponse.json(
      {
        success: true,
        message: "Dynamic enterprise placement vectors successfully compiled.",
        modules: dynamicModuleRegistry
      },
      { status: 200 }
    );

  } catch (pipelineInterrupt: any) {
    console.error("Placement API framework dropped session tracking hooks:", pipelineInterrupt.message);
    return NextResponse.json(
      { success: false, error: pipelineInterrupt.message },
      { status: 500 }
    );
  }
}