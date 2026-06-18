import React from 'react';

interface StudentProfile {
  id: string;
  full_name: string;
  university: string;
  college: string;
  branch: string;
  is_premium: boolean;
}

interface UserTableProps {
  users: StudentProfile[];
  processingId: string | null;
  onToggleSubscription: (id: string, currentState: boolean) => void;
}

export function UserTable({ users, processingId, onToggleSubscription }: UserTableProps) {
  return (
    <div className="bg-white border border-[#EBE8E0] rounded-3xl shadow-xs overflow-hidden">
      <div className="px-6 py-4 border-b border-[#EBE8E0] bg-slate-50/40">
        <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">Identity Management Index</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#EBE8E0] text-[10px] uppercase text-slate-400 tracking-wider font-bold bg-slate-50/10">
              <th className="px-6 py-4">Student Entity Identity</th>
              <th className="px-6 py-4">Varsity Routing Node</th>
              <th className="px-6 py-4">Branch Node</th>
              <th className="px-6 py-4 text-right">Database State Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EBE8E0] text-xs">
            {users.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-400 font-bold uppercase tracking-widest bg-slate-50/5">
                  No matching structural registry index tokens found.
                </td>
              </tr>
            ) : (
              users.map((student) => (
                <tr key={student.id} className="hover:bg-slate-50/30 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{student.full_name}</td>
                  <td className="px-6 py-4">
                    <div className="leading-tight">
                      <p className="font-bold text-slate-800">{student.university || "Unselected"}</p>
                      <p className="text-[10px] text-slate-400 font-medium truncate max-w-sm mt-0.5">{student.college}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono font-black bg-slate-100 px-2 py-0.5 rounded text-[10px] text-slate-500 uppercase tracking-wide">
                      {student.branch || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      disabled={processingId === student.id}
                      onClick={() => onToggleSubscription(student.id, student.is_premium)}
                      className={`px-3.5 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all border ${
                        student.is_premium
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : "bg-white text-slate-400 border-slate-200 hover:text-slate-900 hover:border-slate-400"
                      } disabled:opacity-50`}
                    >
                      {processingId === student.id ? "Syncing..." : student.is_premium ? "💎 Premium" : "📁 Free Tier"}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}