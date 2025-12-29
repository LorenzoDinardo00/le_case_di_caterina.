import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from './App'
import { useLanguage } from './LanguageContext'
import { translations } from './translations'

// Gallery images data
const galleryImages = [
    { src: '/img/IMG_9012.jpg', alt: 'Vista Duomo', category: 'esterno' },
    { src: '/img/IMG_7808.jpg', alt: 'Camera Spagnola', category: 'camere' },
    { src: '/img/IMG_7814.jpg', alt: 'Camera Italiana', category: 'camere' },
    { src: '/img/IMG_0714.JPG', alt: 'Corridoio Storico', category: 'interni' },
    { src: '/img/IMG_0719.JPG', alt: 'Dettagli Architettonici', category: 'interni' },
    { src: '/img/IMG_0720.JPG', alt: 'Ambiente Elegante', category: 'interni' },
    { src: '/img/IMG_0721.JPG', alt: 'Arredamento di Pregio', category: 'interni' },
    { src: '/img/IMG_0724.JPG', alt: 'Vista Interna', category: 'interni' },
    { src: '/img/IMG_0733.JPG', alt: 'Camera', category: 'camere' },
    { src: '/img/IMG_0734.JPG', alt: 'Suite', category: 'camere' },
    { src: '/img/IMG_0735.JPG', alt: 'Dettaglio Camera', category: 'camere' },
    { src: '/img/IMG_0736.JPG', alt: 'Ambiente', category: 'interni' },
    { src: '/img/IMG_0737.JPG', alt: 'Stanza', category: 'camere' },
    { src: '/img/IMG_0745.JPG', alt: 'Camera', category: 'camere' },
    { src: '/img/IMG_0748.JPG', alt: 'Vista', category: 'interni' },
    { src: '/img/IMG_0749.JPG', alt: 'Suite', category: 'camere' },
    { src: '/img/IMG_0751.JPG', alt: 'Dettaglio', category: 'interni' },
    { src: '/img/IMG_0754.JPG', alt: 'Ambiente', category: 'interni' },
    { src: '/img/IMG_7996.jpg', alt: 'Interno', category: 'interni' },
    { src: '/img/IMG_7997.jpg', alt: 'Dettaglio', category: 'interni' },
    { src: '/img/IMG_7797.jpg', alt: 'Camera', category: 'camere' },
    { src: '/img/IMG_7798.jpg', alt: 'Suite', category: 'camere' },
    { src: '/img/IMG_7799.jpg', alt: 'Dettaglio', category: 'camere' },
    { src: '/img/IMG_7800.jpg', alt: 'Vista Camera', category: 'camere' },
    { src: '/img/IMG_7803.jpg', alt: 'Ambiente', category: 'interni' },
    { src: '/img/IMG_7804.jpg', alt: 'Camera', category: 'camere' },
    { src: '/img/IMG_7805.jpg', alt: 'Suite', category: 'camere' },
    { src: '/img/IMG_7806.jpg', alt: 'Dettaglio', category: 'camere' },
    { src: '/img/IMG_7812.jpg', alt: 'Camera Francese', category: 'camere' },
    { src: '/img/IMG_7815.jpg', alt: 'Suite', category: 'camere' },
    { src: '/img/IMG_7816.jpg', alt: 'Dettaglio', category: 'camere' }
]

