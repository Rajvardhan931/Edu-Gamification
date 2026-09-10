import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function MentalityHero() {
  return (
    <section className="relative min-h-[110vh] sm:min-h-[140vh] w-full flex flex-col items-center justify-start overflow-hidden bg-bg-base pt-32 sm:pt-40">
      
      {/* Background Video Container */}
      <div className="absolute top-[15vh] sm:top-[20vh] left-0 w-full h-[95vh] sm:h-[120vh] z-0 pointer-events-none">
        {/* Gradient Mask */}
        <div className="absolute top-0 left-0 w-full h-24 sm:h-32 bg-gradient-to-b from-bg-base to-transparent z-10"></div>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover opacity-100 relative z-0"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260603_132049_036591b8-6e92-4760-b94c-a7ea6eef315c.mp4"
        />
      </div>

      {/* Hero Content */}
      <div className="max-w-7xl w-full mx-auto px-8 md:px-16 lg:px-20 relative z-10 grid grid-cols-12 gap-x-4 md:gap-x-8">
        <div className="col-span-12 md:col-span-10 md:col-start-2">
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-7xl font-sans tracking-tight leading-[1.1] mb-10 font-medium"
          >
            <span className="text-[#1a1a1a]">Remix: Mentality offers </span>
            <span className="text-[#8e8e8e]">information</span><br />
            <span className="text-[#8e8e8e]">and resources to help you manage</span><br />
            <span className="text-[#8e8e8e]">your </span>
            
            {/* Eye Icon Pupil UI Element */}
            <span className="w-[32px] md:w-[50px] lg:w-[66px] h-[32px] md:h-[50px] lg:h-[66px] border-[2.5px] border-[#1a1a1a] rounded-full inline-flex items-center justify-center align-middle mx-1 md:mx-2 -translate-y-1">
              <span className="w-2.5 h-2.5 md:w-3 md:h-3 lg:w-4 lg:h-4 bg-[#1a1a1a] rounded-full"></span>
            </span>
            
            <span className="text-[#8e8e8e]"> mental wellbeing.</span>
          </motion.h1>

          {/* Search Pill Component */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.15 }}
            className="max-w-md"
          >
            <div className="bg-white rounded-[8px] border border-black/[0.05] p-1 pl-4 flex items-center shadow-sm">
              <input 
                type="text" 
                placeholder="Ask me anything..." 
                className="flex-grow bg-transparent border-none focus:outline-none text-zinc-900 placeholder-zinc-400 text-sm md:text-base font-sans"
              />
              <button className="bg-[#1a1a1a] text-white w-9 h-9 rounded-[6px] flex items-center justify-center flex-shrink-0 hover:bg-black/80 transition-colors">
                <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Architectural Edge Anchors */}
      <div className="absolute right-4 md:right-8 top-[50vh] -translate-y-1/2 z-20">
        <button className="bg-white/30 backdrop-blur-md border border-white/40 text-xs font-medium text-[#1a1a1a] rounded-full px-4 py-2 hover:bg-white/40 transition-colors shadow-sm">
          pl — en
        </button>
      </div>
      
      <div className="absolute left-4 md:left-8 bottom-4 md:bottom-8 z-20">
        <span className="text-xs font-medium text-[#1a1a1a]/50">2024</span>
      </div>
      
      <div className="absolute right-4 md:right-8 bottom-4 md:bottom-8 z-20">
        <span className="text-xs font-medium text-[#1a1a1a]/50 lowercase">mental health tools</span>
      </div>

    </section>
  );
}
