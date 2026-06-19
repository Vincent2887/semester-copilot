import { createClient } from "@supabase/supabase-js";

// Database Configuration Schema Interfaces
export interface DbUserIdentity {
  id: string;
  email: string;
  credits: number;
  plan: "Free" | "Pro" | "Premium";
  plan_expiry: string | null;
  created_at?: string;
}

export interface DbTransactionRecord {
  id: string;
  user_id: string;
  amount: number;
  credits_added: number;
  payment_id: string;
  status: "pending" | "success" | "failed";
  created_at: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-url.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-token-string";

// Instantiate Strongly-Typed Database Client Wrapper
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * 🔐 SECURE DATABASE SERVICES ENGINE
 * Client queries to safely read data from the server registry.
 * (State mutations like credit additions occur exclusively via webhooks).
 */
export const userDatabaseService = {
  
  /**
   * Fetches core plan and token configurations for an authenticated user matrix
   */
  async fetchUserProfile(userId: string): Promise<{ data: DbUserIdentity | null; error: any }> {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("id, email, credits, plan, plan_expiry")
        .eq("id", userId)
        .single();
        
      return { data: data as DbUserIdentity | null, error };
    } catch (err) {
      return { data: null, error: err };
    }
  },

  /**
   * Tracks token usage decrement triggers safely on backend check gates
   */
  async deductUserCredits(userId: string, costAmount: number): Promise<boolean> {
    try {
      // 1. Fetch current balances first
      const { data: profile } = await this.fetchUserProfile(userId);
      if (!profile) return false;
      
      // Premium tier circumvents credit limits cleanly
      if (profile.plan === "Premium") return true;
      if (profile.credits < costAmount) return false;

      // 2. Perform isolated adjustment update
      const { error } = await supabase
        .from("users")
        .update({ credits: profile.credits - costAmount })
        .eq("id", userId);

      return !error;
    } catch (err) {
      console.error("Credit sync routine intercepted error:", err);
      return false;
    }
  },

  /**
   * Queries structural history parameters for target billing routes
   */
  async fetchUserTransactionHistory(userId: string): Promise<DbTransactionRecord[]> {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) return [];
    return data as DbTransactionRecord[];
  }
};