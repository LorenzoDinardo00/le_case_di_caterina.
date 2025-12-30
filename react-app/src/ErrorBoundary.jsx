import { Component } from 'react'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        console.error('App Error:', error, errorInfo)
    }

    render() {
        if (this.state.hasError) {
            // Fallback UI
            return (
                <div style={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#FAF6F1',
                    fontFamily: 'Georgia, serif',
                    padding: '20px',
                    textAlign: 'center'
                }}>
                    <h1 style={{ color: '#6B2D35', marginBottom: '20px' }}>
                        Le Stanze di Caterina
                    </h1>
                    <p style={{ color: '#5A4F4A', marginBottom: '30px' }}>
                        Per visualizzare correttamente il sito, disabilita il blocco dei contenuti o aggiungi questo sito alle eccezioni.
                    </p>
                    <button 
                        onClick={() => window.location.reload()}
                        style={{
                            padding: '12px 24px',
                            backgroundColor: '#6B2D35',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontFamily: 'inherit'
                        }}
                    >
                        Ricarica la pagina
                    </button>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary


