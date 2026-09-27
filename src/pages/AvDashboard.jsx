import React from 'react';
import { useSimulation } from '../context/SimulationContext';
import {
  Cpu,
  Radio,
  Shield,
  ShieldAlert,
  Compass,
  Gauge,
  Activity,
  Eye,
  Camera,
  Layers,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Terminal,
  Navigation
} from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import MetricCard from '../components/common/MetricCard';
import StatusBadge from '../components/common/StatusBadge';
import PerceptionCanvas from '../components/maps/PerceptionCanvas';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';

export const AvDashboard = () => {
  const {
    vehicle,
    sensors,
    obstacles,
    battery,
    telemetryHistory,
    eventLogs,
    toggleDrivingMode
  } = useSimulation();

  return (
    <div className="space-y-6">
      {/* Top Page Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            Core Module 01
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-xs font-mono text-slate-400">EDGE PERCEPTION & CONTROL</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-1">
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            Real-Time AV Dashboard
          </h1>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>{vehicle.name}</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-300">{vehicle.type}</span>
            <span className="text-slate-600 hidden md:inline">•</span>
            <span className="text-slate-400 hidden md:inline">VIN: {vehicle.vin}</span>
          </div>
        </div>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          A unified interface for monitoring and controlling autonomous vehicle state — from mode
          transitions to live sensor health and environmental awareness.
        </p>
      </div>

      {/* TOP SECTION: Quick Status Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 p-4 rounded-2xl bg-[#0b1324]/80 border border-slate-800 backdrop-blur-xl">
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">VEHICLE STATUS</span>
          <div className="flex items-center gap-1.5">
            <StatusBadge status={vehicle.status} variant="green" pulse={true} size="xs" />
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">DRIVING MODE</span>
          <div className="flex items-center gap-1.5">
            <StatusBadge
              status={vehicle.drivingMode}
              variant={vehicle.drivingMode === 'AUTONOMOUS' ? 'cyan' : 'amber'}
              size="xs"
            />
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">SYSTEM HEALTH</span>
          <div className="font-mono font-extrabold text-sm text-cyan-400 flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-cyan-400" />
            <span>{vehicle.systemHealth}%</span>
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">BATTERY SOC</span>
          <div className="font-mono font-extrabold text-sm text-emerald-400">
            {Math.round(battery.soc)}%
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">CURRENT VELOCITY</span>
          <div className="font-mono font-extrabold text-sm text-white">
            {vehicle.speed} km/h
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-mono text-slate-400 uppercase">GPS LOCK STATUS</span>
          <div className="flex items-center gap-1.5 font-mono text-xs font-bold text-cyan-400">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>{vehicle.gps.status}</span>
          </div>
        </div>
      </div>

      {/* MODE CONTROL INTERACTIVE TOGGLE CARD */}
      <div className="rounded-2xl bg-gradient-to-r from-[#0d1627] via-[#0b1324] to-[#0d1627] border border-cyan-500/30 p-5 md:p-6 shadow-[0_0_25px_-5px_rgba(0,242,254,0.2)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>ACTUATION INTERLOCK ARCHITECTURE</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Autonomous / Manual Actuation Mode
          </h3>
          <p className="text-xs text-slate-300 max-w-xl">
            {vehicle.drivingMode === 'AUTONOMOUS'
              ? 'Safety Interlock Engaged: Deterministic trajectory planner has primary actuator control. Steering and torque fly-by-wire are hardware monitored.'
              : 'Manual Override Active: Driver has direct mechanical control over steering and braking actuators. Perception telemetry continues in background observation.'}
          </p>
        </div>

        <div className="flex flex-col items-center gap-2">
          {/* Large Interactive Mode Switch */}
          <div className="flex items-center bg-slate-900/90 p-1.5 rounded-2xl border border-slate-700/80">
            <button
              onClick={() => vehicle.drivingMode !== 'MANUAL' && toggleDrivingMode()}
              className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all ${
                vehicle.drivingMode === 'MANUAL'
                  ? 'bg-amber-500 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              MANUAL
            </button>
            <button
              onClick={() => vehicle.drivingMode !== 'AUTONOMOUS' && toggleDrivingMode()}
              className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all ${
                vehicle.drivingMode === 'AUTONOMOUS'
                  ? 'bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,242,254,0.5)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              AUTONOMOUS
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono">
            {vehicle.safetyInterlock ? (
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Fail-Safe Interlock Active
              </span>
            ) : (
              <span className="text-amber-400 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> Manual Fallback Mode
              </span>
            )}
          </div>
        </div>
      </div>

      {/* SENSOR STATUS: 4 Dedicated Sensor Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Multi-Sensor Fusion Health (LiDAR • Radar • IMU • Camera)
          </h3>
          <span className="text-xs font-mono text-emerald-400">HARDWARE SYNC: LOCKED</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* LiDAR Card */}
          <div className="p-4 rounded-2xl bg-[#0b1324] border border-slate-800 hover:border-cyan-500/40 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                LiDAR
              </span>
              <StatusBadge status={sensors.lidar.status} variant="green" size="xs" />
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Signal Quality:</span>
                <span className="font-mono text-cyan-400 font-bold">{sensors.lidar.signalQuality}%</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Frequency:</span>
                <span className="font-mono text-white">{sensors.lidar.frequency}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Points/Sec:</span>
                <span className="font-mono text-slate-300">{sensors.lidar.pointsPerSec}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400 pt-1 border-t border-slate-800/80 text-[10px]">
                <span>Last Update:</span>
                <span className="font-mono text-slate-400">{sensors.lidar.lastUpdate}</span>
              </div>
            </div>
          </div>

          {/* Radar Card */}
          <div className="p-4 rounded-2xl bg-[#0b1324] border border-slate-800 hover:border-cyan-500/40 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                Radar
              </span>
              <StatusBadge status={sensors.radar.status} variant="green" size="xs" />
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Signal Quality:</span>
                <span className="font-mono text-emerald-400 font-bold">{sensors.radar.signalQuality}%</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Frequency:</span>
                <span className="font-mono text-white">{sensors.radar.frequency}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Tracked Targets:</span>
                <span className="font-mono text-slate-300">{sensors.radar.targetsTracked} Objects</span>
              </div>
              <div className="flex items-center justify-between text-slate-400 pt-1 border-t border-slate-800/80 text-[10px]">
                <span>Last Update:</span>
                <span className="font-mono text-slate-400">{sensors.radar.lastUpdate}</span>
              </div>
            </div>
          </div>

          {/* IMU Card */}
          <div className="p-4 rounded-2xl bg-[#0b1324] border border-slate-800 hover:border-cyan-500/40 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                IMU (6-DoF)
              </span>
              <StatusBadge status={sensors.imu.status} variant="green" size="xs" />
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Signal Quality:</span>
                <span className="font-mono text-blue-400 font-bold">{sensors.imu.signalQuality}%</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Gyro Drift:</span>
                <span className="font-mono text-white">{sensors.imu.gyro}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Roll / Pitch:</span>
                <span className="font-mono text-slate-300">{sensors.imu.roll} / {sensors.imu.pitch}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400 pt-1 border-t border-slate-800/80 text-[10px]">
                <span>Last Update:</span>
                <span className="font-mono text-slate-400">{sensors.imu.lastUpdate}</span>
              </div>
            </div>
          </div>

          {/* Camera Card */}
          <div className="p-4 rounded-2xl bg-[#0b1324] border border-slate-800 hover:border-cyan-500/40 transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></span>
                Camera Array
              </span>
              <StatusBadge status={sensors.camera.status} variant="green" size="xs" />
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Signal Quality:</span>
                <span className="font-mono text-purple-400 font-bold">{sensors.camera.signalQuality}%</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Framerate:</span>
                <span className="font-mono text-white">{sensors.camera.fps}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Latency:</span>
                <span className="font-mono text-slate-300">{sensors.camera.latency}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400 pt-1 border-t border-slate-800/80 text-[10px]">
                <span>Last Update:</span>
                <span className="font-mono text-slate-400">{sensors.camera.lastUpdate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* VEHICLE TELEMETRY METRIC CARDS */}
      <div>
        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
          Kinematics & Spatial Telemetry
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          <MetricCard
            title="Vehicle Speed"
            value={vehicle.speed}
            unit="km/h"
            icon={Gauge}
            accentColor="cyan"
          />
          <MetricCard
            title="Heading Angle"
            value={vehicle.heading}
            unit="°"
            subtitle="South-Southwest"
            icon={Compass}
            accentColor="blue"
          />
          <MetricCard
            title="Acceleration"
            value={vehicle.acceleration}
            unit="m/s²"
            subtitle="Longitudinal"
            icon={Activity}
            accentColor="green"
          />
          <MetricCard
            title="GPS Latitude"
            value={vehicle.gps.lat}
            unit="°N"
            subtitle="Bengaluru Urban"
            icon={MapPin}
            accentColor="amber"
          />
          <MetricCard
            title="GPS Longitude"
            value={vehicle.gps.lng}
            unit="°E"
            subtitle="±0.12m RTK Accuracy"
            icon={MapPin}
            accentColor="cyan"
          />
        </div>
      </div>

      {/* PERCEPTION VIEW & OBSTACLE DETECTION / LANE STATUS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Large Simulated Autonomous Perception Panel (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <GlassCard
            title="Autonomous Perception View"
            subtitle="Simulated real-time road boundaries, lead vehicles, pedestrians, and obstacles"
            icon={Eye}
          >
            <PerceptionCanvas />
          </GlassCard>
        </div>

        {/* Live Obstacle Detection List & Lane Status (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <GlassCard
            title="Obstacle Detection Stream"
            subtitle="Spatial Distance & Relative Velocity Tracking"
            icon={Layers}
          >
            <div className="space-y-3">
              {obstacles.map((obs) => (
                <div
                  key={obs.id}
                  className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg border ${
                        obs.type.includes('Vehicle')
                          ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                          : obs.type.includes('Pedestrian')
                          ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                          : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                      }`}
                    >
                      <Eye className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{obs.type}</h4>
                      <p className="text-[11px] text-slate-400">{obs.bearing}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-sm font-black font-mono text-cyan-400">
                      {obs.distance} m
                    </span>
                    <span className="block text-[10px] text-slate-400 font-mono">
                      {obs.speed}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Lane Detection Status Card */}
            <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-cyan-950/30 to-blue-950/20 border border-cyan-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-cyan-300">Lane Detection Status</span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                  {vehicle.laneStatus.state}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-300">
                <div>Left Boundary: {vehicle.laneStatus.leftBoundaryDistance} m</div>
                <div>Right Boundary: {vehicle.laneStatus.rightBoundaryDistance} m</div>
                <div className="col-span-2 text-slate-400 text-[11px]">
                  Curvature: {vehicle.laneStatus.curvature}
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* REAL-TIME SPEED / ACCELERATION RECHARTS GRAPH & EVENT LOG */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Speed / Acceleration Telemetry Graph (7 Cols) */}
        <div className="lg:col-span-7">
          <GlassCard
            title="Real-Time Kinematic Telemetry"
            subtitle="Dynamic Velocity (km/h) & Acceleration (m/s²) over time"
            icon={Activity}
          >
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={telemetryHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} tickLine={false} domain={[0, 60]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0b1324',
                      borderColor: '#1e293b',
                      borderRadius: '0.75rem',
                      fontSize: '11px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Line
                    type="monotone"
                    dataKey="speed"
                    name="Speed (km/h)"
                    stroke="#00f2fe"
                    strokeWidth={2.5}
                    dot={false}
                    activeDot={{ r: 5, fill: '#00f2fe' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="acceleration"
                    name="Acceleration (m/s²)"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* System Event Log (5 Cols) */}
        <div className="lg:col-span-5">
          <GlassCard
            title="System Event Log"
            subtitle="Real-Time Autonomous Subsystem Audit"
            icon={Terminal}
          >
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1 font-mono">
              {eventLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs flex items-start gap-2.5"
                >
                  <span className="text-[10px] text-cyan-400 font-bold shrink-0 mt-0.5">
                    [{log.time}]
                  </span>
                  <div className="flex-1">
                    <span className="text-slate-200 text-[11px] leading-snug">
                      {log.message}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
export default AvDashboard;
