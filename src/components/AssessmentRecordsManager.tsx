import React, { useState, useMemo } from 'react';
import { AssessmentRecord, RiskLevelType } from '../types';
import { INITIAL_ASSESSMENT_RECORDS } from '../data/records';
import {
  Search,
  Filter,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldAlert,
  Globe,
  ExternalLink,
  X,
  ChevronDown,
  ChevronUp,
  FileText,
  Clock,
  BarChart3,
  RefreshCw,
  Sparkles,
  ArrowUpDown,
  ShieldCheck,
  Calendar,
  Layers,
  Award,
  AlertCircle,
  TrendingUp,
  Sliders,
  Check
} from 'lucide-react';

interface AssessmentRecordsManagerProps {
  onReturnToDashboard?: () => void;
}

export const AssessmentRecordsManager: React.FC<AssessmentRecordsManagerProps> = ({
  onReturnToDashboard
}) => {
  const [records, setRecords] = useState<AssessmentRecord[]>(INITIAL_ASSESSMENT_RECORDS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRiskFilter, setSelectedRiskFilter] = useState<string>('All');
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>('All Time');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highestRisk' | 'lowestRisk'>('newest');
  
  // Active selected record for Drawer Detail view
  const [selectedRecord, setSelectedRecord] = useState<AssessmentRecord | null>(INITIAL_ASSESSMENT_RECORDS[1] || null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  // Loading state simulation
  const [isLoading, setIsLoading] = useState(false);

  // Accordion state for modules inside drawer (module name -> boolean)
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    headline: true,
    source: true,
    content: false,
    evidence: false,
    writingStyle: false
  });

  const toggleModuleAccordion = (moduleKey: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [moduleKey]: !prev[moduleKey]
    }));
  };

  // Helper for risk badge styling
  const getRiskBadgeStyle = (level: RiskLevelType) => {
    switch (level) {
      case 'Low':
        return 'bg-[#e6f4ea] text-[#146c2e] border-[#a8dab5]';
      case 'Moderate':
        return 'bg-[#fef7e0] text-[#b35e00] border-[#fce8b2]';
      case 'High':
        return 'bg-[#ffdad6] text-[#ba1a1a] border-[#ffb4ab]';
      case 'Critical':
      default:
        return 'bg-[#fce8e6] text-[#c5221f] border-[#f5c2c0]';
    }
  };

  const getRiskIcon = (level: RiskLevelType) => {
    switch (level) {
      case 'Low':
        return <CheckCircle2 className="w-3.5 h-3.5 text-[#146c2e]" />;
      case 'Moderate':
        return <Info className="w-3.5 h-3.5 text-[#b35e00]" />;
      case 'High':
        return <AlertTriangle className="w-3.5 h-3.5 text-[#ba1a1a]" />;
      case 'Critical':
      default:
        return <ShieldAlert className="w-3.5 h-3.5 text-[#c5221f]" />;
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score < 30) return 'bg-[#146c2e] text-[#146c2e]';
    if (score < 60) return 'bg-[#b35e00] text-[#b35e00]';
    if (score < 80) return 'bg-[#ba1a1a] text-[#ba1a1a]';
    return 'bg-[#c5221f] text-[#c5221f]';
  };

  // Filter & Sort records
  const filteredRecords = useMemo(() => {
    return records
      .filter((rec) => {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          rec.id.toLowerCase().includes(query) ||
          rec.articleTitle.toLowerCase().includes(query) ||
          rec.sourceDomain.toLowerCase().includes(query) ||
          rec.recommendation.toLowerCase().includes(query);

        const matchesRisk =
          selectedRiskFilter === 'All' || rec.riskLevel === selectedRiskFilter;

        let matchesDate = true;
        if (selectedDateFilter === 'Today') {
          matchesDate = rec.assessmentDate.includes('2026-08-04');
        } else if (selectedDateFilter === 'Last 7 Days') {
          matchesDate = true; // All sample records are within past week
        }

        return matchesSearch && matchesRisk && matchesDate;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return b.id.localeCompare(a.id);
        }
        if (sortBy === 'oldest') {
          return a.id.localeCompare(b.id);
        }
        if (sortBy === 'highestRisk') {
          return b.riskScore - a.riskScore;
        }
        if (sortBy === 'lowestRisk') {
          return a.riskScore - b.riskScore;
        }
        return 0;
      });
  }, [records, searchQuery, selectedRiskFilter, selectedDateFilter, sortBy]);

  // Handle Refresh simulation
  const handleRefreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  };

  // Open Record Drawer
  const handleSelectRecord = (rec: AssessmentRecord) => {
    setSelectedRecord(rec);
    setIsDrawerOpen(true);
  };

  // Summary Overview Calculations
  const totalCount = records.length;
  const lowCount = records.filter((r) => r.riskLevel === 'Low').length;
  const highCritCount = records.filter(
    (r) => r.riskLevel === 'High' || r.riskLevel === 'Critical'
  ).length;
  const avgScore = Math.round(
    records.reduce((acc, r) => acc + r.riskScore, 0) / (totalCount || 1)
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#c2c6d5]">
        <div>
          <h1 className="text-2xl font-bold text-[#191b22] tracking-tight">Assessment Records</h1>
          <p className="text-xs md:text-sm text-[#5b5f64] mt-1">
            Review completed article credibility assessments and their heuristic findings.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefreshData}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-[#c2c6d5] hover:bg-[#f2f3fd] text-[#191b22] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
            title="Refresh assessment dataset"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#0058bd] ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          {onReturnToDashboard && (
            <button
              onClick={onReturnToDashboard}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#0058bd] hover:bg-[#004494] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Return to Dashboard</span>
            </button>
          )}
        </div>
      </div>

      {/* Overview Section (One Large Summary Card + 3 Supporting Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Large Primary Card */}
        <div className="md:col-span-6 lg:col-span-5 bg-white rounded-xl border border-[#c2c6d5] p-5 shadow-2xs relative overflow-hidden flex flex-col justify-between">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0058bd]"></div>

          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#d8e2ff] text-[#0058bd] flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-base text-[#191b22]">Assessment Summary</h3>
            </div>
            <span className="text-[10px] font-bold text-[#0058bd] bg-[#e8f0fe] px-2 py-0.5 rounded-full uppercase tracking-wider">
              System Audit Log
            </span>
          </div>

          <div className="my-3">
            <span className="text-[11px] font-bold text-[#5b5f64] uppercase tracking-wider block">
              Total Completed Assessments
            </span>
            <div className="flex items-baseline gap-2 mt-0.5">
              <span className="text-3xl font-extrabold text-[#191b22]">14,289</span>
              <span className="text-xs text-[#146c2e] font-semibold bg-[#e6f4ea] px-2 py-0.5 rounded-full">
                +142 Today
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-3 border-t border-[#c2c6d5] text-xs">
            <div>
              <span className="text-[11px] font-bold text-[#5b5f64] uppercase block">Today's Audits</span>
              <span className="font-bold text-[#191b22] text-sm mt-0.5 block">142 Articles</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#5b5f64] uppercase block">Last Assessment Time</span>
              <span className="font-mono text-[#0058bd] font-semibold text-xs mt-0.5 block">
                2 mins ago
              </span>
            </div>
          </div>
        </div>

        {/* 3 Supporting Metric Cards */}
        <div className="md:col-span-6 lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-[#c2c6d5] border-l-4 border-l-[#146c2e] p-4 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold text-[#5b5f64] uppercase tracking-wider">
                Low Risk Articles
              </span>
              <CheckCircle2 className="w-4 h-4 text-[#146c2e]" />
            </div>
            <div className="mt-2">
              <span className="text-2xl md:text-3xl font-extrabold text-[#191b22]">8,402</span>
              <p className="text-[11px] text-[#146c2e] font-semibold mt-1 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>58% of Total Volume</span>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#c2c6d5] border-l-4 border-l-[#ba1a1a] p-4 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold text-[#5b5f64] uppercase tracking-wider">
                High & Critical Risk
              </span>
              <ShieldAlert className="w-4 h-4 text-[#ba1a1a]" />
            </div>
            <div className="mt-2">
              <span className="text-2xl md:text-3xl font-extrabold text-[#191b22]">2,154</span>
              <p className="text-[11px] text-[#ba1a1a] font-semibold mt-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                <span>Action Required</span>
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#c2c6d5] border-l-4 border-l-[#0058bd] p-4 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-bold text-[#5b5f64] uppercase tracking-wider">
                Average Risk Score
              </span>
              <BarChart3 className="w-4 h-4 text-[#0058bd]" />
            </div>
            <div className="mt-2">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl md:text-3xl font-extrabold text-[#191b22]">42</span>
                <span className="text-xs text-[#5b5f64] font-semibold">/100</span>
              </div>
              <p className="text-[11px] text-[#5b5f64] font-medium mt-1">
                Moderate Baseline Level
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar: Search, Filters & Sort */}
      <div className="bg-white border border-[#c2c6d5] rounded-xl p-4 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#727785]" />
            <input
              type="text"
              placeholder="Search by assessment ID (#VR-8491), article title, or domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#f2f3fd] border border-[#c2c6d5] rounded-lg text-xs md:text-sm text-[#191b22] focus:outline-none focus:border-[#0058bd] focus:bg-white transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#727785] hover:text-[#191b22]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Risk Level Filter */}
            <div className="flex items-center gap-1.5 bg-[#f2f3fd] border border-[#c2c6d5] rounded-lg px-2.5 py-1.5">
              <Filter className="w-3.5 h-3.5 text-[#5b5f64]" />
              <select
                value={selectedRiskFilter}
                onChange={(e) => setSelectedRiskFilter(e.target.value)}
                className="bg-transparent text-xs font-medium text-[#191b22] focus:outline-none cursor-pointer"
              >
                <option value="All">All Risk Levels</option>
                <option value="Low">Low Risk</option>
                <option value="Moderate">Moderate Risk</option>
                <option value="High">High Risk</option>
                <option value="Critical">Critical Risk</option>
              </select>
            </div>

            {/* Assessment Date Filter */}
            <div className="flex items-center gap-1.5 bg-[#f2f3fd] border border-[#c2c6d5] rounded-lg px-2.5 py-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#5b5f64]" />
              <select
                value={selectedDateFilter}
                onChange={(e) => setSelectedDateFilter(e.target.value)}
                className="bg-transparent text-xs font-medium text-[#191b22] focus:outline-none cursor-pointer"
              >
                <option value="All Time">All Dates</option>
                <option value="Today">Today (Aug 4)</option>
                <option value="Last 7 Days">Last 7 Days</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-1.5 bg-[#f2f3fd] border border-[#c2c6d5] rounded-lg px-2.5 py-1.5">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#5b5f64]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-xs font-medium text-[#191b22] focus:outline-none cursor-pointer"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="oldest">Sort: Oldest First</option>
                <option value="highestRisk">Sort: Highest Risk</option>
                <option value="lowestRisk">Sort: Lowest Risk</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table / Assessment List */}
      <div className="bg-white rounded-xl border border-[#c2c6d5] shadow-2xs overflow-hidden">
        {isLoading ? (
          /* Skeleton Loader */
          <div className="p-6 space-y-4">
            {[1, 2, 3, 4, 5].map((idx) => (
              <div key={idx} className="animate-pulse flex items-center justify-between gap-4 py-3 border-b border-[#f2f3fd]">
                <div className="w-20 h-4 bg-[#e1e2eb] rounded"></div>
                <div className="flex-1 h-4 bg-[#e1e2eb] rounded"></div>
                <div className="w-28 h-4 bg-[#e1e2eb] rounded"></div>
                <div className="w-16 h-6 bg-[#e1e2eb] rounded-full"></div>
                <div className="w-20 h-6 bg-[#e1e2eb] rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredRecords.length > 0 ? (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f2f3fd] border-b border-[#c2c6d5] text-[11px] font-bold text-[#5b5f64] uppercase tracking-wider">
                    <th className="p-4">Assessment ID</th>
                    <th className="p-4">Article Title</th>
                    <th className="p-4">Assessment Date</th>
                    <th className="p-4">Risk Score</th>
                    <th className="p-4">Risk Level</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c2c6d5] text-xs">
                  {filteredRecords.map((rec) => {
                    const isSelected = selectedRecord?.id === rec.id && isDrawerOpen;
                    return (
                      <tr
                        key={rec.id}
                        onClick={() => handleSelectRecord(rec)}
                        className={`transition-colors cursor-pointer group ${
                          isSelected
                            ? 'bg-[#d8e2ff]/40 border-l-4 border-l-[#0058bd]'
                            : 'hover:bg-[#f9f9ff]'
                        }`}
                      >
                        <td className="p-4 font-mono font-bold text-[#0058bd] whitespace-nowrap">
                          #{rec.id}
                        </td>
                        <td className="p-4 max-w-md">
                          <div className="font-bold text-sm text-[#191b22] line-clamp-1 group-hover:text-[#0058bd] transition-colors">
                            {rec.articleTitle}
                          </div>
                          <span className="font-mono text-[11px] text-[#5b5f64] block mt-0.5">
                            {rec.sourceDomain}
                          </span>
                        </td>
                        <td className="p-4 font-mono text-[#5b5f64] whitespace-nowrap">
                          {rec.assessmentDate}
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-[#e1e2eb] rounded-full overflow-hidden">
                              <div
                                className={`h-full ${getRiskScoreColor(rec.riskScore).split(' ')[0]}`}
                                style={{ width: `${Math.min(100, Math.max(5, rec.riskScore))}%` }}
                              />
                            </div>
                            <span className="font-bold text-xs text-[#191b22] font-mono">
                              {rec.riskScore}
                            </span>
                          </div>
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getRiskBadgeStyle(
                              rec.riskLevel
                            )}`}
                          >
                            {getRiskIcon(rec.riskLevel)}
                            <span>{rec.riskLevel}</span>
                          </span>
                        </td>
                        <td className="p-4 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#e1e2eb] text-[#191b22] text-[11px] font-semibold">
                            {rec.status}
                          </span>
                        </td>
                        <td className="p-4 text-right whitespace-nowrap">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSelectRecord(rec);
                            }}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-white border border-[#c2c6d5] hover:bg-[#0058bd] hover:text-white text-[#0058bd] text-xs font-semibold rounded-lg transition-colors shadow-2xs"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Details</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Stacked Assessment Cards */}
            <div className="md:hidden divide-y divide-[#c2c6d5]">
              {filteredRecords.map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => handleSelectRecord(rec)}
                  className="p-4 space-y-3 bg-white hover:bg-[#f9f9ff] transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#0058bd]">#{rec.id}</span>
                      <h4 className="font-bold text-sm text-[#191b22] line-clamp-2 mt-0.5">
                        {rec.articleTitle}
                      </h4>
                      <span className="text-xs font-mono text-[#5b5f64]">{rec.sourceDomain}</span>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border shrink-0 ${getRiskBadgeStyle(
                        rec.riskLevel
                      )}`}
                    >
                      {rec.riskLevel}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#f2f3fd] text-xs">
                    <span className="text-[#5b5f64] font-mono">{rec.assessmentDate}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectRecord(rec);
                      }}
                      className="px-3 py-1 bg-[#0058bd] text-white font-semibold rounded-lg text-xs"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Table Footer */}
            <div className="p-4 border-t border-[#c2c6d5] bg-[#f2f3fd] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#5b5f64]">
              <span>
                Showing <strong className="text-[#191b22]">{filteredRecords.length}</strong> of{' '}
                <strong className="text-[#191b22]">{records.length}</strong> assessment records
              </span>
              <div className="flex items-center gap-1">
                <button
                  disabled
                  className="px-2.5 py-1 bg-white border border-[#c2c6d5] rounded text-xs opacity-50 cursor-not-allowed"
                >
                  Previous
                </button>
                <button className="px-2.5 py-1 bg-[#0058bd] text-white rounded text-xs font-bold">1</button>
                <button className="px-2.5 py-1 bg-white border border-[#c2c6d5] rounded text-xs hover:bg-[#e1e2eb]">
                  2
                </button>
                <button className="px-2.5 py-1 bg-white border border-[#c2c6d5] rounded text-xs hover:bg-[#e1e2eb]">
                  Next
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-[#f2f3fd] text-[#0058bd] flex items-center justify-center mb-3">
              <FileText className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-base text-[#191b22]">No assessment records available.</h3>
            <p className="text-xs text-[#5b5f64] max-w-md mt-1 mb-4">
              No article audits match your active search terms or risk level filter settings.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedRiskFilter('All');
                  setSelectedDateFilter('All Time');
                }}
                className="px-4 py-2 bg-[#e1e2eb] hover:bg-[#c2c6d5] text-[#191b22] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
              {onReturnToDashboard && (
                <button
                  onClick={onReturnToDashboard}
                  className="px-4 py-2 bg-[#0058bd] hover:bg-[#004494] text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Return to Dashboard
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Assessment Detail Drawer / Right-Side Slide-Over */}
      {isDrawerOpen && selectedRecord && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Overlay */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-2xl bg-white shadow-2xl flex flex-col justify-between">
              {/* Drawer Header */}
              <div className="p-5 border-b border-[#c2c6d5] bg-[#f2f3fd] flex items-center justify-between sticky top-0 z-10">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-[#191b22]">Assessment Details</h3>
                    <span className="px-2 py-0.5 bg-white border border-[#c2c6d5] font-mono text-xs font-bold text-[#0058bd] rounded">
                      #{selectedRecord.id}
                    </span>
                  </div>
                  <p className="text-xs text-[#5b5f64]">
                    Completed {selectedRecord.assessmentDate}
                  </p>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 text-[#5b5f64] hover:text-[#191b22] hover:bg-[#e1e2eb] rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="p-6 space-y-6 flex-1 overflow-y-auto text-xs">
                {/* Section 1: Article Information */}
                <div className="bg-[#f9f9ff] border border-[#c2c6d5] rounded-xl p-4 space-y-3">
                  <div className="flex items-center justify-between border-b border-[#c2c6d5] pb-2">
                    <span className="text-[11px] font-bold text-[#5b5f64] uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-[#0058bd]" />
                      Article Information
                    </span>
                    <span className="font-mono text-[11px] text-[#5b5f64]">ID: {selectedRecord.id}</span>
                  </div>

                  <h4 className="text-sm md:text-base font-bold text-[#191b22] leading-snug">
                    {selectedRecord.articleTitle}
                  </h4>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div>
                      <span className="text-[10px] text-[#5b5f64] uppercase font-bold block">Source Outlet</span>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Globe className="w-3.5 h-3.5 text-[#0058bd]" />
                        <span className="font-mono font-semibold text-[#191b22]">
                          {selectedRecord.sourceDomain}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#5b5f64] uppercase font-bold block">Assessment Date</span>
                      <span className="font-mono text-[#191b22] font-semibold mt-0.5 block">
                        {selectedRecord.assessmentDate}
                      </span>
                    </div>

                    {selectedRecord.articleUrl && (
                      <div className="col-span-2">
                        <span className="text-[10px] text-[#5b5f64] uppercase font-bold block">Source URL</span>
                        <a
                          href={selectedRecord.articleUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="font-mono text-[#0058bd] hover:underline inline-flex items-center gap-1 mt-0.5 break-all"
                        >
                          <span>{selectedRecord.articleUrl}</span>
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Section 2: Assessment Summary */}
                <div className="bg-white border border-[#c2c6d5] rounded-xl p-5 shadow-2xs space-y-4 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#5b5f64] uppercase tracking-wider flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#0058bd]" />
                      Assessment Summary
                    </span>

                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getRiskBadgeStyle(
                        selectedRecord.riskLevel
                      )}`}
                    >
                      {getRiskIcon(selectedRecord.riskLevel)}
                      <span>{selectedRecord.riskLevel} Risk</span>
                    </span>
                  </div>

                  {/* Score Display & Recommendation */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-[#f2f3fd] p-4 rounded-xl border border-[#c2c6d5]">
                    <div className="flex flex-col items-center justify-center bg-white border-2 border-[#c2c6d5] w-20 h-20 rounded-full shrink-0 shadow-2xs">
                      <span className={`text-2xl font-extrabold ${getRiskScoreColor(selectedRecord.riskScore).split(' ')[1]}`}>
                        {selectedRecord.riskScore}
                      </span>
                      <span className="text-[9px] font-bold text-[#5b5f64] uppercase">RISK SCORE</span>
                    </div>

                    <div className="space-y-1">
                      <h5 className="font-bold text-xs text-[#191b22] uppercase tracking-wider">
                        Action Recommendation
                      </h5>
                      <p className="text-xs text-[#191b22] leading-relaxed">
                        {selectedRecord.recommendation}
                      </p>
                    </div>
                  </div>

                  {selectedRecord.summaryNotes && (
                    <div>
                      <span className="text-[10px] font-bold text-[#5b5f64] uppercase block mb-1">
                        System Audit Notes
                      </span>
                      <p className="text-xs text-[#5b5f64] bg-[#f9f9ff] p-3 rounded-lg border border-[#c2c6d5] leading-relaxed">
                        {selectedRecord.summaryNotes}
                      </p>
                    </div>
                  )}
                </div>

                {/* Section 3: Heuristic Findings (5 Modules) */}
                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-[#191b22] flex items-center gap-1.5">
                    <Sliders className="w-4 h-4 text-[#0058bd]" />
                    <span>Heuristic Findings by Analysis Module</span>
                  </h4>

                  {/* Module 1: Headline Analysis */}
                  <div className="border border-[#c2c6d5] rounded-xl overflow-hidden bg-white">
                    <button
                      onClick={() => toggleModuleAccordion('headline')}
                      className="w-full p-3.5 bg-[#f2f3fd] hover:bg-[#e1e2eb] transition-colors flex items-center justify-between text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#0058bd]" />
                        <span className="font-bold text-xs text-[#191b22]">Headline Analysis</span>
                        <span className="text-[10px] font-mono text-[#5b5f64] bg-white px-2 py-0.5 rounded border border-[#c2c6d5]">
                          Weight: {selectedRecord.modules.headline.weight}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            selectedRecord.modules.headline.status === 'check'
                              ? 'bg-[#e6f4ea] text-[#146c2e]'
                              : selectedRecord.modules.headline.status === 'warning'
                              ? 'bg-[#fef7e0] text-[#b35e00]'
                              : 'bg-[#ffdad6] text-[#ba1a1a]'
                          }`}
                        >
                          {selectedRecord.modules.headline.status.toUpperCase()}
                        </span>
                        {expandedModules.headline ? (
                          <ChevronUp className="w-4 h-4 text-[#5b5f64]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#5b5f64]" />
                        )}
                      </div>
                    </button>

                    {expandedModules.headline && (
                      <div className="p-4 space-y-2 border-t border-[#c2c6d5] bg-white">
                        <p className="text-xs text-[#191b22]">
                          {selectedRecord.modules.headline.summary}
                        </p>
                        {selectedRecord.modules.headline.flags && selectedRecord.modules.headline.flags.length > 0 && (
                          <div className="bg-[#ffdad6]/40 border border-[#ffb4ab] rounded-lg p-2.5 space-y-1">
                            <span className="text-[10px] font-bold text-[#ba1a1a] uppercase block">
                              Extracted Penalty Flags:
                            </span>
                            <ul className="list-disc list-inside text-xs text-[#ba1a1a] space-y-0.5">
                              {selectedRecord.modules.headline.flags.map((flag, idx) => (
                                <li key={idx}>{flag}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Module 2: Source Credibility */}
                  <div className="border border-[#c2c6d5] rounded-xl overflow-hidden bg-white">
                    <button
                      onClick={() => toggleModuleAccordion('source')}
                      className="w-full p-3.5 bg-[#f2f3fd] hover:bg-[#e1e2eb] transition-colors flex items-center justify-between text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-[#0058bd]" />
                        <span className="font-bold text-xs text-[#191b22]">Source Credibility</span>
                        <span className="text-[10px] font-mono text-[#5b5f64] bg-white px-2 py-0.5 rounded border border-[#c2c6d5]">
                          Weight: {selectedRecord.modules.source.weight}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            selectedRecord.modules.source.status === 'check'
                              ? 'bg-[#e6f4ea] text-[#146c2e]'
                              : selectedRecord.modules.source.status === 'warning'
                              ? 'bg-[#fef7e0] text-[#b35e00]'
                              : 'bg-[#ffdad6] text-[#ba1a1a]'
                          }`}
                        >
                          {selectedRecord.modules.source.status.toUpperCase()}
                        </span>
                        {expandedModules.source ? (
                          <ChevronUp className="w-4 h-4 text-[#5b5f64]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#5b5f64]" />
                        )}
                      </div>
                    </button>

                    {expandedModules.source && (
                      <div className="p-4 space-y-2 border-t border-[#c2c6d5] bg-white">
                        <p className="text-xs text-[#191b22]">
                          {selectedRecord.modules.source.summary}
                        </p>
                        {selectedRecord.modules.source.flags && selectedRecord.modules.source.flags.length > 0 && (
                          <div className="bg-[#ffdad6]/40 border border-[#ffb4ab] rounded-lg p-2.5 space-y-1">
                            <span className="text-[10px] font-bold text-[#ba1a1a] uppercase block">
                              Extracted Penalty Flags:
                            </span>
                            <ul className="list-disc list-inside text-xs text-[#ba1a1a] space-y-0.5">
                              {selectedRecord.modules.source.flags.map((flag, idx) => (
                                <li key={idx}>{flag}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Module 3: Content Analysis */}
                  <div className="border border-[#c2c6d5] rounded-xl overflow-hidden bg-white">
                    <button
                      onClick={() => toggleModuleAccordion('content')}
                      className="w-full p-3.5 bg-[#f2f3fd] hover:bg-[#e1e2eb] transition-colors flex items-center justify-between text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-[#0058bd]" />
                        <span className="font-bold text-xs text-[#191b22]">Content Analysis</span>
                        <span className="text-[10px] font-mono text-[#5b5f64] bg-white px-2 py-0.5 rounded border border-[#c2c6d5]">
                          Weight: {selectedRecord.modules.content.weight}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            selectedRecord.modules.content.status === 'check'
                              ? 'bg-[#e6f4ea] text-[#146c2e]'
                              : selectedRecord.modules.content.status === 'warning'
                              ? 'bg-[#fef7e0] text-[#b35e00]'
                              : 'bg-[#ffdad6] text-[#ba1a1a]'
                          }`}
                        >
                          {selectedRecord.modules.content.status.toUpperCase()}
                        </span>
                        {expandedModules.content ? (
                          <ChevronUp className="w-4 h-4 text-[#5b5f64]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#5b5f64]" />
                        )}
                      </div>
                    </button>

                    {expandedModules.content && (
                      <div className="p-4 space-y-2 border-t border-[#c2c6d5] bg-white">
                        <p className="text-xs text-[#191b22]">
                          {selectedRecord.modules.content.summary}
                        </p>
                        {selectedRecord.modules.content.flags && selectedRecord.modules.content.flags.length > 0 && (
                          <div className="bg-[#ffdad6]/40 border border-[#ffb4ab] rounded-lg p-2.5 space-y-1">
                            <span className="text-[10px] font-bold text-[#ba1a1a] uppercase block">
                              Extracted Penalty Flags:
                            </span>
                            <ul className="list-disc list-inside text-xs text-[#ba1a1a] space-y-0.5">
                              {selectedRecord.modules.content.flags.map((flag, idx) => (
                                <li key={idx}>{flag}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Module 4: Evidence & Citation Analysis */}
                  <div className="border border-[#c2c6d5] rounded-xl overflow-hidden bg-white">
                    <button
                      onClick={() => toggleModuleAccordion('evidence')}
                      className="w-full p-3.5 bg-[#f2f3fd] hover:bg-[#e1e2eb] transition-colors flex items-center justify-between text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-[#0058bd]" />
                        <span className="font-bold text-xs text-[#191b22]">Evidence & Citation Analysis</span>
                        <span className="text-[10px] font-mono text-[#5b5f64] bg-white px-2 py-0.5 rounded border border-[#c2c6d5]">
                          Weight: {selectedRecord.modules.evidence.weight}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            selectedRecord.modules.evidence.status === 'check'
                              ? 'bg-[#e6f4ea] text-[#146c2e]'
                              : selectedRecord.modules.evidence.status === 'warning'
                              ? 'bg-[#fef7e0] text-[#b35e00]'
                              : 'bg-[#ffdad6] text-[#ba1a1a]'
                          }`}
                        >
                          {selectedRecord.modules.evidence.status.toUpperCase()}
                        </span>
                        {expandedModules.evidence ? (
                          <ChevronUp className="w-4 h-4 text-[#5b5f64]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#5b5f64]" />
                        )}
                      </div>
                    </button>

                    {expandedModules.evidence && (
                      <div className="p-4 space-y-2 border-t border-[#c2c6d5] bg-white">
                        <p className="text-xs text-[#191b22]">
                          {selectedRecord.modules.evidence.summary}
                        </p>
                        {selectedRecord.modules.evidence.flags && selectedRecord.modules.evidence.flags.length > 0 && (
                          <div className="bg-[#ffdad6]/40 border border-[#ffb4ab] rounded-lg p-2.5 space-y-1">
                            <span className="text-[10px] font-bold text-[#ba1a1a] uppercase block">
                              Extracted Penalty Flags:
                            </span>
                            <ul className="list-disc list-inside text-xs text-[#ba1a1a] space-y-0.5">
                              {selectedRecord.modules.evidence.flags.map((flag, idx) => (
                                <li key={idx}>{flag}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Module 5: Writing Style Analysis */}
                  <div className="border border-[#c2c6d5] rounded-xl overflow-hidden bg-white">
                    <button
                      onClick={() => toggleModuleAccordion('writingStyle')}
                      className="w-full p-3.5 bg-[#f2f3fd] hover:bg-[#e1e2eb] transition-colors flex items-center justify-between text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#0058bd]" />
                        <span className="font-bold text-xs text-[#191b22]">Writing Style Analysis</span>
                        <span className="text-[10px] font-mono text-[#5b5f64] bg-white px-2 py-0.5 rounded border border-[#c2c6d5]">
                          Weight: {selectedRecord.modules.writingStyle.weight}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            selectedRecord.modules.writingStyle.status === 'check'
                              ? 'bg-[#e6f4ea] text-[#146c2e]'
                              : selectedRecord.modules.writingStyle.status === 'warning'
                              ? 'bg-[#fef7e0] text-[#b35e00]'
                              : 'bg-[#ffdad6] text-[#ba1a1a]'
                          }`}
                        >
                          {selectedRecord.modules.writingStyle.status.toUpperCase()}
                        </span>
                        {expandedModules.writingStyle ? (
                          <ChevronUp className="w-4 h-4 text-[#5b5f64]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#5b5f64]" />
                        )}
                      </div>
                    </button>

                    {expandedModules.writingStyle && (
                      <div className="p-4 space-y-2 border-t border-[#c2c6d5] bg-white">
                        <p className="text-xs text-[#191b22]">
                          {selectedRecord.modules.writingStyle.summary}
                        </p>
                        {selectedRecord.modules.writingStyle.flags && selectedRecord.modules.writingStyle.flags.length > 0 && (
                          <div className="bg-[#ffdad6]/40 border border-[#ffb4ab] rounded-lg p-2.5 space-y-1">
                            <span className="text-[10px] font-bold text-[#ba1a1a] uppercase block">
                              Extracted Penalty Flags:
                            </span>
                            <ul className="list-disc list-inside text-xs text-[#ba1a1a] space-y-0.5">
                              {selectedRecord.modules.writingStyle.flags.map((flag, idx) => (
                                <li key={idx}>{flag}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Drawer Footer Buttons */}
              <div className="p-4 border-t border-[#c2c6d5] bg-[#f2f3fd] flex items-center justify-end gap-3">
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-4 py-2 border border-[#c2c6d5] text-[#191b22] text-xs font-semibold rounded-lg hover:bg-[#e1e2eb] transition-colors cursor-pointer"
                >
                  Close Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
