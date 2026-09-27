import React from 'react';

export const LiveGauge = ({
  value = 78,
  max = 100,
  size = 200,
  strokeWidth = 14,
  label = "STATE OF CHARGE",
  unit = "%",
  color = "cyan",
  secondaryText = "286 km Estimated Range"
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Arc coverage: 260 degrees for automotive cockpit dial
  const arcLength = circumference * (260 / 360);
  const strokeDashoffset = arcLength - (arcLength * Math.min(Math.max(value, 0), max)) / max;

  const gradientId = `gauge-gradient-${color}-${Math.random().toString(36).substring(7)}`;

  return (
    <div className="relative flex flex-col items-center justify-center select-none" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-[130deg]"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            {color === 'cyan' && (
              <>
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="50%" stopColor="#00f2fe" />
                <stop offset="100%" stopColor="#38bdf8" />
              </>
            )}
            {color === 'green' && (
              <>
                <stop offset="0%" stopColor="#059669" />
                <stop offset="70%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#34d399" />
              </>
            )}
            {color === 'amber' && (
              <>
                <stop offset="0%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#fbbf24" />
              </>
            )}
          </linearGradient>
          <filter id="gaugeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(30, 41, 59, 0.7)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeLinecap="round"
        />

        {/* Dynamic Progress Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          filter="url(#gaugeGlow)"
          className="transition-all duration-700 ease-out"
        />
      </svg>

      {/* Center Dial Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none mt-1">
        <span className="text-[10px] tracking-widest uppercase font-semibold text-slate-400 mb-0.5">
          {label}
        </span>
        <div className="flex items-baseline justify-center">
          <span className="text-4xl md:text-5xl font-black font-mono tracking-tight text-white drop-shadow-[0_0_15px_rgba(0,242,254,0.4)]">
            {Math.round(value)}
          </span>
          <span className="text-lg font-bold text-cyan-400 ml-0.5">{unit}</span>
        </div>
        {secondaryText && (
          <span className="text-xs font-medium text-emerald-400/90 mt-1 max-w-[120px] truncate">
            {secondaryText}
          </span>
        )}
      </div>
    </div>
  );
};
export default LiveGauge;
