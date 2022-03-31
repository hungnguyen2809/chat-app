import React, { Component } from 'react';

type ErrorBoundaryProps = {};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    // console.log(error, errorInfo);
    this.setState({ hasError: true });
  }

  handleReloadPage() {
    window?.location?.reload?.();
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="h-[100vh] bg-slate-50">
          <div className="h-[18%]" />
          <div className="text-center">
            <h4 className="mb-3 text-[20px]">Something went wrong!</h4>
            <button
              onClick={this.handleReloadPage}
              className="bg-red-500 text-white font-bold rounded px-2 py-1 hover:bg-red-600"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}

export default ErrorBoundary;
