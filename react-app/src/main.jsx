import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './LanguageContext'
import { CookieConsentProvider } from './ConsentManager'
import ErrorBoundary from './ErrorBoundary'
import App from './App.jsx'
import GalleryPage from './GalleryPage.jsx'
import RoomPage from './RoomPage.jsx'
import BookingPage from './BookingPage.jsx'
import PrivacyPolicy from './LegalPrivacy.jsx'
import CookiePolicy from './LegalCookies.jsx'
import './gallery.css'
import './room.css'

// Polyfill localStorage if it's blocked
if (typeof window !== 'undefined') {
  try {
    localStorage.setItem('test', 'test')
    localStorage.removeItem('test')
  } catch (e) {
    // localStorage is blocked, create a memory-only polyfill
    console.warn('localStorage is blocked, using in-memory storage')
    const memoryStorage = {}
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: (key) => memoryStorage[key] || null,
        setItem: (key, value) => { memoryStorage[key] = String(value) },
        removeItem: (key) => { delete memoryStorage[key] },
        clear: () => { Object.keys(memoryStorage).forEach(k => delete memoryStorage[k]) },
        get length() { return Object.keys(memoryStorage).length },
        key: (index) => Object.keys(memoryStorage)[index] || null
      },
      writable: false
    })
  }
}

// Wrap the entire app initialization in try-catch for maximum safety
try {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ErrorBoundary>
        <LanguageProvider>
          <CookieConsentProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/galleria" element={<GalleryPage />} />
                <Route path="/stanza/:roomId" element={<RoomPage />} />
                <Route path="/prenota" element={<BookingPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
              </Routes>
            </BrowserRouter>
          </CookieConsentProvider>
        </LanguageProvider>
      </ErrorBoundary>
    </StrictMode>,
  )
} catch (error) {
  console.error('Failed to initialize app:', error)
  // Show a basic fallback page if React fails to initialize
  document.getElementById('root').innerHTML = `
    <div style="min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: #FAF6F1; font-family: Georgia, serif; padding: 20px; text-align: center;">
      <h1 style="color: #6B2D35; margin-bottom: 20px;">Le Stanze di Caterina</h1>
      <p style="color: #5A4F4A; margin-bottom: 30px; max-width: 500px;">Si è verificato un errore durante il caricamento del sito. Per favore ricarica la pagina o contattaci direttamente.</p>
      <p style="color: #5A4F4A; margin-bottom: 10px;"><strong>Email:</strong> giacomomarretti1997@gmail.com</p>
      <p style="color: #5A4F4A; margin-bottom: 30px;"><strong>Tel:</strong> +39 333 199 2394</p>
      <button onclick="window.location.reload()" style="padding: 12px 24px; background-color: #6B2D35; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px;">Ricarica la pagina</button>
    </div>
  `
}
