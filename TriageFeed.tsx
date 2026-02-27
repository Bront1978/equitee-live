
import React from 'react';
import { MOCK_LEADS } from '../constants';
import { TrendingUp, ArrowRight, ExternalLink, Zap } from 'lucide-react';

const TriageFeed: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-wired-neon animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-wired-neon">Live Newsroom</span>
          </div>
          <h2 className="text-4xl font-black tracking-tighter">The Dispatch</h2>
          <p className="text-zinc-500 text-sm font-light">High-velocity reporting on capital movements across SEA.</p>
        </div>
        <button className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-widest flex items-center gap-2 transition-colors">
          Refresh Stream <TrendingUp className="w-3 h-3 text-wired-neon" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_LEADS.map((lead) => (
          <div key={lead.id} className="group relative bg-zinc-900/40 border border-zinc-800 rounded-xl p-6 transition-all hover:bg-zinc-900/60 hover:border-zinc-700">
            <div className="absolute top-6 right-6 flex items-center gap-3">
              <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${
                lead.marketImpact === 'Extreme' ? 'bg-red-500/20 text-red-500 border border-red-500/20' :
                lead.marketImpact === 'High' ? 'bg-orange-500/20 text-orange-500 border border-orange-500/20' :
                'bg-blue-500/20 text-blue-500 border border-blue-500/20'
              }`}>
                {lead.marketImpact}
              </span>
              <span className="text-zinc-600 text-[10px] font-mono">{lead.timestamp}</span>
            </div>
            
            <div className="flex items-start gap-5 pr-32">
              <div className="mt-1">
                <div className="w-12 h-12 rounded-lg bg-zinc-950 flex items-center justify-center text-wired-neon border border-zinc-800 group-hover:border-wired-neon/50 transition-colors">
                  <ExternalLink className="w-5 h-5" />
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-zinc-700" />
                  {lead.source}
                </p>
                <h3 className="text-2xl font-bold group-hover:text-white transition-colors leading-tight tracking-tight">
                  {lead.headline}
                </h3>
                <div className="flex items-center gap-8 pt-3">
                  <div className="space-y-1">
                    <p className="text-[9px] text-zinc-600 uppercase font-black tracking-widest">Exit Potential</p>
                    <p className="text-xs font-mono text-zinc-400">{lead.exitPotential}</p>
                  </div>
                  <div className="space-y-1 flex-1 max-w-[200px]">
                    <p className="text-[9px] text-zinc-600 uppercase font-black tracking-widest">B2B Alpha</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-wired-neon" style={{ width: `${lead.relevance}%` }} />
                      </div>
                      <span className="text-[10px] font-mono text-wired-neon">{lead.relevance}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-zinc-800/50 flex justify-between items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-6 h-6 rounded-full bg-zinc-800 border-2 border-zinc-950 flex items-center justify-center text-[8px] font-bold text-zinc-500">
                    AI
                  </div>
                ))}
                <span className="ml-4 text-[10px] text-zinc-600 font-bold uppercase tracking-tighter self-center">Assigned to Sovereign Pod</span>
              </div>
              <button className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-zinc-500 hover:text-wired-neon transition-colors">
                Draft Feature Story <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TriageFeed;
