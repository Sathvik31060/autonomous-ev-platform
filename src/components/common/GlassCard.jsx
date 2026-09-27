import React from 'react';

export const GlassCard = ({
  children,
  className = '',
  title,
  subtitle,
  action,
  icon: Icon,
  glow = false,
  variant = 'default'
}) => {
  const borderStyles = glow
    ? 'border-cyan-500/40 shadow-[0_0_25px_-5px_rgba(0,242,254,0.25)]'
    : 'border-slate-800/80 hover:border-slate-700/90';

  return (
    <div
      className={`relative rounded-2xl bg-gradient-to-b from-[#0d1627]/90 to-[#090e1a]/95 backdrop-blur-xl border ${borderStyles} p-5 md:p-6 transition-all duration-300 ${className}`}
    >
      {(title || action || Icon) && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/60">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Icon className="w-5 h-5" />
              </div>
            )}
            <div>
              {title && <h3 className="font-semibold text-slate-100 text-base md:text-lg tracking-tight">{title}</h3>}
              {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {action && <div className="flex items-center">{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
export default GlassCard;
