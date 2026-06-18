"use client";

import { useState } from "react";

export default function LegalCompliancePage() {
  const [activeTab, setActiveTab] = useState<"terms" | "privacy" | "refund">("terms");

  return (
    <main className="min-h-screen bg-[#F4F1E8] text-slate-800 font-sans antialiased p-6 md:p-12 max-w-4xl mx-auto">
      {/* HEADER SECTION */}
      <header className="mb-8 pb-4 border-b border-[#EBE8E0]">
        <div className="leading-none">
          <span className="font-serif font-bold text-xl text-slate-900 block">Topperdeck Legal Center</span>
          <span className="text-[10px] font-black tracking-widest uppercase text-slate-400 mt-2 block">Trust & Compliance Guidelines</span>
        </div>
      </header>

      {/* POLICY NAVIGATION TABS */}
      <div className="flex gap-2 border-b border-[#EBE8E0] pb-3 mb-6">
        <button 
          onClick={() => setActiveTab("terms")} 
          className={`px-4 py-2 text-xs font-black rounded-lg transition-all ${activeTab === "terms" ? "bg-slate-900 text-white" : "text-slate-400 hover:bg-slate-100"}`}
        >
          Terms & Conditions
        </button>
        <button 
          onClick={() => setActiveTab("privacy")} 
          className={`px-4 py-2 text-xs font-black rounded-lg transition-all ${activeTab === "privacy" ? "bg-slate-900 text-white" : "text-slate-400 hover:bg-slate-100"}`}
        >
          Privacy Policy
        </button>
        <button 
          onClick={() => setActiveTab("refund")} 
          className={`px-4 py-2 text-xs font-black rounded-lg transition-all ${activeTab === "refund" ? "bg-slate-900 text-white" : "text-slate-400 hover:bg-slate-100"}`}
        >
          Refund Policy
        </button>
      </div>

      {/* DYNAMIC CONTENT SWITCHER */}
      <section className="bg-white border border-[#EBE8E0] p-6 md:p-8 rounded-3xl shadow-3xs text-xs md:text-sm text-slate-700 leading-relaxed space-y-4">
        
        {activeTab === "terms" && (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">1. Terms and Conditions of Service</h2>
            <p>Welcome to Topperdeck. By logging into our dashboard tools or using our study compilation systems, you fully agree to be bound by these operating rules.</p>
            
            <h3 className="font-black text-slate-900 mt-3">A. User Accounts & Fair Access</h3>
            <p>Topperdeck accounts are granted strictly for individual academic revision use. Account sharing, credential distribution, or deploying automated scrapers/bots to extract structural past paper indexes is strictly prohibited and will result in permanent account termination.</p>
            
            <h3 className="font-black text-slate-900 mt-3">B. Limitation of Liability</h3>
            <p>All resource handouts, exam night predictions, confidence scores, and past data logs are compiled strictly for general educational purposes. Students are strongly encouraged to verify vital exam curriculum guidelines against official university mandates.</p>
          </div>
        )}

        {activeTab === "privacy" && (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">2. Student Privacy Protection Blueprint</h2>
            <p>Your privacy is central to how we construct our platform parameters. We ensure your personal information remains strictly protected.</p>
            
            <h3 className="font-black text-slate-900 mt-3">A. Information Collection Practices</h3>
            <p>We log your basic registration parameters (Name, Email, and University/College selections) purely to curate your dynamic dashboard trail view. We do not track or permanently monitor any personal usage beyond technical system maintenance protocols.</p>
            
            <h3 className="font-black text-slate-900 mt-3">B. Data Selling Commitment</h3>
            <blockquote className="border-l-4 border-indigo-500 pl-4 my-2 italic font-medium bg-slate-50 p-2 rounded">
              "Topperdeck explicitly guarantees that we do not sell, distribute, trade, or rent personal student information to third-party data collection groups under any circumstances."
            </blockquote>
          </div>
        )}

        {activeTab === "refund" && (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">3. Digital Purchase Refund Framework</h2>
            <p>Because our resources consist of instantly accessible digital documents and pre-compiled study packages, our refund policy balances absolute transparency with business security.</p>
            
            <h3 className="font-black text-slate-900 mt-3">A. Eligibility Boundaries</h3>
            <p>Refunds may be processed within <strong>7 days</strong> of a premium package registration or wallet top-up, provided the user account has consumed fewer than <strong>2 free trial credits</strong> or has not generated any premium Exam Night Packs.</p>
            
            <h3 className="font-black text-slate-900 mt-3">B. Processing Channel</h3>
            <p>Approved reversals will be credited back directly to the original transactional payment gateway pipeline node (UPI, Card, or Net Banking asset track) within 5–7 operational working days.</p>
          </div>
        )}

      </section>

      {/* SUPPORT FOOTER */}
      <footer className="mt-8 text-center text-[11px] font-bold text-slate-400">
        Need assistance? Connect via support channels at: <span className="text-slate-600 underline">support@topperdeck.com</span>
      </footer>
    </main>
  );
}