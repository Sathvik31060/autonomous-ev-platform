import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Cpu,
  Clock,
  BatteryCharging,
  Layers,
  ArrowRight,
  Sparkles,
  Zap,
  ShieldCheck,
  Compass,
  LayoutDashboard
} from 'lucide-react';
import GlassCard from '../components/common/GlassCard';

export const KeyTakeaways = () => {
  const navigate = useNavigate();

  const takeaways = [
    {
      id: 1,
      title: 'UNIFIED INTELLIGENCE',
      headline: 'Four modules operate as one cohesive platform — not siloed tools.',
      description: 'By merging edge autonomous perception with electrochemical battery estimation and smart grid reservation, our architecture eliminates isolated telemetry pipelines. Every module actively responds to state shifts in neighboring subsystems.',
      icon: Cpu,
      accent: 'cyan',
      tag: 'System Synergy'
    },
    {
      id: 2,
      title: 'REAL-TIME BY DESIGN',
      headline: 'Every component — from sensor fusion to charging status — updates in real time.',
      description: 'With 100Hz hardware-synchronized sensor feeds, 60 FPS perception voxelization, and continuous BMS state estimation via Extended Kalman Filtering, latency is constrained to sub-20ms safety limits.',
      icon: Clock,
      accent: 'green',
      tag: 'Deterministic 100Hz'
    },
    {
      id: 3,
      title: 'BATTERY-AWARE ROUTING',
      headline: 'Trip planning accounts for live SOC, SOH and charging network availability.',
      description: 'Route optimization incorporates real-time cell degradation, ambient temperature, elevation gradients, and verified plug availability at high-power charging depots, permanently solving EV range anxiety.',
      icon: BatteryCharging,
      accent: 'blue',
      tag: 'Zero Range Anxiety'
    },
    {
      id: 4,
      title: 'SCALABLE ARCHITECTURE',
      headline: 'Modular design supports fleet deployment and future feature expansion.',
      description: 'A decoupled publisher/subscriber data layer allows seamless addition of V2G (Vehicle-to-Grid) bidirectional power flow, automated valet parking routines, and multi-tenant fleet telematics over 5G clouds.',
      icon: Layers,
      accent: 'purple',
      tag: 'Enterprise Ready'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            Capstone Project Conclusions
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-xs font-mono text-slate-400">EXECUTIVE SUMMARY</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-1">
          Key Takeaways
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Four foundational pillars demonstrating the novelty and engineering impact of our
          autonomous EV intelligence system.
        </p>
      </div>

      {/* FOUR LARGE INTERACTIVE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {takeaways.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="p-7 rounded-3xl bg-gradient-to-b from-[#0d1627] to-[#090f1d] border border-slate-800 hover:border-cyan-500/40 p-6 space-y-4 transition-all duration-300 hover:shadow-[0_10px_35px_-5px_rgba(0,242,254,0.2)] group"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                      Takeaway 0{item.id}
                    </span>
                    <h3 className="text-lg font-black text-white tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-slate-900 border border-slate-700 text-slate-300">
                  {item.tag}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                <p className="text-cyan-300 font-mono text-xs font-bold leading-relaxed">
                  "{item.headline}"
                </p>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* PLATFORM VISION SECTION */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0d182e] via-[#0b1428] to-[#0d182e] border border-cyan-500/30 p-8 md:p-10 shadow-[0_0_40px_-10px_rgba(0,242,254,0.25)] space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Sparkles className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
              Strategic Road Ahead
            </span>
            <h2 className="text-2xl font-black text-white tracking-tight">Platform Vision</h2>
          </div>
        </div>

        <p className="text-sm md:text-base text-slate-200 leading-relaxed max-w-3xl">
          The Real-Time Autonomous EV Intelligence Platform provides an integrated foundation for
          intelligent electric mobility by connecting autonomous driving, battery intelligence,
          smart charging and energy-aware route planning. As commercial transportation shifts toward
          unattended robocabs and heavy electric freight, unifying edge vehicular perception with
          decentralized grid energy scheduling will be the decisive factor in operational safety,
          battery lifespan longevity, and commercial viability.
        </p>

        <div className="pt-2 flex flex-wrap items-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-black shadow-[0_0_25px_rgba(0,242,254,0.4)] transition-all flex items-center gap-2 group"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Return to Dashboard</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => navigate('/av-dashboard')}
            className="px-6 py-3.5 rounded-2xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-cyan-500/40 transition-all flex items-center gap-2"
          >
            <span>Review AV Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default KeyTakeaways;
