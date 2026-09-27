import React from 'react';
import {
  BookOpen,
  Cpu,
  BatteryCharging,
  Zap,
  Navigation,
  FileText,
  CheckCircle2,
  Bookmark,
  Share2
} from 'lucide-react';
import GlassCard from '../components/common/GlassCard';
import { LITERATURE_TABLE_DATA, RESEARCH_DOMAIN_CARDS } from '../data/literatureData';

export const LiteratureSurvey = () => {
  return (
    <div className="space-y-8">
      {/* Top Academic Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest">
            Capstone Academic Survey
          </span>
          <span className="text-slate-600">•</span>
          <span className="text-xs font-mono text-slate-400">STATE OF THE ART FOUNDATIONS</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-white tracking-tight mt-1">
          Research Foundations
        </h1>
        <p className="text-xs md:text-sm text-slate-400 mt-1">
          Key prior work informing the platform architecture across autonomous driving, battery
          management and smart charging domains.
        </p>
      </div>

      {/* CORE LITERATURE SURVEY PROFESSIONAL TABLE */}
      <GlassCard
        title="Comparative Synthesis of Domain Literature"
        subtitle="Formal mapping of foundational contributions to unified platform modules"
        icon={BookOpen}
      >
        <div className="overflow-x-auto rounded-2xl border border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#09101d] text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
              <tr>
                <th className="p-4 w-1/4">DOMAIN</th>
                <th className="p-4 w-2/5">KEY CONTRIBUTION</th>
                <th className="p-4 w-1/3">RELEVANCE</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {LITERATURE_TABLE_DATA.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-900/60 transition-colors">
                  <td className="p-4 align-top">
                    <div className="font-bold text-white text-sm">{row.domain}</div>
                    <span className="text-[10px] font-mono text-cyan-400 mt-0.5 inline-block">
                      {row.tag}
                    </span>
                  </td>
                  <td className="p-4 align-top">
                    <div className="text-cyan-300 font-mono text-xs font-semibold leading-relaxed">
                      "{row.keyContribution}"
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1.5 leading-normal">
                      Methodology: {row.methodology}
                    </p>
                  </td>
                  <td className="p-4 align-top">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{row.relevance}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* FOUR RESEARCH DOMAIN CARDS (CLEAN ACADEMIC STYLING) */}
      <div>
        <div className="mb-4">
          <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
            Domain Methodological Deep-Dives
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Technical principles, state estimation equations, and algorithmic implementations underpinning each module.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RESEARCH_DOMAIN_CARDS.map((card) => {
            const icons = {
              'domain-av': Cpu,
              'domain-bms': BatteryCharging,
              'domain-charging': Zap,
              'domain-trip': Navigation
            };
            const Icon = icons[card.id] || BookOpen;

            return (
              <div
                key={card.id}
                className="p-6 rounded-2xl bg-gradient-to-b from-[#0d1627] to-[#090f1d] border border-slate-800 hover:border-slate-700 space-y-4 transition-all"
              >
                <div className="flex items-start justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
                        {card.domain}
                      </span>
                      <h4 className="text-base font-bold text-white tracking-tight">
                        {card.title}
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">
                    FOUNDATIONAL CONTRIBUTION:
                  </span>
                  <p className="text-cyan-300 font-semibold mt-0.5 font-mono">
                    "{card.contribution}"
                  </p>
                  <span className="text-[10px] text-slate-500 mt-1 block">
                    Direct architectural mapping to: <strong className="text-white">{card.relevance}</strong>
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-300 tracking-wide font-mono block uppercase">
                    Core Algorithmic Principles:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {card.coreConcepts.map((concept, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
                        <span className="leading-relaxed">{concept}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-300/90 leading-relaxed font-mono">
                  <strong className="text-emerald-400 font-bold block mb-1">Empirical Benchmark:</strong>
                  {card.technicalHighlight}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default LiteratureSurvey;
