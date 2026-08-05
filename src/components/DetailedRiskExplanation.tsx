import React, { useState, useEffect } from 'react';
import { AnalysisReport } from '../types';
import {
  FileText,
  Globe,
  Layers,
  ExternalLink,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Info,
  Shield,
  Search,
  ListCheck,
  RefreshCw,
  Home,
  ChevronRight,
  Printer
} from 'lucide-react';

interface DetailedRiskExplanationProps {
  report?: AnalysisReport;
  onReturnToResults?: () => void;
  onAnalyzeAnother?: () => void;
  onReturnHome?: () => void;
}

export const DetailedRiskExplanation: React.FC<DetailedRiskExplanationProps> = ({
  report,
  onReturnToResults,
  onAnalyzeAnother,
  onReturnHome
}) => {
  const [activeSection, setActiveSection] = useState<string>('overview');

  // Fallback default report if none provided
  const reportData = report || {
    reportId: 'VA-2024-8891',
    articleTitle: 'Shocking Discovery Under Antarctica Changes Everything We Know',
    sourceDomain: 'truth-now-antarctica.net',
    articleUrl: 'https://truth-now-antarctica.net/shocking-discovery',
    overallRiskScore: 78,
    riskLevel: 'HIGH RISK',
    analysisDate: '2024-10-24',
    summaryText:
      'Based on the aggregated heuristics, this article exhibits significant hallmarks of synthesized misinformation or highly biased sensationalism. The combination of an unverified, newly registered domain with hyperbolic language and a lack of verifiable citations yields a High Risk classification.',
    heuristicsBreakdown: [
      {
        ruleId: 'H1',
        category: 'Headline Analysis',
        weight: 'High',
        impact: 15,
        finding: 'Sensational wording detected',
        detail:
          'The headline utilizes hyperbole ("Shocking Discovery", "Changes Everything") without concrete factual backing in the primary text.'
      },
      {
        ruleId: 'H2',
        category: 'Source Credibility',
        weight: 'Critical',
        impact: 30,
        finding: 'Unverified Domain',
        detail:
          "Domain 'truth-now-antarctica.net' was registered < 6 months ago. Lacks established masthead or contact information."
      },
      {
        ruleId: 'H3',
        category: 'Content Analysis',
        weight: 'Medium',
        impact: 15,
        finding: 'High Opinion-to-Fact Ratio & Logical Leaps',
        detail: 'Paragraphs 3 and 5 exhibit unbacked assertions and rapid transitions without evidence.'
      },
      {
        ruleId: 'H4',
        category: 'Evidence & Citation',
        weight: 'High',
        impact: 18,
        finding: 'Unsubstantiated Sources & Non-Resolving Links',
        detail: 'Key assertions rely on anonymous hearsay with non-resolving citation links.'
      },
      {
        ruleId: 'H5',
        category: 'Writing Style',
        weight: 'Low',
        impact: 0,
        finding: 'Minimal Rhetorical Bias in Body Text',
        detail: 'Minimal emotional rhetoric in body paragraphs, though biased qualifiers appear in quotes.'
      }
    ],
    verifiableClaims: [
      'Antarctica ice core drilling reached depth of 3,200 meters.',
      'Anonymous researchers claim anomalous thermal readings in Sector 4.'
    ],
    suggestedVerification: [
      'Cross-reference core geological claims with British Antarctic Survey data.',
      'Query WHOIS domain records for registrant credentials.'
    ]
  };

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Shield },
    { id: 'headline', label: 'Headline Analysis', icon: FileText },
    { id: 'source', label: 'Source Credibility', icon: Globe },
    { id: 'content', label: 'Content Analysis', icon: Layers },
    { id: 'evidence', label: 'Evidence & Citation', icon: ExternalLink },
    { id: 'style', label: 'Writing Style', icon: Sparkles },
    { id: 'final', label: 'Final Assessment', icon: ListCheck }
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle scroll active state tracking
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="detailed-explanation" className="min-h-screen bg-[#f8f9fa] text-[#191c1d] flex flex-col lg:flex-row font-sans">
      {/* Sticky Left Navigation Sidebar */}
      <nav className="w-full lg:w-64 bg-white border-b lg:border-b-0 lg:border-r border-[#c1c6d6] flex-col p-4 gap-3 z-20 shrink-0 sticky top-16 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto hidden md:flex">
        <div className="mb-2 pb-3 border-b border-[#c1c6d6]">
          <div className="font-bold text-lg text-[#005bbf]">VeritasAI</div>
          <div className="text-xs text-[#5b5f64] font-medium">Detailed Risk Explanation</div>
        </div>

        <ul className="space-y-1 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#e8f0fe] text-[#005bbf] border-l-4 border-[#005bbf]'
                      : 'text-[#5b5f64] hover:bg-[#edeeef] hover:text-[#191c1d]'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="pt-3 border-t border-[#c1c6d6] space-y-2">
          {onReturnToResults && (
            <button
              onClick={onReturnToResults}
              className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-[#5b5f64] hover:text-[#005bbf] hover:bg-[#edeeef] rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Assessment Results</span>
            </button>
          )}
        </div>
      </nav>

      {/* Center Main Report Canvas */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto space-y-8 max-w-4xl mx-auto w-full">
        {/* Section 1: Overview Card */}
        <section
          id="overview"
          className="bg-white border border-[#c1c6d6] rounded-xl p-6 shadow-2xs scroll-mt-24 relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
            <div>
              <div className="font-mono text-xs font-bold text-[#5b5f64] tracking-wider uppercase mb-1">
                ASSESSMENT ID: #{reportData.reportId} • {reportData.analysisDate || 'OCT 24, 2024'}
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#191c1d] leading-tight mb-2">
                Detailed Risk Assessment Report
              </h1>
              <p className="text-sm text-[#5b5f64] max-w-2xl italic">
                Analyzing: "{reportData.articleTitle}"
              </p>
            </div>

            {/* Risk Badge */}
            <div className="bg-[#ffdad6] text-[#93000a] border border-[#ffb4ab] px-4 py-2.5 rounded-xl font-bold font-mono text-lg flex items-center gap-2 shrink-0">
              <AlertTriangle className="w-5 h-5 text-[#ba1a1a]" />
              <span>{reportData.overallRiskScore}% {reportData.riskLevel}</span>
            </div>
          </div>
        </section>

        {/* Section 2: Headline Analysis */}
        <section
          id="headline"
          className="bg-white border border-[#c1c6d6] rounded-xl p-6 shadow-2xs space-y-4 scroll-mt-24"
        >
          <div className="flex items-start justify-between gap-4 border-b border-[#c1c6d6] pb-4">
            <div className="flex items-start gap-3">
              <div className="bg-[#ffdad6] text-[#ba1a1a] p-2.5 rounded-lg shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#191c1d]">Headline Analysis</h2>
                <p className="text-xs text-[#5b5f64] mt-0.5">
                  Finding: Sensational wording detected.
                </p>
              </div>
            </div>

            <div className="font-mono text-sm font-bold text-[#ba1a1a] bg-[#ffdad6] px-3 py-1 rounded-lg shrink-0">
              +15 Risk Pts
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="bg-[#f8f9fa] p-4 rounded-xl border border-[#c1c6d6]">
              <h3 className="font-bold text-[#5b5f64] uppercase tracking-wider text-[11px] mb-1.5">
                OBSERVATION
              </h3>
              <p className="text-[#191c1d] leading-relaxed">
                The headline utilizes hyperbole ("Shocking Discovery", "Changes Everything") without concrete factual backing in the primary text.
              </p>
            </div>

            <div className="bg-[#f8f9fa] p-4 rounded-xl border border-[#c1c1d6]">
              <h3 className="font-bold text-[#005bbf] uppercase tracking-wider text-[11px] mb-1.5">
                RECOMMENDATION
              </h3>
              <p className="text-[#191c1d] leading-relaxed">
                Consider assessing the article for purely neutral language to determine factual basis apart from clickbait structures.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Source Credibility */}
        <section
          id="source"
          className="bg-white border border-[#c1c6d6] rounded-xl p-6 shadow-2xs space-y-4 scroll-mt-24"
        >
          <div className="flex items-start justify-between gap-4 border-b border-[#c1c6d6] pb-4">
            <div className="flex items-start gap-3">
              <div className="bg-[#ffdad6] text-[#ba1a1a] p-2.5 rounded-lg shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#191c1d]">Source Credibility</h2>
                <p className="text-xs text-[#5b5f64] mt-0.5">
                  Finding: Unverified Domain.
                </p>
              </div>
            </div>

            <div className="font-mono text-sm font-bold text-[#ba1a1a] bg-[#ffdad6] px-3 py-1 rounded-lg shrink-0">
              +30 Risk Pts
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="bg-[#f8f9fa] p-4 rounded-xl border border-[#c1c6d6]">
              <h3 className="font-bold text-[#5b5f64] uppercase tracking-wider text-[11px] mb-1.5">
                REASON & REPUTATION
              </h3>
              <p className="text-[#191c1d] leading-relaxed">
                Domain '{reportData.sourceDomain}' was registered &lt; 6 months ago. Lacks established masthead or contact information.
              </p>
            </div>

            <div className="bg-[#f8f9fa] p-4 rounded-xl border border-[#c1c6d6]">
              <h3 className="font-bold text-[#005bbf] uppercase tracking-wider text-[11px] mb-1.5">
                RECOMMENDATION
              </h3>
              <p className="text-[#191c1d] leading-relaxed">
                Cross-reference core claims with established, reputable scientific or news agencies.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Content Analysis */}
        <section
          id="content"
          className="bg-white border border-[#c1c6d6] rounded-xl p-6 shadow-2xs space-y-4 scroll-mt-24"
        >
          <div className="flex items-start justify-between gap-4 border-b border-[#c1c6d6] pb-4">
            <div className="flex items-start gap-3">
              <div className="bg-[#fef7e0] text-[#b35e00] p-2.5 rounded-lg shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#191c1d]">Content Analysis</h2>
                <p className="text-xs text-[#5b5f64] mt-0.5">
                  Finding: Structural Coherence & Logic Leaps.
                </p>
              </div>
            </div>

            <div className="font-mono text-sm font-bold text-[#b35e00] bg-[#fef7e0] px-3 py-1 rounded-lg shrink-0">
              +15 Risk Pts
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="bg-[#f8f9fa] p-4 rounded-xl border border-[#c1c6d6]">
              <h3 className="font-bold text-[#5b5f64] uppercase tracking-wider text-[11px] mb-1.5">
                STRUCTURAL METRICS
              </h3>
              <p className="text-[#191c1d] leading-relaxed">
                High ratio of subjective assertion to verifiable claim. Paragraphs 3 and 5 exhibit logical gaps without transitions.
              </p>
            </div>

            <div className="bg-[#f8f9fa] p-4 rounded-xl border border-[#c1c6d6]">
              <h3 className="font-bold text-[#005bbf] uppercase tracking-wider text-[11px] mb-1.5">
                RECOMMENDATION
              </h3>
              <p className="text-[#191c1d] leading-relaxed">
                Isolate verifiable scientific premises from speculative commentary before citing conclusions.
              </p>
            </div>
          </div>
        </section>

        {/* Section 5: Evidence & Citation */}
        <section
          id="evidence"
          className="bg-white border border-[#c1c6d6] rounded-xl p-6 shadow-2xs space-y-4 scroll-mt-24"
        >
          <div className="flex items-start justify-between gap-4 border-b border-[#c1c6d6] pb-4">
            <div className="flex items-start gap-3">
              <div className="bg-[#ffdad6] text-[#ba1a1a] p-2.5 rounded-lg shrink-0">
                <ExternalLink className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#191c1d]">Evidence & Citation Analysis</h2>
                <p className="text-xs text-[#5b5f64] mt-0.5">
                  Finding: Missing Primary Citations.
                </p>
              </div>
            </div>

            <div className="font-mono text-sm font-bold text-[#ba1a1a] bg-[#ffdad6] px-3 py-1 rounded-lg shrink-0">
              +18 Risk Pts
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="bg-[#f8f9fa] p-4 rounded-xl border border-[#c1c6d6]">
              <h3 className="font-bold text-[#5b5f64] uppercase tracking-wider text-[11px] mb-1.5">
                CITATION SCAN
              </h3>
              <p className="text-[#191c1d] leading-relaxed">
                Zero links to peer-reviewed journals. Quotes attributed exclusively to unnamed or unverified sources.
              </p>
            </div>

            <div className="bg-[#f8f9fa] p-4 rounded-xl border border-[#c1c6d6]">
              <h3 className="font-bold text-[#005bbf] uppercase tracking-wider text-[11px] mb-1.5">
                RECOMMENDATION
              </h3>
              <p className="text-[#191c1d] leading-relaxed">
                Require direct links to primary data sources or official government releases before sharing as truth.
              </p>
            </div>
          </div>
        </section>

        {/* Section 6: Writing Style */}
        <section
          id="style"
          className="bg-white border border-[#c1c6d6] rounded-xl p-6 shadow-2xs space-y-4 scroll-mt-24"
        >
          <div className="flex items-start justify-between gap-4 border-b border-[#c1c6d6] pb-4">
            <div className="flex items-start gap-3">
              <div className="bg-[#e8f0fe] text-[#005bbf] p-2.5 rounded-lg shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#191c1d]">Writing Style & Rhetoric</h2>
                <p className="text-xs text-[#5b5f64] mt-0.5">
                  Finding: Mild Emotional Tone.
                </p>
              </div>
            </div>

            <div className="font-mono text-sm font-bold text-[#005bbf] bg-[#e8f0fe] px-3 py-1 rounded-lg shrink-0">
              +0 Risk Pts
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="bg-[#f8f9fa] p-4 rounded-xl border border-[#c1c6d6]">
              <h3 className="font-bold text-[#5b5f64] uppercase tracking-wider text-[11px] mb-1.5">
                RHETORICAL ANALYSIS
              </h3>
              <p className="text-[#191c1d] leading-relaxed">
                Body text maintains moderate neutrality, though quotes contain loaded emotional adjectives ("devastating", "conspiracy").
              </p>
            </div>

            <div className="bg-[#f8f9fa] p-4 rounded-xl border border-[#c1c6d6]">
              <h3 className="font-bold text-[#005bbf] uppercase tracking-wider text-[11px] mb-1.5">
                RECOMMENDATION
              </h3>
              <p className="text-[#191c1d] leading-relaxed">
                Differentiate neutral reporting from biased editorial commentary embedded in quoted statements.
              </p>
            </div>
          </div>
        </section>

        {/* Section 7: Final Assessment Conclusion */}
        <section
          id="final"
          className="bg-white border border-[#c1c6d6] rounded-xl p-6 shadow-2xs space-y-6 scroll-mt-24"
        >
          <div className="flex items-center gap-2 border-b border-[#c1c6d6] pb-3">
            <Shield className="w-5 h-5 text-[#005bbf]" />
            <h2 className="text-xl font-bold text-[#191c1d]">Final Assessment Conclusion</h2>
          </div>

          <p className="text-sm text-[#5b5f64] leading-relaxed">
            {reportData.summaryText}
          </p>

          <div className="pt-4 border-t border-[#c1c6d6] flex flex-wrap gap-3">
            {onAnalyzeAnother && (
              <button
                onClick={onAnalyzeAnother}
                className="bg-[#005bbf] text-white hover:bg-[#004493] font-bold text-xs px-5 py-2.5 rounded-lg transition-all flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Analyze Another Article</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {onReturnHome && (
              <button
                onClick={onReturnHome}
                className="bg-white border border-[#c1c6d6] text-[#191c1d] hover:bg-[#f8f9fa] font-bold text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                <span>Return to Home</span>
              </button>
            )}

            {onReturnToResults && (
              <button
                onClick={onReturnToResults}
                className="text-[#005bbf] hover:underline font-bold text-xs px-3 py-2.5 transition-colors cursor-pointer ml-auto"
              >
                <span>Back to Assessment Results</span>
              </button>
            )}
          </div>
        </section>
      </main>

      {/* Right Sidebar: Context & Heuristic Timeline Panel */}
      <aside className="w-full lg:w-80 bg-white border-t lg:border-t-0 lg:border-l border-[#c1c6d6] p-6 space-y-6 shrink-0 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto">
        <div>
          <h3 className="font-bold text-xs text-[#5b5f64] uppercase tracking-wider mb-3">
            ARTICLE CONTEXT
          </h3>
          <div className="bg-[#f8f9fa] p-4 rounded-xl border border-[#c1c6d6] space-y-3">
            <div>
              <span className="text-[10px] font-bold text-[#5b5f64] uppercase block mb-1">
                SOURCE URL
              </span>
              <a
                href={reportData.articleUrl || `https://${reportData.sourceDomain}`}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-[#005bbf] hover:underline truncate block"
              >
                {reportData.sourceDomain}/...
              </a>
            </div>

            <div>
              <span className="text-[10px] font-bold text-[#5b5f64] uppercase block mb-1">
                RISK BADGE
              </span>
              <div className="inline-flex items-center gap-1.5 bg-[#ffdad6] text-[#ba1a1a] px-2.5 py-1 rounded-md text-xs font-bold font-mono">
                <AlertTriangle className="w-3.5 h-3.5 text-[#ba1a1a]" />
                <span>{reportData.riskLevel}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Signature Heuristic Timeline */}
        <div>
          <h3 className="font-bold text-xs text-[#5b5f64] uppercase tracking-wider mb-4">
            HEURISTIC TIMELINE
          </h3>

          <div className="relative pl-5 border-l-2 border-[#c1c6d6] space-y-5 text-xs">
            {/* Step 1 */}
            <div className="relative">
              <div className="absolute -left-[27px] top-0.5 bg-[#ba1a1a] rounded-full w-3 h-3 border-2 border-white"></div>
              <div className="font-bold text-[#191c1d]">Headline</div>
              <div className="font-mono font-bold text-[#ba1a1a]">+15 pts</div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="absolute -left-[27px] top-0.5 bg-[#ba1a1a] rounded-full w-3 h-3 border-2 border-white"></div>
              <div className="font-bold text-[#191c1d]">Source</div>
              <div className="font-mono font-bold text-[#ba1a1a]">+30 pts</div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="absolute -left-[27px] top-0.5 bg-[#b35e00] rounded-full w-3 h-3 border-2 border-white"></div>
              <div className="font-bold text-[#191c1d]">Content</div>
              <div className="font-mono font-bold text-[#b35e00]">+15 pts</div>
            </div>

            {/* Step 4 */}
            <div className="relative">
              <div className="absolute -left-[27px] top-0.5 bg-[#ba1a1a] rounded-full w-3 h-3 border-2 border-white"></div>
              <div className="font-bold text-[#191c1d]">Evidence</div>
              <div className="font-mono font-bold text-[#ba1a1a]">+18 pts</div>
            </div>

            {/* Step 5 */}
            <div className="relative">
              <div className="absolute -left-[27px] top-0.5 bg-[#005bbf] rounded-full w-3 h-3 border-2 border-white"></div>
              <div className="font-bold text-[#191c1d]">Style</div>
              <div className="font-mono font-bold text-[#5b5f64]">+0 pts</div>
            </div>

            {/* Total */}
            <div className="relative pt-3 border-t border-[#c1c6d6]">
              <div className="font-bold text-[10px] text-[#5b5f64] uppercase mb-0.5">
                TOTAL SCORE
              </div>
              <div className="font-mono text-xl font-bold text-[#ba1a1a]">
                {reportData.overallRiskScore} / 100
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
