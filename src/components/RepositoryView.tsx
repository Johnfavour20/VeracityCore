import React, { useState } from 'react';
import { AnalysisReport } from '../types';
import { Search, Filter, Bookmark, ChevronRight, ShieldAlert, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';

interface RepositoryViewProps {
  savedReports: AnalysisReport[];
  onSelectReport: (report: AnalysisReport) => void;
  onOpenAnalyzer: () => void;
}

export const RepositoryView: React.FC<RepositoryViewProps> = ({
  savedReports,
  onSelectReport,
  onOpenAnalyzer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('all');

  const filteredReports = savedReports.filter((report) => {
    const matchesSearch =
      report.articleTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.sourceDomain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reportId.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (riskFilter === 'low') return report.overallRiskScore <= 25;
    if (riskFilter === 'moderate') return report.overallRiskScore >= 26 && report.overallRiskScore <= 50;
    if (riskFilter === 'high') return report.overallRiskScore >= 51;

    return true;
  });

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-8 py-8 md:py-12 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#191b22]">Article Credibility Repository</h1>
          <p className="text-sm text-[#5b5f64] mt-1">
            Searchable index of previously evaluated news articles and heuristic audit reports.
          </p>
        </div>

        <button
          onClick={onOpenAnalyzer}
          className="font-semibold text-sm text-white bg-[#0058bd] hover:bg-[#004494] px-4 py-2.5 rounded-lg transition-all shadow-xs flex items-center justify-center gap-2 self-start md:self-auto"
        >
          <Search className="w-4 h-4" />
          <span>Submit New Article</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#c2c6d5] rounded-xl p-4 mb-8 shadow-xs flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3 top-3 text-[#727785]" />
          <input
            type="text"
            placeholder="Search repository by title, domain, or Report ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#f9f9ff] border border-[#c2c6d5] rounded-lg text-sm text-[#191b22] placeholder-[#727785] focus:outline-none focus:border-[#0058bd]"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-4 h-4 text-[#5b5f64]" />
          <span className="text-xs font-bold text-[#5b5f64] uppercase tracking-wider">Filter Risk:</span>
          <div className="flex gap-1.5 overflow-x-auto">
            {['all', 'low', 'moderate', 'high'].map((level) => (
              <button
                key={level}
                onClick={() => setRiskFilter(level)}
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg border capitalize transition-colors ${
                  riskFilter === level
                    ? 'bg-[#0058bd] text-white border-[#0058bd]'
                    : 'bg-[#f9f9ff] text-[#424753] border-[#c2c6d5] hover:bg-[#e1e2eb]'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Reports */}
      {filteredReports.length === 0 ? (
        <div className="text-center py-16 bg-white border border-[#c2c6d5] rounded-xl p-8">
          <ShieldAlert className="w-12 h-12 text-[#c2c6d5] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-[#191b22]">No Reports Found</h3>
          <p className="text-xs text-[#5b5f64] max-w-md mx-auto mt-1">
            No archived articles matched your current query or filter criteria. Try adjusting your search query.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report) => {
            const isHighRisk = report.overallRiskScore >= 51;
            const isModRisk = report.overallRiskScore >= 26 && report.overallRiskScore < 51;

            return (
              <div
                key={report.reportId}
                onClick={() => onSelectReport(report)}
                className="bg-white border border-[#c2c6d5] hover:border-[#0058bd] rounded-xl p-5 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-mono text-[10px] font-bold bg-[#e1e2eb] text-[#424753] px-2 py-0.5 rounded border border-[#c2c6d5]">
                      {report.reportId}
                    </span>

                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        isHighRisk
                          ? 'bg-[#ffdad6] text-[#93000a]'
                          : isModRisk
                          ? 'bg-[#fef7e0] text-[#7a5e00]'
                          : 'bg-[#d3e3fd] text-[#0b57d0]'
                      }`}
                    >
                      {report.overallRiskScore}/100 ({report.riskLevel})
                    </span>
                  </div>

                  <h3 className="font-semibold text-base text-[#191b22] line-clamp-2 group-hover:text-[#0058bd] transition-colors mb-2">
                    {report.articleTitle}
                  </h3>

                  <p className="text-xs text-[#5b5f64] line-clamp-3 leading-relaxed mb-4">
                    {report.summaryText}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#c2c6d5] flex items-center justify-between text-xs text-[#5b5f64]">
                  <span className="font-mono">{report.sourceDomain}</span>
                  <span className="font-semibold text-[#0058bd] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    View Audit Report <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
