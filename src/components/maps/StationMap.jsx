import React, { useState } from 'react';
import { Zap, Navigation, CheckCircle, Clock, MapPin } from 'lucide-react';

export const StationMap = ({ stations = [], selectedStation, onSelectStation }) => {
  const [hoveredStation, setHoveredStation] = useState(null);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-[#070d18] p-3 select-none">
      {/* Map Header Status */}
      <div className="absolute top-5 left-5 z-20 flex items-center gap-2 pointer-events-none">
        <div className="px-3 py-1 rounded-xl bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 text-xs font-mono text-cyan-300 flex items-center gap-1.5">
          <Navigation className="w-3.5 h-3.5 text-cyan-400" />
          <span>METROPOLITAN GRID COVERAGE • 10 KM RADIUS</span>
        </div>
      </div>

      <svg viewBox="0 0 700 360" className="w-full h-[280px] md:h-[340px] rounded-xl">
        <defs>
          <pattern id="stationGrid" width="35" height="35" patternUnits="userSpaceOnUse">
            <path d="M 35 0 L 0 0 0 35" fill="none" stroke="rgba(56, 189, 248, 0.06)" strokeWidth="1" />
          </pattern>
          <radialGradient id="centerRadar" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(0, 242, 254, 0.15)" />
            <stop offset="80%" stopColor="rgba(0, 242, 254, 0.02)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        <rect width="700" height="360" fill="#070d18" />
        <rect width="700" height="360" fill="url(#stationGrid)" />

        {/* Radar concentric sweep circles */}
        <circle cx="350" cy="180" r="80" fill="none" stroke="rgba(56, 189, 248, 0.12)" strokeDasharray="3 3" />
        <circle cx="350" cy="180" r="140" fill="none" stroke="rgba(56, 189, 248, 0.1)" strokeDasharray="4 4" />
        <circle cx="350" cy="180" r="210" fill="none" stroke="rgba(56, 189, 248, 0.07)" strokeDasharray="5 5" />
        <circle cx="350" cy="180" r="210" fill="url(#centerRadar)" />

        {/* Roads & intersections */}
        <path d="M 50 180 L 650 180" stroke="rgba(255, 255, 255, 0.07)" strokeWidth="8" />
        <path d="M 350 40 L 350 320" stroke="rgba(255, 255, 255, 0.07)" strokeWidth="8" />
        <path d="M 120 70 L 580 290" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="5" />
        <path d="M 140 310 L 560 50" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="5" />

        {/* Center Vehicle Marker */}
        <g transform="translate(350, 180)">
          <circle cx="0" cy="0" r="16" fill="rgba(0, 242, 254, 0.2)" className="animate-ping" />
          <circle cx="0" cy="0" r="7" fill="#00f2fe" stroke="#ffffff" strokeWidth="2" />
          <text x="0" y="20" fill="#00f2fe" fontSize="10" fontWeight="bold" textAnchor="middle">
            MY EV
          </text>
        </g>

        {/* Charging Station Pins */}
        {stations.map((st, i) => {
          // Predefined layout points for visual clarity
          const coords = [
            { x: 440, y: 120 },
            { x: 230, y: 110 },
            { x: 480, y: 250 },
            { x: 190, y: 240 }
          ][i % 4];

          const isSelected = selectedStation?.id === st.id;
          const isAvailable = st.status === 'Available';

          return (
            <g
              key={st.id}
              transform={`translate(${coords.x}, ${coords.y})`}
              className="cursor-pointer"
              onClick={() => onSelectStation(st)}
              onMouseEnter={() => setHoveredStation({ ...st, coords })}
              onMouseLeave={() => setHoveredStation(null)}
            >
              {/* Outer Glow if selected */}
              {isSelected && (
                <circle cx="0" cy="-6" r="22" fill="none" stroke="#00f2fe" strokeWidth="2" className="animate-pulse" />
              )}

              {/* Pin Base */}
              <circle
                cx="0"
                cy="-6"
                r="13"
                fill={isAvailable ? (isSelected ? "#00f2fe" : "#10b981") : "#64748b"}
                stroke="#0f172a"
                strokeWidth="2.5"
                className="transition-all hover:scale-125"
              />
              <Zap
                x="-6"
                y="-12"
                width="12"
                height="12"
                className={isSelected ? "text-slate-950 font-bold" : "text-white"}
              />

              {/* Station Label */}
              <text
                x="0"
                y="18"
                fill={isSelected ? "#00f2fe" : "#94a3b8"}
                fontSize="10"
                fontWeight={isSelected ? "bold" : "normal"}
                textAnchor="middle"
              >
                {st.powerKW} kW
              </text>
            </g>
          );
        })}
      </svg>

      {/* Floating Hover Card */}
      {hoveredStation && (
        <div
          className="absolute z-30 bg-slate-900/95 border border-cyan-500/50 rounded-xl p-3 shadow-xl text-xs w-56 pointer-events-none"
          style={{
            left: Math.min(hoveredStation.coords.x * 0.9, 450),
            top: Math.max(hoveredStation.coords.y * 0.7 - 50, 10)
          }}
        >
          <div className="font-bold text-white mb-0.5">{hoveredStation.name}</div>
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-cyan-400 font-mono font-bold">{hoveredStation.powerKW} kW</span>
            <span>{hoveredStation.distanceKm} km away</span>
          </div>
          <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-800">
            <span className={hoveredStation.status === 'Available' ? 'text-emerald-400' : 'text-slate-400'}>
              {hoveredStation.availablePlugs}/{hoveredStation.totalPlugs} Available
            </span>
            <span className="text-slate-300 font-mono">${hoveredStation.pricePerKWh}/kWh</span>
          </div>
        </div>
      )}
    </div>
  );
};
export default StationMap;
