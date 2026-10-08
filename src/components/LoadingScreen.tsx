import React, { useEffect, useState } from 'react';
import { Loader2, CheckCircle2, CircleDashed } from 'lucide-react';

interface LoadingScreenProps {
  productName: string;
}

const PROGRESS_STEPS = [
  'Analyzing product idea...',
  'Researching competitors...',
  'Creating user personas...',
  'Prioritizing features...',
  'Building PRD...',
  'Finalizing report...',
];

const PM_TIPS = [
  'Good PRDs focus on user problems and business outcomes, not just UI specifications.',
  'RICE prioritization = (Reach × Impact × Confidence) / Effort.',
  'TAM represents the 100% total potential market if every single addressable customer buys.',
  'Acceptance criteria written in Given-When-Then format prevent ambiguity between PMs and engineers.',
  'North Star metrics should directly correlate with user value delivery and long-term retention.',
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ productName }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    // Progress step interval
    const stepInterval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < PROGRESS_STEPS.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 4500);

    // Tip change interval
    const tipInterval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % PM_TIPS.length);
    }, 6000);

    return () => {
      clearInterval(stepInterval);
      clearInterval(tipInterval);
    };
  }, []);

  const progressPercentage = Math.round(
    ((currentStepIndex + 1) / PROGRESS_STEPS.length) * 100
  );

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-xl p-8 sm:p-10 text-center">
        {/* Animated icon */}
        <div className="relative mx-auto w-16 h-16 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl bg-indigo-100 animate-ping opacity-30" />
          <div className="relative w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
            <Loader2 className="w-8 h-8 animate-spin text-white" />
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mb-1">
          Generating Product Strategy
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Synthesizing 20 comprehensive research sections for{' '}
          <span className="font-semibold text-slate-800">{productName || 'your product'}</span>...
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 rounded-full h-2 mb-2 overflow-hidden">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-400 mb-6">
          <span>{PROGRESS_STEPS[currentStepIndex]}</span>
          <span>{progressPercentage}%</span>
        </div>

        {/* Step List */}
        <div className="bg-slate-50/80 rounded-2xl p-4 text-left border border-slate-100 mb-6 space-y-2.5">
          {PROGRESS_STEPS.map((step, idx) => {
            const isDone = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            return (
              <div
                key={step}
                className={`flex items-center gap-2.5 text-xs sm:text-sm transition-colors ${
                  isDone
                    ? 'text-emerald-700 font-medium'
                    : isCurrent
                    ? 'text-indigo-700 font-semibold'
                    : 'text-slate-400'
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-indigo-600 animate-spin shrink-0" />
                ) : (
                  <CircleDashed className="w-4 h-4 text-slate-300 shrink-0" />
                )}
                <span>{step}</span>
              </div>
            );
          })}
        </div>

        {/* PM Tip Card */}
        <div className="p-3.5 bg-amber-50/70 border border-amber-200/60 rounded-xl text-left">
          <p className="text-[11px] font-bold text-amber-800 uppercase tracking-wider mb-1">
            PM Insight
          </p>
          <p className="text-xs text-amber-900 leading-relaxed transition-opacity duration-300">
            {PM_TIPS[tipIndex]}
          </p>
        </div>
      </div>
    </div>
  );
};
