import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle, Sparkles } from 'lucide-react';
import { AuthContext } from '@/pages/_app';
import { submitQuest } from '@/lib/api';
import confetti from 'canvas-confetti';

export default function QuestTrial() {
  const router = useRouter();
  const { nodeId } = router.query;
  const { token, user, setUser } = useContext(AuthContext);
  const [proof, setProof] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [xpGained, setXpGained] = useState(0);

  useEffect(() => {
    if (user === null) router.push('/auth');
  }, [user]);

  if (!user || !nodeId) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    
    setIsSubmitting(true);
    try {
      const res = await submitQuest(token, nodeId as string, proof);
      
      // Update local user state
      setUser({
        ...user,
        [res.track]: res.new_total
      });
      
      setXpGained(res.xp_gained);
      setShowLevelUp(true);
      
      // Trigger confetti
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#f97316', '#3b82f6']
      });
      
    } catch (err) {
      console.error(err);
      alert('Failed to submit proof');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 flex flex-col relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
      
      <div className="max-w-3xl mx-auto w-full relative z-10 flex-grow flex flex-col">
        <button 
          onClick={() => router.push('/map')}
          className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors mb-12 self-start"
        >
          <ArrowLeft size={20} />
          <span>Flee from Trial</span>
        </button>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-800 rounded-3xl p-10 border border-gray-700 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <CheckCircle size={150} />
          </div>

          <h1 className="text-3xl font-bold text-white mb-2 capitalize">
            {String(nodeId).replace('-', ' ')} Trial
          </h1>
          <p className="text-gray-400 mb-8">
            To unlock this skill, you must prove your knowledge. Enter your evidence below.
          </p>

          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Proof of Knowledge</label>
              <textarea 
                value={proof}
                onChange={e => setProof(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 rounded-xl bg-gray-900/50 border border-gray-600 text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all font-mono text-sm"
                placeholder="e.g., Completed the LLM basics module and successfully explained attention mechanisms..."
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isSubmitting || !proof.trim()}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2 text-lg"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Evaluating...</span>
              ) : (
                <>
                  <Sparkles size={20} />
                  <span>Submit Proof</span>
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>

      {/* Level Up Modal */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 50, rotate: -5 }}
              animate={{ scale: 1, y: 0, rotate: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="bg-gradient-to-b from-amber-500 to-orange-600 p-1 rounded-2xl max-w-sm w-full shadow-[0_0_50px_rgba(245,158,11,0.6)]"
            >
              <div className="bg-gray-900 rounded-xl p-8 text-center h-full">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 bg-amber-500/20 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(245,158,11,0.5)]"
                >
                  <Sparkles size={40} />
                </motion.div>
                
                <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 mb-2">
                  Level Up!
                </h2>
                <p className="text-gray-300 mb-8">
                  You gained <span className="font-bold text-amber-400">+{xpGained} XP</span> in the Knowing track!
                </p>
                
                <button 
                  onClick={() => router.push('/dashboard')}
                  className="w-full py-3 rounded-lg bg-white text-orange-600 font-bold hover:bg-gray-100 transition-colors shadow-xl"
                >
                  Continue Journey
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
