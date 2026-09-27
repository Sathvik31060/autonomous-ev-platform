import React from 'react';
import { useDemoMode, DEMO_STEPS } from '../../context/DemoModeContext';
import { ChevronLeft, ChevronRight, X, PlayCircle, CheckCircle2, Sparkles } from 'lucide-react';

export const DemoTourOverlay = () => {
  const { isDemoActive, currentStepIndex, currentStep, totalSteps, nextStep, prevStep, stopDemo, jumpToStep } = useDemoMode();

  if (!isDemoActive || !currentStep) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 z-50 md:max-w-xl w-auto animate-bounce-in">
      <div className="rounded-2xl bg-[#09101d]/95 backdrop-blur-2xl border-2 border-cyan-500/50 shadow-[0_10px_40px_-5px_rgba(0,242,254,0.35)] p-5 text-slate-100">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Capstone Demo Mode • Step {currentStep.step} of {totalSteps}
              </span>
              <h4 className="text-base font-bold text-white tracking-tight">{currentStep.title}</h4>
            </div>
          </div>
          <button
            onClick={stopDemo}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Exit Demo Mode"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="grid grid-cols-5 gap-1.5 my-3">
          {DEMO_STEPS.map((step, idx) => (
            <button
              key={step.step}
              onClick={() => jumpToStep(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentStepIndex
                  ? 'bg-cyan-400 shadow-[0_0_8px_#00f2fe]'
                  : idx < currentStepIndex
                  ? 'bg-emerald-500'
                  : 'bg-slate-800'
              }`}
              title={`Jump to ${step.title}`}
            />
          ))}
        </div>

        {/* Content & Guidance */}
        <p className="text-xs md:text-sm text-slate-300 leading-relaxed mb-3">
          {currentStep.description}
        </p>

        {/* Bullet Highlights */}
        <div className="grid grid-cols-2 gap-2 mb-4 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/60">
          {currentStep.keyPoints.map((point, i) => (
            <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span className="line-clamp-1">{point}</span>
            </div>
          ))}
        </div>

        {/* Navigation Actions */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5">
            {DEMO_STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => jumpToStep(i)}
                className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center transition-colors ${
                  i === currentStepIndex
                    ? 'bg-cyan-500 text-black font-extrabold'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={prevStep}
              disabled={currentStepIndex === 0}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 border border-slate-700 transition-all ${
                currentStepIndex === 0
                  ? 'opacity-40 cursor-not-allowed text-slate-500'
                  : 'hover:bg-slate-800 text-slate-200'
              }`}
            >
              <ChevronLeft className="w-3.5 h-3.5" /> Prev
            </button>
            <button
              onClick={nextStep}
              className="px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black shadow-[0_0_15px_rgba(0,242,254,0.4)] transition-all font-sans"
            >
              <span>{currentStepIndex === totalSteps - 1 ? 'Finish Tour' : 'Next Step'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DemoTourOverlay;
