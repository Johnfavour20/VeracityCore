export interface ModuleCheck {
  name: string;
  status: 'check' | 'warning' | 'alert';
  score: number;
  summary: string;
}

export interface FindingItem {
  finding: string;
  weight: 'Low' | 'Medium' | 'High' | 'Critical';
  impact: number;
  category: string;
  detail: string;
}

export interface AnalysisReport {
  reportId: string;
  articleTitle: string;
  sourceDomain: string;
  overallRiskScore: number;
  riskLevel: 'Low Risk' | 'Moderate Risk' | 'High Risk' | 'Critical Risk';
  modules: ModuleCheck[];
  heuristicsBreakdown: FindingItem[];
  summaryText: string;
  verifiableClaims: string[];
  suggestedVerification: string[];
  timestamp?: string;
  articleUrl?: string;
}

export interface SampleArticle {
  id: string;
  title: string;
  domain: string;
  category: string;
  snippet: string;
  presetReport: AnalysisReport;
}

export interface HeuristicRule {
  id: string;
  name: string;
  category: string;
  defaultWeight: 'Low' | 'Medium' | 'High' | 'Critical';
  basePoints: number;
  description: string;
  enabled: boolean;
  lastUpdated?: string;
}

export type SourceStatus = 'Trusted' | 'Monitored' | 'Under Review' | 'Untrusted';

export interface CredibilitySource {
  id: string;
  name: string;
  domain: string;
  status: SourceStatus;
  dateAdded: string;
  lastUpdated: string;
  enabled: boolean;
  notes: string;
  category?: string;
}

export type RiskLevelType = 'Low' | 'Moderate' | 'High' | 'Critical';

export interface AssessmentRecord {
  id: string;
  articleTitle: string;
  sourceDomain: string;
  articleUrl?: string;
  assessmentDate: string;
  riskScore: number;
  riskLevel: RiskLevelType;
  status: 'Complete' | 'Pending Review' | 'Archived';
  recommendation: string;
  modules: {
    headline: { status: 'check' | 'warning' | 'alert'; score: number; weight: string; summary: string; flags?: string[] };
    source: { status: 'check' | 'warning' | 'alert'; score: number; weight: string; summary: string; flags?: string[] };
    content: { status: 'check' | 'warning' | 'alert'; score: number; weight: string; summary: string; flags?: string[] };
    evidence: { status: 'check' | 'warning' | 'alert'; score: number; weight: string; summary: string; flags?: string[] };
    writingStyle: { status: 'check' | 'warning' | 'alert'; score: number; weight: string; summary: string; flags?: string[] };
  };
  summaryNotes: string;
}

