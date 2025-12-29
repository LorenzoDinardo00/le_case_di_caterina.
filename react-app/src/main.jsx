import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './LanguageContext'
import App from './App.jsx'
import GalleryPage from './GalleryPage.jsx'
import RoomPage from './RoomPage.jsx'
import './gallery.css'
import './room.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/galleria" element={<GalleryPage />} />
          <Route path="/stanza/:roomId" element={<RoomPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>,
)
