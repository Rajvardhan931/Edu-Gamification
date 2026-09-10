"use client";
import React, { useState } from 'react';
import { apiClient } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', username: '' });
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const endpoint = isLogin ? '/auth/login' : '/auth/signup';
    const response = await apiClient.post(endpoint, formData);

    if (response.error) {
      setError(response.error);
    } else {
      localStorage.setItem('sq_token', response.data?.token || '');
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4 font-mono">
      <div className="max-w-md w-full bg-slate-800 border-4 border-amber-600 p-8 rounded-lg shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-amber-500 uppercase tracking-widest mb-2">
            {isLogin ? 'Enter the Realm' : 'Create Your Legend'}
          </h1>
          <p className="text-slate-400 italic">
            {isLogin ? 'Verify your credentials to continue your journey' : 'Embark on your first quest by creating a profile'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-semibold text-amber-400 mb-1">Character Name</label>
              <input
                type="text"
                className="w-full bg-slate-700 border-2 border-slate-600 p-2 rounded focus:border-amber-500 outline-none transition-colors"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-amber-400 mb-1">Email Address</label>
            <input
              type="email"
              className="w-full bg-slate-700 border-2 border-slate-600 p-2 rounded focus:border-amber-500 outline-none transition-colors"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-amber-400 mb-1">Secret Password</label>
            <input
              type="password"
              className="w-full bg-slate-700 border-2 border-slate-600 p-2 rounded focus:border-amber-500 outline-none transition-colors"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          {error && (
            <div className="bg-red-900/50 border border-red-500 text-red-200 p-3 rounded text-sm italic">
              ⚠️ {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 rounded border-b-4 border-amber-800 active:border-b-0 active:translate-y-1 transition-all uppercase tracking-wider"
          >
            {isLogin ? 'Verify Identity' : 'Begin Journey'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-amber-400 hover:text-amber-300 text-sm underline underline-offset-4 transition-colors"
          >
            {isLogin ? "I am a new Adventurer" : "I already have a Pass"}
          </button>
        </div>
      </div>
    </div>
  );
}
