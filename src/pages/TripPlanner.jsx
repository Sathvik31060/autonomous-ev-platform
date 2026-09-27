import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import {
  Navigation,
  MapPin,
  BatteryCharging,
  Zap,
  Clock,
  Compass,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Sliders,
  TrendingDown,
  Layers,
  ArrowRight
} from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import MetricCard from '../components/common/MetricCard';
import StatusBadge from '../components/common/StatusBadge';
import RouteMap from '../components/maps/RouteMap';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from 'recharts';

export const TripPlanner = () => {
  const { battery } = useSimulation();

  // Input fields state
  const [startLocation, setStartLocation] = useState('Tech Hub, Sector 4');
  const [destination, setDestination] = useState('Aerospace Park, Terminal 2');
  const [vehicleEfficiency, setVehicleEfficiency] = useState('15.8');
  const [preferredRoute, setPreferredRoute] = useState('charging-optimized');
  const [isCalculated, setIsCalculated] = useState(true);

  // Alternative routes definition
  const routeAlternatives = [
    {
      id: 'fastest',
      name: 'Fastest Route',
      distanceKm: 138,
      duration: '1 hr 45 min',
      energyKWh: 24.2,
      arrivalSoc: 46,
      chargingStops: 0,
      highwayPercent: '88%',
      description: 'Prioritizes high-speed expressway segments. Higher drag requires slightly more energy.'
    },
    {
      id: 'energy-efficient',
      name: 'Energy Efficient Route',
      distanceKm: 144,
      duration: '2 hr 05 min',
      energyKWh: 19.8,
      arrivalSoc: 53,
      chargingStops: 0,
      highwayPercent: '62%',
      description: 'Optimized speed limit corridor (70 km/h) minimizing aerodynamic drag and regenerative braking loss.'
    },
    {
      id: 'charging-optimized',
      name: 'Charging Optimized Route',
      distanceKm: 142,
      duration: '1 hr 55 min',
      energyKWh: 22.4,
      arrivalSoc: 84, // with 1 charging stop
      chargingStops: 1,
      highwayPercent: '75%',
      description: 'Incorporates 1 proactive 18-minute stop at ElectraFast #4 to ensure high buffer on arrival.'
    }
  ];

  // Active selected route
  const activeRoute = routeAlternatives.find(r => r.id === preferredRoute) || routeAlternatives[2];

  // Energy consumption along corridor distance (km vs cumulative kWh)
  const routeEnergyData = [
    { km: 0, energy: 0, socRemaining: Math.round(battery.soc) },
    { km: 25, energy: 3.9, socRemaining: Math.round(battery.soc - 5) },
    { km: 50, energy: 8.1, socRemaining: Math.round(battery.soc - 11) },
    { km: 68, energy: 11.2, socRemaining: 44 }, // charging stop
    { km: 70, energy: 11.2, socRemaining: 82 }, // after 18 min charge
    { km: 100, energy: 16.0, socRemaining: 76 },
    { km: 125, energy: 20.1, socRemaining: 70 },
    { km: 142, energy: 22.4, socRemaining: 66 },
  ];

  const handlePlanRoute = (e) => {
    e.preventDefault();
    setIsCalculated(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            Core Module 04
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-xs font-mono text-slate-400">GRAPH TRAJECTORY & ENERGY FEASIBILITY</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-1">
          EV Trip Planner
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          The trip planner integrates real-time battery state, route topology, and charging network
          data to generate energy-feasible routes with proactive charging recommendations.
        </p>
      </div>

      {/* INPUT SECTION CARD */}
      <GlassCard
        title="Journey Parameters & Vehicle Constraints"
        subtitle="Specify start, destination, and vehicle efficiency parameters"
        icon={Sliders}
      >
        <form onSubmit={handlePlanRoute} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div>
            <label className="block text-[11px] font-mono text-slate-300 mb-1">
              START LOCATION
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-cyan-400 absolute left-3 top-3" />
              <input
                type="text"
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-cyan-500 font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-300 mb-1">
              DESTINATION
            </label>
            <div className="relative">
              <Navigation className="w-4 h-4 text-blue-400 absolute left-3 top-3" />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-cyan-500 font-sans"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-300 mb-1">
              CURRENT BATTERY SOC
            </label>
            <div className="px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-xs font-mono text-cyan-400 font-bold flex items-center justify-between">
              <span>Live Synced</span>
              <span>{Math.round(battery.soc)}%</span>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-slate-300 mb-1">
              VEHICLE EFFICIENCY
            </label>
            <div className="relative">
              <input
                type="text"
                value={`${vehicleEfficiency} kWh/100km`}
                onChange={(e) => setVehicleEfficiency(e.target.value.replace(/[^0-9.]/g, ''))}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(0,242,254,0.35)] transition-all flex items-center justify-center gap-1.5 font-sans"
            >
              <Navigation className="w-4 h-4" />
              <span>Plan Route</span>
            </button>
          </div>
        </form>
      </GlassCard>

      {/* DYNAMIC ALERTS BAR */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Current battery level ({Math.round(battery.soc)}%) is sufficient for journey corridor.</span>
        </div>

        <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-300 flex items-center gap-2.5">
          <Zap className="w-4 h-4 shrink-0 text-cyan-400" />
          <span>Charging station available along route: ElectraFast Supercharger #4 at Km 68.</span>
        </div>

        <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-xs text-blue-300 flex items-center gap-2.5">
          <BatteryCharging className="w-4 h-4 shrink-0 text-blue-400" />
          <span>Charging recommended before destination to maintain &gt;80% target reserve.</span>
        </div>
      </div>

      {/* MAP & ROUTE ALTERNATIVES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Route Map (7 Cols) */}
        <div className="lg:col-span-7">
          <GlassCard
            title="Interactive Route Corridor Map"
            subtitle="Topological corridor with charging waypoints and vehicle position"
            icon={MapPin}
          >
            <RouteMap
              start={startLocation}
              destination={destination}
              recommendedStop="ElectraFast Supercharger #4"
            />
          </GlassCard>
        </div>

        {/* Route Alternatives Selection (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-1">
            Calculated Route Alternatives
          </div>

          {routeAlternatives.map((route) => {
            const isSelected = preferredRoute === route.id;

            return (
              <div
                key={route.id}
                onClick={() => setPreferredRoute(route.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900/90 border-cyan-500 shadow-[0_0_20px_-5px_rgba(0,242,254,0.3)]'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-xs font-bold text-white flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-cyan-400 shadow-[0_0_8px_#00f2fe]' : 'bg-slate-600'}`} />
                    {route.name}
                  </h4>
                  <span className="text-xs font-mono font-bold text-cyan-400">
                    {route.distanceKm} km
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                  {route.description}
                </p>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-[10px] font-mono text-slate-300">
                  <div>
                    <span className="text-slate-500 block">EST. TIME</span>
                    <span>{route.duration}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">ENERGY</span>
                    <span className="text-cyan-400">{route.energyKWh} kWh</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">ARRIVAL SOC</span>
                    <span className="text-emerald-400 font-bold">{route.arrivalSoc}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TRIP SUMMARY CARDS */}
      <GlassCard
        title="Trip Optimization Summary"
        subtitle={`Summary metrics computed for ${activeRoute.name}`}
        icon={Navigation}
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3 text-center">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-500 block">TOTAL DISTANCE</span>
            <span className="text-lg font-bold font-mono text-white">{activeRoute.distanceKm} km</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-500 block">EST. TRAVEL TIME</span>
            <span className="text-lg font-bold font-mono text-white">{activeRoute.duration}</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-500 block">ENERGY REQUIRED</span>
            <span className="text-lg font-bold font-mono text-cyan-400">{activeRoute.energyKWh} kWh</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-500 block">STARTING SOC</span>
            <span className="text-lg font-bold font-mono text-slate-300">{Math.round(battery.soc)}%</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-500 block">ARRIVAL SOC</span>
            <span className="text-lg font-bold font-mono text-emerald-400">{activeRoute.arrivalSoc}%</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-500 block">CHARGING STOPS</span>
            <span className="text-lg font-bold font-mono text-blue-400">{activeRoute.chargingStops} Stop</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-[10px] font-mono text-slate-500 block">EST. ENERGY COST</span>
            <span className="text-lg font-bold font-mono text-emerald-400">$6.27</span>
          </div>
        </div>
      </GlassCard>

      {/* RECOMMENDED CHARGING STOP & ENERGY CONSUMPTION CHART */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recommended Charging Stop (5 Cols) */}
        <div className="lg:col-span-5">
          <GlassCard
            title="Recommended Charging Stop"
            subtitle="Autonomous insertion based on state-of-charge trajectory"
            icon={Zap}
          >
            <div className="p-4 rounded-2xl bg-gradient-to-b from-cyan-950/20 to-slate-900 border border-cyan-500/30 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h4 className="text-sm font-bold text-white">ElectraFast Supercharger #4</h4>
                  <p className="text-xs text-slate-400">Tech Park Central, Sector 6</p>
                </div>
                <StatusBadge status="3 / 4 Plugs Free" variant="green" size="xs" />
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">DISTANCE AHEAD</span>
                  <span className="text-white font-bold">68 km (at Km 68)</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">SUGGESTED DURATION</span>
                  <span className="text-cyan-400 font-bold">18 min (DC Fast)</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">SOC BEFORE CHARGE</span>
                  <span className="text-amber-400 font-bold">44%</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">SOC AFTER CHARGE</span>
                  <span className="text-emerald-400 font-bold">82%</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 italic">
                *Proactive stop avoids dropping below 20% critical battery threshold and ensures 84% buffer on arrival.
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Energy Consumption Along Route (7 Cols) */}
        <div className="lg:col-span-7">
          <GlassCard
            title="Corridor Energy Depletion Profile"
            subtitle="Simulated SOC (%) & cumulative energy (kWh) across distance"
            icon={TrendingDown}
          >
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={routeEnergyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="socGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00f2fe" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#00f2fe" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="km" stroke="#64748b" fontSize={10} unit="km" />
                  <YAxis stroke="#64748b" fontSize={10} domain={[30, 100]} unit="%" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0b1324',
                      borderColor: '#1e293b',
                      borderRadius: '0.75rem',
                      fontSize: '11px'
                    }}
                  />
                  <ReferenceLine x={68} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Charge Stop', fill: '#10b981', fontSize: 10 }} />
                  <Area
                    type="monotone"
                    dataKey="socRemaining"
                    name="SOC Remaining (%)"
                    stroke="#00f2fe"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#socGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
export default TripPlanner;
