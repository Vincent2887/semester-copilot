import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const { data } = await supabase.from("profiles").select("*");

  const users = data || [];

  return NextResponse.json({
    totalUsers: users.length,
    premiumUsers: users.filter(u => u.is_premium).length,
    mrr: users.reduce((s, u) => s + Number(u.mrr_contribution || 0), 0),
    conversionRate:
      users.length
        ? (users.filter(u => u.is_premium).length / users.length) * 100
        : 0
  });
}