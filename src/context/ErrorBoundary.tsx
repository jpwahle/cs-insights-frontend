import React, { ErrorInfo, ReactElement, useEffect, useState } from 'react';
import { useSnack } from './SnackbarContext';

type State = {
  error: Error | null;
};

type ErrorBoundaryProps = {
  setError(error: State): void;
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, State> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  private promiseRejectionHandler = (event: PromiseRejectionEvent) => {
    this.setState({
      error: event.reason,
    });
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { error: error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(errorInfo.componentStack);

    this.setState({
      error: error,
    });
  }

  componentDidMount() {
    // Add an event listener to the window to catch unhandled promise rejections & stash the error in the state
    window.addEventListener('unhandledrejection', this.promiseRejectionHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.promiseRejectionHandler);
  }

  componentDidUpdate() {
    this.props.setError(this.state);
  }

  render() {
    if (this.state.error) {
      console.error('render', this.state.error);
      return <div>An error has occurred during rendering (or maybe an event)</div>;
    }
    return this.props.children;
  }
}

export function ErrorBoundaryWrapper({ children }: { children: ReactElement | ReactElement[] }) {
  const setSnack = useSnack();
  const [error, setError] = useState<State>({ error: null });

  useEffect(() => {
    if (error.error) {
      setSnack('' + error.error);
    }
  }, [error]);
  return <ErrorBoundary setError={setError}>{children}</ErrorBoundary>;
}
