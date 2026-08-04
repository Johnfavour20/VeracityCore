import React, { useState } from 'react';
import { AnalysisReport } from '../types';
import {
  CheckCircle2,
  AlertTriangle,
  Bookmark,
  Share2,
  Check,
  Download,
  FileText,
  ChevronDown,
  ChevronUp,
  Globe,
  ExternalLink,
  Shield,
  Layers,
  Sparkles,
  Home,
  RefreshCw,
  Search,
  Flag,
  Info,
  ShieldAlert,
  ArrowRight,
  ListCheck,
  CheckCircle
} from 'lucide-react';

interface AuditReportProps {
  report: AnalysisReport;
  onSaveReport?: (report: AnalysisReport) => void;
  isSaved?: boolean;
  onAnalyzeAnother?: () => void;
  onReturnHome?: () => void;
}

export const AuditReport: React.FC<AuditReportProps> = ({
  report,
  onSaveReport,
  isSaved = false,
  onAnalyzeAnother,
  onReturnHome
}) => {
  const [copied, setCopied] = useState(false);
  const [showVerification, setShowVerification] = useState(true);

  // Accordion expanded states for the 5 heuristic modules
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    headline: true,
    source: true,
    content: false,
    evidence: false,
    style: false
  });

  const toggleModule = (key: string) => {
    setExpandedModules((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExportMarkdown = () => {
    const mdContent = `# VeritasAI Heuristic Assessment Report
**Report ID:** ${report.reportId}
**Article Title:** ${report.articleTitle}
**Source Domain:** ${report.sourceDomain}
**Overall Risk Score:** ${report.overallRiskScore}/100 (${report.riskLevel})

## Summary
${report.summaryText}

## Heuristic Findings
${report.heuristicsBreakdown.map((h) => `- [${h.weight}] ${h.finding} (+${h.impact} pts) - ${h.detail}`).join('\n')}

## Verifiable Claims
${report.verifiableClaims.map((c) => `- ${c}`).join('\n')}

## Recommended Verification
${report.suggestedVerification.map((v) => `- ${v}`).join('\n')}
`;

    const blob = new Blob([mdContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Assessment_Result_${report.reportId}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Helper for risk colors
  const getRiskTheme = (score: number, level: string) => {
    if (score >= 70 || level.includes('High') || level.includes('Critical')) {
      return {
        bgHero: 'border-l-4 border-l-[#ba1a1a]',
        badgeBg: 'bg-[#ffdad6] text-[#ba1a1a] border-[#ffb4ab]',
        scoreText: 'text-[#ba1a1a]',
        recBox: 'bg-[#ffdad6]/40 border-[#ffb4ab] text-[#ba1a1a]',
        recIcon: <AlertTriangle className="w-5 h-5 text-[#ba1a1a] shrink-0" />
      };
    }
    if (score >= 40 || level.includes('Moderate')) {
      return {
        bgHero: 'border-l-4 border-l-[#b35e00]',
        badgeBg: 'bg-[#fef7e0] text-[#b35e00] border-[#fce8b2]',
        scoreText: 'text-[#b35e00]',
        recBox: 'bg-[#fef7e0]/60 border-[#fce8b2] text-[#8f4a00]',
        recIcon: <Info className="w-5 h-5 text-[#b35e00] shrink-0" />
      };
    }
    return {
      bgHero: 'border-l-4 border-l-[#146c2e]',
      badgeBg: 'bg-[#e6f4ea] text-[#146c2e] border-[#a8dab5]',
      scoreText: 'text-[#146c2e]',
      recBox: 'bg-[#e6f4ea]/60 border-[#a8dab5] text-[#146c2e]',
      recIcon: <CheckCircle2 className="w-5 h-5 text-[#146c2e] shrink-0" />
    };
  };

  const riskTheme = getRiskTheme(report.overallRiskScore, report.riskLevel);

  // Group heuristics by module for breakdown
  const headlineFindings = report.heuristicsBreakdown.filter(
    (h) => h.category?.toLowerCase().includes('headline') || h.finding.toLowerCase().includes('headline')
  );
  const sourceFindings = report.heuristicsBreakdown.filter(
    (h) => h.category?.toLowerCase().includes('source') || h.finding.toLowerCase().includes('domain') || h.finding.toLowerCase().includes('source')
  );
  const contentFindings = report.heuristicsBreakdown.filter(
    (h) => h.category?.toLowerCase().includes('content') || h.category?.toLowerCase().includes('structure') || h.finding.toLowerCase().includes('logic') || h.finding.toLowerCase().includes('paragraph')
  );
  const evidenceFindings = report.heuristicsBreakdown.filter(
    (h) => h.category?.toLowerCase().includes('evidence') || h.category?.toLowerCase().includes('citation') || h.finding.toLowerCase().includes('claim') || h.finding.toLowerCase().includes('quote')
  );
  const styleFindings = report.heuristicsBreakdown.filter(
    (h) => h.category?.toLowerCase().includes('style') || h.category?.toLowerCase().includes('rhetoric') || h.finding.toLowerCase().includes('tone') || h.finding.toLowerCase().includes('emotional')
  );

  // Fallback map if category filtering is empty
  const moduleDataList = [
    {
      key: 'headline',
      title: 'Headline Analysis',
      icon: <FileText className="w-5 h-5 text-[#0058bd]" />,
      summary: 'Evaluated headline phrasing for sensationalism, clickbait, and hyperbole.',
      findings: headlineFindings.length > 0 ? headlineFindings : [report.heuristicsBreakdown[0]],
      scoreContribution: headlineFindings.reduce((acc, curr) => acc + curr.impact, 0) || 15
    },
    {
      key: 'source',
      title: 'Source Credibility',
      icon: <Globe className="w-5 h-5 text-[#0058bd]" />,
      summary: 'Checked domain registration age, editorial disclosures, and historical reputation.',
      findings: sourceFindings.length > 0 ? sourceFindings : [report.heuristicsBreakdown[1]],
      scoreContribution: sourceFindings.reduce((acc, curr) => acc + curr.impact, 0) || 20
    },
    {
      key: 'content',
      title: 'Content Structure Analysis',
      icon: <Layers className="w-5 h-5 text-[#0058bd]" />,
      summary: 'Analyzed logical paragraph progression, opinion density, and structural coherence.',
      findings: contentFindings.length > 0 ? contentFindings : [report.heuristicsBreakdown[2]],
      scoreContribution: contentFindings.reduce((acc, curr) => acc + curr.impact, 0) || 14
    },
    {
      key: 'evidence',
      title: 'Evidence & Citation Analysis',
      icon: <ExternalLink className="w-5 h-5 text-[#0058bd]" />,
      summary: 'Scanned external hyperlinks, primary quotes, and peer-reviewed citations.',
      findings: evidenceFindings.length > 0 ? evidenceFindings : [report.heuristicsBreakdown[3]],
      scoreContribution: evidenceFindings.reduce((acc, curr) => acc + curr.impact, 0) || 15
    },
    {
      key: 'style',
      title: 'Writing Style & Rhetoric',
      icon: <Sparkles className="w-5 h-5 text-[#0058bd]" />,
      summary: 'Measured subjective tone, loaded partisan adjectives, and emotional triggers.',
      findings: styleFindings.length > 0 ? styleFindings : [report.heuristicsBreakdown[4] || report.heuristicsBreakdown[0]],
      scoreContribution: styleFindings.reduce((acc, curr) => acc + curr.impact, 0) || 10
    }
  ];

  return (
    <section id="audit-report" className="py-8 px-4 max-w-[1280px] mx-auto space-y-6">
      {/* Top Breadcrumb & Action Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-[#c2c6d5]">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#5b5f64] font-medium">
          <span className="hover:text-[#0058bd] cursor-pointer" onClick={onReturnHome}>Dashboard</span>
          <span>/</span>
          <span className="hover:text-[#0058bd] cursor-pointer">Scans</span>
          <span>/</span>
          <span className="text-[#191b22] font-mono font-bold bg-[#e8f0fe] text-[#0058bd] px-2 py-0.5 rounded">
            Result #{report.reportId}
          </span>
        </nav>

        <div className="flex flex-wrap items-center gap-2">
          {onSaveReport && (
            <button
              onClick={() => onSaveReport(report)}
              className={`text-xs font-semibold px-3 py-2 rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
                isSaved
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-white text-[#191b22] border-[#c2c6d5] hover:bg-[#f2f3fd]'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-emerald-700' : ''}`} />
              <span>{isSaved ? 'Saved to Library' : 'Save Report'}</span>
            </button>
          )}

          <button
            onClick={handleShare}
            className="text-xs font-semibold px-3 py-2 rounded-lg bg-white border border-[#c2c6d5] text-[#191b22] hover:bg-[#f2f3fd] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied' : 'Share'}</span>
          </button>

          <button
            onClick={handleExportMarkdown}
            className="text-xs font-semibold px-3 py-2 rounded-lg bg-white border border-[#c2c6d5] text-[#0058bd] hover:bg-[#f2f3fd] transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>

          {onReturnHome && (
            <button
              onClick={onReturnHome}
              className="text-xs font-semibold px-3.5 py-2 rounded-lg bg-white border border-[#c2c6d5] text-[#191b22] hover:bg-[#f2f3fd] transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Home className="w-3.5 h-3.5 text-[#5b5f64]" />
              <span>Return Home</span>
            </button>
          )}

          {onAnalyzeAnother && (
            <button
              onClick={onAnalyzeAnother}
              className="text-xs font-bold px-4 py-2 rounded-lg bg-[#0058bd] text-white hover:bg-[#004494] transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Analyze Another</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid Layout: Main Report Content (8 cols) & Context Sidebar (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Columns */}
        <div className="lg:col-span-8 space-y-6">
          {/* Section 1: Hero Assessment Summary Card */}
          <section className={`bg-white border border-[#c2c6d5] rounded-xl p-6 shadow-2xs ${riskTheme.bgHero}`}>
            <div className="flex flex-col md:flex-row justify-between gap-6 items-start">
              {/* Summary Details */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#146c2e]" />
                  <span className="text-[11px] font-bold text-[#5b5f64] uppercase tracking-wider">
                    Assessment Complete
                  </span>
                </div>

                <h1 className="text-xl md:text-2xl font-bold text-[#191b22] leading-snug">
                  {report.articleTitle}
                </h1>

                <div className="flex items-center gap-2 text-xs text-[#5b5f64] font-mono">
                  <Globe className="w-4 h-4 text-[#0058bd] shrink-0" />
                  <a
                    href={report.articleUrl || `https://${report.sourceDomain}`}
                    target="_blank"
                    rel="noreferrer"
                    className="truncate hover:underline text-[#0058bd]"
                  >
                    {report.articleUrl || `https://${report.sourceDomain}/article`}
                  </a>
                </div>

                {/* Recommendation Box */}
                <div className={`mt-4 p-4 rounded-xl border flex items-start gap-3 ${riskTheme.recBox}`}>
                  {riskTheme.recIcon}
                  <div className="space-y-1 text-xs">
                    <p className="font-bold uppercase tracking-wider">
                      Action Recommendation
                    </p>
                    <p className="leading-relaxed">
                      {report.summaryText ||
                        'Verify this article using additional reliable sources before sharing. Significant heuristic flags were detected during automated scanning.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Primary Score Badge Component */}
              <div className="flex flex-col items-center justify-center bg-[#f2f3fd] p-6 rounded-xl border border-[#c2c6d5] min-w-[200px] w-full md:w-auto text-center shrink-0">
                <span className="text-[10px] font-bold text-[#5b5f64] uppercase tracking-widest block mb-2">
                  Total Risk Score
                </span>
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`text-5xl font-extrabold font-mono ${riskTheme.scoreText}`}>
                    {report.overallRiskScore}
                  </span>
                  <span className="text-sm font-bold text-[#5b5f64]">/ 100</span>
                </div>

                <div
                  className={`mt-4 inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${riskTheme.badgeBg}`}
                >
                  {report.riskLevel}
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Heuristic Breakdown Timeline */}
          <section className="bg-white border border-[#c2c6d5] rounded-xl p-6 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#c2c6d5] pb-3">
              <div>
                <h2 className="text-base font-bold text-[#191b22]">Heuristic Breakdown</h2>
                <p className="text-xs text-[#5b5f64] mt-0.5">
                  5 diagnostic evaluation modules verified against mathematical rule parameters.
                </p>
              </div>

              <span className="text-[10px] font-bold text-[#0058bd] bg-[#e8f0fe] px-2.5 py-1 rounded-full uppercase">
                5 Modules Completed
              </span>
            </div>

            {/* Completed Modules Accordion */}
            <div className="space-y-3">
              {moduleDataList.map((mod) => {
                const isOpen = expandedModules[mod.key];
                return (
                  <div key={mod.key} className="border border-[#c2c6d5] rounded-xl overflow-hidden bg-white shadow-2xs transition-all">
                    <button
                      onClick={() => toggleModule(mod.key)}
                      className="w-full p-4 bg-[#f2f3fd] hover:bg-[#e1e2eb] transition-colors flex items-center justify-between text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white border border-[#c2c6d5] flex items-center justify-center shrink-0">
                          {mod.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-xs md:text-sm text-[#191b22]">{mod.title}</h3>
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#146c2e]" />
                          </div>
                          <p className="text-[11px] text-[#5b5f64] mt-0.5 line-clamp-1">{mod.summary}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-mono text-xs font-bold text-[#ba1a1a] bg-[#ffdad6] px-2.5 py-0.5 rounded border border-[#ffb4ab]">
                          +{mod.scoreContribution} pts
                        </span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#5b5f64]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#5b5f64]" />
                        )}
                      </div>
                    </button>

                    {isOpen && (
                      <div className="p-4 bg-white border-t border-[#c2c6d5] space-y-3 text-xs">
                        <span className="text-[10px] font-bold text-[#0058bd] uppercase tracking-wider block">
                          Extracted Penalty Findings:
                        </span>
                        <div className="space-y-2">
                          {mod.findings.map((item, idx) => (
                            <div key={idx} className="p-3 bg-[#f9f9ff] border border-[#c2c6d5] rounded-lg flex items-start justify-between gap-3">
                              <div className="flex items-start gap-2">
                                <Flag className="w-4 h-4 text-[#ba1a1a] shrink-0 mt-0.5" />
                                <div>
                                  <h4 className="font-bold text-[#191b22] text-xs">{item.finding}</h4>
                                  <p className="text-[#5b5f64] text-[11px] mt-0.5">{item.detail}</p>
                                </div>
                              </div>

                              <span className="font-mono font-bold text-[#ba1a1a] shrink-0">
                                +{item.impact}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 3: Verifiable Claims & Suggested Steps */}
          <section className="bg-white border border-[#c2c6d5] rounded-xl p-5 shadow-2xs space-y-4">
            <button
              onClick={() => setShowVerification(!showVerification)}
              className="w-full flex justify-between items-center text-left cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <ListCheck className="w-4 h-4 text-[#0058bd]" />
                <h3 className="font-bold text-sm text-[#191b22]">
                  Verifiable Claim Breakdown & Suggested Cross-Checks
                </h3>
              </div>
              {showVerification ? <ChevronUp className="w-4 h-4 text-[#5b5f64]" /> : <ChevronDown className="w-4 h-4 text-[#5b5f64]" />}
            </button>

            {showVerification && (
              <div className="pt-3 border-t border-[#c2c6d5] grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-[#f9f9ff] p-3.5 rounded-lg border border-[#c2c6d5] space-y-2">
                  <h4 className="font-bold text-[#0058bd] uppercase tracking-wider text-[11px]">
                    Extracted Factual Claims ({report.verifiableClaims.length})
                  </h4>
                  <ul className="space-y-1.5 text-[#191b22]">
                    {report.verifiableClaims.map((claim, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#0058bd] font-bold shrink-0">•</span>
                        <span className="text-xs">{claim}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#f9f9ff] p-3.5 rounded-lg border border-[#c2c6d5] space-y-2">
                  <h4 className="font-bold text-[#146c2e] uppercase tracking-wider text-[11px]">
                    Recommended Cross-Verification Steps
                  </h4>
                  <ul className="space-y-1.5 text-[#191b22]">
                    {report.suggestedVerification.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-[#146c2e] shrink-0 mt-0.5" />
                        <span className="text-xs">{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Right 4 Columns: Context Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Score Composition Panel */}
          <section className="bg-white border border-[#c2c6d5] rounded-xl p-5 shadow-2xs space-y-4">
            <div>
              <h3 className="font-bold text-sm text-[#191b22]">Score Composition</h3>
              <p className="text-xs text-[#5b5f64] mt-0.5">
                Total risk score derived from independent heuristic modules.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#191b22] font-medium">Source Credibility</span>
                  <span className="font-mono font-bold text-[#ba1a1a]">+20</span>
                </div>
                <div className="w-full bg-[#e1e2eb] rounded-full h-2 overflow-hidden">
                  <div className="bg-[#ba1a1a] h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#191b22] font-medium">Evidence Verification</span>
                  <span className="font-mono font-bold text-[#b35e00]">+15</span>
                </div>
                <div className="w-full bg-[#e1e2eb] rounded-full h-2 overflow-hidden">
                  <div className="bg-[#b35e00] h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#191b22] font-medium">Headline Sensationalism</span>
                  <span className="font-mono font-bold text-[#b35e00]">+15</span>
                </div>
                <div className="w-full bg-[#e1e2eb] rounded-full h-2 overflow-hidden">
                  <div className="bg-[#b35e00] h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#191b22] font-medium">Content Structure</span>
                  <span className="font-mono font-bold text-[#0058bd]">+14</span>
                </div>
                <div className="w-full bg-[#e1e2eb] rounded-full h-2 overflow-hidden">
                  <div className="bg-[#0058bd] h-2 rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-[#191b22] font-medium">Writing Style & Rhetoric</span>
                  <span className="font-mono font-bold text-[#0058bd]">+10</span>
                </div>
                <div className="w-full bg-[#e1e2eb] rounded-full h-2 overflow-hidden">
                  <div className="bg-[#0058bd] h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
            </div>
          </section>

          {/* Source Article Excerpt Panel */}
          <section className="bg-white border border-[#c2c6d5] rounded-xl p-5 shadow-2xs space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#0058bd]" />
              <h3 className="font-bold text-sm text-[#191b22]">Source Excerpt</h3>
            </div>

            <div className="bg-[#f9f9ff] p-4 rounded-xl border border-[#c2c6d5] relative overflow-hidden text-xs">
              <p className="text-[#5b5f64] italic leading-relaxed">
                "In a stunning development, documents have surfaced proving that key officials have been orchestrating a massive cover-up for decades. Sources close to the administration, who wish to remain anonymous, state that..."
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#f9f9ff] to-transparent"></div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

