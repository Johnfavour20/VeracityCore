import React from 'react';
import { X, Heading, Globe, FileText, CheckCircle2, Quote, BookOpen, Calculator, ShieldCheck } from 'lucide-react';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MethodologyModal: React.FC<MethodologyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const modules = [
    {
      icon: Heading,
      title: '1. Headline Assessment Engine',
      penalty: 'Up to +25 Points',
      details: 'Scans for hyperbolic sensationalism, absolute cure claims, emotional clickbait curiosity gaps, and all-caps outrage patterns.',
      math: 'Sensational phrase match: +15 to +25 pts'
    },
    {
      icon: Globe,
      title: '2. Source Credibility Index',
      penalty: 'Up to +30 Points',
      details: 'Evaluates domain age, WHOIS registration transparency, global consensus trust index, and editorial board disclosure.',
      math: 'Unverified domain authority: +15 to +30 pts'
    },
    {
      icon: FileText,
      title: '3. Structural Cohesion & Logic',
      penalty: 'Up to +20 Points',
      details: 'Checks for circular arguments, ad-hominem fallacies, headline-to-body discrepancies, and invalid causal leaps.',
      math: 'Causal extrapolation leap: +10 to +20 pts'
    },
    {
      icon: CheckCircle2,
      title: '4. Evidence & Citation Verification',
      penalty: 'Up to +30 Points',
      details: 'Cross-references statements against PubMed, DOI indices, official transcripts, and named academic researchers.',
      math: 'Missing primary citations: +20 to +30 pts'
    },
    {
      icon: Quote,
      title: '5. Writing Style & Tone Diagnostics',
      penalty: 'Up to +15 Points',
      details: 'Detects subjective evaluative adjectives, loaded political framing, and biased emotional persuasion rhetoric.',
      math: 'Inflammatory terminology: +10 to +15 pts'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-[#c2c6d5] rounded-2xl max-w-3xl w-full max-h-[90vh] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-[#f2f3fd] px-6 py-4 border-b border-[#c2c6d5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-[#0058bd]" />
            <div>
              <h3 className="font-bold text-lg text-[#191b22]">Veritas Heuristic Methodology Whitepaper</h3>
              <p className="text-xs text-[#5b5f64]">Transparent mathematical evaluation rules & scoring thresholds</p>
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
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          <div className="p-4 bg-[#f2f3fd] border border-[#c2c6d5] rounded-xl flex items-start gap-3">
            <Calculator className="w-5 h-5 text-[#0058bd] shrink-0 mt-0.5" />
            <div className="text-xs text-[#424753] leading-relaxed">
              <span className="font-bold text-[#191b22] block mb-1">Mathematical Additive Penalty Formula</span>
              Total Risk Score = Min(100, Sum(Module Penalty Points)). Articles start at 0 (Lowest Risk / Highest Credibility) and accumulate points as heuristic flags are raised.
            </div>
          </div>

          <div className="space-y-4">
            {modules.map((m, idx) => {
              const Icon = m.icon;
              return (
                <div key={idx} className="p-4 border border-[#c2c6d5] rounded-xl bg-[#f9f9ff] hover:border-[#0058bd] transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-[#d3e3fd] text-[#0058bd] rounded-lg">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-sm text-[#191b22]">{m.title}</h4>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#ba1a1a] bg-[#ffdad6] px-2.5 py-0.5 rounded">
                      {m.penalty}
                    </span>
                  </div>
                  <p className="text-xs text-[#5b5f64] mb-2">{m.details}</p>
                  <div className="text-[11px] font-mono text-[#0058bd] bg-[#e1e2eb] px-2 py-1 rounded inline-block">
                    Rule Math: {m.math}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-900 flex items-start gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold block mb-1">Human-in-the-Loop Safeguard</span>
              Veritas heuristic scores are designed to assist human critical thinking and information verification. We provide clear evidence links so readers can independently confirm claims.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#f2f3fd] px-6 py-4 border-t border-[#c2c6d5] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-[#0058bd] hover:bg-[#004494] rounded-lg transition-colors"
          >
            Close Methodology
          </button>
        </div>
      </div>
    </div>
  );
};
