"use client";

import { useState, useEffect } from "react";

interface PlacementModule {
  title: string;
  description: string;
  resources: string[];
}

export default function PlacementHubDashboard() {
  const [activeTab, setActiveTab] = useState<"aptitude" | "interviewQuestions" | "resumeTips" | "hrQuestions">("aptitude");
  const [hubData, setHubData] = useState<Record<string, PlacementModule> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [unlockedPremium, setUnlockedPremium] = useState(false);
  const [completedTrackingList, setCompletedTrackingList] = useState<string[]>([]);

  useEffect(() => {
    async function fetchHubData() {
      try {
        const response = await fetch("/api/placement-hub");
        const result = await response.json();
        if (result.success && result.modules) {
          setHubData(result.modules);
        }
      } catch (error) {
        console.error("Failed to retrieve placement tracking matrices:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchHubData();
  }, []);

  const handleToggleTaskCompletion = (taskKey: string) => {
    setCompletedTrackingList((prev) =>
      prev.includes(taskKey) ? prev.filter((k) => k !== taskKey) : [...prev, taskKey]
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F4F1E8] flex items-center justify-center font-sans">
        <div className="text-xs font-mono font-bold text-slate-400 animate-pulse">
          ⚡ Initializing Career Placement Registry Hub...
        </div>
      </div>
    );
  }

  const currentModule = hubData?.[activeTab];

  return (
    <div className="min-h-screen bg-[#F4F1E8] p-6 sm:p-10 text-slate-800 font-sans antialiased">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-[#EBE8E0] gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">Placement Hub</h1>
            <p className="text-xs text-slate-400 mt-1">Isolate your technical campus metrics from professional corporate recruitment tracks.</p>
          </div>
          <div className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-[#EBE8E0] shadow-3xs">
            <span className="text-xs font-bold text-slate-600">Premium Preparation Pass:</span>
            <button 
              onClick={() => setUnlockedPremium(!unlockedPremium)}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-mono font-black uppercase tracking-wider transition-all ${
                unlockedPremium ? "bg-emerald-50 text-emerald-600 border border-emerald-200" : "bg-purple-600 text-white shadow-2xs"
              }`}
            >
              {unlockedPremium ? "🌟 Unlocked" : "🔒 Unlock Pass"}
            </button>
          </div>
        </header>

        {/* ANALYTICS TRACKING GAUGES */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#EBE8E0] shadow-3xs space-y-2">
            <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest block">System Readiness Tier</span>
            <div className="text-lg font-black text-slate-900 flex items-center gap-2">
              <span>🚀</span> {unlockedPremium ? "Elite Tier Active" : "Standard Sandbox Tier"}
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#EBE8E0] shadow-3xs space-y-2">
            <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest block">Completed Milestones</span>
            <div className="text-lg font-black text-indigo-600">
              {completedTrackingList.length} / 8 Tasks Finished
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#EBE8E0] shadow-3xs space-y-2">
            <span className="text-[10px] font-mono font-black text-slate-400 uppercase tracking-widest block">Registry Status</span>
            <div className="text-lg font-black text-emerald-600 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-ping"></span> Live Link
            </div>
          </div>
        </section>

        {/* SYSTEM WORKSPACE NAVIGATION TABS */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* NAVIGATION BAR */}
          <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0">
            {(["aptitude", "interviewQuestions", "resumeTips", "hrQuestions"] as const).map((tabKey) => (
              <button
                key={tabKey}
                onClick={() => setActiveTab(tabKey)}
                className={`flex-1 lg:w-full text-left px-4 py-3 rounded-xl text-xs font-black capitalize border whitespace-nowrap transition-all ${
                  activeTab === tabKey
                    ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                    : "bg-white text-slate-500 border-[#EBE8E0] hover:bg-slate-50"
                }`}
              >
                {tabKey.replace(/([A-Z])/g, " $1")}
              </button>
            ))}
          </nav>

          {/* ATTRIBUTE WORKSPACE RENDERING PANEL */}
          <main className="lg:col-span-3 bg-white border border-[#EBE8E0] rounded-3xl p-6 sm:p-8 shadow-3xs space-y-6">
            {currentModule && (
              <>
                <div>
                  <h3 className="text-base font-black text-slate-900">{currentModule.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{currentModule.description}</p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[11px] font-black tracking-wider uppercase text-slate-400">Curated Corporate Blueprints</h4>
                  <div className="space-y-2">
                    {currentModule.resources.map((resource, idx) => {
                      const uniqueTaskKey = `${activeTab}-${idx}`;
                      const isDone = completedTrackingList.includes(uniqueTaskKey);
                      
                      return (
                        <div 
                          key={idx} 
                          className={`p-4 border rounded-xl flex items-center justify-between transition-all ${
                            isDone ? "bg-slate-50 border-slate-200 opacity-70" : "bg-white border-[#EBE8E0] hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input 
                              type="checkbox" 
                              checked={isDone}
                              onChange={() => handleToggleTaskCompletion(uniqueTaskKey)}
                              className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" 
                            />
                            <span className={`text-xs font-bold ${isDone ? "line-through text-slate-400" : "text-slate-800"}`}>
                              {resource}
                            </span>
                          </div>
                          
                          <button
                            disabled={!unlockedPremium}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all uppercase ${
                              unlockedPremium 
                                ? "bg-slate-900 text-white hover:bg-slate-800 cursor-pointer shadow-3xs" 
                                : "bg-slate-100 text-slate-400 cursor-not-allowed"
                            }`}
                          >
                            {unlockedPremium ? "Download" : "🔒 Pro Only"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </main>
        </div>

      </div>
    </div>
  );
}