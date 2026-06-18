"use client";

import { useState } from "react";

export default function ContactSupportPage() {
  const [formData, setFormData] = useState({ name: "", email: "", ticketType: "General Support", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Clear form inputs locally
      setFormData({ name: "", email: "", ticketType: "General Support", message: "" });
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#F4F1E8] text-slate-800 font-sans antialiased p-6 md:p-12 max-w-xl mx-auto">
      
      {/* HEADER SEGMENT */}
      <header className="mb-8 pb-4 border-b border-[#EBE8E0]">
        <div className="leading-none">
          <h1 className="font-serif font-bold text-xl text-slate-900 block">Contact Support Hub</h1>
          <p className="text-[10px] font-black tracking-widest uppercase text-slate-400 mt-2 block">Student Resolution Channel</p>
        </div>
      </header>

      {/* CORE FORM TICKETING BLOCK */}
      <section className="bg-white border border-[#EBE8E0] p-6 md:p-8 rounded-3xl shadow-3xs">
        {submitted ? (
          <div className="text-center py-8 space-y-3 animate-fadeIn">
            <div className="text-3xl text-emerald-500">✅</div>
            <h3 className="font-bold text-sm text-slate-900 uppercase tracking-wide">Ticket Dispatched</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
              Your support transmission has cleared system nodes. A student success team member will respond to your university email within 24 hours.
            </p>
            <button onClick={() => setSubmitted(false)} className="text-[10px] font-black text-indigo-600 underline uppercase mt-4 block mx-auto">
              Open Another Ticket
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitTicket} className="space-y-4 text-xs">
            
            <div className="space-y-1">
              <label className="font-black text-slate-400 uppercase tracking-wider block">Full Name</label>
              <input 
                type="text" 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Student Name"
                className="w-full bg-slate-50 border border-[#EBE8E0] rounded-xl p-3 outline-none focus:bg-white focus:border-slate-900 font-medium text-slate-800"
              />
            </div>

            <div className="space-y-1">
              <label className="font-black text-slate-400 uppercase tracking-wider block">University Email Address</label>
              <input 
                type="email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@college.edu"
                className="w-full bg-slate-50 border border-[#EBE8E0] rounded-xl p-3 outline-none focus:bg-white focus:border-slate-900 font-medium text-slate-800"
              />
            </div>

            <div className="space-y-1">
              <label className="font-black text-slate-400 uppercase tracking-wider block">Inquiry Classification</label>
              <select 
                value={formData.ticketType}
                onChange={(e) => setFormData({ ...formData, ticketType: e.target.value })}
                className="w-full bg-slate-50 border border-[#EBE8E0] rounded-xl p-3 outline-none focus:bg-white focus:border-slate-900 font-bold text-slate-700 cursor-pointer"
              >
                <option>General Support</option>
                <option>Premium Token Issues</option>
                <option>College Curricula Request</option>
                <option>Corporate / Legal Queries</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-black text-slate-400 uppercase tracking-wider block">Message Detail</label>
              <textarea 
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your issue or structural document missing trace logs here..."
                className="w-full bg-slate-50 border border-[#EBE8E0] rounded-xl p-3 outline-none focus:bg-white focus:border-slate-900 h-28 resize-none font-medium text-slate-800 leading-relaxed"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-black py-3 rounded-xl transition-all shadow-sm tracking-wider uppercase text-center cursor-pointer mt-2 block"
            >
              Submit Support Ticket
            </button>

          </form>
        )}
      </section>

      {/* METRICS INFOBAR */}
      <div className="mt-6 p-4 bg-white/50 border border-[#EBE8E0] rounded-2xl text-[11px] text-slate-500 font-medium space-y-1">
        <p>⏰ **Typical Response Vector:** &lt; 24 Hours</p>
        <p>📧 **Direct Operations Address:** operations@topperdeck.com</p>
      </div>

    </main>
  );
}