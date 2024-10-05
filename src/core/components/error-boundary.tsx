import { Component, ComponentType, type PropsWithChildren } from 'react'

export interface ErrorComponentWithMessageProps {
  message?: string
  stack?: string
}

interface ErrorBoundaryProps extends PropsWithChildren {
  fallback: ComponentType<ErrorComponentWithMessageProps>
}

type ErrorBoundaryState = {
  hasError: boolean
  error?: Error
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      let message: string | undefined = undefined
      let stack: string | undefined = undefined
      if (import.meta.env.MODE === 'development' && this.state.hasError && this.state.error) {
        message = this.state.error.message
        stack = this.state.error.stack
      }

      return <this.props.fallback message={message} stack={stack} />
    }

    return this.props.children
  }
}

export { ErrorBoundary }
