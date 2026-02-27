
import React, { useState } from 'react';
import { IntelligenceReport } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Shield, Target, Search, DollarSign, Globe2, ChevronRight, Download, Share2, Quote, BrainCircuit, TrendingUp, Rocket, Loader2, AlertTriangle, RefreshCcw } from 'lucide-react';
import { handleEditorialReview } from '../services/editor';
import { handleLocalization } from '../services/bureau';
import { handleAudit } from '../services/auditor';
import { handleEditorialArchitecture } from '../services/editorialArchitect';

interface AnalysisReportProps {
  report: IntelligenceReport;
  onReset: () => void;
}

const AnalysisReport: React.FC<AnalysisReportProps> = ({ report: initialReport, onReset }) => {
  const [report, setReport] = useState(initialReport);
  const [activeTab, setActiveTab] = useState<'MASTER' | 'SOVEREIGN' | 'SENTINEL' | 'REVENUE' | 'PUBLISHED'>('MASTER');
  const [isPublishing, setIsPublishing] = useState(false);
  const [isLocalizing, setIsLocalizing] = useState(false);
  const [auditError, setAuditError] = useState<string | null>(null);

  const chartData = report.blueprint.sectorTrends.map(t => ({
    name: t.sector,
    value: Math.random() * 100,
    momentum: t.momentum
  }));

  const handlePublish = async () => {
    setIsPublishing(true);
    setAuditError(null);
    try {
      const article = await handleEditorialReview(report);
      
      // Editorial Architecture Step
      const editorial = await handleEditorialArchitecture({ ...report, publishedArticle: article });
      
      // Compliance Audit Step
      const tempReport = { 
        ...report, 
        publishedArticle: article,
        editorialContent: editorial
      };
      const auditPassed = await handleAudit(tempReport);
      
      if (!auditPassed) {
        setAuditError('HARD-KILL TRIGGERED: Internal metrics or sensitive data detected in public manuscript. Triggering Refactor Signal to Scribe.');
        setReport({ ...report, auditPassed: false });
        return;
      }

      setReport({ ...tempReport, auditPassed: true });
      setActiveTab('PUBLISHED');
    } catch (error) {
      console.error('Failed to publish article:', error);
      setAuditError('System error during publishing pipeline.');
    } finally {
      setIsPublishing(false);
    }
  };

  const handleLocalize = async () => {
    setIsLocalizing(true);
    try {
      const drafts = await handleLocalization(report);
      setReport({ ...report, localizedDrafts: drafts });
    } catch (error) {
      console.error('Failed to localize article:', error);
    } finally {
      setIsLocalizing(false);
    }
  };

  const dispatchItems = [
    {
      icon: TrendingUp,
      label: 'Alpha Score',
      value: report.dispatchSummary.alphaScore.toFixed(1),
      bgColor: 'bg-wired-neon/10',
      textColor: 'text-wired-neon',
      borderColor: 'border-wired-neon/20'
    },
    {
      icon: BrainCircuit,
      label: 'B2B Relevance',
      value: report.dispatchSummary.b2bRelevance,
      bgColor: 'bg-blue-500/10',
      textColor: 'text-blue-400',
      borderColor: 'border-blue-500/20'
    },
    {
      icon: Rocket,
      label: 'Exit Potential',
      value: report.dispatchSummary.exitPotential,
      bgColor: 'bg-purple-500/10',
      textColor: 'text-purple-400',
      borderColor: 'border-purple-500/20'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-6 border-b border-zinc-800 pb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className={`text-[10px] font-black px-2 py-0.5 uppercase tracking-widest ${report.signalClassification?.category === 'Lead Thesis' ? 'bg-yellow-400 text-black' : 'bg-white text-black'}`}>
              {report.signalClassification?.category || 'Feature Story'}
            </span>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Sovereign Intel Ops // SEA-2025</span>
            {report.signalClassification?.requiresBenchmarkSynthesis && (
              <span className="text-[10px] font-black bg-red-500 text-white px-2 py-0.5 uppercase tracking-widest animate-pulse">
                MY BENCHMARK
              </span>
            )}
          </div>
          <div className="flex gap-4">
            <button onClick={onReset} className="px-4 py-2 text-[10px] font-black uppercase tracking-widest border border-zinc-800 rounded hover:bg-zinc-900 transition-colors">Discard Draft</button>
            <button 
              onClick={handlePublish}
              disabled={isPublishing || report.signalClassification?.category !== 'Lead Thesis'}
              className="px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-wired-neon text-black rounded hover:bg-wired-neon/90 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPublishing ? <><Loader2 className="w-3 h-3 animate-spin" /> Publishing...</> : <><Download className="w-3 h-3" /> Publish to Terminal</>}
            </button>
          </div>
        </div>
        <h1 className="text-7xl font-black tracking-tighter leading-[0.9] text-white">
          The Imperial Blueprint: <br/>
          <span className="text-wired-neon italic">Regional Benchmarking</span> & Exit Velocity
        </h1>
      </div>

      {/* Compliance Audit Error Banner */}
      {auditError && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 animate-in zoom-in-95 duration-300">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-red-500 rounded-full">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter mb-2">Hard-Kill Criteria Triggered</h3>
              <p className="text-red-200 font-medium max-w-2xl">{auditError}</p>
            </div>
          </div>
          <button 
            onClick={() => {
              setAuditError(null);
              setReport({ ...report, auditPassed: undefined });
            }}
            className="px-8 py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded hover:bg-zinc-200 transition-colors flex items-center gap-3 whitespace-nowrap"
          >
            <RefreshCcw className="w-4 h-4" /> Trigger Refactor Signal
          </button>
        </div>
      )}

      {/* Dispatch Summary Section */}
      <div className="grid grid-cols-3 gap-6 bg-zinc-950 border border-zinc-800 rounded-2xl p-8">
        {dispatchItems.map((item, index) => (
          <div key={index} className={`p-6 rounded-lg border ${item.borderColor} ${item.bgColor} flex items-center gap-6`}>
            <div className={`p-3 rounded-full bg-black/20`}>
              <item.icon className={`w-6 h-6 ${item.textColor}`} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">{item.label}</p>
              <p className={`text-2xl font-black ${item.textColor} tabular-nums`}>{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-6">
        <div className="flex-1 space-y-12">
          <div className="flex gap-4 p-1 bg-zinc-950 border border-zinc-800 rounded-lg w-fit">
            {[
              { id: 'MASTER', label: 'Internal Draft', icon: Target },
              { id: 'SOVEREIGN', label: 'Macro Thesis', icon: Globe2 },
              { id: 'SENTINEL', label: 'Gov Brief', icon: Shield },
              { id: 'REVENUE', label: 'Commercials', icon: DollarSign },
              ...(report.publishedArticle ? [{ id: 'PUBLISHED', label: 'Published', icon: Share2 }] : [])
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-2 rounded text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${ 
                  activeTab === tab.id ? 'bg-zinc-800 text-wired-neon' : 'text-zinc-600 hover:text-zinc-400' 
                }`}
              >
                <tab.icon className="w-3 h-3" /> {tab.label}
              </button>
            ))}
          </div>

          <div className="min-h-[600px]">
            {activeTab === 'PUBLISHED' && (
              <div className="space-y-12">
                {report.editorialContent && (
                  <div className="grid grid-cols-12 gap-8 bg-white text-black p-12 rounded-2xl border border-zinc-200">
                    {/* Hero Thesis: 8 columns */}
                    <div className="col-span-8 space-y-8">
                      <div className="space-y-4">
                        <span className="text-xs font-black uppercase tracking-widest text-zinc-500">
                          {report.editorialContent.categoryTag}
                        </span>
                        <h2 className="text-6xl font-serif font-black tracking-tight leading-tight">
                          {report.editorialContent.headline}
                        </h2>
                        <p className="text-xl font-medium leading-relaxed text-zinc-800">
                          {report.editorialContent.lede}
                        </p>
                      </div>
                      <div className="prose prose-lg max-w-none border-t border-zinc-100 pt-8">
                        <p className="text-zinc-700 leading-relaxed">
                          {report.publishedArticle}
                        </p>
                      </div>
                    </div>

                    {/* Market Pulse: 4 columns */}
                    <div className="col-span-4 border-l border-zinc-100 pl-8 space-y-8">
                      <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Market Pulse</h3>
                      <div className="space-y-6">
                        {report.blueprint.regionalInsights.map((insight, idx) => (
                          <div key={idx} className="space-y-2 pb-6 border-b border-zinc-50 last:border-0">
                            <span className="text-[10px] font-bold text-wired-neon uppercase">{insight.market}</span>
                            <p className="text-xs font-medium text-zinc-600 leading-snug">
                              {insight.strategy}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Internal Metric Ledger - Hidden from Public */}
                      <div className="mt-12 p-4 bg-zinc-50 border border-zinc-200 rounded-lg">
                        <h4 className="text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-2">--- Terminal Summary (Internal) ---</h4>
                        <p className="text-[10px] font-mono text-zinc-500 leading-relaxed italic">
                          {report.editorialContent.terminalSummary}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="flex gap-4">
                  <button 
                    onClick={handleLocalize}
                    disabled={isLocalizing}
                    className="px-4 py-2 text-[10px] font-black uppercase tracking-widest bg-zinc-900 text-white rounded hover:bg-black transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLocalizing ? <><Loader2 className="w-3 h-3 animate-spin" /> Localizing...</> : <>Localize for all 11 Markets</>}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'MASTER' && (
              <div className="space-y-12">
                <div className="relative">
                  <Quote className="absolute -left-12 top-0 w-10 h-10 text-zinc-800 opacity-50" />
                  <div className="prose prose-invert prose-2xl max-w-none">
                    <p className="text-4xl font-bold leading-tight text-white first-letter:text-8xl first-letter:font-black first-letter:float-left first-letter:mr-4 first-letter:text-wired-neon first-letter:leading-[0.8]">
                      {report.masterDraft}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'SOVEREIGN' && (
              <div className="space-y-12">
                <div className="grid grid-cols-2 gap-6">
                  {Object.entries(report.localizedDrafts).map(([country, text]) => (
                    <div key={country} className="p-8 bg-zinc-950 border border-zinc-800 rounded-2xl group hover:border-zinc-700 transition-colors">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-wired-neon">{country} Edition</span>
                        <div className="w-8 h-[1px] bg-zinc-800" />
                      </div>
                      <p className="text-base text-zinc-400 font-light leading-relaxed">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'SENTINEL' && (
              <div className="space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  <div className="md:col-span-4 bg-zinc-950 border border-zinc-800 rounded-2xl p-10 flex flex-col justify-center items-center">
                    <p className="text-[10px] font-black uppercase text-zinc-500 mb-6 tracking-widest">Governance Resilience</p>
                    <div className="text-8xl font-black text-wired-neon tabular-nums">{report.governance.score}</div>
                    <div className="w-full h-1 bg-zinc-900 mt-8 rounded-full">
                      <div className="h-full bg-wired-neon shadow-[0_0_10px_#00ffaa]" style={{ width: `${report.governance.score}%` }} />
                    </div>
                  </div>
                  <div className="md:col-span-8 bg-zinc-950 border border-zinc-800 rounded-2xl p-10">
                    <h4 className="text-[10px] font-black uppercase text-zinc-500 mb-8 tracking-widest flex items-center gap-2">
                      <Shield className="w-3 h-3 text-red-500" /> Sentinel Risk Matrix
                    </h4>
                    <ul className="grid grid-cols-1 gap-4">
                      {report.governance.riskFactors.map((risk, idx) => (
                        <li key={idx} className="flex items-center gap-4 p-4 bg-zinc-900/30 rounded-lg border border-zinc-800/50 text-sm font-medium text-zinc-300">
                          <span className="text-red-500 font-mono">0{idx + 1}</span>
                          {risk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-10 bg-zinc-950 border border-zinc-800 rounded-2xl">
                  <div className="grid grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">Regulatory Framework (2026)</p>
                      <p className="text-lg text-zinc-200 leading-relaxed font-light italic border-l-2 border-wired-neon pl-6">
                        {report.governance.legalCompliance}
                        <br/>
                        <span className="text-[10px] text-zinc-500 mt-2 block uppercase font-mono tracking-tighter">Compliance: IFRS Sustainability (ISSB) & Full XBRL</span>
                      </p>
                    </div>
                    <div className="space-y-4">
                      <p className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">ESG Sovereignty Status</p>
                      <p className="text-lg text-zinc-200 leading-relaxed font-light border-l-2 border-blue-500 pl-6">{report.governance.esgStatus}</p>
                    </div>
                  </div>
                </div>

                {report.defensibleEvidenceLog && report.defensibleEvidenceLog.length > 0 && (
                  <div className="p-10 bg-zinc-950 border border-zinc-800 rounded-2xl">
                    <h4 className="text-[10px] font-black uppercase text-zinc-500 mb-6 tracking-widest">Defensible Evidence Log</h4>
                    <div className="space-y-4">
                      {report.defensibleEvidenceLog.map((log, idx) => (
                        <div key={idx} className="flex gap-4 p-4 bg-zinc-900/20 border border-zinc-800 rounded-lg">
                          <div className="w-1 h-full bg-wired-neon rounded-full" />
                          <p className="text-sm text-zinc-400 font-mono italic">{log}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'REVENUE' && (
              <div className="space-y-12">
                <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-12">
                  <div className="flex items-center gap-4 mb-10">
                    <Search className="text-wired-neon w-8 h-8" />
                    <h3 className="text-3xl font-black tracking-tight uppercase italic">SEO Forensic Evidence</h3>
                  </div>
                  <div className="p-8 bg-black rounded-lg border border-zinc-900 font-mono text-xs leading-relaxed text-zinc-500 overflow-x-auto whitespace-pre-wrap">
                    {report.seoForensic}
                  </div>
                </div>

                <div className="bg-wired-neon text-black rounded-2xl p-12 relative overflow-hidden group shadow-[0_0_40px_rgba(0,255,170,0.1)]">
                  <div className="absolute -top-12 -right-12 p-8 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                    <DollarSign className="w-64 h-64" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-4xl font-black mb-6 uppercase tracking-tighter">Exit Strategy & Monetization</h3>
                    <p className="text-2xl font-bold leading-tight mb-10 opacity-90 max-w-2xl">
                      {report.revenueStrategy}
                    </p>
                    <div className="flex gap-4">
                      <button className="bg-black text-white px-10 py-4 rounded font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-zinc-900 transition-colors">
                        Deploy Premium Terminal Access <ChevronRight className="w-4 h-4" />
                      </button>
                      <button className="bg-white/20 text-black border border-black/10 px-10 py-4 rounded font-black uppercase tracking-widest text-xs hover:bg-white/30 transition-colors">
                        Share with L.P. Network
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-80 shrink-0 space-y-6">
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8">
            <h4 className="text-[10px] font-black uppercase text-zinc-500 mb-8 tracking-[0.2em] border-b border-zinc-900 pb-4">Imperial Benchmarks</h4>
            <div className="space-y-8">
              {report.blueprint.sectorTrends.map((trend, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-xs font-black text-white uppercase tracking-tighter">{trend.sector}</span>
                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded border ${ 
                      trend.momentum.toLowerCase().includes('bullish') ? 'bg-wired-neon/10 text-wired-neon border-wired-neon/20' : 'bg-zinc-900 text-zinc-500 border-zinc-800' 
                    }`}>
                      {trend.momentum}
                    </span>
                  </div>
                  <div className="h-0.5 bg-zinc-900 rounded-full overflow-hidden">
                    <div className="h-full bg-wired-neon shadow-[0_0_8px_#00ffaa]" style={{ width: `${Math.random() * 60 + 40}%` }} />
                  </div>
                  <p className="text-[10px] text-zinc-600 font-mono italic leading-tight">{trend.benchmark}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-6">
              <Share2 className="w-4 h-4 text-zinc-500" />
              <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">Distribution Nodes</span>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <button className="text-left px-4 py-3 rounded border border-zinc-900 hover:border-wired-neon/50 hover:bg-zinc-900 transition-all text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white">
                Institutional Slack
              </button>
              <button className="text-left px-4 py-3 rounded border border-zinc-900 hover:border-wired-neon/50 hover:bg-zinc-900 transition-all text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white">
                Private Equity Portal
              </button>
              <button className="text-left px-4 py-3 rounded border border-zinc-900 hover:border-wired-neon/50 hover:bg-zinc-900 transition-all text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white">
                Journal Archive
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisReport;
