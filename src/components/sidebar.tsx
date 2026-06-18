"use client";

import { useState } from "react";

export default function Sidebar() {
  const [labsOpen, setLabsOpen] = useState(false);

  return (
    <aside className="w-64 border-r border-white/5 p-5 min-h-screen flex flex-col justify-between select-none">
      <div>
        {/* Logo / Title Block */}
        <div className="flex items-center gap-3 mb-10 pl-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white">
            🎓
          </div>
          <h2 className="text-xl font-bold text-white tracking-wide">
            Enginnova
          </h2>
        </div>

        {/* Navigation Menu Links */}
        <div className="space-y-2">
          <button className="w-full text-left py-3 px-4 rounded-xl hover:bg-white/5 transition flex items-center gap-3 text-sm text-slate-300">
            <span className="text-base">📄</span> Previous Papers
          </button>

          <button className="w-full text-left py-3 px-4 rounded-xl hover:bg-white/5 transition flex items-center gap-3 text-sm text-slate-300">
            <span className="text-base">📚</span> Notes Workspace
          </button>

          <button className="w-full text-left py-3 px-4 rounded-xl hover:bg-white/5 transition flex items-center gap-3 text-sm text-slate-300">
            <span className="text-base">🤖</span> AI Study Engine
          </button>

          <button className="w-full text-left py-3 px-4 rounded-xl hover:bg-white/5 transition flex items-center gap-3 text-sm text-slate-300">
            <span className="text-base">🔖</span> Bookmarks
          </button>

          {/* New Lab Practicals Row with Dropdown for Years */}
          <div>
            <button 
              onClick={() => setLabsOpen(!labsOpen)}
              className={`w-full text-left py-3 px-4 rounded-xl hover:bg-white/5 transition flex items-center justify-between text-sm text-slate-300 ${
                labsOpen ? 'bg-white/5 text-white' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-base">🧪</span> Lab Practicals
              </div>
              <span className={`text-[10px] transition-transform duration-200 text-slate-500 ${labsOpen ? 'rotate-90' : ''}`}>
                ▶
              </span>
            </button>

            {/* Nested Years Submenu */}
            {labsOpen && (
              <div className="mt-1 ml-5 pl-4 border-l border-white/10 space-y-1">
                {["1st Year", "2nd Year", "3rd Year", "4th Year"].map((year, index) => (
                  <button 
                    key={index}
                    onClick={() => alert(`Opening Lab Questions & Viva for ${year}`)}
                    className="w-full text-left py-2 px-3 rounded-lg text-xs text-slate-400 hover:bg-white/5 hover:text-white transition"
                  >
                    • {year}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* User Profile Footer section */}
      <div className="border-t border-white/5 pt-4 flex items-center gap-3 pl-2">
        <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-xs font-bold text-slate-300 border border-white/10">
          N
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-slate-300">Vincent</span>
          <span className="text-[10px] text-slate-500">Premium Student</span>
        </div>
      </div>
    </aside>
  );
}