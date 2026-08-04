import React, { useState, useMemo } from 'react';
import { CredibilitySource, SourceStatus } from '../types';
import { INITIAL_CREDIBILITY_SOURCES } from '../data/sources';
import {
  Plus,
  Search,
  Filter,
  Sliders,
  Edit2,
  Trash2,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldAlert,
  Globe,
  ExternalLink,
  X,
  ArrowUpDown,
  RefreshCw,
  Sparkles,
  Building2,
  Lock,
  Database,
  ShieldCheck,
  Check
} from 'lucide-react';

export const SourceCredibilityManager: React.FC = () => {
  const [sources, setSources] = useState<CredibilitySource[]>(INITIAL_CREDIBILITY_SOURCES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'updated' | 'alpha' | 'added' | 'status'>('updated');

  // Drawer state for Add / Edit
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingSource, setEditingSource] = useState<CredibilitySource | null>(null);

  // Detail Modal state for previewing
  const [detailSource, setDetailSource] = useState<CredibilitySource | null>(null);

  // Form state
  const [formName, setFormName] = useState('');
  const [formDomain, setFormDomain] = useState('');
  const [formStatus, setFormStatus] = useState<SourceStatus>('Trusted');
  const [formCategory, setFormCategory] = useState('');
  const [formNotes, setFormNotes] = useState('');
  const [formEnabled, setFormEnabled] = useState(true);

  // Helper for status badge styling
  const getStatusBadgeStyle = (status: SourceStatus) => {
    switch (status) {
      case 'Trusted':
        return 'bg-[#e6f4ea] text-[#146c2e] border-[#a8dab5]';
      case 'Monitored':
        return 'bg-[#fef7e0] text-[#b35e00] border-[#fce8b2]';
      case 'Under Review':
        return 'bg-[#e8f0fe] text-[#004494] border-[#a8c7fa]';
      case 'Untrusted':
      default:
        return 'bg-[#ffdad6] text-[#93000a] border-[#ffb4ab]';
    }
  };

  const getStatusIcon = (status: SourceStatus) => {
    switch (status) {
      case 'Trusted':
        return <CheckCircle2 className="w-3.5 h-3.5 text-[#146c2e]" />;
      case 'Monitored':
        return <Eye className="w-3.5 h-3.5 text-[#b35e00]" />;
      case 'Under Review':
        return <Info className="w-3.5 h-3.5 text-[#004494]" />;
      case 'Untrusted':
      default:
        return <ShieldAlert className="w-3.5 h-3.5 text-[#93000a]" />;
    }
  };

  // Open Add Drawer
  const handleOpenAdd = () => {
    setEditingSource(null);
    setFormName('');
    setFormDomain('');
    setFormStatus('Trusted');
    setFormCategory('Digital News');
    setFormNotes('');
    setFormEnabled(true);
    setIsDrawerOpen(true);
  };

  // Open Edit Drawer
  const handleOpenEdit = (source: CredibilitySource) => {
    setEditingSource(source);
    setFormName(source.name);
    setFormDomain(source.domain);
    setFormStatus(source.status);
    setFormCategory(source.category || 'Digital News');
    setFormNotes(source.notes);
    setFormEnabled(source.enabled);
    setIsDrawerOpen(true);
  };

  // Toggle active evaluation status
  const handleToggleEnabled = (id: string) => {
    setSources((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  // Delete source handler
  const handleDeleteSource = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the source directory?`)) {
      setSources((prev) => prev.filter((s) => s.id !== id));
      if (detailSource?.id === id) {
        setDetailSource(null);
      }
    }
  };

  // Form submission
  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formDomain.trim()) return;

    const todayStr = new Date().toISOString().split('T')[0];
    const cleanDomain = formDomain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');

    if (editingSource) {
      setSources((prev) =>
        prev.map((s) =>
          s.id === editingSource.id
            ? {
                ...s,
                name: formName.trim(),
                domain: cleanDomain,
                status: formStatus,
                category: formCategory.trim() || 'Digital News',
                notes: formNotes.trim(),
                enabled: formEnabled,
                lastUpdated: todayStr
              }
            : s
        )
      );
    } else {
      const newSource: CredibilitySource = {
        id: `src-${Date.now()}`,
        name: formName.trim(),
        domain: cleanDomain,
        status: formStatus,
        category: formCategory.trim() || 'Digital News',
        notes: formNotes.trim(),
        enabled: formEnabled,
        dateAdded: todayStr,
        lastUpdated: todayStr
      };
      setSources((prev) => [newSource, ...prev]);
    }

    setIsDrawerOpen(false);
  };

  // Summary Metrics
  const totalSources = sources.length;
  const activeSources = sources.filter((s) => s.enabled).length;
  const trustedCount = sources.filter((s) => s.status === 'Trusted').length;
  const monitoredCount = sources.filter((s) => s.status === 'Monitored').length;
  const underReviewCount = sources.filter((s) => s.status === 'Under Review').length;

  // Filtered and Sorted list
  const filteredSources = useMemo(() => {
    return sources
      .filter((source) => {
        const matchesSearch =
          source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          source.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
          source.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (source.category && source.category.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesStatus = selectedStatus === 'All' || source.status === selectedStatus;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'updated') {
          return (b.lastUpdated || '').localeCompare(a.lastUpdated || '');
        }
        if (sortBy === 'added') {
          return (b.dateAdded || '').localeCompare(a.dateAdded || '');
        }
        if (sortBy === 'alpha') {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === 'status') {
          return a.status.localeCompare(b.status);
        }
        return 0;
      });
  }, [sources, searchQuery, selectedStatus, sortBy]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#c2c6d5]">
        <div>
          <h1 className="text-2xl font-bold text-[#191b22] tracking-tight">Source Credibility</h1>
          <p className="text-xs md:text-sm text-[#5b5f64] mt-1">
            Manage trusted and monitored news sources used during article credibility assessment.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#0058bd] hover:bg-[#004494] text-white text-xs md:text-sm font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Source</span>
        </button>
      </div>

      {/* Source Overview Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Large Primary Card */}
        <div className="md:col-span-6 lg:col-span-4 bg-white rounded-xl border border-[#c2c6d5] p-5 shadow-2xs relative overflow-hidden flex flex-col justify-between">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0058bd]"></div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-[#d8e2ff] text-[#0058bd] flex items-center justify-center shrink-0">
              <Database className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base text-[#191b22]">Trusted Source Directory</h3>
          </div>

          <div className="grid grid-cols-2 gap-4 my-2">
            <div>
              <span className="text-[11px] font-bold text-[#5b5f64] uppercase tracking-wider block">
                Total Sources
              </span>
              <span className="text-3xl font-extrabold text-[#191b22] mt-0.5 block">{totalSources}</span>
            </div>
            <div>
              <span className="text-[11px] font-bold text-[#5b5f64] uppercase tracking-wider block">
                Active Sources
              </span>
              <span className="text-3xl font-extrabold text-[#0058bd] mt-0.5 block">{activeSources}</span>
            </div>
          </div>

          <p className="text-[11px] text-[#5b5f64] pt-3 border-t border-[#c2c6d5] font-medium flex items-center justify-between">
            <span>Directory Version: v2.4</span>
            <span className="font-mono text-[#0058bd]">Last Updated: Today</span>
          </p>
        </div>

        {/* 3 Supporting Metric Cards */}
        <div className="md:col-span-6 lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-[#c2c6d5] p-4 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#5b5f64] uppercase tracking-wider">
                Trusted Sources
              </span>
              <CheckCircle2 className="w-4 h-4 text-[#146c2e]" />
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-3xl font-extrabold text-[#191b22]">{trustedCount}</span>
              <span className="text-xs font-semibold text-[#146c2e] bg-[#e6f4ea] px-2 py-0.5 rounded-full">
                High Integrity
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#c2c6d5] p-4 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#5b5f64] uppercase tracking-wider">
                Monitored Sources
              </span>
              <Eye className="w-4 h-4 text-[#b35e00]" />
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-3xl font-extrabold text-[#191b22]">{monitoredCount}</span>
              <span className="text-xs font-semibold text-[#b35e00] bg-[#fef7e0] px-2 py-0.5 rounded-full">
                Under Watch
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-[#c2c6d5] p-4 shadow-2xs flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#5b5f64] uppercase tracking-wider">
                Recently Added
              </span>
              <Sparkles className="w-4 h-4 text-[#0058bd]" />
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-3xl font-extrabold text-[#191b22]">{underReviewCount}</span>
              <span className="text-xs font-semibold text-[#004494] bg-[#e8f0fe] px-2 py-0.5 rounded-full">
                Under Review
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar: Search & Filters */}
      <div className="bg-white border border-[#c2c6d5] rounded-xl p-4 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#727785]" />
            <input
              type="text"
              placeholder="Search by source name, domain (e.g. reuters.com), or notes..."
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

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-[#f2f3fd] border border-[#c2c6d5] rounded-lg text-xs font-medium text-[#191b22] focus:outline-none focus:border-[#0058bd]"
            >
              <option value="All">All Statuses</option>
              <option value="Trusted">Trusted</option>
              <option value="Monitored">Monitored</option>
              <option value="Under Review">Under Review</option>
              <option value="Untrusted">Untrusted</option>
            </select>

            {/* Sort Options */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-[#f2f3fd] border border-[#c2c6d5] rounded-lg text-xs font-medium text-[#191b22] focus:outline-none focus:border-[#0058bd]"
            >
              <option value="updated">Sort: Recently Updated</option>
              <option value="added">Sort: Date Added</option>
              <option value="alpha">Sort: Alphabetical (A-Z)</option>
              <option value="status">Sort: Credibility Status</option>
            </select>
          </div>
        </div>
      </div>

      {/* Directory Table / Cards Container */}
      <div className="bg-white rounded-xl border border-[#c2c6d5] shadow-2xs overflow-hidden">
        {filteredSources.length > 0 ? (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f2f3fd] border-b border-[#c2c6d5] text-[11px] font-bold text-[#5b5f64] uppercase tracking-wider">
                    <th className="p-4">Source Name</th>
                    <th className="p-4">Domain</th>
                    <th className="p-4">Credibility Status</th>
                    <th className="p-4">Date Added</th>
                    <th className="p-4">Last Updated</th>
                    <th className="p-4 text-center">Active</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c2c6d5] text-xs">
                  {filteredSources.map((source) => (
                    <tr key={source.id} className="hover:bg-[#f9f9ff] transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-[#f2f3fd] border border-[#c2c6d5] flex items-center justify-center text-[#0058bd] shrink-0 font-bold text-xs uppercase">
                            {source.name.slice(0, 2)}
                          </div>
                          <div>
                            <button
                              onClick={() => setDetailSource(source)}
                              className="font-bold text-sm text-[#0058bd] hover:underline text-left cursor-pointer"
                            >
                              {source.name}
                            </button>
                            {source.category && (
                              <span className="text-[10px] text-[#5b5f64] block font-medium">
                                {source.category}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 font-mono text-[#191b22] whitespace-nowrap">
                        <a
                          href={`https://${source.domain}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 hover:text-[#0058bd] hover:underline"
                        >
                          <span>{source.domain}</span>
                          <ExternalLink className="w-3 h-3 text-[#727785]" />
                        </a>
                      </td>
                      <td className="p-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getStatusBadgeStyle(
                            source.status
                          )}`}
                        >
                          {getStatusIcon(source.status)}
                          <span>{source.status}</span>
                        </span>
                      </td>
                      <td className="p-4 font-mono text-[#5b5f64] whitespace-nowrap">
                        {source.dateAdded}
                      </td>
                      <td className="p-4 font-mono text-[#5b5f64] whitespace-nowrap">
                        {source.lastUpdated}
                      </td>
                      <td className="p-4 text-center whitespace-nowrap">
                        <button
                          onClick={() => handleToggleEnabled(source.id)}
                          className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            source.enabled ? 'bg-[#0058bd]' : 'bg-[#c2c6d5]'
                          }`}
                          title={source.enabled ? 'Active in heuristic checking' : 'Disabled'}
                        >
                          <span
                            className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              source.enabled ? 'translate-x-4' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => setDetailSource(source)}
                            className="p-1.5 text-[#5b5f64] hover:text-[#0058bd] hover:bg-[#e1e2eb] rounded-md transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(source)}
                            className="p-1.5 text-[#0058bd] hover:bg-[#e1e2eb] rounded-md transition-colors"
                            title="Edit Source"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSource(source.id, source.name)}
                            className="p-1.5 text-[#ba1a1a] hover:bg-[#ffdad6] rounded-md transition-colors"
                            title="Delete Source"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile / Tablet Stacked Cards View */}
            <div className="md:hidden divide-y divide-[#c2c6d5]">
              {filteredSources.map((source) => (
                <div key={source.id} className="p-4 space-y-3 bg-white hover:bg-[#f9f9ff] transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#f2f3fd] border border-[#c2c6d5] flex items-center justify-center text-[#0058bd] font-bold text-xs">
                        {source.name.slice(0, 2)}
                      </div>
                      <div>
                        <button
                          onClick={() => setDetailSource(source)}
                          className="font-bold text-sm text-[#0058bd] text-left hover:underline"
                        >
                          {source.name}
                        </button>
                        <span className="text-xs font-mono text-[#5b5f64] block">{source.domain}</span>
                      </div>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadgeStyle(
                        source.status
                      )}`}
                    >
                      {source.status}
                    </span>
                  </div>

                  {source.notes && (
                    <p className="text-xs text-[#5b5f64] line-clamp-2 bg-[#f2f3fd] p-2 rounded-lg">
                      {source.notes}
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-2 text-[11px] text-[#5b5f64] border-t border-[#f2f3fd]">
                    <span>Added: {source.dateAdded}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setDetailSource(source)}
                        className="px-2 py-1 bg-[#e1e2eb] text-[#191b22] font-semibold rounded hover:bg-[#c2c6d5]"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleOpenEdit(source)}
                        className="px-2 py-1 bg-[#0058bd] text-white font-semibold rounded hover:bg-[#004494]"
                      >
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Pagination Info */}
            <div className="p-4 border-t border-[#c2c6d5] bg-[#f2f3fd] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#5b5f64]">
              <span>
                Showing <strong className="text-[#191b22]">{filteredSources.length}</strong> of{' '}
                <strong className="text-[#191b22]">{sources.length}</strong> directory entries
              </span>
              <div className="flex items-center gap-1 font-mono">
                <span>Directory Status: Synchronized</span>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[#f2f3fd] text-[#0058bd] flex items-center justify-center mb-3">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[#191b22]">No sources found</h3>
            <p className="text-xs text-[#5b5f64] max-w-md mt-1 mb-4">
              No directory entries match your current search query or active credibility filter status.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedStatus('All');
                }}
                className="px-3 py-1.5 bg-[#e1e2eb] hover:bg-[#c2c6d5] text-[#191b22] text-xs font-semibold rounded-lg transition-colors"
              >
                Reset Filters
              </button>
              <button
                onClick={handleOpenAdd}
                className="px-3 py-1.5 bg-[#0058bd] hover:bg-[#004494] text-white text-xs font-semibold rounded-lg transition-colors"
              >
                Add First Source
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Slide-over Drawer: Add / Edit Source */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsDrawerOpen(false)}
          />

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
              {/* Drawer Header */}
              <div className="p-5 border-b border-[#c2c6d5] flex items-center justify-between bg-[#f2f3fd]">
                <div>
                  <h3 className="text-lg font-bold text-[#191b22]">
                    {editingSource ? 'Edit News Source' : 'Add New News Source'}
                  </h3>
                  <p className="text-xs text-[#5b5f64]">
                    Configure credibility status and administrative domain parameters
                  </p>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 text-[#5b5f64] hover:text-[#191b22] hover:bg-[#e1e2eb] rounded-lg transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Body */}
              <form id="source-form" onSubmit={handleSaveForm} className="p-6 space-y-5 flex-1 overflow-y-auto">
                <div>
                  <label className="block text-xs font-bold text-[#191b22] uppercase tracking-wider mb-1">
                    Source Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Associated Press"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#f9f9ff] border border-[#c2c6d5] rounded-lg text-sm text-[#191b22] focus:outline-none focus:border-[#0058bd]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#191b22] uppercase tracking-wider mb-1">
                    Domain / Website Address *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#727785]">
                      https://
                    </span>
                    <input
                      type="text"
                      required
                      placeholder="apnews.com"
                      value={formDomain}
                      onChange={(e) => setFormDomain(e.target.value)}
                      className="w-full pl-16 pr-3 py-2 bg-[#f9f9ff] border border-[#c2c6d5] rounded-lg text-sm font-mono text-[#191b22] focus:outline-none focus:border-[#0058bd]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#191b22] uppercase tracking-wider mb-1">
                    Credibility Status Classification *
                  </label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as SourceStatus)}
                    className="w-full px-3 py-2 bg-[#f9f9ff] border border-[#c2c6d5] rounded-lg text-sm text-[#191b22] focus:outline-none focus:border-[#0058bd]"
                  >
                    <option value="Trusted">Trusted — Gold Standard / Verified Editorial</option>
                    <option value="Monitored">Monitored — Under Observation / Occasional Flags</option>
                    <option value="Under Review">Under Review — New Domain / Active Investigation</option>
                    <option value="Untrusted">Untrusted — Flagged Impersonator / Unverified Narrative</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#191b22] uppercase tracking-wider mb-1">
                    Outlet Category
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. International Wire Service, Regional, Alternative"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#f9f9ff] border border-[#c2c6d5] rounded-lg text-sm text-[#191b22] focus:outline-none focus:border-[#0058bd]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#191b22] uppercase tracking-wider mb-1">
                    Administrator Notes & Editorial Audit
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Document WHOIS transparency, editorial mastheads, or specific reason for credibility status assignment..."
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    className="w-full px-3 py-2 bg-[#f9f9ff] border border-[#c2c6d5] rounded-lg text-sm text-[#191b22] focus:outline-none focus:border-[#0058bd] resize-none"
                  />
                </div>

                {/* Enabled Toggle */}
                <div className="flex items-center justify-between p-3 border border-[#c2c6d5] rounded-xl bg-[#f2f3fd]">
                  <div>
                    <span className="text-xs font-bold text-[#191b22] block">Directory Active Status</span>
                    <span className="text-[11px] text-[#5b5f64]">
                      {formEnabled ? 'Active in heuristic check rule evaluation' : 'Bypassed during automated scan'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setFormEnabled(!formEnabled)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      formEnabled ? 'bg-[#0058bd]' : 'bg-[#c2c6d5]'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        formEnabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </form>

              {/* Drawer Footer Buttons */}
              <div className="p-4 border-t border-[#c2c6d5] bg-[#f2f3fd] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-4 py-2 border border-[#c2c6d5] text-[#191b22] text-xs font-semibold rounded-lg hover:bg-[#e1e2eb] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="source-form"
                  className="px-4 py-2 bg-[#0058bd] hover:bg-[#004494] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer"
                >
                  {editingSource ? 'Save Source' : 'Add Source'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Source Detail Modal / Preview Inspection */}
      {detailSource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-[#c2c6d5] shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 border-b border-[#c2c6d5] bg-[#f2f3fd] flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#c2c6d5] flex items-center justify-center text-[#0058bd] font-bold text-sm">
                  {detailSource.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#191b22]">{detailSource.name}</h3>
                  <a
                    href={`https://${detailSource.domain}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-[#0058bd] hover:underline flex items-center gap-1"
                  >
                    <span>{detailSource.domain}</span>
                    <ExternalLink className="w-3 h-3 text-[#727785]" />
                  </a>
                </div>
              </div>

              <button
                onClick={() => setDetailSource(null)}
                className="p-1.5 text-[#5b5f64] hover:text-[#191b22] hover:bg-[#e1e2eb] rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-4 text-xs">
              <div className="flex items-center justify-between p-3 bg-[#f9f9ff] border border-[#c2c6d5] rounded-lg">
                <span className="font-bold text-[#5b5f64] uppercase tracking-wider text-[11px]">
                  Credibility Classification
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadgeStyle(
                    detailSource.status
                  )}`}
                >
                  {getStatusIcon(detailSource.status)}
                  <span>{detailSource.status}</span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-[#f2f3fd] rounded-lg border border-[#c2c6d5]">
                  <span className="text-[10px] font-bold text-[#5b5f64] uppercase block">Date Added</span>
                  <span className="font-mono text-[#191b22] font-semibold text-xs mt-0.5 block">
                    {detailSource.dateAdded}
                  </span>
                </div>
                <div className="p-3 bg-[#f2f3fd] rounded-lg border border-[#c2c6d5]">
                  <span className="text-[10px] font-bold text-[#5b5f64] uppercase block">Last Updated</span>
                  <span className="font-mono text-[#191b22] font-semibold text-xs mt-0.5 block">
                    {detailSource.lastUpdated}
                  </span>
                </div>
              </div>

              <div>
                <span className="font-bold text-[#191b22] uppercase tracking-wider text-[11px] block mb-1">
                  Administrator Audit Notes
                </span>
                <p className="text-[#5b5f64] bg-[#f9f9ff] p-3 rounded-lg border border-[#c2c6d5] leading-relaxed">
                  {detailSource.notes || 'No administrative notes recorded for this news source.'}
                </p>
              </div>

              {/* Heuristic System Impact Note */}
              <div className="p-3 bg-[#e8f0fe] border border-[#a8c7fa] rounded-lg text-[#004494]">
                <div className="flex items-center gap-2 font-bold mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#0058bd]" />
                  <span>Heuristic Engine Interaction</span>
                </div>
                <p className="text-[11px] text-[#004494] leading-normal">
                  Articles from this domain bypass <strong>Rule 04 (Unknown Publisher Penalty)</strong> when classified as <em>Trusted</em>, reducing artificial penalty triggers.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#c2c6d5] bg-[#f2f3fd] flex items-center justify-between">
              <button
                onClick={() => handleDeleteSource(detailSource.id, detailSource.name)}
                className="px-3 py-1.5 text-[#ba1a1a] hover:bg-[#ffdad6] font-semibold rounded-lg transition-colors text-xs"
              >
                Delete Source
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDetailSource(null)}
                  className="px-4 py-1.5 border border-[#c2c6d5] text-[#191b22] font-semibold rounded-lg hover:bg-[#e1e2eb] text-xs transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const srcToEdit = detailSource;
                    setDetailSource(null);
                    handleOpenEdit(srcToEdit);
                  }}
                  className="px-4 py-1.5 bg-[#0058bd] hover:bg-[#004494] text-white font-semibold rounded-lg text-xs transition-colors"
                >
                  Edit Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
