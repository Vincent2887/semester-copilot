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
  const [simulatedLog, setSimulatedLog] = useState<string>("SYSTEM: Idle. Ready for assessment deployment stream.");
  const [liveScore, setLiveScore] = useState(45);

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

  // Compute live analytical scores to dynamically drive the UI presentation
  useEffect(() => {
    const baseScore = unlockedPremium ? 75 : 45;
    const progressBonus = completedTrackingList.length * 6.25; // Scales up cleanly
    setLiveScore(Math.min(Math.floor(baseScore + progressBonus), 100));
  }, [unlockedPremium, completedTrackingList]);

  const handleToggleTaskCompletion = (taskKey: string, resourceName: string) => {
    const isNowChecked = !completedTrackingList.includes(taskKey);
    setCompletedTrackingList((prev) =>
      prev.includes(taskKey) ? prev.filter((k) => k !== taskKey) : [...prev, taskKey]
    );
    
    setSimulatedLog(
      isNowChecked 
        ? `MAP_TRACE: Successfully committed artifact [${resourceName}] to secure profile vault.`
        : `SYSTEM_WARN: Extracted resource reference [${resourceName}] from completion log metrics.`
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#07090e] flex flex-col items-center justify-center font-mono text-xs text-indigo-400 space-y-4">
        <div className="w-12 h-12 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
        <div className="animate-pulse tracking-widest uppercase">Initializing Quantum Career Node Matrix...</div>
      </div>
    );
  }

  const currentModule = hubData?.[activeTab];

  return (
    <div className="min-h-screen bg-[#090b11] text-slate-100 p-6 sm:p-10 font-sans antialiased relative overflow-hidden selection:bg-indigo-500/30">
      
      {/* BACKGROUND GRAPH AMBIENT CORONA EFFECTS */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[160px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        
        {/* TOP GLASSMORPHISM COMMAND HUD HEADER */}
        <header className="backdrop-blur-xl bg-slate-900/40 border border-slate-800/60 p-6 sm:p-8 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-2xl relative">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 rounded-md text-[9px] font-mono uppercase tracking-widest font-black">
                Corporate Gate v4.1
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
              Placement Command Hub
            </h1>
            <p className="text-xs text-slate-400 font-medium max-w-2xl">
              Isolate academic parameters. Access enterprise recruitment simulations, high-probability algorithmic tracking pools, and elite presentation frameworks.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-950/60 border border-slate-800/80 p-4 rounded-2xl w-full md:w-auto justify-between md:justify-start">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Access Authority</span>
              <span className={`text-xs font-black ${unlockedPremium ? "text-emerald-400 shadow-emerald-400/10" : "text-purple-400"}`}>
                {unlockedPremium ? "🌟 ELITE ACCESS" : "🔒 SANDBOX RESTRICTED"}
              </span>
            </div>
            <button 
              onClick={() => {
                setUnlockedPremium(!unlockedPremium);
                setSimulatedLog(unlockedPremium ? "AUTH: Session authority scale lowered to tier limits." : "AUTH: Enterprise clearance certificate verified. Elite node clusters online.");
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-black uppercase tracking-wider transition-all duration-300 transform active:scale-95 ${
                unlockedPremium 
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20" 
                  : "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 hover:shadow-indigo-500/40 border border-indigo-400/20"
              }`}
            >
              {unlockedPremium ? "Revoke Auth" : "Bypass Restrictions"}
            </button>
          </div>
        </header>

        {/* HIGH-FIDELITY TELEMETRY RECON CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          
          {/* CARD 1: QUANTUM PREPAREDNESS GAUGE */}
          <div className="bg-gradient-to-b from-slate-900/60 to-slate-950/60 border border-slate-800/50 p-6 rounded-2xl shadow-xl flex flex-col justify-between relative group">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Readiness Index</span>
                <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md font-mono font-bold">{liveScore}%</span>
              </div>
              <div className="text-xl font-black text-slate-100 flex items-center gap-2">
                <span>🛡️</span> Corporate Assessment Readiness
              </div>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-4 border border-slate-950">
              <div 
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 h-full transition-all duration-700 ease-out" 
                style={{ width: `${liveScore}%` }}
              />
            </div>
          </div>

          {/* CARD 2: DYNAMIC TASK QUANTIZATION INDEX */}
          <div className="bg-gradient-to-b from-slate-900/60 to-slate-950/60 border border-slate-800/50 p-6 rounded-2xl shadow-xl flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">Artifact Checklist Integrity</span>
              <div className="text-2xl font-black text-indigo-400 tracking-tight font-mono">
                {completedTrackingList.length} <span className="text-slate-600 text-sm font-sans font-medium">/ 8 Milestones Vetted</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-400 mt-3 border-l-2 border-indigo-500/40 pl-2">
              Syncing verification hooks into your centralized local registry framework dynamically.
            </p>
          </div>

          {/* CARD 3: REAL-TIME SECURE STREAM PACKET FEED */}
          <div className="bg-gradient-to-b from-slate-900/60 to-slate-950/60 border border-slate-800/50 p-6 rounded-2xl shadow-xl flex flex-col justify-between font-mono">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Live Kernel Log Matrix</span>
              <div className="text-[10px] text-emerald-400 bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 min-h-[64px] break-all leading-relaxed shadow-inner">
                {simulatedLog}
              </div>
            </div>
          </div>
        </section>

        {/* CORE INTERACTION MATRIX LAYOUT PANEL */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          
          {/* NAVIGATION SIDEBAR */}
          <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-3 lg:pb-0 scrollbar-none">
            {(["aptitude", "interviewQuestions", "resumeTips", "hrQuestions"] as const).map((tabKey) => {
              const isActive = activeTab === tabKey;
              return (
                <button
                  key={tabKey}
                  onClick={() => {
                    setActiveTab(tabKey);
                    setSimulatedLog(`NAV_TRACE: Shifted active cluster partition index focus to [${tabKey}].`);
                  }}
                  className={`flex-1 lg:w-full text-left px-5 py-4 rounded-xl text-xs font-mono font-black tracking-wider capitalize border whitespace-nowrap transition-all duration-300 transform active:scale-[0.98] flex items-center justify-between ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-600 to-indigo-700 text-white border-indigo-500 shadow-lg shadow-indigo-600/20"
                      : "bg-slate-900/40 text-slate-400 border-slate-800/60 hover:bg-slate-800/40 hover:text-slate-200"
                  }`}
                >
                  <span>{tabKey.replace(/([A-Z])/g, " $1")}</span>
                  {isActive && <span className="text-indigo-200 animate-pulse text-[10px]">● ACTIVE</span>}
                </button>
              );
            })}
          </nav>

          {/* MAIN SIMULATION DISPLAY SCREEN */}
          <main className="lg:col-span-3 backdrop-blur-xl bg-slate-900/30 border border-slate-800/60 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            {currentModule ? (
              <>
                <div className="pb-4 border-b border-slate-800/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-black bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
                      {currentModule.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 font-medium">{currentModule.description}</p>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-500 bg-slate-950 border border-slate-800/80 px-2.5 py-1 rounded-lg">
                    {currentModule.resources.length} Compiled Artifacts
                  </span>
                </div>

                <div className="space-y-3">
                  <h4 className="text-[10px] font-mono font-black tracking-widest uppercase text-slate-500">
                    Enterprise Pipeline Blueprint Blocks
                  </h4>
                  <div className="space-y-3">
                    {currentModule.resources.map((resource, idx) => {
                      const uniqueTaskKey = `${activeTab}-${idx}`;
                      const isDone = completedTrackingList.includes(uniqueTaskKey);
                      
                      return (
                        <div 
                          key={idx} 
                          className={`p-4 border rounded-xl flex items-center justify-between transition-all duration-300 group ${
                            isDone 
                              ? "bg-slate-950/40 border-slate-800/40 opacity-60 shadow-none" 
                              : "bg-slate-900/60 border-slate-800/60 hover:border-slate-700 hover:bg-slate-900 shadow-md shadow-slate-950/20"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="relative flex items-center">
                              <input 
                                type="checkbox" 
                                checked={isDone}
                                onChange={() => handleToggleTaskCompletion(uniqueTaskKey, resource)}
                                className="w-4 h-4 rounded border-slate-700 bg-slate-950 text-indigo-600 focus:ring-indigo-500 cursor-pointer focus:ring-offset-slate-900" 
                              />
                            </div>
                            <span className={`text-xs font-bold transition-all ${isDone ? "line-through text-slate-500" : "text-slate-200 group-hover:text-white"}`}>
                              {resource}
                            </span>
                          </div>
                          
                          <button
                            disabled={!unlockedPremium}
                            className={`px-4 py-2 rounded-xl text-[10px] font-mono font-black transition-all duration-300 uppercase tracking-wider ${
                              unlockedPremium 
                                ? "bg-slate-100 text-slate-900 hover:bg-white cursor-pointer shadow-md transform hover:scale-105" 
                                : "bg-slate-950/80 text-slate-500 border border-slate-800/60 cursor-not-allowed group-hover:border-purple-500/20 group-hover:text-purple-400/80"
                            }`}
                          >
                            {unlockedPremium ? "📥 Inject Stream" : "🔒 Premium Lock"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-xs font-mono font-bold text-slate-500">
                ⚠️ FAULT: Subsystem data matrix mismatch. Failed to bind target memory references.
              </div>
            )}
          </main>
        </div>

      </div>
    </div>
  );
}