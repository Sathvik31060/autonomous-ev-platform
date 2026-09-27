import React, { useState } from 'react';
import { useSimulation } from '../context/SimulationContext';
import {
  Zap,
  MapPin,
  Clock,
  Calendar,
  Filter,
  CheckCircle2,
  AlertCircle,
  Play,
  Square,
  ArrowRight,
  BatteryCharging,
  DollarSign,
  Layers,
  Sparkles,
  Search
} from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import MetricCard from '../components/common/MetricCard';
import StatusBadge from '../components/common/StatusBadge';
import StationMap from '../components/maps/StationMap';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

export const SmartCharging = () => {
  const {
    battery,
    chargingStations,
    chargingHistory,
    activeCharging,
    startCharging,
    stopCharging
  } = useSimulation();

  // Filters state
  const [filterPower, setFilterPower] = useState('all'); // 'all' | '150+' | '50'
  const [filterType, setFilterType] = useState('all'); // 'all' | 'CCS2' | 'Type 2'
  const [filterAvailability, setFilterAvailability] = useState('all'); // 'all' | 'Available'
  const [selectedStation, setSelectedStation] = useState(chargingStations[0]);

  // Slot Booking Form State
  const [bookingForm, setBookingForm] = useState({
    stationId: chargingStations[0]?.id || '',
    date: '2026-09-25',
    time: '14:30',
    connector: 'CCS2 High Power',
    duration: '30 min'
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Filtered station list
  const filteredStations = chargingStations.filter(st => {
    if (filterPower === '150+' && st.powerKW < 150) return false;
    if (filterPower === '50' && st.powerKW > 50) return false;
    if (filterType !== 'all' && !st.type.toLowerCase().includes(filterType.toLowerCase())) return false;
    if (filterAvailability === 'Available' && st.status !== 'Available') return false;
    return true;
  });

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
    }, 5000);
  };

  // Recharts Simulated Charging Curve (Power vs SOC)
  const chargingCurveData = [
    { soc: 10, power: 150 },
    { soc: 20, power: 150 },
    { soc: 40, power: 148 },
    { soc: 50, power: 145 },
    { soc: 60, power: 130 },
    { soc: 70, power: 105 },
    { soc: 80, power: 75 },
    { soc: 90, power: 35 },
    { soc: 100, power: 12 },
  ];

  // Summary stats calculated from history
  const totalSessions = chargingHistory.length;
  const totalEnergy = "144.0 kWh";
  const totalCost = "$42.91";
  const avgDuration = "24.7 min";

  return (
    <div className="space-y-6">
      {/* Top Page Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            Core Module 03
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-xs font-mono text-slate-400">INFRASTRUCTURE & ENERGY DISPATCH</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-1">
          Smart Charging System
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          From discovery to completion, manage the complete EV charging lifecycle using real-time
          station and vehicle data.
        </p>
      </div>

      {/* SECTION 1: FIND STATIONS (MAP + FILTERS + STATIONS LIST) */}
      <GlassCard
        title="1. Find Charging Stations"
        subtitle="Interactive metropolitan grid locator with real-time connector telemetry"
        icon={MapPin}
      >
        {/* Filter Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-mono flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-cyan-400" /> Filters:
            </span>

            {/* Power filter */}
            <select
              value={filterPower}
              onChange={(e) => setFilterPower(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white outline-none focus:border-cyan-500"
            >
              <option value="all">Power: All Ratings</option>
              <option value="150+">150 kW+ Ultra-Fast</option>
              <option value="50">50 kW Standard</option>
            </select>

            {/* Connector type filter */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white outline-none focus:border-cyan-500"
            >
              <option value="all">Connector: All Types</option>
              <option value="CCS2">CCS2 Combo</option>
              <option value="Type 2">Type 2 AC</option>
            </select>

            {/* Availability filter */}
            <select
              value={filterAvailability}
              onChange={(e) => setFilterAvailability(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white outline-none focus:border-cyan-500"
            >
              <option value="all">Availability: All</option>
              <option value="Available">Available Only</option>
            </select>
          </div>

          <div className="text-xs font-mono text-cyan-400">
            {filteredStations.length} of {chargingStations.length} Stations Matching
          </div>
        </div>

        {/* Map & List Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Station Map Visualization (7 Cols) */}
          <div className="lg:col-span-7">
            <StationMap
              stations={filteredStations}
              selectedStation={selectedStation}
              onSelectStation={(st) => setSelectedStation(st)}
            />
          </div>

          {/* Station Cards Column (5 Cols) */}
          <div className="lg:col-span-5 space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {filteredStations.map((station) => {
              const isSelected = selectedStation?.id === station.id;
              const isAvailable = station.status === 'Available';

              return (
                <div
                  key={station.id}
                  onClick={() => setSelectedStation(station)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900/90 border-cyan-500 shadow-[0_0_15px_-3px_rgba(0,242,254,0.3)]'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white tracking-tight">
                        {station.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                        <span>{station.location} ({station.distanceKm} km away)</span>
                      </p>
                    </div>

                    <StatusBadge
                      status={station.status}
                      variant={isAvailable ? 'green' : 'slate'}
                      size="xs"
                    />
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2 text-[11px] font-mono pt-2 border-t border-slate-800/80">
                    <div>
                      <span className="text-slate-500 block text-[9px]">POWER</span>
                      <span className="text-cyan-400 font-bold">{station.powerKW} kW</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px]">CONNECTOR</span>
                      <span className="text-slate-300 truncate">{station.type}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px]">PRICE / RATE</span>
                      <span className="text-emerald-400">${station.pricePerKWh}/kWh</span>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs pt-1">
                    <span className="text-slate-400 text-[10px]">
                      Plugs Free: <strong className="text-white">{station.availablePlugs}/{station.totalPlugs}</strong> • Est: {station.estimatedTimeTo80}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStation(station);
                        setBookingForm(prev => ({ ...prev, stationId: station.id }));
                      }}
                      className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 text-xs font-bold font-mono transition-colors"
                    >
                      Select
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </GlassCard>

      {/* SECTION 2 & SECTION 3: SLOT BOOKING & LIVE CHARGING STATUS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SECTION 2: SLOT BOOKING (5 Cols) */}
        <div className="lg:col-span-5">
          <GlassCard
            title="2. Slot Booking"
            subtitle="Reserve guaranteed charging capacity to eliminate queue latency"
            icon={Calendar}
          >
            {bookingSuccess && (
              <div className="mb-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 flex items-start gap-2.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Slot Reserved Successfully</span>
                  <span className="text-emerald-300/80 text-[11px] block mt-0.5">
                    Reservation confirmed for {selectedStation?.name || 'Selected Station'} at {bookingForm.time}.
                  </span>
                </div>
              </div>
            )}

            <form onSubmit={handleBookingSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-mono mb-1 text-[11px]">
                  CHARGING STATION
                </label>
                <select
                  value={bookingForm.stationId}
                  onChange={(e) => setBookingForm({ ...bookingForm, stationId: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500 font-sans"
                >
                  {chargingStations.map(st => (
                    <option key={st.id} value={st.id}>
                      {st.name} ({st.powerKW} kW) - {st.distanceKm} km
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-mono mb-1 text-[11px]">DATE</label>
                  <input
                    type="date"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-mono mb-1 text-[11px]">TIME</label>
                  <input
                    type="time"
                    value={bookingForm.time}
                    onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500 font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-mono mb-1 text-[11px]">CONNECTOR</label>
                  <select
                    value={bookingForm.connector}
                    onChange={(e) => setBookingForm({ ...bookingForm, connector: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500 font-sans"
                  >
                    <option value="CCS2 High Power">CCS2 High Power (150-350kW)</option>
                    <option value="Type 2 Mennekes">Type 2 AC (22kW)</option>
                    <option value="CHAdeMO">CHAdeMO DC Fast</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-mono mb-1 text-[11px]">DURATION</label>
                  <select
                    value={bookingForm.duration}
                    onChange={(e) => setBookingForm({ ...bookingForm, duration: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white outline-none focus:border-cyan-500 font-sans"
                  >
                    <option value="15 min">15 minutes (Fast Boost)</option>
                    <option value="30 min">30 minutes (Standard 80%)</option>
                    <option value="45 min">45 minutes (Full 100%)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl font-bold text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Reserve Slot</span>
                </button>
              </div>
            </form>
          </GlassCard>
        </div>

        {/* SECTION 3: LIVE CHARGING STATUS (7 Cols) */}
        <div className="lg:col-span-7">
          <GlassCard
            title="3. Live Charging Status"
            subtitle="Real-time DC Fast Charging session parameters & BMS progression"
            icon={Zap}
            action={
              activeCharging.isActive ? (
                <button
                  onClick={stopCharging}
                  className="px-3 py-1.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-400 hover:bg-rose-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors"
                >
                  <Square className="w-3.5 h-3.5 fill-rose-400" />
                  <span>Stop Charge</span>
                </button>
              ) : (
                <button
                  onClick={() => startCharging(selectedStation?.name, selectedStation?.powerKW || 150)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/30 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
                  <Play className="w-3.5 h-3.5 fill-emerald-400" />
                  <span>Simulate Fast Charge</span>
                </button>
              )
            }
          >
            {/* Live Progress Bar: SOC 42% -> 80% */}
            <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-slate-400">
                  SESSION PROGRESS: {activeCharging.stationName}
                </span>
                <span className="font-mono font-bold text-cyan-400">
                  {Math.round(battery.soc)}% → {activeCharging.targetSoc}% TARGET
                </span>
              </div>

              {/* Progress track */}
              <div className="relative h-4 w-full bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 rounded-full transition-all duration-500 relative"
                  style={{ width: `${Math.min(100, (battery.soc / activeCharging.targetSoc) * 100)}%` }}
                >
                  {activeCharging.isActive && (
                    <span className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full animate-ping opacity-75" />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>START: 42%</span>
                <span className="text-emerald-400">
                  {activeCharging.isActive ? 'Actively Charging (+150 kW)' : 'Standby / Ready to connect'}
                </span>
                <span>TARGET: {activeCharging.targetSoc}%</span>
              </div>
            </div>

            {/* Live Telemetry Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500">CURRENT SOC</span>
                <div className="text-lg font-black font-mono text-cyan-400 mt-0.5">
                  {Math.round(battery.soc)}%
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500">TARGET SOC</span>
                <div className="text-lg font-black font-mono text-white mt-0.5">
                  {activeCharging.targetSoc}%
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500">VOLTAGE / CURRENT</span>
                <div className="text-lg font-black font-mono text-white mt-0.5">
                  {battery.voltage}V / {activeCharging.isActive ? '185A' : '0A'}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500">ENERGY DELIVERED</span>
                <div className="text-lg font-black font-mono text-emerald-400 mt-0.5">
                  {activeCharging.energyDeliveredKWh.toFixed(1)} kWh
                </div>
              </div>
            </div>

            {/* Charging Curve Recharts Display */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                <span>DC FAST CHARGE TAPERING PROFILE (POWER vs SOC)</span>
                <span className="text-cyan-400">CC-CV REGIME</span>
              </div>
              <div className="h-36 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chargingCurveData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                    <defs>
                      <linearGradient id="chargeGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00f2fe" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#00f2fe" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="soc" stroke="#64748b" fontSize={10} unit="%" />
                    <YAxis stroke="#64748b" fontSize={10} unit="kW" domain={[0, 160]} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0b1324',
                        borderColor: '#1e293b',
                        borderRadius: '0.75rem',
                        fontSize: '11px'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="power"
                      name="Power (kW)"
                      stroke="#00f2fe"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#chargeGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* SECTION 4: CHARGING HISTORY & SUMMARY CARDS */}
      <GlassCard
        title="4. Charging History & Ledger"
        subtitle="Historical charging events, energy dispensed, and financial audit"
        icon={Clock}
      >
        {/* Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Total Sessions"
            value={totalSessions}
            subtitle="Completed sessions"
            icon={Zap}
            accentColor="cyan"
          />
          <MetricCard
            title="Total Energy"
            value={totalEnergy}
            subtitle="Grid delivered"
            icon={BatteryCharging}
            accentColor="green"
          />
          <MetricCard
            title="Total Charging Cost"
            value={totalCost}
            subtitle="Avg $0.29/kWh"
            icon={DollarSign}
            accentColor="amber"
          />
          <MetricCard
            title="Avg Charging Time"
            value={avgDuration}
            subtitle="High-power DC"
            icon={Clock}
            accentColor="blue"
          />
        </div>

        {/* History Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-[#09101d] text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
              <tr>
                <th className="p-3.5">DATE & TIME</th>
                <th className="p-3.5">STATION</th>
                <th className="p-3.5">DURATION</th>
                <th className="p-3.5">ENERGY DELIVERED</th>
                <th className="p-3.5">COST</th>
                <th className="p-3.5">STARTING SOC</th>
                <th className="p-3.5">ENDING SOC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono">
              {chargingHistory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="p-3.5 text-slate-300 whitespace-nowrap">{item.date}</td>
                  <td className="p-3.5 text-white font-bold">{item.station}</td>
                  <td className="p-3.5 text-slate-400">{item.duration}</td>
                  <td className="p-3.5 text-cyan-400 font-bold">{item.energyDelivered}</td>
                  <td className="p-3.5 text-emerald-400">{item.cost}</td>
                  <td className="p-3.5 text-slate-400">{item.startSoc}%</td>
                  <td className="p-3.5 text-emerald-400 font-bold">{item.endSoc}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};
export default SmartCharging;
