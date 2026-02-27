
import React from 'react';
import { Radio, ShieldAlert, Globe, Database, Newspaper } from 'lucide-react';
import { AnalysisPod } from '../types';

interface SidebarProps {
  activePod: AnalysisPod;
  setActivePod: (pod: AnalysisPod) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePod, setActivePod }) => {
  const navItems = [
    { id: 'TRIAGE' as AnalysisPod, label: 'The Dispatch', icon: Radio },
    { id: 'SOVEREIGN' as AnalysisPod, label: 'The Thesis', icon: Globe },
    { id: 'SENTINEL' as AnalysisPod, label: 'Governance Brief', icon: ShieldAlert },
    { id: 'AUDIT' as AnalysisPod, label: 'Audit Bureau', icon: Database },
  ];

  return (
    <div className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col h-full">
      <div className="p-6 border-b border-zinc-800">
        <h1 className="text-2xl font-black tracking-tighter flex items-center gap-2">
          EQUITE<span className="text-wired-neon italic">E</span>.IO
        </h1>
        <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mt-1">Trade Journal Orchestrator</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        <div className="px-4 py-2 mb-2">
          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600">Editorial Pillars</p>
        </div>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePod(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
              activePod === item.id 
                ? 'bg-zinc-900 border border-zinc-700 text-wired-neon' 
                : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'
            }`}
          >
            <item.icon className={`w-5 h-5 ${activePod === item.id ? 'text-wired-neon' : 'text-zinc-600 group-hover:text-zinc-400'}`} />
            <span className="font-bold text-sm tracking-tight">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 bg-zinc-900/30 m-4 rounded-xl border border-zinc-800/50">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 rounded-full bg-wired-neon animate-pulse" />
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Journal Status</span>
        </div>
        <p className="text-[11px] text-zinc-500 leading-relaxed font-mono">
          ED_CHIEF: ONLINE<br/>
          PRINT_QUEUE: ACTIVE<br/>
          SYNC: REAL-TIME
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
