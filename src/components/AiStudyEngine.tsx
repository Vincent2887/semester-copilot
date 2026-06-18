"use client";

import { useState } from "react";

export default function AiStudyEngine() {
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const sampleTags = ["Dijkstra's Algorithm", "Ohm's Law", "Recursion", "Cloud Computing"];

  const handleGenerate = async (selectedTopic = topic) => {
    const activeTopic = selectedTopic || topic;
    if (!activeTopic) {
      alert("Please specify a topic or choose a quick sample tag.");
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await AppFetch("/api/generate-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: activeTopic }),
      });

      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (err: any) {
      alert(err.message || "AI generation failed.");
    } finally {
      setLoading(false);
    }
  };

  // Safe wrapper for structural environments
  async function AppFetch(url: string, init?: RequestInit) {
    return fetch(url, init);
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Search Input Custom Box */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Generate custom high-yield notes</h3>
            <p className="text-xs text-slate-500 mt-0.5">Enter any exam topic — our custom models will build complete revision summaries instantly.</p>
          </div>
          <button 
            onClick={() => handleGenerate()}
            disabled={loading}
            className="bg-black hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-sm shrink-0 uppercase tracking-wider"
          >
            {loading ? "AI Processing..." : "Generate Notes"}
          </button>
        </div>

        <div className="space-y-4">
          <input 
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g., Dijkstra's Algorithm, Object Oriented Principles"
            className="w-full bg-[#FBF9F4] border border-slate-200 px-4 py-3 rounded-xl text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-slate-400 transition-all"
          />
          <div className="flex flex-wrap gap-2">
            {sampleTags.map((tag) => (
              <button 
                key={tag} 
                onClick={() => { setTopic(tag); handleGenerate(tag); }}
                className="bg-white border border-[#EBE8E0] hover:bg-[#FBF9F4] text-[11px] font-medium text-slate-600 px-3 py-1.5 rounded-full transition-all"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AI DISPLAY RESULT LAYOUT MODULE */}
      {result && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6 animate-in slide-in-from-top-4 duration-300">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-bold text-indigo-600">{result.title}</h3>
            <p className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-wider font-semibold">
              Context: {result.metadata.generatedFor} | Matrix Sync: Verified
            </p>
          </div>

          <div className="space-y-5">
            {result.chapters.map((ch: any, idx: number) => (
              <div key={idx} className="space-y-1.5">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">{ch.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed bg-[#FBF9F4] p-4 rounded-xl border border-slate-100">{ch.content}</p>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">💡 Core Viva Target Predictors</h4>
            <div className="grid gap-2">
              {result.vivaHighlights.map((v: string, i: number) => (
                <div key={i} className="text-xs font-medium text-slate-700 flex items-start gap-2 bg-indigo-50/40 border border-indigo-50/20 p-3 rounded-xl">
                  <span className="text-indigo-600 font-bold">•</span>
                  <span>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}