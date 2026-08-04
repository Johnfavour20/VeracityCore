import React from 'react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="bg-white border-t border-[#c2c6d5] mt-16 py-12 px-4">
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {/* Left */}
        <div className="text-center md:text-left">
          <div className="font-bold text-xl text-[#0058bd] mb-1">Veritas</div>
          <p className="text-xs text-[#5b5f64]">Navigating Information Environments with Confidence.</p>
        </div>

        {/* Center */}
        <div className="text-center">
          <h4 className="text-xs font-bold text-[#5b5f64] uppercase tracking-widest mb-2">
            Analysis Principles
          </h4>
          <ul className="flex flex-wrap justify-center gap-2 text-xs text-[#5b5f64] font-mono">
            <li>Explainable</li>
            <li>•</li>
            <li>Transparent</li>
            <li>•</li>
            <li>Rule-Based</li>
            <li>•</li>
            <li>Evidence-Oriented</li>
          </ul>
        </div>

        {/* Right */}
        <div className="flex flex-col items-center md:items-end justify-center gap-3">
          <nav className="flex gap-4">
            <a
              href="#how-it-works"
              className="text-xs text-[#5b5f64] hover:text-[#0058bd] transition-colors cursor-pointer"
            >
              How It Works
            </a>
            <a
              href="#about"
              className="text-xs text-[#5b5f64] hover:text-[#0058bd] transition-colors cursor-pointer"
            >
              About
            </a>
            <button
              onClick={onOpenAdmin}
              className="text-xs text-[#5b5f64] hover:text-[#0058bd] transition-colors cursor-pointer"
            >
              Admin Login
            </button>
          </nav>
          <div className="text-xs text-[#5b5f64]">
            © {new Date().getFullYear()} Veritas. Built for transparency.
          </div>
        </div>
      </div>
    </footer>
  );
};
