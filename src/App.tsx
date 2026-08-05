import React, { useState, useEffect } from 'react';
import { AnalysisReport, SampleArticle } from './types';
import { SAMPLE_ARTICLES } from './data/samples';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ExplainableHeuristics } from './components/ExplainableHeuristics';
import { HowItWorks } from './components/HowItWorks';
import { RiskClassifications } from './components/RiskClassifications';
import { AuditReport } from './components/AuditReport';
import { SubmissionWorkspace } from './components/SubmissionWorkspace';
import { RepositoryView } from './components/RepositoryView';
import { AdminDashboard } from './components/AdminDashboard';
import { DetailedRiskExplanation } from './components/DetailedRiskExplanation';
import { AdminLogin } from './components/AdminLogin';
import { MethodologyModal } from './components/MethodologyModal';
import { AnalyzerModal } from './components/AnalyzerModal';
import { AdminModal } from './components/AdminModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { Footer } from './components/Footer';
import { Search } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'landing' | 'analysis' | 'repository' | 'admin' | 'explanation'>('analysis');
  const [activeReport, setActiveReport] = useState<AnalysisReport>(SAMPLE_ARTICLES[0].presetReport);
  const [savedReports, setSavedReports] = useState<AnalysisReport[]>([]);
  
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAnalyzerOpen, setIsAnalyzerOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);

  // Load saved reports from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('veritas_saved_reports');
      if (stored) {
        setSavedReports(JSON.parse(stored));
      } else {
        // Initialize with default samples for a rich initial experience
        const defaults = SAMPLE_ARTICLES.map((s) => s.presetReport);
        setSavedReports(defaults);
        localStorage.setItem('veritas_saved_reports', JSON.stringify(defaults));
      }
    } catch (e) {
      console.error('Failed to load saved reports', e);
    }
  }, []);

  const handleSaveReport = (report: AnalysisReport) => {
    const exists = savedReports.some((r) => r.reportId === report.reportId);
    let updated: AnalysisReport[];
    if (exists) {
      updated = savedReports.filter((r) => r.reportId !== report.reportId);
    } else {
      updated = [report, ...savedReports];
    }
    setSavedReports(updated);
    localStorage.setItem('veritas_saved_reports', JSON.stringify(updated));
  };

  const handleClearHistory = () => {
    setSavedReports([]);
    localStorage.removeItem('veritas_saved_reports');
  };

  const handleSelectSample = (sample: SampleArticle) => {
    setActiveReport(sample.presetReport);
    setActiveTab('analysis');
    setTimeout(() => {
      const element = document.getElementById('audit-report');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleAnalysisComplete = (newReport: AnalysisReport) => {
    setActiveReport(newReport);
    // Auto save newly generated report
    const updated = [newReport, ...savedReports.filter(r => r.reportId !== newReport.reportId)];
    setSavedReports(updated);
    localStorage.setItem('veritas_saved_reports', JSON.stringify(updated));

    setActiveTab('analysis');
    setTimeout(() => {
      const element = document.getElementById('audit-report');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const isCurrentReportSaved = savedReports.some((r) => r.reportId === activeReport.reportId);

  if (activeTab === 'admin') {
    if (!isAdminAuthenticated) {
      return (
        <AdminLogin
          onLoginSuccess={() => setIsAdminAuthenticated(true)}
          onReturnToLanding={() => setActiveTab('landing')}
        />
      );
    }

    return (
      <>
        <AdminDashboard
          onSelectReport={(report) => {
            setActiveReport(report);
            setActiveTab('analysis');
            setTimeout(() => {
              const element = document.getElementById('audit-report');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }, 100);
          }}
          onOpenRuleConfig={() => setIsAdminOpen(true)}
          onExitAdmin={() => {
            setIsAdminAuthenticated(false);
            setActiveTab('landing');
          }}
        />

        <AdminModal
          isOpen={isAdminOpen}
          onClose={() => setIsAdminOpen(false)}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f9ff] text-[#191b22] font-sans antialiased selection:bg-[#d8e2ff] selection:text-[#001a41]">
      <Navbar
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        onOpenMethodology={() => setIsMethodologyOpen(true)}
        onOpenAnalyzer={() => setIsAnalyzerOpen(true)}
        onOpenAdmin={() => setActiveTab('admin')}
        onOpenHistory={() => setIsHistoryOpen(true)}
        savedCount={savedReports.length}
      />

      <main>
        {activeTab === 'explanation' ? (
          <DetailedRiskExplanation
            report={activeReport}
            onReturnToResults={() => {
              setActiveTab('analysis');
              setTimeout(() => {
                const element = document.getElementById('audit-report');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }, 100);
            }}
            onAnalyzeAnother={() => {
              setActiveTab('analysis');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onReturnHome={() => {
              setActiveTab('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : activeTab === 'analysis' ? (
          <>
            <SubmissionWorkspace
              onAnalysisComplete={handleAnalysisComplete}
              onOpenAuditReport={() => {
                const element = document.getElementById('audit-report');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />

            <AuditReport
              report={activeReport}
              onSaveReport={handleSaveReport}
              isSaved={isCurrentReportSaved}
              onViewDetailedExplanation={() => {
                setActiveTab('explanation');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onAnalyzeAnother={() => {
                setActiveTab('analysis');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onReturnHome={() => {
                setActiveTab('landing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            <ExplainableHeuristics />

            <RiskClassifications />
          </>
        ) : activeTab === 'repository' ? (
          <RepositoryView
            savedReports={savedReports}
            onSelectReport={(report) => {
              setActiveReport(report);
              setActiveTab('analysis');
              setTimeout(() => {
                const element = document.getElementById('audit-report');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }, 100);
            }}
            onOpenAnalyzer={() => setIsAnalyzerOpen(true)}
          />
        ) : (
          <>
            <Hero
              onOpenAnalyzer={() => setActiveTab('analysis')}
              activeReport={activeReport}
              onSelectSample={handleSelectSample}
            />

            <ExplainableHeuristics />

            <HowItWorks />

            <RiskClassifications />

            <AuditReport
              report={activeReport}
              onSaveReport={handleSaveReport}
              isSaved={isCurrentReportSaved}
              onViewDetailedExplanation={() => {
                setActiveTab('explanation');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onAnalyzeAnother={() => {
                setActiveTab('analysis');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onReturnHome={() => {
                setActiveTab('landing');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </>
        )}

        {/* Bottom Call to Action */}
        <section className="py-14 px-4 text-center my-6 relative bg-[#f2f3fd] border-y border-[#c2c6d5]">
          <div className="max-w-xl mx-auto">
            <h2 className="text-2xl font-bold mb-3 text-[#191b22]">
              Ready to evaluate news credibility?
            </h2>
            <p className="text-sm text-[#5b5f64] mb-6">
              Our transparent mathematical heuristics help you deconstruct claims and spot emotional manipulation.
            </p>
            <button
              onClick={() => setActiveTab('analysis')}
              className="font-semibold text-sm text-white bg-[#0058bd] hover:bg-[#004494] rounded-lg px-6 py-3 transition-all shadow-xs inline-flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>Go to Analysis Console</span>
            </button>
          </div>
        </section>
      </main>

      <Footer onOpenAdmin={() => setActiveTab('admin')} />

      {/* Modals & Drawers */}
      <AnalyzerModal
        isOpen={isAnalyzerOpen}
        onClose={() => setIsAnalyzerOpen(false)}
        onAnalysisComplete={handleAnalysisComplete}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      <MethodologyModal
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
      />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        savedReports={savedReports}
        onSelectReport={(report) => {
          setActiveReport(report);
          setActiveTab('analysis');
          setTimeout(() => {
            const element = document.getElementById('audit-report');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }}
        onClearHistory={handleClearHistory}
      />
    </div>
  );
}

