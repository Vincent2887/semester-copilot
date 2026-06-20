"use client";

import { useState } from "react";

// 🌐 EASILY ADD AND CUSTOMIZE MNC DATA CHIPS HERE LATER
const MNC_COMPANIES = [
  { id: "all", name: "General Core" },
  { id: "tcs", name: "TCS (Ninja/Digital)" },
  { id: "infosys", name: "Infosys" },
  { id: "cognizant", name: "Cognizant" },
  { id: "wipro", name: "Wipro" },
  { id: "accenture", name: "Accenture" }
];

type TabType = "Aptitude" | "Interview Questions" | "Resume Tips" | "Hr Questions";

export default function PlacementHubPage() {
  const [activeTab, setActiveTab] = useState<TabType>("Interview Questions");
  const [selectedCompany, setSelectedCompany] = useState<string>("all");

  const tabs: TabType[] = ["Aptitude", "Interview Questions", "Resume Tips", "Hr Questions"];

  return (
    <div className="min-h-screen bg-[#F6F5F2] font-sans antialiased text-stone-900 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* TOP BAR HEADER MODULE */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-stone-200">
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-wider uppercase bg-indigo-50 text-indigo-600 mb-1.5">
              CAREER READINESS
            </span>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">Placement Hub</h1>
            <p className="text-xs text-stone-400 mt-0.5">
              Isolate academic timelines and access high-probability corporate recruitment preparation modules.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-stone-200 bg-white p-2 px-4 shadow-2xs text-xs font-bold">
            <span className="text-stone-400">Premium Account Tier:</span>
            <span className="bg-emerald-50 text-emerald-700 rounded-lg px-2 py-0.5 uppercase tracking-wide text-[10px] font-black flex items-center gap-1">
              🌟 UNLOCKED
            </span>
          </div>
        </header>

        {/* METRICS ANALYTICS PANEL ROW MATCHING image_a3ae81.png */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* CARD 1: READINESS ANALYTICS */}
          <div className="bg-white border border-stone-200/80 p-6 rounded-2xl shadow-3xs flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-black tracking-wider uppercase text-stone-400">READINESS ANALYTICS</span>
              <div className="flex justify-between items-baseline mt-2">
                <span className="text-xl font-black text-slate-900">40%</span>
                <span className="text-[10px] text-stone-400 font-bold">Target Benchmark: 85%</span>
              </div>
            </div>
            <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden mt-4">
              <div className="bg-slate-900 h-full w-[40%]" />
            </div>
          </div>

          {/* CARD 2: COMPLETED BLUEPRINTS */}
          <div className="bg-white border border-stone-200/80 p-6 rounded-2xl shadow-3xs flex flex-col justify-center">
            <span className="text-[9px] font-black tracking-wider uppercase text-stone-400 block">COMPLETED BLUEPRINTS</span>
            <p className="text-sm font-bold text-stone-500 mt-2">
              <span className="text-indigo-600 font-black text-xl">0</span> / 8 Milestones Cleared
            </p>
          </div>

          {/* CARD 3: VERIFICATION PIPELINE */}
          <div className="bg-white border border-stone-200/80 p-6 rounded-2xl shadow-3xs flex flex-col justify-center">
            <span className="text-[9px] font-black tracking-wider uppercase text-stone-400 block">VERIFICATION PIPELINE</span>
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 mt-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Verified System Ledger Synced</span>
            </div>
          </div>

        </div>

        {/* INTERACTIVE COMPANYS CRUMBS ROW */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-stone-200/60">
          <span className="text-[10px] font-black uppercase text-stone-400 mr-2 whitespace-nowrap">Filter Company:</span>
          {MNC_COMPANIES.map((company) => (
            <button
              key={company.id}
              onClick={() => setSelectedCompany(company.id)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all border whitespace-nowrap ${
                selectedCompany === company.id
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
              }`}
            >
              {company.name}
            </button>
          ))}
        </div>

        {/* SPLIT NAVIGATION AND PREPARATION VIEWPORT WORKING MATRIX */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT BUTTONS SIDEBAR SELECTION PANEL */}
          <nav className="lg:col-span-3 flex flex-col gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-5 py-3.5 rounded-xl text-xs font-bold transition-all border text-left ${
                  activeTab === tab
                    ? "bg-[#0F172A] text-white border-[#0F172A] font-black shadow-sm"
                    : "bg-white text-stone-600 border-stone-200/80 hover:bg-stone-50 hover:text-stone-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* RIGHT SCREEN DYNAMIC DISPLAY LABELS FRAMEWORK */}
          <div className="lg:col-span-9 bg-white border border-stone-200/80 rounded-2xl p-6 shadow-sm min-h-[400px]">
            
            {/* VIEW CONTAINER HEADER */}
            <div className="border-b border-stone-100 pb-4 mb-6">
              <h3 className="text-sm font-black text-slate-900">
                {activeTab} Stream — {MNC_COMPANIES.find(c => c.id === selectedCompany)?.name}
              </h3>
              <p className="text-xs text-stone-400 mt-1">
                {activeTab === "Aptitude" && "Comprehensive analytical practice logs filtering quantitative, numerical, and logic constraints."}
                {activeTab === "Interview Questions" && "Comprehensive question pools covering fundamental algorithms, database scaling constraints, and object-oriented architectures."}
                {activeTab === "Resume Tips" && "ATS-optimized configuration guidelines, structural impact framing, and technical presentation keywords."}
                {activeTab === "Hr Questions" && "Core corporate leadership behavioral assessments, operational situational scripts, and verbal talking points."}
              </p>
            </div>

            {/* DYNAMIC ASSETS PLACEHOLDERS READY FOR RECRUITMENT LOGS */}
            <div className="space-y-4">
              <span className="text-[10px] font-black text-stone-400 uppercase block tracking-wider">
                AUTHENTICATED PREPARATION MATERIAL
              </span>

              {/* SHEET RESOURCE ITEM BLOCK 1 */}
              <div className="border border-stone-200/60 rounded-xl p-4 bg-stone-50/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-white transition-all">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 border-stone-300" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      {activeTab === "Aptitude" && "Quantitative Aptitude Repeated Patterns Checklist.pdf"}
                      {activeTab === "Interview Questions" && "Top 100 Data Structures & Algorithms Roadmap.pdf"}
                      {activeTab === "Resume Tips" && "High-Impact Project Presentation ATS Formula.pdf"}
                      {activeTab === "Hr Questions" && "Behavioral STAR Methodology Response Scripts.pdf"}
                    </span>
                    <span className="text-[10px] text-stone-400 font-medium block mt-0.5">Community Verified Blueprint Node</span>
                  </div>
                </div>
                <button className="w-full sm:w-auto bg-[#0F172A] text-white text-[10px] font-black tracking-wide uppercase px-4 py-2 rounded-lg hover:bg-stone-800 transition whitespace-nowrap">
                  DOWNLOAD MATERIAL
                </button>
              </div>

              {/* SHEET RESOURCE ITEM BLOCK 2 */}
              <div className="border border-stone-200/60 rounded-xl p-4 bg-stone-50/40 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-white transition-all">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 border-stone-300" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">
                      {activeTab === "Aptitude" && "Logical Reasoning Matrix & Syllogisms Pack.pdf"}
                      {activeTab === "Interview Questions" && "System Design Reference Guide.pdf"}
                      {activeTab === "Resume Tips" && "Technical Core Keyword Dictionary for MNCs.pdf"}
                      {activeTab === "Hr Questions" && "Top 20 Situation Management Managerial Logs.pdf"}
                    </span>
                    <span className="text-[10px] text-stone-400 font-medium block mt-0.5">MNC Target Optimization Matrix</span>
                  </div>
                </div>
                <button className="w-full sm:w-auto bg-[#0F172A] text-white text-[10px] font-black tracking-wide uppercase px-4 py-2 rounded-lg hover:bg-stone-800 transition whitespace-nowrap">
                  DOWNLOAD MATERIAL
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}