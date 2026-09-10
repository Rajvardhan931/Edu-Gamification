import React from 'react';
import { useRouter } from 'next/navigation';

interface Node {
  id: string;
  name: string;
  description: string;
  user_status: 'locked' | 'unlocked' | 'completed';
  xp_reward: number;
  xp_type: 'knowledge' | 'capability';
}

export default function NodeModal({ node, onClose }: { node: Node; onClose: () => void }) {
  const router = useRouter();

  const handleEmbark = () => {
    router.push(`/quests/${node.id}`);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 border-4 border-amber-600 p-8 rounded-xl max-w-lg w-full shadow-2xl relative font-mono">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl"
        >
          ✕
        </button>

        <div className="text-center mb-6">
          <span className={`text-xs uppercase font-bold px-2 py-1 rounded ${
            node.xp_type === 'knowledge' ? 'bg-blue-900 text-blue-300' : 'bg-emerald-900 text-emerald-300'
          }`}>
            {node.xp_type} Quest
          </span>
          <h2 className="text-3xl font-bold text-white mt-2">{node.name}</h2>
        </div>

        <p className="text-slate-300 text-center italic mb-8">
          "{node.description}"
        </p>

        <div className="flex justify-between items-center bg-slate-900 p-4 rounded-lg border border-slate-700 mb-8">
          <div className="text-left">
            <p className="text-xs text-slate-500 uppercase font-bold">Reward</p>
            <p className="text-xl font-bold text-amber-400">{node.xp_reward} XP</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500 uppercase font-bold">Status</p>
            <p className={`text-sm font-bold uppercase ${
              node.user_status === 'completed' ? 'text-emerald-400' :
              node.user_status === 'unlocked' ? 'text-amber-400' : 'text-slate-500'
            }`}>
              {node.user_status}
            </p>
          </div>
        </div>

        <button
          disabled={node.user_status === 'completed' || node.user_status === 'locked'}
          onClick={handleEmbark}
          className={`w-full py-3 rounded font-bold uppercase tracking-widest transition-all ${
            node.user_status === 'completed'
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
              : 'bg-amber-600 hover:bg-amber-500 text-white border-b-4 border-amber-800 active:border-b-0 active:translate-y-1'
          }`}
        >
          {node.user_status === 'completed' ? 'Mastered' : 'Embark on Quest'}
        </button>
      </div>
    </div>
  );
}
