import React, { useState } from 'react';
import { AnalysisReport, SampleArticle } from '../types';
import { SAMPLE_ARTICLES } from '../data/samples';
import {
  Link as LinkIcon,
  Info,
  RotateCcw,
  Sparkles,
  Heading,
  Globe,
  FileText,
  FileCheck,
  Quote,
  CheckCircle2,
  Lightbulb,
  AlertCircle,
  Loader2,
  LineChart
} from 'lucide-react';

interface SubmissionWorkspaceProps {
  onAnalysisComplete: (report: AnalysisReport) => void;
  onOpenAuditReport: () => void;
}

export const SubmissionWorkspace: React.FC<SubmissionWorkspaceProps> = ({
  onAnalysisComplete,
  onOpenAuditReport,
}) => {
  const [url, setUrl] = useState('');
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const characterCount = content.length;
  const maxCharacters = 10000;

  const [processingStep, setProcessingStep] = useState(0);

  const processingSteps = [
    { title: 'Headline Evaluation', detail: 'Scanning for clickbait, emotional triggers, and hyperbole...' },
    { title: 'Source Credibility Check', detail: 'Querying domain authority and historical editorial records...' },
    { title: 'Content Structure Analysis', detail: 'Evaluating paragraph cohesion, logic, and claim density...' },
    { title: 'Evidence & Citation Scan', detail: 'Cross-referencing quotes, peer-reviewed data, and links...' },
    { title: 'Style & Rhetoric Assessment', detail: 'Measuring subjective tone, partisan bias, and inflammatory phrasing...' },
    { title: 'Heuristic Score Aggregation', detail: 'Calculating final mathematical risk score and generating findings...' }
  ];

  const handleSelectSample = (sample: SampleArticle) => {
    setUrl(`https://${sample.domain}/article/2026-analysis`);
    setContent(`${sample.title}\n\n${sample.snippet}`);
    setError(null);
  };

  const handleClear = () => {
    setUrl('');
    setContent('');
    setError(null);
    setProcessingStep(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() && !content.trim()) {
      setError('Please enter a valid Article URL or paste the article content.');
      return;
    }

    setError(null);
    setIsAnalyzing(true);
    setProcessingStep(0);

    // Animate processing steps for visual feedback
    const stepInterval = setInterval(() => {
      setProcessingStep((prev) => {
        if (prev < processingSteps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 600);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, content }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const report: AnalysisReport = await response.json();
      clearInterval(stepInterval);
      setProcessingStep(processingSteps.length - 1);
      
      setTimeout(() => {
        setIsAnalyzing(false);
        onAnalysisComplete(report);
        onOpenAuditReport();
      }, 400);
    } catch (err: any) {
      clearInterval(stepInterval);
      console.error('Submission analysis error:', err);
      setError(err.message || 'Failed to process submission. Please check connection and try again.');
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8 py-8 md:py-12 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Main Workspace (7/12) */}
        <section className="lg:col-span-7 flex flex-col gap-6">
          <header className="mb-2">
            <h1 className="text-3xl font-bold tracking-tight text-[#191b22] mb-2">
              Submit Article for Analysis
            </h1>
            <p className="text-base text-[#5b5f64] leading-relaxed">
              Provide a URL or paste the full article text to begin our heuristic evaluation.
            </p>

            {/* Quick Sample Selector Bar */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#5b5f64] uppercase tracking-wider">
                Quick Preset Examples:
              </span>
              {SAMPLE_ARTICLES.map((sample) => (
                <button
                  type="button"
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className="text-xs font-medium px-2.5 py-1 rounded-md bg-[#e1e2eb] text-[#191b22] hover:bg-[#0058bd] hover:text-white transition-colors flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3 text-[#0058bd] group-hover:text-white" />
                  <span>{sample.category}</span>
                </button>
              ))}
            </div>
          </header>

          <div className="bg-white border border-[#c2c6d5] rounded-xl p-6 shadow-xs relative overflow-hidden">
            {isAnalyzing ? (
              /* Analysis Processing Screen */
              <div className="py-6 space-y-6 animate-in fade-in duration-300">
                <div className="flex items-center justify-between border-b border-[#c2c6d5] pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#d8e2ff] text-[#0058bd] flex items-center justify-center font-bold">
                      <Loader2 className="w-5 h-5 animate-spin text-[#0058bd]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-[#191b22]">Analysis Processing</h3>
                      <p className="text-xs text-[#5b5f64]">
                        Executing 5 diagnostic heuristic modules in real-time...
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#0058bd] bg-[#e8f0fe] px-3 py-1 rounded-full">
                    {Math.round(((processingStep + 1) / processingSteps.length) * 100)}% COMPLETE
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2.5 bg-[#e1e2eb] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0058bd] transition-all duration-300 ease-out"
                    style={{ width: `${((processingStep + 1) / processingSteps.length) * 100}%` }}
                  />
                </div>

                {/* Processing Steps Checklist */}
                <div className="space-y-3 pt-2">
                  {processingSteps.map((step, idx) => {
                    const isDone = idx < processingStep;
                    const isCurrent = idx === processingStep;
                    const isPending = idx > processingStep;

                    return (
                      <div
                        key={idx}
                        className={`p-3.5 rounded-lg border transition-all flex items-start justify-between gap-3 ${
                          isCurrent
                            ? 'bg-[#e8f0fe] border-[#0058bd] shadow-2xs scale-[1.01]'
                            : isDone
                            ? 'bg-[#e6f4ea]/60 border-[#a8dab5]'
                            : 'bg-[#f9f9ff] border-[#c2c6d5] opacity-60'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="mt-0.5 shrink-0">
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-[#146c2e]" />
                            ) : isCurrent ? (
                              <Loader2 className="w-4 h-4 text-[#0058bd] animate-spin" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-[#c2c6d5] bg-white flex items-center justify-center text-[9px] text-[#5b5f64] font-mono">
                                {idx + 1}
                              </div>
                            )}
                          </div>

                          <div>
                            <h4 className={`text-xs font-bold ${isCurrent ? 'text-[#0058bd]' : isDone ? 'text-[#146c2e]' : 'text-[#191b22]'}`}>
                              {step.title}
                            </h4>
                            <p className="text-[11px] text-[#5b5f64] mt-0.5">{step.detail}</p>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${
                            isDone
                              ? 'bg-[#e6f4ea] text-[#146c2e]'
                              : isCurrent
                              ? 'bg-[#0058bd] text-white animate-pulse'
                              : 'bg-[#e1e2eb] text-[#5b5f64]'
                          }`}
                        >
                          {isDone ? 'VERIFIED' : isCurrent ? 'SCANNING' : 'QUEUED'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {error && (
                <div className="p-3 bg-[#ffdad6] border border-[#ba1a1a] rounded-lg text-[#93000a] text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* URL Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#191b22]" htmlFor="article-url">
                  Article URL
                </label>
                <div className="relative flex items-center">
                  <LinkIcon className="w-5 h-5 absolute left-3 text-[#727785]" />
                  <input
                    id="article-url"
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://example.com/article"
                    className="w-full pl-10 pr-4 py-3 bg-[#f9f9ff] border border-[#c2c6d5] rounded-lg text-sm text-[#191b22] placeholder-[#727785] focus:border-[#0058bd] focus:ring-1 focus:ring-[#0058bd] outline-none transition-all shadow-2xs"
                  />
                </div>
                <p className="text-xs text-[#5b5f64] mt-1 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" />
                  <span>We support most major news sites, research databases, and blogs.</span>
                </p>
              </div>

              {/* OR Divider */}
              <div className="flex items-center gap-4">
                <div className="h-px bg-[#c2c6d5] flex-1"></div>
                <span className="text-xs font-bold text-[#727785] uppercase tracking-wider">OR</span>
                <div className="h-px bg-[#c2c6d5] flex-1"></div>
              </div>

              {/* Content Textarea */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-end">
                  <label className="text-sm font-semibold text-[#191b22]" htmlFor="article-content">
                    Article Content (Required)
                  </label>
                </div>
                <textarea
                  id="article-content"
                  rows={14}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste the full article text here..."
                  className="w-full p-4 bg-[#f9f9ff] border border-[#c2c6d5] rounded-lg text-sm text-[#191b22] placeholder-[#727785] focus:border-[#0058bd] focus:ring-1 focus:ring-[#0058bd] outline-none transition-all shadow-2xs resize-y"
                />
                <div className="flex justify-end mt-1">
                  <span className={`text-xs font-mono ${characterCount > maxCharacters ? 'text-[#ba1a1a] font-bold' : 'text-[#727785]'}`}>
                    {characterCount.toLocaleString()} / {maxCharacters.toLocaleString()} characters
                  </span>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isAnalyzing}
                  className="flex items-center justify-center gap-2 bg-[#0058bd] text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-[#004494] disabled:opacity-50 transition-all shadow-xs active:scale-95"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Running Heuristics...</span>
                    </>
                  ) : (
                    <>
                      <LineChart className="w-4 h-4" />
                      <span>Analyze Article</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleClear}
                  className="flex items-center justify-center gap-1.5 bg-transparent text-[#5b5f64] hover:bg-[#e1e2eb] hover:text-[#191b22] font-semibold text-sm px-4 py-3 rounded-lg transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Clear Form</span>
                </button>
              </div>
            </form>
            )}
          </div>
        </section>

        {/* Right Column: Sticky Information Panel (5/12) */}
        <aside className="lg:col-span-5 flex flex-col gap-6 sticky top-24">
          {/* Card 1: Analysis Modules */}
          <div className="bg-white border border-[#c2c6d5] rounded-xl p-6 shadow-xs">
            <h3 className="font-semibold text-lg text-[#191b22] border-b border-[#c2c6d5] pb-3 mb-4 flex items-center gap-2">
              <LineChart className="w-5 h-5 text-[#0058bd]" />
              <span>Analysis Modules</span>
            </h3>

            <div className="flex flex-col gap-4">
              {/* Module 1 */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#f2f3fd] rounded-lg text-[#0058bd] shrink-0">
                  <Heading className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-0.5">
                    <h4 className="font-semibold text-sm text-[#191b22]">Headline Evaluation</h4>
                    <span className="bg-[#e1e2eb] text-[#424753] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Ready
                    </span>
                  </div>
                  <p className="text-xs text-[#5b5f64]">Detects sensationalism and clickbait patterns.</p>
                </div>
              </div>

              {/* Module 2 */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#f2f3fd] rounded-lg text-[#0058bd] shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-0.5">
                    <h4 className="font-semibold text-sm text-[#191b22]">Source Credibility</h4>
                    <span className="bg-[#e1e2eb] text-[#424753] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Ready
                    </span>
                  </div>
                  <p className="text-xs text-[#5b5f64]">Analyzes domain reputation and historical reporting reliability.</p>
                </div>
              </div>

              {/* Module 3 */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#f2f3fd] rounded-lg text-[#0058bd] shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-0.5">
                    <h4 className="font-semibold text-sm text-[#191b22]">Content Structure</h4>
                    <span className="bg-[#e1e2eb] text-[#424753] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Ready
                    </span>
                  </div>
                  <p className="text-xs text-[#5b5f64]">Assesses logical flow and argumentative consistency.</p>
                </div>
              </div>

              {/* Module 4 */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#f2f3fd] rounded-lg text-[#0058bd] shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-0.5">
                    <h4 className="font-semibold text-sm text-[#191b22]">Evidence Verification</h4>
                    <span className="bg-[#e1e2eb] text-[#424753] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Ready
                    </span>
                  </div>
                  <p className="text-xs text-[#5b5f64]">Cross-references claims with authoritative databases.</p>
                </div>
              </div>

              {/* Module 5 */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-[#f2f3fd] rounded-lg text-[#0058bd] shrink-0">
                  <Quote className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-0.5">
                    <h4 className="font-semibold text-sm text-[#191b22]">Style & Tone</h4>
                    <span className="bg-[#e1e2eb] text-[#424753] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Ready
                    </span>
                  </div>
                  <p className="text-xs text-[#5b5f64]">Evaluates emotional loading and persuasive language.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: What to Expect */}
          <div className="bg-[#f2f3fd] border border-[#c2c6d5] rounded-xl p-6 shadow-xs">
            <h3 className="font-semibold text-[#191b22] mb-4">What to Expect</h3>
            <ul className="flex flex-col gap-3">
              <li className="flex items-center gap-3 text-sm text-[#424753]">
                <CheckCircle2 className="w-5 h-5 text-[#0058bd] shrink-0" />
                <span>Overall Risk Score (0-100)</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-[#424753]">
                <CheckCircle2 className="w-5 h-5 text-[#0058bd] shrink-0" />
                <span>Risk Classification (Low to Critical)</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-[#424753]">
                <CheckCircle2 className="w-5 h-5 text-[#0058bd] shrink-0" />
                <span>Detailed Mathematical Heuristic Breakdown</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-[#424753]">
                <CheckCircle2 className="w-5 h-5 text-[#0058bd] shrink-0" />
                <span>Explainable Findings & Verifiable Claim Deconstructions</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Analysis Tips */}
          <div className="bg-[#e8f0fe] border border-[#d2e3fc] rounded-xl p-6 shadow-xs">
            <h3 className="font-semibold text-[#1967d2] mb-3 flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              <span>Analysis Tips</span>
            </h3>
            <ul className="list-disc pl-5 flex flex-col gap-2 text-xs text-[#185abc] leading-relaxed">
              <li>Submit complete articles for best results. Partial texts may skew structural analysis.</li>
              <li>Results are based on rule-based heuristics and should be used to augment human judgment, not replace it.</li>
              <li>Verify primary source links on Google Scholar or PubMed for medical & scientific assertions.</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};
