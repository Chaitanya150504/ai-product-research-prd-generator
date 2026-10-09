import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-3xl mx-auto my-8 p-6 bg-white rounded-2xl border border-rose-200 shadow-sm text-center">
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto mb-3">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-1">
            {this.props.fallbackTitle || 'Unable to display this section'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto mb-4">
            An unexpected format was encountered in the generated data.
            {this.state.error && (
              <span className="block mt-1 font-mono text-xs text-rose-700 bg-rose-50 p-2 rounded">
                {this.state.error.message}
              </span>
            )}
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset View</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export class SectionErrorBoundary extends Component<
  { children: ReactNode; sectionTitle?: string },
  { hasError: boolean; error: Error | null }
> {
  public state = { hasError: false, error: null };

  public static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn(`SectionErrorBoundary caught error in [${this.props.sectionTitle}]:`, error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 text-slate-700 my-4">
          <div className="flex items-center gap-2 mb-1.5 text-amber-900 font-semibold text-sm">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{this.props.sectionTitle || 'Section Content Notice'}</span>
          </div>
          <p className="text-xs text-amber-800 leading-relaxed">
            Data for this section was partially formatted. All other sections, the PRD, and export options remain active.
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
