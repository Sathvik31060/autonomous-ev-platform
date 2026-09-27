import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Car,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Cpu,
  BatteryCharging,
  Zap,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

export const SignIn = () => {
  const { login, loginWithDemo, authNotification, setAuthNotification } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsSubmitting(true);
    const result = login(email, password);
    setIsSubmitting(false);

    if (result.success) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } else {
      setError(result.message || 'Invalid credentials.');
    }
  };

  const handleDemoLogin = () => {
    loginWithDemo();
    const from = location.state?.from?.pathname || '/dashboard';
    navigate(from, { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Top Brand Link */}
      <div className="mb-6 flex items-center gap-2.5">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-black shadow-[0_0_15px_rgba(0,242,254,0.4)]">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              EV INTELLIGENCE PLATFORM
            </h1>
            <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
              Autonomous Vehicle Control
            </p>
          </div>
        </Link>
      </div>

      {/* Auth Container Card (Split Screen on lg) */}
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 rounded-3xl bg-[#0b1324]/90 backdrop-blur-2xl border border-slate-800/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden">
        {/* Left Side: Futuristic EV Visual & Highlights */}
        <div className="lg:col-span-5 bg-gradient-to-b from-[#0e1932] via-[#0b1429] to-[#070c18] p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800/80 relative overflow-hidden">
          <div className="space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
              <Sparkles className="w-3 h-3 animate-spin-slow" />
              <span>CAPSTONE DEMONSTRATION</span>
            </div>

            <h2 className="text-2xl font-black text-white tracking-tight leading-tight">
              Real-Time Autonomous <br />
              <span className="text-cyan-400">EV Intelligence</span>
            </h2>

            <p className="text-xs text-slate-300 leading-relaxed">
              Unified telemetry connecting edge autonomous perception with battery health analytics and smart grid scheduling.
            </p>

            {/* Floating Information Tags */}
            <div className="space-y-2.5 pt-4">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200">
                <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-semibold text-[11px] tracking-wide">REAL-TIME EV INTELLIGENCE</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-semibold text-[11px] tracking-wide">AUTONOMOUS CONTROL</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200">
                <BatteryCharging className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-semibold text-[11px] tracking-wide">BATTERY ANALYTICS</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-200">
                <Zap className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="font-semibold text-[11px] tracking-wide">SMART CHARGING</span>
              </div>
            </div>
          </div>

          {/* Quick Demo Credentials Footer */}
          <div className="mt-8 pt-4 border-t border-slate-800/80 relative z-10 text-[11px] font-mono text-slate-400">
            <div className="text-cyan-400 font-bold mb-1">PROTOTYPE DEMO CREDENTIALS:</div>
            <div>User: Sathvik • Autonomous EV-01</div>
            <div>demo@evplatform.com</div>
          </div>
        </div>

        {/* Right Side: Glassmorphism Sign In Card */}
        <div className="lg:col-span-7 p-8 md:p-10 flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h3>
            <p className="text-xs text-slate-400 mt-1">
              Sign in to access your EV Intelligence Platform
            </p>
          </div>

          {/* Prototype / Registration Success Notification */}
          {authNotification && (
            <div className="mb-5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{authNotification.message}</span>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-400 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">
                EMAIL ADDRESS
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="demo@evplatform.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white placeholder-slate-500 transition-colors outline-none font-sans"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300 font-mono">
                  PASSWORD
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-sm text-white placeholder-slate-500 transition-colors outline-none font-sans"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-cyan-500/20"
                />
                <span className="text-xs text-slate-400">Remember me</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl text-sm font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(0,242,254,0.35)] transition-all flex items-center justify-center gap-2"
            >
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-800" />
            <span className="text-[11px] font-mono text-slate-500 uppercase tracking-widest">OR</span>
            <div className="flex-1 h-px bg-slate-800" />
          </div>

          {/* Prominent Demo Login Button */}
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-blue-500/20 hover:from-emerald-500/30 hover:to-blue-500/30 text-cyan-300 border border-cyan-500/40 hover:border-cyan-400 shadow-[0_0_25px_-5px_rgba(0,242,254,0.3)] transition-all flex items-center justify-center gap-2.5 group"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>Continue with Demo (Sathvik)</span>
          </button>

          {/* Sign Up Link */}
          <div className="mt-6 text-center text-xs text-slate-400">
            <span>Don't have an account? </span>
            <Link to="/signup" className="text-cyan-400 font-semibold hover:underline">
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
