import React from 'react';
import { Newspaper, ArrowUpRight, Lock, Globe, Zap, Menu, Search, Activity, ShieldCheck, BarChart3, ChevronRight } from 'lucide-react';

const PublicPortal: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#00ff9d] selection:text-black">
      {/* Top Utility Bar */}
      <div className="bg-black text-[9px] text-zinc-500 py-1.5 px-4 md:px-12 flex justify-between items-center uppercase tracking-[0.3em] border-b border-zinc-900">
        <div className="flex gap-4">
          <span className="flex items-center gap-1"><span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" /> System_Online</span>
          <span className="hidden md:inline">Node: KL_WEST_01</span>
        </div>
        <div className="flex gap-4">
          <span>{new Date().toLocaleDateString()}</span>
          <span className="hidden md:inline">Equitee_Orchestrator_v2.4</span>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="border-b border-black py-6 px-4 md:px-12 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-xl z-50">
        <div className="flex items-center gap-3">
          <div className="bg-black p-1.5">
            <Newspaper className="w-5 h-5 text-[#00ff9d]" />
          </div>
          <span className="text-xl md:text-3xl font-black tracking-tighter uppercase italic leading-none">EQUITY.IO</span>
        </div>
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden lg:flex gap-6 text-[10px] font-black uppercase tracking-widest">
            <a href="#" className="hover:underline underline-offset-4">Analysis</a>
            <a href="#" className="hover:underline underline-offset-4">Sovereign_Flow</a>
            <a href="#" className="hover:underline underline-offset-4">Triage</a>
          </div>
          <button className="px-5 py-2.5 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#00ff9d] hover:text-black transition-all flex items-center gap-2">
            <Lock className="w-3 h-3" /> Terminal_Login
          </button>
        </div>
      </nav>

      {/* Hero: The "Lead Thesis" Section */}
      <header className="pt-16 pb-12 md:pt-24 md:pb-20 px-4 md:px-12 bg-zinc-50 border-b border-black overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-zinc-100/50 -skew-x-12 translate-x-1/2" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-2 py-1 bg-black text-[#00ff9d] text-[9px] font-black uppercase tracking-[0.2em] mb-8">
            <Activity className="w-3 h-3" /> Alpha_Signal_Detected
          </div>
          <h1 className="text-5xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase mb-10 max-w-5xl">
            Sovereign <br /> 
            <span className="text-zinc-300 italic">Intelligence</span> <br /> 
            Orchestrated.
          </h1>
          <p className="max-w-xl text-lg md:text-2xl text-zinc-600 font-light leading-snug">
            Bridging the gap between raw regional data and actionable institutional-grade lead flow across the SEA corridor.
          </p>
        </div>
      </header>

      {/* Primary Content Grid */}
      <main className="max-w-7xl mx-auto px-4 md:px-12 py-12 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Intelligence Stream (8 Columns) */}
          <div className="lg:col-span-8 space-y-20">
            <section>
              <div className="flex justify-between items-end border-b-4 border-black pb-4 mb-10">
                <h2 className="text-sm font-black uppercase tracking-[0.4em]">Triage_Priority_01</h2>
                <span className="text-[10px] font-mono text-zinc-400">Sorted_by: Velocity</span>
              </div>
              
              <article className="group cursor-pointer">
                <div className="flex items-center gap-3 mb-6">
                  <span className="bg-[#00ff9d] text-black text-[9px] font-black px-1.5 py-0.5 uppercase">Featured</span>
                  <span className="text-[10px] font-mono text-zinc-400">Ref: SWF-2026-KL</span>
                </div>
                <h3 className="text-3xl md:text-6xl font-bold tracking-tight mb-6 group-hover:text-zinc-500 transition-colors leading-none">
                  The "Kedah" Infrastructure Pivot: Sovereign Redirection Analysis.
                </h3>
                <p className="text-zinc-600 text-lg md:text-xl font-light leading-relaxed mb-8 max-w-3xl">
                  New intelligence suggests a 12.4% delta in capital allocation toward northern-tier logistics hubs, signaling a major structural shift in regional trade nodes...
                </p>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                    Full Analysis <ArrowUpRight className="w-4 h-4" />
                  </button>
                  <div className="flex gap-1">
                    <div className="w-8 h-1 bg-black" />
                    <div className="w-2 h-1 bg-zinc-200" />
                    <div className="w-2 h-1 bg-zinc-200" />
                  </div>
                </div>
              </article>
            </section>

            {/* Secondary Stream */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-zinc-100">
              {[
                { cat: 'CAPITAL_FLOW', title: 'Singapore Private Equity Heatmap: Q1 Surge' },
                { cat: 'SENTINEL', title: 'Vertical AI Governance in the ASEAN Corridor' }
              ].map((post, i) => (
                <article key={i} className="group cursor-pointer">
                  <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-3">{post.cat}</p>
                  <h4 className="text-xl font-bold leading-tight mb-4 group-hover:underline underline-offset-4">{post.title}</h4>
                  <p className="text-xs text-zinc-500 font-light leading-relaxed mb-4">Real-time tracking of institutional movement across tier-1 regional sectors.</p>
                  <span className="text-[10px] font-black uppercase flex items-center gap-1 italic">Level_05 Access <ChevronRight className="w-3 h-3" /></span>
                </article>
              ))}
            </div>
          </div>

          {/* Right Sidebar (4 Columns) */}
          <aside className="lg:col-span-4 space-y-10">
            {/* Live Audit Widget */}
            <div className="bg-black text-white p-8 rounded-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <BarChart3 className="w-12 h-12" />
              </div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                <Zap className="w-3 h-3 text-[#00ff9d]" /> Regional_Velocity
              </h4>
              <div className="space-y-6 relative z-10">
                <div>
                  <div className="flex justify-between text-[10px] font-mono text-zinc-500 mb-2">
                    <span>SEA_WEST_INDEX</span>
                    <span className="text-[#00ff9d]">+14.2%</span>
                  </div>
                  <div className="h-1 bg-zinc-800 w-full"><div className="h-full bg-[#00ff9d] w-[72%]" /></div>
                </div>
                <div>
                  <div className="flex justify-between text-[10px] font-mono text-zinc-500 mb-2">
                    <span>SIGNAL_DENSITY</span>
                    <span className="text-white">OPTIMAL</span>
                  </div>
                  <div className="h-1 bg-zinc-800 w-full"><div className="h-full bg-white w-[88%]" /></div>
                </div>
              </div>
            </div>

            {/* Subscription Module */}
            <div className="border-2 border-black p-8 group">
              <ShieldCheck className="w-6 h-6 mb-4" />
              <h4 className="text-xl font-black uppercase tracking-tighter mb-4">Tier_10 Membership</h4>
              <p className="text-sm text-zinc-500 font-light leading-relaxed mb-8">
                Gain unfiltered access to the Orchestrator's internal data streams, Cap-Table audits, and the private Equity Triage dashboard.
              </p>
              <button className="w-full py-4 bg-black text-[#00ff9d] text-[10px] font-black uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all">
                Upgrade to Terminal
              </button>
            </div>

            {/* Disclaimer */}
            <div className="text-[9px] text-zinc-400 font-mono leading-relaxed uppercase space-y-4">
              <p>Warning: Intelligence contained herein is strictly for authorized institutional recipients.</p>
              <p>Orchestrator Logs: All activity is monitored under the Equitee Governance Framework.</p>
            </div>
          </aside>
        </div>
      </main>

      {/* Expanded Footer */}
      <footer className="bg-black text-white py-20 px-4 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-24">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6 text-[#00ff9d]">
              <Globe className="w-5 h-5" />
              <span className="text-lg font-black tracking-widest uppercase">EQUITY.IO</span>
            </div>
            <p className="text-sm text-zinc-500 font-light max-w-sm">
              The proprietary media-tech layer of Pixel Play Entertainment. Specializing in the intersection of Private Capital and Vertical AI.
            </p>
          </div>
          <div className="space-y-4">
            <h5 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic underline">Networks</h5>
            <ul className="text-xs space-y-2 font-bold uppercase tracking-widest">
              <li className="hover:text-[#00ff9d] cursor-pointer">Sovereign_Flow</li>
              <li className="hover:text-[#00ff9d] cursor-pointer">Equity_Triage</li>
              <li className="hover:text-[#00ff9d] cursor-pointer">Audit_Sentinel</li>
            </ul>
          </div>
          <div className="space-y-4">
            <h5 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic underline">Legal</h5>
            <p className="text-[9px] text-zinc-600 uppercase leading-relaxed">
              Equitee.io is a registered trademark of Pixel Play Ventures. <br />
              Kuala Lumpur, Malaysia.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicPortal;
