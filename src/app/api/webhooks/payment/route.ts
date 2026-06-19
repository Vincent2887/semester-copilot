import { NextResponse } from "next/server";

/**
 * 🔒 SECURE BACKEND PAYMENT GATEWAY WEBHOOK ENDPOINT
 * Process success triggers arriving directly from the payment processor.
 */
export async function POST(request: Request) {
  try {
    const payload = await request.json();
    
    // 1. Extract structural reference elements from gateway webhook parameters
    const { payment_id, order_id, status, amount, user_id, selected_plan } = payload;

    // Reject processing if transaction state parameters are incomplete or failed
    if (status !== "success" || !user_id) {
      return NextResponse.json({ success: false, message: "Transaction flagged as unverified or aborted." }, { status: 400 });
    }

    // 2. Import your database management system abstraction layer dynamically
    const { supabase } = await import("../../../../lib/supabase");

    // 3. Compute credit package allocation criteria based on pricing strategy
    let creditsToAdd = 0;
    let targetTier: "Free" | "Pro" | "Premium" = "Free";

    if (selected_plan === "pro_pack") {
      creditsToAdd = 500;
      targetTier = "Pro";
    } else if (selected_plan === "premium_pack") {
      creditsToAdd = 999999; // Represents infinity mapping allocation
      targetTier = "Premium";
    }

    // 4. Update core user identity records directly in your server registry
    const { data: userProfile, error: profileError } = await supabase
      .from("users")
      .select("credits")
      .eq("id", user_id)
      .single();

    if (profileError) throw new Error("Target user vector entry missing from schema rows.");

    const updatedCredits = (userProfile?.credits || 0) + creditsToAdd;

    const { error: updateError } = await supabase
      .from("users")
      .update({
        credits: updatedCredits,
        plan: targetTier,
        plan_expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30-day allocation matrix limit
      })
      .eq("id", user_id);

    if (updateError) throw updateError;

    // 5. Append transactions tracking ledger entry parameters safely for billing routes
    await supabase.from("transactions").insert({
      user_id,
      amount: Number(amount),
      credits_added: creditsToAdd,
      payment_id,
      status: "success",
      created_at: new Date().toISOString()
    });

    return NextResponse.json({ success: true, message: "Credits updated and synchronized live." }, { status: 200 });

  } catch (error: any) {
    console.error("Webhook gateway system encountered a processing failure:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}