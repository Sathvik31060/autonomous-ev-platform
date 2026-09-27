import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSimulation } from '../../context/SimulationContext';
import { useDemoMode } from '../../context/DemoModeContext';
import {
  Bell,
  Battery,
  Shield,
  Clock,
  Sparkles,
  ChevronDown,
  User,
  Settings,
  Sliders,
  LogOut,
  Radio,
  CheckCircle2,
  AlertCircle,
  Menu,
  Activity
} from 'lucide-react';
import StatusBadge from '../common/StatusBadge';

export const Header = ({ onToggleMobileSidebar }) => {
  const { user, logout } = useAuth();
  const { vehicle, battery, isLiveSimulation, setIsLiveSimulation, eventLogs } = useSimulation();
  const { isDemoActive, startDemo, stopDemo } = useDemoMode();
  const navigate = useNavigate();

  const [currentTime, setCurrentTime] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotificationMenu, setShowNotificationMenu] = useState(false);

  // Digital Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    setShowProfileMenu(false);
    logout();
    navigate('/signin');
  };

  return (
    <header className="sticky top-0 z-40 h-16 bg-[#080d19]/90 backdrop-blur-xl border-b border-slate-800/80 px-4 md:px-6 flex items-center justify-between">
      {/* Left Area: Mobile Menu & Breadcrumbs / Identity */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#00f2fe] animate-pulse"></div>
          <span className="hidden sm:inline font-mono text-xs uppercase tracking-wider text-slate-400">
            System Telemetry:
          </span>
          <StatusBadge status="ONLINE" variant="green" pulse={true} size="xs" />
          <StatusBadge
            status={vehicle.drivingMode}
            variant={vehicle.drivingMode === 'AUTONOMOUS' ? 'cyan' : 'amber'}
            size="xs"
          />
        </div>
      </div>

      {/* Right Area: Controls & User Profile */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Real-Time Live Clock */}
        <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-300">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>{currentTime}</span>
        </div>

        {/* Live Simulation Switch */}
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
          <span className="hidden md:inline font-mono text-[11px] text-slate-400">
            LIVE SIMULATION
          </span>
          <button
            onClick={() => setIsLiveSimulation(!isLiveSimulation)}
            className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
              isLiveSimulation ? 'bg-cyan-500' : 'bg-slate-700'
            }`}
            title="Toggle Live Simulation Stream"
          >
            <span
              className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                isLiveSimulation ? 'translate-x-4' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Header Battery Pill */}
        <Link
          to="/battery"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 text-xs transition-colors"
          title="View Battery Management"
        >
          <div className="relative flex items-center">
            <Battery className="w-4 h-4 text-cyan-400" />
            {battery.chargingState === 'Charging' && (
              <span className="absolute -top-1 -right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            )}
          </div>
          <span className="font-mono font-bold text-white">{Math.round(battery.soc)}%</span>
        </Link>

        {/* Demo Mode Button */}
        <button
          onClick={isDemoActive ? stopDemo : startDemo}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
            isDemoActive
              ? 'bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
              : 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20'
          }`}
          title="Guided Capstone Presentation Tour"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isDemoActive ? 'Demo Active' : 'Demo Tour'}</span>
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotificationMenu(!showNotificationMenu);
              setShowProfileMenu(false);
            }}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 relative"
            title="System Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f2fe]" />
          </button>

          {showNotificationMenu && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#0b1324] border border-slate-800 shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800/80 text-xs font-semibold text-slate-200">
                <span>Real-Time Event Feed</span>
                <span className="text-[10px] text-cyan-400 font-mono">LIVE 100Hz</span>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {eventLogs.slice(0, 5).map(log => (
                  <div key={log.id} className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/60 text-xs">
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5 font-mono">
                      <span>{log.time}</span>
                      <span className={log.level === 'warning' ? 'text-amber-400' : 'text-cyan-400'}>
                        {log.level.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-slate-200 text-[11px] leading-tight">{log.message}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotificationMenu(false);
            }}
            className="flex items-center gap-2.5 p-1.5 pr-2.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-xs font-bold text-black font-mono shadow-[0_0_10px_rgba(0,242,254,0.3)]">
              {user?.name ? user.name[0] : 'S'}
            </div>
            <div className="hidden md:flex flex-col text-left">
              <span className="text-xs font-bold text-white leading-none">
                {user?.name || 'Sathvik'}
              </span>
              <span className="text-[10px] text-slate-400 leading-none mt-1">
                {user?.role || 'EV Platform User'}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden md:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0b1324] border border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
              <div className="p-2.5 mb-1.5 border-b border-slate-800/80">
                <p className="text-xs font-bold text-white">{user?.name || 'Sathvik'}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email || 'demo@evplatform.com'}</p>
                <div className="mt-2 text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800/40 truncate">
                  {vehicle.name} • {vehicle.type || 'Autonomous EV'}
                </div>
              </div>

              <Link
                to="/profile"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-800/70 transition-colors"
              >
                <User className="w-4 h-4 text-cyan-400" />
                <span>Profile Details</span>
              </Link>

              <Link
                to="/profile"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-800/70 transition-colors"
              >
                <Settings className="w-4 h-4 text-cyan-400" />
                <span>Vehicle Settings</span>
              </Link>

              <Link
                to="/profile"
                onClick={() => setShowProfileMenu(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-800/70 transition-colors"
              >
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Platform Preferences</span>
              </Link>

              <div className="pt-1.5 mt-1.5 border-t border-slate-800/80">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout Session</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default Header;
