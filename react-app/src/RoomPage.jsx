import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Navbar } from './App'
import { useLanguage } from './LanguageContext'
import { translations } from './translations'

// Room data with images only (text comes from translations)
const roomsData = {
    'camera-spagnola': {
        id: 'camera-spagnola',
        key: 'spagnola',
        mainImage: '/img/Camera Spagnola/IMG_7808.jpg',
        images: [
            '/img/Camera Spagnola/IMG_7808.jpg',
            '/img/Camera Spagnola/IMG_7806.jpg',
            '/img/Camera Spagnola/IMG_7805.jpg',
            '/img/Camera Spagnola/IMG_7804.jpg',
            '/img/Camera Spagnola/IMG_7803.jpg',
            '/img/Camera Spagnola/IMG_0719.JPG',
            '/img/Camera Spagnola/IMG_0720.JPG',
            '/img/Camera Spagnola/IMG_0721.JPG',
            '/img/Camera Spagnola/IMG_0724.JPG'
        ],
        guests: 2,
        bedrooms: 1,
        beds: 1,
        bathrooms: 1,
        size: 35,
        price: 180
    },
    'camera-italiana': {
        id: 'camera-italiana',
        key: 'italiana',
        mainImage: '/img/Camera Italiana/IMG_7814.jpg',
        images: [
            '/img/Camera Italiana/IMG_7814.jpg',
            '/img/Camera Italiana/IMG_7815.jpg',
            '/img/Camera Italiana/IMG_7816.jpg',
            '/img/Camera Italiana/IMG_7812.jpg',
            '/img/Camera Italiana/IMG_0733.JPG',
            '/img/Camera Italiana/IMG_0734.JPG',
            '/img/Camera Italiana/IMG_0735.JPG',
            '/img/Camera Italiana/IMG_0736.JPG',
            '/img/Camera Italiana/IMG_0737.JPG'
        ],
        guests: 2,
        bedrooms: 1,
        beds: 1,
        bathrooms: 1,
        size: 30,
        price: 150
    },
    'camera-francese': {
        id: 'camera-francese',
        key: 'francese',
        mainImage: '/img/Camera Francese/IMG_7798.jpg',
        images: [
            '/img/Camera Francese/IMG_7798.jpg',
            '/img/Camera Francese/IMG_7797.jpg',
            '/img/Camera Francese/IMG_7799.jpg',
            '/img/Camera Francese/IMG_7800.jpg',
            '/img/Camera Francese/IMG_7996.jpg',
            '/img/Camera Francese/IMG_7997.jpg'
        ],
        guests: 2,
        bedrooms: 1,
        beds: 1,
        bathrooms: 1,
        size: 28,
        price: 140
    }
}

// Icon components for highlights
function HighlightIcon({ type }) {
    const icons = {
        sparkle: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6L5.6 18.4" /></svg>,
        crown: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 17l3-7 4 4 3-9 3 9 4-4 3 7H2zM2 17v3h20v-3" /></svg>,
        view: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3" /><path d="M2 12s4-8 10-8 10 8 10 8-4 8-10 8-10-8-10-8z" /></svg>,
        bath: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12h16a1 1 0 011 1v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3a1 1 0 011-1zM6 12V5a2 2 0 012-2h1a2 2 0 012 2" /></svg>,
        art: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>,
        design: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" /></svg>,
        quiet: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 9h.01M15 9h.01M8 14s1.5 2 4 2 4-2 4-2" /><circle cx="12" cy="12" r="10" /></svg>,
        history: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 21h18M5 21V7l8-4 8 4v14M9 21v-6h6v6" /></svg>,
        fabric: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.5 7.5L12 12 3.5 7.5M12 12v9.5" /><path d="M3.5 7.5v9l8.5 5 8.5-5v-9l-8.5-5-8.5 5z" /></svg>,
        location: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
    }
    return icons[type] || icons.sparkle
}

