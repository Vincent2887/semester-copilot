"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPaper() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [university, setUniversity] = useState("JNTUH");
  const [college, setCollege] = useState("");
  const [branch, setBranch] = useState("CSE");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");

  const handleFileSelectionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleExecuteCloudUploadPipeline = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title.trim() || !college.trim()) {
      setUploadMessage("Please complete all required fields.");
      return;
    }

    try {
      setIsUploading(true);
      setUploadMessage("Initiating secure asset connection...");

      // 1. Initialize custom unique file path identifiers
      const fileExtension = file.name.split(".").pop();
      const uniquePathToken = `${Date.now()}-${Math.random().toString(36).substring(7)}`;
      const storageBucketPath = `${branch.toLowerCase()}/${uniquePathToken}.${fileExtension}`;

      // 2. Import core Supabase token client dynamically
      const { supabase } = await import("../../lib/supabase");

      setUploadMessage("Streaming document blob directly to Supabase storage bucket...");
      
      // 3. Stream document binary payload into the 'notes' asset bucket container
      const { data: storageData, error: storageError } = await supabase.storage
        .from("notes")
        .upload(storageBucketPath, file, {
          cacheControl: "3600",
          upsert: false
        });

      if (storageError) throw new Error(`Bucket upload faulted: ${storageError.message}`);

      // 4. Retrieve the public CDN uniform resource locator matching the item path
      const { data: linkData } = supabase.storage
        .from("notes")
        .getPublicUrl(storageBucketPath);

      const resolvedPublicUrl = linkData.publicUrl;

      setUploadMessage("Cataloging document structural metadata rows in database tables...");

      // 5. Submit database row records via our server router verification gate
      const databasePayloadResult = await fetch("/api/upload-paper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          university,
          college,
          branch,
          file_url: resolvedPublicUrl
        })
      });

      const responseJsonData = await databasePayloadResult.json();

      if (!databasePayloadResult.ok || !responseJsonData.success) {
        throw new Error(responseJsonData.message || "Failed to commit database metadata entry.");
      }

      setUploadMessage("Upload sequence completed successfully! Redirecting...");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);

    } catch (pipelineError: any) {
      console.error("Cloud processing pipeline dropped context handles:", pipelineError);
      setUploadMessage(`Pipeline Interrupt: ${pipelineError.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1E8] p-6 sm:p-10 text-slate-800 font-sans antialiased flex items-center justify-center">
      <div className="w-full max-w-lg bg-white border border-[#EBE8E0] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        
        <div>
          <h2 className="text-xl font-black tracking-tight text-slate-900">Academic Asset Uploader</h2>
          <p className="text-xs text-slate-400 mt-1">Distribute authenticated previous papers or lecture material grids to the shared campus registry network.</p>
        </div>

        <form onSubmit={handleExecuteCloudUploadPipeline} className="space-y-4 text-xs font-bold text-slate-700">
          
          <div className="space-y-1.5">
            <label className="block text-slate-500">Document Title / Resource Heading</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Database Management Systems Unit 1 Handout"
              className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 font-medium"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-slate-500">Target University Network</label>
              <select 
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-slate-400"
              >
                <option value="JNTUH">JNTUH</option>
                <option value="Osmania University (OU)">Osmania University (OU)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-slate-500">Academic Branch Tag</label>
              <select 
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-slate-400"
              >
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="IT">IT</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-slate-500">Affiliated College Name String</label>
            <input 
              type="text" 
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              placeholder="e.g., VNR Vignana Jyothi Institute"
              className="w-full p-3 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-400 font-medium"
              required
            />
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="block text-slate-500">Attach Reference Binary Payload (PDF / DOCX)</label>
            <div className="border-2 border-dashed border-slate-200 hover:border-slate-400 rounded-xl p-5 text-center bg-slate-50/50 transition cursor-pointer relative">
              <input 
                type="file" 
                accept=".pdf,.docx"
                onChange={handleFileSelectionChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
                disabled={isUploading}
              />
              <span className="text-lg block mb-1">📁</span>
              <p className="text-[11px] font-bold text-slate-600">
                {file ? `Selected Asset: ${file.name}` : "Click here or drop your files to assign asset values"}
              </p>
            </div>
          </div>

          {uploadMessage && (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[10px] text-indigo-600">
              ⚡ Status: {uploadMessage}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isUploading}
            className={`w-full py-3.5 rounded-xl text-white font-black tracking-wide transition-all uppercase shadow-2xs mt-2 ${
              isUploading ? "bg-slate-300 cursor-not-allowed" : "bg-slate-900 hover:bg-slate-800 cursor-pointer"
            }`}
          >
            {isUploading ? "Pipeline Active..." : "Commit Document Payload"}
          </button>
        </form>

      </div>
    </div>
  );
}