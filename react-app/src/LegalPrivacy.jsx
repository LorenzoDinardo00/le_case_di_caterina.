import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Footer } from './App'
import { useLanguage } from './LanguageContext'
import { translations } from './translations'
import './styles.css'

export default function PrivacyPolicy() {
    const { language } = useLanguage()
    const t = translations[language].privacyPolicy

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Navbar />
            <div className="policy-page">
                <div className="container">
                    <h1>{t.title}</h1>
                    <p className="last-updated">{t.lastUpdated}</p>

                    <div className="policy-content">
                        <section>
                            <p>{t.intro}</p>
                        </section>

                        <section>
                            <h2>{t.controller}</h2>
                            <p>{t.controllerText}</p>
                        </section>

                        <section>
                            <h2>{t.purpose}</h2>
                            <p>{t.purposeText}</p>
                        </section>

                        <section>
                            <h2>{t.rights}</h2>
                            <p>{t.rightsText}</p>
                        </section>

                        <section className="booking-note">
                            <h2>{t.bookingNote}</h2>
                            <p>{t.bookingNoteText}</p>
                        </section>
                    </div>

                    <div className="back-link">
                        <Link to="/">{translations[language].roomPage.backHome}</Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
