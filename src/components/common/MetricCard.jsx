import React from 'react';

export const MetricCard = ({
  title,
  value,
  unit,
  subtitle,
  icon: Icon,
  trend, // { direction: 'up' | 'down' | 'neutral', label: '+2.4%' }
  statusVariant = 'cyan',
  accentColor = 'cyan',
  className = ''
}) => {
  const accentGlow = {
    cyan: 'hover:border-cyan-500/40 hover:shadow-[0_0_20px_-5px_rgba(0,242,254,0.3)]',
    green: 'hover:border-emerald-500/40 hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)]',
    amber: 'hover:border-amber-500/40 hover:shadow-[0_0_20px_-5px_rgba(245,158,11,0.3)]',
    blue: 'hover:border-blue-500/40 hover:shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)]',
    red: 'hover:border-rose-500/40 hover:shadow-[0_0_20px_-5px_rgba(239,68,68,0.3)]',
  };

  const iconBg = {
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    red: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  };

  return (
    <div
      className={`rounded-2xl bg-gradient-to-b from-[#0d1627]/90 to-[#0a101d]/90 backdrop-blur-xl border border-slate-800/80 p-5 transition-all duration-300 ${accentGlow[accentColor] || accentGlow.cyan} ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
          {title}
        </span>
        {Icon && (
          <div className={`p-2 rounded-xl border ${iconBg[accentColor] || iconBg.cyan}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-white font-mono">
          {value}
        </span>
        {unit && (
          <span className="text-sm font-medium text-slate-400">
            {unit}
          </span>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="mt-2.5 flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800/40">
          {subtitle && <span>{subtitle}</span>}
          {trend && (
            <span
              className={`font-semibold flex items-center gap-1 ${
                trend.direction === 'up'
                  ? 'text-emerald-400'
                  : trend.direction === 'down'
                  ? 'text-amber-400'
                  : 'text-slate-400'
              }`}
            >
              {trend.direction === 'up' && '↑'}
              {trend.direction === 'down' && '↓'}
              {trend.label}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
export default MetricCard;
