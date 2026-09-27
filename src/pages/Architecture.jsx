import React from 'react';
import {
  Network,
  Cpu,
  BatteryCharging,
  Zap,
  Navigation,
  Cloud,
  Layers,
  Radio,
  Share2,
  Database,
  ArrowDown,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Workflow
} from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import MetricCard from '../components/common/MetricCard';
import StatusBadge from '../components/common/StatusBadge';

export const Architecture = () => {
  const unifiedDataCards = [
    {
      id: 'realtime-api',
      title: 'Real-Time API Layer',
      subtitle: 'Zero-Copy Shared Memory & Pub/Sub',
      icon: Radio,
      accent: 'cyan',
      description: 'Ultra-low latency publisher/subscriber message broker distributing raw LiDAR point clouds, radar clusters, and camera bounding boxes at 100Hz with sub-20ms latency.',
      metrics: '100 Hz Throughput • 18ms Latency'
    },
    {
      id: 'central-platform',
      title: 'Central Intelligence Hub',
      subtitle: 'Deterministic State Machine',
      icon: Cpu,
      accent: 'blue',
      description: 'The core coordination brain that fuses cross-domain telemetry, enforces autonomous safety interlocks, and synchronizes state between vehicle edge actuation and remote telematics.',
      metrics: 'Deterministic Priority Scheduler'
    },
    {
      id: 'cloud-sync',
      title: 'Cloud Fleet Sync',
      subtitle: 'Encrypted Telematics Pipeline',
      icon: Cloud,
      accent: 'purple',
      description: 'Bidirectional encrypted websocket streaming connecting the vehicle to regional grid networks, charging station reservation APIs, and fleet management cloud clusters.',
      metrics: 'TLS 1.3 5G Telematics'
    },
    {
      id: 'sensor-data',
      title: 'Perception Sensor Bus',
      subtitle: 'VLS-128, 77GHz Radar, IMU, 4K Array',
      icon: Layers,
      accent: 'green',
      description: 'High-bandwidth hardware sensor acquisition layer with timestamped hardware lock ensuring millisecond synchronization across all optical and radio perception units.',
      metrics: '1.24M Points/Sec LiDAR Stream'
    },
    {
      id: 'vehicle-data',
      title: 'Vehicle CAN / BMS Telemetry',
      subtitle: 'Extended Kalman Filter BMS',
      icon: BatteryCharging,
      accent: 'amber',
      description: 'Continuous electrochemical state tracking covering cell voltages, internal resistance, thermal gradients, and Coulombic efficiency for high-precision SOC/SOH estimation.',
      metrics: '±1.5% SOC State Precision'
    },
    {
      id: 'charging-data',
      title: 'Smart Charging Grid Bus',
      subtitle: 'OCPP 2.0.1 Protocol Integration',
      icon: Zap,
      accent: 'cyan',
      description: 'Interface communicating with external charging stations for automatic handshake, dynamic reservation slot queuing, charging curve tapering, and billing settlements.',
      metrics: 'OCPP 2.0.1 Protocol Compliant'
    }
  ];

  const relationships = [
    {
      from: 'Battery Analytics',
      to: 'EV Trip Planner',
      title: 'Battery state informs trip planning',
      description: 'Real-time SOC, SOH, and cell temperatures continuously update the graph-search algorithm to adjust speed corridor limits and trigger proactive waypoint charging stops before reaching critical depletion.'
    },
    {
      from: 'Smart Charging',
      to: 'Battery Analytics',
      title: 'Charging history feeds battery analytics',
      description: 'Every completed fast-charge session writes Coulombic efficiency, voltage taper curves, and energy delivered into long-term BMS degradation models to refine SOH calculations.'
    },
    {
      from: 'Vehicle Sensors',
      to: 'AV Dashboard',
      title: 'AV sensor data updates in real time',
      description: 'LiDAR voxelization and 4K camera arrays broadcast 60 FPS obstacle bounding boxes and lane confidence metrics directly to edge trajectory actuators.'
    },
    {
      from: 'Smart Charging',
      to: 'Trip Planner',
      title: 'Charging availability influences route planning',
      description: 'Live plug occupancy (e.g. 3/4 free) and power ratings along the corridor dynamically rank route alternatives between Fastest, Energy-Efficient, and Charging-Optimized.'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            System Design & Data Backbone
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-xs font-mono text-slate-400">CENTRALIZED INTEGRATION</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-1">
          Platform Integration Architecture
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          All four modules share a common data backbone, enabling cross-module intelligence and
          holistic autonomous EV operation.
        </p>
      </div>

      {/* DETAILED INTERACTIVE ARCHITECTURAL DIAGRAM */}
      <GlassCard
        title="Unified System Architecture & Data Flow Pipeline"
        subtitle="End-to-end signal propagation from Edge Sensors to Central Platform and Cloud Fleet Sync"
        icon={Network}
      >
        <div className="relative py-6 px-2 md:px-6">
          {/* Layer 1: Vehicle Sensors */}
          <div className="flex flex-col items-center">
            <div className="w-full max-w-xl p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-blue-950/60 border border-blue-500/40 text-center shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-blue-400 mb-1">
                <Layers className="w-4 h-4" />
                <span>LAYER 1: VEHICLE SENSORS & PHYSICAL ACTUATORS</span>
              </div>
              <div className="grid grid-cols-4 gap-2 text-[11px] font-mono text-slate-300 mt-2">
                <span className="p-1.5 rounded-lg bg-slate-950 border border-slate-800">Velodyne LiDAR</span>
                <span className="p-1.5 rounded-lg bg-slate-950 border border-slate-800">77GHz Radar</span>
                <span className="p-1.5 rounded-lg bg-slate-950 border border-slate-800">6-DoF IMU</span>
                <span className="p-1.5 rounded-lg bg-slate-950 border border-slate-800">Triple 4K Cam</span>
              </div>
            </div>

            {/* Connecting Flow Arrow 1 */}
            <div className="my-3 flex flex-col items-center">
              <div className="w-0.5 h-6 bg-gradient-to-b from-blue-500 to-cyan-400 animate-pulse" />
              <div className="px-2 py-0.5 rounded text-[9px] font-mono bg-cyan-950 text-cyan-300 border border-cyan-800">
                100 Hz Raw Data Bus
              </div>
              <div className="w-0.5 h-6 bg-gradient-to-b from-cyan-400 to-cyan-500" />
            </div>

            {/* Layer 2: Real-Time Data Layer */}
            <div className="w-full max-w-xl p-4 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-slate-900 to-cyan-950/60 border border-cyan-500/40 text-center shadow-[0_0_20px_rgba(0,242,254,0.2)]">
              <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-cyan-400 mb-1">
                <Radio className="w-4 h-4" />
                <span>LAYER 2: REAL-TIME DATA LAYER (ZERO-COPY PUB/SUB)</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Sensor Synchronization • Extended Kalman Filter BMS Pipeline • Shared Memory Buffer
              </p>
            </div>

            {/* Connecting Flow Arrow 2 */}
            <div className="my-3 flex flex-col items-center">
              <div className="w-0.5 h-6 bg-gradient-to-b from-cyan-500 to-emerald-400 animate-pulse" />
              <div className="px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
                Central Telemetry Bus
              </div>
              <div className="w-0.5 h-6 bg-gradient-to-b from-emerald-400 to-emerald-500" />
            </div>

            {/* Layer 3: Central Platform Core */}
            <div className="w-full max-w-2xl p-5 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-emerald-950/60 border-2 border-emerald-500/50 text-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <div className="flex items-center justify-center gap-2 text-sm font-mono font-bold text-emerald-300 mb-1">
                <Cpu className="w-5 h-5 text-emerald-400" />
                <span>LAYER 3: CENTRAL INTELLIGENCE PLATFORM</span>
              </div>
              <p className="text-xs text-slate-300 max-w-lg mx-auto">
                Deterministic actuation coordination, safety interlock supervisor, energy management engine, and cross-module synchronization.
              </p>
            </div>

            {/* Connecting Branching Lines to 4 Modules */}
            <div className="w-full max-w-4xl my-4 relative">
              <div className="h-0.5 w-full bg-gradient-to-r from-cyan-500 via-emerald-400 to-purple-500" />
              <div className="flex justify-between items-center -mt-1 px-4">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f2fe]" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                <div className="w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_8px_#3b82f6]" />
                <div className="w-2.5 h-2.5 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7]" />
              </div>
            </div>

            {/* Layer 4: Four Core Modules */}
            <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Module A */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/40 text-center space-y-2">
                <div className="p-2 w-9 h-9 rounded-xl bg-cyan-500/10 text-cyan-400 mx-auto flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-white">AV Dashboard</h4>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Autonomous actuation, LiDAR/camera perception & obstacle tracking.
                </p>
                <div className="text-[9px] font-mono text-cyan-400 bg-cyan-950/60 p-1 rounded">
                  Sub-20ms Actuation
                </div>
              </div>

              {/* Module B */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/40 text-center space-y-2">
                <div className="p-2 w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center">
                  <BatteryCharging className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-white">Battery Analytics</h4>
                <p className="text-[10px] text-slate-400 leading-tight">
                  SOC/SOH estimation, thermal control & cell degradation modeling.
                </p>
                <div className="text-[9px] font-mono text-emerald-400 bg-emerald-950/60 p-1 rounded">
                  EKF Filter ±1.5%
                </div>
              </div>

              {/* Module C */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-blue-500/40 text-center space-y-2">
                <div className="p-2 w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 mx-auto flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-white">Smart Charging</h4>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Station discovery, slot reservations & live charging curve logging.
                </p>
                <div className="text-[9px] font-mono text-blue-400 bg-blue-950/60 p-1 rounded">
                  OCPP 2.0.1 Grid Sync
                </div>
              </div>

              {/* Module D */}
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-purple-500/40 text-center space-y-2">
                <div className="p-2 w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 mx-auto flex items-center justify-center">
                  <Navigation className="w-5 h-5" />
                </div>
                <h4 className="text-xs font-bold text-white">EV Trip Planner</h4>
                <p className="text-[10px] text-slate-400 leading-tight">
                  Battery-aware routing, elevation loss & proactive charging stops.
                </p>
                <div className="text-[9px] font-mono text-purple-400 bg-purple-950/60 p-1 rounded">
                  Energy Feasible Graph
                </div>
              </div>
            </div>

            {/* Connecting Flow Arrow to Cloud */}
            <div className="my-3 flex flex-col items-center">
              <div className="w-0.5 h-6 bg-gradient-to-b from-purple-500 to-blue-400 animate-pulse" />
              <div className="px-2 py-0.5 rounded text-[9px] font-mono bg-blue-950 text-blue-300 border border-blue-800">
                Bidirectional Cloud Sync
              </div>
              <div className="w-0.5 h-6 bg-gradient-to-b from-blue-400 to-blue-500" />
            </div>

            {/* Layer 5: Cloud Sync */}
            <div className="w-full max-w-xl p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-blue-950/60 border border-blue-500/40 text-center shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold text-blue-400 mb-1">
                <Cloud className="w-4 h-4" />
                <span>LAYER 5: FLEET TELEMATICS & CLOUD SYNC</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Fleet-Wide Anomaly Aggregation • Grid Load Balancing • Remote Diagnostics Over 5G
              </p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* CROSS-MODULE DATA FLOW RELATIONSHIPS */}
      <div>
        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
          Cross-Module Inter-Intelligence Relationships
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {relationships.map((rel, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#0b1324] border border-slate-800 hover:border-cyan-500/40 transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono text-cyan-400 bg-cyan-950/70 border border-cyan-800">
                  {rel.from} → {rel.to}
                </span>
                <Share2 className="w-3.5 h-3.5 text-slate-500" />
              </div>
              <h4 className="text-sm font-bold text-white">{rel.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{rel.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* UNIFIED DATA LAYER SECTION (6 DETAILED CARDS) */}
      <div>
        <div className="mb-4">
          <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            Unified Data Layer Components
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Six architectural subcomponents maintaining operational consistency across edge and cloud.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {unifiedDataCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="p-5 rounded-2xl bg-gradient-to-b from-[#0d1627] to-[#090f1d] border border-slate-800 hover:border-slate-700 p-5 space-y-3 transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">{card.metrics}</span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white">{card.title}</h4>
                  <span className="text-[10px] font-mono text-cyan-400 block">{card.subtitle}</span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{card.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default Architecture;
