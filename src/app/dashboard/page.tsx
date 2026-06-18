"use client";

import { useEffect, useState } from "react";
import { PaywallModal } from "../../components/ui/PaywallModal";
import { subjectBlueprintsRegistry, pastYearPapersRegistry, ExamNightPack } from "../../lib/subjectBlueprints";

const universitiesData: Record<string, { logo: string; colleges: string[] }> = {
  "JNTUH": {
    logo: "🏛️",
    colleges: [
      /* --- Autonomous --- */
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
      /* --- Affiliated / Non-Autonomous --- */
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
      "[Affiliated] Brilliant Institute of Engineering & Technology",
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
      /* --- Autonomous --- */
      "[Autonomous] University College of Engineering, Osmania University (UCEOU)",
      "[Autonomous] University College of Technology, Osmania University (UCTOU)",
      "[Autonomous] Vasavi College of Engineering (VCE)",
      "[Autonomous] Maturi Venkata Subba Rao (MVSR) Engineering College",
      "[Autonomous] Nizam College (Technical Programs)",
      /* --- Affiliated / Non-Autonomous --- */
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

export default function StudentDashboard() {
  const [currentView, setCurrentView] = useState<"papers" | "workspace" | "ai" | "bookmarks" | "examNight" | "labs">("papers");
  const [paperTabMode, setPaperTabMode] = useState<"notes" | "pyqs">("notes");
  const [cramMode, setCramMode] = useState(false);
  const [labDropdown, setLabDropdown] = useState(false);
  
  // Premium Token Economics Configuration
  const [userPlan, setUserPlan] = useState<"Free" | "Pro" | "Premium">("Free");
  const [availableCredits, setAvailableCredits] = useState(2);
  const [isPaywallOpen, setIsPaywallOpen] = useState(false);
  
  const [selectedUniv, setSelectedUniv] = useState<string | null>(null);
  const [selectedCollege, setSelectedCollege] = useState<string | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [selectedSubjectKey, setSelectedSubjectKey] = useState<string>("dbms");
  const [activePackData, setActivePackData] = useState<ExamNightPack | null>(null);
  const [generatingPack, setGeneratingPack] = useState(false);
  const [generationStatus, setGenerationStatus] = useState<string>("");
  const [selectedLabYear, setSelectedLabYear] = useState<string | null>(null);

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
      console.warn("Operating on local registry fallback.");
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

  const handleGeneratePredictivePack = (subjectKey: string) => {
    if (userPlan === "Free" && availableCredits < 5) {
      setIsPaywallOpen(true);
      return;
    }

    setSelectedSubjectKey(subjectKey);
    setGeneratingPack(true);
    
    setGenerationStatus("Analyzing previous JNTUH query logs...");
    
    setTimeout(() => {
      setGenerationStatus("Parsing R22 regulation unit core matrices...");
    }, 800);

    setTimeout(() => {
      setGenerationStatus("Synthesizing high-probability formula clusters...");
    }, 1600);
    
    setTimeout(() => {
      const lookupPack = subjectBlueprintsRegistry["CSE"]?.[subjectKey];
      if (lookupPack) {
        if (userPlan === "Free") {
          setAvailableCredits(prev => prev - 5);
        }
        setActivePackData(lookupPack);
        setCurrentView("examNight");
      }
      setGeneratingPack(false);
      setGenerationStatus("");
    }, 2400);
  };

  const resetCascadeFilter = () => {
    setSelectedUniv(null);
    setSelectedCollege(null);
    setSelectedBranch(null);
    setPapers([]);
  };

  const activeBranchPyqs = selectedBranch ? (pastYearPapersRegistry[selectedBranch] || {}) : {};

  return (
    <main className={`min-h-screen flex flex-col md:flex-row font-sans antialiased transition-colors duration-500 ${
      cramMode ? "bg-[#120A0A] text-[#F5EBEB]" : "bg-[#F4F1E8] text-slate-800"
    }`}>
      
      <PaywallModal isOpen={isPaywallOpen} onClose={() => setIsPaywallOpen(false)} cramMode={cramMode} />
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="bg-white border-r border-[#EBE8E0] p-6 hidden md:flex flex-col justify-between h-screen sticky top-0 w-64">
        <div className="space-y-6">
          <div className="leading-none">
            <span className="font-serif font-bold text-lg text-slate-900 block">Topperdeck</span>
            <span className="text-[9px] font-black tracking-widest uppercase text-slate-400 mt-1 block">CRACK THE EXAM</span>
          </div>

          <nav className="space-y-1">
            <button onClick={() => { setCurrentView("papers"); resetCascadeFilter(); }} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${currentView === "papers" ? "bg-[#F4F1E8] text-slate-900 border border-[#EBE8E0]" : "text-slate-500 hover:bg-slate-50"}`}>
              <span>📄</span> Previous Papers
            </button>
            <button onClick={() => setCurrentView("workspace")} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${currentView === "workspace" ? "bg-[#F4F1E8] text-slate-900 border border-[#EBE8E0]" : "text-slate-500 hover:bg-slate-50"}`}>
              <span>📚</span> Notes Workspace
            </button>
            <button onClick={() => setCurrentView("ai")} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${currentView === "ai" ? "bg-[#F4F1E8] text-slate-900 border border-[#EBE8E0]" : "text-slate-500 hover:bg-slate-50"}`}>
              <span>🤖</span> AI Study Engine
            </button>
            <button onClick={() => setCurrentView("bookmarks")} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${currentView === "bookmarks" ? "bg-[#F4F1E8] text-slate-900 border border-[#EBE8E0]" : "text-slate-500 hover:bg-slate-50"}`}>
              <span>🔖</span> Bookmarks
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

      {/* CORE CANVAS WORKSPACE */}
      <div className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full flex flex-col transition-all duration-500">
        
        <header className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-8 pb-4 border-b border-[#EBE8E0]">
          <h1 className="text-xl font-black tracking-tight text-slate-900">
            {currentView === "examNight" ? "🚨 Night Pack Mode Active" : "Dashboard Workspace"}
          </h1>
          <button onClick={() => setCramMode(!cramMode)} className="px-4 py-2 text-xs font-bold bg-white border border-[#EBE8E0] rounded-xl">Toggle Canvas Light</button>
        </header>

        {/* CREDIT SYSTEM MODULE */}
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

        {/* HERO PROMOTIONAL BANNER */}
        {currentView !== "examNight" && (
          <div className="mb-8 p-6 rounded-3xl bg-gradient-to-br from-red-500 via-orange-500 to-indigo-600 text-white shadow-xl space-y-4 relative overflow-hidden">
            <div className="space-y-1 relative z-10">
              <span className="inline-flex items-center gap-1 bg-white/20 px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-wider uppercase text-white">
                💎 Premium Feature • Most Used ⭐
              </span>
              <h2 className="text-xl font-black tracking-tight pt-1">🚨 EXAM TOMORROW?</h2>
              <p className="text-xs text-white/90 max-w-xl">
                A student with an exam tomorrow wants only what they need to pass. Skip the 300-page textbooks and 100 long video clips.
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

        {/* CONDITIONAL SYSTEM DISPLAY ROUTER */}
        {currentView === "papers" ? (
          <section className="space-y-6">
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
              <div className="grid sm:grid-cols-2 gap-4">
                {Object.keys(universitiesData).map((univ) => (
                  <div key={univ} onClick={() => setSelectedUniv(univ)} className="border p-6 rounded-2xl transition bg-white border-[#EBE8E0] hover:border-slate-400 cursor-pointer flex items-center gap-4">
                    <span className="text-2xl p-2 border bg-slate-50 border-slate-200 rounded-xl">{universitiesData[univ].logo}</span>
                    <h4 className="font-bold text-sm text-slate-900">{univ}</h4>
                  </div>
                ))}
              </div>
            )}

            {selectedUniv && !selectedCollege && (
              <div className="space-y-2 max-h-[400px] overflow-y-auto border border-[#EBE8E0] bg-white rounded-2xl p-3 shadow-2xs">
                {universitiesData[selectedUniv].colleges.map((clg) => (
                  <div key={clg} onClick={() => setSelectedCollege(clg)} className="border p-3.5 rounded-xl bg-slate-50 hover:bg-white border-[#EBE8E0] hover:border-slate-400 cursor-pointer text-xs font-bold text-slate-800 flex justify-between items-center transition-all">
                    <span>🏢 {clg}</span>
                    <span className="opacity-40">➔</span>
                  </div>
                ))}
              </div>
            )}

            {selectedUniv && selectedCollege && !selectedBranch && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {engineeringBranches.map((br) => (
                  <div key={br.id} onClick={() => setSelectedBranch(br.id)} className="border p-5 text-center bg-white border-[#EBE8E0] hover:border-slate-400 cursor-pointer transition rounded-2xl shadow-2xs">
                    <span className="text-xl block mb-1">{br.icon}</span>
                    <span className="text-xs font-black block text-slate-800">{br.id}</span>
                  </div>
                ))}
              </div>
            )}

            {selectedUniv && selectedCollege && selectedBranch && (
              <div className="space-y-4">
                <div className="flex gap-2 border-b border-[#EBE8E0] pb-2">
                  <button onClick={() => setPaperTabMode("notes")} className={`px-4 py-2 text-xs font-black rounded-lg ${paperTabMode === "notes" ? "bg-slate-900 text-white" : "text-slate-400"}`}>Regular Class Handouts</button>
                  <button onClick={() => setPaperTabMode("pyqs")} className={`px-4 py-2 text-xs font-black rounded-lg ${paperTabMode === "pyqs" ? "bg-indigo-600 text-white" : "text-indigo-500"}`}>📜 University PYQs</button>
                </div>

                {paperTabMode === "notes" ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {papers.length === 0 ? (
                      <div className="p-8 border rounded-2xl bg-white border-[#EBE8E0] text-slate-400 text-xs font-bold col-span-full text-center">No class handouts found. Material can be added subsequently via the upload panel node.</div>
                    ) : (
                      papers.map((paper) => (
                        <div key={paper.id} className="border p-4 bg-white rounded-xl border-[#EBE8E0] h-36 flex flex-col justify-between shadow-2xs">
                          <h4 className="text-xs font-bold text-slate-900">{paper.title}</h4>
                          <a href={paper.file_url} target="_blank" rel="noreferrer" onClick={(e) => handleAccessResourceAsset(e, paper.file_url)} className="w-full bg-slate-900 text-white text-xs font-bold py-2 rounded-xl text-center block">View PDF</a>
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.keys(activeBranchPyqs).length === 0 ? (
                      <div className="p-8 border rounded-2xl bg-white border-[#EBE8E0] text-slate-400 text-xs font-bold col-span-full text-center">No official university query logs discovered in registry layout.</div>
                    ) : (
                      Object.keys(activeBranchPyqs).map((subjectKey) => 
                        activeBranchPyqs[subjectKey].map((pyq: any, i: number) => (
                          <div key={i} className="border p-5 bg-white border-[#EBE8E0] rounded-2xl flex flex-col justify-between h-40 shadow-2xs">
                            <div>
                              <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase">{subjectKey}</span>
                              <h4 className="text-xs font-black text-slate-900 mt-2">Official PYQ Paper ({pyq.year})</h4>
                            </div>
                            <a href={pyq.pdfUrl} className="w-full bg-indigo-600 text-white text-xs font-bold py-2 rounded-xl text-center block">Download PDF</a>
                          </div>
                        ))
                      )
                    )}
                  </div>
                )}
              </div>
            )}
          </section>
        ) : currentView === "workspace" ? (
          /* 📥 NOTES WORKSPACE MODULE */
          <section className="space-y-6">
            <div className="p-6 bg-white border border-[#EBE8E0] rounded-2xl shadow-3xs">
              <h3 className="text-sm font-black text-slate-900 mb-1">Upload Study Material Portal</h3>
              <p className="text-xs text-slate-400 mb-6">Contribute curriculum materials, handouts, or reference packets to the student registry.</p>
              
              <div className="border-2 border-dashed border-slate-300 hover:border-indigo-500 rounded-xl p-8 text-center bg-slate-50/50 transition-colors cursor-pointer group">
                <span className="text-2xl block mb-2 group-hover:scale-110 transition-transform">📤</span>
                <p className="text-xs font-bold text-slate-700">Drag & drop notes resources or click to browse</p>
                <p className="text-[10px] text-slate-400 mt-1">Accepts PDF, DOCX, or high-detail images up to 50MB</p>
                <input type="file" className="hidden" id="file-upload-input" />
              </div>
            </div>
          </section>
        ) : currentView === "ai" ? (
          /* 🤖 AI STUDY ENGINE MODULE */
          <section className="space-y-6">
            <div className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl border border-slate-800 shadow-sm">
              <h3 className="text-sm font-black mb-1">AI Study Module Synthesizer</h3>
              <p className="text-xs text-slate-400">Transform dense textbook reference materials or long class logs into structured mock blueprints instantly.</p>
            </div>
            
            <div className="bg-white border border-[#EBE8E0] p-6 rounded-2xl shadow-3xs">
              <h4 className="text-xs font-black text-indigo-600 uppercase mb-3">✨ Core Context Engine</h4>
              <textarea 
                placeholder="Paste your engineering mathematics notes, formulas list, or syllabus topics string here to build an automated revision layout..." 
                className="w-full min-h-[120px] p-3 text-xs border border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 font-sans text-slate-800"
              />
              <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors">
                Synthesize Key Insights
              </button>
            </div>
          </section>
        ) : currentView === "bookmarks" ? (
          /* 🔖 BOOKMARKS MODULE */
          <section className="space-y-4">
            <div className="p-6 bg-white border border-[#EBE8E0] rounded-2xl shadow-3xs text-center text-xs text-slate-400 font-bold">
              📁 Saved bookmarks cluster is currently empty. Star important documents to review them here subsequently.
            </div>
          </section>
        ) : currentView === "labs" ? (
          /* 🧪 LAB PRACTICALS MODULE */
          <section className="space-y-6">
            <div className="p-6 bg-white border border-[#EBE8E0] rounded-2xl shadow-3xs">
              <h3 className="text-sm font-black text-slate-900 mb-1">
                Engineering Laboratory Practicals — {selectedLabYear === "1" ? "1st Year Syllabus" : "2nd Year Syllabus"}
              </h3>
              <p className="text-xs text-slate-400 mb-6">Access procedure guidelines, execution records, structural script configurations, and viva logs.</p>
              
              {selectedLabYear === "1" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          /* PRE-COMPILED SECURE PREMIUM VIEWER WORKBENCH */
          <section className="space-y-6">
            <div className="p-6 bg-[#0a0d1d] border border-slate-900 rounded-3xl text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
        ) : (
          <div className="border p-8 rounded-3xl text-center text-xs text-slate-400 bg-white border-[#EBE8E0]">Workspace tracking cluster active.</div>
        )}
      </div>
    </main>
  );
}