"use client";

import { useState, useEffect } from "react";

interface PlacementModule {
  title: string;
  description: string;
  resources: string[];
}

export default function PlacementHubDashboard() {
  const [activeTab, setActiveTab] = useState<"aptitude" | "interviewQuestions" | "resumeTips" | "hrQuestions">("aptitude");
  const [hubData, setHubData] = useState<Record<string, PlacementModule>>({
    aptitude: {
      title: "Quantitative & Logical Aptitude",
      description: "Master quantitative formulas, numerical shortcuts, and high-frequency pattern evaluation frameworks used by major recruitment firms.",
      resources: ["Quantitative Diagnostic Formula Matrix.pdf", "Logical Deduction & Data Sufficiency Blueprint.docx"]
    },
    interviewQuestions: {
      title: "Core Technical Interview Streams",
      description: "Comprehensive question pools covering fundamental algorithms, database scaling constraints, and object-oriented architectures.",
      resources: ["Top 100 Data Structures & Algorithms Roadmap.pdf", "System Design Reference Guide.pdf"]
    },
    resumeTips: {
      title: "Professional Profile & Resume Structuring",
      description: "ATS-vetted resume blueprints, structural layouts, and high-impact action phrasing designed to capture tech recruiter attention.",
      resources: ["ATS-Compatible Engineering Resume Layout.docx", "Technical Executive Profile Writing Guide.pdf"]
    },
    hrQuestions: {
      title: "Behavioral & HR Evaluation Playbooks",
      description: "Structured communication methodologies to clear behavioral screening rounds utilizing standard executive response framing.",
      resources: ["Behavioral Scenario Preparation Blueprint.pdf", "Corporate Strategy & Leadership Question Inventory.pdf"]
    }
  });
  
  const [unlockedPremium, setUnlockedPremium] = useState(false);
  const [completedTrackingList, setCompletedTrackingList] = useState<string[]>([]);
  const [liveScore, setLiveScore] = useState(0);

  useEffect(() => {
    // Dynamic readiness calculations based on completion rates
    const totalPossibleTasks = 8;
    const completionPercentage = (completedTrackingList.length / totalPossibleTasks) * 100;
    setLiveScore(Math.floor(completionPercentage));
  }, [completedTrackingList]);

  const handleToggleTaskCompletion = (taskKey: string) => {
    setCompletedTrackingList((prev) =>
      prev.includes(taskKey) ? prev.filter((k) => k !== taskKey) : [...prev, taskKey]
    );
  };

  const currentModule = hubData[activeTab];

  return (
    <div className="min-h-screen bg-[#F4F1E8] p-6 sm:p-10 text-slate-800 font-sans antialiased">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* EXECUTIVE HEADER */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b border-[#EBE8E0] gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded">Career Readiness</span>
            </div>
            <h1 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">Placement Hub</h1>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">Isolate academic timelines and access high-probability corporate recruitment preparation modules.</p>
          </div>
          
          <div className="flex items-center gap-3 bg-white p-2 px-3 rounded-xl border border-[#EBE8E0] shadow-2xs">
            <span className="text-[11px] font-bold text-slate-500">Premium Account Tier:</span>
            <button 
              onClick={() => setUnlockedPremium(!unlockedPremium)}
              className={`px-3 py-1 rounded-lg text-[10px] font-mono font-black uppercase tracking-wider transition-all cursor-pointer ${
                unlockedPremium 
                  ? "bg-emerald-50 text-emerald-600 border border-emerald-200" 
                  : "bg-slate-900 text-white hover:bg-slate-800 shadow-2xs"
              }`}
            >
              {unlockedPremium ? "🌟 Unlocked" : "🔒 Unlock Premium Modules"}
            </button>
          </div>
        </header>

        {/* METRICS PLATFORM */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-2xl border border-[#EBE8E0] shadow-3xs space-y-3">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Readiness Analytics</span>
            <div className="flex items-baseline justify-between">
              <div className="text-lg font-black text-slate-900">{unlockedPremium ? `${40 + Math.floor(liveScore * 0.6)}%` : `${Math.floor(liveScore * 0.4)}%`}</div>
              <span className="text-[10px] font-bold text-slate-400">Target Benchmark: 85%</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-50">
              <div 
                className="bg-slate-900 h-full transition-all duration-500 ease-out" 
                style={{ width: `${unlockedPremium ? 40 + liveScore * 0.6 : liveScore * 0.4}%` }}
              />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EBE8E0] shadow-3xs flex flex-col justify-between">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Completed Blueprints</span>
            <div className="text-lg font-black text-indigo-600 font-mono mt-2">
              {completedTrackingList.length} <span className="text-slate-400 text-xs font-sans font-bold">/ 8 Milestones Cleared</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#EBE8E0] shadow-3xs flex flex-col justify-between">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Verification Pipeline</span>
            <div className="text-lg font-black text-emerald-600 flex items-center gap-1.5 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
              <span className="text-xs font-bold text-slate-700">Verified System Ledger Synced</span>
            </div>
          </div>
        </section>

        {/* WORKSPACE LAYOUT SEPARATION */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* LINKED MENU BUTTONS */}
          <nav className="flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-none">
            {(["aptitude", "interviewQuestions", "resumeTips", "hrQuestions"] as const).map((tabKey) => {
              const isSelected = activeTab === tabKey;
              return (
                <button
                  key={tabKey}
                  onClick={() => setActiveTab(tabKey)}
                  className={`flex-1 lg:w-full text-left px-4 py-3 rounded-xl text-xs font-black capitalize transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? "bg-slate-900 text-white shadow-2xs"
                      : "bg-white text-slate-500 border border-[#EBE8E0] hover:border-slate-300"
                  }`}
                >
                  {tabKey.replace(/([A-Z])/g, " $1")}
                </button>
              );
            })}
          </nav>

          {/* ASSET FOCUS REGISTRY VIEW */}
          <main className="lg:col-span-3 bg-white border border-[#EBE8E0] rounded-2xl p-6 sm:p-8 shadow-3xs space-y-6">
            <div className="pb-4 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900">{currentModule.title}</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed font-medium">{currentModule.description}</p>
            </div>

            <div className="space-y-2.5">
              <h4 className="text-[10px] font-black tracking-wider uppercase text-slate-400">Authenticated Preparation Material</h4>
              <div className="space-y-2">
                {currentModule.resources.map((resource, idx) => {
                  const uniqueTaskKey = `${activeTab}-${idx}`;
                  const isChecked = completedTrackingList.includes(uniqueTaskKey);
                  
                  return (
                    <div 
                      key={idx} 
                      className={`p-4 border rounded-xl flex items-center justify-between transition-all ${
                        isChecked ? "bg-slate-50/80 border-slate-200" : "bg-white border-[#EBE8E0] hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input 
                          type="checkbox" 
                          checked={isChecked}
                          onChange={() => handleToggleTaskCompletion(uniqueTaskKey)}
                          className="w-3.5 h-3.5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" 
                        />
                        <span className={`text-xs font-bold ${isChecked ? "line-through text-slate-400" : "text-slate-800"}`}>
                          {resource}
                        </span>
                      </div>
                      
                      <button
                        disabled={!unlockedPremium}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all uppercase ${
                          unlockedPremium 
                            ? "bg-slate-900 text-white hover:bg-slate-800 shadow-3xs cursor-pointer" 
                            : "bg-slate-50 text-slate-400 border border-slate-200 cursor-not-allowed"
                        }`}
                      >
                        {unlockedPremium ? "Download Material" : "🔒 Premium locked"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </main>
        </div>

      </div>
    </div>
  );
}