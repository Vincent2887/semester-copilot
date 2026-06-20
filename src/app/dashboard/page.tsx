"use client";

import { useEffect, useState, useRef } from "react";
import { PaywallModal } from "../../components/ui/PaywallModal";
import { AuthModal } from "../../components/ui/AuthModal";
import { subjectBlueprintsRegistry, pastYearPapersRegistry, ExamNightPack } from "../../lib/subjectBlueprints";
import AiStudyEngine from "../../components/AiStudyEngine";

const universitiesData: Record<string, { logo: string; colleges: string[] }> = {
  "JNTUH": {
    logo: "🏛️",
    colleges: [
      "[Autonomous] JNTUH University College of Engineering, Hyderabad (Kukatpally)",
      "[Autonomous] VNR Vignana Jyothi Institute of Engineering and Technology (VNRVJIET)",
      "[Autonomous] Gokaraju Rangaraju Institute of Engineering and Technology (GRIET)",
      "[Autonomous] BV Raju Institute of Technology (BVRIT, Narsapur)",
      "[Autonomous] BVRIT Hyderabad College of Engineering for Women (Bachupally)",
      "[Autonomous] Chaitanya Bharathi Institute of Technology (CBIT)",
      "[Autonomous] Mahatma Gandhi Institute of Technology (MGIT)",
      "[Autonomous] Vardhaman College of Engineering",
      "[Autonomous] Institute of Aeronautical Engineering (IARE)",
      "[Autonomous] MLR Institute of Technology (MLRIT)",
      "[Autonomous] CMR College of Engineering & Technology (CMRCET)",
      "[Autonomous] CMR Technical Campus (CMRTC)",
      "[Autonomous] Malla Reddy Engineering College (MREC)",
      "[Autonomous] Malla Reddy College of Engineering and Technology (MRCET)",
      "[Autonomous] Malla Reddy Engineering College for Women (MRECW)",
      "[Autonomous] Guru Nanak Institutions Technical Campus (GNITC)",
      "[Autonomous] Geethanjali College of Engineering and Technology",
      "[Autonomous] Vignan Institute of Technology and Science",
      "[Autonomous] CVR College of Engineering",
      "[Autonomous] Sreenidhi Institute of Science and Technology (SNIST)",
      "[Autonomous] ACE Engineering College",
      "[Autonomous] G. Narayanamma Institute of Technology and Science (GNITS) for Women",
      "[Autonomous] Nalla Malla Reddy Engineering College (NMREC)",
      "[Autonomous] Sri Indu College of Engineering & Technology",
      "[Autonomous] Bharat Institute of Engineering and Technology (BIET)",
      "[Autonomous] AVN Institute of Engineering and Technology",
      "[Autonomous] Vignana Bharathi Institute of Technology (VBIT)",
      "[Autonomous] Sree Dattha Institute of Engineering and Science",
      "[Autonomous] Nalla Narasimha Reddy Education Society's Group of Institutions",
      "[Autonomous] Jayamukhi Institute of Technological Sciences",
      "[Autonomous] Keshav Memorial Institute of Technology (KMIT)",
      "[Affiliated] CMR Institute of Technology (CMRIT)",
      "[Affiliated] Marri Laxman Reddy Institute of Technology and Management (MLRTM)",
      "[Affiliated] TKR College of Engineering and Technology",
      "[Affiliated] Teegala Krishna Reddy Engineering College",
      "[Affiliated] Scient Institute of Technology",
      "[Affiliated] Sphoothy Engineering College",
      "[Affiliated] JB Institute of Engineering and Technology (JBIET)",
      "[Affiliated] DRK College of Engineering and Technology",
      "[Affiliated] Kommuri Pratap Reddy Institute of Technology (KPRIT)",
      "[Affiliated] Arjun College of Technology & Sciences",
      "[Brilliant Institute of Engineering & Technology]",
      "[Affiliated] Ellenki College of Engineering and Technology",
      "[Affiliated] Global Institute of Engineering & Technology",
      "[Affiliated] Guru Nanak Institute of Technology (GNIT)",
      "[Affiliated] Holy Mary Institute of Technology & Science",
      "[Affiliated] Hyderabad Institute of Technology and Management (HITM)",
      "[Affiliated] Joginpally B.R. Engineering College",
      "[Affiliated] Kasireddy Narayan Reddy College of Engineering & Research",
      "[Affiliated] Shadan College of Engineering and Technology",
      "[Affiliated] Ayaan College of Engineering & Technology"
    ]
  },
  "Osmania University (OU)": {
    logo: "🏰",
    colleges: [
      "[Autonomous] University College of Engineering, Osmania University (UCEOU)",
      "[Autonomous] University College of Technology, Osmania University (UCTOU)",
      "[Autonomous] Vasavi College of Engineering (VCE)",
      "[Autonomous] Maturi Venkata Subba Rao (MVSR) Engineering College",
      "[Autonomous] Nizam College (Technical Programs)",
      "[Affiliated] Muffakham Jah College of Engineering and Technology (MJCET)",
      "[Affiliated] Stanley College of Engineering and Technology for Women",
      "[Affiliated] Matrusri Engineering College",
      "[Affiliated] Methodist College of Engineering & Technology",
      "[Affiliated] Deccan College of Engineering and Technology (DCET)",
      "[Affiliated] Islamia College of Engineering and Technology",
      "[Affiliated] Neil Gogte Institute of Technology (NGIT)",
      "[Affiliated] Keshav Memorial Engineering College",
      "[Affiliated] Lords Institute of Engineering and Technology",
      "[Affiliated] Gokaraju Lailavathi Womens Engineering College",
      "[Affiliated] ISL Engineering College",
      "[Swathi Institute of Technology and Sciences]",
      "[Affiliated] Acme College of Information Technology"
    ]
  }
};

