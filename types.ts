
export type AnalysisPod = 'TRIAGE' | 'SOVEREIGN' | 'SENTINEL' | 'AUDIT';

export interface NewsLead {
  id: string;
  source: string;
  headline: string;
  relevance: number;
  marketImpact: 'Low' | 'Medium' | 'High' | 'Extreme';
  exitPotential: string;
  timestamp: string;
}

export interface ImperialBlueprint {
  thesis: string;
  sectorTrends: {
    sector: string;
    momentum: string;
    benchmark: string;
  }[];
  regionalInsights: {
    market: string;
    strategy: string;
  }[];
}

export interface GovernanceScore {
  score: number;
  legalCompliance: string;
  esgStatus: string;
  riskFactors: string[];
}

export interface DispatchSummary {
  alphaScore: number; // Predictive ROI (1-10)
  b2bRelevance: string; // Strategic impact on Vertical AI or Fintech
  exitPotential: 'IPO' | 'Secondary' | 'M&A'; // Categorization
}

export type SignalCategory = 'Market Pulse' | 'Lead Thesis' | 'Governance Brief';

export interface SignalClassification {
  category: SignalCategory;
  requiresBenchmarkSynthesis: boolean;
}

export interface IntelligenceReport {
  dispatchSummary: DispatchSummary;
  signalClassification?: SignalClassification;
  publishedArticle?: string;
  auditPassed?: boolean;
  defensibleEvidenceLog?: string[];
  editorialContent?: {
    headline: string;
    lede: string;
    categoryTag: string;
    terminalSummary: string; // Hidden from public
  };
  masterDraft: string;
  localizedDrafts: Record<string, string>;
  revenueStrategy: string;
  seoForensic: string;
  governance: GovernanceScore;
  blueprint: ImperialBlueprint;
}
