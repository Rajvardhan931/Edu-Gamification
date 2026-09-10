"use client";
import React from 'react';

interface LevelUpProps {
  xpGained: number;
  onClose: () => void;
}

export default function LevelUpModal({ xpGained, onClose }: LevelUpProps) {
  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div className="bg-slate-800 border-4 border-amber-500 p-10 rounded-2xl max-w-md w-full text-center shadow-[0_0_50px_rgba(245,158,11,0.3)] font-mono animate-in zoom-in duration-300">
        <div className="text-6xl mb-4">✨</div>
        <h2 className="text-4xl font-bold text-white uppercase tracking-tighter mb-2">Level Up!</h2>
        <p className="text-amber-400 text-xl italic mb-8">Your mastery of the realm expands.</p>

        <div className="bg-slate-900 p-6 rounded-xl border-2 border-amber-600 mb-8">
          <p className="text-slate-400 uppercase text-xs font-bold mb-1">XP Gained</p>
          <p className="text-5xl font-black text-white">+{xpGained}</p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded uppercase tracking-widest transition-all border-b-4 border-amber-800 active:border-b-0 active:translate-y-1"
        >
          Continue Journey
        </button>
      </div>
    </div>
  );
}
