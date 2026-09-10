"use client";
import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';
import ProfileCard from '@/components/ProfileCard';
import { useRouter } from 'next/navigation';

interface UserStats {
  username: string;
  class: string;
  stats: {
    knowledge: { level: number; xp: number };
    capability: { level: number; xp: number };
    total_xp: number;
  };
}

export default function Dashboard() {
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchStats() {
      const response = await apiClient.get<UserStats>('/user/stats');
      if (response.error) {
        if (response.status === 401) {
          router.push('/auth');
        }
      } else {
        setStats(response.data);
      }
      setLoading(false);
    }
    fetchStats();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center font-mono">
        <div className="animate-pulse text-amber-500 text-xl italic">Consulting the archives...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center font-mono">
        <div className="text-center">
          <p className="text-red-400 mb-4">Your identity could not be verified.</p>
          <button
            onClick={() => router.push('/auth')}
            className="bg-amber-600 px-4 py-2 rounded text-white"
          >
            Return to Gateway
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-mono">
      <header className="max-w-6xl mx-auto flex justify-between items-center mb-12">
        <div>
          <h1 className="text-3xl font-bold text-amber-500 uppercase tracking-tighter">Adventurer's Hub</h1>
          <p className="text-slate-400 italic">Welcome back to the SkillQuest realm.</p>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem('sq_token');
            router.push('/auth');
          }}
          className="text-slate-400 hover:text-white text-sm underline transition-colors"
        >
          Leave Realm (Logout)
        </button>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <ProfileCard data={stats} />
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="bg-slate-800 border-2 border-slate-700 p-6 rounded-xl">
            <h2 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">Current Objective</h2>
            <div className="bg-slate-900 p-4 rounded border-l-4 border-amber-500">
              <p className="text-slate-300 italic">
                Your journey has just begun. Explore the Skill Tree to find your first quest.
              </p>
            </div>
            <button
              className="mt-6 bg-amber-600 hover:bg-amber-500 text-white font-bold py-2 px-6 rounded uppercase tracking-wider transition-colors"
              onClick={() => router.push('/map')}
            >
              Open Skill Map
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <h3 className="text-amber-400 font-bold text-sm uppercase mb-2">Knowledge Track</h3>
              <p className="text-xs text-slate-400">Expand your theoretical understanding to unlock deeper mysteries.</p>
            </div>
            <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
              <h3 className="text-emerald-400 font-bold text-sm uppercase mb-2">Capability Track</h3>
              <p className="text-xs text-slate-400">Apply your knowledge through projects to prove your mastery.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
