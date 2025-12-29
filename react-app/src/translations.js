export const translations = {
  it: {
    // Navbar
    nav: {
      home: 'Home',
      about: 'Chi Siamo',
      rooms: 'Le Stanze',
      gallery: 'Galleria',
      location: 'Posizione',
      contact: 'Contatti'
    },
    
    // Hero
    hero: {
      title: 'Le Stanze di Caterina',
      subtitle: 'Eleganza fiorentina a due passi dal Duomo',
      cta: 'Scopri le nostre stanze',
      slides: [
        'Architettura storica',
        'Vista sul Duomo di Firenze',
        'Suite con mattoni originali',
        'Suite Italiana'
      ]
    },
    
    // About
    about: {
      label: 'Benvenuti',
      title: "Un'esperienza unica nel cuore di Firenze",
      p1: "Le Stanze di Caterina vi accolgono in un palazzo storico del centro di Firenze, dove l'eleganza rinascimentale incontra il comfort contemporaneo. A pochi passi dal magnifico Duomo di Santa Maria del Fiore, la nostra struttura offre un rifugio esclusivo per viaggiatori esigenti.",
      p2: "Ogni dettaglio è stato curato con passione per offrirvi un soggiorno indimenticabile, dove il fascino dell'arte e della storia si fondono con servizi di altissimo livello.",
      features: ['Posizione centrale', 'Design raffinato', 'Servizio esclusivo']
    },
    
    // Rooms
    rooms: {
      label: 'Alloggi',
      title: 'Le Nostre Stanze',
      description: "Ogni camera è un'opera d'arte, curata nei minimi dettagli per offrire un'esperienza di soggiorno senza paragoni.",
      discover: 'Scopri',
      spagnola: 'Suite Spagnola',
      italiana: 'Suite Italiana',
      francese: 'Suite Francese'
    },
    
    // Services
    services: {
      wifi: { title: 'Wi-Fi Gratuito', desc: 'Connessione veloce in tutta la struttura' },
      checkin: { title: 'Check-in Flessibile', desc: 'Arrivo in qualsiasi momento della giornata' },
      support: { title: 'Assistenza h24', desc: 'Supporto sempre disponibile per ogni esigenza' },
      location: { title: 'Posizione Centrale', desc: 'A 2 minuti a piedi dal Duomo di Firenze' }
    },
    
    // Gallery
    gallery: {
      label: 'Galleria',
      title: 'Scorci di Eleganza',
      description: 'Esplora gli angoli più suggestivi delle nostre stanze',
      cta: 'Scopri la Galleria Completa',
      pageTitle: 'La Nostra Galleria',
      pageDescription: 'Scopri ogni angolo delle nostre eleganti stanze attraverso la nostra collezione fotografica',
      backHome: 'Torna alla Home'
    },
    
    // Location
    location: {
      label: 'Posizione',
      title: 'Nel Cuore di Firenze',
      description: 'Le Stanze di Caterina si trovano in una posizione privilegiata, a soli 50 metri dal Duomo di Santa Maria del Fiore. Da qui potrete raggiungere a piedi tutti i principali monumenti e musei della città.',
      distances: [
        { value: '2 min', label: 'Duomo di Firenze' },
        { value: '5 min', label: 'Galleria degli Uffizi' },
        { value: '8 min', label: 'Ponte Vecchio' },
        { value: '10 min', label: 'Palazzo Pitti' }
      ]
    },
    
    // Contact
    contact: {
      label: 'Contatti',
      title: 'Prenotate il Vostro Soggiorno',
      description: 'Per informazioni e prenotazioni, non esitate a contattarci. Il nostro team sarà lieto di assistervi nella pianificazione del vostro soggiorno perfetto.',
      address: 'Indirizzo',
      phone: 'Telefono',
      email: 'Email',
      form: {
        name: 'Nome e Cognome',
        email: 'Email',
        checkin: 'Check-in',
        checkout: 'Check-out',
        guests: 'Numero Ospiti',
        guestOptions: ['1 Ospite', '2 Ospiti', '3 Ospiti', '4 Ospiti'],
        message: 'Messaggio (opzionale)',
        submit: 'Richiedi Disponibilità',
        submitting: 'Invio in corso...'
      },
      errors: {
        required: 'Per favore, compila tutti i campi obbligatori.',
        invalidEmail: 'Per favore, inserisci un indirizzo email valido.',
        invalidDates: 'La data di check-out deve essere successiva al check-in.',
        sendError: 'Si è verificato un errore. Riprova più tardi.'
      },
      success: 'Grazie per la tua richiesta! Ti contatteremo presto.'
    },
    
    // Footer
    footer: {
      tagline: "Un'esperienza di ospitalità unica nel cuore di Firenze.",
      links: 'Link Utili',
      follow: 'Seguici',
      rights: '© 2024 Le Stanze di Caterina. Tutti i diritti riservati.'
    },
    
    // Room Page
    roomPage: {
      bookNow: 'Prenota Ora',
      hostedBy: 'Ospitato da Le Stanze di Caterina',
      aboutPlace: 'Informazioni su questo alloggio',
      amenitiesTitle: 'Cosa troverai',
      amenities: ['Aria condizionata', 'Wi-Fi ultraveloce', 'Smart TV', 'Minibar', 'Cassaforte', 'Bagno privato'],
      amenitiesCategory: 'Servizi',
      locationTitle: 'Dove ti troverai',
      locationDesc: 'Nel cuore del centro storico di Firenze, a soli 50 metri dal Duomo di Santa Maria del Fiore. La posizione perfetta per esplorare a piedi tutti i tesori della città.',
      otherRooms: 'Scopri le altre stanze',
      backHome: 'Torna alla Home',
      showAllPhotos: 'Mostra tutte le foto',
      
      // Room specific
      spagnola: {
        title: 'Suite Spagnola',
        tagline: 'Un ambiente intenso, caldo, vibrante',
        description: 'La Suite La Spagnola interpreta uno stile mediterraneo deciso e passionale: tonalità arancio e terracotta, superfici materiche e contrasti marcati danno vita a uno spazio di forte personalità, avvolgente e pieno di energia.',
        highlights: [
          'Muri in mattoni originali del XV secolo',
          'Testata del letto dorata artigianale',
          'Vista sulla città storica',
          'Bagno privato con doccia a pioggia'
        ]
      },
      italiana: {
        title: 'Suite Italiana',
        tagline: 'Un ambiente intimo, materico, autentico',
        description: "La Suite L'Italiana è un omaggio allo stile italiano più essenziale: superfici in pietra, tonalità calde, luci soffuse e un bagno dal carattere deciso, con ampia doccia walk-in rivestita in mosaico.",
        highlights: [
          "Opera d'arte originale come testata",
          "Design d'autore",
          'Camera silenziosa su cortile interno',
          'Bagno in marmo di Carrara'
        ]
      },
      francese: {
        title: 'Suite Francese',
        tagline: 'Un ambiente luminoso, raffinato, armonioso',
        description: "La Suite La Francese richiama l'eleganza senza tempo dello stile d'oltralpe: linee pulite, superfici chiare, dettagli classici e un bagno ampio e luminoso, pensato per offrire comfort e leggerezza.",
        highlights: [
          'Arredi ispirati al Rinascimento',
          'Tessuti pregiati e dettagli dorati',
          'A 2 minuti a piedi dal Duomo',
          'Bagno privato completamente rinnovato'
        ]
      }
    }
  },
  
  en: {
    // Navbar
    nav: {
      home: 'Home',
      about: 'About Us',
      rooms: 'Rooms',
      gallery: 'Gallery',
      location: 'Location',
      contact: 'Contact'
    },
    
    // Hero
    hero: {
      title: 'Le Stanze di Caterina',
      subtitle: 'Florentine elegance steps from the Duomo',
      cta: 'Discover our rooms',
      slides: [
        'Historic architecture',
        'View of Florence Duomo',
        'Suite with original bricks',
        'Italian Suite'
      ]
    },
    
    // About
    about: {
      label: 'Welcome',
      title: 'A unique experience in the heart of Florence',
      p1: 'Le Stanze di Caterina welcomes you in a historic palazzo in the center of Florence, where Renaissance elegance meets contemporary comfort. Just steps from the magnificent Duomo di Santa Maria del Fiore, our property offers an exclusive retreat for discerning travelers.',
      p2: 'Every detail has been lovingly curated to offer you an unforgettable stay, where the charm of art and history blend with the highest level of service.',
      features: ['Central location', 'Refined design', 'Exclusive service']
    },
    
    // Rooms
    rooms: {
      label: 'Accommodations',
      title: 'Our Rooms',
      description: 'Each room is a work of art, crafted with attention to detail to offer an unparalleled stay experience.',
      discover: 'Discover',
      spagnola: 'Spanish Suite',
      italiana: 'Italian Suite',
      francese: 'French Suite'
    },
    
    // Services
    services: {
      wifi: { title: 'Free Wi-Fi', desc: 'High-speed connection throughout the property' },
      checkin: { title: 'Flexible Check-in', desc: 'Arrive at any time of the day' },
      support: { title: '24/7 Support', desc: 'Always available for your every need' },
      location: { title: 'Central Location', desc: '2 minutes walk from Florence Duomo' }
    },
    
    // Gallery
    gallery: {
      label: 'Gallery',
      title: 'Glimpses of Elegance',
      description: 'Explore the most charming corners of our rooms',
      cta: 'View Full Gallery',
      pageTitle: 'Our Gallery',
      pageDescription: 'Discover every corner of our elegant rooms through our photo collection',
      backHome: 'Back to Home'
    },
    
    // Location
    location: {
      label: 'Location',
      title: 'In the Heart of Florence',
      description: 'Le Stanze di Caterina is located in a privileged position, just 50 meters from the Duomo di Santa Maria del Fiore. From here you can reach all the main monuments and museums on foot.',
      distances: [
        { value: '2 min', label: 'Florence Duomo' },
        { value: '5 min', label: 'Uffizi Gallery' },
        { value: '8 min', label: 'Ponte Vecchio' },
        { value: '10 min', label: 'Pitti Palace' }
      ]
    },
    
    // Contact
    contact: {
      label: 'Contact',
      title: 'Book Your Stay',
      description: 'For information and reservations, please do not hesitate to contact us. Our team will be happy to assist you in planning your perfect stay.',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      form: {
        name: 'Full Name',
        email: 'Email',
        checkin: 'Check-in',
        checkout: 'Check-out',
        guests: 'Number of Guests',
        guestOptions: ['1 Guest', '2 Guests', '3 Guests', '4 Guests'],
        message: 'Message (optional)',
        submit: 'Request Availability',
        submitting: 'Sending...'
      },
      errors: {
        required: 'Please fill in all required fields.',
        invalidEmail: 'Please enter a valid email address.',
        invalidDates: 'Check-out date must be after check-in date.',
        sendError: 'An error occurred. Please try again later.'
      },
      success: 'Thank you for your request! We will contact you soon.'
    },
    
    // Footer
    footer: {
      tagline: 'A unique hospitality experience in the heart of Florence.',
      links: 'Useful Links',
      follow: 'Follow Us',
      rights: '© 2024 Le Stanze di Caterina. All rights reserved.'
    },
    
    // Room Page
    roomPage: {
      bookNow: 'Book Now',
      hostedBy: 'Hosted by Le Stanze di Caterina',
      aboutPlace: 'About this place',
      amenitiesTitle: 'What you\'ll find',
      amenities: ['Air conditioning', 'Ultra-fast Wi-Fi', 'Smart TV', 'Minibar', 'Safe', 'Private bathroom'],
      amenitiesCategory: 'Amenities',
      locationTitle: 'Where you\'ll be',
      locationDesc: 'In the heart of historic Florence, just 50 meters from the Duomo di Santa Maria del Fiore. The perfect location to explore all the treasures of the city on foot.',
      otherRooms: 'Discover other rooms',
      backHome: 'Back to Home',
      showAllPhotos: 'Show all photos',
      
      // Room specific
      spagnola: {
        title: 'Spanish Suite',
        tagline: 'An intense, warm, vibrant atmosphere',
        description: 'The Spanish Suite interprets a bold and passionate Mediterranean style: orange and terracotta tones, textured surfaces and marked contrasts create a space of strong personality, enveloping and full of energy.',
        highlights: [
          '15th century original brick walls',
          'Handcrafted golden headboard',
          'View over the historic city',
          'Private bathroom with rain shower'
        ]
      },
      italiana: {
        title: 'Italian Suite',
        tagline: 'An intimate, textured, authentic atmosphere',
        description: "The Italian Suite is a tribute to the most essential Italian style: stone surfaces, warm tones, soft lighting and a bathroom with strong character, featuring a large walk-in shower covered in mosaic.",
        highlights: [
          'Original artwork as headboard',
          'Designer furniture',
          'Quiet room overlooking inner courtyard',
          'Carrara marble bathroom'
        ]
      },
      francese: {
        title: 'French Suite',
        tagline: 'A bright, refined, harmonious atmosphere',
        description: "The French Suite evokes the timeless elegance of French style: clean lines, light surfaces, classic details and a spacious, bright bathroom designed to offer comfort and lightness.",
        highlights: [
          'Renaissance-inspired furnishings',
          'Fine fabrics and golden details',
          '2 minutes walk from the Duomo',
          'Fully renovated private bathroom'
        ]
      }
    }
  }
}

export function t(translations, language, path) {
  const keys = path.split('.')
  let result = translations[language]
  for (const key of keys) {
    result = result?.[key]
  }
  return result || path
}

