import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = ["Skill Map", "Quests", "About"];

export default function Navbar({
  view,
  setView,
}: {
  view: "home" | "login";
  setView: (v: "home" | "login") => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50">
      <div className="bg-[#1A2235]/60 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 flex items-center justify-between shadow-xl">
        
        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="#FFF"/>
            <circle cx="12" cy="12" r="3" fill="#D4AF37" className="animate-pulse" />
          </svg>
          <span className="font-display font-bold text-lg tracking-wide text-white uppercase">
            SkillQuest
          </span>
        </div>

        {/* Center: Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <span
              key={link}
              className="text-sm font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              {link}
            </span>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => setView("login")}
            className="text-sm font-medium text-zinc-300 hover:text-white transition-colors"
          >
            Login
          </button>
          <button
            onClick={() => setView("login")}
            className="bg-[#D4AF37] hover:bg-[#FCD34D] text-black text-sm font-bold rounded-full px-6 py-2 transition-colors shadow-[0_0_15px_rgba(212,175,55,0.3)]"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-zinc-300 focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0, y: -20 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ height: 0, opacity: 0, y: -20 }}
            className="md:hidden mt-4 bg-[#1A2235]/90 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl"
          >
            <div className="flex flex-col p-6 gap-4 text-center">
              {NAV_LINKS.map((link) => (
                <span key={link} className="text-sm font-medium text-zinc-300 hover:text-white cursor-pointer">
                  {link}
                </span>
              ))}
              <div className="w-full h-px bg-white/10 my-2" />
              <button
                onClick={() => {
                  setOpen(false);
                  setView("login");
                }}
                className="text-sm font-medium text-zinc-300 hover:text-white"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setOpen(false);
                  setView("login");
                }}
                className="bg-[#D4AF37] text-black text-sm font-bold rounded-full px-6 py-3 mt-2"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
