import React, { Component, ErrorInfo } from 'react';

class BRSRErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('BRSR Analysis Error Boundary caught an error:', error, errorInfo);

    this.setState({
      hasError: true,
      error: error
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-500/10 border border-red-500/30 rounded-3xl p-8 text-center m-auto max-w-2xl">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Something went wrong</h1>
          <p className="text-dimmed mb-4">The BRSR Analysis dashboard encountered an error.</p>
          <div className="bg-navy p-4 rounded-xl border border-white/10">
            <p className="text-sm text-white font-mono">
              {this.state.error && this.state.error.toString()}
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-gold text-navy rounded-lg font-bold hover:bg-gold/80"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export { BRSRErrorBoundary };
