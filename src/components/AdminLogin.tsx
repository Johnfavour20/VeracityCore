import React, { useState } from 'react';
import { ShieldCheck, Mail, Key, Eye, EyeOff, Lock, Shield, ArrowLeft } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onReturnToLanding: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onReturnToLanding
}) => {
  const [email, setEmail] = useState('admin@veritas.io');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    setTimeout(() => {
      if (email.trim().length > 3 && password.length >= 4) {
        onLoginSuccess();
      } else {
        setErrorMsg('Invalid credentials. Please check email and password.');
        setIsSubmitting(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#191c1d] flex flex-col justify-center items-center p-4 font-sans">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={onReturnToLanding}
          className="mb-6 inline-flex items-center gap-2 text-xs font-semibold text-[#5b5f64] hover:text-[#005bbf] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Public Landing Page</span>
        </button>

        <div className="bg-white border border-[#c1c6d6] rounded-2xl shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-[#e8f0fe] p-6 border-b border-[#c1c6d6] text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#005bbf] text-white mb-3 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold text-[#191c1d]">VeritasAI Admin Console</h1>
            <p className="text-xs text-[#5b5f64] mt-1 flex items-center justify-center gap-1">
              <Lock className="w-3.5 h-3.5 text-[#005bbf]" />
              <span>Institutional Email & Password Authentication</span>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {errorMsg && (
              <div className="p-3 bg-[#ffdad6] border border-[#ffb4ab] rounded-lg text-xs font-semibold text-[#93000a]">
                {errorMsg}
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1">
              <label htmlFor="admin-email" className="block text-xs font-bold text-[#191c1d]">
                Administrator Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#727785]">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="admin-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@veritas.io"
                  className="w-full pl-9 pr-3 py-2 bg-[#f8f9fa] border border-[#c1c6d6] rounded-lg text-xs text-[#191c1d] focus:bg-white focus:outline-none focus:border-[#005bbf] focus:ring-1 focus:ring-[#005bbf]"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label htmlFor="admin-password" className="block text-xs font-bold text-[#191c1d]">
                  Password
                </label>
                <span className="text-[11px] text-[#005bbf] hover:underline cursor-pointer">
                  Forgot Password?
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#727785]">
                  <Key className="w-4 h-4" />
                </div>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2 bg-[#f8f9fa] border border-[#c1c6d6] rounded-lg text-xs text-[#191c1d] focus:bg-white focus:outline-none focus:border-[#005bbf] focus:ring-1 focus:ring-[#005bbf]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#727785] hover:text-[#191c1d]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#005bbf] rounded border-[#c1c6d6] focus:ring-[#005bbf]"
                />
                <span className="text-xs text-[#5b5f64] font-medium">Remember session</span>
              </label>

              <span className="text-[10px] font-mono bg-[#e8f0fe] text-[#005bbf] px-2 py-0.5 rounded font-semibold">
                Role: SuperAdmin
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 px-4 bg-[#005bbf] text-white font-bold text-xs rounded-lg hover:bg-[#004493] transition-all shadow-xs cursor-pointer active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? 'Authenticating...' : 'Sign In to Admin Dashboard'}
            </button>
          </form>

          {/* Footer Security Notice */}
          <div className="p-4 bg-[#f8f9fa] border-t border-[#c1c6d6] text-center">
            <p className="text-[11px] text-[#5b5f64] flex items-center justify-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#005bbf]" />
              <span>Restricted enterprise portal. Access logs are archived.</span>
            </p>
          </div>
        </div>

        {/* Quick Helper Credentials Note */}
        <div className="mt-4 p-3 bg-white border border-[#c1c6d6] rounded-xl text-center text-xs text-[#5b5f64]">
          <span className="font-bold text-[#191c1d]">Demo Admin Credentials: </span>
          <code className="bg-[#f8f9fa] px-1.5 py-0.5 rounded text-[#005bbf] font-mono">admin@veritas.io</code> / <code className="bg-[#f8f9fa] px-1.5 py-0.5 rounded text-[#005bbf] font-mono">admin123</code>
        </div>
      </div>
    </div>
  );
};
