import React, { useState } from 'react';
import { AnalysisReport, SampleArticle } from '../types';
import { SAMPLE_ARTICLES } from '../data/samples';
import { X, Search, Link as LinkIcon, FileText, Sparkles, AlertCircle, Loader2 } from 'lucide-react';

interface AnalyzerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalysisComplete: (report: AnalysisReport) => void;
}

export const AnalyzerModal: React.FC<AnalyzerModalProps> = ({
  isOpen,
  onClose,
  onAnalysisComplete,
}) => {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSelectSample = (sample: SampleArticle) => {
    setUrl(`https://${sample.domain}/article/102938`);
    setTitle(sample.title);
    setContent(sample.snippet);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() && !title.trim() && !content.trim()) {
      setError('Please provide at least an Article URL, Title, or Content to evaluate.');
      return;
    }

    setError(null);
    setIsAnalyzing(true);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, title, content }),
      });

      if (!response.ok) {
        throw new Error(`Server returned error status ${response.status}`);
      }

      const report: AnalysisReport = await response.json();
      onAnalysisComplete(report);
      onClose();
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err.message || 'Failed to complete analysis. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-[#c2c6d5] rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-[#f2f3fd] px-6 py-4 border-b border-[#c2c6d5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0058bd] text-white flex items-center justify-center font-bold">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#191b22]">Article Credibility Analyzer</h3>
              <p className="text-xs text-[#5b5f64]">Submit news URL or content for real-time heuristic assessment</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#5b5f64] hover:text-[#191b22] hover:bg-[#e1e2eb] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-[#ffdad6] border border-[#ba1a1a] rounded-lg text-[#93000a] text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Quick Preset Samples */}
          <div>
            <label className="block text-xs font-bold text-[#5b5f64] uppercase tracking-wider mb-1.5">
              Load Example Article Preset
            </label>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_ARTICLES.map((sample) => (
                <button
                  type="button"
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg bg-[#f2f3fd] border border-[#c2c6d5] hover:border-[#0058bd] hover:bg-[#e1e2eb] transition-colors text-[#191b22] flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-[#0058bd]" />
                  <span>{sample.category}: "{sample.title.slice(0, 30)}..."</span>
                </button>
              ))}
            </div>
          </div>

          <hr className="border-[#c2c6d5] my-2" />

          {/* URL Input */}
          <div>
            <label className="block text-xs font-bold text-[#191b22] mb-1">
              Article Web URL
            </label>
            <div className="relative">
              <LinkIcon className="w-4 h-4 absolute left-3 top-3 text-[#5b5f64]" />
              <input
                type="text"
                placeholder="https://example-news.com/article/2026-update"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#c2c6d5] rounded-lg text-sm text-[#191b22] placeholder-[#727785] focus:outline-none focus:border-[#0058bd] focus:ring-1 focus:ring-[#0058bd]"
              />
            </div>
          </div>

          {/* Title Input */}
          <div>
            <label className="block text-xs font-bold text-[#191b22] mb-1">
              Headline / Title
            </label>
            <input
              type="text"
              placeholder="e.g. New Study Claims Chocolate Cures Everything"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-[#c2c6d5] rounded-lg text-sm text-[#191b22] placeholder-[#727785] focus:outline-none focus:border-[#0058bd] focus:ring-1 focus:ring-[#0058bd]"
            />
          </div>

          {/* Article Text Content */}
          <div>
            <label className="block text-xs font-bold text-[#191b22] mb-1">
              Article Body or Excerpt (Optional)
            </label>
            <textarea
              rows={4}
              placeholder="Paste article text excerpt, quotes, or supporting paragraphs..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-2.5 bg-white border border-[#c2c6d5] rounded-lg text-sm text-[#191b22] placeholder-[#727785] focus:outline-none focus:border-[#0058bd] focus:ring-1 focus:ring-[#0058bd] resize-none"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold text-[#5b5f64] hover:bg-[#e1e2eb] rounded-lg transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isAnalyzing}
              className="px-6 py-2.5 text-xs font-semibold text-white bg-[#0058bd] hover:bg-[#004494] disabled:opacity-50 rounded-lg transition-all shadow-xs flex items-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Evaluating Heuristics...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Run Live Heuristic Engine</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
