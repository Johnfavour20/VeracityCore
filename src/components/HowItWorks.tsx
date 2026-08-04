import React from 'react';
import { LogIn, Cpu, Calculator, Layers, FileCheck } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: LogIn,
      title: 'Submit',
      desc: 'Provide article URL or news text.',
    },
    {
      icon: Cpu,
      title: 'Run Checks',
      desc: 'Heuristic engine processes data.',
    },
    {
      icon: Calculator,
      title: 'Calculate Score',
      desc: 'Modules aggregate points.',
    },
    {
      icon: Layers,
      title: 'Classify Risk',
      desc: 'Assign risk category.',
    },
    {
      icon: FileCheck,
      title: 'View Explanation',
      desc: 'Read detailed transparent report.',
    },
  ];

  return (
    <section id="how-it-works" className="py-12 px-4 max-w-[1280px] mx-auto mb-12">
      <h2 className="text-2xl md:text-3xl font-semibold text-center text-[#191b22] mb-8">
        How It Works
      </h2>

      <div className="flex flex-col lg:flex-row justify-between items-stretch gap-4 relative">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isLast = idx === steps.length - 1;

          return (
            <div
              key={idx}
              className="flex-1 flex flex-col items-center text-center p-4 bg-white border border-[#c2c6d5] rounded-xl relative group hover:border-[#0058bd] transition-colors shadow-xs"
            >
              {!isLast && (
                <>
                  <div className="hidden lg:block absolute right-[-24px] top-1/2 w-[32px] h-[2px] bg-[#c2c6d5] group-hover:bg-[#0058bd] transition-colors z-0"></div>
                  <div className="hidden lg:block absolute right-[-24px] top-1/2 w-0 h-0 border-y-[6px] border-y-transparent border-l-[8px] border-l-[#c2c6d5] group-hover:border-l-[#0058bd] translate-x-[28px] -translate-y-[6px] transition-colors z-10"></div>
                </>
              )}

              <div className="w-10 h-10 rounded-full bg-[#f2f3fd] text-[#0058bd] flex items-center justify-center mb-3 group-hover:bg-[#0058bd] group-hover:text-white transition-colors">
                <Icon className="w-5 h-5" />
              </div>

              <h3 className="font-semibold text-sm text-[#191b22] mb-1">{step.title}</h3>
              <p className="text-xs text-[#5b5f64]">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