const engineeringBranches = [
  { id: "CSE", name: "Computer Science & Engineering", icon: "💻" },
  { id: "ECE", name: "Electronics & Communication Engineering", icon: "🔌" },
  { id: "EEE", name: "Electrical & Electronics Engineering", icon: "⚡" },
  { id: "IT", name: "Information Technology", icon: "🌐" }
];

const placementCategories = [
  { id: "dream", name: "🎯 Top Dream Companies", icon: "⭐" },
  { id: "product", name: "📱 Product-Based MNCs", icon: "🚀" },
  { id: "service", name: "🌐 Service-Based MNCs", icon: "🤝" }
];

const placementRegistry: Record<string, string[]> = {
  dream: ["Google", "Microsoft", "Amazon", "NVIDIA", "Adobe", "Atlassian", "Salesforce", "Oracle", "JPMorgan Chase", "Goldman Sachs"],
  product: ["Google", "Microsoft", "Amazon", "Meta", "Apple", "IBM", "Oracle", "Salesforce", "Adobe", "ServiceNow", "SAP", "Intuit", "NVIDIA", "Intel", "AMD", "Qualcomm", "Texas Instruments", "Broadcom", "Atlassian", "Zoho", "PayPal", "Uber", "Airbnb", "LinkedIn", "JPMorgan Chase", "Goldman Sachs", "Morgan Stanley"],
  service: ["Accenture", "Capgemini", "Cognizant", "Infosys", "Tata Consultancy Services", "Wipro", "HCLTech", "Tech Mahindra", "DXC Technology", "Deloitte", "KPMG", "EY", "PwC"]
};

interface CompanyFiles {
  aptitudeUrl?: string;
  aptitudeName?: string;
  technicalUrl?: string;
  technicalName?: string;
  hrUrl?: string;
  hrName?: string;
}

