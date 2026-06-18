import { supabase } from "@/lib/supabase";

export async function fetchDashboardMetrics() {
  const { data, error } = await supabase.rpc("get_dashboard_metrics");
  if (error) throw error;
  return data;
}

export async function fetchUsers(page = 0, limit = 10) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })
    .range(page * limit, page * limit + limit - 1);

  if (error) throw error;
  return data;
}

export async function togglePremium(userId: string, isPremium: boolean) {
  const { error } = await supabase
    .from("profiles")
    .update({
      is_premium: isPremium,
      mrr_contribution: isPremium ? 299 : 0,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId);

  if (error) throw error;
}