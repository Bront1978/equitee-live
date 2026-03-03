import React, { useState, useEffect } from 'react';
import { Newspaper, ArrowUpRight, Activity, ChevronLeft, Link as LinkIcon, ExternalLink, TrendingUp, TrendingDown, Minus, Clock } from 'lucide-react';
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
    if (type === 'BULLISH') return <TrendingUp size={14} className="text-[#00c073]" />;
    if (type === 'BEARISH') return <TrendingDown size={14} className="text-red-500" />;
    return <Minus size={14} className="text-zinc-400" />;
  };

  // FULL ARTICLE VIEW (When you click a Deep Dive)
  if (selectedId && selected) {
    return (
      <div className="min-h-screen bg-white text-black p-6 md:p-24 animate-in fade-in duration-500">
        <button onClick={() => setSelectedId(null)} className="text-[10px] font-black uppercase mb-12 flex items-center gap-2 tracking-widest hover:text-[#00c073] transition-all">
          <ChevronLeft size={14}/> BACK TO TERMINAL
        </button>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
             <SentimentIcon type={selected.sentiment} />
             <span className="text-zinc-400 text-[10px] font-black tracking-widest uppercase">{selected.sentiment}</span>
             <span className="text-zinc-300">|</span>
             <div className="flex items-center gap-1 text-zinc-400 text-[10px] font-black tracking-widest uppercase"><Clock size={12}/> 5 MIN READ</div>
          </div>
          <h1 className="text-4xl md:text-7xl font-bold mb-12 italic leading-[1.1] tracking-tighter">{selected.title}</h1>
          <div className="aspect-video bg-zinc-100 rounded-xl mb-12 overflow-hidden border border-zinc-200">
             <img src={selected.img} className="w-full h-full object-cover grayscale" />
          </div>
          <div className="prose max-w-none text-xl leading-relaxed text-zinc-800 whitespace-pre-line font-light">
            {selected.content || selected.summary}
          </div>
        </div>
      </div>
    );
  }

  // MAIN TERMINAL VIEW (The Compilation)
  return (
    <div className="min-h-screen bg-[#fcfcfc] text-black font-sans selection:bg-[#ccff00]">
      {/* HEADER */}
      <nav className="border-b border-black/5 py-6 px-6 md:px-12 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-xl z-50">
        <div className="flex items-center gap-3">
          <div className="bg-black p-2 rounded-sm"><Newspaper className="w-5 h-5 text-[#ccff00]" /></div>
          <span className="text-2xl font-black tracking-tighter uppercase italic">EQUITY.IO</span>
        </div>
        <div className="text-[10px] font-black text-zinc-400 tracking-[0.2em] uppercase hidden md:block border-l border-zinc-200 pl-6 ml-6">
          Institutional Intelligence Terminal v6.0
        </div>
      </nav>

      <main className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* LEFT: PRIORITY ANALYSIS */}
        <section className="lg:col-span-8 p-6 md:p-12 border-r border-zinc-100 bg-white">
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400 mb-16 flex items-center gap-3">
            <Activity size={14} className="text-[#00c073]"/> PRIORITY_ANALYSIS
          </h2>
          <div className="space-y-32">
            {loading ? (
              <div className="space-y-4">
                <div className="h-8 w-64 bg-zinc-100 animate-pulse rounded" />
                <div className="h-96 w-full bg-zinc-50 animate-pulse rounded-xl" />
              </div>
            ) : (
              bespoke.map(post => (
                <article key={post.id} onClick={() => setSelectedId(post.id)} className="group cursor-pointer">
                  <div className="flex items-center gap-3 mb-6">
                    <SentimentIcon type={post.sentiment} />
                    <span className="text-[#00c073] text-[10px] font-black tracking-widest uppercase">{post.tag}</span>
                  </div>
                  <h3 className="text-4xl md:text-6xl font-bold italic group-hover:text-zinc-600 leading-[1.1] tracking-tighter transition-colors mb-8">
                    {post.title}
                  </h3>
                  <div className="aspect-[21/9] mb-8 overflow-hidden rounded-xl bg-zinc-100 border border-zinc-200">
                    <img src={post.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" />
                  </div>
                  <p className="text-zinc-500 text-xl font-light mb-8 max-w-2xl leading-relaxed">{post.summary}</p>
                  <div className="flex items-center gap-3 text-[11px] font-black uppercase underline decoration-[#ccff00] decoration-4 underline-offset-[12px] group-hover:gap-5 transition-all">
                    OPEN FULL THESIS <ArrowUpRight size={16}/>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        {/* RIGHT: THE MARKET WIRE */}
        <aside className="lg:col-span-4 p-6 md:p-12 bg-[#f8f8f8]">
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-400 mb-16 flex items-center gap-3">
            <LinkIcon size={14} className="text-[#ccff00]"/> MARKET_WIRE
          </h2>
          <div className="space-y-10">
            {wire.map(item => (
              <a key={item.id} href={item.source_link} target="_blank" rel="noopener noreferrer" 
                 className="block group border-b border-zinc-200 pb-10 last:border-0 hover:bg-white hover:p-6 hover:-mx-6 transition-all rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-3">
                    <SentimentIcon type={item.sentiment} />
                    <span className="text-[9px] font-black text-zinc-400 tracking-widest uppercase">{item.author}</span>
                  </div>
                  <ExternalLink size={12} className="text-zinc-300 group-hover:text-black transition-colors" />
                </div>
                <h4 className="text-xl font-bold leading-tight group-hover:text-zinc-700">{item.title}</h4>
                <p className="text-zinc-400 text-sm mt-4 font-light line-clamp-2">{item.summary}</p>
              </a>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default PublicPortal;
