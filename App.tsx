
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TriageFeed from './components/TriageFeed';
import IngestPanel from './components/IngestPanel';
import AnalysisReport from './components/AnalysisReport';
import PublicPortal from './components/PublicPortal';
import { AnalysisPod, IntelligenceReport } from './types';
import { Bell, Search, User, Newspaper, Activity, AlertCircle } from 'lucide-react';
import { getDailySpend } from './services/gemini';

const App: React.FC = () => {
  const [activePod, setActivePod] = useState<AnalysisPod>('TRIAGE');
  const [currentReport, setCurrentReport] = useState<IntelligenceReport | null>(null);
  const [isInternal, setIsInternal] = useState<boolean>(true);
  const [isFailoverMode, setIsFailoverMode] = useState<boolean>(false);
  const [dailySpend, setDailySpend] = useState<number>(0);

  useEffect(() => {
    // Logic to determine if the visitor is a public reader or internal staff
    const urlParams = new URLSearchParams(window.location.search);
    const mode = urlParams.get('mode');
    
    if (mode === 'public') {
      setIsInternal(false);
    } else if (mode === 'internal') {
      setIsInternal(true);
    } else {
      const internalCheck = window.location.hostname.includes('engine') || 
                            window.location.hostname.includes('internal') ||
                            window.location.hostname.includes('localhost');
      setIsInternal(internalCheck || true);
    }

    // Simulate Sick Protocol: Heartbeat check
    // In a real app, this would be a real API check
    const lastHeartbeat = Date.now() - (5 * 60 * 60 * 1000); // 5 hours ago
    if (Date.now() - lastHeartbeat > 4 * 60 * 60 * 1000) {
      setIsFailoverMode(true);
    }

    // Update daily spend
    const interval = setInterval(() => {
      setDailySpend(getDailySpend());
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!isInternal) {
    return <PublicPortal />;
  }

  return (
    <div className="flex h-screen bg-[#050505] text-zinc-200 overflow-hidden font-sans">
      <Sidebar activePod={activePod} setActivePod={setActivePod} />
      
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-zinc-900 flex items-center justify-between px-8 bg-zinc-950/50 backdrop-blur-md z-10">
          <div className="flex items-center gap-6 flex-1">
            <div className="flex items-center gap-2 mr-4">
              <Newspaper className="w-5 h-5 text-wired-neon" />
              <span className="text-xs font-black uppercase tracking-[0.4em]">Editorial_Desktop</span>
            </div>
            {isFailoverMode && (
              <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded animate-pulse">
                <AlertCircle className="w-3 h-3 text-red-500" />
                <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Evergreen Failover Active</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-6">
            <div className={`flex items-center gap-2 px-3 py-1 rounded border transition-colors ${dailySpend > 15 ? 'bg-yellow-500/10 border-yellow-500/20' : 'bg-zinc-900 border-zinc-800'}`}>
              <Activity className={`w-3 h-3 ${dailySpend > 15 ? 'text-yellow-500' : 'text-wired-neon'}`} />
              <span className={`text-[10px] font-mono ${dailySpend > 15 ? 'text-yellow-500' : 'text-wired-neon'}`}>
                FISCAL_LOAD: ${dailySpend.toFixed(2)} / $20.00
              </span>
            </div>
            <button className="relative text-zinc-500 hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>
            <div className="h-4 w-px bg-zinc-800" />
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right">
                <p className="text-[10px] font-black leading-none mb-1 group-hover:text-wired-neon transition-colors uppercase tracking-widest">Ed. Chief</p>
                <p className="text-[9px] text-zinc-600 font-mono tracking-tighter uppercase leading-none">Access: Level_10</p>
              </div>
              <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:border-wired-neon transition-colors">
                <User className="w-4 h-4" />
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-8 pb-12">
          {isFailoverMode && !currentReport && activePod === 'TRIAGE' && (
            <div className="max-w-7xl mx-auto mt-8 p-6 bg-zinc-950 border border-zinc-800 rounded-2xl">
              <h2 className="text-xl font-black uppercase tracking-widest text-white mb-4">Evergreen Resource Playbooks</h2>
              <p className="text-sm text-zinc-500 mb-6">The Editorial Heartbeat is offline. Surfacing high-performing historical intelligence for continuity.</p>
              <div className="grid grid-cols-3 gap-4">
                {['Sovereign Wealth Flow 2024', 'SEA Logistics Nexus', 'Vertical AI Governance'].map(title => (
                  <div key={title} className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-wired-neon transition-colors cursor-pointer">
                    <p className="text-xs font-bold text-white uppercase">{title}</p>
                    <p className="text-[10px] text-zinc-600 mt-2">RESOURCE_PLAYBOOK_V2</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {currentReport ? (
            <AnalysisReport 
              report={currentReport} 
              onReset={() => {
                setCurrentReport(null);
                setActivePod('TRIAGE');
              }} 
            />
          ) : (
            <div className="max-w-7xl mx-auto pt-8">
              {activePod === 'TRIAGE' && (
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
                  <div className="xl:col-span-8">
                    <TriageFeed />
                  </div>
                  <div className="xl:col-span-4">
                    <div className="sticky top-8 space-y-6">
                      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-10 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-wired-neon/5 rounded-bl-full blur-2xl" />
                        <h3 className="text-2xl font-black mb-6 tracking-tighter uppercase italic text-white underline decoration-wired-neon decoration-4 underline-offset-8">Market Pulse</h3>
                        <div className="space-y-4">
                          <p className="text-sm text-zinc-400 leading-relaxed font-light">
                            Current signal density for <span className="text-white font-bold">SEA Private Markets</span> has spiked following late-night filings in the KL corridor.
                          </p>
                          <div className="p-4 bg-zinc-900 rounded-lg border border-zinc-800">
                            <p className="text-[10px] font-black uppercase text-zinc-500 mb-2">Regional Benchmark Velocity</p>
                            <div className="flex items-end gap-2 text-5xl font-black text-wired-neon tabular-nums">
                              +14.2 <span className="text-sm text-zinc-600 mb-2 font-mono uppercase tracking-tighter">Bps / Hr</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-zinc-900/50 border border-dashed border-zinc-800 rounded-2xl p-8 text-center group hover:border-wired-neon/50 transition-colors cursor-pointer">
                        <p className="text-[10px] font-black uppercase text-zinc-500 mb-4 tracking-[0.4em]">Premium Intelligence</p>
                        <p className="text-xs font-bold text-zinc-400 mb-8 leading-relaxed">Unlock the full Capital Table analysis & Sovereign Wealth flow database.</p>
                        <button className="w-full py-4 bg-white text-black rounded font-black uppercase tracking-[0.2em] text-[10px] hover:bg-zinc-200 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]">Subscribe Terminal</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {(activePod === 'SOVEREIGN' || activePod === 'SENTINEL' || activePod === 'AUDIT') && (
                <IngestPanel onReportGenerated={setCurrentReport} />
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
