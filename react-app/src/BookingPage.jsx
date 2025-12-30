import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from './App'
import { useLanguage } from './LanguageContext'
import './styles.css'

export default function BookingPage() {
    const { language } = useLanguage()
    const widgetRef = useRef(null)
    const scriptLoadedRef = useRef(false)

    useEffect(() => {
        // Scroll to top on page load
        window.scrollTo(0, 0)

        // Clean up previous widget if exists
        if (widgetRef.current) {
            widgetRef.current.innerHTML = '<div id="box-pren-xenion"></div>'
        }

        // Remove old scripts and styles
        const oldStyles = document.querySelectorAll('link[href*="box-pren-xenion-css"]')
        const oldScripts = document.querySelectorAll('script[src*="box-pren-xenion.php"]')
        oldStyles.forEach(style => style.remove())
        oldScripts.forEach(script => script.remove())

        // Load Xenion CSS
        const cssLink = document.createElement('link')
        cssLink.rel = 'stylesheet'
        cssLink.href = 'https://my.xenion.it/lestanzedicaterina/pacifik/client/modules/hotels/plugin/bookengine/box-pren-xenion-css.php?idindirizzoanag=1'
        document.head.appendChild(cssLink)

        // Load Xenion Widget Script
        const script = document.createElement('script')
        script.src = `https://my.xenion.it/lestanzedicaterina/pacifik/client/modules/hotels/plugin/bookengine/box-pren-xenion.php?idindirizzoanag=1&dominio=my.xenion.it&url=lestanzedicaterina&includejQuery=1&lang=${language}`
        script.async = true

        script.onload = () => {
            scriptLoadedRef.current = true
        }

        document.body.appendChild(script)

        // Cleanup function
        return () => {
            // Keep the widget loaded, just clean up on language change
        }
    }, [language])

    return (
        <div className="booking-page">
            <Navbar />

            <section className="booking-hero">
                <div className="booking-hero-overlay"></div>
                <div className="booking-hero-content">
                    <h1>{language === 'it' ? 'Prenota il tuo Soggiorno' : 'Book your Stay'}</h1>
                    <p>{language === 'it'
                        ? 'Scegli le date e prenota direttamente la tua suite nel cuore di Firenze'
                        : 'Choose your dates and book your suite directly in the heart of Florence'}</p>
                </div>
            </section>

            <section className="booking-content">
                <div className="container">
                    <div className="booking-widget-container" ref={widgetRef}>
                        <div id="box-pren-xenion"></div>
                    </div>

                    <div className="booking-help">
                        <h3>{language === 'it' ? 'Hai bisogno di aiuto?' : 'Need help?'}</h3>
                        <p>{language === 'it'
                            ? 'Contattaci per qualsiasi domanda'
                            : 'Contact us for any questions'}</p>
                        <div className="booking-contact-row">
                            <a href="tel:+393331992394" className="booking-contact-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                                </svg>
                                <span>{language === 'it' ? 'Chiamaci' : 'Call us'}</span>
                            </a>
                            <a href="mailto:giacomomarretti1997@gmail.com" className="booking-contact-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                    <polyline points="22,6 12,13 2,6"/>
                                </svg>
                                <span>Email</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="booking-footer">
                <div className="container">
                    <Link to="/" className="back-home-btn">
                        {language === 'it' ? '← Torna alla Home' : '← Back to Home'}
                    </Link>
                    <p>© 2025 Le Stanze di Caterina. {language === 'it' ? 'Tutti i diritti riservati.' : 'All rights reserved.'}</p>
                </div>
            </footer>
        </div>
    )
}
