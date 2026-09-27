import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Cpu,
  BatteryCharging,
  Zap,
  Navigation,
  Network,
  BookOpen,
  CheckCircle2,
  Car,
  X,
  Radio,
  ExternalLink
} from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';

export const Sidebar = ({ isOpen, onClose }) => {
  const { vehicle, battery } = useSimulation();

  const navItems = [
    { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { label: 'AV Dashboard', path: '/av-dashboard', icon: Cpu, badge: 'Live' },
    { label: 'Battery Analytics', path: '/battery', icon: BatteryCharging, badge: `${Math.round(battery.soc)}%` },
    { label: 'Smart Charging', path: '/charging', icon: Zap },
    { label: 'Trip Planner', path: '/trip-planner', icon: Navigation },
    { label: 'Architecture', path: '/architecture', icon: Network },
    { label: 'Literature Survey', path: '/literature', icon: BookOpen },
    { label: 'Key Takeaways', path: '/takeaways', icon: CheckCircle2 },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#080d19]/95 backdrop-blur-2xl border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand / Logo Section */}
        <div>
          <div className="h-16 px-5 border-b border-slate-800/80 flex items-center justify-between">
            <NavLink to="/dashboard" onClick={onClose} className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-black shadow-[0_0_15px_rgba(0,242,254,0.4)]">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-sm font-extrabold tracking-tight text-white flex items-center gap-1">
                  EV INTELLIGENCE
                </h1>
                <p className="text-[10px] font-mono text-cyan-400">CAPSTONE PLATFORM</p>
              </div>
            </NavLink>

            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="px-3 py-4 space-y-1">
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
              Core Navigation
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `group flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/20 to-blue-600/10 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_-3px_rgba(0,242,254,0.2)]'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/50 hover:border-slate-700/50 border border-transparent'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 group-hover:text-cyan-400 transition-colors" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Bottom Vehicle Status Card */}
        <div className="p-3 m-3 rounded-2xl bg-gradient-to-b from-[#0e172a] to-[#0a101d] border border-slate-800/80">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold text-white tracking-wide truncate max-w-[130px]" title={vehicle.name}>
              {vehicle.name}
            </span>
            <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {vehicle.drivingMode}
            </span>
          </div>

          <div className="text-[10px] font-mono text-cyan-400 truncate mb-2">
            {vehicle.type || 'Autonomous EV'}
          </div>

          {/* Quick Battery Gauge Bar */}
          <div className="space-y-1 mb-2">
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>BATTERY SOC</span>
              <span className="text-white font-bold">{Math.round(battery.soc)}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${battery.soc}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800/60 font-mono">
            <span>RANGE: {Math.round(battery.soc * 3.67)} km</span>
            <NavLink to="/" className="text-cyan-400 hover:underline flex items-center gap-0.5">
              Landing <ExternalLink className="w-2.5 h-2.5" />
            </NavLink>
          </div>
        </div>
      </aside>
    </>
  );
};
export default Sidebar;
