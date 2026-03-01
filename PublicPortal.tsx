import React, { useState, useEffect } from 'react';
import { Newspaper, ArrowUpRight, Activity, ChevronLeft, Link as LinkIcon, ExternalLink, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { supabase } from './services/database';

const PublicPortal = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPortal() {
      const { data } = await supabase
        .from('articles')
        .select('*')
        .order('date', { ascending: false });
      if (data) setArticles(data);
      setLoading(false);
    }
    fetchPortal();
  }, []);

  const bespoke = articles.filter(a => a.type === 'BESPOKE');
  const wire = articles.filter(a => a.type === 'WIRE');
  const selected = articles.find(a => a.id === selectedId);

  // Helper for "Hot Switch" Sentiment Icons
  const SentimentIcon = ({ type }: { type: string }) => {
    if (type === 'BULLISH') return <TrendingUp size={14} className="text-[#00c073]" />;
    if (type === 'BEARISH') return <TrendingDown size={14} className="text-red-500" />;
    return <Minus size={14} className="text-zinc-400" />;
  };

  // Article Reader View
  if (selectedId && selected) {
    return (
      <div className="min-h-screen bg-white text-black p-6 md:p-24 animate-in fade-in duration-500">
        <button onClick={() => setSelectedId(null)} className="text-[10px] font-black uppercase mb-12 flex items-center gap-2 tracking-widest hover:text-[#00c073] transition-colors">
          <ChevronLeft size={14}/> Return to Terminal
        </button>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
             <SentimentIcon type={selected.sentiment} />
             <span className="text-zinc-400 text-[10px] font-black tracking-widest uppercase">
               {selected.sentiment} | {selected.reading_time || '2 MIN READ'}
             </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-8 italic leading-tight">{selected.title}</h1>
          <div className="prose max-w-none text-lg leading-relaxed text-zinc-800 whitespace-pre-line">
            {selected.content}
          </div>
        </div>
      </div>
    );
  }

  // Main Terminal View
  return (
    <div className="min-h-screen bg-[#fcfcfc] text-black font-sans selection:bg-[#ccff00]">
      <nav className="border-b border-black/5 py-5 px-6 md:px-12 flex justify-between items-center sticky top-0 bg-white/80 backdrop-blur-xl z-50">
        <div className="flex items-center gap-3">
          <div className="bg-black p-1.5 rounded-sm">
            <Newspaper className="w-5 h-5 text-[#ccff00]" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase italic">EQUITY.IO</span>
        </div>
        <div className="text-[10px] font-black text-zinc-400 tracking-[0.2em] uppercase hidden md:block">
          Institutional Intelligence Terminal
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12">
        {/* LEFT COLUMN: PRIORITY ANALYSIS (BESPOKE) */}
        <section className="lg:col-span-8 p-6 md:p-12 border-r border-zinc-100">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-12 flex items-center gap-2">
            <Activity size={14}/> Priority_Analysis
          </h2>
          <div className="space-y-20">
            {loading ? (
              <div className="animate-pulse text-zinc-300 font-black uppercase tracking-widest text-xs">Accessing Vault...</div>
            ) : (
              bespoke.map(post => (
                <article key={post.id} onClick={() => setSelectedId(post.id)} className="group cursor-pointer">
                  <div className="aspect-[21/9] mb-8 overflow-hidden rounded-lg bg-zinc-100 border border-zinc-200">
                    <img src={post.img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="intel" />
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <SentimentIcon type={post.sentiment} />
                    <span className="text-[#00c073] text-[9px] font-black tracking-widest uppercase">{post.tag}</span>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-bold italic group-hover:text-zinc-600 leading-tight mb-4">{post.title}</h3>
                  <p className="text-zinc-500 font-light mb-6 max-w-2xl leading-relaxed">{post.summary}</p>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase underline decoration-[#ccff00] underline-offset-8 decoration-2">
                    Open Thesis <ArrowUpRight size={14}/>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        {/* RIGHT COLUMN: THE MARKET WIRE (COMPILATION) */}
        <aside className="lg:col-span-4 p-6 md:p-12 bg-zinc-50/50">
          <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-12 flex items-center gap-2">
            <LinkIcon size={14}/> Market_Wire
          </h2>
          <div className="space-y-6">
            {wire.map(item => (
              <a key={item.id} href={item.source_link} target="_blank" rel="noopener noreferrer" className="block group border-b border-zinc-200 pb-6 last:border-0 hover:bg-white p-4 -mx-4 transition-all rounded-sm">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <SentimentIcon type={item.sentiment} />
                    <span className="text-[8px] font-black text-zinc-400 tracking-widest uppercase">{item.author}</span>
                  </div>
                  <ExternalLink size={10} className="text-zinc-300 group-hover:text-[#ccff00]" />
                </div>
                <h4 className="text-base font-bold leading-snug group-hover:underline decoration-[#ccff00] decoration-2">{item.title}</h4>
              </a>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default PublicPortal;
