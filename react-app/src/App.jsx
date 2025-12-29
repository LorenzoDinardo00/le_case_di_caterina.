import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import { useLanguage } from './LanguageContext'
import { translations } from './translations'
import './styles.css'

// Navbar Component
function Navbar() {
  const [scrollState, setScrollState] = useState('')
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHomePage = location.pathname === '/'
  const { language, toggleLanguage } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroHeight = document.querySelector('.hero')?.offsetHeight ||
        document.querySelector('.gallery-hero')?.offsetHeight || 700

      if (scrollY > heroHeight * 0.7) {
        setScrollState('scrolled')
      } else if (scrollY > 50) {
        setScrollState('scrolled-light')
      } else {
        setScrollState('')
      }

      // Highlight active section only on homepage
      if (isHomePage) {
        const sections = document.querySelectorAll('section[id]')
        const headerOffset = 150

        sections.forEach(section => {
          const sectionTop = section.offsetTop - headerOffset
          const sectionHeight = section.offsetHeight
          const sectionId = section.getAttribute('id')

          if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            setActiveSection(sectionId)
          }
        })
      }
    }

    let scrollTimeout
    const throttledScroll = () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          handleScroll()
          scrollTimeout = null
        }, 10)
      }
    }

    window.addEventListener('scroll', throttledScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', throttledScroll)
  }, [isHomePage])

  const handleNavClick = (e, targetId) => {
    e.preventDefault()

    // Close mobile menu first
    setMobileMenuOpen(false)
    document.body.style.overflow = ''

    // If not on homepage, navigate to homepage with anchor
    if (!isHomePage) {
      navigate('/' + targetId)
      return
    }

    // For home, scroll to top
    if (targetId === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    // Simple scroll with fixed offset (navbar height ~70px + some padding)
    const target = document.querySelector(targetId)
    if (target) {
      const navbarHeight = 80
      const targetPosition = target.offsetTop - navbarHeight
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : ''
  }

  const closeMobileMenu = () => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false)
      document.body.style.overflow = ''
    }
  }

  // Close menu on touch scroll or mouse wheel
  useEffect(() => {
    let touchStartY = 0

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY
    }

    const handleTouchMove = (e) => {
      if (mobileMenuOpen) {
        const touchDiff = Math.abs(e.touches[0].clientY - touchStartY)
        if (touchDiff > 30) { // Threshold for scroll detection
          closeMobileMenu()
        }
      }
    }

    const handleWheel = () => {
      if (mobileMenuOpen) {
        closeMobileMenu()
      }
    }

    if (mobileMenuOpen) {
      document.addEventListener('touchstart', handleTouchStart, { passive: true })
      document.addEventListener('touchmove', handleTouchMove, { passive: true })
      document.addEventListener('wheel', handleWheel, { passive: true })
    }

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('wheel', handleWheel)
    }
  }, [mobileMenuOpen])

  // All navigation links for mobile menu
  const allNavLinks = [
    { href: '#home', label: t.nav.home, id: 'home' },
    { href: '#about', label: t.nav.about, id: 'about' },
    { href: '#rooms', label: t.nav.rooms, id: 'rooms' },
    { href: '#gallery', label: t.nav.gallery, id: 'gallery' },
    { href: '#location', label: t.nav.location, id: 'location' },
    { href: '#contact', label: t.nav.contact, id: 'contact' }
  ]

  return (
    <nav className={`navbar ${scrollState}`}>
      <div className="nav-container">
        {/* Desktop Left Navigation */}
        <ul className="nav-links nav-left">
          <li><a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={(e) => handleNavClick(e, '#home')}>{t.nav.home}</a></li>
          <li><a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={(e) => handleNavClick(e, '#about')}>{t.nav.about}</a></li>
          <li><a href="#rooms" className={activeSection === 'rooms' ? 'active' : ''} onClick={(e) => handleNavClick(e, '#rooms')}>{t.nav.rooms}</a></li>
        </ul>

        <a href="#home" className="logo" onClick={(e) => handleNavClick(e, '#home')}>
          <img src="/img/logo.png" alt="Le Stanze di Caterina" className="logo-img" />
        </a>

        {/* Desktop Right Navigation + Mobile Full Menu */}
        <ul
          className={`nav-links nav-right ${mobileMenuOpen ? 'active' : ''}`}
          onClick={closeMobileMenu} /* Close when clicking on overlay background */
        >
          {/* On mobile, show all links; on desktop, show only right-side links */}
          {allNavLinks.map((link, index) => (
            <li key={index} className="mobile-nav-item" onClick={(e) => e.stopPropagation()}>
              <a
                href={link.href}
                className={activeSection === link.id ? 'active' : ''}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Language Toggle Button */}
        <button className="lang-toggle" onClick={toggleLanguage} aria-label="Change language">
          {language === 'it' ? 'EN' : 'IT'}
        </button>

        <button className={`nav-toggle ${mobileMenuOpen ? 'active' : ''}`} aria-label="Menu" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}


// Hero Section Component
function HeroSection() {
  const heroRef = useRef(null)
  const { language } = useLanguage()
  const t = translations[language]

  // Parallax effect
  useEffect(() => {
    const heroContent = document.querySelector('.hero-content')
    const handleScroll = () => {
      if (window.innerWidth > 768 && heroRef.current) {
        const scrolled = window.pageYOffset
        const heroHeight = heroRef.current.offsetHeight

        if (scrolled < heroHeight && heroContent) {
          heroContent.style.transform = `translateY(${scrolled * 0.3}px)`
          heroContent.style.opacity = 1 - (scrolled / heroHeight) * 0.5
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div
        className="hero-background"
        style={{ backgroundImage: `url('/img/IMG_0714.JPG')` }}
      ></div>
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>{t.hero.title}</h1>
        <p className="hero-subtitle">{t.hero.subtitle}</p>
        <a href="#rooms" className="btn-hero" onClick={(e) => { e.preventDefault(); document.querySelector('#rooms')?.scrollIntoView({ behavior: 'smooth' }) }}>{t.hero.cta}</a>
      </div>
    </section>
  )
}

// About Section Component
function AboutSection() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <span className="section-label">{t.about.label}</span>
            <h2>{t.about.title}</h2>
            <div className="separator"></div>
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <div className="about-features">
              {t.about.features.map((feature, index) => (
                <div key={index} className="feature">
                  <span className="feature-icon">◈</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="about-image">
            <img src="/img/IMG_0714.JPG" alt="Interno Le Stanze di Caterina" />
            <div className="image-frame"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Room Card Component
function RoomCard({ image, title, slug }) {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <Link to={`/stanza/${slug}`} className="room-card">
      <div className="room-image">
        <img src={image} alt={title} />
        <div className="room-overlay"></div>
      </div>
      <div className="room-info">
        <h3>{title}</h3>
        <span className="room-discover">{t.rooms.discover}</span>
      </div>
    </Link>
  )
}

// Rooms Section Component
function RoomsSection() {
  const { language } = useLanguage()
  const t = translations[language]

  const rooms = [
    {
      image: '/img/Camera Spagnola/IMG_7808.jpg',
      title: t.rooms.spagnola,
      slug: 'camera-spagnola'
    },
    {
      image: '/img/Camera Italiana/IMG_7814.jpg',
      title: t.rooms.italiana,
      slug: 'camera-italiana'
    },
    {
      image: '/img/Camera Francese/IMG_7798.jpg',
      title: t.rooms.francese,
      slug: 'camera-francese'
    }
  ]

  return (
    <section id="rooms" className="rooms">
      <div className="container">
        <div className="section-header">
          <span className="section-label">{t.rooms.label}</span>
          <h2>{t.rooms.title}</h2>
          <div className="separator center"></div>
          <p className="section-description">{t.rooms.description}</p>
        </div>
        <div className="rooms-grid">
          {rooms.map((room, index) => (
            <RoomCard key={index} {...room} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Service Item Component
function ServiceItem({ icon, title, description }) {
  return (
    <div className="service-item">
      <div className="service-icon">
        {icon}
      </div>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  )
}

// Services Section Component
function ServicesSection() {
  const { language } = useLanguage()
  const t = translations[language]

  const services = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01" />
        </svg>
      ),
      title: t.services.wifi.title,
      description: t.services.wifi.desc
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 6v6l4 2" />
        </svg>
      ),
      title: t.services.checkin.title,
      description: t.services.checkin.desc
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
      title: t.services.support.title,
      description: t.services.support.desc
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      title: t.services.location.title,
      description: t.services.location.desc
    }
  ]

  return (
    <section className="services">
      <div className="container">
        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceItem key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  )
}

// Gallery Section Component (Preview)
function GallerySection() {
  const galleryRef = useRef(null)
  const { language } = useLanguage()
  const t = translations[language]

  // Preview images - just a selection
  const previewImages = [
    { src: '/img/IMG_9012.jpg', alt: 'Vista Duomo' },
    { src: '/img/IMG_7808.jpg', alt: 'Camera Mattoni Rossi' },
    { src: '/img/IMG_7814.jpg', alt: 'Suite Elegante' },
    { src: '/img/IMG_0714.JPG', alt: 'Corridoio Storico' },
    { src: '/img/IMG_7812.jpg', alt: 'Camera Medicea' },
    { src: '/img/IMG_0721.JPG', alt: 'Arredamento' },
    { src: '/img/IMG_7996.jpg', alt: 'Interno' },
    { src: '/img/IMG_0733.JPG', alt: 'Camera' }
  ]

  // Duplicate for infinite scroll
  const allImages = [...previewImages, ...previewImages]

  return (
    <section id="gallery" className="gallery">
      <div className="section-header">
        <span className="section-label">{t.gallery.label}</span>
        <h2>{t.gallery.title}</h2>
        <div className="separator center"></div>
        <p className="section-description">{t.gallery.description}</p>
      </div>
      <div className="gallery-carousel">
        <div
          className="gallery-track"
          ref={galleryRef}
          onMouseEnter={() => galleryRef.current && (galleryRef.current.style.animationPlayState = 'paused')}
          onMouseLeave={() => galleryRef.current && (galleryRef.current.style.animationPlayState = 'running')}
        >
          {allImages.map((image, index) => (
            <img key={index} src={image.src} alt={image.alt} />
          ))}
        </div>
      </div>
      <div className="gallery-cta-wrapper">
        <Link to="/galleria" className="btn-gallery">
          <span>{t.gallery.cta}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  )
}

// Location Section Component
function LocationSection() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section id="location" className="location">
      <div className="container">
        <div className="location-content">
          <div className="location-text">
            <span className="section-label">{t.location.label}</span>
            <h2>{t.location.title}</h2>
            <div className="separator"></div>
            <p>{t.location.description}</p>
            <div className="distances">
              {t.location.distances.map((distance, index) => (
                <div key={index} className="distance-item">
                  <span className="distance-value">{distance.value}</span>
                  <span className="distance-label">{distance.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="location-map">
            <div className="map-placeholder">
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
    </section>
  )
}

// Contact Section Component
function ContactSection() {
  const { language } = useLanguage()
  const t = translations[language]

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checkin: '',
    checkout: '',
    guests: '',
    message: ''
  })
  const [notification, setNotification] = useState(null)

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  const formRef = useRef()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.checkin || !formData.checkout) {
      showNotification(t.contact.errors.required, 'error')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      showNotification(t.contact.errors.invalidEmail, 'error')
      return
    }

    if (new Date(formData.checkin) >= new Date(formData.checkout)) {
      showNotification(t.contact.errors.invalidDates, 'error')
      return
    }

    setIsSubmitting(true)

    // EmailJS configuration - REPLACE with your own credentials from emailjs.com
    const SERVICE_ID = 'YOUR_SERVICE_ID'  // Get from EmailJS dashboard
    const TEMPLATE_ID = 'YOUR_TEMPLATE_ID' // Get from EmailJS dashboard  
    const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'   // Get from EmailJS dashboard

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
      .then(() => {
        showNotification(t.contact.success, 'success')
        setFormData({ name: '', email: '', checkin: '', checkout: '', guests: '', message: '' })
        setIsSubmitting(false)
      })
      .catch((error) => {
        console.error('EmailJS Error:', error)
        showNotification(t.contact.errors.sendError, 'error')
        setIsSubmitting(false)
      })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact-content">
          <div className="contact-info">
            <span className="section-label">{t.contact.label}</span>
            <h2>{t.contact.title}</h2>
            <div className="separator"></div>
            <p>{t.contact.description}</p>
            <div className="contact-details">
              <div className="contact-item">
                <span className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <div>
                  <strong>{t.contact.address}</strong>
                  <p>Via dello Studio, 12<br />50122 Firenze, Italia</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <div>
                  <strong>{t.contact.phone}</strong>
                  <p>+39 333 199 2394</p>
                </div>
              </div>
              <div className="contact-item">
                <span className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <div>
                  <strong>{t.contact.email}</strong>
                  <p>giacomomarretti1997@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
          <div className="contact-form-container">
            <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input type="text" id="name" name="user_name" required value={formData.name} onChange={handleChange} />
                <label htmlFor="name">{t.contact.form.name}</label>
              </div>
              <div className="form-group">
                <input type="email" id="email" name="user_email" required value={formData.email} onChange={handleChange} />
                <label htmlFor="email">{t.contact.form.email}</label>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input type="date" id="checkin" name="checkin_date" required value={formData.checkin} onChange={handleChange} />
                  <label htmlFor="checkin" className="date-label">{t.contact.form.checkin}</label>
                </div>
                <div className="form-group">
                  <input type="date" id="checkout" name="checkout_date" required value={formData.checkout} onChange={handleChange} />
                  <label htmlFor="checkout" className="date-label">{t.contact.form.checkout}</label>
                </div>
              </div>
              <div className="form-group">
                <select id="guests" name="guests_count" required value={formData.guests} onChange={handleChange}>
                  <option value="" disabled></option>
                  <option value="1">{t.contact.form.guestOptions[0]}</option>
                  <option value="2">{t.contact.form.guestOptions[1]}</option>
                  <option value="3">{t.contact.form.guestOptions[2]}</option>
                  <option value="4">{t.contact.form.guestOptions[3]}</option>
                </select>
                <label htmlFor="guests">{t.contact.form.guests}</label>
              </div>
              <div className="form-group">
                <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange}></textarea>
                <label htmlFor="message">{t.contact.form.message}</label>
              </div>
              <button type="submit" className="btn-submit" disabled={isSubmitting}>
                {isSubmitting ? t.contact.form.submitting : t.contact.form.submit}
              </button>
            </form>
          </div>
        </div>
      </div>

      {notification && (
        <div
          className={`notification notification-${notification.type}`}
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            padding: '20px 25px',
            background: notification.type === 'success' ? '#4A1F25' : '#A65D57',
            color: '#FAF6F1',
            borderRadius: '0',
            boxShadow: '0 10px 40px rgba(74, 31, 37, 0.3)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            fontFamily: "'Montserrat', sans-serif",
            fontSize: '0.9rem',
            fontWeight: 300,
            animation: 'slideInRight 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            maxWidth: '400px'
          }}
        >
          <span>{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              fontSize: '1.5rem',
              cursor: 'pointer',
              opacity: 0.7,
              padding: 0,
              lineHeight: 1
            }}
          >×</button>
        </div>
      )}
    </section>
  )
}

// Footer Component
function Footer() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <img src="/img/logo.png" alt="Le Stanze di Caterina" className="footer-logo" />
            <p>{t.footer.tagline}</p>
          </div>
          <div className="footer-links">
            <h4>{t.footer.links}</h4>
            <ul>
              <li><a href="#home">{t.nav.home}</a></li>
              <li><a href="#about">{t.nav.about}</a></li>
              <li><a href="#rooms">{t.nav.rooms}</a></li>
              <li><a href="#contact">{t.nav.contact}</a></li>
            </ul>
          </div>
          <div className="footer-social">
            <h4>{t.footer.follow}</h4>
            <div className="social-links">
              <a href="#" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" aria-label="TripAdvisor">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="9" cy="12" r="2" />
                  <circle cx="15" cy="12" r="2" />
                  <path d="M5 12h2M17 12h2" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  )
}

// Main App Component
function App() {
  useEffect(() => {
    // Animation on scroll
    const elements = document.querySelectorAll('.section-header, .about-text, .about-image, .room-card, .service-item, .location-text, .location-map, .contact-info, .contact-form-container')

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          entry.target.style.opacity = '1'
          entry.target.style.transform = 'translateY(0)'
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    })

    elements.forEach((el) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(20px)'
      el.style.transition = 'opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
      observer.observe(el)
    })

    // Preload images
    const images = document.querySelectorAll('.carousel-slide img, .gallery-track img')
    images.forEach(img => {
      const src = img.getAttribute('src')
      if (src) {
        const preloadImg = new Image()
        preloadImg.src = src
      }
    })

    // Add notification animation styles
    const style = document.createElement('style')
    style.id = 'notification-styles'
    style.textContent = `
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
      }
    `
    if (!document.querySelector('#notification-styles')) {
      document.head.appendChild(style)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <RoomsSection />
      <ServicesSection />
      <GallerySection />
      <LocationSection />
      <ContactSection />
      <Footer />
    </>
  )
}

export default App
export { Navbar }
