import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import {
  BatteryCharging,
  Battery,
  Zap,
  Activity,
  Thermometer,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Flame,
  Info
} from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import MetricCard from '../components/common/MetricCard';
import StatusBadge from '../components/common/StatusBadge';
import LiveGauge from '../components/common/LiveGauge';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine
} from 'recharts';

export const BatteryAnalytics = () => {
  const {
    battery,
    estimatedRangeKm,
    batteryHealth,
    telemetryHistory
  } = useSimulation();

  // Mock Long-Term SOH Degradation Data (Cycle 0 to 400)
  const sohTrendData = [
    { cycle: '0', soh: 100 },
    { cycle: '50', soh: 99.2 },
    { cycle: '100', soh: 98.4 },
    { cycle: '150', soh: 97.5 },
    { cycle: '200', soh: 96.8 },
    { cycle: '250', soh: 96.0 },
    { cycle: '300', soh: 95.1 },
    { cycle: '350', soh: 94.4 },
    { cycle: '382 (Now)', soh: 94.0 },
  ];

  // Energy Consumption Per Trip Data
  const tripConsumptionData = [
    { trip: 'Trip 1', consumption: 15.2, distance: 42 },
    { trip: 'Trip 2', consumption: 16.4, distance: 68 },
    { trip: 'Trip 3', consumption: 14.8, distance: 35 },
    { trip: 'Trip 4', consumption: 17.1, distance: 92 },
    { trip: 'Trip 5 (Current)', consumption: 15.8, distance: 54 },
  ];

  // SOC History (Past 6 hours)
  const socHistoryData = [
    { time: '16:00', soc: 96 },
    { time: '17:00', soc: 92 },
    { time: '18:00', soc: 89 },
    { time: '19:00', soc: 86 },
    { time: '20:00', soc: 82 },
    { time: '21:00', soc: 80 },
    { time: '22:00', soc: Math.round(battery.soc) },
  ];

  return (
    <div className="space-y-6">
      {/* Page Title & Overview */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            Core Module 02
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-xs font-mono text-slate-400">ELECTROCHEMICAL STATE ESTIMATION</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-1">
          EV Battery Management & Analytics
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Comprehensive battery intelligence covering SOC, SOH, voltage, current, temperature and
          energy consumption.
        </p>
      </div>

      {/* MAIN BATTERY CARD & CIRCULAR VISUALIZATION */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0d1629] via-[#091224] to-[#0d1629] border border-cyan-500/30 p-6 md:p-8 shadow-[0_0_35px_-5px_rgba(0,242,254,0.2)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Circular Battery Dial (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-800/80 pb-6 lg:pb-0 lg:pr-6">
            <LiveGauge
              value={battery.soc}
              max={100}
              size={240}
              strokeWidth={16}
              label="STATE OF CHARGE"
              unit="%"
              color={battery.soc > 20 ? 'cyan' : 'amber'}
              secondaryText={`${estimatedRangeKm} km Estimated Range`}
            />

            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">CHARGING STATE:</span>
              <StatusBadge
                status={battery.chargingState}
                variant={battery.chargingState === 'Charging' ? 'green' : 'cyan'}
                pulse={battery.chargingState === 'Charging'}
                size="sm"
              />
            </div>
          </div>

          {/* Main Key Battery Stats (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold">LITHIUM-ION PACK TELEMETRY</span>
                <h3 className="text-xl font-bold text-white mt-0.5">75 kWh High-Energy Battery Pack</h3>
              </div>

              {/* Dynamic Health Indicator Badge */}
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700">
                <span className="text-[10px] font-mono text-slate-400">HEALTH:</span>
                <StatusBadge
                  status={batteryHealth.label}
                  variant={batteryHealth.color}
                  pulse={batteryHealth.color === 'red' || batteryHealth.color === 'amber'}
                  size="xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase">STATE OF CHARGE</span>
                <div className="text-2xl font-black font-mono text-cyan-400 mt-1">{Math.round(battery.soc)}%</div>
                <span className="text-[10px] text-slate-400">Nominal 3.98V/cell</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase">STATE OF HEALTH</span>
                <div className="text-2xl font-black font-mono text-emerald-400 mt-1">{battery.soh}%</div>
                <span className="text-[10px] text-slate-400">Cycle 382 / 1500</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase">ESTIMATED RANGE</span>
                <div className="text-2xl font-black font-mono text-white mt-1">{estimatedRangeKm} km</div>
                <span className="text-[10px] text-slate-400">WLTP Calibrated</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase">PACK VOLTAGE</span>
                <div className="text-2xl font-black font-mono text-white mt-1">{battery.voltage} V</div>
                <span className="text-[10px] text-slate-400">Delta: ±0.06 V</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase">PACK CURRENT</span>
                <div className="text-2xl font-black font-mono text-white mt-1">{battery.current} A</div>
                <span className="text-[10px] text-slate-400">{battery.chargingState}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-400 uppercase">TEMPERATURE</span>
                <div className="text-2xl font-black font-mono text-emerald-400 mt-1">{battery.temperature}°C</div>
                <span className="text-[10px] text-slate-400">Cooling Nominal</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PARAMETER CARDS (SIX DETAILED CARDS) */}
      <div>
        <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-3">
          Six Critical Battery Parameters
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <MetricCard
            title="1. SOC"
            value={`${Math.round(battery.soc)}%`}
            subtitle="State of Charge"
            icon={Battery}
            accentColor="cyan"
          />
          <MetricCard
            title="2. SOH"
            value={`${battery.soh}%`}
            subtitle="State of Health"
            icon={ShieldCheck}
            accentColor="green"
          />
          <MetricCard
            title="3. Voltage"
            value={battery.voltage}
            unit="V"
            subtitle="System Bus"
            icon={Zap}
            accentColor="blue"
          />
          <MetricCard
            title="4. Current"
            value={battery.current}
            unit="A"
            subtitle="Discharge rate"
            icon={Activity}
            accentColor="amber"
          />
          <MetricCard
            title="5. Temp"
            value={battery.temperature}
            unit="°C"
            subtitle="Core Pack"
            icon={Thermometer}
            accentColor="green"
          />
          <MetricCard
            title="6. Energy"
            value={battery.energyConsumption}
            unit="kWh/100km"
            subtitle="Avg. Efficiency"
            icon={Flame}
            accentColor="cyan"
          />
        </div>
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SOC History Chart (6 Cols) */}
        <div className="lg:col-span-6">
          <GlassCard
            title="State of Charge (SOC) History"
            subtitle="Discharge progression over the last 6 hours"
            icon={BatteryCharging}
          >
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={socHistoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} domain={[0, 100]} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0b1324',
                      borderColor: '#1e293b',
                      borderRadius: '0.75rem',
                      fontSize: '11px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="soc"
                    name="SOC (%)"
                    stroke="#00f2fe"
                    strokeWidth={3}
                    dot={{ fill: '#00f2fe', r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Long-Term SOH Trend (Degradation Graph) (6 Cols) */}
        <div className="lg:col-span-6">
          <GlassCard
            title="State of Health (SOH) Degradation Trend"
            subtitle="Capacity retention across charge cycles"
            icon={ShieldCheck}
          >
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sohTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="cycle" stroke="#64748b" fontSize={10} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} domain={[85, 100]} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0b1324',
                      borderColor: '#1e293b',
                      borderRadius: '0.75rem',
                      fontSize: '11px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="soh"
                    name="SOH (%)"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    dot={{ fill: '#10b981', r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Voltage & Current Combined Graph (7 Cols) */}
        <div className="lg:col-span-7">
          <GlassCard
            title="Voltage & Current Real-Time Correlation"
            subtitle="Dual-axis electrical dynamics under active load"
            icon={Zap}
          >
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={telemetryHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} />
                  <YAxis yAxisId="left" stroke="#38bdf8" fontSize={10} domain={[380, 420]} tickLine={false} />
                  <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" fontSize={10} domain={[20, 60]} tickLine={false} />
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
                    yAxisId="left"
                    type="monotone"
                    dataKey="voltage"
                    name="Voltage (V)"
                    stroke="#38bdf8"
                    strokeWidth={2.5}
                    dot={false}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="current"
                    name="Current (A)"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Temperature Variation Chart (5 Cols) */}
        <div className="lg:col-span-5">
          <GlassCard
            title="Thermal Variation Profile"
            subtitle="Core cell temperature with safety limit"
            icon={Thermometer}
          >
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={telemetryHistory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={10} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} domain={[25, 45]} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0b1324',
                      borderColor: '#1e293b',
                      borderRadius: '0.75rem',
                      fontSize: '11px'
                    }}
                  />
                  <ReferenceLine y={40} label={{ value: 'Warning 40°C', fill: '#f59e0b', fontSize: 10 }} stroke="#f59e0b" strokeDasharray="3 3" />
                  <Line
                    type="monotone"
                    dataKey="temperature"
                    name="Cell Temp (°C)"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Energy Consumption per Trip (12 Cols) */}
        <div className="lg:col-span-12">
          <GlassCard
            title="Energy Consumption per Trip"
            subtitle="Efficiency benchmarks across previous autonomous drive sessions"
            icon={Activity}
          >
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tripConsumptionData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="trip" stroke="#64748b" fontSize={11} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={10} domain={[0, 25]} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0b1324',
                      borderColor: '#1e293b',
                      borderRadius: '0.75rem',
                      fontSize: '11px'
                    }}
                  />
                  <Bar
                    dataKey="consumption"
                    name="Consumption (kWh/100km)"
                    fill="#00f2fe"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* BATTERY INSIGHTS & ANOMALY DETECTION */}
      <GlassCard
        title="Battery Insights & Anomaly Analysis"
        subtitle="Automated diagnostics generated by Extended Kalman Filter & thermal models"
        icon={Info}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Thermal Stability</span>
            </div>
            <p className="text-xs text-slate-300">
              Battery temperature is within normal range ({battery.temperature}°C). Active cooling loop maintains cell gradient &lt; 1.2°C.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Range Sufficiency</span>
            </div>
            <p className="text-xs text-slate-300">
              Current SOC ({Math.round(battery.soc)}%) supports estimated trip distance (~{estimatedRangeKm} km) without degradation stress.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Thermal Anomaly Scan</span>
            </div>
            <p className="text-xs text-slate-300">
              No thermal anomaly detected across all 4 battery modules. Internal resistance growth is under 0.02% per 100 cycles.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-1">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
              <CheckCircle2 className="w-4 h-4" />
              <span>Health Projection</span>
            </div>
            <p className="text-xs text-slate-300">
              Battery health remains stable at {battery.soh}% SOH. Anticipated pack lifespan exceeds 1,500 full equivalent cycles.
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
export default BatteryAnalytics;