// Lightbox Component
function Lightbox({ image, onClose, onPrev, onNext }) {
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
        <div className="lightbox" onClick={onClose}>
            <button className="lightbox-close" onClick={onClose}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 6L6 18M6 6l12 12" />
                </svg>
            </button>

            <button className="lightbox-nav prev" onClick={(e) => { e.stopPropagation(); onPrev() }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
            </button>

            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                <img src={image.src} alt={image.alt} />
                <p className="lightbox-caption">{image.alt}</p>
            </div>

            <button className="lightbox-nav next" onClick={(e) => { e.stopPropagation(); onNext() }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </button>
        </div>
    )
}

// Gallery Page Component
function GalleryPage() {
    const [selectedImage, setSelectedImage] = useState(null)
    const [selectedCategory, setSelectedCategory] = useState('tutti')
    const [loadedImages, setLoadedImages] = useState([])
    const { language } = useLanguage()
    const t = translations[language]

    // Scroll to top when page loads
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const categories = language === 'it' 
        ? [
            { id: 'tutti', label: 'Tutti' },
            { id: 'camere', label: 'Camere' },
            { id: 'interni', label: 'Interni' },
            { id: 'esterno', label: 'Esterno' }
          ]
        : [
            { id: 'tutti', label: 'All' },
            { id: 'camere', label: 'Rooms' },
            { id: 'interni', label: 'Interiors' },
            { id: 'esterno', label: 'Exterior' }
          ]

    const filteredImages = selectedCategory === 'tutti'
        ? galleryImages
        : galleryImages.filter(img => img.category === selectedCategory)

    const currentIndex = filteredImages.findIndex(img => img.src === selectedImage?.src)

    const handlePrev = () => {
        const newIndex = currentIndex === 0 ? filteredImages.length - 1 : currentIndex - 1
        setSelectedImage(filteredImages[newIndex])
    }

    const handleNext = () => {
        const newIndex = currentIndex === filteredImages.length - 1 ? 0 : currentIndex + 1
        setSelectedImage(filteredImages[newIndex])
    }

    const handleImageLoad = (src) => {
        setLoadedImages(prev => [...prev, src])
    }

    const ctaTitle = language === 'it' ? 'Prenota il Tuo Soggiorno' : 'Book Your Stay'
    const ctaDesc = language === 'it' 
        ? "Vieni a vivere l'esperienza di ospitalità che solo Le Stanze di Caterina può offrire"
        : 'Come and experience the hospitality that only Le Stanze di Caterina can offer'
    const ctaButton = language === 'it' ? 'Contattaci' : 'Contact Us'

    return (
        <div className="gallery-page">
            <Navbar />
            {/* Hero Header */}
            <header className="gallery-hero">
                <div className="gallery-hero-bg" style={{ backgroundImage: "url('/img/IMG_9012.jpg')" }}></div>
                <div className="gallery-hero-overlay"></div>
                <div className="gallery-hero-content">
                    <span className="gallery-label">{t.gallery.label}</span>
                    <h1>{t.gallery.title}</h1>
                    <p>{t.gallery.description}</p>
                </div>
            </header>

            {/* Filter Categories */}
            <section className="gallery-filters">
                <div className="container">
                    <div className="filter-buttons">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(cat.id)}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Masonry Gallery Grid */}
            <section className="gallery-masonry">
                <div className="container">
                    <div className="masonry-grid">
                        {filteredImages.map((image, index) => (
                            <div
                                key={index}
                                className={`masonry-item ${loadedImages.includes(image.src) ? 'loaded' : ''}`}
                                style={{ animationDelay: `${index * 0.08}s` }}
                                onClick={() => setSelectedImage(image)}
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    loading="lazy"
                                    onLoad={() => handleImageLoad(image.src)}
                                />
                                <div className="masonry-overlay">
                                    <span className="masonry-caption">{image.alt}</span>
                                    <span className="masonry-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <circle cx="11" cy="11" r="8" />
                                            <path d="M21 21l-4.35-4.35" />
                                            <path d="M11 8v6M8 11h6" />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="gallery-cta">
                <div className="container">
                    <h2>{ctaTitle}</h2>
                    <p>{ctaDesc}</p>
                    <Link to="/#contact" className="btn-gallery-cta">{ctaButton}</Link>
                </div>
            </section>

            {/* Simple Footer */}
            <footer className="gallery-footer">
                <p>{t.footer.rights}</p>
                <Link to="/">{t.gallery.backHome}</Link>
            </footer>

            {/* Lightbox */}
            {selectedImage && (
                <Lightbox
                    image={selectedImage}
                    onClose={() => setSelectedImage(null)}
                    onPrev={handlePrev}
                    onNext={handleNext}
                />
            )}
        </div>
    )
}

export default GalleryPage
export { galleryImages }
