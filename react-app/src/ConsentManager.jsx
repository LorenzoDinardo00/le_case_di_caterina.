import { createContext, useState, useContext, useEffect } from 'react'

const CookieConsentContext = createContext()

// Safe localStorage helpers that handle blocked storage (e.g., Brave browser)
const safeGetItem = (key) => {
    try {
        return localStorage.getItem(key)
    } catch (e) {
        // localStorage is blocked or unavailable
        console.warn('localStorage is not available:', e.message)
        return null
    }
}

const safeSetItem = (key, value) => {
    try {
        localStorage.setItem(key, value)
        return true
    } catch (e) {
        // localStorage is blocked or unavailable
        console.warn('localStorage is not available:', e.message)
        return false
    }
}

export function CookieConsentProvider({ children }) {
    const [consent, setConsent] = useState({
        necessary: true,
        analytics: false
    })

    // Load consent from localStorage on mount
    useEffect(() => {
        try {
            const savedConsent = safeGetItem('cookieConsent')
            if (savedConsent) {
                const parsed = JSON.parse(savedConsent)
                setConsent(parsed)
            }
        } catch (e) {
            // Invalid format or storage blocked, use default
            console.warn('Could not load cookie consent:', e.message)
        }

        // Listen for consent changes from CookieBanner
        const handleConsentChange = (event) => {
            if (event.detail) {
                setConsent(event.detail)
            }
        }

        window.addEventListener('cookieConsentChanged', handleConsentChange)
        return () => window.removeEventListener('cookieConsentChanged', handleConsentChange)
    }, [])

    const updateConsent = (newConsent) => {
        setConsent(newConsent)
        safeSetItem('cookieConsent', JSON.stringify(newConsent))
        // Dispatch event for other components
        try {
            window.dispatchEvent(new CustomEvent('cookieConsentChanged', { detail: newConsent }))
        } catch (e) {
            console.warn('Could not dispatch consent event:', e.message)
        }
    }

    const hasAnalyticsConsent = consent.analytics === true

    return (
        <CookieConsentContext.Provider value={{ consent, updateConsent, hasAnalyticsConsent }}>
            {children}
        </CookieConsentContext.Provider>
    )
}

export function useCookieConsent() {
    const context = useContext(CookieConsentContext)
    if (!context) {
        // Return default values instead of throwing to prevent app crash
        return {
            consent: { necessary: true, analytics: false },
            updateConsent: () => {},
            hasAnalyticsConsent: false
        }
    }
    return context
}
