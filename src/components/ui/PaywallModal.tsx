"use client";

import React from 'react';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  cramMode: boolean;
}

export function PaywallModal({ isOpen, onClose, cramMode }: PaywallModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/40 animate-fadeIn">
      <div className={`w-full max-w-md rounded-3xl p-6 border transition-all duration-300 transform scale-100 shadow-2xl ${
        cramMode 
          ? "bg-[#1A0E0E] border-red-900/50 text-[#F5EBEB]" 
          : "bg-white border-[#EBE8E0] text-slate-800"
      }`}>
        {/* Header Close */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">💎</span>
            <span className="text-[10px] font-black tracking-widest uppercase text-purple-500 font-mono">Premium Upgrade Required</span>
          </div>
          <button 
            onClick={onClose}
            className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold border transition-all cursor-pointer ${
              cramMode ? "bg-[#291414] border-red-950 text-red-400 hover:bg-[#3D1E1E]" : "bg-slate-50 border-slate-200 hover:border-slate-400"
            }`}
          >
            ✕
          </button>
        </div>

        {/* Value Proposition Statement */}
        <div className="text-center space-y-3 mb-6">
          <h3 className="text-lg font-black tracking-tight leading-tight">
            Unlock Unlimited Semester Access
          </h3>
          <p className={`text-xs font-medium leading-relaxed px-2 ${cramMode ? "text-red-300/70" : "text-slate-400"}`}>
            Your free signup trial credits have been exhausted. Don't let mid-terms stop your momentum. Lock down your grade instantly.
          </p>
        </div>

        {/* Premium Bullet Checklist Nodes */}
        <div className="space-y-2 mb-6">
          {[
            "Infinite access to JNTUH & OU past archives",
            "Full library of Engineering Lab Manuals & Code",
            "Inline AI Study Engine prompt solutions solver",
            "Offline offline PDF access keys downloads"
          ].map((feature, idx) => (
            <div key={idx} className={`flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold border ${
              cramMode ? "bg-[#241414]/50 border-red-950/40" : "bg-slate-50 border-slate-100"
            }`}>
              <span className="text-emerald-500">✔</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>

        {/* Monetization Pricing Primary Call To Action */}
        <div className="space-y-3">
          <button 
            onClick={() => alert("Redirecting secure Stripe/Razorpay portal handshake...")}
            className="w-full text-center bg-purple-600 hover:bg-purple-700 text-white text-xs font-black py-3.5 rounded-xl shadow-md transition-all tracking-wide uppercase cursor-pointer"
          >
            Unlock Everything • ₹299 / Semester
          </button>
          <div className="text-[10px] text-center font-medium text-slate-400">
            Secure encryption interface • Cancel membership anytime
          </div>
        </div>
      </div>
    </div>
  );
}