import React from 'react';
import { CheckCircle2, Info, AlertTriangle, AlertOctagon } from 'lucide-react';

export const RiskClassifications: React.FC = () => {
  return (
    <section id="risk-classifications" className="py-12 px-4 max-w-[1280px] mx-auto bg-[#f2f3fd] rounded-2xl mb-12 relative overflow-hidden">
      <div className="absolute inset-0 pipeline-bg opacity-30 pointer-events-none"></div>

      <h2 className="text-2xl md:text-3xl font-semibold text-center text-[#191b22] mb-8">
        Risk Classifications
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Low Risk */}
        <div className="bg-white border border-[#c2c6d5] border-l-4 border-l-[#0b57d0] rounded-xl p-6 shadow-xs flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
          <div className="w-14 h-14 bg-[#d3e3fd] text-[#0b57d0] rounded-full flex items-center justify-center mb-4 shadow-xs">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-semibold text-xl text-[#191b22] mb-2">Low Risk</h3>
          <p className="text-xs text-[#5b5f64] leading-relaxed">
            <span className="font-semibold text-[#191b22]">0-25 Score.</span> Source is highly credible and follows journalistic standards.
          </p>
        </div>

        {/* Moderate Risk */}
        <div className="bg-white border border-[#c2c6d5] border-l-4 border-l-[#b38a00] rounded-xl p-6 shadow-xs flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
          <div className="w-14 h-14 bg-[#fef7e0] text-[#b38a00] rounded-full flex items-center justify-center mb-4 shadow-xs">
            <Info className="w-8 h-8" />
          </div>
          <h3 className="font-semibold text-xl text-[#191b22] mb-2">Moderate Risk</h3>
          <p className="text-xs text-[#5b5f64] leading-relaxed">
            <span className="font-semibold text-[#191b22]">26-50 Score.</span> Some heuristic flags raised. Read with minor caution.
          </p>
        </div>

        {/* High Risk */}
        <div className="bg-[#fff8f6] border border-[#ba1a1a] border-l-4 border-l-[#ba1a1a] rounded-xl p-6 shadow-xs flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
          <div className="w-14 h-14 bg-[#ffdad6] text-[#ba1a1a] rounded-full flex items-center justify-center mb-4 shadow-xs">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <h3 className="font-semibold text-xl text-[#93000a] mb-2">High Risk</h3>
          <p className="text-xs text-[#5b5f64] leading-relaxed">
            <span className="font-semibold text-[#191b22]">51-75 Score.</span> Significant issues detected. Verification highly recommended.
          </p>
        </div>

        {/* Critical Risk */}
        <div className="bg-[#fff8f6] border border-[#ba1a1a] border-l-4 border-l-[#93000a] rounded-xl p-6 shadow-xs flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
          <div className="w-14 h-14 bg-[#93000a] text-white rounded-full flex items-center justify-center mb-4 shadow-xs">
            <AlertOctagon className="w-8 h-8" />
          </div>
          <h3 className="font-semibold text-xl text-[#93000a] mb-2">Critical Risk</h3>
          <p className="text-xs text-[#5b5f64] leading-relaxed">
            <span className="font-semibold text-[#191b22]">76-100 Score.</span> Severe credibility issues. Likely misinformation.
          </p>
        </div>
      </div>
    </section>
  );
};
