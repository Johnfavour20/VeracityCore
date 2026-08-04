import React from 'react';
import { AnalysisReport } from '../types';
import { X, Bookmark, Trash2, ExternalLink, ChevronRight, History } from 'lucide-react';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedReports: AnalysisReport[];
  onSelectReport: (report: AnalysisReport) => void;
  onClearHistory: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  savedReports,
  onSelectReport,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 flex justify-end">
      <div className="bg-white border-l border-[#c2c6d5] w-full max-w-md h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="bg-[#f2f3fd] px-6 py-4 border-b border-[#c2c6d5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-[#0058bd]" />
            <h3 className="font-bold text-lg text-[#191b22]">Saved Analysis Reports ({savedReports.length})</h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#5b5f64] hover:text-[#191b22] hover:bg-[#e1e2eb] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {savedReports.length === 0 ? (
            <div className="text-center py-12 px-4 text-[#5b5f64]">
              <Bookmark className="w-10 h-10 text-[#c2c6d5] mx-auto mb-3" />
              <p className="font-semibold text-sm">No saved reports yet</p>
              <p className="text-xs mt-1">
                Click "Save Report" on any audit breakdown to store reports for quick reference.
              </p>
            </div>
          ) : (
            savedReports.map((report) => (
              <div
                key={report.reportId}
                onClick={() => {
                  onSelectReport(report);
                  onClose();
                }}
                className="p-4 bg-[#f9f9ff] border border-[#c2c6d5] hover:border-[#0058bd] rounded-xl transition-all cursor-pointer group shadow-xs hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="font-mono text-[10px] bg-[#e1e2eb] text-[#424753] px-2 py-0.5 rounded font-bold">
                    {report.reportId}
                  </span>

                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded ${
                      report.overallRiskScore >= 51
                        ? 'bg-[#ffdad6] text-[#93000a]'
                        : report.overallRiskScore >= 26
                        ? 'bg-[#fef7e0] text-[#7a5e00]'
                        : 'bg-[#d3e3fd] text-[#0b57d0]'
                    }`}
                  >
                    Risk: {report.overallRiskScore}/100
                  </span>
                </div>

                <h4 className="font-semibold text-sm text-[#191b22] line-clamp-2 group-hover:text-[#0058bd] transition-colors">
                  {report.articleTitle}
                </h4>

                <div className="flex items-center justify-between text-xs text-[#5b5f64] mt-3 pt-2 border-t border-[#c2c6d5]">
                  <span>{report.sourceDomain}</span>
                  <span className="flex items-center gap-1 font-semibold text-[#0058bd] group-hover:translate-x-0.5 transition-transform">
                    View Audit <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedReports.length > 0 && (
          <div className="p-4 bg-[#f2f3fd] border-t border-[#c2c6d5] flex justify-between items-center">
            <button
              onClick={onClearHistory}
              className="text-xs font-semibold text-[#ba1a1a] hover:underline flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Saved History</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#191b22] bg-white border border-[#c2c6d5] hover:bg-[#e1e2eb] rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
