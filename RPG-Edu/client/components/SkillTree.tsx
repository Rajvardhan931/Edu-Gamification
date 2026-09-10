"use client";
import React, { useState } from 'react';
import NodeModal from './NodeModal';

interface Node {
  id: string;
  name: string;
  description: string;
  user_status: 'locked' | 'unlocked' | 'completed';
  xp_reward: number;
  xp_type: 'knowledge' | 'capability';
  prerequisite_id: string | null;
}

export default function SkillTree({ nodes }: { nodes: Node[] }) {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  return (
    <div className="relative p-8 overflow-x-auto min-h-[600px] flex flex-col items-center gap-12 font-mono">
      {nodes.map((node, index) => {
        const isRoot = !node.prerequisite_id;
        const isCompleted = node.user_status === 'completed';
        const isUnlocked = node.user_status === 'unlocked';

        return (
          <div key={node.id} className="flex flex-col items-center relative">
            {/* Connection Line to next node */}
            {index < nodes.length - 1 && (
              <div className={`absolute top-16 left-1/2 -translate-x-1/2 w-1 h-12 ${
                isCompleted ? 'bg-amber-500' : 'bg-slate-700'
              }`} />
            )}

            {/* The Node */}
            <button
              onClick={() => setSelectedNode(node)}
              className={`
                relative w-32 h-32 rounded-full flex items-center justify-center text-center p-4 transition-all duration-300
                border-4 shadow-xl
                ${isCompleted
                  ? 'bg-amber-600 border-amber-400 text-white scale-110'
                  : isUnlocked
                    ? 'bg-slate-800 border-amber-600 text-amber-400 hover:scale-105 cursor-pointer'
                    : 'bg-slate-900 border-slate-700 text-slate-600 cursor-not-allowed'}
              `}
            >
              <span className="text-xs font-bold uppercase leading-tight">{node.name}</span>

              {/* Badge for XP type */}
              <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold ${
                node.xp_type === 'knowledge' ? 'bg-blue-500 text-white' : 'bg-emerald-500 text-white'
              }`}>
                {node.xp_type[0].toUpperCase()}
              </div>
            </button>
          </div>
        );
      })}

      {selectedNode && (
        <NodeModal
          node={selectedNode}
          onClose={() => setSelectedNode(null)}
        />
      )}
    </div>
  );
}
