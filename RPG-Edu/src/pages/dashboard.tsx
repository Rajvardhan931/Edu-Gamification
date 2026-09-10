import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@/pages/_app';
import { getUserStats } from '@/lib/api';
import { motion } from 'framer-motion';
import { Sword, BookOpen, Map } from 'lucide-react';

export default function Dashboard() {
  const { token, user, setUser, setToken } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/auth');
      return;
    }
    
    // Fetch latest stats
    const fetchStats = async () => {
      try {
        const stats = await getUserStats(token);
        setUser(stats);

        // Redirect to career selection if no career is assigned
        if (!stats.career_id) {
          router.push('/career-selection');
        }
      } catch (err) {
        console.error(err);
        setToken(null);
        router.push('/auth');
      }
    };
    fetchStats();
  }, [token]);

  if (!user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const knowledgeLevel = Math.floor(user.knowledge_xp / 100) + 1;
  const knowledgeProgress = user.knowledge_xp % 100;

  const capabilityLevel = Math.floor(user.capability_xp / 100) + 1;
  const capabilityProgress = user.capability_xp % 100;

  return (
    <div className="min-h-screen bg-gray-900 p-8 pt-20">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-end"
        >
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">The Adventurer's Hub</h1>
            <p className="text-amber-500 font-medium">Level {user.level || 1} • {user.class || 'Novice'}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/map')}
            className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold shadow-lg shadow-indigo-500/30 transition-colors"
          >
            <Map size={20} />
            <span>Open Skill Map</span>
          </motion.button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Knowledge Track */}
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <BookOpen size={120} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Knowing Track</h2>
                  <p className="text-gray-400 text-sm">Theoretical knowledge</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-blue-300">Level {knowledgeLevel}</span>
                  <span className="text-gray-400">{knowledgeProgress} / 100 XP</span>
                </div>
                <div className="w-full h-4 bg-gray-900 rounded-full overflow-hidden border border-gray-700">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${knowledgeProgress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 shadow-[0_0_10px_rgba(56,189,248,0.5)]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Capability Track */}
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Sword size={120} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-red-500/20 rounded-xl text-red-400">
                  <Sword size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Doing Track</h2>
                  <p className="text-gray-400 text-sm">Practical execution</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-red-300">Level {capabilityLevel}</span>
                  <span className="text-gray-400">{capabilityProgress} / 100 XP</span>
                </div>
                <div className="w-full h-4 bg-gray-900 rounded-full overflow-hidden border border-gray-700">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${capabilityProgress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-red-600 to-orange-400 shadow-[0_0_10px_rgba(248,113,113,0.5)]"
                  />
                </div>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
}
