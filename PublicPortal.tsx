import React, { useState } from 'react';
import { Newspaper, ArrowUpRight, Lock, Globe, Zap, Activity, ChevronLeft, Share2, Bookmark } from 'lucide-react';

const PublicPortal: React.FC = () => {
  // 1. THE ENGINE: This state tracks if we are looking at the Feed or a specific Article
  const [selectedArticle, setSelectedArticle] = useState<null | number>(null);

  // Sample Data for the Articles
  const articles = [
    { 
      id: 1,
      tag: 'SOVEREIGN HEALTH', 
      date: '27 FEB 2026', 
      title: 'The KL Corridor: Why Malaysian Tech is Decoupling from Global Trends',
      content: 'The "Kedah" Infrastructure Pivot represents a 12.4% delta in capital allocation toward northern-tier logistics hubs. Our proprietary model indicates that this sovereign-backed liquidity surge is reshaping the Southeast Asian private equity landscape. By tracking the flows that others miss in the regional corridor, we can identify strategic alpha before the broader market reacts...',
      img: 'https://images.unsplash.com/photo-1510672981848-a1c4f1cb5ccf?auto=format&fit=crop&q=80&w=800'
    },
    { 
      id: 2,
      tag: 'EXIT WATCH', 
      date: '26 FEB 2026', 
      title: 'The B2B AI Pivot: Strategic Consolidation in Jakarta',
      content: 'Jakarta is seeing an unprecedented wave of strategic consolidation within the B2B AI sector. Sovereign wealth funds are increasingly favoring "Vertical AI" plays over horizontal platforms. This report explores the valuation multiples currently being applied to late-stage series B startups in the logistics and fintech sectors...',
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
    }
  ];

  // 2. THE RENDERER: If an article is selected, show the "Reader View"
  if (selectedArticle !== null) {
    const article = articles.find(a => a.id === selectedArticle);
    return (
      <div className="min-h-screen bg-white text-black font-sans animate-in fade-in duration-500">
        <nav className="border-b border-zinc-100 py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-md z-50">
          <button onClick={() => setSelectedArticle(null)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:text-[#ccff00] transition-colors">
            <ChevronLeft className="w-4 h-4" /> Back to Terminal
          </button>
          <div className="flex gap-4">
            <Share2 className="w-4 h-4 cursor-pointer" />
            <Bookmark className="w-4 h-4 cursor-pointer" />
          </div>
        </nav>
        
        <main className="max-w-3xl mx-auto px-6 py-12 md:py-24">
          <div className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00c073] mb-4">{article?.tag}</div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-tight">{article?.title}</h1>
          <div className="flex items-center gap-4 mb-12 pb-8 border-b border-zinc-100">
            <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-[#ccff00] font-black text-xs">BP</div>
            <div>
              <p className="text-xs font-bold uppercase">Bront Palarae</p>
              <p className="text-[10px] text-zinc-400 uppercase tracking-tighter">Editorial Chief // {article?.date}</p>
            </div>
          </div>
          <p className="text-xl text-zinc-600 font-light leading-relaxed first-letter:text-5xl first-letter:font-black first-letter:mr-3 first-letter:float-left">
            {article?.content}
          </p>
          <div className="mt-20 p-8 bg-zinc-50 border border-zinc-200 rounded-lg text-center">
            <Lock className="w-6 h-6 mx-auto mb-4 text-[#ccff00]" />
            <h3 className="text-lg font-bold mb-2 uppercase">Full Intelligence Restricted</h3>
            <p className="text-sm text-zinc-500 mb-6">You have reached the limit of your public preview. Level_10 clearance required for deep-dive cap table data.</p>
            <button className="px-8 py-3 bg-black text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#ccff00] hover:text-black transition-all">Upgrade Now</button>
          </div>
        </main>
      </div>
    );
  }

  // 3. THE HOME PAGE: Show the standard Feed
  return (
    <div className="min-h-screen bg-[#fcfcfc] text-black font-sans selection:bg-[#ccff00] selection:text-black">
      {/* Dynamic Ticker Bar */}
      <div className="bg-black text-[9px] text-zinc-500 py-2 px-4 md:px-12 flex justify-between items-center uppercase tracking-[0.3em] border-b border-zinc-900 overflow-hidden">
        <div className="flex gap-6 animate-pulse">
          <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 bg-[#ccff00] rounded-full" /> ORCHESTRATOR_LIVE</span>
        </div>
        <div className="flex gap-4">
          <span className="text-[#ccff00]">SGT {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>
      </div>

      <nav className="border-b border-black/5 py-5 px-4 md:px-12 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-xl z-50">
        <div className="flex items-center gap-3">
          <div className="bg-black p-1.5 rounded-sm"><Newspaper className="w-5 h-5 text-[#ccff00]" /></div>
          <span className="text-xl md:text-2xl font-black tracking-tighter uppercase italic leading-none">EQUITY.IO</span>
        </div>
        <button className="px-5 py-2.5 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full">Terminal Login</button>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-12 py-10 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-8 space-y-16">
            {articles.map((post) => (
              <article 
                key={post.id} 
                onClick={() => setSelectedArticle(post.id)} // CLICK TRIGGERS THE READER VIEW
                className="group cursor-pointer"
              >
                <div className="aspect-[21/9] bg-zinc-100 mb-8 overflow-hidden rounded-lg border border-zinc-200">
                  <img src={post.img} alt="cover" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                </div>
                <div className="flex items-center gap-3 mb-4 text-[9px] font-black uppercase tracking-widest">
                  <span className="text-[#00c073]">{post.tag}</span>
                  <span className="text-zinc-400">• {post.date}</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-6 leading-tight group-hover:underline decoration-[#ccff00] decoration-4 underline-offset-8 italic">
                  {post.title}
                </h3>
                <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                  Access Analysis <ArrowUpRight className="w-4 h-4 text-[#ccff00]" />
                </button>
              </article>
            ))}
          </div>

          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-28 p-8 bg-white border border-zinc-100 rounded-lg shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Market Velocity</h4>
                  <Activity className="w-4 h-4 text-[#ccff00]" />
                </div>
                <p className="text-5xl font-black tabular-nums tracking-tighter">+14.2%</p>
                <button 
                  onClick={() => alert("Registration coming soon!")} 
                  className="w-full mt-8 py-3 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#ccff00] hover:text-black transition-all"
                >
                  Join Terminal
                </button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default PublicPortal;
