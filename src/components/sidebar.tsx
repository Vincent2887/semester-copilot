"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { 
  Home,
  BookOpen, 
  FileText, 
  Cpu, 
  Bookmark, 
  Briefcase, 
  Layers, 
  Sparkles,
  ArrowRight
} from "lucide-react";

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  currentPlan: "Free" | "Pro" | "Premium";
  onUpgradeClick: () => void;
}

interface SidebarItem {
  id: string;
  name: string;
  icon: any;
  badge?: string;
  badgeColor?: string;
}

const navigationItems: SidebarItem[] = [
  {
    id: "home",
    name: "Home",
    icon: Home,
  },
  {
    id: "papers",
    name: "Previous Papers",
    icon: BookOpen,
  },
  {
    id: "workspace",
    name: "Notes Workspace",
    icon: FileText,
  },
  {
    id: "ai",
    name: "AI Study Engine",
    icon: Cpu,
  },
  {
    id: "bookmarks",
    name: "Bookmarks",
    icon: Bookmark,
  },
  {
    id: "placement",
    name: "Placement Hub",
    icon: Briefcase,
    badge: "PREMIUM",
    badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-950/40 dark:text-purple-400",
  },
  {
    id: "notesGenerator",
    name: "AI Notes Generator",
    icon: Sparkles,
    badge: "PRO",
    badgeColor: "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400",
  },
];

export default function Sidebar({ 
  currentView, 
  setCurrentView, 
  currentPlan, 
  onUpgradeClick 
}: SidebarProps) {

  return (
    <aside className="w-64 border-r border-stone-200 bg-white p-5 flex flex-col justify-between shrink-0 h-screen sticky top-0 z-20 dark:border-stone-800 dark:bg-stone-900">
      <div className="space-y-7">
        
        {/* Brand Logo Header */}
        <div className="px-1 select-none">
          <h1 className="text-xl font-black tracking-tight text-[#0F172A] dark:text-white">
            Topperdeck
          </h1>
          <p className="text-[10px] font-black tracking-widest text-indigo-600 uppercase mt-0.5 dark:text-indigo-400">
            CRACK THE EXAM
          </p>
        </div>

        {/* Navigation Options List */}
        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = currentView === item.id;
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all border-none bg-transparent cursor-pointer text-left relative group ${
                  isActive
                    ? "bg-slate-100 text-indigo-600 font-extrabold dark:bg-stone-800 dark:text-indigo-400"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-stone-400 dark:hover:bg-stone-800/50 dark:hover:text-stone-50"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.name}</span>
                
                {item.badge && (
                  <span className={`absolute right-2 px-1.5 py-0.5 text-[8px] font-black uppercase rounded-md tracking-wider ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Upgrade Banner & User profile Card */}
      <div className="space-y-4">
        
        {/* Dynamic Promotional Panel */}
        <div className="p-4 bg-gradient-to-br from-purple-50 to-indigo-50 border border-indigo-100 rounded-2xl text-center dark:from-stone-800/40 dark:to-stone-800/20 dark:border-stone-700">
          <h4 className="text-xs font-black text-indigo-900 dark:text-indigo-300 flex items-center justify-center gap-1">
            👑 Unlock Your Potential
          </h4>
          <p className="text-[10px] text-slate-500 dark:text-stone-400 mt-1 leading-relaxed font-medium">
            Upgrade to Pro or Premium and get unlimited access to all features and resources.
          </p>
          <button 
            onClick={onUpgradeClick}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[10px] py-2 rounded-xl mt-3 transition flex items-center justify-center gap-1 shadow-sm border-none cursor-pointer"
          >
            Upgrade Plan <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        {/* User Card Signature Block */}
        <div className="flex items-center gap-3 pt-4 border-t border-stone-200 dark:border-stone-800">
          <div className="w-9 h-9 rounded-full bg-slate-800 font-black text-white text-xs flex items-center justify-center shadow-sm select-none dark:bg-stone-700">
            V
          </div>
          <div>
            <h5 className="text-xs font-black text-slate-800 dark:text-stone-200">Vincent Kumar</h5>
            <p className="text-[9px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-indigo-500 inline-block animate-pulse" />
              {currentPlan} Plan
            </p>
          </div>
        </div>

      </div>
    </aside>
  );
}