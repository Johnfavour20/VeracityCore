import React, { useState } from 'react';
import { Settings, Search, History, Bell, User, CheckCircle2 } from 'lucide-react';

interface NavbarProps {
  activeTab: 'landing' | 'analysis' | 'repository' | 'admin';
  onTabChange: (tab: 'landing' | 'analysis' | 'repository' | 'admin') => void;
  onOpenMethodology: () => void;
  onOpenAnalyzer: () => void;
  onOpenAdmin: () => void;
  onOpenHistory: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  onOpenMethodology,
  onOpenAnalyzer,
  onOpenAdmin,
  onOpenHistory,
  savedCount,
}) => {
  const [globalSearch, setGlobalSearch] = useState('');
  const [showNotification, setShowNotification] = useState(false);

  return (
    <header className="bg-[#f9f9ff] w-full sticky top-0 border-b border-[#c2c6d5] shadow-2xs z-50">
      <div className="flex justify-between items-center w-full px-4 max-w-[1280px] mx-auto h-16">
        {/* Brand Logo & Core Nav */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onTabChange('landing')}
            className="flex items-center gap-2 group text-left"
          >
            <div className="w-8 h-8 rounded-lg bg-[#0058bd] text-white flex items-center justify-center font-bold text-lg shadow-2xs group-hover:scale-105 transition-transform">
              V
            </div>
            <span className="font-semibold text-xl text-[#0058bd] tracking-tight">
              VeracityCore
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-6 font-medium text-sm">
            <button
              onClick={() => onTabChange('analysis')}
              className={`pb-1 transition-colors cursor-pointer ${
                activeTab === 'analysis'
                  ? 'text-[#0058bd] border-b-2 border-[#0058bd] font-semibold'
                  : 'text-[#5b5f64] hover:text-[#0058bd]'
              }`}
            >
              Analysis
            </button>
            <button
              onClick={() => onTabChange('repository')}
              className={`pb-1 transition-colors cursor-pointer ${
                activeTab === 'repository'
                  ? 'text-[#0058bd] border-b-2 border-[#0058bd] font-semibold'
                  : 'text-[#5b5f64] hover:text-[#0058bd]'
              }`}
            >
              Repository
            </button>
            <button
              onClick={() => onTabChange('admin')}
              className={`pb-1 transition-colors cursor-pointer ${
                activeTab === 'admin'
                  ? 'text-[#0058bd] border-b-2 border-[#0058bd] font-semibold'
                  : 'text-[#5b5f64] hover:text-[#0058bd]'
              }`}
            >
              Admin Console
            </button>
            <button
              onClick={onOpenMethodology}
              className="text-[#5b5f64] hover:text-[#0058bd] transition-colors cursor-pointer pb-1"
            >
              Methodology
            </button>
          </nav>
        </div>

        {/* Global Search Input */}
        <div className="hidden lg:flex flex-1 mx-6 max-w-md relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#727785]" />
          <input
            type="text"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onTabChange('repository');
              }
            }}
            placeholder="Search resources, articles, domains..."
            className="w-full pl-9 pr-4 py-2 bg-[#f2f3fd] border border-[#c2c6d5] rounded-full text-xs text-[#191b22] focus:border-[#0058bd] focus:ring-1 focus:ring-[#0058bd] outline-none transition-all placeholder-[#727785]"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onTabChange('analysis')}
            className="hidden sm:flex items-center gap-1.5 bg-[#0058bd] text-white font-semibold text-xs px-4 py-2 rounded-lg hover:bg-[#004494] transition-all shadow-2xs active:scale-95"
          >
            <span>Analyze URL</span>
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={onOpenHistory}
              className="p-2 text-[#5b5f64] hover:text-[#0058bd] hover:bg-[#e1e2eb] rounded-full transition-colors relative"
              title="Saved Reports History"
            >
              <History className="w-4 h-4" />
              {savedCount > 0 && (
                <span className="absolute top-1 right-1 bg-[#0058bd] text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setShowNotification(!showNotification)}
              className="p-2 text-[#5b5f64] hover:text-[#0058bd] hover:bg-[#e1e2eb] rounded-full transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenAdmin}
              className="p-2 text-[#5b5f64] hover:text-[#0058bd] hover:bg-[#e1e2eb] rounded-full transition-colors"
              title="Admin & Rule Weights"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