export default function StudentDashboard() {
  const [currentView, setCurrentView] = useState<"papers" | "workspace" | "ai" | "bookmarks" | "examNight" | "labs" | "placement">("papers");
  const [paperTabMode, setPaperTabMode] = useState<"notes" | "pyqs">("notes");
  const [cramMode, setCramMode] = useState(false);
  const [labDropdown, setLabDropdown] = useState(false);
  
  const [userPlan, setUserPlan] = useState<"Free" | "Pro" | "Premium">("Free");
  const [availableCredits, setAvailableCredits] = useState(2);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [activeUserEmail, setActiveUserEmail] = useState<string | null>(null);
  
  const [selectedUniv, setSelectedUniv] = useState<string | null>(null);
  const [selectedCollege, setSelectedCollege] = useState<string | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [selectedSubjectKey, setSelectedSubjectKey] = useState<string>("dbms");
  const [activePackData, setActivePackData] = useState<ExamNightPack | null>(null);
  const [generatingPack, setGeneratingPack] = useState(false);
  const [generationStatus, setGenerationStatus] = useState<string>("");
  const [selectedLabYear, setSelectedLabYear] = useState<string | null>(null);

  // Placement States
  const [activeCategoryKey, setActiveCategoryKey] = useState<string>("dream");
  const [selectedCompany, setSelectedCompany] = useState<string>("Google");
  
  const [companyDocuments, setCompanyDocuments] = useState<Record<string, CompanyFiles>>({});
  const [activeUploadTarget, setActiveUploadTarget] = useState<"aptitude" | "technical" | "hr" | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [bookmarkedPaperIds, setBookmarkedPaperIds] = useState<string[]>([]);

  const handleToggleBookmarkAsset = (paperId: string) => {
    setBookmarkedPaperIds((prevIds) =>
      prevIds.includes(paperId)
        ? prevIds.filter((id) => id !== paperId)
        : [...prevIds, paperId]
    );
  };

  useEffect(() => {
    async function syncDatabaseProfile() {
      const structuralMockSessionId = "v1-vincent-test-uid-887";
      try {
        const { userDatabaseService } = await import("../../lib/supabase");
        const { data: profile, error } = await userDatabaseService.fetchUserProfile(structuralMockSessionId);
        if (profile && !error) {
          setUserPlan(profile.plan);
          setAvailableCredits(profile.credits);
        }
      } catch (syncError) {
        console.warn("Operating profile dashboard in safe fallback/local mode.");
      }
    }
    syncDatabaseProfile();
  }, []);

  useEffect(() => {
    if (selectedUniv && selectedCollege && selectedBranch) {
      fetchLivePapersFromDatabase();
    }
  }, [selectedUniv, selectedCollege, selectedBranch]);

  async function fetchLivePapersFromDatabase() {
    try {
      setLoading(true);
      const collegeClean = selectedCollege ? selectedCollege.replace("[Autonomous] ", "").replace("[Affiliated] ", "") : "";
      const collegeToken = collegeClean.split(" ")[0].toLowerCase();

      const response = await fetch("/api/get-papers", { method: "GET" });
      if (!response.ok) throw new Error("Connection dropped");
      const result = await response.json();

      if (result.success && result.data) {
        const multiFilteredData = result.data.filter((paper: any) => {
          return paper.university === selectedUniv &&
                 paper.branch === selectedBranch &&
                 paper.college?.toLowerCase().includes(collegeToken);
        });
        
        if (multiFilteredData.length > 0) {
          setPapers(multiFilteredData);
          return;
        }
      }
      throw new Error("Fallback required");
    } catch (err) {
      console.warn("Applying registry fallback mappings.");
      if (selectedBranch && pastYearPapersRegistry[selectedBranch]) {
        const localPapers = Object.keys(pastYearPapersRegistry[selectedBranch]).flatMap(subjectKey => 
          pastYearPapersRegistry[selectedBranch][subjectKey].map((paper: any) => ({
            id: `${subjectKey}-${paper.year}`,
            title: `${subjectKey.toUpperCase()} - Official University Paper (${paper.year})`,
            file_url: paper.pdfUrl,
            university: selectedUniv,
            branch: selectedBranch
          }))
        );
        setPapers(localPapers);
      } else {
        setPapers([]);
      }
    } finally {
      setLoading(false);
    }
  }

  const handleAccessResourceAsset = (e: React.MouseEvent, fileUrl: string) => {
    if (userPlan === "Free" && availableCredits <= 0) {
      e.preventDefault();
      setIsPaywallOpen(true);
      return;
    }
    if (userPlan === "Free") {
      setAvailableCredits(prev => prev - 1);
    }
  };

  const handleGeneratePredictivePack = async (subjectKey: string) => {
    if (userPlan === "Free" && availableCredits < 5) {
      setIsPaywallOpen(true);
      return;
    }

    setSelectedSubjectKey(subjectKey);
    setGeneratingPack(true);
    
    setGenerationStatus("Analyzing previous JNTUH query logs...");
    const t1 = setTimeout(() => setGenerationStatus("Parsing R22 regulation unit core matrices..."), 800);
    const t2 = setTimeout(() => setGenerationStatus("Synthesizing high-probability formula clusters..."), 1500);

    try {
      const response = await fetch("/api/exam-pack", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: "v1-vincent-test-uid-887",
          university: selectedUniv || "JNTUH",
          subject: subjectKey === "dbms" ? "Database Management Systems" : subjectKey.toUpperCase(),
          branch: selectedBranch || "CSE"
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Generation error encountered.");
      }

      if (result.data) {
        setActivePackData(result.data);
      } else {
        const fallbackPack = subjectBlueprintsRegistry[selectedBranch || "CSE"]?.[subjectKey];
        if (fallbackPack) setActivePackData(fallbackPack);
      }

      if (userPlan === "Free") {
        setAvailableCredits(result.remainingCredits !== undefined ? result.remainingCredits : (prev => prev - 5));
      }

      setCurrentView("examNight");

    } catch (err: any) {
      console.warn("Backend unavailable, using local lookup backup blueprints.");
      const fallbackPack = subjectBlueprintsRegistry[selectedBranch || "CSE"]?.[subjectKey];
      if (fallbackPack) {
        if (userPlan === "Free") setAvailableCredits(prev => prev - 5);
        setActivePackData(fallbackPack);
        setCurrentView("examNight");
      } else {
        alert(err.message || "Could not synthesize exam night assets.");
      }
    } finally {
      clearTimeout(t1);
      clearTimeout(t2);
      setGeneratingPack(false);
      setGenerationStatus("");
    }
  };

  const resetCascadeFilter = () => {
    setSelectedUniv(null);
    setSelectedCollege(null);
    setSelectedBranch(null);
    setPapers([]);
  };

  const activeBranchPyqs = selectedBranch ? (pastYearPapersRegistry[selectedBranch] || {}) : {};

  const handleCategoryChange = (catKey: string) => {
    setActiveCategoryKey(catKey);
    const linkedCompanies = placementRegistry[catKey];
    if (linkedCompanies && linkedCompanies.length > 0) {
      setSelectedCompany(linkedCompanies[0]);
    }
  };

  const triggerPdfFileInput = (targetRound: "aptitude" | "technical" | "hr") => {
    setActiveUploadTarget(targetRound);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // HANDLES THE SECURE UPLOAD TRANSMISSION STRAIGH TO SUPABASE CLOUD VIA API
  const handlePdfUploadMapping = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeUploadTarget) return;

    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("company", selectedCompany);
    uploadFormData.append("roundType", activeUploadTarget);

    try {
      setLoading(true);
      
      const response = await fetch("/api/placement-upload", {
        method: "POST",
        body: uploadFormData,
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Upload pipeline failed.");

      // Maps file details and URL strings to appropriate properties directly
      setCompanyDocuments(prev => {
        const existingData = prev[selectedCompany] || {};
        return {
          ...prev,
          [selectedCompany]: {
            ...existingData,
            [`${activeUploadTarget}Url`]: result.publicUrl,
            [`${activeUploadTarget}Name`]: result.fileName
          }
        };
      });

    } catch (err: any) {
      alert(err.message || "Failed to parse attachment logic.");
    } finally {
      setLoading(false);
      setActiveUploadTarget(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const currentCompanyFiles = companyDocuments[selectedCompany] || {};

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans antialiased transition-colors duration-500">
      
      <PaywallModal isOpen={isPaywallOpen} onClose={() => setIsPaywallOpen(false)} cramMode={cramMode} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onAuthSuccess={(email) => setActiveUserEmail(email)} />
      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handlePdfUploadMapping} 
        accept="application/pdf" 
        className="hidden" 
      />

      {/* SIDEBAR NAVIGATION PANEL */}
      <aside className="bg-white border-r border-[#EBE8E0] p-6 hidden md:flex flex-col justify-between h-screen sticky top-0 w-64 shrink-0">
        <div className="space-y-6">
          <div className="leading-none flex justify-between items-start gap-2">
            <div>
              <span className="font-serif font-bold text-lg text-slate-900 block">Topperdeck</span>
              <span className="text-[9px] font-black tracking-widest uppercase text-slate-400 mt-1.5 block max-w-[130px] truncate">
                {activeUserEmail ? `👤 ${activeUserEmail.split("@")[0]}` : "CRACK THE EXAM"}
              </span>
            </div>
            {!activeUserEmail && (
              <button 
                onClick={() => setIsAuthOpen(true)} 
                className="text-[9px] font-mono font-black text-indigo-600 uppercase underline cursor-pointer hover:text-indigo-800"
              >
                Connect
              </button>
            )}
          </div>

          <nav className="space-y-1">
            <button onClick={() => { setCurrentView("papers"); resetCascadeFilter(); }} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${currentView === "papers" ? "bg-[#F4F1E8] text-slate-900 border border-[#EBE8E0]" : "text-slate-500 hover:bg-slate-50"}`}>
              <span>📄</span> Previous Papers
            </button>
            <button onClick={() => { setCurrentView("workspace"); }} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${currentView === "workspace" ? "bg-[#F4F1E8] text-slate-900 border border-[#EBE8E0]" : "text-slate-500 hover:bg-slate-50"}`}>
              <span>📚</span> Notes Workspace
            </button>
            <button onClick={() => { setCurrentView("ai"); }} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${currentView === "ai" ? "bg-[#F4F1E8] text-slate-900 border border-[#EBE8E0]" : "text-slate-500 hover:bg-slate-50"}`}>
              <span>🤖</span> AI Study Engine
            </button>
            <button onClick={() => { setCurrentView("bookmarks"); }} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${currentView === "bookmarks" ? "bg-[#F4F1E8] text-slate-900 border border-[#EBE8E0]" : "text-slate-500 hover:bg-slate-50"}`}>
              <span>🔖</span> Bookmarks
            </button>
            <button onClick={() => setCurrentView("placement")} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${currentView === "placement" ? "bg-[#F4F1E8] text-slate-900 border border-[#EBE8E0]" : "text-slate-500 hover:bg-slate-50"}`}>
              <span>🧠</span> Placement Hub
            </button>

            <div>
              <button onClick={() => setLabDropdown(!labDropdown)} className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-50">
                <div className="flex items-center gap-3"><span>🧪</span> Lab Practicals</div>
                <span className="text-[10px]">{labDropdown ? "▲" : "▼"}</span>
              </button>
              {labDropdown && (
                <div className="pl-9 mt-1 space-y-1">
                  <button onClick={() => { setCurrentView("labs"); setSelectedLabYear("1"); }} className="w-full text-left py-1.5 text-[11px] font-bold text-slate-400 hover:text-slate-900 block">• 1st Year</button>
                  <button onClick={() => { setCurrentView("labs"); setSelectedLabYear("2"); }} className="w-full text-left py-1.5 text-[11px] font-bold text-slate-400 hover:text-slate-900 block">• 2nd Year</button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </aside>

      {/* CORE WORKSPACE VIEWPORT */}
      <div className="flex-1 p-6 md:p-10 w-full flex flex-col transition-all duration-500 overflow-x-hidden">
        
        <header className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8 pb-4 border-b border-[#EBE8E0]">
          <h1 className="text-xl font-black tracking-tight text-slate-900">
            {currentView === "examNight" ? "🚨 Night Pack Mode Active" : currentView === "placement" ? "💼 Corporate Placement Blueprints" : "Dashboard Workspace"}
          </h1>
          <button onClick={() => setCramMode(!cramMode)} className="px-4 py-2 text-xs font-bold bg-white border border-[#EBE8E0] rounded-xl">Toggle Canvas Light</button>
        </header>

        {/* CREDIT WALLET MODULE */}
        <div className="mb-6 p-4 px-5 rounded-2xl border bg-white border-[#EBE8E0] text-slate-800 flex justify-between items-center text-xs font-bold shadow-2xs">
          <span className="flex items-center gap-2">
            <span>💳</span> Account Tier: <span className="text-indigo-600 font-black uppercase">{userPlan} Plan</span> 
            <span className="text-slate-300">|</span> 
            Balance: {userPlan === "Premium" ? "∞ Unlimited" : `${availableCredits} Credits`}
          </span>
          {userPlan === "Free" && (
            <button onClick={() => setIsPaywallOpen(true)} className="text-[10px] font-mono font-black text-purple-600 uppercase underline">Upgrade Plan</button>
          )}
        </div>

        {/* HERO CRAM BANNER */}
        {currentView !== "examNight" && currentView !== "placement" && (
          <div className="mb-8 p-6 rounded-3xl bg-gradient-to-br from-red-500 via-orange-500 to-indigo-600 text-white shadow-xl space-y-4 relative overflow-hidden">
            <div className="space-y-1 relative z-10">
              <span className="inline-flex items-center gap-1 bg-white/20 px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-wider uppercase text-white">
                💎 Premium Feature • Most Used ⭐
              </span>
              <h2 className="text-xl font-black tracking-tight pt-1">🚨 EXAM TOMORROW?</h2>
              <p className="text-xs text-white/90 max-w-xl">
                Skip the 300-page textbooks and 100 long video clips. Get exactly what you need to clear your upcoming unit criteria smoothly.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2 relative z-10">
              <button 
                onClick={() => handleGeneratePredictivePack("dbms")} 
                disabled={generatingPack} 
                className="bg-white text-slate-900 text-xs font-black px-5 py-3 rounded-xl shadow-md hover:bg-slate-50 transition cursor-pointer min-w-[280px]"
              >
                {generatingPack ? `✨ ${generationStatus}` : "🔥 Generate Exam Night Pack (5 Credits)"}
              </button>
              <span className="text-[10px] font-mono font-bold text-white/80">
                Cost: 5 Credits per pack or Unlimited access for Pro/Premium subscribers.
              </span>
            </div>
            <div className="absolute right-0 bottom-0 text-white/5 font-serif font-black text-8xl translate-y-4 select-none pointer-events-none">PASS</div>
          </div>
        )}

        {/* LAYOUT CANVAS ROUTER */}
        {currentView === "papers" ? (
          <section className="space-y-6 w-full">
            <div className="flex items-center justify-between p-4 rounded-xl border bg-white border-[#EBE8E0]">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                <span className={!selectedUniv ? "text-slate-900" : ""}>1. UNIVERSITY</span>
                {selectedUniv && <span> &gt; <span className={!selectedCollege ? "text-slate-900" : ""}>2. COLLEGE</span></span>}
                {selectedCollege && <span> &gt; <span className={!selectedBranch ? "text-slate-900" : ""}>3. BRANCH</span></span>}
              </div>
              {(selectedUniv || selectedCollege || selectedBranch) && (
                <button onClick={resetCascadeFilter} className="text-[10px] font-black text-red-500 underline cursor-pointer">Reset Trace</button>
              )}
            </div>

            {!selectedUniv && (
              <div className="grid sm:grid-cols-2 gap-4 w-full">
                {Object.keys(universitiesData).map((univ) => (
                  <div key={univ} onClick={() => setSelectedUniv(univ)} className="border p-6 rounded-2xl transition bg-white border-[#EBE8E0] hover:border-slate-400 cursor-pointer flex items-center gap-4">
                    <span className="text-2xl p-2 border bg-slate-50 border-slate-200 rounded-xl">{universitiesData[univ].logo}</span>
                    <h4 className="font-bold text-sm text-slate-900">{univ}</h4>
                  </div>
                ))}
              </div>
            )}

            {selectedUniv && !selectedCollege && (
              <div className="space-y-2 max-h-[400px] overflow-y-auto border border-[#EBE8E0] bg-white rounded-2xl p-3 shadow-2xs w-full">
                {universitiesData[selectedUniv].colleges.map((clg) => (
                  <div key={clg} onClick={() => setSelectedCollege(clg)} className="border p-3.5 rounded-xl bg-slate-50 hover:bg-white border-[#EBE8E0] hover:border-slate-400 cursor-pointer text-xs font-bold text-slate-800 flex justify-between items-center transition-all">
                    <span>🏢 {clg}</span>
                    <span className="opacity-40">➔</span>
                  </div>
                ))}
              </div>
            )}

            {selectedUniv && selectedCollege && !selectedBranch && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                {engineeringBranches.map((br) => (
                  <div key={br.id} onClick={() => setSelectedBranch(br.id)} className="border p-5 text-center bg-white border-[#EBE8E0] hover:border-slate-400 cursor-pointer transition rounded-2xl shadow-2xs">
                    <span className="text-xl block mb-1">{br.icon}</span>
                    <span className="text-xs font-black block text-slate-800">{br.id}</span>
                  </div>
                ))}
              </div>
            )}

            {selectedUniv && selectedCollege && selectedBranch && (
              <div className="space-y-4 w-full">
                <div className="flex gap-2 border-b border-[#EBE8E0] pb-2">
                  <button onClick={() => setPaperTabMode("notes")} className={`px-4 py-2 text-xs font-black rounded-lg ${paperTabMode === "notes" ? "bg-slate-900 text-white" : "text-slate-400"}`}>Regular Class Handouts</button>
                  <button onClick={() => setPaperTabMode("pyqs")} className={`px-4 py-2 text-xs font-black rounded-lg ${paperTabMode === "pyqs" ? "bg-indigo-600 text-white" : "text-indigo-500"}`}>📜 University PYQs</button>
                </div>

                {paperTabMode === "notes" ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                    {papers.length === 0 ? (
                      <div className="p-8 border rounded-2xl bg-white border-[#EBE8E0] text-slate-400 text-xs font-bold col-span-full text-center">No class handouts found in database framework.</div>
                    ) : (
                      papers.map((paper) => (
                        <div key={paper.id} className="border p-4 bg-white rounded-xl border-[#EBE8E0] h-36 flex flex-col justify-between shadow-2xs relative">
                          <button 
                            onClick={() => handleToggleBookmarkAsset(paper.id)}
                            className="absolute top-3 right-3 text-xs bg-slate-50 hover:bg-slate-100 p-1.5 rounded-lg border border-slate-200 transition"
                          >
                            {bookmarkedPaperIds.includes(paper.id) ? "🔖" : "⭐"}
                          </button>
                          <div className="pr-6">
                            <h4 className="text-xs font-bold text-slate-900 line-clamp-2">{paper.title}</h4>
                          </div>
                          <a href={paper.file_url} target="_blank" rel="noreferrer" onClick={(e) => handleAccessResourceAsset(e, paper.file_url)} className="w-full bg-slate-900 text-white text-xs font-bold py-2 rounded-xl text-center block">View PDF</a>
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                    {Object.keys(activeBranchPyqs).length === 0 ? (
                      <div className="p-8 border rounded-2xl bg-white border-[#EBE8E0] text-slate-400 text-xs font-bold col-span-full text-center">No official university query logs discovered in registry layout.</div>
                    ) : (
                      Object.keys(activeBranchPyqs).map((subjectKey) => 
                        activeBranchPyqs[subjectKey].map((pyq: any, i: number) => {
                          const pyqUniqueId = `${subjectKey}-${pyq.year}`;
                          return (
                            <div key={i} className="border p-5 bg-white border-[#EBE8E0] rounded-2xl flex flex-col justify-between h-40 shadow-2xs relative">
                              <button 
                                onClick={() => handleToggleBookmarkAsset(pyqUniqueId)}
                                className="absolute top-4 right-4 text-xs bg-slate-50 hover:bg-slate-100 p-1.5 rounded-lg border border-slate-200 transition"
                              >
                                {bookmarkedPaperIds.includes(pyqUniqueId) ? "🔖" : "⭐"}
                              </button>
                              <div>
                                <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase">{subjectKey}</span>
                                <h4 className="text-xs font-black text-slate-900 mt-2">Official PYQ Paper ({pyq.year})</h4>
                              </div>
                              <a href={pyq.pdfUrl} className="w-full bg-indigo-600 text-white text-xs font-bold py-2 rounded-xl text-center block">Download PDF</a>
                            </div>
                          );
                        })
                      )
                    )}
                  </div>
                )}
              </div>
            )}
          </section>
        ) : currentView === "workspace" ? (
          <section className="space-y-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
              <div className="lg:col-span-1 p-6 bg-white border border-[#EBE8E0] rounded-2xl shadow-3xs flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-black text-slate-900 mb-1">Upload Study Material Portal</h3>
                  <p className="text-xs text-slate-400 mb-4">Contribute curriculum materials, handouts, or reference packets to the student registry.</p>
                  
                  <div className="border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-xl p-6 text-center bg-slate-50/50 transition-colors cursor-pointer group">
                    <span className="text-xl block mb-1 group-hover:scale-110 transition-transform">📤</span>
                    <p className="text-[11px] font-bold text-slate-700">Drag & drop files or click to browse</p>
                    <p className="text-[9px] text-slate-400 mt-0.5">Accepts PDF, DOCX up to 50MB</p>
                    <input type="file" className="hidden" id="workspace-upload-input" />
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-bold">
                  <span>Server Registry Connection:</span>
                  <span className="text-emerald-600 uppercase">● Live Synced</span>
                </div>
              </div>

              <div className="lg:col-span-2 p-6 bg-white border border-[#EBE8E0] rounded-2xl shadow-3xs space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-2 border-b border-slate-100">
                  <div>
                    <h3 className="text-sm font-black text-slate-900">Department Shared Resources</h3>
                    <p className="text-xs text-slate-400">Review community-verified study resources indexed across your batch.</p>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Search resources..." 
                    className="w-full sm:w-48 px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400"
                  />
                </div>

                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                  <div className="p-3 border border-[#EBE8E0] rounded-xl bg-slate-50 flex justify-between items-center hover:bg-white transition-all cursor-pointer">
                    <div>
                      <span className="text-xs font-black text-slate-800 block">Vector Calculus Formula Matrix (Unit 1-3)</span>
                      <span className="text-[10px] text-slate-400 font-bold block mt-0.5">PDF Document • 4.2 MB • Added yesterday</span>
                    </div>
                    <span className="text-xs bg-white px-2.5 py-1 border border-[#EBE8E0] rounded-lg text-slate-700 font-bold shadow-3xs">Open</span>
                  </div>

                  <div className="p-3 border border-[#EBE8E0] rounded-xl bg-slate-50 flex justify-between items-center hover:bg-white transition-all cursor-pointer">
                    <div>
                      <span className="text-xs font-black text-slate-800 block">Database Management Systems Query Blueprints</span>
                      <span className="text-[10px] text-slate-400 font-bold block mt-0.5">DOCX Resource • 1.8 MB • Added 3 days ago</span>
                    </div>
                    <span className="text-xs bg-white px-2.5 py-1 border border-[#EBE8E0] rounded-lg text-slate-700 font-bold shadow-3xs">Open</span>
                  </div>

                  <div className="p-3 border border-[#EBE8E0] rounded-xl bg-slate-50 flex justify-between items-center hover:bg-white transition-all cursor-pointer">
                    <div>
                      <span className="text-xs font-black text-slate-800 block">Data Structures Lecture Handout - Balanced Trees</span>
                      <span className="text-[10px] text-slate-400 font-bold block mt-0.5">PDF Document • 12.4 MB • Added last week</span>
                    </div>
                    <span className="text-xs bg-white px-2.5 py-1 border border-[#EBE8E0] rounded-lg text-slate-700 font-bold shadow-3xs">Open</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : currentView === "ai" ? (
          <AiStudyEngine />
        ) : currentView === "bookmarks" ? (
          <section className="space-y-6 w-full">
            <div className="p-6 bg-white border border-[#EBE8E0] rounded-2xl shadow-3xs w-full">
              <h3 className="text-sm font-black text-slate-900 mb-1">Your Bookmarked Materials</h3>
              <p className="text-xs text-slate-400 mb-6">Review your pinned university assets and saved documentation files.</p>
              
              {bookmarkedPaperIds.length === 0 ? (
                <div className="text-center py-12 text-xs text-slate-400 font-bold">
                  📁 Your saved bookmarks collection is currently empty. Click the star button on any study material or paper to pin it here.
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                  {papers.filter(p => bookmarkedPaperIds.includes(p.id)).map(paper => (
                    <div key={paper.id} className="border p-4 bg-white rounded-xl border-[#EBE8E0] h-36 flex flex-col justify-between shadow-2xs">
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-2">{paper.title}</h4>
                        <button onClick={() => handleToggleBookmarkAsset(paper.id)} className="text-xs text-red-400 hover:text-red-600 cursor-pointer font-bold uppercase tracking-wider text-[10px]">Remove</button>
                      </div>
                      <a href={paper.file_url} target="_blank" rel="noreferrer" className="w-full bg-slate-900 text-white text-xs font-bold py-2 rounded-xl text-center block">View PDF</a>
                    </div>
                  ))}
                  
                  {Object.keys(activeBranchPyqs).flatMap(subjectKey => 
                    activeBranchPyqs[subjectKey].map((pyq: any) => ({
                      id: `${subjectKey}-${pyq.year}`,
                      title: `${subjectKey.toUpperCase()} - University PYQ (${pyq.year})`,
                      pdfUrl: pyq.pdfUrl
                    }))
                  ).filter(item => bookmarkedPaperIds.includes(item.id)).map(pyqItem => (
                    <div key={pyqItem.id} className="border p-4 bg-white rounded-xl border-indigo-100 h-36 flex flex-col justify-between shadow-2xs">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase">PYQ</span>
                          <h4 className="text-xs font-bold text-slate-900 mt-1 line-clamp-2">{pyqItem.title}</h4>
                        </div>
                        <button onClick={() => handleToggleBookmarkAsset(pyqItem.id)} className="text-xs text-red-400 hover:text-red-600 cursor-pointer font-bold uppercase tracking-wider text-[10px]">Remove</button>
                      </div>
                      <a href={pyqItem.pdfUrl} target="_blank" rel="noreferrer" className="w-full bg-indigo-600 text-white text-xs font-bold py-2 rounded-xl text-center block">View PDF</a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        ) : currentView === "labs" ? (
          <section className="space-y-6 w-full">
            <div className="p-6 bg-white border border-[#EBE8E0] rounded-2xl shadow-3xs w-full">
              <h3 className="text-sm font-black text-slate-900 mb-1">
                Engineering Laboratory Practicals — {selectedLabYear === "1" ? "1st Year Syllabus" : "2nd Year Syllabus"}
              </h3>
              <p className="text-xs text-slate-400 mb-6">Access procedure guidelines, script configurations, and viva logs.</p>
              
              {selectedLabYear === "1" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  <div className="border p-4 rounded-xl bg-slate-50 border-[#EBE8E0] hover:border-slate-400 transition-all cursor-pointer">
                    <span className="text-xs font-black text-slate-800 block">🔌 Basic Electrical Engineering Lab (BEE)</span>
                    <span className="text-[10px] text-slate-400 font-bold mt-1 block">KVL/KCL Verifications & Circuit Manifests</span>
                  </div>
                  <div className="border p-4 rounded-xl bg-slate-50 border-[#EBE8E0] hover:border-slate-400 transition-all cursor-pointer">
                    <span className="text-xs font-black text-slate-800 block">🧪 Engineering Chemistry Lab</span>
                    <span className="text-[10px] text-slate-400 font-bold mt-1 block">Titration Formulas & Operational Logs</span>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                  <div className="border p-4 rounded-xl bg-slate-50 border-[#EBE8E0] hover:border-slate-400 transition-all cursor-pointer">
                    <span className="text-xs font-black text-slate-800 block">💻 Computer Oriented Statistical Methods Lab (COSM)</span>
                    <span className="text-[10px] text-slate-400 font-bold mt-1 block">Python Analytics & Probability Testing Scripts</span>
                  </div>
                  <div className="border p-4 rounded-xl bg-slate-50 border-[#EBE8E0] hover:border-slate-400 transition-all cursor-pointer">
                    <span className="text-xs font-black text-slate-800 block">📂 Data Structures & Algorithms Lab</span>
                    <span className="text-[10px] text-slate-400 font-bold mt-1 block">Linked Lists, Traversal Blueprints & Tree Executions</span>
                  </div>
                </div>
              )}
            </div>
          </section>
        ) : currentView === "examNight" && activePackData ? (
          <section className="space-y-6 w-full">
            <div className="p-6 bg-[#0a0d1d] border border-slate-900 rounded-3xl text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
              <div>
                <h3 className="text-sm font-black text-white">{activePackData.subjectName} Pack</h3>
                <p className="text-xs text-slate-400 mt-0.5">High-probability study maps unlocked successfully.</p>
              </div>
              <div className="flex flex-col items-end">
                <div className="w-32 bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: `${activePackData.confidenceScore}%` }} />
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold mt-1">{activePackData.confidenceScore}% Ready for Exam</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
              <div className="bg-white border border-[#EBE8E0] p-6 rounded-2xl shadow-3xs">
                <h3 className="text-xs font-black text-red-500 uppercase">🎯 Section 1: Top 15 Must-Study Questions</h3>
                <ol className="text-xs font-bold text-slate-700 space-y-2.5 list-decimal list-inside mt-3">
                  {activePackData.mustStudyQuestions.map((q, i) => <li key={i}>{q}</li>)}
                </ol>
              </div>

              <div className="bg-white border border-[#EBE8E0] p-6 rounded-2xl shadow-3xs">
                <h3 className="text-xs font-black text-indigo-600 uppercase">📝 Section 2: Short Revision Notes</h3>
                <div className="mt-3 space-y-3">
                  {activePackData.shortNotes.map((n, i) => (
                    <div key={i} className="text-xs">
                      <h4 className="font-black text-slate-900">{n.topic}</h4>
                      <ul className="list-disc list-inside text-slate-600 pl-1 mt-0.5">{n.bulletPoints.map((bp, b) => <li key={b}>{bp}</li>)}</ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-[#EBE8E0] p-6 rounded-2xl shadow-3xs">
                <h3 className="text-xs font-black text-amber-600 uppercase">❓ Section 3: MCQ Revision Practice</h3>
                <div className="mt-3 space-y-2">
                  {activePackData.mcqs.map((mcq, i) => (
                    <div key={i} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                      <p className="font-bold text-slate-900">{mcq.question}</p>
                      <p className="text-[10px] font-mono text-emerald-600 font-black mt-1">Answer Vector: {mcq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-[#EBE8E0] p-6 rounded-2xl shadow-3xs">
                <h3 className="text-xs font-black text-emerald-600 uppercase">🎤 Section 4: Viva Reference Questions</h3>
                <ul className="text-xs font-bold text-slate-700 space-y-2 list-disc list-inside mt-3">
                  {activePackData.vivaQuestions.map((v, i) => <li key={i}>{v}</li>)}
                </ul>
              </div>
            </div>

            <button onClick={() => setCurrentView("papers")} className="text-xs font-bold text-slate-500 underline text-center block mx-auto pt-4 cursor-pointer">
              ← Exit Night Mode back to standard listings
            </button>
          </section>
        ) : currentView === "placement" ? (
          /* 🔥 ADVANCED PRO-LEVEL SECTOR INTERFACE FOR CORPORATE BLUEPRINTS */
          <section className="w-full">
            <div className="p-6 md:p-8 bg-[#0B0F19] border border-slate-800/80 rounded-3xl text-white shadow-2xl relative w-full overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl pointer-events-none" />
              
              <div className="mb-6">
                <h3 className="text-base font-black tracking-wide text-white">Company-Specific Placement Blueprints</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Select a corporate alignment track to query custom aptitude metrics, technical interview logs, and verification roadmaps.
                </p>
              </div>
              
              {/* Product vs. Service Strategic Category Selector Ribbon */}
              <div className="flex flex-wrap gap-2 border-b border-slate-800/80 pb-4 mb-4 w-full">
                {placementCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`px-4 py-2.5 rounded-xl transition-all border text-[11px] font-black flex items-center gap-1.5 ${
                      activeCategoryKey === cat.id 
                        ? "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20" 
                        : "bg-slate-900/40 text-slate-400 border-slate-800/60 hover:border-slate-700 hover:text-white"
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>

              {/* Comprehensive MNC Horizontal Navigator Ribbon */}
              <div className="flex flex-wrap gap-1.5 border-b border-slate-800/80 pb-3 mb-6 w-full max-h-[140px] overflow-y-auto pr-1">
                {placementRegistry[activeCategoryKey]?.map((companyName) => (
                  <button
                    key={companyName}
                    onClick={() => setSelectedCompany(companyName)}
                    className={`px-3 py-1.5 text-[11px] font-bold rounded-xl transition-all border ${
                      selectedCompany === companyName
                        ? "bg-white text-slate-950 border-white shadow-lg"
                        : "bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-600 hover:text-white"
                    }`}
                  >
                    🏢 {companyName}
                  </button>
                ))}
              </div>

              {/* Dynamic Metadata Focus Banner */}
              <div className="mb-6 p-4 rounded-xl bg-slate-900/50 border border-slate-800/60 text-xs flex justify-between items-center backdrop-blur-md w-full">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase block">Active Blueprint Node</span>
                  <span className="font-black text-white text-sm mt-0.5">{selectedCompany} Placement Directory</span>
                </div>
                <div className="text-right text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Secure Local Buffer Active</span>
                </div>
              </div>

              {/* Full Width Glassmorphic PDF Action Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                
                {/* DYNAMIC SLOT 1: APTITUDE */}
                <div className="p-6 border border-slate-800/60 rounded-2xl bg-[#111625]/80 shadow-inner flex flex-col justify-between min-h-[220px] transition-all hover:border-slate-700 group">
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-[10px] font-black tracking-wider text-purple-400 uppercase">
                        🧮 1. Aptitude & Logic
                      </h4>
                      <span className="text-[9px] font-mono text-slate-500">v1.4.0</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                      {currentCompanyFiles.aptitudeName 
                        ? `Loaded Asset: ${currentCompanyFiles.aptitudeName}` 
                        : `Store quantitative blueprints and evaluation parameters optimized for ${selectedCompany}.`}
                    </p>
                  </div>
                  <div className="mt-5 w-full flex flex-col gap-2">
                    {currentCompanyFiles.aptitudeUrl ? (
                      <a 
                        href={currentCompanyFiles.aptitudeUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="w-full bg-indigo-600 text-white text-[10px] font-black tracking-wide uppercase py-2.5 rounded-xl text-center block shadow-md"
                      >
                        Open Aptitude Document
                      </a>
                    ) : (
                      <button 
                        onClick={() => triggerPdfFileInput("aptitude")}
                        className="w-full bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white text-[10px] font-black tracking-wide uppercase py-2.5 rounded-xl transition"
                      >
                        ➕ Upload Aptitude PDF
                      </button>
                    )}
                  </div>
                </div>

                {/* DYNAMIC SLOT 2: TECHNICAL TECHNICAL ROUNDS */}
                <div className="p-6 border border-slate-800/60 rounded-2xl bg-[#111625]/80 shadow-inner flex flex-col justify-between min-h-[220px] transition-all hover:border-slate-700 group">
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-[10px] font-black tracking-wider text-indigo-400 uppercase">
                        💻 2. Technical & Coding
                      </h4>
                      <span className="text-[9px] font-mono text-slate-500">v3.1.2</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                      {currentCompanyFiles.technicalName 
                        ? `Loaded Asset: ${currentCompanyFiles.technicalName}` 
                        : `Store runtime logic loops and verified algorithmic blueprints optimized for ${selectedCompany}.`}
                    </p>
                  </div>
                  <div className="mt-5 w-full flex flex-col gap-2">
                    {currentCompanyFiles.technicalUrl ? (
                      <a 
                        href={currentCompanyFiles.technicalUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="w-full bg-indigo-600 text-white text-[10px] font-black tracking-wide uppercase py-2.5 rounded-xl text-center block shadow-md"
                      >
                        Open Technical Blueprint
                      </a>
                    ) : (
                      <button 
                        onClick={() => triggerPdfFileInput("technical")}
                        className="w-full bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white text-[10px] font-black tracking-wide uppercase py-2.5 rounded-xl transition"
                      >
                        ➕ Upload Technical PDF
                      </button>
                    )}
                  </div>
                </div>

                {/* DYNAMIC SLOT 3: HR & BEHAVIORAL */}
                <div className="p-6 border border-slate-800/60 rounded-2xl bg-[#111625]/80 shadow-inner flex flex-col justify-between min-h-[220px] transition-all hover:border-slate-700 group">
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-[10px] font-black tracking-wider text-emerald-400 uppercase">
                        🤝 3. HR & Behavioral
                      </h4>
                      <span className="text-[9px] font-mono text-slate-500">v2.0.1</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed font-medium">
                      {currentCompanyFiles.hrName 
                        ? `Loaded Asset: ${currentCompanyFiles.hrName}` 
                        : `Store STAR talking matrices and contextual leadership portfolios optimized for ${selectedCompany}.`}
                    </p>
                  </div>
                  <div className="mt-5 w-full flex flex-col gap-2">
                    {currentCompanyFiles.hrUrl ? (
                      <a 
                        href={currentCompanyFiles.hrUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="w-full bg-indigo-600 text-white text-[10px] font-black tracking-wide uppercase py-2.5 rounded-xl text-center block shadow-md"
                      >
                        Open Behavioral Guide
                      </a>
                    ) : (
                      <button 
                        onClick={() => triggerPdfFileInput("hr")}
                        className="w-full bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white text-[10px] font-black tracking-wide uppercase py-2.5 rounded-xl transition"
                      >
                        ➕ Upload HR & Resume PDF
                      </button>
                    )}
                  </div>
                </div>

              </div>

            </div>
          </section>
        ) : (
          <div className="border p-8 rounded-3xl text-center text-xs text-slate-400 bg-white border-[#EBE8E0]">Workspace tracking cluster active.</div>
        )}
      </div>
    </div>
  );
}