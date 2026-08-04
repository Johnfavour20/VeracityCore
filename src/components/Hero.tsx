import React from 'react';
import { AnalysisReport, SampleArticle } from '../types';
import { SAMPLE_ARTICLES } from '../data/samples';
import { ShieldAlert, AlertTriangle, CheckCircle2, Calculator, Eye, ScrollText, Sparkles } from 'lucide-react';

interface HeroProps {
  onOpenAnalyzer: () => void;
  activeReport: AnalysisReport;
  onSelectSample: (sample: SampleArticle) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenAnalyzer,
  activeReport,
  onSelectSample,
}) => {
  const getRiskScoreColor = (score: number) => {
    if (score >= 76) return 'bg-[#ffdad6] border-[#93000a] text-[#93000a]';
    if (score >= 51) return 'bg-[#ffdad6] border-[#ba1a1a] text-[#93000a]';
    if (score >= 26) return 'bg-[#fef7e0] border-[#b38a00] text-[#7a5e00]';
    return 'bg-[#d3e3fd] border-[#0b57d0] text-[#0b57d0]';
  };

  return (
    <section className="py-12 md:py-16 px-4 max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden">
      <div className="absolute inset-0 pipeline-bg opacity-30 pointer-events-none -z-10"></div>

      {/* Left Column: Content */}
      <div className="flex-1 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e7e7f1] text-[#0058bd] text-xs font-semibold mb-4 border border-[#c2c6d5]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Transparent Epistemic Credibility Engine</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#191b22] mb-4 leading-tight">
          Detect misleading news before it spreads.
        </h1>

        <p className="text-lg text-[#5b5f64] mb-8 max-w-xl leading-relaxed">
          Our heuristic analysis engine provides transparent risk assessments to help you evaluate news credibility and navigate information environments with confidence.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <button
            onClick={onOpenAnalyzer}
            className="font-semibold text-base text-white bg-[#0058bd] hover:bg-[#004494] rounded-lg px-6 py-3 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
          >
            <span>Analyze Article</span>
          </button>

          <a
            href="#how-it-works"
            className="font-semibold text-base text-[#0058bd] border border-[#0058bd] bg-transparent rounded-lg px-6 py-3 hover:bg-[#e1e2eb] transition-all shadow-xs text-center flex items-center justify-center"
          >
            Learn How It Works
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap gap-6 items-center text-[#5b5f64] border-t border-[#c2c6d5] pt-6">
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <Calculator className="w-4 h-4 text-[#0058bd]" />
            <span>Explainable Scoring</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-medium">
            <Eye className="w-4 h-4 text-[#0058bd]" />
            <span>Transparent Reports</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-medium">
            <ScrollText className="w-4 h-4 text-[#0058bd]" />
            <span>Rule-Based Assessment</span>
          </div>
        </div>
      </div>

      {/* Right Column: Live Analysis Preview Card */}
      <div className="flex-1 w-full max-w-md mx-auto">
        <div className="bg-white border border-[#c2c6d5] rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow relative">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-code text-[11px] font-semibold text-[#0058bd] uppercase tracking-widest block">
                LIVE_ANALYSIS_PREVIEW
              </span>
              <span className="text-[10px] font-code bg-[#f2f3fd] text-[#5b5f64] px-2 py-0.5 rounded border border-[#c2c6d5]">
                ID: {activeReport.reportId}
              </span>
            </div>

            <h3 className="font-semibold text-xl text-[#191b22] line-clamp-2">
              {activeReport.articleTitle}
            </h3>
            <p className="text-xs font-mono text-[#5b5f64] mt-1">
              Source: {activeReport.sourceDomain}
            </p>
          </div>

          {/* Module Checklist */}
          <div className="flex flex-col gap-2 mb-6">
            {activeReport.modules.map((m, idx) => (
              <div
                key={idx}
                className="scanning-pulse flex justify-between items-center p-2.5 bg-[#f2f3fd] rounded-md border border-[#c2c6d5] text-sm font-medium text-[#191b22]"
              >
                <span>{m.name}</span>
                {m.status === 'warning' || m.status === 'alert' ? (
                  <span className="flex items-center text-[#ba1a1a] text-xs gap-1 font-semibold">
                    <AlertTriangle className="w-4 h-4" />
                  </span>
                ) : (
                  <span className="flex items-center text-[#5b5f64] text-xs gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Risk Score Card */}
          <div className={`p-4 border-2 rounded-lg text-center transition-colors ${getRiskScoreColor(activeReport.overallRiskScore)}`}>
            <div className="text-2xl font-bold tracking-tight">
              Risk Score: {activeReport.overallRiskScore}/100
            </div>
            <div className="text-xs font-bold uppercase tracking-widest mt-1">
              {activeReport.riskLevel}
            </div>
          </div>

          {/* Preset Sample Selector inside Card */}
          <div className="mt-4 pt-3 border-t border-[#c2c6d5]">
            <div className="text-[11px] font-semibold text-[#5b5f64] mb-2 uppercase tracking-wider">
              Try Preset Samples:
            </div>
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {SAMPLE_ARTICLES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => onSelectSample(sample)}
                  className={`text-[11px] font-medium px-2.5 py-1 rounded border transition-colors whitespace-nowrap ${
                    activeReport.reportId === sample.presetReport.reportId
                      ? 'bg-[#0058bd] text-white border-[#0058bd]'
                      : 'bg-[#f2f3fd] text-[#424753] border-[#c2c6d5] hover:bg-[#e1e2eb]'
                  }`}
                >
                  {sample.category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
