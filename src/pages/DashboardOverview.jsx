import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSimulation } from '../context/SimulationContext';
import {
  Cpu,
  BatteryCharging,
  Zap,
  Navigation,
  Shield,
  Gauge,
  Activity,
  Radio,
  ArrowRight,
  TrendingUp,
  MapPin,
  Clock,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Car
} from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import MetricCard from '../components/common/MetricCard';
import StatusBadge from '../components/common/StatusBadge';
import LiveGauge from '../components/common/LiveGauge';
import PerceptionCanvas from '../components/maps/PerceptionCanvas';

export const DashboardOverview = () => {
  const { user } = useAuth();
  const {
    vehicle,
    battery,
    sensors,
    obstacles,
    chargingStations,
    activeCharging,
    estimatedRangeKm,
    toggleDrivingMode
  } = useSimulation();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Top Welcome & Subsystem Overview Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              Unified Vehicle Cockpit
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs font-mono text-slate-400">TELEMATICS 100Hz</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-1 flex items-center gap-2.5">
            <span>Welcome, {user?.name || 'Sathvik'}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono font-normal border border-cyan-500/30">
              {vehicle.name} • {vehicle.type || 'Autonomous EV'}
            </span>
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Real-Time Autonomous EV Intelligence Platform — All modules synchronized via central telemetry.
          </p>
        </div>

        {/* Global Driving Mode Switch & Safety Interlock Status */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-mono text-slate-400 uppercase">SAFETY INTERLOCK</span>
            <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5" /> ACTIVE REDUNDANCY
            </span>
          </div>

          <button
            onClick={toggleDrivingMode}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 border ${
              vehicle.drivingMode === 'AUTONOMOUS'
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                : 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
            }`}
          >
            <Radio className="w-4 h-4 animate-pulse" />
            <span>MODE: {vehicle.drivingMode}</span>
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Vehicle Velocity"
          value={vehicle.speed}
          unit="km/h"
          subtitle={`Heading ${vehicle.heading}° • Accel ${vehicle.acceleration} m/s²`}
          icon={Gauge}
          accentColor="cyan"
          trend={{ direction: 'up', label: 'Cruising' }}
        />

        <MetricCard
          title="Battery State of Charge"
          value={Math.round(battery.soc)}
          unit="%"
          subtitle={`Est. Range ${estimatedRangeKm} km • ${battery.chargingState}`}
          icon={BatteryCharging}
          accentColor="green"
          trend={{ direction: battery.chargingState === 'Charging' ? 'up' : 'down', label: `${battery.voltage}V` }}
        />

        <MetricCard
          title="Sensor Array Health"
          value="98.8"
          unit="%"
          subtitle="LiDAR + Radar + IMU + 4K Cam"
          icon={Cpu}
          accentColor="blue"
          trend={{ direction: 'up', label: 'All 4 Online' }}
        />

        <MetricCard
          title="Nearest Rapid Charger"
          value="2.4"
          unit="km"
          subtitle="ElectraFast Hub #4 • 150 kW"
          icon={Zap}
          accentColor="amber"
          trend={{ direction: 'up', label: '3 Plugs Free' }}
        />
      </div>

      {/* Main Grid: Perception Panel & Battery/Charging Quick View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Live AV Perception & Obstacles (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <GlassCard
            title="Real-Time Autonomous Perception Feed"
            subtitle="LiDAR Voxel Point Cloud & 4K Camera Object Regression"
            icon={Cpu}
            action={
              <Link
                to="/av-dashboard"
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <span>Full AV Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            }
          >
            <PerceptionCanvas />

            {/* Quick Obstacles Ribbon */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {obstacles.map((obs) => (
                <div key={obs.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                  <div className="text-[10px] font-mono text-slate-400 truncate">{obs.type}</div>
                  <div className="text-sm font-bold font-mono text-cyan-400 mt-0.5">{obs.distance} m</div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">{obs.bearing}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Battery Dial & Smart Charging/Trip Glance (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Circular Battery Health Card */}
          <GlassCard
            title="Battery Intelligence & Range"
            subtitle="Extended Kalman Filter Real-Time Estimation"
            icon={BatteryCharging}
            action={
              <Link
                to="/battery"
                className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <span>Battery Analytics</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            }
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-2">
              <LiveGauge
                value={battery.soc}
                max={100}
                size={180}
                strokeWidth={14}
                label="STATE OF CHARGE"
                unit="%"
                color={battery.soc > 25 ? "cyan" : "amber"}
                secondaryText={`${estimatedRangeKm} km Range`}
              />

              <div className="flex-1 w-full space-y-3">
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">Pack Voltage:</span>
                  <span className="font-mono font-bold text-white">{battery.voltage} V</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">Operating Current:</span>
                  <span className="font-mono font-bold text-white">{battery.current} A</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">Cell Core Temp:</span>
                  <span className="font-mono font-bold text-emerald-400">{battery.temperature}°C (Nominal)</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">State of Health (SOH):</span>
                  <span className="font-mono font-bold text-cyan-400">{battery.soh}% Excellent</span>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Quick Smart Charging & Trip Planner Launcher */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/charging"
              className="p-4 rounded-2xl bg-gradient-to-b from-[#0d1627] to-[#090f1d] border border-slate-800 hover:border-cyan-500/40 p-4 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                    <Zap className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 font-bold">150 kW DC</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">Smart Charging</h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Reserve slots, live charging curves, and station network tracking.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-cyan-400">
                <span>Find Stations</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/trip-planner"
              className="p-4 rounded-2xl bg-gradient-to-b from-[#0d1627] to-[#090f1d] border border-slate-800 hover:border-cyan-500/40 p-4 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                    <Navigation className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold">142 km Route</span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">EV Trip Planner</h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  Battery-aware route feasibility with automated waypoint stop calculation.
                </p>
              </div>
              <div className="mt-4 pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-bold text-cyan-400">
                <span>Plan Journey</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardOverview;
