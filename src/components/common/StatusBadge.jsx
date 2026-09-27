import React from 'react';

export const StatusBadge = ({ status, variant = 'cyan', pulse = false, size = 'sm', icon: Icon }) => {
  const colorMap = {
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    red: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    slate: 'bg-slate-800/60 text-slate-400 border-slate-700/60',
  };

  const dotColorMap = {
    cyan: 'bg-cyan-400 shadow-[0_0_8px_#00f2fe]',
    green: 'bg-emerald-400 shadow-[0_0_8px_#10b981]',
    amber: 'bg-amber-400 shadow-[0_0_8px_#f59e0b]',
    red: 'bg-rose-400 shadow-[0_0_8px_#ef4444]',
    blue: 'bg-blue-400 shadow-[0_0_8px_#3b82f6]',
    purple: 'bg-purple-400 shadow-[0_0_8px_#a855f7]',
    slate: 'bg-slate-400',
  };

  const sizeClasses = {
    xs: 'px-2 py-0.5 text-xs',
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3.5 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border backdrop-blur-md tracking-wide transition-all ${
        colorMap[variant] || colorMap.cyan
      } ${sizeClasses[size]}`}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${dotColorMap[variant]}`}></span>
          <span className={`relative inline-flex rounded-full h-2 w-2 ${dotColorMap[variant]}`}></span>
        </span>
      )}
      {!pulse && <span className={`h-1.5 w-1.5 rounded-full ${dotColorMap[variant]}`}></span>}
      {Icon && <Icon className="w-3.5 h-3.5" />}
      <span>{status}</span>
    </span>
  );
};
export default StatusBadge;
