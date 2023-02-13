import React, { Component, ErrorInfo, ReactNode } from "react";
import ErrorBoundryPage from "./ErrorBoundryPage";
import ErrorLoadingPage from "./ErrorLoadingPage";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  loading?: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    loading: false
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public renderLoading() {
    this.setState({ loading:true })
    setTimeout(() =>{
        this.setState({ hasError: false })
        this.setState({ loading:false })
    },1000)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <>
            {
                this.state.loading ?  <ErrorLoadingPage/> :  <ErrorBoundryPage onRetry={() => this.renderLoading() }/>
            }
        </>
        )
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
