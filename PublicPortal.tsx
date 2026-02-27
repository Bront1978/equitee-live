
import React from 'react';
import { Search, Menu, ArrowRight, TrendingUp, Zap } from 'lucide-react';

const PublicPortal: React.FC = () => {
  const featuredArticles = [
    {
      id: '1',
      category: '[Sovereign Wealth]',
      title: 'The KL Corridor: Why Malaysian Tech is Decoupling from Global Trends',
      lede: 'A deep dive into the sovereign-backed liquidity surge reshaping the Southeast Asian private equity landscape. We track the flows that others miss in the regional corridor.',
      date: '27 FEB 2026',
      image: 'https://picsum.photos/seed/kl/800/600'
    },
    {
      id: '2',
      category: '[Exit Watch]',
      title: 'The B2B AI Pivot: Strategic Consolidation in Jakarta',
      lede: 'How SEA founders are navigating secondary markets and sovereign buyouts as traditional IPO paths narrow. The shift towards Vertical AI becomes a fiscal safe-haven.',
      date: '26 FEB 2026',
      image: 'https://picsum.photos/seed/exit/800/600'
    }
  ];

  const marketPulse = [
    { id: '3', market: 'SG', title: 'Secondary Liquidity Surge', time: '2h ago' },
    { id: '4', market: 'MY', title: 'MD-Status Alignment Guidelines', time: '4h ago' },
    { id: '5', market: 'VN', title: 'Vertical AI Infrastructure Boom', time: '6h ago' },
    { id: '6', market: 'ID', title: 'Sovereign Wealth Flow Analysis', time: '8h ago' },
  ];

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans selection:bg-wired-neon selection:text-black">
      {/* Navigation */}
      <nav className="border-b border-zinc-100 sticky top-0 bg-white/80 backdrop-blur-xl z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-wired-neon fill-current" />
              <span className="text-xl font-black tracking-tighter uppercase italic">Equitee.io</span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">
              <a href="#" className="hover:text-black transition-colors">Intelligence</a>
              <a href="#" className="hover:text-black transition-colors">Markets</a>
              <a href="#" className="hover:text-black transition-colors">Sovereign</a>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="text-zinc-400 hover:text-black transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="md:hidden text-zinc-400 hover:text-black transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <button className="hidden md:block px-5 py-2 border border-zinc-200 rounded text-[10px] font-black uppercase tracking-widest hover:border-black transition-all">
              Terminal Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="py-24 px-6 border-b border-zinc-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-16 items-start">
            <div className="col-span-12 lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-50 border border-zinc-100 rounded mb-12">
                <span className="w-1.5 h-1.5 bg-wired-neon rounded-full animate-pulse" />
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Live_Intelligence_Stream</span>
              </div>
              <h1 className="text-7xl md:text-9xl font-serif font-black tracking-tighter leading-[0.85] mb-12">
                The Future of <br />
                <span className="italic">Sovereign</span> Equity.
              </h1>
              <p className="text-2xl text-zinc-500 max-w-2xl font-light leading-relaxed">
                Transforming raw financial data into strategic alpha. We track the flows that others miss in the Southeast Asian private markets.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-4 space-y-8">
              <div className="p-8 bg-zinc-50 border border-zinc-100 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Market Velocity</span>
                  <TrendingUp className="w-4 h-4 text-wired-neon" />
                </div>
                <div className="text-5xl font-black tabular-nums mb-2">+14.2%</div>
                <div className="text-[10px] font-mono text-zinc-400 uppercase">SEA Tech Index // 2026</div>
              </div>
              <button className="w-full py-6 bg-black text-white rounded font-black uppercase tracking-[0.2em] text-xs hover:bg-zinc-800 transition-all active:scale-95 shadow-xl shadow-black/10">
                Subscribe to Terminal
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content: 12-column grid */}
      <main className="max-w-7xl mx-auto py-24 px-6">
        <div className="grid grid-cols-12 gap-16">
          {/* Hero Thesis: 8 columns */}
          <div className="col-span-12 lg:col-span-8 space-y-24">
            {featuredArticles.map((article) => (
              <article key={article.id} className="group cursor-pointer space-y-8">
                <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                    <span className="text-wired-neon">{article.category}</span>
                    <span className="w-1 h-1 bg-zinc-200 rounded-full" />
                    <span>{article.date}</span>
                  </div>
                  <h2 className="text-5xl md:text-6xl font-serif font-black tracking-tight leading-tight group-hover:text-wired-neon transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-xl text-zinc-600 leading-relaxed font-medium max-w-3xl">
                    {article.lede}
                  </p>
                  <div className="pt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                    Read Analysis <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Market Pulse: 4 columns */}
          <aside className="col-span-12 lg:col-span-4 space-y-12">
            <div className="sticky top-32 space-y-12">
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-12 flex items-center gap-4">
                  Market Pulse <div className="h-px flex-1 bg-zinc-100" />
                </h3>
                <div className="space-y-12">
                  {marketPulse.map((item) => (
                    <div key={item.id} className="group cursor-pointer space-y-3">
                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 uppercase">
                        <span className="text-wired-neon font-bold">{item.market}</span>
                        <span>{item.time}</span>
                      </div>
                      <h4 className="text-lg font-bold leading-tight group-hover:text-wired-neon transition-colors uppercase tracking-tight">
                        {item.title}
                      </h4>
                      <div className="h-px w-full bg-zinc-50 group-hover:bg-zinc-100 transition-colors" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8 bg-zinc-900 text-white rounded-2xl space-y-6">
                <h5 className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Sovereign Intel</h5>
                <p className="text-sm font-medium leading-relaxed">
                  Get daily dispatches on dry powder movements and board-level shifts across APAC.
                </p>
                <button className="w-full py-4 bg-wired-neon text-black rounded font-black uppercase tracking-widest text-[10px] hover:bg-white transition-colors">
                  Join the Network
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-zinc-100 bg-zinc-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-wired-neon fill-current" />
              <span className="text-2xl font-black tracking-tighter uppercase italic">Equitee.io</span>
            </div>
            <p className="text-zinc-500 max-w-sm text-sm leading-relaxed font-medium">
              The definitive Journal of Record for the Southeast Asian private equity ecosystem. Built for the next generation of capital allocators.
            </p>
          </div>
          <div>
            <h5 className="text-[10px] font-black uppercase tracking-widest mb-8 text-black">Platform</h5>
            <ul className="space-y-4 text-[10px] text-zinc-400 font-black uppercase tracking-widest">
              <li><a href="#" className="hover:text-black transition-colors">Terminal</a></li>
              <li><a href="#" className="hover:text-black transition-colors">API Access</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Methodology</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-[10px] font-black uppercase tracking-widest mb-8 text-black">Company</h5>
            <ul className="space-y-4 text-[10px] text-zinc-400 font-black uppercase tracking-widest">
              <li><a href="#" className="hover:text-black transition-colors">About</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-mono text-zinc-400 uppercase">© 2026 EQUITEE.IO // JOURNAL OF RECORD</p>
          <div className="flex gap-12 text-[10px] font-mono text-zinc-400 uppercase">
            <a href="#" className="hover:text-black transition-colors">Privacy</a>
            <a href="#" className="hover:text-black transition-colors">Terms</a>
            <a href="#" className="hover:text-black transition-colors">Security</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicPortal;
