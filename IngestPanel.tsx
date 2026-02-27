
import React, { useState } from 'react';
import { Send, Loader2, FileText, Zap } from 'lucide-react';
import { handleCyborgIngest } from '../services/gemini';
import { handleAnalystReview } from '../services/analyst';
import { IntelligenceReport } from '../types';

interface IngestPanelProps {
  onReportGenerated: (report: IntelligenceReport) => void;
}

const IngestPanel: React.FC<IngestPanelProps> = ({ onReportGenerated }) => {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('Idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    setStatus('Scouting...');
    try {
      const scoutReport = await handleCyborgIngest(input);
      
      setStatus('Analyzing...');
      const classification = await handleAnalystReview(scoutReport);
      
      const finalReport = {
        ...scoutReport,
        signalClassification: classification
      };

      onReportGenerated(finalReport);

    } catch (error) {
      console.error('Ingestion pipeline failed:', error);
      setStatus('Error');
    } finally {
      setIsLoading(false);
      setStatus('Idle');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-wired-neon/10 border border-wired-neon/20 rounded-full mb-4">
          <Zap className="w-3 h-3 text-wired-neon" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-wired-neon">Cyborg Ingest v4.0</span>
        </div>
        <h2 className="text-5xl font-black tracking-tighter mb-4">Synthesize Raw Intelligence.</h2>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Inject raw SSM filings, ACRA data, or regional news leads. Our neural architecture generates data-dense, 
          provocative insights optimized for the Premium Terminal.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-wired-neon/20 to-blue-500/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-6 py-4 bg-zinc-950/50 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-zinc-500" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Raw Input Stream</span>
            </div>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-zinc-800" />
              <div className="w-2 h-2 rounded-full bg-zinc-800" />
              <div className="w-2 h-2 rounded-full bg-zinc-800" />
            </div>
          </div>
          
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste filing data, news leads, or market rumors here..."
            className="w-full h-64 bg-transparent p-8 text-lg font-mono placeholder:text-zinc-700 focus:outline-none resize-none"
          />

          <div className="p-6 bg-zinc-950/50 border-t border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <p className="text-[10px] font-mono text-zinc-600 uppercase">Status: {status}</p>
            </div>
            
            <button
              disabled={isLoading || !input.trim()}
              className="bg-white text-black hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 rounded-lg font-black uppercase tracking-widest text-xs flex items-center gap-3 transition-all transform hover:scale-[1.02] active:scale-95"
            >
              {isLoading ? (
                <>{status} <Loader2 className="w-4 h-4 animate-spin" /></>
              ) : (
                <>Deploy Intelligence <Send className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </div>
      </form>

      <div className="mt-12 grid grid-cols-3 gap-6 opacity-40">
        <div className="p-4 border border-zinc-800 rounded-lg bg-zinc-950">
          <p className="text-[10px] font-bold text-zinc-600 mb-2 tracking-widest uppercase">Target Alpha</p>
          <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
            <div className="h-full bg-wired-neon w-2/3" />
          </div>
        </div>
        <div className="p-4 border border-zinc-800 rounded-lg bg-zinc-950">
          <p className="text-[10px] font-bold text-zinc-600 mb-2 tracking-widest uppercase">Regional Signal</p>
          <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 w-1/2" />
          </div>
        </div>
        <div className="p-4 border border-zinc-800 rounded-lg bg-zinc-950">
          <p className="text-[10px] font-bold text-zinc-600 mb-2 tracking-widest uppercase">Gov Velocity</p>
          <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 w-3/4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IngestPanel;
