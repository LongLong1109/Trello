import { Component, ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo })
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <div>Something went wrong.</div>
          {this.state.error && (
            <>
              <h2>Error Details:</h2>
              <p>{this.state.error.toString()}</p>
              {this.state.errorInfo && <details>{this.state.errorInfo.componentStack}</details>}
            </>
          )}
        </>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
