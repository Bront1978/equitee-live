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

  if (selectedId && selected) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#f2f2f2] p-8 md:p-32 animate-in fade-in duration-700">
        <nav className="max-w-4xl mx-auto mb-20 flex justify-between items-center">
          <button onClick={() => setSelectedId(null)} className="text-[11px] font-black uppercase tracking-[0.3em] flex items-center gap-2 hover:text-[#ccff00] transition-all"><ChevronLeft size={16}/> RETURN</button>
          <Share2 size={16} className="text-zinc-500" />
        </nav>
        <article className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
             <div className="px-3 py-1 bg-[#ccff00] text-black text-[9px] font-black tracking-widest uppercase">{selected.tag}</div>
             <div className="text-zinc-500 text-[9px] font-black tracking-widest uppercase"><Clock size={12}/> {selected.reading_time || '5 MIN READ'}</div>
          </div>
          <h1 className="text-5xl md:text-8xl font-bold mb-16 leading-[0.95] tracking-tighter italic">{selected.title}</h1>
          <div className="text-zinc-400 text-lg leading-relaxed font-light whitespace-pre-line columns-1 md:columns-2 gap-12">
            {selected.content || selected.summary}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f2f2f2] font-sans selection:bg-[#ccff00] selection:text-black">
      <nav className="border-b border-white/5 py-8 px-8 md:px-16 flex justify-between items-center sticky top-0 bg-[#0a0a0a]/90 backdrop-blur-2xl z-50">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 bg-[#ccff00] flex items-center justify-center rounded-full"><Activity size={18} className="text-black" /></div>
          <span className="text-2xl font-black tracking-tighter uppercase italic">EQUITY.IO</span>
        </div>
        <div className="hidden lg:flex gap-12 text-[10px] font-black tracking-[0.3em] text-zinc-500 uppercase">
          <span>Intelligence</span><span>Sector Mapping</span><span>Governance Vault</span>
        </div>
        <div className="text-[10px] font-black text-[#ccff00] bg-white/5 px-4 py-2 rounded-full border border-white/10 uppercase tracking-widest">PAN-ASIAN_HUB</div>
      </nav>

      <main className="max-w-[1920px] mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-screen">
        <section className="lg:col-span-8 p-8 md:p-20 border-r border-white/5 bg-[#0d0d0d]">
          <h2 className="text-[11px] font-black uppercase tracking-[0.6em] text-zinc-600 mb-24 flex items-center gap-4"><div className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" /> STRATEGIC_BRIEFINGS</h2>
          <div className="space-y-48">
            {loading ? <div className="text-zinc-800 font-black animate-pulse uppercase tracking-widest">INGESTING_DATA_STREAM...</div> : bespoke.map(post => (
              <article key={post.id} onClick={() => setSelectedId(post.id)} className="group cursor-pointer">
                <div className="flex items-center gap-4 mb-8 text-zinc-500 text-[10px] font-black tracking-widest uppercase">
                  <SentimentIcon type={post.sentiment} /> {post.tag} <span className="text-zinc-800">/</span> {new Date(post.date).toLocaleDateString('en-MY')}
                </div>
                <h3 className="text-5xl md:text-8xl font-bold group-hover:text-[#ccff00] leading-[0.9] tracking-tighter transition-all duration-500 mb-12 italic italic">{post.title}</h3>
                <p className="text-zinc-500 text-xl font-light mb-12 max-w-3xl leading-relaxed">{post.summary}</p>
                <div className="inline-flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.2em] border-b-2 border-[#ccff00] pb-2">EXAMINE THESIS <ArrowUpRight size={18}/></div>
              </article>
            ))}
          </div>
        </section>

        <aside className="lg:col-span-4 p-8 md:p-16 bg-[#0a0a0a]">
          <h2 className="text-[11px] font-black uppercase tracking-[0.6em] text-zinc-600 mb-24 flex items-center gap-4"><LinkIcon size={14} /> GLOBAL_DISPATCHES</h2>
          <div className="space-y-12">
            {wire.map(item => (
              <a key={item.id} href={item.source_link} target="_blank" rel="noopener noreferrer" className="block group border-b border-white/5 pb-12 last:border-0 hover:pl-4 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3"><SentimentIcon type={item.sentiment} /><span className="text-[9px] font-black text-zinc-500 tracking-widest uppercase">{item.author}</span></div>
                  <ExternalLink size={14} className="text-zinc-800 group-hover:text-[#ccff00]" />
                </div>
                <h4 className="text-xl font-bold leading-tight group-hover:text-white transition-colors">{item.title}</h4>
              </a>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default PublicPortal;
