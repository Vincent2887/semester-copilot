"use client";

import { useState } from "react";

interface SynthesisSummary {
  coreConcepts: string[];
  examQuestions: string[];
  keyFormulas: string[];
}

export default function AiStudyEngine() {
  const [inputText, setInputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState("");
  const [resultData, setResultData] = useState<SynthesisSummary | null>(null);

  const triggerSyllabusSynthesis = () => {
    if (!inputText.trim()) return;

    setIsProcessing(true);
    setResultData(null);
    
    setCurrentStep("Scanning text configurations...");
    setTimeout(() => {
      setCurrentStep("Isolating high-weight evaluation tokens...");
    }, 1000);

    setTimeout(() => {
      setCurrentStep("Assembling flashcard summary matrices...");
    }, 2000);

    setTimeout(() => {
      setResultData({
        coreConcepts: [
          "Time-Complexity Boundary Conditions (Big-O, Omega, Theta)",
          "Amortized Array Expansion Allocation Factors",
          "Recurrence Relation Masters Criterion Checkpoints"
        ],
        examQuestions: [
          "Prove the tight asymptotic bound for a balanced recursive partition loop.",
          "Analyze structural space trade-offs between open addressing vs linked chaining structures."
        ],
        keyFormulas: [
          "T(n) = aT(n/b) + f(n)",
          "Structural Load Factor (λ) = n / m"
        ]
      });
      setIsProcessing(false);
      setCurrentStep("");
    }, 3200);
  };

  return (
    <div className="space-y-6">
      {/* HEADER BANNER */}
      <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl border border-slate-800 shadow-xs">
        <h3 className="text-sm font-black mb-1">AI Study Module Synthesizer</h3>
        <p className="text-xs text-slate-400">Transform raw textbook passages, syllabus logs, or lecture transcripts into optimized engineering review guides.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* INPUT ARENA PANEL */}
        <div className="lg:col-span-1 bg-white border border-[#EBE8E0] p-6 rounded-2xl shadow-3xs flex flex-col justify-between h-[360px]">
          <div className="space-y-2">
            <h4 className="text-xs font-black text-indigo-600 uppercase">Context Extraction Engine</h4>
            <p className="text-[11px] text-slate-400">Input study text arrays to parse high-probability examination clusters.</p>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your engineering mathematics handouts, custom script variables, or course unit outlines here to configure a structural layout..."
              className="w-full h-44 p-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-sans text-slate-800 resize-none mt-2"
              disabled={isProcessing}
            />
          </div>

          <button
            onClick={triggerSyllabusSynthesis}
            disabled={isProcessing || !inputText.trim()}
            className={`w-full text-xs font-bold py-3 rounded-xl shadow-3xs transition-all tracking-wide ${
              isProcessing 
                ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                : "bg-slate-900 text-white hover:bg-slate-800 cursor-pointer"
            }`}
          >
            {isProcessing ? `✨ ${currentStep}` : "Synthesize Study Assets"}
          </button>
        </div>

        {/* OUTPUT ANALYSIS BLOCK */}
        <div className="lg:col-span-2 bg-white border border-[#EBE8E0] p-6 rounded-2xl shadow-3xs min-h-[360px] flex flex-col justify-center">
          {!isProcessing && !resultData && (
            <div className="text-center space-y-2 py-12">
              <span className="text-2xl block opacity-60">🧠</span>
              <p className="text-xs font-bold text-slate-400">Waiting for extraction context targets...</p>
              <p className="text-[10px] text-slate-300 max-w-xs mx-auto">Your parsed syllabus benchmarks, high-probability formula matrices, and question banks will compile right here.</p>
            </div>
          )}

          {isProcessing && (
            <div className="text-center space-y-4 py-12">
              <div className="w-8 h-8 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-xs font-mono text-indigo-600 font-black tracking-wide uppercase animate-pulse">{currentStep}</p>
            </div>
          )}

          {!isProcessing && resultData && (
            <div className="space-y-5 animate-fadeIn">
              <div>
                <h5 className="text-[10px] font-black tracking-wider text-emerald-600 uppercase mb-2">📌 Key Core Concepts Isolated</h5>
                <ul className="text-xs font-bold text-slate-700 space-y-1.5 list-disc list-inside bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {resultData.coreConcepts.map((concept, idx) => <li key={idx}>{concept}</li>)}
                </ul>
              </div>

              <div>
                <h5 className="text-[10px] font-black tracking-wider text-rose-500 uppercase mb-2">🎯 Target Probable Exam Queries</h5>
                <ul className="text-xs font-bold text-slate-700 space-y-1.5 list-disc list-inside bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {resultData.examQuestions.map((q, idx) => <li key={idx}>{q}</li>)}
                </ul>
              </div>

              <div>
                <h5 className="text-[10px] font-black tracking-wider text-amber-600 uppercase mb-2">🧮 Mathematical Reference Blueprints</h5>
                <div className="flex flex-wrap gap-2">
                  {resultData.keyFormulas.map((formula, idx) => (
                    <span key={idx} className="font-mono text-[11px] font-bold bg-amber-50 border border-amber-200 text-amber-900 px-3 py-1.5 rounded-lg shadow-3xs">
                      {formula}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}