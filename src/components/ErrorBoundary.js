import { Component } from 'react';

class ErrorBoundary extends Component {
    constructor() {
        super();
        this.state = {
            hasError: false
        }
    }
    componentDidCatch(error) {
        this.setState({
            hasError: true
        })
    }

    render() {
        if (this.state.hasError) {
            return <p>Something went wrong!</p>;
        }
        return this.props.children; // Because I want to wrap my error boundary component around components  which should be protected by that component
    }
}

export default ErrorBoundary;