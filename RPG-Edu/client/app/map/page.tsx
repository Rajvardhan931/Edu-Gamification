"use client";
import React, { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';
import SkillTree from '@/components/SkillTree';
import { useRouter } from 'next/navigation';

interface Node {
  id: string;
  name: string;
  description: string;
  user_status: 'locked' | 'unlocked' | 'completed';
  xp_reward: number;
  xp_type: 'knowledge' | 'capability';
  prerequisite_id: string | null;
}

interface TreeResponse {
  tree: Node[];
  message: string;
}

export default function MapPage() {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchTree() {
      const response = await apiClient.get<TreeResponse>('/skills/tree');
      if (response.error) {
        if (response.status === 401) {
          router.push('/auth');
        }
      } else {
        setNodes(response.data?.tree || []);
      }
      setLoading(false);
    }
    fetchTree();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center font-mono">
        <div className="animate-pulse text-amber-500 text-xl italic">Unrolling the parchment...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-mono">
      <header className="p-8 flex items-center gap-6">
        <button
          onClick={() => router.push('/dashboard')}
          className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-2"
        >
          ← Return to Hub
        </button>
        <h1 className="text-3xl font-bold text-amber-500 uppercase tracking-tighter">World Map</h1>
      </header>

      <main className="max-w-4xl mx-auto bg-slate-800/30 rounded-3xl border border-slate-700 my-8 shadow-inner">
        <SkillTree nodes={nodes} />
      </main>
    </div>
  );
}
