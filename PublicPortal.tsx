import React from 'react';
import { Newspaper, ArrowUpRight, Lock, Globe, Zap, Menu, Search, Activity, ShieldCheck, BarChart3, ChevronRight } from 'lucide-react';

const PublicPortal: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#fcfcfc] text-black font-sans selection:bg-[#ccff00] selection:text-black">
      {/* Dynamic Ticker Bar */}
      <div className="bg-black text-[9px] text-zinc-500 py-2 px-4 md:px-12 flex justify-between items-center uppercase tracking-[0.3em] border-b border-zinc-900 overflow-hidden">
        <div className="flex gap-6 animate-pulse">
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#ccff00] rounded-full" /> ORCHESTRATOR_LIVE</span>
          <span className="hidden md:inline text-zinc-700">|</span>
          <span className="hidden md:inline">SGX: +0.24%</span>
          <span className="hidden md:inline text-zinc-700">|</span>
          <span className="hidden md:inline">KLSE: +0.12%</span>
        </div>
        <div className="flex gap-4">
          <span className="text-[#ccff00]">SGT {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>
      </div>

      {/* Modern Navigation */}
      <nav className="border-b border-black/5 py-5 px-4 md:px-12 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-xl z-50">
        <div className="flex items-center gap-3">
          <div className="bg-black p-1.5 rounded-sm">
            <Newspaper className="w-5 h-5 text-[#ccff00]" />
          </div>
          <span className="text-xl md:text-2xl font-black tracking-tighter uppercase italic leading-none">EQUITY.IO</span>
        </div>
        <div className="flex items-center gap-4 md:gap-10">
          <div className="hidden lg:flex gap-8 text-[10px] font-black uppercase tracking-widest text-zinc-400">
            <a href="#" className="hover:text-black transition-colors">Intelligence</a>
            <a href="#" className="hover:text-black transition-colors">Markets</a>
            <a href="#" className="hover:text-black transition-colors">Sovereign</a>
          </div>
          <button className="px-5 py-2.5 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#ccff00] hover:text-black transition-all rounded-full flex items-center gap-2">
            Terminal Login
          </button>
        </div>
      </nav>

      {/* Balanced Hero Section */}
      <header className="pt-12 pb-10 md:pt-20 md:pb-16 px-4 md:px-12 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-2 py-1 bg-[#ccff00]/10 text-black text-[9px] font-black uppercase tracking-[0.2em] mb-6 rounded-sm border border-[#ccff00]/20">
            <Zap className="w-3 h-3 fill-[#ccff00]" /> High_Velocity_Stream
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[1] uppercase mb-6 max-w-4xl">
            The Future of <span className="text-zinc-300">Sovereign Equity.</span>
          </h1>
          <p className="max-w-2xl text-base md:text-lg text-zinc-500 font-light leading-relaxed">
            Transforming raw financial data into strategic alpha. We track the flows that others miss in the Southeast Asian private markets.
          </p>
        </div>
      </header>

      {/* Main Analysis Grid */}
      <main className="max-w-7xl mx-auto px-4 md:px-12 py-10 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Primary Stream */}
          <div className="lg:col-span-8 space-y-16">
            <div className="flex items-center gap-4 border-b border-zinc-100 pb-4 mb-8">
              <span className="text-[10px] font-black uppercase tracking-widest bg-black text-white px-2 py-0.5">Top_Triage</span>
              <div className="flex-1 h-px bg-zinc-100" />
            </div>

            {[
              { 
                tag: 'SOVEREIGN HEALTH', 
                date: '27 FEB 2026', 
                title: 'The KL Corridor: Why Malaysian Tech is Decoupling from Global Trends',
                img: 'https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?auto=format&fit=crop&q=80&w=800'
              },
              { 
                tag: 'EXIT WATCH', 
                date: '26 FEB 2026', 
                title: 'The B2B AI Pivot: Strategic Consolidation in Jakarta',
                img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
              }
            ].map((post, i) => (
              <article key={i} className="group cursor-pointer">
                <div className="aspect-[21/9] bg-zinc-100 mb-8 overflow-hidden rounded-lg border border-zinc-200">
                  <img src={post.img} alt="cover" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                </div>
                <div className="flex items-center gap-3 mb-4 text-[9px] font-black uppercase tracking-widest">
                  <span className="text-[#00c073]">{post.tag}</span>
                  <span className="text-zinc-300">•</span>
                  <span className="text-zinc-400">{post.date}</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight group-hover:underline decoration-[#ccff00] decoration-4 underline-offset-8">
                  {post.title}
                </h3>
                <p className="text-zinc-500 text-sm md:text-base font-light leading-relaxed mb-8 max-w-3xl">
                  A deep dive into the sovereign-backed liquidity surge reshaping the Southeast Asian private equity landscape. We track the flows that others miss in the regional corridor.
                </p>
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                  Read Analysis <ArrowUpRight className="w-4 h-4 text-[#ccff00]" />
                </button>
              </article>
            ))}
          </div>

          {/* Precision Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-28 space-y-8">
              
              {/* Velocity Widget */}
              <div className="p-8 bg-white border border-zinc-100 rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Market Velocity</h4>
                  <Activity className="w-4 h-4 text-[#ccff00]" />
                </div>
                <div className="space-y-1">
                  <p className="text-5xl font-black tabular-nums tracking-tighter">+14.2%</p>
                  <p className="text-[9px] font-mono text-zinc-400 uppercase">SEA_TECH_INDEX // 2400</p>
                </div>
                <button className="w-full mt-8 py-3 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#ccff00] hover:text-black transition-all">
                  Subscribe to Terminal
                </button>
              </div>

              {/* Intelligence List */}
              <div className="space-y-6">
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] border-b border-black pb-2">Market Pulse</h4>
                {[
                  { id: '3D', time: '22 min ago', label: 'Secondary Liquidity Surge' },
                  { id: 'NV', time: '1h ago', label: 'MD-Status Alignment Guidelines' },
                  { id: 'YX', time: '2h ago', label: 'Vertical AI Infrastructure Boom' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group cursor-pointer">
                    <span className="text-[9px] font-black text-[#00c073]">{item.id}</span>
                    <div className="flex-1">
                      <p className="text-xs font-bold leading-tight group-hover:text-[#00c073] transition-colors">{item.label}</p>
                      <p className="text-[9px] uppercase text-zinc-400 mt-1 font-mono tracking-tighter">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Lead Magnet */}
              <div className="p-8 bg-zinc-950 text-white rounded-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ccff00]/10 rounded-full blur-3xl" />
                <h4 className="text-[10px] font-black uppercase tracking-widest mb-4 opacity-50">Sovereign Intel</h4>
                <p className="text-sm font-medium mb-6 relative z-10 leading-snug">Get daily dispatches on dry powder movements and board-level shifts across APAC.</p>
                <button className="w-full py-3 bg-[#ccff00] text-black text-[9px] font-black uppercase tracking-widest hover:scale-105 transition-all">
                  Join The Network
                </button>
              </div>

            </div>
          </aside>
        </div>
      </main>

      {/* Modern Compact Footer */}
      <footer className="border-t border-zinc-100 py-12 px-4 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
             <div className="bg-black p-1 rounded-sm">
              <Globe className="w-3 h-3 text-[#ccff00]" />
            </div>
            <span className="text-[10px] font-black tracking-widest uppercase">Equitee Intelligence Network</span>
          </div>
          <div className="flex gap-8 text-[9px] font-black uppercase tracking-widest text-zinc-400">
            <a href="#" className="hover:text-black">Terms</a>
            <a href="#" className="hover:text-black">Privacy</a>
            <a href="#" className="hover:text-black">KL_Terminal</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicPortal;
