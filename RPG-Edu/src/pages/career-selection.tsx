import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "@/pages/_app";
import { selectCareer, listCareers } from "@/lib/api";
import Navbar from "@/components/Navbar";
import { Rocket, Database, Shield, Palette } from "lucide-react";

const CAREER_CONFIG = {
  "software-eng": {
    title: "Software Engineer",
    description: "The Architect of Digital Worlds. Master the logic, structures, and systems that power the modern age.",
    icon: <Rocket className="w-8 h-8" />,
    color: "from-blue-500 to-indigo-600",
    accent: "text-blue-400",
  },
  "data-science": {
    title: "Data Scientist",
    description: "The Oracle of Information. Uncover hidden patterns and predict the future using AI and Machine Learning.",
    icon: <Database className="w-8 h-8" />,
    color: "from-emerald-500 to-teal-600",
    accent: "text-emerald-400",
  },
  "cybersecurity": {
    title: "Cybersecurity Engineer",
    description: "The Sentinel of the Grid. Protect the realms from digital threats and master the art of defense.",
    icon: <Shield className="w-8 h-8" />,
    color: "from-red-500 to-rose-600",
    accent: "text-red-400",
  },
  "uiux-design": {
    title: "UI/UX Designer",
    description: "The Weaver of Experiences. Bridge the gap between humans and machines through beauty and utility.",
    icon: <Palette className="w-8 h-8" />,
    color: "from-purple-500 to-pink-600",
    accent: "text-purple-400",
  },
};

export default function CareerSelection() {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    if (!selected) return;
    setLoading(true);
    try {
      // Pass the token from AuthContext to the API call
      const token = user?.token || "";
      await selectCareer(token, selected);
      router.push("/dashboard");
    } catch (err: any) {
      alert("Failed to select career: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    router.push("/auth");
    return null;
  }

  return (
    <div className="min-h-screen bg-bg-base text-zinc-300 font-sans selection:bg-brand-gold selection:text-black">
      <Navbar view="home" setView={() => {}} />

      <main className="relative pt-32 pb-16 px-6 overflow-hidden">
        {/* Background Ambience */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-display font-bold text-white mb-4"
            >
              Choose Your <span className="text-brand-gold">Path</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-zinc-400 text-lg max-w-2xl mx-auto"
            >
              Your career defines your journey through the World Tree. Each path offers unique skills, challenges, and rewards.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(CAREER_CONFIG).map(([id, config]) => (
              <motion.div
                key={id}
                whileHover={{ y: -10 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelected(id)}
                className={`
                  cursor-pointer relative p-6 rounded-3xl border-2 transition-all duration-300 group
                  ${selected === id
                    ? 'border-brand-gold bg-white/10 shadow-[0_0_30px_rgba(212,175,55,0.3)]'
                    : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-600'}
                `}
              >
                <div className={`
                  w-16 h-16 rounded-2xl mb-6 flex items-center justify-center text-white
                  bg-gradient-to-br ${config.color} shadow-lg group-hover:scale-110 transition-transform
                `}>
                  {config.icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{config.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  {config.description}
                </p>

                <div className={`
                  absolute bottom-6 right-6 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
                  ${selected === id ? 'border-brand-gold bg-brand-gold' : 'border-zinc-600'}
                `}>
                  {selected === id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-white rounded-full"
                    />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: selected ? 1 : 0.5 }}
              disabled={!selected || loading}
              onClick={handleConfirm}
              className={`
                px-12 py-4 rounded-full font-bold text-lg transition-all
                ${selected
                  ? 'bg-brand-gold text-black hover:bg-yellow-500 shadow-lg shadow-brand-gold/30'
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'}
              `}
            >
              {loading ? "Binding Soul to Path..." : "Confirm Career Path →"}
            </motion.button>
          </div>
        </div>
      </main>
    </div>
  );
}
