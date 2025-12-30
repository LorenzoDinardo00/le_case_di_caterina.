import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navbar, Footer } from './App'
import { useLanguage } from './LanguageContext'
import { translations } from './translations'
import './styles.css'

export default function CookiePolicy() {
    const { language } = useLanguage()
    const t = translations[language].cookiePolicy

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Navbar />
            <div className="policy-page">
                <div className="container">
                    <h1>{t.title}</h1>

                    <div className="policy-content">
                        <section>
                            <p>{t.intro}</p>
                        </section>

                        <section>
                            <h2>{t.technical}</h2>
                            <p>{t.technicalText}</p>
                        </section>

                        <section>
                            <h2>{t.analytics}</h2>
                            <p>{t.analyticsText}</p>
                        </section>

                        <section>
                            <h2>{t.management}</h2>
                            <p>{t.managementText}</p>
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
