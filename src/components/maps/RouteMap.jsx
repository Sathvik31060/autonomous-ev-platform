import React, { useState } from 'react';
import { MapPin, Zap, Navigation, Flag, Shield, Info, BatteryCharging } from 'lucide-react';
import { useSimulation } from '../../context/SimulationContext';

export const RouteMap = ({
  start = "Tech Hub, Sector 4",
  destination = "Aerospace Park, Terminal 2",
  recommendedStop = "ElectraFast Supercharger #4",
  routeType = "charging"
}) => {
  const { battery } = useSimulation();
  const [activeTooltip, setActiveTooltip] = useState(null);

  // SVG coordinate system: 800 x 420
  const startPoint = { x: 90, y: 310, label: start };
  const stopPoint = { x: 420, y: 190, label: recommendedStop };
  const destPoint = { x: 710, y: 110, label: destination };

  // Other charging stations off-route or along route
  const stations = [
    { x: 260, y: 280, name: "EcoCharge Urban Hub", power: "50 kW", status: "Available" },
    { x: 420, y: 190, name: recommendedStop, power: "150 kW", status: "Recommended Stop", isRecommended: true },
    { x: 570, y: 140, name: "ChargePoint Hyper Hub", power: "250 kW", status: "Available" },
    { x: 380, y: 340, name: "SolarDrive Station", power: "60 kW", status: "In Use" },
  ];

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-slate-800 bg-[#070d18] p-4 select-none">
      {/* Top Map HUD Controls */}
      <div className="absolute top-6 left-6 z-20 flex flex-wrap items-center gap-2 pointer-events-none">
        <div className="px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-cyan-500/30 flex items-center gap-2 text-xs font-mono text-cyan-300">
          <Navigation className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
          <span>ROUTE CORRIDOR: NH-44 SMART EXPRESSWAY</span>
        </div>
        <div className="px-3 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-emerald-500/30 flex items-center gap-2 text-xs font-mono text-emerald-400">
          <BatteryCharging className="w-3.5 h-3.5" />
          <span>ESTIMATED ARRIVAL SOC: 84% (WITH 1 CHARGING STOP)</span>
        </div>
      </div>

      {/* SVG Canvas Map */}
      <svg viewBox="0 0 800 420" className="w-full h-[360px] md:h-[430px] rounded-xl">
        <defs>
          {/* Subtle grid pattern */}
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(56, 189, 248, 0.05)" strokeWidth="1" />
          </pattern>
          {/* Route Gradient */}
          <linearGradient id="routeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f2fe" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <filter id="routeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Map Grid */}
        <rect width="800" height="420" fill="#070d18" />
        <rect width="800" height="420" fill="url(#grid)" />

        {/* Secondary Road Networks (Subtle) */}
        <path d="M 40 180 Q 200 230 400 300 T 760 360" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="6" />
        <path d="M 120 400 Q 300 280 500 120 T 780 40" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="5" />
        <path d="M 680 390 L 720 40" fill="none" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="4" />

        {/* High-speed Expressway Corridor (Base road) */}
        <path
          d={`M ${startPoint.x} ${startPoint.y} C 220 330, 310 240, ${stopPoint.x} ${stopPoint.y} C 530 140, 600 130, ${destPoint.x} ${destPoint.y}`}
          fill="none"
          stroke="#1e293b"
          strokeWidth="12"
          strokeLinecap="round"
        />

        {/* Active Route Glow Line */}
        <path
          d={`M ${startPoint.x} ${startPoint.y} C 220 330, 310 240, ${stopPoint.x} ${stopPoint.y} C 530 140, 600 130, ${destPoint.x} ${destPoint.y}`}
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="4.5"
          strokeLinecap="round"
          filter="url(#routeGlow)"
        />

        {/* Animated Dash Moving along Route */}
        <path
          d={`M ${startPoint.x} ${startPoint.y} C 220 330, 310 240, ${stopPoint.x} ${stopPoint.y} C 530 140, 600 130, ${destPoint.x} ${destPoint.y}`}
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeDasharray="14 180"
          className="animate-scanline"
        />

        {/* Charging Stations along map */}
        {stations.map((st, i) => (
          <g
            key={i}
            className="cursor-pointer transition-transform hover:scale-110"
            onMouseEnter={() => setActiveTooltip(st)}
            onMouseLeave={() => setActiveTooltip(null)}
          >
            {st.isRecommended && (
              <>
                <circle cx={st.x} cy={st.y} r="22" fill="rgba(16, 185, 129, 0.18)" className="animate-ping" />
                <circle cx={st.x} cy={st.y} r="16" fill="rgba(16, 185, 129, 0.25)" />
              </>
            )}
            <circle
              cx={st.x}
              cy={st.y}
              r="10"
              fill={st.isRecommended ? "#10b981" : "#0284c7"}
              stroke="#0f172a"
              strokeWidth="2"
            />
            <path
              d={`M ${st.x - 3} ${st.y - 4} L ${st.x + 1} ${st.y - 4} L ${st.x - 1} ${st.y + 1} L ${st.x + 3} ${st.y + 1} L ${st.x - 2} ${st.y + 5} L ${st.x - 1} ${st.y} L ${st.x - 3} ${st.y} Z`}
              fill="#ffffff"
            />
            {st.isRecommended && (
              <text x={st.x} y={st.y - 18} fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">
                STOP (18m / +38kWh)
              </text>
            )}
          </g>
        ))}

        {/* Start Point Marker (A) */}
        <g transform={`translate(${startPoint.x}, ${startPoint.y})`}>
          <circle cx="0" cy="0" r="14" fill="#00f2fe" stroke="#0f172a" strokeWidth="2.5" />
          <text x="0" y="4" fill="#000000" fontSize="11" fontWeight="900" textAnchor="middle">
            A
          </text>
          <text x="0" y="24" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">
            START
          </text>
        </g>

        {/* Destination Marker (B) */}
        <g transform={`translate(${destPoint.x}, ${destPoint.y})`}>
          <circle cx="0" cy="0" r="14" fill="#3b82f6" stroke="#0f172a" strokeWidth="2.5" />
          <text x="0" y="4" fill="#ffffff" fontSize="11" fontWeight="900" textAnchor="middle">
            B
          </text>
          <text x="0" y="24" fill="#94a3b8" fontSize="10" fontWeight="bold" textAnchor="middle">
            DESTINATION
          </text>
        </g>

        {/* Current Vehicle Position along route (Simulated on trajectory) */}
        <g transform="translate(240, 275)">
          <circle cx="0" cy="0" r="16" fill="rgba(0, 242, 254, 0.25)" className="animate-pulse" />
          <circle cx="0" cy="0" r="7" fill="#00f2fe" stroke="#ffffff" strokeWidth="1.5" />
          <text x="0" y="-14" fill="#00f2fe" fontSize="10" fontWeight="bold" textAnchor="middle">
            EV-01 ({Math.round(battery.soc)}% SOC)
          </text>
        </g>
      </svg>

      {/* Tooltip Overlay */}
      {activeTooltip && (
        <div className="absolute top-20 right-6 z-30 bg-slate-900/95 border border-cyan-500/40 rounded-xl p-3 shadow-xl text-xs w-60">
          <div className="flex items-center justify-between font-bold text-white mb-1">
            <span>{activeTooltip.name}</span>
            <span className="text-emerald-400 font-mono">{activeTooltip.power}</span>
          </div>
          <div className="text-slate-400">{activeTooltip.status}</div>
        </div>
      )}

      {/* Bottom Map Legend */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-2 pt-3 border-t border-slate-800 text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span> Start Node
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> Proactive Charging Stop
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Destination
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-cyan-400">
          <span>TOTAL DISTANCE: 142 KM • 1 HR 55 MIN</span>
        </div>
      </div>
    </div>
  );
};
export default RouteMap;
