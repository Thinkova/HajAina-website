"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

type Language = "fr" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType>({
  language: "fr",
  setLanguage: () => {},
  t: (key) => key,
})

export function useLanguage() {
  return useContext(LanguageContext)
}

// All translations: French (original) and English
const translations: Record<string, Record<Language, string>> = {
  // ===== HEADER NAV =====
  "nav.home": { fr: "Couverture", en: "Home" },
  "nav.collections": { fr: "Collections", en: "Collections" },
  "nav.ateliers": { fr: "Ateliers", en: "Workshops" },
  "nav.stylistes": { fr: "Stylistes", en: "Designers" },
  "nav.ethique": { fr: "Éthique", en: "Ethics" },
  "nav.recyclage": { fr: "Recyclage", en: "Recycling" },
  "nav.magazine": { fr: "Magazine", en: "Magazine" },
  "nav.connexion": { fr: "Connexion", en: "Sign In" },
  "nav.monCompte": { fr: "Mon Compte", en: "My Account" },
  "nav.maBoutique": { fr: "Ma boutique", en: "My Shop" },
  "nav.parametres": { fr: "Paramètres", en: "Settings" },
  "nav.deconnexion": { fr: "Déconnexion", en: "Sign Out" },

  // ===== LANGUAGE SWITCHER =====
  "lang.choose": { fr: "Choisir la langue", en: "Choose Language" },
  "lang.french": { fr: "Français (Original)", en: "French (Original)" },
  "lang.english": { fr: "Anglais", en: "English" },

  // ===== HOME PAGE - HERO =====
  "hero.tagline": {
    fr: "Mihaja, Manaja Aina, Manaja Tantara",
    en: "Respect, Cherish Life, Honor History",
  },
  "hero.description": {
    fr: "Haj'Aina façonne l'histoire de la mode éthique et durable à Madagascar aux côtés de ses plus grands acteurs. Rejoignez-nous et participez vous aussi à cette démarche quotidienne vers une mode plus responsable.",
    en: "Haj'Aina shapes the story of ethical and sustainable fashion in Madagascar alongside its greatest contributors. Join us and be part of this daily journey toward more responsible fashion.",
  },
  "hero.cta": { fr: "Explorer les Collections", en: "Explore Collections" },

  // ===== HOME PAGE - MARQUEE =====
  "marquee.modeEthique": { fr: "Mode ethique et durable", en: "Ethical & sustainable fashion" },

  // ===== HOME PAGE - COLLECTIONS SECTION =====
  "collections.title": { fr: "Collections Phares", en: "Featured Collections" },
  "collections.subtitle": {
    fr: "Chaque collection raconte une histoire unique, mêlant l'héritage culturel malgache aux tendances contemporaines les plus raffinées",
    en: "Each collection tells a unique story, blending Malagasy cultural heritage with the most refined contemporary trends",
  },
  "collections.by": { fr: "Par", en: "By" },
  "collections.description": {
    fr: "Une exploration unique de l'identité malgache à travers des créations contemporaines qui célèbrent notre héritage tout en embrassant l'innovation et la durabilité.",
    en: "A unique exploration of Malagasy identity through contemporary creations that celebrate our heritage while embracing innovation and sustainability.",
  },
  "collections.discover": { fr: "Découvrir", en: "Discover" },

  // ===== HOME PAGE - COLLECTION ITEMS =====
  "collection.item1.title": { fr: "Collection Eté 2024", en: "Summer Collection 2024" },
  "collection.item1.category": { fr: "Couture", en: "Couture" },
  "collection.item2.title": { fr: "Eco-Luxe Series", en: "Eco-Luxe Series" },
  "collection.item2.category": { fr: "Durable", en: "Sustainable" },
  "collection.item3.title": { fr: "Urban Malagasy", en: "Urban Malagasy" },
  "collection.item3.category": { fr: "Streetwear", en: "Streetwear" },
  "collection.item4.title": { fr: "Heritage Moderne", en: "Modern Heritage" },
  "collection.item4.category": { fr: "Fusion", en: "Fusion" },

  // ===== HOME PAGE - DESIGNERS SECTION =====
  "designers.title": { fr: "Stylistes Malagasy", en: "Malagasy Designers" },
  "designers.subtitle": {
    fr: "Rencontrez les visionnaires qui redéfinissent la mode malgache avec créativité, passion et conscience environnementale",
    en: "Meet the visionaries redefining Malagasy fashion with creativity, passion and environmental consciousness",
  },

  // ===== HOME PAGE - DESIGNER DATA =====
  "designer.1.specialty": { fr: "Couture Traditionnelle", en: "Traditional Couture" },
  "designer.1.description": { fr: "Fusion entre tradition malgache et modernité", en: "Fusion of Malagasy tradition and modernity" },
  "designer.2.specialty": { fr: "Mode Durable", en: "Sustainable Fashion" },
  "designer.2.description": { fr: "Pionnier de la mode éco-responsable à Madagascar", en: "Pioneer of eco-responsible fashion in Madagascar" },
  "designer.3.specialty": { fr: "Prêt-à-Porter", en: "Ready-to-Wear" },
  "designer.3.description": { fr: "Créations contemporaines aux influences malgaches", en: "Contemporary creations with Malagasy influences" },

  // ===== HOME PAGE - ETHIQUE SECTION =====
  "ethique.title": { fr: "Mode Éthique", en: "Ethical Fashion" },
  "ethique.description": {
    fr: "Nous croyons en une mode qui respecte les artisans, l'environnement et les traditions. Chaque pièce raconte une histoire de durabilité, d'authenticité et de respect mutuel.",
    en: "We believe in fashion that respects artisans, the environment and traditions. Each piece tells a story of sustainability, authenticity and mutual respect.",
  },
  "ethique.point1": { fr: "Commerce équitable avec les artisans locaux", en: "Fair trade with local artisans" },
  "ethique.point2": { fr: "Matériaux durables et recyclés", en: "Sustainable and recycled materials" },
  "ethique.point3": { fr: "Préservation des techniques traditionnelles", en: "Preservation of traditional techniques" },
  "ethique.learnMore": { fr: "En Savoir Plus", en: "Learn More" },

  // ===== HOME PAGE - RECYCLAGE SECTION =====
  "recyclage.title": { fr: "Espace Recyclage", en: "Recycling Space" },
  "recyclage.subtitle": {
    fr: "Donnez une seconde vie à vos vêtements. Notre programme de recyclage transforme vos anciennes pièces en nouvelles créations uniques, dans une démarche circulaire et responsable.",
    en: "Give your clothes a second life. Our recycling program transforms your old pieces into unique new creations, in a circular and responsible approach.",
  },
  "recyclage.howTitle": { fr: "Comment ça marche ?", en: "How does it work?" },
  "recyclage.step1.title": { fr: "Déposez vos vêtements", en: "Drop off your clothes" },
  "recyclage.step1.desc": {
    fr: "Apportez vos pièces usagées dans nos points de collecte partenaires",
    en: "Bring your used items to our partner collection points",
  },
  "recyclage.step2.title": { fr: "Transformation créative", en: "Creative Transformation" },
  "recyclage.step2.desc": {
    fr: "Nos stylistes reimaginent vos vêtements en nouvelles créations uniques",
    en: "Our designers reimagine your clothes into unique new creations",
  },
  "recyclage.step3.title": { fr: "Nouvelle vie", en: "New Life" },
  "recyclage.step3.desc": {
    fr: "Récupérez vos pièces transformées ou découvrez notre collection recyclée",
    en: "Pick up your transformed pieces or discover our recycled collection",
  },
  "recyclage.cta": { fr: "Participer au Programme", en: "Join the Program" },

  // ===== HOME PAGE - COLLABORATIONS =====
  "collabs.title": { fr: "Opportunités de Collaboration", en: "Collaboration Opportunities" },
  "collabs.subtitle": {
    fr: "Découvrez les dernières annonces de collaboration et connectez-vous avec des partenaires partageant les mêmes valeurs dans l'industrie de la mode éthique.",
    en: "Discover the latest collaboration announcements and connect with like-minded partners in the ethical fashion industry.",
  },
  "collabs.viewAnnouncement": { fr: "Voir l'annonce", en: "View Announcement" },
  "collabs.viewAll": { fr: "Voir toutes les annonces", en: "View All Announcements" },

  // ===== COLLABORATION DATA =====
  "collab.1.title": { fr: "Recherche Styliste pour Projet Zéro Déchet", en: "Seeking Designer for Zero-Waste Project" },
  "collab.1.desc": {
    fr: "Nous recherchons un styliste engagé pour notre prochaine collection capsule zéro déchet, avec une expertise en upcycling et design minimaliste.",
    en: "We are looking for a committed designer for our next zero-waste capsule collection, with expertise in upcycling and minimalist design.",
  },
  "collab.2.title": { fr: "Appel à Designers pour Tissus Innovants", en: "Call for Designers for Innovative Fabrics" },
  "collab.2.desc": {
    fr: "Opportunité de collaborer sur le développement de textiles biodégradables et smart-fabrics. Idéal pour les designers passionnés par la recherche et l'innovation.",
    en: "Opportunity to collaborate on the development of biodegradable textiles and smart-fabrics. Ideal for designers passionate about research and innovation.",
  },
  "collab.3.title": { fr: "Partenariat pour Campagne Marketing Mode Éthique", en: "Partnership for Ethical Fashion Marketing Campaign" },
  "collab.3.desc": {
    fr: "Agence de communication spécialisée dans le développement durable, cherche influenceurs ou stylistes pour promouvoir une nouvelle ligne de vêtements éthiques.",
    en: "Communication agency specializing in sustainable development, seeking influencers or designers to promote a new line of ethical clothing.",
  },

  // ===== HOME PAGE - QR CODE SECTION =====
  "qrcode.title": { fr: "Créations uniques", en: "Unique Creations" },
  "qrcode.description": {
    fr: "Offrez à chaque pièce de votre collection une identité propre grâce à un QR Code unique. Le scanner permettra de découvrir l'histoire du vêtement, ses valeurs et son créateur.",
    en: "Give each piece of your collection a unique identity with a QR Code. Scanning it will reveal the garment's story, its values and its creator.",
  },
  "qrcode.point1": { fr: "Identité du produit", en: "Product identity" },
  "qrcode.point2": { fr: "Transparence", en: "Transparency" },
  "qrcode.point3": { fr: "Traçabilité", en: "Traceability" },
  "qrcode.cta": { fr: "Créer une collection", en: "Create a collection" },

  // ===== HOME PAGE - NEWSLETTER =====
  "newsletter.title": { fr: "Restez Connecté", en: "Stay Connected" },
  "newsletter.subtitle": {
    fr: "Recevez les dernières actualités de la mode malgache, nos collections exclusives et les histoires inspirantes de nos créateurs",
    en: "Receive the latest Malagasy fashion news, our exclusive collections and the inspiring stories of our creators",
  },
  "newsletter.placeholder": { fr: "Votre adresse email", en: "Your email address" },
  "newsletter.subscribe": { fr: "S'abonner", en: "Subscribe" },

  // ===== FOOTER =====
  "footer.tagline": {
    fr: "Mode éthique et durable de Madagascar. Valoriser l'artisanat local et préserver l'environnement.",
    en: "Ethical and sustainable fashion from Madagascar. Promoting local craftsmanship and preserving the environment.",
  },
  "footer.navigation": { fr: "Navigation", en: "Navigation" },
  "footer.accueil": { fr: "Accueil", en: "Home" },
  "footer.collections": { fr: "Collections", en: "Collections" },
  "footer.stylistes": { fr: "Stylistes", en: "Designers" },
  "footer.magazine": { fr: "Magazine", en: "Magazine" },
  "footer.modeEthique": { fr: "Mode Éthique", en: "Ethical Fashion" },
  "footer.recyclage": { fr: "Recyclage", en: "Recycling" },
  "footer.aideContact": { fr: "Aide & Contact", en: "Help & Contact" },
  "footer.faq": { fr: "FAQ", en: "FAQ" },
  "footer.conditions": { fr: "Conditions Générales", en: "Terms & Conditions" },
  "footer.confidentialite": { fr: "Politique de Confidentialité", en: "Privacy Policy" },
  "footer.contact": { fr: "Contactez-nous", en: "Contact Us" },
  "footer.newsletter": { fr: "Newsletter", en: "Newsletter" },
  "footer.newsletterDesc": {
    fr: "Abonnez-vous pour recevoir nos dernières actualités et offres exclusives.",
    en: "Subscribe to receive our latest news and exclusive offers.",
  },
  "footer.emailPlaceholder": { fr: "Votre email", en: "Your email" },
  "footer.subscribe": { fr: "S'abonner", en: "Subscribe" },
  "footer.rights": { fr: "Tous droits réservés.", en: "All rights reserved." },

  // ===== COLLECTIONS PAGE =====
  "collectionsPage.title": { fr: "Collections", en: "Collections" },
  "collectionsPage.subtitle": {
    fr: "Découvrez nos créations éthiques et durables, fabriquées avec soin par des artisans malgaches talentueux.",
    en: "Discover our ethical and sustainable creations, carefully crafted by talented Malagasy artisans.",
  },
  "collectionsPage.preorder": { fr: "Précommande", en: "Pre-order" },
  "collectionsPage.viewPassport": { fr: "Voir le Passeport", en: "View Passport" },
  "collectionsPage.funded": { fr: "financé", en: "funded" },
  "collectionsPage.objectif": { fr: "Objectif", en: "Goal" },

  // ===== ATELIERS PAGE =====
  "ateliersPage.title": { fr: "Ateliers", en: "Workshops" },
  "ateliersPage.subtitle": {
    fr: "Découvrez nos ateliers d'artisanat éthique et participez à la création durable.",
    en: "Discover our ethical craft workshops and participate in sustainable creation.",
  },
  "ateliersPage.discover": { fr: "Découvrir l'atelier", en: "Discover Workshop" },
  "ateliersPage.artisans": { fr: "artisans", en: "artisans" },
  "ateliersPage.wasteReduced": { fr: "déchets réduits", en: "waste reduced" },

  // ===== STYLISTES PAGE =====
  "stylistesPage.title": { fr: "Nos Stylistes", en: "Our Designers" },
  "stylistesPage.subtitle": {
    fr: "Rencontrez les créateurs qui façonnent la mode éthique malgache.",
    en: "Meet the creators shaping ethical Malagasy fashion.",
  },
  "stylistesPage.viewProfile": { fr: "Voir le profil", en: "View Profile" },
  "stylistesPage.experience": { fr: "ans d'expérience", en: "years of experience" },
  "stylistesPage.location": { fr: "Localisation", en: "Location" },
  "stylistesPage.specialty": { fr: "Spécialité", en: "Specialty" },

  // ===== ETHIQUE PAGE =====
  "etiquePage.title": { fr: "Notre Charte Éthique", en: "Our Ethical Charter" },
  "etiquePage.subtitle": {
    fr: "Découvrez les valeurs et engagements qui guident chacune de nos actions.",
    en: "Discover the values and commitments that guide each of our actions.",
  },

  // ===== RECYCLAGE PAGE =====
  "recyclagePage.title": { fr: "Espace Recyclage", en: "Recycling Space" },
  "recyclagePage.subtitle": {
    fr: "Donnez une seconde vie à vos vêtements avec notre programme de recyclage.",
    en: "Give your clothes a second life with our recycling program.",
  },
  "recyclagePage.depositPoint": { fr: "Point de Dépôt", en: "Drop-off Point" },
  "recyclagePage.participate": { fr: "Participer", en: "Participate" },

  // ===== MAGAZINE PAGE =====
  "magazinePage.title": { fr: "Magazine", en: "Magazine" },
  "magazinePage.subtitle": {
    fr: "Plongez dans l'univers de la mode éthique malgache avec nos articles exclusifs.",
    en: "Dive into the world of ethical Malagasy fashion with our exclusive articles.",
  },
  "magazinePage.readMore": { fr: "Lire l'article", en: "Read Article" },
  "magazinePage.minRead": { fr: "min de lecture", en: "min read" },

  // ===== LOGIN PAGE =====
  "login.title": { fr: "Connexion", en: "Sign In" },
  "login.subtitle": { fr: "Bienvenue sur Haj'Aina", en: "Welcome to Haj'Aina" },
  "login.email": { fr: "Email", en: "Email" },
  "login.password": { fr: "Mot de passe", en: "Password" },
  "login.asConsumer": { fr: "Connexion en tant que Consommateur", en: "Sign in as Consumer" },
  "login.asCreator": { fr: "Connexion en tant que Créateur", en: "Sign in as Creator" },
  "login.noAccount": { fr: "Pas encore de compte ?", en: "Don't have an account?" },
  "login.register": { fr: "S'inscrire", en: "Register" },

  // ===== CONCEPT STORE PAGE =====
  "conceptStore.title": { fr: "Concept Store", en: "Concept Store" },
  "conceptStore.subtitle": {
    fr: "Découvrez notre sélection de produits éthiques et durables.",
    en: "Discover our selection of ethical and sustainable products.",
  },
  "conceptStore.viewService": { fr: "Voir le service", en: "View Service" },
  "conceptStore.contact": { fr: "Contacter", en: "Contact" },

  // ===== MON IMPACT PAGE =====
  "monImpact.title": { fr: "Mon Impact", en: "My Impact" },
  "monImpact.subtitle": {
    fr: "Suivez votre impact environnemental et vos contributions à la mode durable.",
    en: "Track your environmental impact and your contributions to sustainable fashion.",
  },
  "monImpact.co2saved": { fr: "CO₂ économisé", en: "CO₂ saved" },
  "monImpact.waterSaved": { fr: "Eau économisée", en: "Water saved" },
  "monImpact.itemsRecycled": { fr: "Articles recyclés", en: "Items recycled" },

  // ===== MES COMMANDES PAGE =====
  "mesCommandes.title": { fr: "Mes Commandes", en: "My Orders" },
  "mesCommandes.subtitle": { fr: "Suivez l'état de vos commandes.", en: "Track the status of your orders." },
  "mesCommandes.orderNumber": { fr: "Commande", en: "Order" },
  "mesCommandes.status": { fr: "Statut", en: "Status" },
  "mesCommandes.viewDetails": { fr: "Voir les détails", en: "View Details" },

  // ===== DEPOT VETEMENTS PAGE =====
  "depotVetements.title": { fr: "Dépôt de Vêtements", en: "Clothing Deposit" },
  "depotVetements.subtitle": {
    fr: "Trouvez un point de collecte près de chez vous pour déposer vos vêtements usagés.",
    en: "Find a collection point near you to drop off your used clothing.",
  },
  "depotVetements.findPoint": { fr: "Trouver un point", en: "Find a point" },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("fr")

  useEffect(() => {
    const saved = localStorage.getItem("hajaina-language") as Language | null
    if (saved === "en" || saved === "fr") {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem("hajaina-language", lang)
  }

  const t = (key: string): string => {
    const entry = translations[key]
    if (!entry) return key
    return entry[language] || entry["fr"] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}
