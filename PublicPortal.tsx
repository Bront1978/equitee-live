import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Activity, ChevronLeft, Link as LinkIcon, ExternalLink, TrendingUp, TrendingDown, Minus, Clock, Share2 } from 'lucide-react';
import { supabase } from './services/database';

const PublicPortal = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPortal() {
      const { data } = await supabase.from('articles').select('*').order('date', { ascending: false });
      if (data) setArticles(data);
      setLoading(false);
    }
    fetchPortal();
  }, []);

  const bespoke = articles.filter(a => a.type === 'BESPOKE');
  const wire = articles.filter(a => a.type === 'WIRE');
  const selected = articles.find(a => a.id === selectedId);

  const SentimentIcon = ({ type }: { type: string }) => {
    if (type === 'BULLISH') return <TrendingUp size={14} className="text-[#ccff00]" />;
    if (type === 'BEARISH') return <TrendingDown size={14} className="text-red-500" />;
    return <Minus size={14} className="text-zinc-600" />;
  };

  // 1. ELITE VIEW: Strategic Briefings for the Power Corridor
  if (selectedId && selected) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#f2f2f2] p-6 md:p-32 animate-in fade-in duration-700">
        <nav className="max-w-4xl mx-auto mb-16 flex justify-between items-center">
          <button onClick={() => setSelectedId(null)} className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 hover:text-[#ccff00] transition-all">
            <ChevronLeft size={16}/> RETURN_TO_HUB
          </button>
          <Share2 size={16} className="text-zinc-500 cursor-pointer hover:text-white" />
        </nav>
        <article className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
             <div className="px-3 py-1 bg-[#ccff00] text-black text-[9px] font-black tracking-widest uppercase">{selected.tag}</div>
             <div className="flex items-center gap-1 text-zinc-500 text-[9px] font-black tracking-widest uppercase italic border-l border-zinc-800 pl-4">
               <Clock size={12}/> {selected.reading_time || '4 MIN READ'}
             </div>
          </div>
          <h1 className="text-4xl md:text-8xl font-bold mb-12 leading-[0.95] tracking-tighter italic">{selected.title}</h1>
          <div className="text-zinc-400 text-lg md:text-xl leading-relaxed font-light whitespace-pre-line columns-1 md:columns-2 gap-12 first-letter:text-5xl first-letter:font-black first-letter:text-[#ccff00] first-letter:mr-3 first-letter:float-left">
            {selected.content || selected.summary}
          </div>
        </article>
      </div>
    );
  }

  // 2. PUBLIC VIEW: The High-Signal News Terminal
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f2f2f2] font-sans selection:bg-[#ccff00] selection:text-black">
      <nav className="border-b border-white/5 py-6 px-6 md:px-16 flex justify-between items-center sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-2xl z-50">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-[#ccff00] flex items-center justify-center rounded-full"><Activity size={18} className="text-black" /></div>
          <span className="text-2xl font-black tracking-tighter uppercase italic">EQUITY.IO</span>
        </div>
        <div className="text-[10px] font-black text-[#ccff00] bg-white/5 px-4 py-2 rounded-full border border-white/10 uppercase tracking-widest">
          ASIA_POWER_CORRIDOR
        </div>
      </nav>

      <main className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        {/* STRATEGIC BRIEFINGS SECTION */}
        <section className="lg:col-span-8 p-6 md:p-20 border-r border-white/5 bg-[#0d0d0d]">
          <h2 className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-600 mb-16 md:mb-24 flex items-center gap-4">
            <div className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" /> STRATEGIC_BRIEFINGS
          </h2>
          <div className="space-y-32 md:space-y-48">
            {loading ? (
              <div className="text-zinc-800 font-black animate-pulse uppercase tracking-[0.3em]">SYNCHRONIZING_ASIA_NODES...</div>
            ) : (
              bespoke.map(post => (
                <article key={post.id} onClick={() => setSelectedId(post.id)} className="group cursor-pointer">
                  <div className="flex items-center gap-4 mb-6 text-zinc-500 text-[10px] font-black tracking-widest uppercase">
                    <SentimentIcon type={post.sentiment} /> {post.tag} <span className="text-zinc-800">/</span> {new Date(post.date).toLocaleDateString('en-MY')}
                  </div>
                  <h3 className="text-4xl md:text-8xl font-bold group-hover:text-[#ccff00] leading-[0.9] tracking-tighter transition-all duration-500 mb-8 italic italic">
                    {post.title}
                  </h3>
                  <p className="text-zinc-500 text-xl font-light mb-10 max-w-3xl leading-relaxed group-hover:text-zinc-300 transition-colors">
                    {post.summary}
                  </p>
                  <div className="inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.2em] border-b-2 border-[#ccff00] pb-2 group-hover:gap-8 transition-all">
                    ACCESS THESIS <ArrowUpRight size={18} className="text-[#ccff00]"/>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        {/* GLOBAL DISPATCHES SIDEBAR */}
        <aside className="lg:col-span-4 p-6 md:p-16 bg-[#0a0a0a]">
          <h2 className="text-[11px] font-black uppercase tracking-[0.6em] text-zinc-600 mb-16 md:mb-24 flex items-center gap-4">
            <LinkIcon size={14} /> GLOBAL_DISPATCHES
          </h2>
          <div className="space-y-10">
            {wire.map(item => (
              <a key={item.id} href={item.source_link} target="_blank" rel="noopener noreferrer" 
                 className="block group border-b border-white/5 pb-10 last:border-0 hover:pl-2 transition-all duration-300">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <SentimentIcon type={item.sentiment} />
                    <span className="text-[9px] font-black text-zinc-500 tracking-widest uppercase">{item.author}</span>
                  </div>
                  <ExternalLink size={14} className="text-zinc-800 group-hover:text-[#ccff00] transition-colors" />
                </div>
                <h4 className="text-xl font-bold leading-tight group-hover:text-white transition-colors tracking-tight italic">
                  {item.title}
                </h4>
              </a>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default PublicPortal;
