import { useEffect } from 'react'
import { useLanguage } from './LanguageContext'

export default function BookingPage() {
    const { language } = useLanguage()

    useEffect(() => {
        // Redirect directly to Xenion booking engine based on language
        const xenionUrl = language === 'en'
            ? 'https://my.xenion.it/lestanzedicaterina/paginaprenotazione?idstructure=1&lang=en'
            : 'https://my.xenion.it/lestanzedicaterina/paginaprenotazione?idstructure=1&lang=it'

        // Redirect to Xenion booking page
        window.location.href = xenionUrl
    }, [language])

    // Show a simple loading message while redirecting
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: '#FAF6F1',
            fontFamily: 'Montserrat, sans-serif',
            color: '#2C2421'
        }}>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2rem', marginBottom: '1rem' }}>
                    {language === 'it' ? 'Reindirizzamento...' : 'Redirecting...'}
                </h1>
                <p>{language === 'it'
                    ? 'Ti stiamo portando alla pagina di prenotazione'
                    : 'Taking you to the booking page'}</p>
            </div>
        </div>
    )
}
