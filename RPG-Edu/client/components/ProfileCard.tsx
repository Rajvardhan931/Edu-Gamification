"use client";
import React from 'react';

interface ProfileStats {
  username: string;
  class: string;
  stats: {
    knowledge: { level: number; xp: number };
    capability: { level: number; xp: number };
    total_xp: number;
  };
}

export default function ProfileCard({ data }: { data: ProfileStats }) {
  const renderBar = (label: string, level: number, xp: number, color: string) => (
    <div className="mb-4">
      <div className="flex justify-between items-end mb-1">
        <span className="text-sm font-bold text-slate-300 uppercase tracking-tighter">{label}</span>
        <span className="text-lg font-bold text-white">Lvl {level}</span>
      </div>
      <div className="h-4 bg-slate-700 rounded-full overflow-hidden border border-slate-600">
        <div
          className={`h-full ${color} transition-all duration-1000 ease-out`}
          style={{ width: `${(xp % 100)}%` }}
        />
      </div>
      <div className="text-right text-[10px] text-slate-500 mt-1 font-mono">
        {xp % 100} / 100 XP to next level
      </div>
    </div>
  );

  return (
    <div className="bg-slate-800 border-2 border-amber-600/50 p-6 rounded-xl shadow-lg text-slate-100 w-full max-w-sm">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-slate-700 border-2 border-amber-500 rounded-full flex items-center justify-center text-2xl font-bold text-amber-400">
          {data.username[0].toUpperCase()}
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{data.username}</h2>
          <p className="text-amber-500 text-sm italic font-semibold">{data.class}</p>
        </div>
      </div>

      <div className="space-y-2">
        {renderBar('Knowledge (Knowing)', data.stats.knowledge.level, data.stats.knowledge.xp, 'bg-blue-500')}
        {renderBar('Capability (Doing)', data.stats.capability.level, data.stats.capability.xp, 'bg-emerald-500')}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-700 flex justify-between items-center">
        <span className="text-xs text-slate-400 uppercase font-semibold">Total Mastery</span>
        <span className="text-amber-400 font-mono font-bold">{data.stats.total_xp} XP</span>
      </div>
    </div>
  );
}
