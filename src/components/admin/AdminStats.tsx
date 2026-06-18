import React from 'react';
import { PlatformMetrics } from '../../lib/analytics/metrics';

interface AdminStatsProps {
  metrics: PlatformMetrics;
}

export function AdminStats({ metrics }: AdminStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      <div className="bg-white border border-[#EBE8E0] p-6 rounded-3xl shadow-xs">
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Net MRR Valuation</span>
        <div className="text-2xl font-black tracking-tight text-[#4F46E5] mt-2">₹ {metrics.mrr.toLocaleString("en-IN")}</div>
      </div>

      <div className="bg-white border border-[#EBE8E0] p-6 rounded-3xl shadow-xs">
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Onboarded Base</span>
        <div className="text-2xl font-black tracking-tight text-slate-900 mt-2">{metrics.totalUsers}</div>
      </div>

      <div className="bg-white border border-[#EBE8E0] p-6 rounded-3xl shadow-xs">
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Premium Ratio Split</span>
        <div className="text-2xl font-black tracking-tight text-slate-900 mt-2">{metrics.conversionRate}%</div>
      </div>

      <div className="bg-white border border-[#EBE8E0] p-6 rounded-3xl shadow-xs">
        <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider block">Regional Varsity Splits</span>
        <div className="mt-2 space-y-1 text-xs font-bold text-slate-600">
          <div className="flex justify-between"><span>JNTUH:</span><span className="text-slate-900 font-mono">{metrics.varsitySplits.jntuh}</span></div>
          <div className="flex justify-between"><span>Osmania:</span><span className="text-slate-900 font-mono">{metrics.varsitySplits.ou}</span></div>
        </div>
      </div>
    </div>
  );
}