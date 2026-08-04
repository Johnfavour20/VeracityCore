import React, { useState } from 'react';
import { HeuristicRule } from '../types';
import {
  X,
  ShieldCheck,
  Lock,
  CheckCircle,
  RefreshCw,
  Mail,
  Key,
  Eye,
  EyeOff,
  Shield,
  Sliders
} from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DEFAULT_RULES: HeuristicRule[] = [
  {
    id: 'rule-headline-sensational',
    name: 'Sensational / Absolute Headline Penalty',
    category: 'Headline Assessment',
    defaultWeight: 'Medium',
    basePoints: 15,
    description: 'Applies penalty when headline contains hyperbolic cure or outrage claims.',
    enabled: true,
  },
  {
    id: 'rule-source-unverified',
    name: 'Unknown Domain Reputation Penalty',
    category: 'Source Reputation',
    defaultWeight: 'High',
    basePoints: 20,
    description: 'Applies penalty if domain lacks WHOIS transparency or accredited journalistic index.',
    enabled: true,
  },
  {
    id: 'rule-evidence-citation',
    name: 'Missing Verifiable Citations / DOI',
    category: 'Evidence Quality',
    defaultWeight: 'Critical',
    basePoints: 25,
    description: 'Applies penalty when scientific or statistical assertions lack primary literature links.',
    enabled: true,
  },
  {
    id: 'rule-style-loaded',
    name: 'Loaded / Subjective Terminology',
    category: 'Stylistic Analysis',
    defaultWeight: 'Low',
    basePoints: 10,
    description: 'Flagged when text body contains evaluative adjectives over neutral reporting.',
    enabled: true,
  },
];

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('admin@veritas.io');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [rules, setRules] = useState<HeuristicRule[]>(DEFAULT_RULES);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleToggleRule = (id: string) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r))
    );
  };

  const handlePointChange = (id: string, newPoints: number) => {
    setRules((prev) =>
      prev.map((r) => (r.id === id ? { ...r, basePoints: Math.max(0, newPoints) } : r))
    );
  };

  const handleSaveWeights = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-[#f9f9ff] border border-[#c2c6d5] rounded-2xl max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Modal Top Header */}
        <div className="bg-[#f2f3fd] px-6 py-4 border-b border-[#c2c6d5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#0058bd]" />
            <span className="font-bold text-sm text-[#191b22]">Veritas Institutional Admin</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#5b5f64] hover:text-[#191b22] hover:bg-[#e1e2eb] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!isLoggedIn ? (
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#d8e2ff] text-[#0058bd] mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold text-[#191b22] mb-1">
                Veritas Admin
              </h1>
              <p className="text-xs text-[#5b5f64] flex items-center justify-center gap-1 font-medium">
                <Lock className="w-3.5 h-3.5" />
                Administrator Login
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-[#191b22] block" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#727785]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@veritas.io"
                    className="block w-full pl-9 pr-3 py-2 border border-[#c2c6d5] rounded-lg text-sm text-[#191b22] bg-white focus:outline-none focus:ring-2 focus:ring-[#0058bd] focus:border-[#0058bd] placeholder-[#727785]"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-[#191b22] block" htmlFor="password">
                    Password
                  </label>
                  <a href="#" className="text-xs font-semibold text-[#0058bd] hover:underline" onClick={(e) => e.preventDefault()}>
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#727785]">
                    <Key className="w-4 h-4" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-9 pr-10 py-2 border border-[#c2c6d5] rounded-lg text-sm text-[#191b22] bg-white focus:outline-none focus:ring-2 focus:ring-[#0058bd] focus:border-[#0058bd] placeholder-[#727785]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#727785] hover:text-[#191b22] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-[#0058bd] focus:ring-[#0058bd] border-[#c2c6d5] rounded cursor-pointer"
                />
                <label htmlFor="remember-me" className="ml-2 block text-xs text-[#5b5f64] font-medium cursor-pointer">
                  Remember me
                </label>
              </div>

              {/* Actions */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-xs font-semibold text-sm text-white bg-[#0058bd] hover:bg-[#004494] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0058bd] transition-colors active:scale-[0.99]"
                >
                  Sign In
                </button>
              </div>
            </form>

            {/* Security Cues */}
            <div className="mt-6 pt-4 border-t border-[#c2c6d5] text-center">
              <p className="text-[11px] text-[#5b5f64] flex items-center justify-center gap-1">
                <Shield className="w-3.5 h-3.5 text-[#0058bd]" />
                <span>Authorized personnel only. Access is monitored and logged.</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
            {savedSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Heuristic engine rule weights updated successfully in memory.</span>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-[#191b22]">Active Rule Weight Adjuster</h4>
                <p className="text-xs text-[#5b5f64]">Modify risk points assigned when heuristic flags trigger</p>
              </div>

              <button
                onClick={() => setRules(DEFAULT_RULES)}
                className="text-xs font-semibold text-[#0058bd] hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Defaults</span>
              </button>
            </div>

            <div className="space-y-3">
              {rules.map((rule) => (
                <div
                  key={rule.id}
                  className="p-3.5 bg-white border border-[#c2c6d5] rounded-xl flex flex-col gap-3"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-xs text-[#191b22]">{rule.name}</span>
                      <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-[#e1e2eb] text-[#424753]">
                        {rule.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#5b5f64]">{rule.description}</p>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-2 border-t border-[#f0f0f5]">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-[#5b5f64]">Penalty Points:</span>
                      <input
                        type="number"
                        value={rule.basePoints}
                        onChange={(e) => handlePointChange(rule.id, parseInt(e.target.value) || 0)}
                        className="w-16 px-2 py-1 bg-[#f9f9ff] border border-[#c2c6d5] rounded text-xs font-mono font-bold text-right text-[#191b22]"
                      />
                    </div>

                    <button
                      onClick={() => handleToggleRule(rule.id)}
                      className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors ${
                        rule.enabled
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-gray-100 text-gray-500 border border-gray-300'
                      }`}
                    >
                      {rule.enabled ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-between items-center border-t border-[#c2c6d5]">
              <button
                onClick={() => setIsLoggedIn(false)}
                className="text-xs font-semibold text-[#5b5f64] hover:text-[#191b22]"
              >
                Sign Out Admin
              </button>

              <button
                onClick={handleSaveWeights}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#0058bd] hover:bg-[#004494] rounded-lg transition-all shadow-xs"
              >
                Save Weights Configuration
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

