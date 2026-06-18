import { supabase } from '../supabase';

export interface PlatformMetrics {
  totalUsers: number;
  premiumUsers: number;
  mrr: number;
  conversionRate: number;
  varsitySplits: { jntuh: number; ou: number };
}

export async function fetchPlatformMetricsEngine(): Promise<PlatformMetrics> {
  const { data, error } = await supabase.rpc('get_platform_metric_summary');
  
  if (error) {
    throw new Error(`Metrics aggregation cluster failure: ${error.message}`);
  }

  const summary = data[0];
  return {
    totalUsers: Number(summary?.total_users || 0),
    premiumUsers: Number(summary?.premium_users || 0),
    mrr: Number(summary?.total_mrr || 0),
    conversionRate: Number(summary?.conversion_rate || 0),
    varsitySplits: {
      jntuh: Number(summary?.jntuh_count || 0),
      ou: Number(summary?.ou_count || 0)
    }
  };
}