import React from 'react';
import { Newspaper, ArrowUpRight, Lock, Globe, Zap } from 'lucide-react';

const PublicPortal: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white">
      {/* Top Navigation */}
      <nav className="border-b border-black/10 py-4 px-4 md:px-12 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <Newspaper className="w-5 h-5 md:w-6 md:h-6" />
          <span className="text-lg md:text-2xl font-black tracking-tighter uppercase italic">EQUITY.IO</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:block text-[10px] font-bold uppercase tracking-widest text-zinc-400">Regional Node: SEA_WEST</span>
          <button className="px-4 py-2 bg-black text-white text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-colors">
            Subscribe
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-12 md:py-24 px-4 md:px-12 border-b border-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <span className="px-2 py-1 bg-black text-white text-[9px] font-bold uppercase tracking-tighter">Live Intelligence</span>
            <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">Update: {new Date().toLocaleTimeString()} SGT</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase mb-8">
            The Southeast <br className="hidden md:block" /> Asia <span className="text-zinc-400">Lead Thesis.</span>
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-zinc-600 font-light leading-relaxed">
            Proprietary capital flow analysis and sovereign wealth triage for the APAC private markets. 
            Curated by the <span className="text-black font-medium underline decoration-1 underline-offset-4">Equitee Editorial Orchestrator</span>.
          </p>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-4 md:px-12 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* Left Column: Intelligence Feed */}
          <div className="lg:col-span-8 space-y-16">
            {[1, 2, 3].map((item) => (
              <article key={item} className="group cursor-pointer border-b border-zinc-100 pb-12 last:border-0">
                <div className="flex items-center gap-4 mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
                  <span>Sovereign Wealth</span>
                  <span className="w-1 h-1 bg-zinc-300 rounded-full" />
                  <span>5 min read</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 group-hover:text-zinc-600 transition-colors leading-tight">
                  The "Kedah" Logistics Corridor: Analyzing the 2026 Sovereign Infrastructure Pivot.
                </h2>
                <p className="text-zinc-500 leading-relaxed mb-6 line-clamp-3 md:line-clamp-none">
                  Recent filings suggest a significant redirection of vertical infrastructure capital toward northern corridor logistics hubs. Our model indicates a 14% delta in projected yield compared to Q4 benchmarks...
                </p>
                <div className="flex items-center gap-2 text-black font-black text-xs uppercase tracking-widest">
                  Read Full Thesis <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </article>
            ))}
          </div>

          {/* Right Column: Market Pulse (Stacks below on mobile) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-8">
              
              {/* Pulse Widget */}
              <div className="p-8 bg-zinc-50 border border-black rounded-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2">
                  <Zap className="w-4 h-4 text-black animate-pulse" />
                </div>
                <h3 className="text-xs font-black uppercase tracking-widest mb-6 pb-2 border-b border-black/10">Market Pulse</h3>
                <div className="space-y-6">
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase mb-1">Regional Signal Velocity</p>
                    <p className="text-4xl font-black tabular-nums tracking-tighter">+14.2%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase mb-1">Fiscal Load Factor</p>
                    <div className="w-full bg-zinc-200 h-1 mt-2">
                      <div className="bg-black h-full w-[65%]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Locked Content Widget */}
              <div className="p-8 bg-black text-white rounded-sm">
                <Lock className="w-6 h-6 mb-4" />
                <h3 className="text-lg font-bold mb-2">Terminal Access Only</h3>
                <p className="text-sm text-zinc-400 mb-6 font-light">
                  Deep-dive cap table analysis and real-time sovereign signal alerts are restricted to Terminal subscribers.
                </p>
                <button className="w-full py-3 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-zinc-200 transition-colors">
                  Unlock Level_10
                </button>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-black mt-20 py-12 px-4 md:px-12 bg-zinc-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-black uppercase tracking-widest">Equitee Intelligence Network</span>
            </div>
            <p className="text-[10px] text-zinc-500 uppercase tracking-tighter">© 2026 Pixel Play Ventures. All Rights Reserved. Private & Confidential.</p>
          </div>
          <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest">
            <a href="#" className="hover:underline">Legal</a>
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicPortal;
