"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  BookOpen, 
  FileText, 
  Cpu, 
  Bookmark, 
  Briefcase, 
  Layers, 
  Sun 
} from "lucide-react";

interface SidebarItem {
  name: string;
  href: string;
  icon: any;
  isActive?: boolean;
}

export default function AIStudyEnginePage() {
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("Extracting context target vectors...");
  const [synthesizedResult, setSynthesizedResult] = useState<string | null>(null);

  // Navigation array matching your interface setup
  const navigationItems: SidebarItem[] = [
    { name: "Previous Papers", href: "/dashboard", icon: BookOpen },
    { name: "Notes Workspace", href: "/dashboard/notes", icon: FileText },
    { name: "AI Study Engine", href: "/dashboard/ai-engine", icon: Cpu, isActive: true },
    { name: "Bookmarks", href: "/dashboard/bookmarks", icon: Bookmark },
    { name: "Placement Hub", href: "/placement", icon: Briefcase },
    { name: "Lab Practicals", href: "/dashboard/labs", icon: Layers },
  ];

  // Rotate processing status phrases to mimic deep context ingestion
  useEffect(() => {
    if (!loading) return;
    
    const intervals = [
      setTimeout(() => setStatusMessage("Compiling high-probability formula matrices..."), 1800),
      setTimeout(() => setStatusMessage("Synthesizing core academic structural layouts..."), 3600),
    ];

    return () => intervals.forEach(clearTimeout);
  }, [loading]);

  const handleSynthesize = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setSynthesizedResult(null);
    setStatusMessage("Extracting context target vectors...");

    try {
      const res = await fetch("/api/synthesize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText: inputText }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Synthesis failed");

      setSynthesizedResult(json.data);
    } catch (err: any) {
      alert(err.message || "Something went wrong during extraction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F5F2] font-sans antialiased text-stone-900">
      
      {/* 1. BRAND SIDEBAR LAYOUT */}
      <aside className="fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-stone-200 bg-white p-4">
        <div className="mb-8 px-2 flex flex-col">
          <h1 className="text-xl font-bold tracking-tight text-stone-900">
            Topperdeck
          </h1>
          <p className="text-[10px] font-semibold tracking-widest uppercase text-indigo-600 mt-0.5">
            CRACK THE EXAM
          </p>
        </div>

        <nav className="flex-1 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  item.isActive
                    ? "bg-stone-100 text-stone-950 font-semibold"
                    : "text-stone-500 hover:bg-stone-50 hover:text-stone-900"
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${item.isActive ? "text-indigo-600" : ""}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-stone-100 pt-4">
          <button className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold text-stone-500 hover:bg-stone-50">
            <span className="flex items-center gap-2">
              <Sun className="h-3.5 w-3.5" />
              Toggle Canvas Light
            </span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN APPLICATION WORKSPACE CONTEXT */}
      <main className="pl-64 min-h-screen flex flex-col">
        <div className="p-8 max-w-6xl w-full mx-auto flex flex-col gap-6">
          
          {/* Top Header Jumbotron */}
          <div className="rounded-xl bg-[#0F172A] p-6 text-white shadow-sm flex flex-col">
            <h2 className="text-lg font-bold tracking-wide">AI Study Module Synthesizer</h2>
            <p className="text-xs text-stone-400 mt-1 max-w-xl">
              Transform raw textbook passages, syllabus logs, or lecture transcripts into optimized engineering review guides.
            </p>
          </div>

          {/* Grid Splitting Input and Dynamic AI Result Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            
            {/* Left Box: Context Extraction Form */}
            <div className="rounded-xl border border-stone-200/80 bg-white p-6 shadow-sm flex flex-col">
              <h3 className="text-xs font-bold tracking-wider text-indigo-600 uppercase mb-1">
                Context Extraction Engine
              </h3>
              <p className="text-xs text-stone-400 mb-4">
                Input study text arrays to parse high-probability examination clusters.
              </p>
              
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your engineering mathematics handouts, custom script variables, or course unit outlines here to configure a structural layout..."
                className="w-full h-72 rounded-xl border border-stone-200 bg-white p-4 text-xs text-stone-700 placeholder-stone-400 focus:border-stone-400 focus:outline-none resize-none leading-relaxed shadow-inner"
              />

              <button
                onClick={handleSynthesize}
                disabled={loading || !inputText.trim()}
                className="mt-4 w-full rounded-xl bg-[#0F172A] py-3 text-xs font-bold tracking-wide text-white transition-all hover:bg-stone-800 disabled:opacity-40"
              >
                {loading ? "Synthesizing Core Arrays..." : "Synthesize Study Assets"}
              </button>
            </div>

            {/* Right Box: Output Processing Console */}
            <div className="rounded-xl border border-stone-200/80 bg-white p-6 min-h-[440px] flex flex-col shadow-sm">
              {loading ? (
                /* Authentic Real AI Shimmer Skeleton Layout */
                <div className="w-full my-auto space-y-5 animate-pulse flex flex-col justify-center">
                  <div className="flex flex-col items-center justify-center py-4 text-center">
                    <span className="text-xl mb-2 animate-bounce">🧠</span>
                    <p className="text-xs font-semibold tracking-wide text-stone-600">
                      {statusMessage}
                    </p>
                  </div>
                  <div className="space-y-3 px-4">
                    <div className="h-3 bg-stone-100 rounded w-1/3" />
                    <div className="h-2.5 bg-stone-50 rounded w-full" />
                    <div className="h-2.5 bg-stone-50 rounded w-5/6" />
                    <div className="h-2.5 bg-stone-50 rounded w-4/5" />
                    <div className="h-3 bg-stone-100 rounded w-1/4 pt-2" />
                    <div className="h-2.5 bg-stone-50 rounded w-11/12" />
                  </div>
                </div>
              ) : synthesizedResult ? (
                /* Rendered Output Data Wrapper */
                <div className="w-full text-left flex flex-col">
                  <h3 className="text-xs font-bold tracking-wider text-green-600 uppercase mb-4 flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-ping" />
                    ✨ Synthesized Asset Blueprint
                  </h3>
                  <div className="whitespace-pre-line text-xs text-stone-700 leading-relaxed font-normal bg-stone-50/50 rounded-xl border border-stone-100 p-4 max-h-[360px] overflow-y-auto shadow-inner">
                    {synthesizedResult}
                  </div>
                </div>
              ) : (
                /* Clean Empty State Matching Dashboard UI */
                <div className="my-auto text-center flex flex-col items-center justify-center p-8">
                  <div className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center text-lg shadow-sm mb-3">
                    🧠
                  </div>
                  <h4 className="text-xs font-bold tracking-wide text-stone-700">
                    Waiting for extraction context targets...
                  </h4>
                  <p className="text-[11px] text-stone-400 max-w-[280px] mx-auto mt-1.5 leading-relaxed">
                    Your parsed syllabus benchmarks, high probability formula matrices, and question banks will compile right here.
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>
      </main>

    </div>
  );
}