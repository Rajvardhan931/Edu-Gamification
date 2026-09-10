import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Hero({ setView }: { setView: (v: "home" | "login") => void }) {
  const [bgIndex, setBgIndex] = useState(0);
  const images = ["/fantasy_robot_1.png", "/fantasy_robot_2.png"];

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[110vh] sm:min-h-[130vh] w-full flex flex-col items-center justify-start overflow-hidden bg-bg-base text-white">
      
      {/* Background Animated Images with Dark Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#0B1120]">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={bgIndex}
            src={images[bgIndex]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.6, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Fantasy background"
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1120]/90 via-[#0B1120]/60 to-[#0B1120] z-10" />
      </div>

      <div className="max-w-4xl w-full mx-auto px-6 relative z-10 text-center pt-52 sm:pt-64 flex flex-col items-center">
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight mb-8 drop-shadow-2xl font-bold uppercase tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400"
          style={{ textShadow: "0px 4px 20px rgba(255,255,255,0.1)" }}
        >
          EVERY SKILL BEGINS AS A <br/> SPARK.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed mb-12 font-sans font-medium"
        >
          SkillQuest tracks what you know and what you can do as two separate bars, so you level up your understanding and your practice side by side.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <button
            onClick={() => setView("login")}
            className="flex items-center gap-2 bg-[#FCD34D] hover:bg-[#FBE18D] text-black text-sm md:text-base font-bold rounded-full px-8 py-3.5 transition-all shadow-[0_0_20px_rgba(252,211,77,0.4)] hover:scale-105"
          >
            Get Started
            <span className="bg-black/20 rounded-full p-1">
              <ArrowRight size={16} strokeWidth={3} />
            </span>
          </button>
          
          <button
            onClick={() => setView("login")}
            className="text-sm md:text-base text-zinc-300 hover:text-white font-medium rounded-full px-8 py-3.5 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all"
          >
            I already have a legend
          </button>
        </motion.div>

        {/* Quotes Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-32 w-full max-w-3xl text-left border-t border-white/10 pt-10 space-y-10"
        >
          <div>
            <p className="text-zinc-300 font-serif text-lg italic mb-3">
              "I used to think finishing the reading meant I knew the skill. My knowledge bar disagreed."
            </p>
            <p className="text-xs text-zinc-500 font-sans tracking-wide uppercase">
              Mira Chen <span className="mx-1">•</span> Adventurer, Level 14
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
