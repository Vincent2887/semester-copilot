"use client";

import React, { useState } from "react";
import Sidebar from "../../components/sidebar"; // Fixed path routing structure

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentView, setCurrentView] = useState("home");
  const [currentPlan, setCurrentPlan] = useState<"Free" | "Pro" | "Premium">("Free");

  return (
    <div className="flex h-screen w-full bg-[#F8F9FA] overflow-hidden text-[#1E293B] font-sans antialiased">
      
      {/* 📋 Left Sidebar Navigation */}
      <Sidebar 
        currentView={currentView}
        setCurrentView={setCurrentView}
        currentPlan={currentPlan}
        onUpgradeClick={() => setCurrentView("pricingMatrix")}
      />

      {/* 🖥️ Main Workspace Panel */}
      <div className="flex-1 flex flex-col overflow-y-auto relative z-10">
        {/* 💡 Top Header Panel Bar */}
        <header className="w-full bg-white border-b border-stone-200 p-4 shrink-0 flex justify-between items-center z-20">
          <div className="text-xs font-black text-slate-400 tracking-wider uppercase">
            Topperdeck Engine Workspace Navigation Workspace
          </div>
        </header>
        
        <div className="p-8 w-full max-w-7xl mx-auto flex-1">
          {React.isValidElement(children)
            ? React.cloneElement(children as React.ReactElement<any>, { 
                currentView, 
                setCurrentView, 
                currentPlan, 
                setCurrentPlan 
              })
            : children}
        </div>
      </div>

    </div>
  );
}