import React from 'react';
import { Sparkles, FileText, RefreshCw, Download, Copy, Check } from 'lucide-react';

interface HeaderProps {
  hasReport: boolean;
  onNewReport: () => void;
  onLoadSample: () => void;
  onCopy?: () => void;
  onDownload?: () => void;
  copied?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  hasReport,
  onNewReport,
  onLoadSample,
  onCopy,
  onDownload,
  copied,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div
          onClick={onNewReport}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold shadow-sm transition-transform group-hover:scale-105">
            <Sparkles className="w-5 h-5 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight leading-tight flex items-center gap-2">
              AI Product Research &amp; PRD Generator
            </h1>
            <p className="text-xs text-slate-500 hidden sm:block">
              Product Strategy · Market Sizing · Prioritization · PRD
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {!hasReport ? (
            <button
              onClick={onLoadSample}
              type="button"
              className="px-3.5 py-1.5 text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 hover:text-slate-900 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-slate-500" />
              <span>Load Sample (Zomato)</span>
            </button>
          ) : (
            <>
              <button
                onClick={onNewReport}
                type="button"
                className="px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Generate Another Report"
              >
                <RefreshCw className="w-4 h-4 text-slate-500" />
                <span className="hidden sm:inline">New Report</span>
              </button>

              {onCopy && (
                <button
                  onClick={onCopy}
                  type="button"
                  className="px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Copy Report as Markdown"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700 hidden sm:inline">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-500" />
                      <span className="hidden sm:inline">Copy</span>
                    </>
                  )}
                </button>
              )}

              {onDownload && (
                <button
                  onClick={onDownload}
                  type="button"
                  className="px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Download Report as Markdown"
                >
                  <Download className="w-4 h-4 text-slate-200" />
                  <span>Download</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};
