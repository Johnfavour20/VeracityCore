import React, { useState, useMemo } from 'react';
import { HeuristicRule } from '../types';
import { INITIAL_HEURISTIC_RULES } from '../data/rules';
import {
  Plus,
  Search,
  Filter,
  SlidersHorizontal,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  X,
  Sliders,
  AlertTriangle,
  Info,
  ShieldAlert,
  ArrowUpDown,
  RefreshCw,
  Sparkles
} from 'lucide-react';

const CATEGORIES = [
  'Headline Analysis',
  'Source Credibility',
  'Content Analysis',
  'Evidence & Citation Analysis',
  'Writing Style Analysis'
] as const;

export const HeuristicRulesManager: React.FC = () => {
  const [rules, setRules] = useState<HeuristicRule[]>(INITIAL_HEURISTIC_RULES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Active' | 'Inactive'>('All');
  const [sortBy, setSortBy] = useState<'weight-desc' | 'weight-asc' | 'updated' | 'category'>('weight-desc');

  // Drawer / Form state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<HeuristicRule | null>(null);

  // Form fields
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<string>(CATEGORIES[0]);
  const [formDescription, setFormDescription] = useState('');
  const [formPoints, setFormPoints] = useState<number>(35);
  const [formEnabled, setFormEnabled] = useState(true);

  // Helper to compute weight label from numeric points
  const computeWeightLabel = (points: number): 'Low' | 'Medium' | 'High' | 'Critical' => {
    if (points >= 80) return 'Critical';
    if (points >= 60) return 'High';
    if (points >= 30) return 'Medium';
    return 'Low';
  };

  const getWeightBadgeStyle = (label: 'Low' | 'Medium' | 'High' | 'Critical') => {
    switch (label) {
      case 'Critical':
        return 'bg-[#ffdad6] text-[#93000a] border-[#ffb4ab]';
      case 'High':
        return 'bg-[#ffdcc4] text-[#8f4a00] border-[#ffb780]';
      case 'Medium':
        return 'bg-[#fef7e0] text-[#7a5e00] border-[#fce8b2]';
      case 'Low':
      default:
        return 'bg-[#d3e3fd] text-[#0b57d0] border-[#a8c7fa]';
    }
  };

  const handleOpenAdd = () => {
    setEditingRule(null);
    setFormName('');
    setFormCategory(CATEGORIES[0]);
    setFormDescription('');
    setFormPoints(35);
    setFormEnabled(true);
    setIsDrawerOpen(true);
  };

  const handleOpenEdit = (rule: HeuristicRule) => {
    setEditingRule(rule);
    setFormName(rule.name);
    setFormCategory(rule.category);
    setFormDescription(rule.description);
    setFormPoints(rule.basePoints);
    setFormEnabled(rule.enabled);
    setIsDrawerOpen(true);
  };

  const handleToggleStatus = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const handleDeleteRule = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete the rule "${name}"?`)) {
      setRules((prev) => prev.filter((r) => r.id !== id));
    }
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const todayStr = new Date().toISOString().split('T')[0];
    const weightLabel = computeWeightLabel(formPoints);

    if (editingRule) {
      // Update
      setRules((prev) =>
        prev.map((r) =>
          r.id === editingRule.id
            ? {
                ...r,
                name: formName.trim(),
                category: formCategory,
                description: formDescription.trim(),
                basePoints: formPoints,
                defaultWeight: weightLabel,
                enabled: formEnabled,
                lastUpdated: todayStr
              }
            : r
        )
      );
    } else {
      // Create new
      const newRule: HeuristicRule = {
        id: `rule-${Date.now()}`,
        name: formName.trim(),
        category: formCategory,
        description: formDescription.trim(),
        basePoints: formPoints,
        defaultWeight: weightLabel,
        enabled: formEnabled,
        lastUpdated: todayStr
      };
      setRules((prev) => [newRule, ...prev]);
    }

    setIsDrawerOpen(false);
  };

  // Summary Metrics
  const totalActiveRules = rules.filter((r) => r.enabled).length;
  const activeCategoriesCount = new Set(rules.filter((r) => r.enabled).map((r) => r.category)).size;
  const highestWeightRule = useMemo(() => {
    if (rules.length === 0) return null;
    return [...rules].sort((a, b) => b.basePoints - a.basePoints)[0];
  }, [rules]);

  // Filtered & Sorted Rules
  const filteredRules = useMemo(() => {
    return rules
      .filter((rule) => {
        const matchesQuery =
          rule.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          rule.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          rule.category.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategory === 'All' || rule.category === selectedCategory;
        const matchesStatus =
          selectedStatus === 'All' ||
          (selectedStatus === 'Active' && rule.enabled) ||
          (selectedStatus === 'Inactive' && !rule.enabled);

        return matchesQuery && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'weight-desc') return b.basePoints - a.basePoints;
        if (sortBy === 'weight-asc') return a.basePoints - b.basePoints;
        if (sortBy === 'category') return a.category.localeCompare(b.category);
        if (sortBy === 'updated') {
          return (b.lastUpdated || '').localeCompare(a.lastUpdated || '');
        }
        return 0;
      });
  }, [rules, searchQuery, selectedCategory, selectedStatus, sortBy]);

  return (
    <div className="space-y-6">
      {/* Top Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#c2c6d5]">
        <div>
          <h1 className="text-2xl font-bold text-[#191b22] tracking-tight">Heuristic Rules Management</h1>
          <p className="text-xs md:text-sm text-[#5b5f64] mt-1">
            Configure the evaluation criteria, penalty weightings, and status of the credibility engine.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#0058bd] hover:bg-[#004494] text-white text-xs md:text-sm font-semibold rounded-lg shadow-2xs transition-colors cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Rule</span>
        </button>
      </div>

      {/* Quick Summary Panel */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-[#c2c6d5] rounded-xl p-4 shadow-2xs flex flex-col justify-between">
          <span className="text-[11px] font-bold text-[#5b5f64] uppercase tracking-wider">
            Total Active Rules
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#191b22]">{totalActiveRules}</span>
            <span className="text-xs font-semibold text-[#0058bd]">/ {rules.length} Total</span>
          </div>
        </div>

        <div className="bg-white border border-[#c2c6d5] rounded-xl p-4 shadow-2xs flex flex-col justify-between">
          <span className="text-[11px] font-bold text-[#5b5f64] uppercase tracking-wider">
            Active Categories
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#191b22]">{activeCategoriesCount}</span>
            <span className="text-xs text-[#5b5f64]">/ 5 Subsystems</span>
          </div>
        </div>

        <div className="bg-white border border-[#c2c6d5] rounded-xl p-4 shadow-2xs sm:col-span-2 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <span className="text-[11px] font-bold text-[#5b5f64] uppercase tracking-wider">
              Highest Penalty Weight Rule
            </span>
            <span className="text-[10px] font-mono text-[#5b5f64] bg-[#f2f3fd] px-2 py-0.5 rounded">
              Rule Config
            </span>
          </div>
          {highestWeightRule ? (
            <div className="mt-2 flex items-center justify-between gap-2">
              <div className="truncate">
                <span className="font-bold text-sm text-[#191b22] block truncate">
                  {highestWeightRule.name}
                </span>
                <span className="text-xs text-[#5b5f64]">{highestWeightRule.category}</span>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-bold border shrink-0 ${getWeightBadgeStyle(
                  highestWeightRule.defaultWeight
                )}`}
              >
                {highestWeightRule.defaultWeight} ({highestWeightRule.basePoints} pts)
              </span>
            </div>
          ) : (
            <span className="text-xs text-[#5b5f64] mt-2">No rules available</span>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#c2c6d5] rounded-xl p-4 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#727785]" />
            <input
              type="text"
              placeholder="Filter by rule name, description or category..."
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

          {/* Filters & Sorting */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 bg-[#f2f3fd] border border-[#c2c6d5] rounded-lg text-xs font-medium text-[#191b22] focus:outline-none focus:border-[#0058bd]"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            {/* Status Dropdown */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="px-3 py-2 bg-[#f2f3fd] border border-[#c2c6d5] rounded-lg text-xs font-medium text-[#191b22] focus:outline-none focus:border-[#0058bd]"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active Only</option>
              <option value="Inactive">Inactive Only</option>
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 bg-[#f2f3fd] border border-[#c2c6d5] rounded-lg text-xs font-medium text-[#191b22] focus:outline-none focus:border-[#0058bd]"
            >
              <option value="weight-desc">Sort: Highest Weight</option>
              <option value="weight-asc">Sort: Lowest Weight</option>
              <option value="updated">Sort: Recently Updated</option>
              <option value="category">Sort: Category</option>
            </select>
          </div>
        </div>
      </div>

      {/* Rules Table Section */}
      <div className="bg-white rounded-xl border border-[#c2c6d5] shadow-2xs overflow-hidden">
        {filteredRules.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f2f3fd] border-b border-[#c2c6d5] text-[11px] font-bold text-[#5b5f64] uppercase tracking-wider">
                  <th className="p-4">Rule Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Penalty Weight</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Last Updated</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c2c6d5] text-xs">
                {filteredRules.map((rule) => (
                  <tr key={rule.id} className="hover:bg-[#f9f9ff] transition-colors group">
                    <td className="p-4">
                      <div className="font-bold text-sm text-[#191b22]">{rule.name}</div>
                      <div className="text-xs text-[#5b5f64] line-clamp-1 max-w-md mt-0.5">
                        {rule.description}
                      </div>
                    </td>
                    <td className="p-4 font-semibold text-[#5b5f64] whitespace-nowrap">
                      {rule.category}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${getWeightBadgeStyle(
                          rule.defaultWeight
                        )}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {rule.defaultWeight} ({rule.basePoints} pts)
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleStatus(rule.id)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          rule.enabled ? 'bg-[#0058bd]' : 'bg-[#c2c6d5]'
                        }`}
                        title={rule.enabled ? 'Click to disable' : 'Click to enable'}
                      >
                        <span
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                            rule.enabled ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </td>
                    <td className="p-4 font-mono text-[#5b5f64] whitespace-nowrap">
                      {rule.lastUpdated || '2026-08-01'}
                    </td>
                    <td className="p-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEdit(rule)}
                          className="p-1.5 text-[#0058bd] hover:bg-[#e1e2eb] rounded-md transition-colors"
                          title="Edit Rule"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteRule(rule.id, rule.name)}
                          className="p-1.5 text-[#ba1a1a] hover:bg-[#ffdad6] rounded-md transition-colors"
                          title="Delete Rule"
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
        ) : (
          /* Empty State */
          <div className="p-12 text-center flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-[#f2f3fd] text-[#0058bd] flex items-center justify-center mb-3">
              <Sliders className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[#191b22]">No rules found</h3>
            <p className="text-xs text-[#5b5f64] max-w-md mt-1 mb-4">
              No heuristic rules match your current search query or active filter settings.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
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
                Create First Rule
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Slide-over Drawer for Add / Edit Rule */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
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
                    {editingRule ? 'Edit Heuristic Rule' : 'Create New Heuristic Rule'}
                  </h3>
                  <p className="text-xs text-[#5b5f64]">
                    Configure penalty points and operational status
                  </p>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-1.5 text-[#5b5f64] hover:text-[#191b22] hover:bg-[#e1e2eb] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Form Body */}
              <form id="rule-form" onSubmit={handleSaveForm} className="p-6 space-y-5 flex-1 overflow-y-auto">
                <div>
                  <label className="block text-xs font-bold text-[#191b22] uppercase tracking-wider mb-1">
                    Rule Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Excessive Capitalization"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3 py-2 bg-[#f9f9ff] border border-[#c2c6d5] rounded-lg text-sm text-[#191b22] focus:outline-none focus:border-[#0058bd]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#191b22] uppercase tracking-wider mb-1">
                    Category Subsystem *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-[#f9f9ff] border border-[#c2c6d5] rounded-lg text-sm text-[#191b22] focus:outline-none focus:border-[#0058bd]"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#191b22] uppercase tracking-wider mb-1">
                    Description & Trigger Criteria
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Explain what specific linguistic or domain indicator triggers this rule..."
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full px-3 py-2 bg-[#f9f9ff] border border-[#c2c6d5] rounded-lg text-sm text-[#191b22] focus:outline-none focus:border-[#0058bd] resize-none"
                  />
                </div>

                {/* Weight Slider Section */}
                <div className="p-4 bg-[#f2f3fd] rounded-xl border border-[#c2c6d5] space-y-3">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-[#191b22] uppercase tracking-wider">
                      Penalty Weight Score
                    </label>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${getWeightBadgeStyle(
                        computeWeightLabel(formPoints)
                      )}`}
                    >
                      {computeWeightLabel(formPoints)} ({formPoints} pts)
                    </span>
                  </div>

                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={formPoints}
                    onChange={(e) => setFormPoints(Number(e.target.value))}
                    className="w-full accent-[#0058bd] cursor-pointer"
                  />

                  <div className="flex justify-between text-[10px] text-[#5b5f64] font-medium">
                    <span>Low (0-29)</span>
                    <span>Medium (30-59)</span>
                    <span>High (60-79)</span>
                    <span>Critical (80-100)</span>
                  </div>
                </div>

                {/* Enabled Toggle */}
                <div className="flex items-center justify-between p-3 border border-[#c2c6d5] rounded-xl">
                  <div>
                    <span className="text-xs font-bold text-[#191b22] block">Rule Status</span>
                    <span className="text-[11px] text-[#5b5f64]">
                      {formEnabled ? 'Active in evaluation engine' : 'Disabled (Bypassed during evaluation)'}
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
                  className="px-4 py-2 border border-[#c2c6d5] text-[#191b22] text-xs font-semibold rounded-lg hover:bg-[#e1e2eb] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="rule-form"
                  className="px-4 py-2 bg-[#0058bd] hover:bg-[#004494] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors"
                >
                  {editingRule ? 'Save Changes' : 'Create Rule'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
