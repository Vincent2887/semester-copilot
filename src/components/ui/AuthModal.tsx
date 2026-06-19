"use client";

import { useState } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (email: string) => void;
}

export function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmitAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setMessage("Initializing credentials...");

    try {
      // 1. Fire the payload straight to your welcome-email webhook route
      const response = await fetch("/api/webhooks/welcome-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setMessage("Success! Checking entry logs...");
        setTimeout(() => {
          onAuthSuccess(email.trim());
          onClose();
        }, 1000);
      } else {
        throw new Error(result.error || "Authentication handshake failed.");
      }
    } catch (err: any) {
      console.error(err);
      setMessage(`Pipeline Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex items-center justify-center p-4 antialiased">
      <div className="bg-[#F4F1E8] border border-[#EBE8E0] max-w-sm w-full rounded-2xl p-6 shadow-xl space-y-4">
        <div>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">Sync Academic Account</h3>
          <p className="text-xs text-slate-400 mt-1 font-medium">Enter your credentials to establish a secure cloud-synced local profile session.</p>
        </div>

        <form onSubmit={handleSubmitAuth} className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@university.edu"
              className="w-full px-3 py-2 text-xs bg-white border border-[#EBE8E0] rounded-xl text-slate-800 placeholder-slate-300 focus:outline-none focus:border-slate-400 transition"
            />
          </div>

          {message && (
            <div className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50/50 border border-indigo-100 p-2 rounded-lg break-all">
              ⚙️ {message}
            </div>
          )}

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white border border-[#EBE8E0] text-slate-500 text-xs font-bold py-2 rounded-xl hover:bg-slate-50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-slate-900 text-white text-xs font-bold py-2 rounded-xl hover:bg-slate-800 transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Syncing..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}