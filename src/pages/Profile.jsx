import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSimulation } from '../context/SimulationContext';
import {
  User,
  Car,
  Battery,
  ShieldCheck,
  Mail,
  Key,
  LogOut,
  Radio,
  Clock,
  Sparkles,
  Zap,
  CheckCircle2,
  HardDrive,
  Edit3,
  Save,
  X,
  Sliders,
  Cpu,
  Layers,
  Activity
} from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import StatusBadge from '../components/common/StatusBadge';
import LiveGauge from '../components/common/LiveGauge';

export const Profile = () => {
  const { user, logout } = useAuth();
  const { battery, vehicle, estimatedRangeKm, updateVehicleInfo } = useSimulation();
  const navigate = useNavigate();

  // Edit vehicle modal state
  const [isEditingVehicle, setIsEditingVehicle] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form fields initialized from current vehicle
  const [vehicleForm, setVehicleForm] = useState({
    name: vehicle.name || user?.vehicle || 'Autonomous EV-01',
    type: vehicle.type || user?.vehicleType || 'Autonomous Electric SUV',
    model: vehicle.model || user?.vehicleModel || 'CyberCruiser L4 Pro',
    batteryCapacity: user?.batteryCapacity || `${vehicle.batteryCapacityKWh || 75} kWh`,
    vin: vehicle.vin || user?.vin || 'EV-992-AUTONOMOUS-X',
    plate: vehicle.plate || user?.plate || 'KA-01-EV-2026',
    driveConfig: vehicle.driveConfig || user?.driveConfig || 'Dual-Motor AWD (320 kW)',
    firmware: vehicle.firmware || user?.firmware || 'v4.8.2-auto'
  });

  const handleOpenEdit = () => {
    setVehicleForm({
      name: vehicle.name || user?.vehicle || 'Autonomous EV-01',
      type: vehicle.type || user?.vehicleType || 'Autonomous Electric SUV',
      model: vehicle.model || user?.vehicleModel || 'CyberCruiser L4 Pro',
      batteryCapacity: user?.batteryCapacity || `${vehicle.batteryCapacityKWh || 75} kWh`,
      vin: vehicle.vin || user?.vin || 'EV-992-AUTONOMOUS-X',
      plate: vehicle.plate || user?.plate || 'KA-01-EV-2026',
      driveConfig: vehicle.driveConfig || user?.driveConfig || 'Dual-Motor AWD (320 kW)',
      firmware: vehicle.firmware || user?.firmware || 'v4.8.2-auto'
    });
    setIsEditingVehicle(true);
  };

  const handleSaveVehicle = (e) => {
    e.preventDefault();
    updateVehicleInfo({
      name: vehicleForm.name,
      type: vehicleForm.type,
      model: vehicleForm.model,
      batteryCapacity: vehicleForm.batteryCapacity,
      vin: vehicleForm.vin,
      plate: vehicleForm.plate,
      driveConfig: vehicleForm.driveConfig,
      firmware: vehicleForm.firmware
    });

    setIsEditingVehicle(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 4000);
  };

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
              Identity & Vehicle Node
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs font-mono text-slate-400">VEHICLE ASSIGNMENT & CONFIGURATION</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-1">
            Platform Profile & Vehicle Specifications
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Review and update authenticated driver credentials, vehicle specifications, and live battery telemetry.
          </p>
        </div>

        <button
          onClick={handleOpenEdit}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(0,242,254,0.35)] transition-all flex items-center gap-2 font-mono"
        >
          <Edit3 className="w-4 h-4" />
          <span>Edit Vehicle Details</span>
        </button>
      </div>

      {/* Success Notification Banner */}
      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <div>
            <span className="font-bold text-sm block">Vehicle Info Updated Successfully!</span>
            <span className="text-emerald-300/80 text-[11px] block mt-0.5">
              Updated vehicle name, type, and specifications have been synchronized across all telemetry modules and persisted.
            </span>
          </div>
        </div>
      )}

      {/* EDIT VEHICLE MODAL / FORM */}
      {isEditingVehicle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl bg-[#0b1324] border border-cyan-500/40 p-6 md:p-8 shadow-[0_0_50px_rgba(0,242,254,0.3)] animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight">Update Vehicle Information</h3>
                  <p className="text-xs text-slate-400">Configure vehicle identification, type, and powertrain hardware</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditingVehicle(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveVehicle} className="mt-5 space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 mb-1.5">
                    VEHICLE NAME
                  </label>
                  <input
                    type="text"
                    value={vehicleForm.name}
                    onChange={(e) => setVehicleForm({ ...vehicleForm, name: e.target.value })}
                    placeholder="e.g. Autonomous EV-01"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-300 mb-1.5">
                    VEHICLE TYPE / CLASS
                  </label>
                  <select
                    value={vehicleForm.type}
                    onChange={(e) => setVehicleForm({ ...vehicleForm, type: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-500"
                  >
                    <option value="Autonomous Electric SUV">Autonomous Electric SUV</option>
                    <option value="Autonomous Cyber Sedan">Autonomous Cyber Sedan</option>
                    <option value="Autonomous Performance Coupe">Autonomous Performance Coupe</option>
                    <option value="Autonomous Commercial Van">Autonomous Commercial Van</option>
                    <option value="Autonomous Heavy Hauler">Autonomous Heavy Hauler</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 mb-1.5">
                    VEHICLE MODEL
                  </label>
                  <input
                    type="text"
                    value={vehicleForm.model}
                    onChange={(e) => setVehicleForm({ ...vehicleForm, model: e.target.value })}
                    placeholder="e.g. CyberCruiser L4 Pro"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-300 mb-1.5">
                    BATTERY CAPACITY
                  </label>
                  <select
                    value={vehicleForm.batteryCapacity}
                    onChange={(e) => setVehicleForm({ ...vehicleForm, batteryCapacity: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-500"
                  >
                    <option value="60 kWh">60 kWh (Standard Range)</option>
                    <option value="75 kWh">75 kWh (High Energy LFP)</option>
                    <option value="85 kWh">85 kWh (Long Range NMC)</option>
                    <option value="100 kWh">100 kWh (Performance Extended)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-mono text-slate-300 mb-1.5">
                    DRIVE CONFIGURATION
                  </label>
                  <select
                    value={vehicleForm.driveConfig}
                    onChange={(e) => setVehicleForm({ ...vehicleForm, driveConfig: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-500 text-[11px]"
                  >
                    <option value="Dual-Motor AWD (320 kW)">Dual-Motor AWD (320 kW)</option>
                    <option value="Single-Motor RWD (210 kW)">Single-Motor RWD (210 kW)</option>
                    <option value="Tri-Motor Plaid (580 kW)">Tri-Motor Plaid (580 kW)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-300 mb-1.5">
                    REGISTRATION / LICENSE PLATE
                  </label>
                  <input
                    type="text"
                    value={vehicleForm.plate}
                    onChange={(e) => setVehicleForm({ ...vehicleForm, plate: e.target.value })}
                    placeholder="KA-01-EV-2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-300 mb-1.5">
                    VIN IDENTIFICATION
                  </label>
                  <input
                    type="text"
                    value={vehicleForm.vin}
                    onChange={(e) => setVehicleForm({ ...vehicleForm, vin: e.target.value })}
                    placeholder="EV-992-AUTONOMOUS-X"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-slate-300 mb-1.5">
                  FIRMWARE TELEMATICS VERSION
                </label>
                <input
                  type="text"
                  value={vehicleForm.firmware}
                  onChange={(e) => setVehicleForm({ ...vehicleForm, firmware: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white outline-none focus:border-cyan-500 font-mono"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEditingVehicle(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(0,242,254,0.4)] flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save & Sync Vehicle</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MAIN TWO-COLUMN DASHBOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Driver Credentials & Account Status (4 Cols) */}
        <div className="lg:col-span-4 space-y-6">
          <GlassCard
            title="User Credentials"
            subtitle="Platform operator & supervisor node"
            icon={User}
          >
            <div className="flex items-center gap-4 pb-5 border-b border-slate-800">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-black text-black font-mono shadow-[0_0_20px_rgba(0,242,254,0.4)]">
                {user?.name ? user.name[0] : 'S'}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">{user?.name || 'Sathvik'}</h3>
                <p className="text-xs text-slate-400">{user?.role || 'EV Platform User'}</p>
                <div className="mt-2 flex items-center gap-2">
                  <StatusBadge status="ACTIVE SUPERVISOR" variant="green" size="xs" />
                </div>
              </div>
            </div>

            <div className="py-4 space-y-2.5 text-xs font-mono">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">OPERATOR NAME:</span>
                <span className="text-white font-bold">{user?.name || 'Sathvik'}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">EMAIL:</span>
                <span className="text-cyan-400">{user?.email || 'demo@evplatform.com'}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">ASSIGNED ROLE:</span>
                <span className="text-white font-bold">{user?.role || 'EV Platform User'}</span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400">ACCOUNT STATUS:</span>
                <span className="text-emerald-400 font-bold">Active / Authorized</span>
              </div>
            </div>

            {/* Logout Action */}
            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={handleLogout}
                className="w-full py-2.5 rounded-xl text-xs font-bold bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-all flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout Session</span>
              </button>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Complete Vehicle Specifications & Live Battery State (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <GlassCard
            title="Assigned Vehicle Specifications"
            subtitle="Full vehicle identity, model, type, and powertrain telemetry"
            icon={Car}
            action={
              <button
                onClick={handleOpenEdit}
                className="text-xs font-mono font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Info</span>
              </button>
            }
          >
            {/* Top Vehicle Identity Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0e1932] via-[#0b1429] to-[#0e1932] border border-cyan-500/30 mb-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                      {vehicle.type || user?.vehicleType || 'Autonomous Electric SUV'}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      SYSTEM ONLINE
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-white tracking-tight">
                    {vehicle.name || user?.vehicle || 'Autonomous EV-01'}
                  </h2>
                  <p className="text-xs text-slate-300">
                    Model: <strong className="text-white">{vehicle.model || user?.vehicleModel || 'CyberCruiser L4 Pro'}</strong> • {vehicle.driveConfig || 'Dual-Motor AWD (320 kW)'}
                  </p>
                </div>

                <div className="flex flex-col items-start sm:items-end font-mono text-xs">
                  <span className="text-slate-400">LICENSE PLATE:</span>
                  <span className="text-base font-bold text-cyan-400 bg-slate-950 px-3 py-1 rounded-xl border border-slate-800">
                    {vehicle.plate || user?.plate || 'KA-01-EV-2026'}
                  </span>
                </div>
              </div>
            </div>

            {/* Comprehensive Specifications Table / Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">VEHICLE NAME</span>
                <span className="text-xs font-bold font-mono text-white truncate block mt-0.5">
                  {vehicle.name}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">VEHICLE TYPE</span>
                <span className="text-xs font-bold font-mono text-cyan-400 truncate block mt-0.5">
                  {vehicle.type || 'Electric SUV'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">VEHICLE MODEL</span>
                <span className="text-xs font-bold font-mono text-white truncate block mt-0.5">
                  {vehicle.model || 'L4 Pro'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">BATTERY PACK</span>
                <span className="text-xs font-bold font-mono text-emerald-400 truncate block mt-0.5">
                  {vehicle.batteryCapacityKWh || 75} kWh
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">VIN NUMBER</span>
                <span className="text-xs font-bold font-mono text-slate-300 truncate block mt-0.5">
                  {vehicle.vin || 'EV-992-AUTONOMOUS-X'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">POWERTRAIN DRIVE</span>
                <span className="text-xs font-bold font-mono text-white truncate block mt-0.5">
                  {vehicle.driveConfig || 'AWD (320 kW)'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">AUTONOMY LEVEL</span>
                <span className="text-xs font-bold font-mono text-cyan-400 truncate block mt-0.5">
                  Level 4 Redundant
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[10px] font-mono text-slate-500 uppercase block">FIRMWARE OS</span>
                <span className="text-xs font-bold font-mono text-emerald-400 truncate block mt-0.5">
                  {vehicle.firmware || 'v4.8.2-auto'}
                </span>
              </div>
            </div>

            {/* Live Linked Battery & Telemetry View */}
            <div className="pt-4 border-t border-slate-800/80">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Live Telemetry Linked to Vehicle
                </h4>
                <span className="text-[10px] font-mono text-cyan-400">SYNCED 100Hz</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-5 flex flex-col items-center">
                  <LiveGauge
                    value={battery.soc}
                    max={100}
                    size={180}
                    strokeWidth={14}
                    label="LIVE BATTERY SOC"
                    unit="%"
                    color="cyan"
                    secondaryText={`${estimatedRangeKm} km Range`}
                  />
                </div>

                <div className="sm:col-span-7 space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                    <div className="flex items-center justify-between text-slate-400 mb-1">
                      <span>PACK SOC LEVEL:</span>
                      <span className="text-cyan-400 font-bold">{Math.round(battery.soc)}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 rounded-full" style={{ width: `${battery.soc}%` }} />
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                    <div className="flex items-center justify-between text-slate-400 mb-1">
                      <span>BATTERY HEALTH (SOH):</span>
                      <span className="text-emerald-400 font-bold">{battery.soh}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${battery.soh}%` }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-400">BUS VOLTAGE:</span>
                      <span className="text-white font-bold">{battery.voltage} V</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-400">CORE TEMP:</span>
                      <span className="text-emerald-400 font-bold">{battery.temperature}°C</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
export default Profile;
