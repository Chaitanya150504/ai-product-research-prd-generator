import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Search,
  Sliders,
  FileCode,
  Zap,
  Target,
  Users,
  Compass,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { ProductInput } from '../types/report.ts';

interface HeroLandingProps {
  formData: ProductInput;
  onChange: (field: keyof ProductInput, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onFillSample: () => void;
  onTrySample: () => void;
  isLoading: boolean;
  errorMessage?: string | null;
}

export const HeroLanding: React.FC<HeroLandingProps> = ({
  formData,
  onChange,
  onSubmit,
  onFillSample,
  onTrySample,
  isLoading,
  errorMessage,
}) => {
  return (
    <div className="w-full pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 sm:pt-16 pb-12 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-semibold text-indigo-700 bg-indigo-50 border border-indigo-100 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Built for PMs, APMs, Founders, &amp; Product Enthusiasts</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            AI Product Research &amp; PRD Generator
          </h1>

          <p className="mt-5 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Turn your product idea into a complete product strategy and PRD using AI.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#generate-form"
              className="px-6 py-3.5 text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md hover:shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              type="button"
              onClick={onTrySample}
              disabled={isLoading}
              className="px-6 py-3.5 text-base font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl shadow-xs hover:shadow-sm transition-all inline-flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Try Zomato Sample</span>
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            How It Works
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-500">
            From raw concept to an executive-ready 20-section product dossier in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="relative p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col items-start">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-base mb-4">
              1
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Enter your product idea
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Describe your product name, proposed feature idea, optional target audience, category, and regional market.
            </p>
          </div>

          <div className="relative p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col items-start">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-base mb-4">
              2
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              AI analyzes the opportunity
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Gemini calculates TAM/SAM/SOM market sizing, analyzes 5+ competitors, benchmarks SWOT, builds personas, and computes RICE scores.
            </p>
          </div>

          <div className="relative p-6 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col items-start">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-base mb-4">
              3
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Get your complete product strategy
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Review a full 20-section PRD with user stories, acceptance criteria, system architecture, success metrics, and phased roadmap.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-6 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Product Research
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Unpack market opportunities with quantified TAM/SAM/SOM sizing, 5+ competitor matrix, SWOT vectors, and 3 realistic user personas.
            </p>
            <ul className="text-xs text-slate-500 space-y-1.5">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>TAM, SAM &amp; SOM with explicit assumptions</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>5+ Competitors with pricing &amp; differentiation</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>Customer journey map across 6 stages</span>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              AI-Powered Prioritization
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Score feature candidates using standard PM frameworks including mathematical RICE formulas, Kano model classifications, and MoSCoW.
            </p>
            <ul className="text-xs text-slate-500 space-y-1.5">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>RICE score tables with explicit math</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>Kano: Basic, Performance, Delighters</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                <span>MoSCoW roadmap discipline</span>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-gradient-to-b from-slate-50 to-white rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
              <FileCode className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Automated PRD
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Generate development-ready engineering PRDs with user stories, Given/When/Then acceptance criteria, architecture, and feature specifications.
            </p>
            <ul className="text-xs text-slate-500 space-y-1.5">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>User Stories with Acceptance Criteria</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Technical Architecture &amp; Success Metrics</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Implementation-Ready Feature Specifications</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Input Form Section */}
      <section id="generate-form" className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-slate-100 gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Define Your Product Opportunity
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Provide key details to generate a comprehensive 20-section product report.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={onFillSample}
                disabled={isLoading}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                title="Fill form inputs with Zomato values"
              >
                <span>Fill Form</span>
              </button>
              <button
                type="button"
                onClick={onTrySample}
                disabled={isLoading}
                className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                title="Immediately generate Zomato report"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>Try Zomato Sample</span>
              </button>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label
                htmlFor="productName"
                className="block text-sm font-semibold text-slate-900 mb-1.5"
              >
                Product Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="productName"
                  type="text"
                  required
                  value={formData.productName}
                  onChange={(e) => onChange('productName', e.target.value)}
                  placeholder="e.g., Zomato, Slack, Airbnb, Notion"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm sm:text-base font-medium"
                />
              </div>
            </div>

            {/* Feature Idea */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="featureIdea"
                  className="block text-sm font-semibold text-slate-900"
                >
                  Feature Idea <span className="text-rose-500">*</span>
                </label>
                <span className="text-xs text-slate-400">Be descriptive for best results</span>
              </div>
              <textarea
                id="featureIdea"
                required
                rows={4}
                value={formData.featureIdea}
                onChange={(e) => onChange('featureIdea', e.target.value)}
                placeholder="e.g., AI-powered mood-based food recommendations that recommend restaurants and dishes based on the user's mood, preferences, budget, location, and previous orders."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm sm:text-base resize-y"
              />
            </div>

            {/* Optional Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label
                  htmlFor="targetUsers"
                  className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1"
                >
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>Target Users (Optional)</span>
                </label>
                <input
                  id="targetUsers"
                  type="text"
                  value={formData.targetUsers || ''}
                  onChange={(e) => onChange('targetUsers', e.target.value)}
                  placeholder="e.g., Urban users aged 18–35"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="productCategory"
                  className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1"
                >
                  <Target className="w-3.5 h-3.5 text-slate-400" />
                  <span>Product Category (Optional)</span>
                </label>
                <input
                  id="productCategory"
                  type="text"
                  value={formData.productCategory || ''}
                  onChange={(e) => onChange('productCategory', e.target.value)}
                  placeholder="e.g., Food Delivery"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="targetMarket"
                  className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1"
                >
                  <Compass className="w-3.5 h-3.5 text-slate-400" />
                  <span>Market / Location (Optional)</span>
                </label>
                <input
                  id="targetMarket"
                  type="text"
                  value={formData.targetMarket || ''}
                  onChange={(e) => onChange('targetMarket', e.target.value)}
                  placeholder="e.g., India, US, Global"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-xs sm:text-sm"
                />
              </div>
            </div>

            {/* Inline Error if API call failed */}
            {errorMessage && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-3 text-xs sm:text-sm text-rose-900">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold">Unable to generate report</p>
                  <p className="text-rose-700 mt-0.5 text-xs">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading || !formData.productName.trim() || !formData.featureIdea.trim()}
                className="w-full py-4 px-6 text-base sm:text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-indigo-200" />
                <span>{isLoading ? 'Generating Report...' : 'Generate Product Report'}</span>
              </button>
              <p className="text-center text-xs text-slate-400 mt-2.5">
                Generates all 20 sections including market sizing, competitor matrix, RICE scores, PRD &amp; roadmap.
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
