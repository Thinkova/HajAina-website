export interface ProductPassport {
  origin: string
  material: string
  co2Saved: string
  waterSaved: string
  workHours: string
  artisanName: string
  techniques: string[]
  certifications: string[]
}

export interface Preorder {
  target: number
  current: number
  deadline: string
  status: string
}

export interface Product {
  id: string
  title: string
  designer: string
  designerId: string
  collectionId: string
  image: string
  gallery: string[]
  price: string
  category: string
  sizes: string[]
  description: string
  passport: ProductPassport
  preorder: Preorder
}

export interface Collection {
  id: string
  title: string
  designer: string
  image: string
  category: string
  price: string
  description: string
  pieces: number
  details: string[]
  gallery: string[]
}

export interface FeaturedCollection {
  title: string
  image: string
  link: string
}

export interface Styliste {
  id: string
  name: string
  specialty: string
  image: string
  location: string
  experience: string
  collectionsCount: number
  awardsCount: number
  bio: string
  philosophy: string
  specialties: string[]
  instagram: string
  email: string
  featuredCollections: FeaturedCollection[]
}

export interface Article {
  id: number
  title: string
  excerpt: string
  image: string
  category: string
  author: string
  date: string
  readTime: string
  featured: boolean
}

export interface AtelierCertification {
  name: string
  label: string
  description: string
  icon: string
}

export interface UpcyclingStep {
  step: number
  title: string
  description: string
  image: string
}

export interface ImpactStats {
  co2Saved: string
  waterSaved: string
  wasteReduced: string
  localEmployment: string
}

export interface Atelier {
  id: string
  stylisteId: string
  name: string
  tagline: string
  videoUrl: string
  coverImage: string
  location: string
  founded: string
  artisansCount: number
  certifications: AtelierCertification[]
  upcyclingProcess: UpcyclingStep[]
  impactStats: ImpactStats
  workshopDescription: string
  gallery: string[]
}

export interface CollaborationConversation {
  id: string
  name: string
  lastMessage: string
  time: string
  unread: number
  avatar: string
  status: "online" | "offline"
  type: "supplier" | "agency" | "freelancer"
}

export interface CollaborationMessage {
  id: string
  sender: string
  content: string
  time: string
  isOwn: boolean
  attachments?: string[]
}

export interface CollaborationTodo {
  id: string
  task: string
  completed: boolean
  priority: "high" | "medium" | "low"
  dueDate: string
}

export interface MarketplaceService {
  id: string
  title: string
  provider: string
  category: string
  price: string
  rating: number
  location: string
  image: string
  description: string
  inStock: boolean
  minOrder: string
}

export interface CollaborationData {
  conversations: CollaborationConversation[]
  messages: CollaborationMessage[]
  todos: CollaborationTodo[]
  servicesByCategory: Record<string, MarketplaceService[]>
}

export interface FoundationValue {
  icon: string
  title: string
  description: string
}

export interface FoundationImpact {
  number: string
  label: string
  description: string
}

export interface FondationData {
  foundationValues: FoundationValue[]
  foundationImpacts: FoundationImpact[]
}
