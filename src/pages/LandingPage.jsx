import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Car,
  Cpu,
  BatteryCharging,
  Zap,
  Navigation,
  ArrowRight,
  Shield,
  Activity,
  Layers,
  Sparkles,
  ChevronRight,
  Gauge,
  Radio,
  Clock,
  Compass,
  CheckCircle2,
  Lock
} from 'lucide-react';
import StatusBadge from '../components/common/StatusBadge';

export const LandingPage = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLaunchDashboard = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/signin');
    }
  };

  const scrollToModules = () => {
    const el = document.getElementById('core-modules');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const modules = [
    {
      id: 'av',
      title: 'AV Dashboard',
      subtitle: 'Perception & Control',
      description: 'Real-time mode switching, sensor fusion, vehicle telemetry and obstacle detection.',
      icon: Cpu,
      accent: 'cyan',
      route: '/av-dashboard',
      stats: '100Hz Sensor Fusion • Sub-20ms Latency'
    },
    {
      id: 'bms',
      title: 'Battery Analytics',
      subtitle: 'Electrochemical State',
      description: 'SOC, SOH, voltage, current, thermal monitoring and energy analytics.',
      icon: BatteryCharging,
      accent: 'green',
      route: '/battery',
      stats: 'Extended Kalman Filter • ±1.5% SOC Accuracy'
    },
    {
      id: 'charging',
      title: 'Smart Charging',
      subtitle: 'Infrastructure & Scheduling',
      description: 'Charging station discovery, slot booking, live charging status and charging history.',
      icon: Zap,
      accent: 'blue',
      route: '/charging',
      stats: '350kW MegaWatt Charging • Grid Load Balancing'
    },
    {
      id: 'trip',
      title: 'EV Trip Planner',
      subtitle: 'Trajectory Optimization',
      description: 'Battery-aware route optimization with proactive charging recommendations.',
      icon: Navigation,
      accent: 'purple',
      route: '/trip-planner',
      stats: 'Topological Energy Depletion Modeling'
    }
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Landing Navbar */}
      <nav className="sticky top-0 z-50 h-20 bg-[#070b14]/85 backdrop-blur-xl border-b border-slate-800/80 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-black shadow-[0_0_20px_rgba(0,242,254,0.4)]">
            <Car className="w-6 h-6" />
          </div>
          <div>
            <span className="font-extrabold text-base md:text-lg tracking-tight text-white flex items-center gap-1.5">
              AUTONOMOUS EV PLATFORM
            </span>
            <span className="text-[10px] font-mono text-cyan-400 block tracking-wider uppercase">
              B.Tech Capstone Project
            </span>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
          <button onClick={scrollToModules} className="hover:text-cyan-400 transition-colors">
            Core Modules
          </button>
          <a href="#built-for-mobility" className="hover:text-cyan-400 transition-colors">
            Platform Vision
          </a>
          <a href="#platform-statistics" className="hover:text-cyan-400 transition-colors">
            Architecture Stats
          </a>
          <Link to="/literature" className="hover:text-cyan-400 transition-colors">
            Literature Survey
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-cyan-400 hidden sm:inline">
                {user?.name || 'Sathvik'}
              </span>
              <button
                onClick={() => navigate('/dashboard')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/20 transition-all flex items-center gap-1.5"
              >
                <span>Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/signin"
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800/80 transition-all"
              >
                Sign In
              </Link>
              <button
                onClick={handleLaunchDashboard}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-black hover:from-cyan-400 hover:to-blue-500 shadow-[0_0_20px_rgba(0,242,254,0.4)] transition-all flex items-center gap-1.5"
              >
                <span>Launch Platform</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20 pb-20 px-6 md:px-12 max-w-7xl mx-auto">
        {/* Futuristic Background Ambient Glows */}
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>CAPSTONE DEMONSTRATION SUITE</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400">AUTONOMOUS LEVEL 4 READY</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.1]">
              Real-Time Autonomous <br />
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
                EV Intelligence Platform
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              An integrated platform combining autonomous vehicle control, EV battery analytics,
              smart charging, and intelligent trip planning in one unified system.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={handleLaunchDashboard}
                className="px-7 py-4 rounded-2xl text-sm font-extrabold bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 text-black hover:from-cyan-300 hover:to-blue-500 shadow-[0_0_30px_rgba(0,242,254,0.45)] transition-all flex items-center gap-2 group"
              >
                <span>Launch Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={scrollToModules}
                className="px-7 py-4 rounded-2xl text-sm font-bold bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-cyan-500/40 transition-all flex items-center gap-2"
              >
                <span>Explore Platform</span>
                <ChevronRight className="w-4 h-4 text-cyan-400" />
              </button>
            </div>

            {/* Quick Trust / Architecture Pills */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-800/80">
              <div>
                <div className="text-xl md:text-2xl font-black font-mono text-cyan-400">100 Hz</div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">Sensor Telemetry</div>
              </div>
              <div>
                <div className="text-xl md:text-2xl font-black font-mono text-emerald-400">±1.5%</div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">BMS SOC Precision</div>
              </div>
              <div>
                <div className="text-xl md:text-2xl font-black font-mono text-blue-400">Zero</div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">Range Anxiety</div>
              </div>
            </div>
          </div>

          {/* Right Column: Futuristic Autonomous EV Visual */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Glowing backdrop circle */}
            <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-b from-[#0d172a] to-[#070b14] border border-cyan-500/30 p-6 shadow-[0_0_50px_-10px_rgba(0,242,254,0.25)] flex flex-col items-center justify-between">
              {/* Corner HUD markers */}
              <div className="absolute top-3 left-3 text-[10px] font-mono text-cyan-400/80">
                SYS: ACTIVE [LEVEL 4]
              </div>
              <div className="absolute top-3 right-3 text-[10px] font-mono text-emerald-400/80">
                BAT: 78% NOMINAL
              </div>
              <div className="absolute bottom-3 left-3 text-[10px] font-mono text-slate-500">
                LAT: 12.9716° N
              </div>
              <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-500">
                LNG: 77.5946° E
              </div>

              {/* Central Stylized Top-Down Autonomous EV Graphic */}
              <div className="relative my-auto flex flex-col items-center">
                {/* Radar rings */}
                <div className="absolute -inset-16 rounded-full border border-cyan-500/10 animate-ping" />
                <div className="absolute -inset-10 rounded-full border border-cyan-500/20" />

                {/* Simulated Vehicle SVG */}
                <div className="relative z-10 w-44 h-72 rounded-3xl bg-[#091122] border-2 border-cyan-400/70 shadow-[0_0_30px_rgba(0,242,254,0.35)] flex flex-col items-center justify-between p-4">
                  {/* Front LiDAR Array */}
                  <div className="w-16 h-3 rounded-full bg-cyan-400 shadow-[0_0_12px_#00f2fe] animate-pulse flex items-center justify-center">
                    <span className="text-[8px] font-mono text-black font-extrabold">LiDAR</span>
                  </div>

                  {/* Windshield */}
                  <div className="w-32 h-14 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center">
                    <span className="text-[9px] font-mono text-cyan-300">TRIPLE 4K CAM</span>
                  </div>

                  {/* Battery Pack Core */}
                  <div className="w-32 h-20 rounded-xl bg-[#0d182e] border border-emerald-500/40 p-2 flex flex-col justify-between">
                    <div className="flex items-center justify-between text-[9px] font-mono text-emerald-400">
                      <span>75 kWh BMS</span>
                      <span>78%</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                      {[1, 2, 3, 4].map(cell => (
                        <div key={cell} className="h-6 rounded bg-emerald-500/20 border border-emerald-500/40" />
                      ))}
                    </div>
                  </div>

                  {/* Rear Electric Motors */}
                  <div className="w-28 h-4 rounded-lg bg-blue-600/30 border border-blue-500/50 flex items-center justify-center text-[8px] font-mono text-blue-300">
                    DUAL PMSM DRIVE (320 kW)
                  </div>
                </div>

                {/* Floating telemetry pills */}
                <div className="absolute -left-6 top-8 px-2.5 py-1 rounded-lg bg-black/80 border border-cyan-500/40 text-[10px] font-mono text-cyan-300 shadow-lg">
                  SPEED: 42 km/h
                </div>
                <div className="absolute -right-6 bottom-14 px-2.5 py-1 rounded-lg bg-black/80 border border-emerald-500/40 text-[10px] font-mono text-emerald-300 shadow-lg">
                  RANGE: 286 km
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four Core Modules Section */}
      <section id="core-modules" className="py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-slate-800/80">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-400 mb-3">
            <span>UNIFIED SYSTEM ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Four Core Modules
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3">
            Every module is synchronized via our centralized telemetry backbone, powering real-time
            intelligence from vehicle edge perception to grid charging.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.id}
                onClick={handleLaunchDashboard}
                className="group relative rounded-2xl bg-gradient-to-b from-[#0d1627] to-[#090e1a] border border-slate-800/90 hover:border-cyan-500/50 p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_10px_30px_-5px_rgba(0,242,254,0.2)] cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
                      {mod.subtitle}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {mod.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {mod.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80">
                  <div className="text-[10px] font-mono text-cyan-400/90 mb-3 truncate">
                    {mod.stats}
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
                    <span>Explore Module</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Platform Statistics Section */}
      <section id="platform-statistics" className="py-16 px-6 md:px-12 bg-gradient-to-b from-[#070b14] via-[#091122] to-[#070b14] border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
              <div className="text-3xl sm:text-4xl font-black font-mono text-cyan-400">4</div>
              <div className="text-sm font-bold text-white mt-1">Integrated Modules</div>
              <p className="text-xs text-slate-400 mt-1">
                AV control, BMS, smart charging, and energy-aware routing in one codebase.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
              <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-400">100 Hz</div>
              <div className="text-sm font-bold text-white mt-1">Real-Time Data</div>
              <p className="text-xs text-slate-400 mt-1">
                Sub-20ms sensor fusion between LiDAR, 77GHz Radar, IMU, and triple 4K cameras.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
              <div className="text-3xl sm:text-4xl font-black font-mono text-blue-400">Dynamic</div>
              <div className="text-sm font-bold text-white mt-1">Battery-Aware Routing</div>
              <p className="text-xs text-slate-400 mt-1">
                Proactive charging stops inserted automatically based on electrochemical state.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xl">
              <div className="text-3xl sm:text-4xl font-black font-mono text-amber-400">Cloud-Ready</div>
              <div className="text-sm font-bold text-white mt-1">Architecture</div>
              <p className="text-xs text-slate-400 mt-1">
                Modular pub/sub data layer ready for fleet telematics and grid load balancing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Built for Intelligent Electric Mobility Section */}
      <section id="built-for-mobility" className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ACADEMIC CAPSTONE EXCELLENCE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Built for Intelligent Electric Mobility
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Traditional electric vehicles isolate their autonomous perception from the battery
              management system, leading to unexpected range depletion and charging bottlenecks.
              Our platform bridges this divide.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Vehicle Perception</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Real-time spatial bounding boxes, voxelized LiDAR point clouds, and fail-safe safety interlocks.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Battery Intelligence</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Extended Kalman Filter algorithms for SOC and SOH health estimation with thermal anomaly detection.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Charging Infrastructure & Route Planning</h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Live connector reservation, charging curve tracking, and energy-feasible waypoint insertion.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-gradient-to-b from-[#0e172a] to-[#070b14] border border-slate-800 p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs font-mono text-slate-400">
                <span>SYSTEM INTER-MODULE DATA BUS</span>
                <span className="text-emerald-400 font-bold">ALL SUBSYSTEMS NOMINAL</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">AV → Telemetry:</span>
                  <span className="text-cyan-400">Velocity: 42.0 km/h | Accel: 0.8 m/s²</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">BMS → Trip Planner:</span>
                  <span className="text-emerald-400">SOC: 78.0% | Voltage: 398.2 V</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">Grid → Smart Charging:</span>
                  <span className="text-blue-400">3/4 Plugs Available @ 150 kW</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-300">Planner → Route Bus:</span>
                  <span className="text-amber-400">Recommended Stop: Sector 6 (+18m)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 px-6 md:px-12 text-center border-t border-slate-800/80 bg-gradient-to-t from-[#091122] to-[#070b14]">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(0,242,254,0.3)]">
            <Zap className="w-7 h-7" />
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Enter the EV Intelligence Platform
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Experience our complete capstone project demonstration with live simulated vehicle telemetry,
            sensor health, battery dynamics, and charging reservations.
          </p>

          <div className="pt-4">
            <button
              onClick={handleLaunchDashboard}
              className="px-8 py-4 rounded-2xl text-base font-extrabold bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-600 text-black hover:from-cyan-300 hover:to-blue-500 shadow-[0_0_35px_rgba(0,242,254,0.5)] transition-all inline-flex items-center gap-2 group"
            >
              <span>Enter the EV Intelligence Platform</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Landing Footer */}
      <footer className="py-8 px-6 md:px-12 border-t border-slate-800/80 text-xs text-slate-500 text-center font-mono">
        <p>B.Tech Capstone Project Demonstration • Real-Time Autonomous EV Intelligence Platform • 2026</p>
      </footer>
    </div>
  );
};
export default LandingPage;
