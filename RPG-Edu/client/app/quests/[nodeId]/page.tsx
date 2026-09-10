"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api';
import LevelUpModal from '@/components/LevelUpModal';

interface Quest {
  title: string;
  description: string;
  requirement_type: string;
  reward_xp: number;
}

export default function QuestPage() {
  const { nodeId } = useParams();
  const router = useRouter();
  const [quest, setQuest] = useState<Quest | null>(null);
  const [proof, setProof] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [rewardXp, setRewardXp] = useState(0);

  useEffect(() => {
    async function fetchQuest() {
      const response = await apiClient.get<Quest>(`/quests/delivery?node_id=${nodeId}`);
      if (response.error) {
        router.push('/map');
      } else {
        setQuest(response.data);
      }
      setLoading(false);
    }
    fetchQuest();
  }, [nodeId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const response = await apiClient.post('/quests/submit', {
      node_id: nodeId,
      proof: proof,
    });

    if (response.error) {
      alert(response.error);
      setSubmitting(false);
    } else {
      setRewardXp(response.data?.reward || 0);
      setShowLevelUp(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center font-mono">
        <div className="animate-pulse text-amber-500 text-xl italic">Reading the quest scroll...</div>
      </div>
    );
  }

  if (!quest) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center font-mono">
        <div className="text-center">
          <p className="text-red-400 mb-4">This quest has vanished from the realm.</p>
          <button onClick={() => router.push('/map')} className="text-amber-500 underline">Return to Map</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-mono">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => router.push('/map')}
          className="text-amber-400 hover:text-amber-300 mb-8 transition-colors flex items-center gap-2"
        >
          ← Back to Map
        </button>

        <div className="bg-slate-800 border-4 border-amber-600 p-8 rounded-xl shadow-2xl">
          <div className="text-center mb-8">
            <span className="text-xs uppercase font-bold px-2 py-1 rounded bg-amber-900 text-amber-300">Active Quest</span>
            <h1 className="text-3xl font-bold text-white mt-4">{quest.title}</h1>
          </div>

          <div className="bg-slate-900 p-6 rounded-lg border border-slate-700 mb-8 italic text-slate-300">
            {quest.description}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-700/50 p-3 rounded text-center">
              <p className="text-xs text-slate-400 uppercase font-bold">Requirement</p>
              <p className="text-white font-bold uppercase">{quest.requirement_type}</p>
            </div>
            <div className="bg-slate-700/50 p-3 rounded text-center">
              <p className="text-xs text-slate-400 uppercase font-bold">Reward</p>
              <p className="text-amber-400 font-bold">{quest.reward_xp} XP</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-amber-400 mb-2">Proof of Mastery (GitHub Link / Text)</label>
              <textarea
                className="w-full bg-slate-700 border-2 border-slate-600 p-3 rounded h-32 focus:border-amber-500 outline-none transition-colors"
                value={proof}
                onChange={(e) => setProof(e.target.value)}
                placeholder="Paste your link or evidence here..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded uppercase tracking-widest transition-all border-b-4 border-amber-800 active:border-b-0 active:translate-y-1 disabled:opacity-50"
            >
              {submitting ? 'Validating...' : 'Submit Proof'}
            </button>
          </form>
        </div>
      </div>

      {showLevelUp && (
        <LevelUpModal
          xpGained={rewardXp}
          onClose={() => {
            setShowLevelUp(false);
            router.push('/dashboard');
          }}
        />
      )}
    </div>
  );
}
