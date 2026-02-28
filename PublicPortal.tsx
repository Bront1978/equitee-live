import React, { useState } from 'react';
import { Newspaper, ArrowUpRight, Lock, Globe, Zap, Activity, ChevronLeft, Share2, Mail, X, Shield } from 'lucide-react';

const PublicPortal: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<null | number>(null);
  const [showModal, setShowModal] = useState(false);

  const articles = [
    { 
      id: 1,
      tag: 'SOVEREIGN HEALTH', 
      date: '27 FEB 2026', 
      title: 'The KL Corridor: Why Malaysian Tech is Decoupling from Global Trends',
      summary: 'A deep dive into the sovereign-backed liquidity surge reshaping the Southeast Asian private equity landscape.',
      content: 'The "Kedah" Infrastructure Pivot represents a 12.4% delta in capital allocation toward northern-tier logistics hubs. Our proprietary model indicates that this sovereign-backed liquidity surge is reshaping the Southeast Asian private equity landscape. By tracking the flows that others miss in the regional corridor, we can identify strategic alpha before the broader market reacts. This decoupling suggests a localized strength that transcends current global volatility in the tech sector.',
      img: 'https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?auto=format&fit=crop&q=80&w=800'
    },
    { 
      id: 2,
      tag: 'EXIT WATCH', 
      date: '26 FEB 2026', 
      title: 'The B2B AI Pivot: Strategic Consolidation in Jakarta',
      summary: 'Analyzing the valuation multiples currently being applied to late-stage series B startups in the logistics sector.',
      content: 'Jakarta is seeing an unprecedented wave of strategic consolidation within the B2B AI sector. Sovereign wealth funds are increasingly favoring "Vertical AI" plays over horizontal platforms. This report explores the valuation multiples currently being applied to late-stage series B startups in the logistics and fintech sectors. As capital becomes more discerning, the "winner-takes-most" dynamic is accelerating across the Indonesian archipelago.',
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
    }
  ];

  // 1. MODAL COMPONENT (FOR CAPTURING LEADS)
  const TerminalModal = () => (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md p-8 rounded-sm border-t-4 border-[#ccff00] relative">
        <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-black">
          <X className="w-5 h-5" />
        </button>
        <Shield className="w-10 h-10 mb-6 text-[#ccff00]" />
        <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">Request Terminal Access</h3>
        <p className="text-sm text-zinc-500 mb-8 leading-relaxed">Level_10 intelligence is restricted to institutional partners and accredited investors. Submit your credentials for triage.</p>
        <div className="space-y-4">
          <input type="email" placeholder="Institutional Email" className="w-full p-4 bg-zinc-50 border border-zinc-200 text-sm focus:outline-none focus:border-black transition-colors" />
          <button className="w-full py-4 bg-black text-[#ccff00] text-xs font-black uppercase tracking-widest hover:bg-zinc-800 transition-all">
            Initialize Application
          </button>
        </div>
      </div>
    </div>
  );

  // 2. READER VIEW
  if (selectedArticle !== null) {
    const article = articles.find(a => a.id === selectedArticle);
    return (
      <div className="min-h-screen bg-white text-black font-sans animate-in slide-in-from-bottom-4 duration-500">
        <nav className="border-b border-zinc-100 py-4 px-4 md:px-12 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-md z-50">
          <button onClick={() => setSelectedArticle(null)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-[#00c073] transition-colors">
            <ChevronLeft className="w-4 h-4" /> Return to Feed
          </button>
          <div className="flex gap-4 text-zinc-400">
            <Share2 className="w-4 h-4 cursor-pointer hover:text-black" />
            <Mail className="w-4 h-4 cursor-pointer hover:text-black" />
          </div>
        </nav>
        
        <main className="max-w-3xl mx-auto px-6 py-12 md:py-24">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00c073] mb-6">{article?.tag}</div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-[1.1]">{article?.title}</h1>
          <div className="h-px bg-zinc-100 w-full mb-8" />
          <p className="text-xl md:text-2xl text-zinc-700 font-light leading-relaxed mb-12 italic border-l-4 border-[#ccff00] pl-6">
            {article?.summary}
          </p>
          <div className="prose prose-zinc max-w-none">
            <p className="text-lg text-zinc-800 leading-relaxed mb-8">
              {article?.content}
            </p>
          </div>
          <div className="mt-20 p-10 bg-black text-white rounded-sm text-center">
            <Lock className="w-8 h-8 mx-auto mb-6 text-[#ccff00]" />
            <h3 className="text-xl font-bold mb-4 uppercase tracking-tight">Full Intelligence Restricted</h3>
            <p className="text-sm text-zinc-400 mb-8 max-w-sm mx-auto font-light">The complete cap-table audit and flow analysis for this thesis is restricted to Terminal members.</p>
            <button onClick={() => setShowModal(true)} className="px-10 py-4 bg-[#ccff00] text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">Upgrade Clearance</button>
          </div>
        </main>
      </div>
    );
  }

  // 3. MAIN FEED
  return (
    <div className="min-h-screen bg-[#fcfcfc] text-black font-sans selection:bg-[#ccff00] selection:text-black">
      {showModal && <TerminalModal />}
      
      {/* Utility Bar */}
      <div className="bg-black text-[9px] text-zinc-500 py-2 px-4 md:px-12 flex justify-between items-center uppercase tracking-[0.3em] border-b border-zinc-900">
        <div className="flex gap-6 animate-pulse">
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#ccff00] rounded-full" /> NODE_KL_ACTIVE</span>
          <span className="hidden md:inline">INDEX_SEA: +14.22</span>
        </div>
        <div className="text-[#ccff00]">SGT {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
      </div>

      {/* Navigation */}
      <nav className="border-b border-black/5 py-5 px-4 md:px-12 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-xl z-50">
        <div className="flex items-center gap-3">
          <div className="bg-black p-1.5 rounded-sm"><Newspaper className="w-5 h-5 text-[#ccff00]" /></div>
          <span className="text-xl md:text-2xl font-black tracking-tighter uppercase italic leading-none">EQUITY.IO</span>
        </div>
        <button onClick={() => setShowModal(true)} className="px-5 py-2.5 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-[#ccff00] hover:text-black transition-all">
          Join Terminal
        </button>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-12 py-10 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-8 space-y-16">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 border-b border-zinc-100 pb-4">Priority_Analysis</h2>
            {articles.map((post) => (
              <article key={post.id} onClick={() => setSelectedArticle(post.id)} className="group cursor-pointer">
                <div className="aspect-[21/9] bg-zinc-100 mb-8 overflow-hidden rounded-lg border border-zinc-200">
                  <img src={post.img} alt="cover" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                </div>
                <div className="flex items-center gap-3 mb-4 text-[9px] font-black uppercase tracking-widest">
                  <span className="text-[#00c073]">{post.tag}</span>
                  <span className="text-zinc-400">• {post.date}</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight group-hover:text-zinc-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-zinc-500 text-sm md:text-base font-light leading-relaxed mb-8 max-w-2xl">{post.summary}</p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest group-hover:gap-4 transition-all underline decoration-[#ccff00] decoration-2 underline-offset-8">
                  Open Thesis <ArrowUpRight className="w-4 h-4" />
                </div>
              </article>
            ))}
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-28 space-y-8">
              <div className="p-8 bg-white border border-zinc-100 rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Market Velocity</h4>
                  <Activity className="w-4 h-4 text-[#ccff00]" />
                </div>
                <p className="text-5xl font-black tabular-nums tracking-tighter">+14.2%</p>
                <button onClick={() => setShowModal(true)} className="w-full mt-8 py-3 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#ccff00] hover:text-black transition-all rounded-sm">
                  Subscribe for Flow Updates
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default PublicPortal;
