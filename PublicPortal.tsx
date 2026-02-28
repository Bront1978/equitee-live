import React from 'react';
import { Newspaper, ArrowUpRight, Lock, Globe, Zap, Menu, Search } from 'lucide-react';

const PublicPortal: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      {/* Responsive Navigation */}
      <nav className="border-b border-black/10 py-4 px-4 md:px-12 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <Newspaper className="w-5 h-5 md:w-6 md:h-6 text-[#00ff9d]" />
          <span className="text-lg md:text-2xl font-black tracking-tighter uppercase italic">EQUITY.IO</span>
        </div>
        <div className="flex items-center gap-3 md:gap-6">
          <Search className="w-5 h-5 text-zinc-400 cursor-pointer" />
          <Menu className="w-5 h-5 md:hidden" />
          <button className="hidden md:block px-4 py-2 bg-black text-white text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all">
            Terminal Login
          </button>
        </div>
      </nav>

      {/* Hero Section: Scaled for Mobile */}
      <header className="py-10 md:py-24 px-4 md:px-12 border-b border-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-4 md:mb-6">
            <span className="flex h-2 w-2 rounded-full bg-[#00ff9d] animate-pulse" />
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-zinc-500">Live_Intelligence_Stream</span>
          </div>
          
          {/* Headline scales from 4xl on phone to 8xl on desktop */}
          <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-[1.1] md:leading-[0.9] uppercase mb-6 md:mb-8">
            The Future of <br className="hidden md:block" /> 
            <span className="text-zinc-400">Sovereign Equity.</span>
          </h1>
          
          <p className="max-w-2xl text-base md:text-xl text-zinc-600 font-light leading-relaxed">
            Transforming raw financial data into the proprietary lead flows that others miss in the Southeast Asian private markets.
          </p>
        </div>
      </header>

      {/* Main Grid: 1 column on mobile, 12 columns on desktop */}
      <main className="max-w-7xl mx-auto px-4 md:px-12 py-10 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Intelligence Feed */}
          <div className="flex-1 space-y-12 md:space-y-16">
            <div className="border-b-2 border-black pb-2 mb-8">
              <span className="text-xs font-black uppercase tracking-widest">Priority_Triage</span>
            </div>
            
            {[1, 2].map((item) => (
              <article key={item} className="group cursor-pointer border-b border-zinc-100 pb-10 md:pb-12 last:border-0">
                <div className="flex items-center gap-3 mb-4 text-[9px] font-black uppercase tracking-widest text-zinc-400">
                  <span className="text-black italic">Macro_Report</span>
                  <span className="w-1 h-1 bg-zinc-300 rounded-full" />
                  <span>3 min read</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-4 group-hover:text-zinc-600 transition-colors leading-tight">
                  The Kedah Logistics Corridor: Analyzing the 2026 Sovereign Infrastructure Pivot.
                </h2>
                <div className="flex items-center gap-2 text-black font-black text-[10px] uppercase tracking-[0.2em] mt-6">
                  Access Intelligence <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </article>
            ))}
          </div>

          {/* Sidebar: Stays as sidebar on desktop, stacks on mobile */}
          <div className="w-full lg:w-[350px]">
            <div className="sticky top-28 space-y-6 md:space-y-8">
              
              {/* Market Velocity Widget */}
              <div className="p-6 md:p-8 bg-zinc-50 border border-black rounded-sm relative overflow-hidden group">
                <h3 className="text-[10px] font-black uppercase tracking-widest mb-6 pb-2 border-b border-black/10">Market Velocity</h3>
                <div className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <p className="text-4xl md:text-5xl font-black tabular-nums tracking-tighter">+14.2%</p>
                    <span className="text-[10px] font-mono text-[#00ff9d] bg-black px-1 uppercase">SEA_Index</span>
                  </div>
                  <p className="text-xs text-zinc-500 leading-tight">Current signal density spike detected in the KL corridor.</p>
                </div>
              </div>

              {/* Terminal Subscription */}
              <div className="p-6 md:p-8 bg-black text-white rounded-sm">
                <Lock className="w-5 h-5 mb-4 text-[#00ff9d]" />
                <h3 className="text-lg font-bold mb-2 uppercase tracking-tight">Terminal Subscription</h3>
                <p className="text-xs text-zinc-400 mb-6 font-light leading-relaxed">
                  Unlock the full Capital Table analysis and real-time Sovereign Wealth Flow monitoring.
                </p>
                <button className="w-full py-3 bg-[#00ff9d] text-black text-[10px] font-black uppercase tracking-[0.2em] hover:brightness-110 transition-all shadow-[0_0_15px_rgba(0,255,157,0.2)]">
                  Subscribe to Terminal
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-black py-10 px-4 md:px-12 bg-zinc-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-zinc-400" />
            <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">© 2026 Pixel Play Ventures • SEA_WEST_GATEWAY</span>
          </div>
          <div className="flex gap-4 text-[9px] font-black uppercase tracking-widest">
            <a href="#" className="hover:text-[#00ff9d]">Terms</a>
            <a href="#" className="hover:text-[#00ff9d]">Privacy</a>
            <a href="#" className="hover:text-[#00ff9d]">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicPortal;
