import React from 'react';
import { Type, Globe, FileText, Search, Tag } from 'lucide-react';

export const ExplainableHeuristics: React.FC = () => {
  const modules = [
    {
      icon: Type,
      title: 'Headline',
      desc: 'Detects clickbait and emotional manipulation.',
    },
    {
      icon: Globe,
      title: 'Source',
      desc: 'Evaluates domain reputation and history.',
    },
    {
      icon: FileText,
      title: 'Content',
      desc: 'Analyzes structural integrity and logical flow.',
    },
    {
      icon: Search,
      title: 'Evidence',
      desc: 'Cross-references claims and citations.',
    },
    {
      icon: Tag,
      title: 'Style',
      desc: 'Identifies subjective or inflammatory language.',
    },
  ];

  return (
    <section id="heuristics" className="py-12 px-4 max-w-[1280px] mx-auto bg-[#f2f3fd] rounded-2xl mb-12 relative overflow-hidden">
      <div className="absolute inset-0 pipeline-bg opacity-50 pointer-events-none"></div>

      <h2 className="text-2xl md:text-3xl font-semibold text-center text-[#191b22] mb-8 relative z-10">
        Built on Explainable Heuristics
      </h2>

      <div className="relative z-10">
        {/* Pipeline Connector Line on Desktop */}
        <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-[2px] bg-[#d8e2ff] -z-10 -translate-y-6"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {modules.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-[#c2c6d5] rounded-xl p-4 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all text-center group cursor-default"
              >
                <div className="w-12 h-12 rounded-lg bg-[#f2f3fd] text-[#0058bd] flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:bg-[#0058bd] group-hover:text-white transition-all">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-lg text-[#191b22] mb-1">{m.title}</h3>
                <p className="text-xs text-[#5b5f64] leading-relaxed">{m.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
