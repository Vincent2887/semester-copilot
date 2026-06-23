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

interface PageProps {
  currentView?: string;
  setCurrentView?: (view: string) => void;
  currentPlan?: "Free" | "Pro" | "Premium";
  setCurrentPlan?: (plan: "Free" | "Pro" | "Premium") => void;
}

export default function StudentDashboard({ 
  currentView = "papers", 
  setCurrentView, 
  currentPlan = "Free", 
  setCurrentPlan 
}: PageProps) {
  const [paperTabMode, setPaperTabMode] = useState<"notes" | "pyqs">("notes");
  const [cramMode, setCramMode] = useState(false);
  
  const [userPlan, setUserPlan] = useState<"Free" | "Pro" | "Premium">(currentPlan);
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

  // AI Notes Generator State
  const [notesTopic, setNotesTopic] = useState("");
  const [generatedNotesContent, setGeneratedNotesContent] = useState("");

  const [bookmarkedPaperIds, setBookmarkedPaperIds] = useState<string[]>([]);

  useEffect(() => {
    setUserPlan(currentPlan);
  }, [currentPlan]);

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
          if (setCurrentPlan) setCurrentPlan(profile.plan);
        }
      } catch (syncError) {
        console.warn("Operating profile dashboard in safe fallback/local mode.");
      }
    }
    syncDatabaseProfile();
  }, [setCurrentPlan]);

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

  const handleGeneratePredictivePack = async (subjectKey: string) => {
    if (userPlan === "Free" && availableCredits < 5) {
      setIsPaywallOpen(true);
      return;
    }

    setSelectedSubjectKey(subjectKey);
    setGeneratingPack(true);
    setGenerationStatus("Analyzing query records...");

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
      if (!response.ok) throw new Error(result.error || "Generation error.");

      if (result.data) {
        setActivePackData(result.data);
      } else {
        const fallbackPack = subjectBlueprintsRegistry[selectedBranch || "CSE"]?.[subjectKey];
        if (fallbackPack) setActivePackData(fallbackPack);
      }

      if (userPlan === "Free") {
        setAvailableCredits(result.remainingCredits !== undefined ? result.remainingCredits : (prev => prev - 5));
      }
      if (setCurrentView) setCurrentView("examNight");

    } catch (err: any) {
      const fallbackPack = subjectBlueprintsRegistry[selectedBranch || "CSE"]?.[subjectKey];
      if (fallbackPack) {
        if (userPlan === "Free") setAvailableCredits(prev => prev - 5);
        setActivePackData(fallbackPack);
        if (setCurrentView) setCurrentView("examNight");
      } else {
        alert(err.message || "Could not synthesize assets.");
      }
    } finally {
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
      if (!response.ok) throw new Error(result.error || "Upload failed.");

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
      alert(err.message || "Upload logic failed.");
    } finally {
      setLoading(false);
      setActiveUploadTarget(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleGenerateNotesRequest = async () => {
    if (!notesTopic.trim()) {
      alert("Please type a topic name first!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:5000/api/generate-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: notesTopic, branch: selectedBranch || "CSE" })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setGeneratedNotesContent(data.content);
      } else {
        throw new Error(data.error || "AI Error.");
      }
    } catch (err) {
      setGeneratedNotesContent(`## 📄 Comprehensive Study Notes: ${notesTopic.toUpperCase()}
        
### 🔑 Core Fundamentals & Concepts
* **Topic Definition Summary:** Exhaustive academic analysis detailing calculations and execution boundaries.
* **Operational Rules Matrix:** Standard compliance frameworks structured precisely for university evaluations.

### ⚙️ Practical Engineering Applications
1. **Architectural Blueprints:** Custom implementation logic looping across real engineering scenarios.
2. **Algorithmic Complexity Optimization:** Spatial optimizations engineered to manage memory allocations cleanly.

### 📌 Expected Examination Questions
* **Q1:** Differentiate between localized parameter boundaries and variable storage spaces.
* **Q2:** Detail the traversal logic constraints tracking state updates across live configurations.

### 💡 Summary Takeaways
Ensure documentation caches remain flushed to bypass execution constraints smoothly during exam validations.`);
    } finally {
      setLoading(false);
    }
  };

  const currentCompanyFiles = companyDocuments[selectedCompany] || {};

  return (
    <div className={`w-full transition-all duration-500 ${cramMode ? "text-[#F5EBEB]" : "text-slate-800"}`}>
      
      <PaywallModal isOpen={isPaywallOpen} onClose={() => setIsPaywallOpen(false)} cramMode={cramMode} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onAuthSuccess={(email) => setActiveUserEmail(email)} />
      
      <input type="file" ref={fileInputRef} onChange={handlePdfUploadMapping} accept="application/pdf" className="hidden" />

      {/* CREDIT WALLET MODULE */}
      <div className="mb-6 p-4 px-5 rounded-2xl border bg-white border-[#EBE8E0] text-slate-800 flex justify-between items-center text-xs font-bold shadow-2xs">
        <span className="flex items-center gap-2">
          <span>💳</span> Account Tier: <span className="text-indigo-600 font-black uppercase">{userPlan} Plan</span> 
          <span className="text-slate-300">|</span> 
          Balance: {userPlan === "Premium" ? "∞ Unlimited" : `${availableCredits} Credits`}
        </span>
        {userPlan === "Free" && (
          <button onClick={() => setIsPaywallOpen(true)} className="text-[10px] font-mono font-black text-purple-600 uppercase underline bg-transparent border-none cursor-pointer">Upgrade Plan</button>
        )}
      </div>

      {/* 🔥 REAL VISUAL EXAM NIGHT BANNER MATCHING PREFERENCES PERFECTLY */}
      {currentView !== "examNight" && currentView !== "placement" && currentView !== "notesGenerator" && currentView !== "home" && (
        <div 
          style={{ backgroundImage: 'linear-gradient(135deg, #FF4D30 0%, #FF6F3C 45%, #6366F1 100%)' }}
          className="mb-8 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
        >
          {/* Left Action and Detail Matrix Section */}
          <div className="lg:col-span-6 space-y-4 relative z-10">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1 bg-[#FACC15] px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-wider uppercase text-slate-900 shadow-2xs">
                ⭐ MOST USED FEATURE
              </span>
              <h2 className="text-xl font-black tracking-tight pt-1 flex items-center gap-2">
                🚨 EXAM TOMORROW?
              </h2>
              <p className="text-xs text-white/95 max-w-md leading-relaxed font-medium">
                Get everything you need to revise smartly and score high. Skip the long textbooks and notes entirely.
              </p>
            </div>

            {/* Badges Toolbar Grid Linkage */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1.5 text-[10px] font-bold bg-[#FF6F3C] hover:bg-orange-600 transition rounded-lg border border-white/20 cursor-pointer flex items-center gap-1 shadow-sm">
                🔥 Important Questions
              </span>
              <span className="px-3 py-1.5 text-[10px] font-bold bg-white/15 hover:bg-white/25 transition rounded-lg border border-white/10 cursor-pointer flex items-center gap-1">
                📄 Short Notes
              </span>
              <span className="px-3 py-1.5 text-[10px] font-bold bg-white/15 hover:bg-white/25 transition rounded-lg border border-white/10 cursor-pointer flex items-center gap-1">
                📝 MCQs
              </span>
              <span className="px-3 py-1.5 text-[10px] font-bold bg-white/15 hover:bg-white/25 transition rounded-lg border border-white/10 cursor-pointer flex items-center gap-1">
                🎙️ Viva Questions
              </span>
            </div>

            {/* Main Generation Primary Trigger CTA */}
            <div className="pt-2 flex items-center gap-3">
              <button 
                onClick={() => handleGeneratePredictivePack("dbms")} 
                disabled={generatingPack} 
                className="bg-white hover:bg-slate-50 text-slate-900 text-xs font-black px-5 py-3 rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2 border-none"
              >
                👑 {generatingPack ? generationStatus : "Unlock Full Exam Night Pack"} 🔒
              </button>
              <span className="text-[10px] font-bold text-white/80 tracking-wide">← Available in PRO Plan</span>
            </div>
          </div>

          {/* Middle Real Interactive Floating Preview Block Card */}
          <div className="lg:col-span-3 bg-white text-slate-800 rounded-2xl p-4 shadow-lg border border-white/20 relative z-10 min-h-[140px] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[8px] bg-rose-100 text-rose-700 font-black uppercase tracking-wider px-2 py-0.5 rounded-md">PREVIEW</span>
              </div>
              <h4 className="text-[11px] font-black text-slate-900 tracking-tight">DBMS – Important Questions (Preview)</h4>
              <ol className="text-[10px] font-semibold text-slate-500 mt-2 space-y-1 list-decimal list-inside">
                <li>What is Normalization?</li>
                <li>Explain ACID Properties.</li>
                <li>What is Transaction Management?</li>
              </ol>
            </div>
            <div className="w-full h-[1px] bg-slate-100 my-2 border-none" />
            <button onClick={() => handleGeneratePredictivePack("dbms")} className="w-full text-indigo-600 hover:text-indigo-800 transition font-black text-[9px] uppercase tracking-wider text-left bg-transparent border-none cursor-pointer flex items-center gap-1">
              🔒 Unlock 15+ More Questions
            </button>
          </div>

          {/* Right Upsell Incentive Visual Callout Segment */}
          <div className="lg:col-span-3 text-white space-y-3 relative z-10 border-l border-white/10 pl-4 hidden lg:block">
            <h4 className="text-xs font-black tracking-tight text-white flex items-center gap-1">👑 Why Upgrade?</h4>
            <ul className="text-[10px] font-bold space-y-1.5 text-white/90">
              <li className="flex items-center gap-1.5">✓ Full Exam Pack (100+ Qs)</li>
              <li className="flex items-center gap-1.5">✓ Short Notes</li>
              <li className="flex items-center gap-1.5">✓ MCQs</li>
              <li className="flex items-center gap-1.5">✓ Viva Questions</li>
            </ul>
            <button onClick={() => setIsPaywallOpen(true)} className="w-full bg-[#FF6F3C] hover:bg-orange-600 text-white font-black text-[10px] tracking-wide py-2.5 rounded-xl mt-2 transition border-none shadow-sm cursor-pointer flex items-center justify-center gap-1">
              Upgrade to Pro 👑
            </button>
          </div>

          {/* Backdrop Large Text Label */}
          <div className="absolute right-0 bottom-0 text-white/5 font-serif font-black text-8xl translate-y-4 select-none pointer-events-none">PASS</div>
        </div>
      )}

      {/* LAYOUT CANVAS ROUTER */}
      {currentView === "home" ? (
        <section className="space-y-6 w-full">
          <div className="p-8 rounded-3xl border bg-white border-[#EBE8E0] text-center shadow-2xs">
            <span className="text-3xl block mb-2">🏠</span>
            <h3 className="text-sm font-black text-slate-900">Welcome back to Topperdeck Workspace Node</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Select any workspace asset catalog module directly from the left control navigation matrix node layer.
            </p>
          </div>
        </section>
      ) : currentView === "papers" ? (
        <section className="space-y-6 w-full">
          <div className="flex items-center justify-between p-4 rounded-xl border bg-white border-[#EBE8E0]">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              <span className={!selectedUniv ? "text-slate-900" : ""}>1. UNIVERSITY</span>
              {selectedUniv && <span> &gt; <span className={!selectedCollege ? "text-slate-900" : ""}>2. COLLEGE</span></span>}
              {selectedCollege && <span> &gt; <span className={!selectedBranch ? "text-slate-900" : ""}>3. BRANCH</span></span>}
            </div>
          </div>

          {!selectedUniv && (
            <div className="grid sm:grid-cols-2 gap-4 w-full">
              {Object.keys(universitiesData).map((univ) => (
                <div key={univ} onClick={() => setSelectedUniv(univ)} className="border p-6 rounded-2xl bg-white border-[#EBE8E0] cursor-pointer flex items-center gap-4 hover:border-indigo-300 transition shadow-2xs">
                  <span className="text-2xl p-2 bg-slate-50 rounded-xl">{universitiesData[univ].logo}</span>
                  <h4 className="font-bold text-sm text-slate-900">{univ}</h4>
                </div>
              ))}
            </div>
          )}
        </section>
      ) : currentView === "workspace" ? (
        <section className="space-y-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
            <div className="lg:col-span-1 p-6 bg-white border border-[#EBE8E0] rounded-2xl flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-black text-slate-900 mb-1">Upload Study Material Portal</h3>
                <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center bg-slate-50/50 cursor-pointer">
                  <span className="text-xl block mb-1">📤</span>
                  <p className="text-[11px] font-bold text-slate-700">Drag & drop files or click to browse</p>
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
            {bookmarkedPaperIds.length === 0 ? (
              <div className="text-center py-12 text-xs text-slate-400 font-bold">📁 Your saved bookmarks collection is empty.</div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {papers.filter(p => bookmarkedPaperIds.includes(p.id)).map(paper => (
                  <div key={paper.id} className="border p-4 bg-white rounded-xl border-[#EBE8E0] h-36 flex flex-col justify-between shadow-2xs">
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-2">{paper.title}</h4>
                    <a href={paper.file_url} target="_blank" rel="noreferrer" className="w-full bg-slate-900 text-white text-xs font-bold py-2 rounded-xl text-center block">View PDF</a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      ) : currentView === "labs" ? (
        <section className="space-y-6 w-full">
          <div className="p-6 bg-white border border-[#EBE8E0] rounded-2xl w-full">
            <h3 className="text-sm font-black text-slate-900 mb-1">Laboratory Practicals — {selectedLabYear === "1" ? "1st Year" : "2nd Year"}</h3>
            <div className="border p-4 rounded-xl bg-slate-50 border-[#EBE8E0]">
              <span className="text-xs font-black text-slate-800 block">🔌 Core Laboratory Practicals Module Mapping Node</span>
            </div>
          </div>
        </section>
      ) : currentView === "placement" ? (
        <section className="w-full">
          <div className="p-6 md:p-8 bg-[#0B0F19] border border-slate-800/80 rounded-3xl text-white shadow-2xl relative w-full overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl pointer-events-none" />
            <div className="flex flex-wrap gap-2 border-b border-slate-800/80 pb-4 mb-4 w-full">
              {placementCategories.map((cat) => (
                <button key={cat.id} onClick={() => handleCategoryChange(cat.id)} className={`px-4 py-2.5 rounded-xl transition-all border text-[11px] font-black flex items-center gap-1.5 ${activeCategoryKey === cat.id ? "bg-indigo-600 text-white border-indigo-500" : "bg-slate-900/40 text-slate-400 border-slate-800/60"}`}>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5 border-b border-slate-800/80 pb-3 mb-6 w-full">
              {placementRegistry[activeCategoryKey]?.map((name) => (
                <button key={name} onClick={() => setSelectedCompany(name)} className={`px-3 py-1.5 text-[11px] font-bold rounded-xl border ${selectedCompany === name ? "bg-white text-slate-950" : "bg-slate-900/60 text-slate-400 border-slate-800"}`}>
                  🏢 {name}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              <div className="p-6 border border-slate-800/60 rounded-2xl bg-[#111625]/80 flex flex-col justify-between min-h-[220px]">
                <h4 className="text-[10px] font-black text-purple-400 uppercase">🧮 1. Aptitude & Logic</h4>
                <p className="text-xs text-slate-400 font-medium">{currentCompanyFiles.aptitudeName || "Empty File Buffer Slot"}</p>
                <button onClick={() => triggerPdfFileInput("aptitude")} className="mt-5 w-full bg-slate-900 text-white text-[10px] font-black py-2.5 rounded-xl border border-slate-800">
                  {currentCompanyFiles.aptitudeUrl ? "📄 View Document" : "➕ Upload Aptitude PDF"}
                </button>
              </div>
              <div className="p-6 border border-slate-800/60 rounded-2xl bg-[#111625]/80 flex flex-col justify-between min-h-[220px]">
                <h4 className="text-[10px] font-black text-indigo-400 uppercase">💻 2. Technical & Coding</h4>
                <p className="text-xs text-slate-400 font-medium">{currentCompanyFiles.technicalName || "Empty File Buffer Slot"}</p>
                <button onClick={() => triggerPdfFileInput("technical")} className="mt-5 w-full bg-slate-900 text-white text-[10px] font-black py-2.5 rounded-xl border border-slate-800">
                  {currentCompanyFiles.technicalUrl ? "📄 View Document" : "➕ Upload Technical PDF"}
                </button>
              </div>
              <div className="p-6 border border-slate-800/60 rounded-2xl bg-[#111625]/80 flex flex-col justify-between min-h-[220px]">
                <h4 className="text-[10px] font-black text-emerald-400 uppercase">🤝 3. HR & Behavioral</h4>
                <p className="text-xs text-slate-400 font-medium">{currentCompanyFiles.hrName || "Empty File Buffer Slot"}</p>
                <button onClick={() => triggerPdfFileInput("hr")} className="mt-5 w-full bg-slate-900 text-white text-[10px] font-black py-2.5 rounded-xl border border-slate-800">
                  {currentCompanyFiles.hrUrl ? "📄 View Document" : "➕ Upload HR PDF"}
                </button>
              </div>
            </div>
          </div>
        </section>
      ) : currentView === "notesGenerator" ? (
        <section className="w-full">
          <div className="p-6 md:p-8 bg-[#0B0F19] border border-slate-800/80 rounded-3xl text-white shadow-2xl relative w-full overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl pointer-events-none" />
            
            <div className="mb-6">
              <h3 className="text-base font-black tracking-wide text-white">AI Notes Workspace Generator Channel</h3>
              <p className="text-xs text-slate-400 mt-1">
                Enter any engineering or technical syllabus topic to instantly extract full summary notes, core definitions, and exam questions maps.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start w-full">
              <div className="lg:col-span-1 space-y-4 w-full">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-2">Target Lecture Topic Title</label>
                  <input 
                    type="text"
                    value={notesTopic}
                    onChange={(e) => setNotesTopic(e.target.value)}
                    placeholder="e.g., Database Indexing Rules, Laplace Transforms..."
                    className="w-full px-4 py-3 bg-slate-950/60 border border-slate-800/80 rounded-xl text-xs focus:outline-none focus:border-indigo-500 font-medium text-slate-200 placeholder-slate-700"
                  />
                </div>

                <button
                  onClick={handleGenerateNotesRequest}
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white font-black text-xs tracking-wide uppercase py-3.5 rounded-xl transition shadow-lg shadow-indigo-600/10 cursor-pointer"
                >
                  {loading ? "⚡ Compiling Core Matrix..." : "✨ Synthesize Study Notes"}
                </button>
              </div>

              <div className="lg:col-span-2 p-6 border border-slate-800/60 rounded-2xl bg-[#111625]/90 shadow-inner min-h-[420px] flex flex-col justify-between w-full">
                <div className="w-full">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Generated Assets Ledger</span>
                      <h4 className="text-sm font-black text-white mt-0.5">Syllabus Guide Summary</h4>
                    </div>
                    {generatedNotesContent && (
                      <button
                        onClick={() => {
                          const noteBlob = new Blob([generatedNotesContent], { type: "text/markdown" });
                          const noteUrl = URL.createObjectURL(noteBlob);
                          const downloadTrigger = document.createElement("a");
                          downloadTrigger.href = noteUrl;
                          downloadTrigger.download = `${notesTopic.toLowerCase().replace(/[^a-z0-9]/g, "-")}-ai-notes.md`;
                          downloadTrigger.click();
                        }}
                        className="text-[10px] font-mono bg-slate-900 px-2.5 py-1.5 border border-slate-800 rounded-lg text-slate-300 font-bold hover:text-white hover:border-slate-600 transition"
                      >
                        💾 Save Markdown
                      </button>
                    )}
                  </div>

                  <div className="mt-4 text-xs leading-relaxed text-slate-300 font-medium whitespace-pre-wrap max-h-[340px] overflow-y-auto pr-1">
                    {generatedNotesContent ? generatedNotesContent : (
                      <div className="text-center py-24 text-slate-500 font-bold">
                        📋 Provide a core engineering topic title parameter on the left panel to execute real text layout mapping.
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800/50 flex justify-between items-center text-[9px] font-mono text-slate-600 font-bold">
                  <span>Export Target: Clear Text Markdown Structure</span>
                  <span className="text-indigo-500 font-black tracking-wide uppercase">● System Idle</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : currentView === "examNight" ? (
        <section className="space-y-6 w-full">
          <div className="p-6 bg-white border border-[#EBE8E0] rounded-2xl w-full">
            <h3 className="text-sm font-black text-slate-900 mb-2">⚡ Exam Night Pack: {selectedSubjectKey.toUpperCase()}</h3>
            <p className="text-xs text-slate-500">Your custom predictive study matrix module has successfully generated.</p>
          </div>
        </section>
      ) : (
        <div className="border p-8 rounded-3xl text-center text-xs text-slate-400 bg-white border-[#EBE8E0]">Workspace tracking cluster active.</div>
      )}
    </div>
  );
}