// Image Gallery Component
function ImageGallery({ images, title, onOpenLightbox, showAllPhotosText }) {
    return (
        <div className="room-gallery">
            <div className="room-gallery-grid">
                <div className="room-gallery-main" onClick={() => onOpenLightbox(0)}>
                    <img src={images[0]} alt={title} />
                    <div className="gallery-overlay-hint">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="M21 15l-5-5L5 21" />
                        </svg>
                    </div>
                </div>
                <div className="room-gallery-secondary">
                    {images.slice(1, 5).map((img, index) => (
                        <div key={index} className="room-gallery-thumb" onClick={() => onOpenLightbox(index + 1)}>
                            <img src={img} alt={`${title} ${index + 2}`} />
                            {index === 3 && images.length > 5 && (
                                <div className="gallery-more">
                                    <span>+{images.length - 5}</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <button className="btn-show-all-photos" onClick={() => onOpenLightbox(0)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                </svg>
                {showAllPhotosText}
            </button>
        </div>
    )
}

// Lightbox Component
function RoomLightbox({ images, currentIndex, onClose, onPrev, onNext }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose()
            if (e.key === 'ArrowLeft') onPrev()
            if (e.key === 'ArrowRight') onNext()
        }
        document.addEventListener('keydown', handleKeyDown)
        document.body.style.overflow = 'hidden'

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = ''
        }
    }, [onClose, onPrev, onNext])

    return (
        <div className="room-lightbox" onClick={onClose}>
            <div className="room-lightbox-header">
                <span className="lightbox-counter">{currentIndex + 1} / {images.length}</span>
                <button className="lightbox-close-btn" onClick={onClose}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <button className="room-lightbox-nav prev" onClick={(e) => { e.stopPropagation(); onPrev() }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
            </button>

            <div className="room-lightbox-content" onClick={(e) => e.stopPropagation()}>
                <img src={images[currentIndex]} alt={`Foto ${currentIndex + 1}`} />
            </div>

            <button className="room-lightbox-nav next" onClick={(e) => { e.stopPropagation(); onNext() }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </button>
        </div>
    )
}


// Main Room Page Component
function RoomPage() {
    const { roomId } = useParams()
    const navigate = useNavigate()
    const room = roomsData[roomId]
    const { language } = useLanguage()
    const t = translations[language]

    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [lightboxIndex, setLightboxIndex] = useState(0)

    // Scroll to top when page loads
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [roomId])

    // If room not found, redirect to home
    useEffect(() => {
        if (!room) {
            navigate('/')
        }
    }, [room, navigate])

    if (!room) return null

    // Get translated content for this room
    const roomContent = t.roomPage[room.key]

    const openLightbox = (index) => {
        setLightboxIndex(index)
        setLightboxOpen(true)
    }

    const closeLightbox = () => setLightboxOpen(false)

    const prevImage = () => {
        setLightboxIndex(prev => prev === 0 ? room.images.length - 1 : prev - 1)
    }

    const nextImage = () => {
        setLightboxIndex(prev => prev === room.images.length - 1 ? 0 : prev + 1)
    }

    // Get other rooms with translated titles
    const getOtherRooms = () => {
        return Object.values(roomsData)
            .filter(r => r.id !== room.id)
            .map(r => ({
                ...r,
                title: t.roomPage[r.key].title,
                tagline: t.roomPage[r.key].tagline
            }))
    }

    return (
        <div className="room-page">
            <Navbar />

            {/* Image Gallery */}
            <ImageGallery
                images={room.images}
                title={roomContent.title}
                onOpenLightbox={openLightbox}
                showAllPhotosText={t.roomPage.showAllPhotos}
            />

            {/* Main Content */}
            <div className="room-content">
                <div className="room-main">
                    {/* Header */}
                    <div className="room-header">
                        <div className="room-header-top">
                            <div className="room-header-info">
                                <h1>{roomContent.title}</h1>
                                <p className="room-tagline">{roomContent.tagline}</p>
                                <div className="room-meta">
                                    <span className="room-location">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                            <circle cx="12" cy="10" r="3" />
                                        </svg>
                                        Firenze, Toscana, Italia
                                    </span>
                                </div>
                            </div>
                            <Link to="/#contact" className="btn-book-simple">
                                {t.roomPage.bookNow}
                            </Link>
                        </div>
                    </div>

                    <div className="room-divider"></div>

                    {/* Quick Info */}
                    <div className="room-quick-info">
                        <div className="host-info">
                            <div className="host-avatar">
                                <span>C</span>
                            </div>
                            <div className="host-details">
                                <h3>{t.roomPage.hostedBy}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="room-divider"></div>

                    {/* Description */}
                    <div className="room-description">
                        <h2>{t.roomPage.aboutPlace}</h2>
                        <p>{roomContent.description}</p>
                    </div>

                    <div className="room-divider"></div>

                    {/* Amenities */}
                    <div className="room-amenities-section">
                        <h2>{t.roomPage.amenitiesTitle}</h2>
                        <div className="amenities-grid">
                            <div className="amenity-category">
                                <h4>{t.roomPage.amenitiesCategory}</h4>
                                <ul>
                                    {t.roomPage.amenities.map((item, itemIndex) => (
                                        <li key={itemIndex}>
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M20 6L9 17l-5-5" />
                                            </svg>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="room-divider"></div>

                    {/* Location */}
                    <div className="room-location-section">
                        <h2>{t.roomPage.locationTitle}</h2>
                        <p>{t.roomPage.locationDesc}</p>
                        <div className="location-map-container">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2881.0876543209876!2d11.2558136!3d43.7731313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132a5403bba4a5c1%3A0x5c7b0e8b3e8f1234!2sDuomo%20di%20Firenze!5e0!3m2!1sit!2sit!4v1234567890123!5m2!1sit!2sit"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </div>
                </div>

            </div>

            {/* Other Rooms */}
            <section className="other-rooms">
                <div className="container">
                    <h2>{t.roomPage.otherRooms}</h2>
                    <div className="other-rooms-grid">
                        {getOtherRooms().map(otherRoom => (
                            <Link key={otherRoom.id} to={`/stanza/${otherRoom.id}`} className="other-room-card">
                                <div className="other-room-image">
                                    <img src={otherRoom.mainImage} alt={otherRoom.title} />
                                </div>
                                <div className="other-room-info">
                                    <h3>{otherRoom.title}</h3>
                                    <p>{otherRoom.tagline}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="room-footer">
                <div className="container">
                    <p>{t.footer.rights}</p>
                    <Link to="/">{t.roomPage.backHome}</Link>
                </div>
            </footer>

            {/* Lightbox */}
            {lightboxOpen && (
                <RoomLightbox
                    images={room.images}
                    currentIndex={lightboxIndex}
                    onClose={closeLightbox}
                    onPrev={prevImage}
                    onNext={nextImage}
                />
            )}
        </div>
    )
}

export default RoomPage
export { roomsData }
