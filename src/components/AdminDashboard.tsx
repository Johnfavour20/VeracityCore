import React, { useState } from 'react';
import { AnalysisReport } from '../types';
import { SAMPLE_ARTICLES } from '../data/samples';
import { HeuristicRulesManager } from './HeuristicRulesManager';
import { SourceCredibilityManager } from './SourceCredibilityManager';
import { AssessmentRecordsManager } from './AssessmentRecordsManager';
import {
  Shield,
  LayoutDashboard,
  Sliders,
  Database,
  History,
  FileText,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Search,
  Bell,
  Settings,
  HelpCircle,
  Eye,
  ArrowRight,
  Gavel,
  ShieldCheck,
  FolderOpen,
  LogOut,
  ChevronRight,
  Activity,
  Zap,
  Plus,
  Menu,
  X,
  PanelLeftClose,
  PanelLeftOpen
} from 'lucide-react';

interface AdminDashboardProps {
  onSelectReport: (report: AnalysisReport) => void;
  onOpenRuleConfig: () => void;
  onExitAdmin: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onSelectReport,
  onOpenRuleConfig,
  onExitAdmin,
}) => {
  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'rules' | 'sources' | 'records' | 'logs'>('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [trustedDomains, setTrustedDomains] = useState<string[]>([
    'reuters.com',
    'apnews.com',
    'bbc.com',
    'nature.com',
    'nytimes.com',
    'theguardian.com',
    'washingtonpost.com',
    'bloomberg.com',
    'wsj.com'
  ]);
  const [newDomain, setNewDomain] = useState('');

  const handleAddDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDomain.trim() && !trustedDomains.includes(newDomain.trim().toLowerCase())) {
      setTrustedDomains([...trustedDomains, newDomain.trim().toLowerCase()]);
      setNewDomain('');
    }
  };

  const handleRemoveDomain = (domain: string) => {
    setTrustedDomains(trustedDomains.filter((d) => d !== domain));
  };

  const sampleReports = SAMPLE_ARTICLES.map((s) => s.presetReport);

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#191b22] flex font-sans antialiased">
      {/* Mobile Drawer Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 md:hidden animate-in fade-in duration-200"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Collapsible & Responsive Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-[#f2f3fd] border-r border-[#c2c6d5] flex flex-col py-6 transition-all duration-300 ease-in-out justify-between
          ${isMobileOpen ? 'translate-x-0 w-64 px-4' : '-translate-x-full md:translate-x-0'}
          ${isCollapsed ? 'md:w-20 md:px-3' : 'md:w-64 md:px-4'}
          px-4
        `}
      >
        <div>
          {/* Logo & Header Controls */}
          <div className={`mb-8 flex items-center ${isCollapsed ? 'md:justify-center' : 'justify-between'} px-1`}>
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-lg bg-[#0058bd] text-white flex items-center justify-center font-bold text-xl shadow-xs shrink-0">
                <Shield className="w-5 h-5 fill-white" />
              </div>
              {(!isCollapsed || isMobileOpen) && (
                <div className="flex flex-col whitespace-nowrap transition-opacity duration-200">
                  <span className="font-bold text-base text-[#0058bd] tracking-tight">VeracityCore</span>
                  <span className="text-[10px] font-mono bg-[#e1e2eb] text-[#424753] px-1.5 py-0.5 rounded font-semibold w-max">
                    Enterprise Admin
                  </span>
                </div>
              )}
            </div>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsMobileOpen(false)}
              className="md:hidden p-1.5 text-[#5b5f64] hover:text-[#191b22] rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Desktop Collapse Toggle (When expanded) */}
            {!isCollapsed && (
              <button
                onClick={() => setIsCollapsed(true)}
                className="hidden md:flex p-1.5 text-[#5b5f64] hover:text-[#0058bd] hover:bg-[#e1e2eb] rounded-lg transition-colors"
                title="Collapse Sidebar"
              >
                <PanelLeftClose className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Desktop Expand Toggle (When collapsed) */}
          {isCollapsed && (
            <div className="hidden md:flex justify-center mb-6">
              <button
                onClick={() => setIsCollapsed(false)}
                className="p-2 text-[#5b5f64] hover:text-[#0058bd] hover:bg-[#e1e2eb] rounded-lg transition-colors"
                title="Expand Sidebar"
              >
                <PanelLeftOpen className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* Navigation Items */}
          <nav className="flex flex-col gap-1.5 text-sm font-semibold">
            {[
              { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
              { id: 'rules', label: 'Heuristic Rules', icon: Sliders },
              { id: 'sources', label: 'Source Credibility', icon: Database },
              { id: 'records', label: 'Assessment Records', icon: FileText },
              { id: 'logs', label: 'Audit Logs', icon: History }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeAdminTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveAdminTab(item.id as any);
                    setIsMobileOpen(false);
                  }}
                  className={`flex items-center ${isCollapsed ? 'md:justify-center md:px-0' : 'px-3'} py-2.5 rounded-lg transition-all text-left ${
                    isActive
                      ? 'bg-[#dde0e6] text-[#0058bd] font-bold shadow-2xs'
                      : 'text-[#5b5f64] hover:bg-[#e1e2eb] hover:text-[#191b22]'
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  {(!isCollapsed || isMobileOpen) && <span className="ml-3 truncate">{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-[#c2c6d5] space-y-3">
          <div className={`py-2 bg-[#e1e2eb] rounded-lg text-xs font-semibold text-[#0058bd] flex items-center ${isCollapsed ? 'md:justify-center md:px-2' : 'px-3 gap-2'}`}>
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            {(!isCollapsed || isMobileOpen) && <span className="truncate">System Status: Healthy</span>}
          </div>

          <div className={`flex items-center ${isCollapsed ? 'md:justify-center' : 'justify-between px-2'} pt-1`}>
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-[#0058bd] text-white flex items-center justify-center font-bold text-xs shrink-0">
                A
              </div>
              {(!isCollapsed || isMobileOpen) && (
                <div className="flex flex-col truncate">
                  <span className="text-xs font-bold text-[#191b22] truncate">Admin User</span>
                  <span className="text-[10px] text-[#5b5f64] truncate">admin@veritas.io</span>
                </div>
              )}
            </div>

            {(!isCollapsed || isMobileOpen) && (
              <button
                onClick={onExitAdmin}
                className="p-1.5 text-[#5b5f64] hover:text-[#ba1a1a] hover:bg-[#e1e2eb] rounded-md transition-colors shrink-0"
                title="Exit Admin Console"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${isCollapsed ? 'md:ml-20' : 'md:ml-64'} ml-0`}>
        {/* Top Header */}
        <header className="sticky top-0 bg-[#f9f9ff] border-b border-[#c2c6d5] h-16 px-4 md:px-6 flex items-center justify-between z-20 shadow-2xs">
          <div className="flex items-center gap-3">
            {/* Hamburger for Mobile Drawer */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden p-2 text-[#5b5f64] hover:text-[#191b22] hover:bg-[#e1e2eb] rounded-lg transition-colors"
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1 className="text-lg md:text-xl font-bold text-[#191b22]">News Credibility Dashboard</h1>
              <p className="text-[11px] md:text-xs text-[#5b5f64] hidden sm:block">Real-time system health, heuristic metrics & risk oversight</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <div className="relative hidden lg:block w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#727785]" />
              <input
                type="text"
                placeholder="Search assessments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 bg-[#f2f3fd] border border-[#c2c6d5] rounded-lg text-xs text-[#191b22] focus:outline-none focus:border-[#0058bd]"
              />
            </div>

            <div className="flex items-center gap-1.5 md:gap-2">
              <button className="p-2 text-[#5b5f64] hover:text-[#0058bd] hover:bg-[#e1e2eb] rounded-full transition-colors relative">
                <Bell className="w-4 h-4" />
                <span className="w-2 h-2 rounded-full bg-[#0058bd] absolute top-1 right-1"></span>
              </button>

              <button
                onClick={onExitAdmin}
                className="text-xs font-semibold px-2.5 md:px-3 py-1.5 rounded-lg bg-[#e1e2eb] text-[#191b22] hover:bg-[#c2c6d5] transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Canvas */}
        <main className="p-4 md:p-6 max-w-[1280px] w-full mx-auto space-y-8 flex-1">
          {activeAdminTab === 'records' ? (
            <AssessmentRecordsManager onReturnToDashboard={() => setActiveAdminTab('overview')} />
          ) : activeAdminTab === 'rules' ? (
            <HeuristicRulesManager />
          ) : activeAdminTab === 'sources' ? (
            <SourceCredibilityManager />
          ) : (
            <>
              {/* Section 1 — System Overview */}
              <section>
            <h2 className="text-xl font-bold text-[#191b22] mb-4">System Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Primary Activity Card */}
              <div className="md:col-span-2 bg-white rounded-xl border border-[#c2c6d5] p-6 shadow-xs relative overflow-hidden flex flex-col justify-between">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0058bd]"></div>

                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-xs font-bold text-[#5b5f64] uppercase tracking-wider block mb-1">
                      ASSESSMENT ACTIVITY
                    </span>
                    <div className="text-4xl font-bold tracking-tight text-[#191b22]">14,289</div>
                    <div className="text-xs text-[#5b5f64] mt-1">Total Analyses Executed (Last 30 Days)</div>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-[#0058bd] bg-[#d8e2ff] px-3 py-1 rounded-full">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>+12.4% vs last month</span>
                  </div>
                </div>

                {/* SVG Trend Curve */}
                <div className="h-28 w-full mt-2 relative">
                  <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0058bd" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#0058bd" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,24 Q15,18 30,22 T60,12 T80,18 T100,4"
                      fill="none"
                      stroke="#0058bd"
                      strokeWidth="2"
                    />
                    <path
                      d="M0,30 L0,24 Q15,18 30,22 T60,12 T80,18 T100,4 L100,30 Z"
                      fill="url(#blueGradient)"
                    />
                  </svg>
                </div>
              </div>

              {/* Supporting Metrics */}
              <div className="flex flex-col gap-4">
                <div className="bg-white rounded-xl border border-[#c2c6d5] p-4 shadow-xs flex items-center justify-between border-l-4 border-l-[#ba1a1a]">
                  <div>
                    <div className="text-xs font-bold text-[#5b5f64] uppercase tracking-wider mb-1">
                      High & Critical Risk
                    </div>
                    <div className="text-2xl font-bold text-[#191b22]">3,492</div>
                    <div className="text-[11px] text-[#ba1a1a] font-medium">24.4% of overall traffic</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-[#c2c6d5] p-4 shadow-xs flex items-center justify-between border-l-4 border-l-[#b35e00]">
                  <div>
                    <div className="text-xs font-bold text-[#5b5f64] uppercase tracking-wider mb-1">
                      Active Rules
                    </div>
                    <div className="text-2xl font-bold text-[#191b22]">84 Rules</div>
                    <div className="text-[11px] text-[#5b5f64]">Across 5 Heuristic Modules</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#ffdcc4] text-[#8f4a00] flex items-center justify-center">
                    <Sliders className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-[#c2c6d5] p-4 shadow-xs flex items-center justify-between border-l-4 border-l-[#0058bd]">
                  <div>
                    <div className="text-xs font-bold text-[#5b5f64] uppercase tracking-wider mb-1">
                      System Uptime
                    </div>
                    <div className="text-2xl font-bold text-[#191b22]">99.98%</div>
                    <div className="text-[11px] text-emerald-700 font-medium">Sub-second Latency</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#d8e2ff] text-[#0058bd] flex items-center justify-center">
                    <Activity className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 — Heuristic Subsystem Status */}
          <section>
            <h2 className="text-xl font-bold text-[#191b22] mb-4">Heuristic Subsystem Status</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-white border border-[#c2c6d5] rounded-xl p-4 shadow-xs">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-sm text-[#191b22]">Headline</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                </div>
                <div className="text-xs text-[#5b5f64] mb-3">12 Active Rules</div>
                <div className="pt-2 border-t border-[#c2c6d5] text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Healthy
                </div>
              </div>

              <div className="bg-white border border-[#c2c6d5] rounded-xl p-4 shadow-xs">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-sm text-[#191b22]">Source</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                </div>
                <div className="text-xs text-[#5b5f64] mb-3">24 Active Rules</div>
                <div className="pt-2 border-t border-[#c2c6d5] text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Healthy
                </div>
              </div>

              <div className="bg-white border border-[#c2c6d5] rounded-xl p-4 shadow-xs">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-sm text-[#191b22]">Content</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                </div>
                <div className="text-xs text-[#5b5f64] mb-3">31 Active Rules</div>
                <div className="pt-2 border-t border-[#c2c6d5] text-xs text-amber-700 font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Minor Delay
                </div>
              </div>

              <div className="bg-white border border-[#c2c6d5] rounded-xl p-4 shadow-xs">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-sm text-[#191b22]">Evidence</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                </div>
                <div className="text-xs text-[#5b5f64] mb-3">9 Active Rules</div>
                <div className="pt-2 border-t border-[#c2c6d5] text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Healthy
                </div>
              </div>

              <div className="bg-white border border-[#c2c6d5] rounded-xl p-4 shadow-xs">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-sm text-[#191b22]">Style & Tone</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                </div>
                <div className="text-xs text-[#5b5f64] mb-3">8 Active Rules</div>
                <div className="pt-2 border-t border-[#c2c6d5] text-xs text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Healthy
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 — Recent Assessment Records */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#191b22]">Recent Assessment Records</h2>
              <button
                onClick={() => setActiveAdminTab('logs')}
                className="text-xs font-semibold text-[#0058bd] hover:underline flex items-center gap-1"
              >
                <span>View Full Audit Logs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="bg-white rounded-xl border border-[#c2c6d5] shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#f2f3fd] border-b border-[#c2c6d5] text-xs font-bold text-[#5b5f64] uppercase tracking-wider">
                      <th className="p-3">Report ID</th>
                      <th className="p-3">Article Title</th>
                      <th className="p-3">Source Domain</th>
                      <th className="p-3 text-center">Risk Score</th>
                      <th className="p-3">Risk Level</th>
                      <th className="p-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#c2c6d5] text-xs">
                    {sampleReports.map((report) => (
                      <tr key={report.reportId} className="hover:bg-[#f9f9ff] transition-colors">
                        <td className="p-3 font-mono font-bold text-[#0058bd]">{report.reportId}</td>
                        <td className="p-3 font-semibold text-[#191b22] max-w-xs truncate">{report.articleTitle}</td>
                        <td className="p-3 font-mono text-[#5b5f64]">{report.sourceDomain}</td>
                        <td className="p-3 text-center font-mono font-bold">{report.overallRiskScore}/100</td>
                        <td className="p-3">
                          <span
                            className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                              report.overallRiskScore >= 51
                                ? 'bg-[#ffdad6] text-[#93000a]'
                                : report.overallRiskScore >= 26
                                ? 'bg-[#fef7e0] text-[#7a5e00]'
                                : 'bg-[#d3e3fd] text-[#0b57d0]'
                            }`}
                          >
                            {report.riskLevel}
                          </span>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => onSelectReport(report)}
                            className="p-1.5 text-[#0058bd] hover:bg-[#e1e2eb] rounded transition-colors inline-flex items-center gap-1 font-semibold text-xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Audit</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 4 — Source Credibility Allowlist */}
          <section className="bg-white border border-[#c2c6d5] rounded-xl p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="font-bold text-lg text-[#191b22]">Trusted Domain Allowlist Manager</h3>
                <p className="text-xs text-[#5b5f64]">
                  Domains on this list automatically receive lower baseline risk weightings for verified journalism.
                </p>
              </div>

              <form onSubmit={handleAddDomain} className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. nature.com"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  className="px-3 py-1.5 bg-[#f9f9ff] border border-[#c2c6d5] rounded-lg text-xs focus:outline-none focus:border-[#0058bd]"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#0058bd] text-white text-xs font-semibold rounded-lg hover:bg-[#004494] transition-colors flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Domain</span>
                </button>
              </form>
            </div>

            <div className="flex flex-wrap gap-2">
              {trustedDomains.map((domain) => (
                <div
                  key={domain}
                  className="px-3 py-1.5 bg-[#f2f3fd] border border-[#c2c6d5] rounded-lg text-xs font-mono font-medium text-[#191b22] flex items-center gap-2"
                >
                  <span>{domain}</span>
                  <button
                    onClick={() => handleRemoveDomain(domain)}
                    className="text-[#5b5f64] hover:text-[#ba1a1a]"
                    title="Remove domain"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5 — Quick Actions */}
          <section>
            <h2 className="text-xl font-bold text-[#191b22] mb-4">Quick Administration Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setActiveAdminTab('rules')}
                className="group p-4 bg-white border border-[#c2c6d5] hover:border-[#0058bd] rounded-xl shadow-xs transition-all flex items-center justify-between text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#f2f3fd] text-[#0058bd] flex items-center justify-center group-hover:bg-[#0058bd] group-hover:text-white transition-colors">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#191b22]">Manage Rule Weights</h4>
                    <p className="text-xs text-[#5b5f64]">Adjust heuristic penalty thresholds</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#727785] group-hover:text-[#0058bd] transition-colors" />
              </button>

              <button
                onClick={() => setActiveAdminTab('sources')}
                className="group p-4 bg-white border border-[#c2c6d5] hover:border-[#0058bd] rounded-xl shadow-xs transition-all flex items-center justify-between text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#f2f3fd] text-[#0058bd] flex items-center justify-center group-hover:bg-[#0058bd] group-hover:text-white transition-colors">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#191b22]">Trusted Domain Index</h4>
                    <p className="text-xs text-[#5b5f64]">Manage institutional allowlists</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#727785] group-hover:text-[#0058bd] transition-colors" />
              </button>

              <button
                onClick={() => setActiveAdminTab('logs')}
                className="group p-4 bg-white border border-[#c2c6d5] hover:border-[#0058bd] rounded-xl shadow-xs transition-all flex items-center justify-between text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#f2f3fd] text-[#0058bd] flex items-center justify-center group-hover:bg-[#0058bd] group-hover:text-white transition-colors">
                    <FolderOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#191b22]">Audit Log Archives</h4>
                    <p className="text-xs text-[#5b5f64]">Explore historical assessment records</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#727785] group-hover:text-[#0058bd] transition-colors" />
              </button>
            </div>
          </section>
        </>
      )}
    </main>
      </div>
    </div>
  );
};
