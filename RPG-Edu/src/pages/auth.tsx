import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Login from "@/components/Login";

export default function Auth() {
  const [view, setView] = useState<"home" | "login">("home");

  return (
    <div className="min-h-screen bg-bg-base selection:bg-brand-gold selection:text-black font-sans">
      <Navbar view={view} setView={setView} />
      <main>
        <AnimatePresence mode="wait">
          {view === "home" ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Hero setView={setView} />
            </motion.div>
          ) : (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <Login setView={setView} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
