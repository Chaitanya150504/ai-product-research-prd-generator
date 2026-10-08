import React, { useState, useEffect } from 'react';
import {
  RefreshCw,
  Copy,
  Download,
  Check,
  Printer,
  ChevronRight,
  Menu,
  X,
  FileText,
  Target,
  Users,
  Compass,
  Building2,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Cpu,
  Layers,
  Calendar,
  ShieldAlert,
  Rocket,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { ProductReportData } from '../types/report.ts';
import { generateMarkdownReport, downloadFile } from '../utils/exportReport.ts';

interface ReportViewProps {
  report: ProductReportData;
  onNewReport: () => void;
}

const SECTION_NAV = [
  { id: 'sec-01', num: '01', title: 'Executive Summary' },
  { id: 'sec-02', num: '02', title: 'Problem Statement' },
  { id: 'sec-03', num: '03', title: 'Market Opportunity' },
  { id: 'sec-04', num: '04', title: 'Competitor Analysis' },
  { id: 'sec-05', num: '05', title: 'SWOT Analysis' },
  { id: 'sec-06', num: '06', title: 'Target Users' },
  { id: 'sec-07', num: '07', title: 'User Personas' },
  { id: 'sec-08', num: '08', title: 'User Journey' },
  { id: 'sec-09', num: '09', title: 'Customer Pain Points' },
  { id: 'sec-10', num: '10', title: 'Proposed Features' },
  { id: 'sec-11', num: '11', title: 'RICE Prioritization' },
  { id: 'sec-12', num: '12', title: 'Kano Model' },
  { id: 'sec-13', num: '13', title: 'MoSCoW Prioritization' },
  { id: 'sec-14', num: '14', title: 'PRD (Requirements)' },
  { id: 'sec-15', num: '15', title: 'Technical Architecture' },
  { id: 'sec-16', num: '16', title: 'Success Metrics' },
  { id: 'sec-17', num: '17', title: 'Risk Analysis' },
  { id: 'sec-18', num: '18', title: 'Launch Strategy' },
  { id: 'sec-19', num: '19', title: '30/60/90 Day Roadmap' },
  { id: 'sec-20', num: '20', title: 'PM Interview Questions' },
];

export const ReportView: React.FC<ReportViewProps> = ({ report, onNewReport }) => {
  const [activeSection, setActiveSection] = useState('sec-01');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  // Handle intersection observer to highlight current section in sidebar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = SECTION_NAV.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTION_NAV[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(SECTION_NAV[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
      setMobileMenuOpen(false);
    }
  };

  const handleCopy = async () => {
    try {
      const markdown = generateMarkdownReport(report);
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy report:', err);
    }
  };

  const handleDownload = () => {
    const markdown = generateMarkdownReport(report);
    const filename = `${report.meta.productName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-prd-report.md`;
    downloadFile(markdown, filename);
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredNav = SECTION_NAV.filter(
    (item) =>
      item.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.num.includes(searchFilter)
  );

  return (
    <div className="w-full bg-slate-50 min-h-screen text-slate-800">
      {/* Top Banner Toolbar */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
              title="Table of Contents"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-slate-700">{report.meta.productName}</span>
                <span aria-hidden="true">·</span>
                <span>{report.meta.productCategory || 'General'}</span>
                <span aria-hidden="true">·</span>
                <span>{report.meta.targetMarket || 'Global'}</span>
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-900 truncate max-w-md sm:max-w-xl">
                {report.meta.featureIdea}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onNewReport}
              className="px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Generate Another Report</span>
              <span className="sm:hidden">New</span>
            </button>

            <button
              onClick={handleCopy}
              className="px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-semibold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy Report</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Report</span>
            </button>

            <button
              onClick={handlePrint}
              className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors hidden md:block cursor-pointer"
              title="Print / Save as PDF"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex gap-8">
        {/* Desktop Sidebar Table of Contents */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-36 bg-white rounded-2xl border border-slate-200 p-4 shadow-xs max-h-[calc(100vh-10rem)] flex flex-col">
            <div className="pb-3 border-b border-slate-100 mb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Table of Contents (20 Sections)
              </h3>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Filter sections..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full px-2.5 py-1 text-xs border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            <nav className="overflow-y-auto space-y-0.5 pr-1 text-xs font-medium">
              {filteredNav.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 font-semibold'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <span className="truncate">
                      <span className="text-slate-400 mr-1.5 font-mono">{item.num}.</span>
                      {item.title}
                    </span>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 shrink-0 text-indigo-600" />}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Mobile TOC Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative w-80 max-w-full bg-white h-full shadow-2xl p-5 flex flex-col z-10">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                <span className="text-sm font-bold text-slate-900">Sections</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="overflow-y-auto space-y-1 text-sm font-medium">
                {SECTION_NAV.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between cursor-pointer ${
                      activeSection === item.id
                        ? 'bg-indigo-50 text-indigo-700 font-semibold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>
                      <span className="text-slate-400 mr-2 font-mono">{item.num}.</span>
                      {item.title}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Main Content: 20 Distinct Cards */}
        <main className="flex-1 min-w-0 space-y-8 pb-24">
          {/* Card 01: Executive Summary */}
          <section
            id="sec-01"
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-28"
          >
            <div className="border-b border-slate-100 pb-4 mb-5">
              <div className="text-xs font-mono text-indigo-600 font-semibold mb-1">
                01. Strategy Overview
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Executive Summary</h2>
            </div>
            <p className="text-base text-slate-700 leading-relaxed font-normal">
              {report.executiveSummary}
            </p>
          </section>

          {/* Card 02: Problem Statement */}
          <section
            id="sec-02"
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-28"
          >
            <div className="border-b border-slate-100 pb-4 mb-5">
              <div className="text-xs font-mono text-indigo-600 font-semibold mb-1">
                02. Problem Validation
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Problem Statement</h2>
            </div>
            <div className="space-y-6">
              <div className="p-4 bg-rose-50/50 rounded-xl border border-rose-100">
                <h3 className="text-sm font-bold text-rose-950 mb-1.5 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>Core Problem</span>
                </h3>
                <p className="text-sm text-rose-900 leading-relaxed">
                  {report.problemStatement.coreProblem}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Why Current Solutions Fail
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {report.problemStatement.whyCurrentSolutionsFail}
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Impact of Unresolved Problem
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {report.problemStatement.impactOfUnresolvedProblem}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Card 03: Market Opportunity */}
          <section
            id="sec-03"
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-28"
          >
            <div className="border-b border-slate-100 pb-4 mb-5">
              <div className="text-xs font-mono text-indigo-600 font-semibold mb-1">
                03. Market Sizing
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Market Opportunity</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-5 rounded-xl bg-slate-900 text-white shadow-xs">
                <span className="text-xs font-mono text-indigo-300 uppercase tracking-wider">
                  Total Addressable (TAM)
                </span>
                <p className="text-lg sm:text-xl font-bold mt-1 text-white leading-snug">
                  {report.marketOpportunity.tam}
                </p>
                <p className="text-xs text-slate-400 mt-2">Whole ecosystem market scope</p>
              </div>

              <div className="p-5 rounded-xl bg-indigo-900 text-white shadow-xs">
                <span className="text-xs font-mono text-indigo-300 uppercase tracking-wider">
                  Serviceable Available (SAM)
                </span>
                <p className="text-lg sm:text-xl font-bold mt-1 text-white leading-snug">
                  {report.marketOpportunity.sam}
                </p>
                <p className="text-xs text-indigo-200/80 mt-2">Target demographic &amp; channels</p>
              </div>

              <div className="p-5 rounded-xl bg-emerald-900 text-white shadow-xs">
                <span className="text-xs font-mono text-emerald-300 uppercase tracking-wider">
                  Serviceable Obtainable (SOM)
                </span>
                <p className="text-lg sm:text-xl font-bold mt-1 text-white leading-snug">
                  {report.marketOpportunity.som}
                </p>
                <p className="text-xs text-emerald-200/80 mt-2">Near-term realistic market capture</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 mb-3">Core Sizing Assumptions</h3>
              <ul className="space-y-2">
                {report.marketOpportunity.assumptions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <span className="w-5 h-5 rounded-md bg-slate-100 text-slate-600 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Card 04: Competitor Analysis (TABLE REQUIRED) */}
          <section
            id="sec-04"
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-28"
          >
            <div className="border-b border-slate-100 pb-4 mb-5">
              <div className="text-xs font-mono text-indigo-600 font-semibold mb-1">
                04. Competitive Intelligence
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Competitor Analysis (5+ Analyzed)
              </h2>
            </div>

            <div className="overflow-x-auto -mx-6 sm:mx-0">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-100/80 border-y border-slate-200 text-slate-700 font-semibold">
                    <th className="py-3 px-3 sm:px-4">Company</th>
                    <th className="py-3 px-3 sm:px-4">Relevant Feature</th>
                    <th className="py-3 px-3 sm:px-4">Strengths</th>
                    <th className="py-3 px-3 sm:px-4">Weaknesses</th>
                    <th className="py-3 px-3 sm:px-4">Pricing</th>
                    <th className="py-3 px-3 sm:px-4">Differentiation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {report.competitorAnalysis.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-50/60 transition-colors align-top">
                      <td className="py-3.5 px-3 sm:px-4 font-bold text-slate-900 whitespace-nowrap">
                        {c.company}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 text-slate-700 min-w-[140px]">
                        {c.relevantFeature}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 text-emerald-800 bg-emerald-50/20 min-w-[150px]">
                        {c.strengths}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 text-rose-800 bg-rose-50/20 min-w-[150px]">
                        {c.weaknesses}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 text-slate-600 min-w-[120px]">
                        {c.pricing}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 text-indigo-900 font-medium min-w-[160px]">
                        {c.differentiation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Card 05: SWOT Analysis */}
          <section
            id="sec-05"
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-28"
          >
            <div className="border-b border-slate-100 pb-4 mb-5">
              <div className="text-xs font-mono text-indigo-600 font-semibold mb-1">
                05. Strategic Matrix
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">SWOT Analysis</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Strengths */}
              <div className="p-5 bg-emerald-50/50 rounded-xl border border-emerald-100">
                <h3 className="text-sm font-bold text-emerald-900 mb-3 flex items-center justify-between">
                  <span>Strengths (Internal)</span>
                  <span className="text-xs text-emerald-700 font-mono">S</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-emerald-950">
                  {report.swotAnalysis.strengths.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="p-5 bg-amber-50/50 rounded-xl border border-amber-100">
                <h3 className="text-sm font-bold text-amber-900 mb-3 flex items-center justify-between">
                  <span>Weaknesses (Internal)</span>
                  <span className="text-xs text-amber-700 font-mono">W</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-amber-950">
                  {report.swotAnalysis.weaknesses.map((w, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold">!</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Opportunities */}
              <div className="p-5 bg-blue-50/50 rounded-xl border border-blue-100">
                <h3 className="text-sm font-bold text-blue-900 mb-3 flex items-center justify-between">
                  <span>Opportunities (External)</span>
                  <span className="text-xs text-blue-700 font-mono">O</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-blue-950">
                  {report.swotAnalysis.opportunities.map((o, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-blue-600 font-bold">↗</span>
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Threats */}
              <div className="p-5 bg-rose-50/50 rounded-xl border border-rose-100">
                <h3 className="text-sm font-bold text-rose-900 mb-3 flex items-center justify-between">
                  <span>Threats (External)</span>
                  <span className="text-xs text-rose-700 font-mono">T</span>
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-rose-950">
                  {report.swotAnalysis.threats.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-rose-600 font-bold">✕</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Card 06: Target Users */}
          <section
            id="sec-06"
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-28"
          >
            <div className="border-b border-slate-100 pb-4 mb-5">
              <div className="text-xs font-mono text-indigo-600 font-semibold mb-1">
                06. Audience Segmentation
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Target Users</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Primary Segment
                </h3>
                <p className="text-sm text-slate-800 leading-relaxed font-medium">
                  {report.targetUsersAnalysis.primarySegment}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Secondary Segment
                </h3>
                <p className="text-sm text-slate-800 leading-relaxed font-medium">
                  {report.targetUsersAnalysis.secondarySegment}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="border-t border-slate-200 pt-3">
                <span className="font-semibold text-slate-900 block mb-1">Demographics</span>
                <p className="text-slate-600">{report.targetUsersAnalysis.demographics}</p>
              </div>
              <div className="border-t border-slate-200 pt-3">
                <span className="font-semibold text-slate-900 block mb-1">Psychographics</span>
                <p className="text-slate-600">{report.targetUsersAnalysis.psychographics}</p>
              </div>
              <div className="border-t border-slate-200 pt-3">
                <span className="font-semibold text-slate-900 block mb-1">Context of Use</span>
                <p className="text-slate-600">{report.targetUsersAnalysis.contextOfUse}</p>
              </div>
            </div>
          </section>

          {/* Card 07: User Personas (3 PERSONAS REQUIRED) */}
          <section
            id="sec-07"
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-28"
          >
            <div className="border-b border-slate-100 pb-4 mb-5">
              <div className="text-xs font-mono text-indigo-600 font-semibold mb-1">
                07. User Profiles
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                User Personas (3 Archetypes)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {report.userPersonas.map((persona, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                        {persona.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 leading-tight">
                          {persona.name}
                        </h3>
                        <p className="text-xs text-slate-500">
                          {persona.age} yrs · {persona.occupation}
                        </p>
                      </div>
                    </div>

                    <blockquote className="text-xs italic text-slate-600 bg-white p-3 rounded-lg border border-slate-100 mb-4 leading-relaxed">
                      "{persona.quote}"
                    </blockquote>

                    <div className="space-y-3 text-xs">
                      <div>
                        <span className="font-semibold text-slate-900 block mb-1">Behavior:</span>
                        <p className="text-slate-600 leading-relaxed">{persona.behaviour}</p>
                      </div>

                      <div>
                        <span className="font-semibold text-emerald-800 block mb-1">Goals:</span>
                        <ul className="space-y-1 text-slate-600">
                          {persona.goals.map((g, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-emerald-600">✓</span>
                              <span>{g}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <span className="font-semibold text-rose-800 block mb-1">Frustrations:</span>
                        <ul className="space-y-1 text-slate-600">
                          {persona.frustrations.map((f, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-rose-500">✕</span>
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Card 08: User Journey (TABLE REQUIRED) */}
          <section
            id="sec-08"
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-28"
          >
            <div className="border-b border-slate-100 pb-4 mb-5">
              <div className="text-xs font-mono text-indigo-600 font-semibold mb-1">
                08. Experience Journey
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                User Journey Map (6 Stages)
              </h2>
            </div>

            <div className="overflow-x-auto -mx-6 sm:mx-0">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-100/80 border-y border-slate-200 text-slate-700 font-semibold">
                    <th className="py-3 px-3 sm:px-4">Stage</th>
                    <th className="py-3 px-3 sm:px-4">User Action</th>
                    <th className="py-3 px-3 sm:px-4">Touchpoints</th>
                    <th className="py-3 px-3 sm:px-4">Pain Points</th>
                    <th className="py-3 px-3 sm:px-4">Opportunities</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {report.userJourney.map((uj, i) => (
                    <tr key={i} className="hover:bg-slate-50/60 transition-colors align-top">
                      <td className="py-3.5 px-3 sm:px-4 font-bold text-slate-900 whitespace-nowrap">
                        {uj.stage}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 text-slate-700 min-w-[160px]">
                        {uj.userAction}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 text-slate-600 min-w-[140px]">
                        {uj.touchpoints}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 text-rose-800 bg-rose-50/20 min-w-[150px]">
                        {uj.painPoints}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 text-emerald-800 bg-emerald-50/20 font-medium min-w-[160px]">
                        {uj.opportunities}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Card 09: Customer Pain Points (AT LEAST 10 PAIN POINTS) */}
          <section
            id="sec-09"
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-28"
          >
            <div className="border-b border-slate-100 pb-4 mb-5">
              <div className="text-xs font-mono text-indigo-600 font-semibold mb-1">
                09. Frustration Catalog
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Customer Pain Points ({report.customerPainPoints.length} Identified)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {report.customerPainPoints.map((pp) => {
                const isCritical = pp.severity === 'Critical';
                const isHigh = pp.severity === 'High';
                return (
                  <div
                    key={pp.id}
                    className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="text-xs font-mono text-slate-400 font-semibold">
                        #{pp.id.toString().padStart(2, '0')}
                      </span>
                      <span
                        className={`text-xs font-semibold ${
                          isCritical
                            ? 'text-rose-700'
                            : isHigh
                            ? 'text-amber-700'
                            : 'text-slate-600'
                        }`}
                      >
                        {pp.severity} Severity
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">{pp.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-2">
                      {pp.description}
                    </p>
                    <div className="text-[11px] text-slate-400">
                      Segment: <span className="text-slate-600">{pp.affectedSegment}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Card 10: Proposed Features */}
          <section
            id="sec-10"
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-28"
          >
            <div className="border-b border-slate-100 pb-4 mb-5">
              <div className="text-xs font-mono text-indigo-600 font-semibold mb-1">
                10. Solution Inventory
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Proposed Features</h2>
            </div>

            <div className="space-y-6">
              {/* Must Have */}
              <div>
                <h3 className="text-sm font-bold text-emerald-900 uppercase tracking-wider mb-3">
                  Must Have (Core Foundations)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {report.proposedFeatures.mustHave.map((f, i) => (
                    <div key={i} className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100">
                      <h4 className="text-sm font-bold text-slate-900 mb-1">{f.title}</h4>
                      <p className="text-xs text-slate-600 mb-2 leading-relaxed">{f.description}</p>
                      <p className="text-[11px] text-emerald-800 italic">Why: {f.rationale}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Should Have */}
              <div>
                <h3 className="text-sm font-bold text-blue-900 uppercase tracking-wider mb-3">
                  Should Have (High-Impact Differentiators)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {report.proposedFeatures.shouldHave.map((f, i) => (
                    <div key={i} className="p-4 rounded-xl bg-blue-50/40 border border-blue-100">
                      <h4 className="text-sm font-bold text-slate-900 mb-1">{f.title}</h4>
                      <p className="text-xs text-slate-600 mb-2 leading-relaxed">{f.description}</p>
                      <p className="text-[11px] text-blue-800 italic">Why: {f.rationale}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Could Have & Future */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-bold text-purple-900 uppercase tracking-wider mb-3">
                    Could Have (Enrichments)
                  </h3>
                  <div className="space-y-3">
                    {report.proposedFeatures.couldHave.map((f, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-purple-50/40 border border-purple-100">
                        <h4 className="text-sm font-bold text-slate-900 mb-1">{f.title}</h4>
                        <p className="text-xs text-slate-600 mb-1">{f.description}</p>
                        <p className="text-[11px] text-purple-800 italic">Why: {f.rationale}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">
                    Future (Long-Term Horizon)
                  </h3>
                  <div className="space-y-3">
                    {report.proposedFeatures.future.map((f, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                        <h4 className="text-sm font-bold text-slate-900 mb-1">{f.title}</h4>
                        <p className="text-xs text-slate-600 mb-1">{f.description}</p>
                        <p className="text-[11px] text-slate-500 italic">Why: {f.rationale}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Card 11: RICE Prioritization (TABLE REQUIRED) */}
          <section
            id="sec-11"
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-28"
          >
            <div className="border-b border-slate-100 pb-4 mb-5">
              <div className="text-xs font-mono text-indigo-600 font-semibold mb-1">
                11. Quantitative Scoring
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                RICE Prioritization Matrix
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Formula: RICE Score = (Reach × Impact × Confidence) / Effort
              </p>
            </div>

            <div className="overflow-x-auto -mx-6 sm:mx-0">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-100/80 border-y border-slate-200 text-slate-700 font-semibold">
                    <th className="py-3 px-3 sm:px-4">Feature</th>
                    <th className="py-3 px-3 sm:px-4">Reach</th>
                    <th className="py-3 px-3 sm:px-4">Impact</th>
                    <th className="py-3 px-3 sm:px-4">Confidence</th>
                    <th className="py-3 px-3 sm:px-4">Effort</th>
                    <th className="py-3 px-3 sm:px-4">RICE Score</th>
                    <th className="py-3 px-3 sm:px-4">Calculation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {report.ricePrioritization.map((r, i) => (
                    <tr key={i} className="hover:bg-slate-50/60 transition-colors align-top">
                      <td className="py-3.5 px-3 sm:px-4 font-bold text-slate-900 min-w-[160px]">
                        {r.feature}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 text-slate-600 whitespace-nowrap">
                        {r.reach}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 text-slate-600 whitespace-nowrap">
                        {r.impact}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 text-slate-600 whitespace-nowrap">
                        {r.confidence}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 text-slate-600 whitespace-nowrap">
                        {r.effort}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 font-bold font-mono text-indigo-700 bg-indigo-50/40">
                        {r.riceScore.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 font-mono text-slate-500 text-xs min-w-[180px]">
                        {r.calculation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Card 12: Kano Model */}
          <section
            id="sec-12"
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-28"
          >
            <div className="border-b border-slate-100 pb-4 mb-5">
              <div className="text-xs font-mono text-indigo-600 font-semibold mb-1">
                12. Customer Satisfaction Analysis
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Kano Model</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Basic (Must-Be Needs)
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  Expected table-stakes. Dissatisfaction if missing, neutral if present.
                </p>
                <div className="space-y-3">
                  {report.kanoModel.basic.map((k, idx) => (
                    <div key={idx} className="border-t border-slate-200 pt-2 text-xs">
                      <strong className="text-slate-900 block">{k.feature}</strong>
                      <span className="text-slate-600">{k.explanation}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-blue-50/40 border border-blue-200">
                <div className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-2">
                  Performance (One-Dimensional)
                </div>
                <p className="text-xs text-blue-700 mb-4">
                  Linear satisfaction: the more/faster provided, the happier users are.
                </p>
                <div className="space-y-3">
                  {report.kanoModel.performance.map((k, idx) => (
                    <div key={idx} className="border-t border-blue-200/60 pt-2 text-xs">
                      <strong className="text-blue-950 block">{k.feature}</strong>
                      <span className="text-blue-800">{k.explanation}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 rounded-xl bg-emerald-50/40 border border-emerald-200">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2">
                  Delighters (Attractive Needs)
                </div>
                <p className="text-xs text-emerald-700 mb-4">
                  Unexpected breakthroughs that trigger viral delight and brand loyalty.
                </p>
                <div className="space-y-3">
                  {report.kanoModel.delighters.map((k, idx) => (
                    <div key={idx} className="border-t border-emerald-200/60 pt-2 text-xs">
                      <strong className="text-emerald-950 block">{k.feature}</strong>
                      <span className="text-emerald-800">{k.explanation}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Card 13: MoSCoW Prioritization */}
          <section
            id="sec-13"
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-28"
          >
            <div className="border-b border-slate-100 pb-4 mb-5">
              <div className="text-xs font-mono text-indigo-600 font-semibold mb-1">
                13. Scope Governance
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                MoSCoW Prioritization
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-emerald-50/40 rounded-xl border border-emerald-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-2">
                  Must Have
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {report.moscowPrioritization.mustHave.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-blue-50/40 rounded-xl border border-blue-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-2">
                  Should Have
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {report.moscowPrioritization.shouldHave.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-blue-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-purple-50/40 rounded-xl border border-purple-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-purple-900 mb-2">
                  Could Have
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {report.moscowPrioritization.couldHave.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Won't Have (v1)
                </h3>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {report.moscowPrioritization.wontHave.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-slate-400 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Card 14: PRODUCT REQUIREMENTS DOCUMENT (PRD) */}
          <section
            id="sec-14"
            className="bg-white rounded-2xl border-2 border-indigo-200 p-6 sm:p-8 shadow-sm scroll-mt-28"
          >
            <div className="border-b border-indigo-100 pb-4 mb-6">
              <div className="inline-block px-2.5 py-0.5 rounded text-xs font-mono font-bold uppercase tracking-wider bg-indigo-100 text-indigo-800 mb-1">
                14. Engineering Specification
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Product Requirements Document (PRD)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Development-ready specification with Objectives, User Stories, and Acceptance Criteria.
              </p>
            </div>

            {/* Objective & Goal */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  Product Objective
                </span>
                <p className="text-sm text-slate-800 mt-1 font-medium leading-relaxed">
                  {report.prd.productObjective}
                </p>
              </div>

              <div className="p-4 bg-indigo-50/50 rounded-xl border border-indigo-100">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-700">
                  Business Goal
                </span>
                <p className="text-sm text-indigo-950 mt-1 font-medium leading-relaxed">
                  {report.prd.businessGoal}
                </p>
              </div>
            </div>

            {/* User Stories */}
            <div className="mb-8">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center justify-between">
                <span>User Stories</span>
                <span className="text-xs text-slate-400 font-normal">Format: Role / Want / So That</span>
              </h3>
              <div className="space-y-3">
                {report.prd.userStories.map((story) => (
                  <div
                    key={story.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono font-bold text-indigo-700">{story.id}</span>
                        <span className="text-slate-400">·</span>
                        <span className="font-semibold text-slate-900">As a {story.role}</span>
                      </div>
                      <p className="text-slate-700">
                        I want to <span className="font-medium text-slate-900">{story.want}</span>,
                        so that <span className="text-slate-600">{story.soThat}</span>.
                      </p>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-white border border-slate-200 text-slate-700 shrink-0 self-start sm:self-center">
                      Priority: {story.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Acceptance Criteria */}
            <div className="mb-8">
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center justify-between">
                <span>Acceptance Criteria</span>
                <span className="text-xs text-slate-400 font-normal">Gherkin Syntax</span>
              </h3>
              <div className="space-y-3">
                {report.prd.acceptanceCriteria.map((ac, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5 text-xs sm:text-sm"
                  >
                    <div className="flex items-center gap-2 font-bold text-slate-900 mb-1">
                      <span className="text-indigo-600 font-mono">{ac.storyId}</span>
                      <span>Scenario: {ac.scenario}</span>
                    </div>
                    <p className="text-slate-600 pl-4 border-l-2 border-emerald-400">
                      <strong className="text-emerald-800">Given</strong> {ac.given}
                    </p>
                    <p className="text-slate-600 pl-4 border-l-2 border-blue-400">
                      <strong className="text-blue-800">When</strong> {ac.when}
                    </p>
                    <p className="text-slate-600 pl-4 border-l-2 border-purple-400">
                      <strong className="text-purple-800">Then</strong> {ac.then}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Functional & Non-Functional Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-3">Functional Requirements</h3>
                <div className="space-y-2">
                  {report.prd.functionalRequirements.map((fr) => (
                    <div
                      key={fr.id}
                      className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 text-xs"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono font-bold text-slate-700">{fr.id}</span>
                        <span className="text-slate-500 font-semibold">{fr.category}</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{fr.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-900 mb-3">
                  Non-Functional Requirements
                </h3>
                <div className="space-y-2">
                  {report.prd.nonFunctionalRequirements.map((nfr, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg border border-slate-200 bg-slate-50/50 text-xs"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900">{nfr.category}</span>
                        <span className="text-indigo-700 font-mono">{nfr.standard}</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{nfr.requirement}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dependencies & Risks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
              <div>
                <h4 className="font-bold text-slate-900 mb-2">Technical Dependencies</h4>
                <ul className="space-y-1.5 text-slate-600">
                  {report.prd.dependencies.map((d, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-indigo-600">→</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-2">PRD Risks</h4>
                <ul className="space-y-1.5 text-slate-600">
                  {report.prd.risks.map((r, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-rose-500">!</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Card 15: Technical Architecture */}
          <section
            id="sec-15"
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-28"
          >
            <div className="border-b border-slate-100 pb-4 mb-5">
              <div className="text-xs font-mono text-indigo-600 font-semibold mb-1">
                15. System Architecture
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Technical Architecture
              </h2>
            </div>

            <div className="p-4 bg-slate-900 text-slate-100 rounded-xl mb-6 font-mono text-xs leading-relaxed">
              <span className="text-indigo-400 block font-bold mb-1 uppercase tracking-wider">
                Architectural Flow &amp; Data Pipeline
              </span>
              {report.technicalArchitecture.architecturalOverview}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="font-bold text-slate-900 block mb-1">Frontend</span>
                <p className="text-slate-600">{report.technicalArchitecture.frontend}</p>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="font-bold text-slate-900 block mb-1">Backend</span>
                <p className="text-slate-600">{report.technicalArchitecture.backend}</p>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="font-bold text-slate-900 block mb-1">Database &amp; Cache</span>
                <p className="text-slate-600">{report.technicalArchitecture.database}</p>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="font-bold text-slate-900 block mb-1">AI / ML Model</span>
                <p className="text-slate-600">{report.technicalArchitecture.aiModel}</p>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="font-bold text-slate-900 block mb-1">Cloud Infrastructure</span>
                <p className="text-slate-600">{report.technicalArchitecture.cloud}</p>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50">
                <span className="font-bold text-slate-900 block mb-1">Authentication &amp; Telemetry</span>
                <p className="text-slate-600">
                  {report.technicalArchitecture.authentication} · {report.technicalArchitecture.analytics}
                </p>
              </div>
            </div>
          </section>

          {/* Card 16: Success Metrics (TABLE REQUIRED) */}
          <section
            id="sec-16"
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-28"
          >
            <div className="border-b border-slate-100 pb-4 mb-5">
              <div className="text-xs font-mono text-indigo-600 font-semibold mb-1">
                16. Impact Measurement
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Success Metrics</h2>
            </div>

            {/* North Star Metric Card */}
            <div className="p-5 bg-gradient-to-r from-indigo-900 to-slate-900 text-white rounded-xl mb-6 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-indigo-300 mb-1">
                <Target className="w-4 h-4" />
                <span>North Star Metric</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold mb-1">
                {report.successMetrics.northStarMetric.name}
              </h3>
              <p className="text-sm font-semibold text-emerald-300 mb-2">
                Target: {report.successMetrics.northStarMetric.target}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                {report.successMetrics.northStarMetric.why}
              </p>
            </div>

            <div className="overflow-x-auto -mx-6 sm:mx-0">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-100/80 border-y border-slate-200 text-slate-700 font-semibold">
                    <th className="py-3 px-3 sm:px-4">Metric</th>
                    <th className="py-3 px-3 sm:px-4">Category</th>
                    <th className="py-3 px-3 sm:px-4">Target Benchmark</th>
                    <th className="py-3 px-3 sm:px-4">Tracking Method</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {report.successMetrics.metricsTable.map((m, i) => (
                    <tr key={i} className="hover:bg-slate-50/60 transition-colors align-top">
                      <td className="py-3.5 px-3 sm:px-4 font-bold text-slate-900 min-w-[160px]">
                        {m.metric}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 text-slate-600 whitespace-nowrap">
                        {m.category}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 font-semibold text-indigo-900 bg-indigo-50/30 whitespace-nowrap">
                        {m.targetBenchmark}
                      </td>
                      <td className="py-3.5 px-3 sm:px-4 text-slate-600 min-w-[180px]">
                        {m.trackingMethod}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Card 17: Risk Analysis */}
          <section
            id="sec-17"
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-28"
          >
            <div className="border-b border-slate-100 pb-4 mb-5">
              <div className="text-xs font-mono text-indigo-600 font-semibold mb-1">
                17. Risk Governance
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Risk Analysis &amp; Mitigation
              </h2>
            </div>

            <div className="space-y-4">
              {/* Business Risks */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Business Risks
                </h3>
                <div className="space-y-2">
                  {report.riskAnalysis.businessRisks.map((r, i) => (
                    <div key={i} className="p-3 rounded-lg border border-slate-200 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-slate-900">{r.risk}</span>
                        <span className="text-amber-700 font-semibold shrink-0 ml-2">
                          {r.severity}
                        </span>
                      </div>
                      <p className="text-slate-600">
                        <strong className="text-emerald-700">Mitigation:</strong> {r.mitigation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Risks */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Technical Risks
                </h3>
                <div className="space-y-2">
                  {report.riskAnalysis.technicalRisks.map((r, i) => (
                    <div key={i} className="p-3 rounded-lg border border-slate-200 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-slate-900">{r.risk}</span>
                        <span className="text-rose-700 font-semibold shrink-0 ml-2">
                          {r.severity}
                        </span>
                      </div>
                      <p className="text-slate-600">
                        <strong className="text-emerald-700">Mitigation:</strong> {r.mitigation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Operational & Legal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Operational Risks
                  </h3>
                  <div className="space-y-2">
                    {report.riskAnalysis.operationalRisks.map((r, i) => (
                      <div key={i} className="p-3 rounded-lg border border-slate-200 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-slate-900">{r.risk}</span>
                          <span className="text-amber-700 font-semibold shrink-0 ml-2">
                            {r.severity}
                          </span>
                        </div>
                        <p className="text-slate-600">
                          <strong className="text-emerald-700">Mitigation:</strong> {r.mitigation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                    Legal &amp; Regulatory
                  </h3>
                  <div className="space-y-2">
                    {report.riskAnalysis.legalRisks.map((r, i) => (
                      <div key={i} className="p-3 rounded-lg border border-slate-200 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-slate-900">{r.risk}</span>
                          <span className="text-rose-700 font-semibold shrink-0 ml-2">
                            {r.severity}
                          </span>
                        </div>
                        <p className="text-slate-600">
                          <strong className="text-emerald-700">Mitigation:</strong> {r.mitigation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Card 18: Launch Strategy */}
          <section
            id="sec-18"
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-28"
          >
            <div className="border-b border-slate-100 pb-4 mb-5">
              <div className="text-xs font-mono text-indigo-600 font-semibold mb-1">
                18. Go-To-Market Execution
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">Launch Strategy</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-xs font-mono text-slate-500 font-bold uppercase block mb-1">
                  Alpha Phase ({report.launchStrategy.alpha.duration})
                </span>
                <p className="text-xs font-semibold text-slate-800 mb-2">
                  Cohort: {report.launchStrategy.alpha.cohort}
                </p>
                <ul className="space-y-1 text-xs text-slate-600">
                  {report.launchStrategy.alpha.objectives.map((o, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-indigo-600">•</span>
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-indigo-50/40 rounded-xl border border-indigo-100">
                <span className="text-xs font-mono text-indigo-600 font-bold uppercase block mb-1">
                  Beta Phase ({report.launchStrategy.beta.duration})
                </span>
                <p className="text-xs font-semibold text-indigo-950 mb-2">
                  Cohort: {report.launchStrategy.beta.cohort}
                </p>
                <ul className="space-y-1 text-xs text-slate-600">
                  {report.launchStrategy.beta.objectives.map((o, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-indigo-600">•</span>
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-emerald-50/40 rounded-xl border border-emerald-100">
                <span className="text-xs font-mono text-emerald-700 font-bold uppercase block mb-1">
                  Public Launch (GA)
                </span>
                <p className="text-xs text-slate-700 mb-2 leading-relaxed">
                  {report.launchStrategy.publicLaunch.strategy}
                </p>
                <ul className="space-y-1 text-xs text-slate-600">
                  {report.launchStrategy.publicLaunch.rolloutPhases.map((p, i) => (
                    <li key={i} className="flex items-start gap-1">
                      <span className="text-emerald-600">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs sm:text-sm">
              <div>
                <strong className="text-slate-900 block mb-1.5">Marketing Strategy</strong>
                <ul className="space-y-1 text-slate-600">
                  {report.launchStrategy.marketingStrategy.map((m, i) => (
                    <li key={i}>• {m}</li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className="text-slate-900 block mb-1.5">Pricing Strategy</strong>
                <p className="text-slate-600 leading-relaxed">
                  {report.launchStrategy.pricingStrategy}
                </p>
              </div>

              <div>
                <strong className="text-slate-900 block mb-1.5">GTM Tactics</strong>
                <ul className="space-y-1 text-slate-600">
                  {report.launchStrategy.goTMarketStrategy.map((g, i) => (
                    <li key={i}>• {g}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Card 19: 30/60/90 Day Roadmap (TABLE REQUIRED) */}
          <section
            id="sec-19"
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-28"
          >
            <div className="border-b border-slate-100 pb-4 mb-5">
              <div className="text-xs font-mono text-indigo-600 font-semibold mb-1">
                19. Delivery Timeline
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                30 / 60 / 90 Day Roadmap
              </h2>
            </div>

            <div className="overflow-x-auto -mx-6 sm:mx-0">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-100/80 border-y border-slate-200 text-slate-700 font-semibold">
                    <th className="py-3 px-3 sm:px-4">Phase</th>
                    <th className="py-3 px-3 sm:px-4">Timeframe</th>
                    <th className="py-3 px-3 sm:px-4">Strategic Focus</th>
                    <th className="py-3 px-3 sm:px-4">Key Deliverables</th>
                    <th className="py-3 px-3 sm:px-4">Core Milestone</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[report.roadmap.days30, report.roadmap.days60, report.roadmap.days90].map(
                    (phase, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/60 transition-colors align-top">
                        <td className="py-3.5 px-3 sm:px-4 font-bold text-slate-900 whitespace-nowrap">
                          {phase.phase}
                        </td>
                        <td className="py-3.5 px-3 sm:px-4 font-mono text-indigo-700 whitespace-nowrap">
                          {phase.timeframe}
                        </td>
                        <td className="py-3.5 px-3 sm:px-4 text-slate-700 min-w-[150px]">
                          {phase.focus}
                        </td>
                        <td className="py-3.5 px-3 sm:px-4 text-slate-600 min-w-[200px]">
                          <ul className="space-y-1">
                            {phase.deliverables.map((d, i) => (
                              <li key={i} className="flex items-start gap-1">
                                <span className="text-emerald-600 font-bold">•</span>
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="py-3.5 px-3 sm:px-4 font-medium text-emerald-900 bg-emerald-50/30 min-w-[160px]">
                          {phase.milestones}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Card 20: Product Manager Interview Questions */}
          <section
            id="sec-20"
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs scroll-mt-28"
          >
            <div className="border-b border-slate-100 pb-4 mb-5">
              <div className="text-xs font-mono text-indigo-600 font-semibold mb-1">
                20. PM Interview Mastery
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Product Manager Interview Questions (5 Scenarios)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Targeted PM interview questions for design, metrics, trade-offs, and strategy.
              </p>
            </div>

            <div className="space-y-4">
              {report.pmInterviewQuestions.map((q) => (
                <div
                  key={q.id}
                  className="p-5 rounded-xl border border-slate-200 bg-slate-50/40 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-bold text-indigo-700">
                      Question {q.id}
                    </span>
                    <span className="text-xs font-medium text-slate-500">{q.category}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-3 leading-snug">
                    {q.question}
                  </h3>

                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="p-3 bg-white rounded-lg border border-slate-200/80">
                      <span className="font-semibold text-slate-800 block mb-1">
                        Evaluation Criteria:
                      </span>
                      <p className="text-slate-600 leading-relaxed">{q.evaluationCriteria}</p>
                    </div>

                    <div className="p-3 bg-emerald-50/40 rounded-lg border border-emerald-100">
                      <span className="font-semibold text-emerald-950 block mb-1">
                        Strong Answer Approach:
                      </span>
                      <p className="text-emerald-900 leading-relaxed">{q.sampleAnswerApproach}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Footer Callout */}
          <div className="p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold">Ready to export your product strategy?</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Download the complete PRD in Markdown format or copy it directly into Notion, Linear, or Jira.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-4 py-2 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                {copied ? 'Copied!' : 'Copy to Clipboard'}
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors cursor-pointer"
              >
                Download Markdown (.md)
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
