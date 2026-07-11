"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ShoppingBag,
  ChevronUp,
  Leaf,
  MapPin,
  Clock,
} from "lucide-react"
import Image from "next/image"

interface StoryItem {
  id: string
  title: string
  designer: string
  designerImage: string
  image: string
  category: string
  price: string
  likes: number
  comments: number
  description: string
  impact: {
    co2: string
    origin: string
    hours: string
  }
}

const stories: StoryItem[] = [
  {
    id: "1",
    title: "Robe Lambda en Soie Sauvage",
    designer: "Miora Rasoanaivo",
    designerImage: "/img/Miora.jpg",
    image: "/img/Collection3.jpg",
    category: "Couture",
    price: "150 000 Ar",
    likes: 234,
    comments: 18,
    description: "Tissée à la main avec de la soie sauvage landibe, cette robe célèbre l'héritage textile malgache.",
    impact: { co2: "2.4 kg", origin: "Fianarantsoa", hours: "45h" },
  },
  {
    id: "2",
    title: "Veste Upcycled Denim",
    designer: "Hery Andriantsoa",
    designerImage: "/img/Hery.jpg",
    image: "/img/Collection1.jpg",
    category: "Durable",
    price: "200 000 Ar",
    likes: 189,
    comments: 12,
    description: "Design circulaire en denim recyclé. Zéro déchet, style maximal.",
    impact: { co2: "3.8 kg", origin: "Antananarivo", hours: "32h" },
  },
  {
    id: "3",
    title: "T-Shirt Graphique Malgache",
    designer: "Lalaina Rakoto",
    designerImage: "/img/Lalaina.jpg",
    image: "/img/Collection2.jpg",
    category: "Streetwear",
    price: "80 000 Ar",
    likes: 412,
    comments: 34,
    description: "Art urbain meets identité malgache. Coton bio, impressions éco-responsables.",
    impact: { co2: "1.2 kg", origin: "Toamasina", hours: "8h" },
  },
  {
    id: "4",
    title: "Écharpe Lamba Moderne",
    designer: "Miora Rasoanaivo",
    designerImage: "/img/Miora.jpg",
    image: "/img/Collection4.jpg",
    category: "Accessoires",
    price: "120 000 Ar",
    likes: 156,
    comments: 9,
    description: "Le lamba traditionnel revisité pour le contemporain. Héritage porté avec fierté.",
    impact: { co2: "1.8 kg", origin: "Antananarivo", hours: "28h" },
  },
  {
    id: "5",
    title: "Soie Sauvage Exclusive",
    designer: "Hery Andriantsoa",
    designerImage: "/img/Hery.jpg",
    image: "/img/Collection5.jpg",
    category: "Haute Couture",
    price: "300 000 Ar",
    likes: 298,
    comments: 22,
    description: "Édition limitée en landibe brut. Chaque pièce est une œuvre d'art naturelle.",
    impact: { co2: "4.2 kg", origin: "Fianarantsoa", hours: "60h" },
  },
  {
    id: "6",
    title: "Nouvelle Vague Urban",
    designer: "Lalaina Rakoto",
    designerImage: "/img/Lalaina.jpg",
    image: "/img/Collection6.jpg",
    category: "Avant-garde",
    price: "250 000 Ar",
    likes: 367,
    comments: 28,
    description: "Sculptures portables qui repoussent les limites de la mode contemporaine.",
    impact: { co2: "2.9 kg", origin: "Toamasina", hours: "40h" },
  },
]

export default function FluxStory() {
  const [currentStory, setCurrentStory] = useState(0)
  const [liked, setLiked] = useState<Record<string, boolean>>({})
  const [saved, setSaved] = useState<Record<string, boolean>>({})
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const touchStartY = useRef(0)
  const isDragging = useRef(false)

  const story = stories[currentStory]

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
    isDragging.current = true
  }, [])

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging.current) return
      isDragging.current = false

      const touchEndY = e.changedTouches[0].clientY
      const diff = touchStartY.current - touchEndY

      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentStory < stories.length - 1) {
          setCurrentStory((prev) => prev + 1)
        } else if (diff < 0 && currentStory > 0) {
          setCurrentStory((prev) => prev - 1)
        }
      }
    },
    [currentStory]
  )

  const handleDoubleClick = useCallback(() => {
    setLiked((prev) => ({ ...prev, [story.id]: true }))
  }, [story.id])

  const toggleLike = useCallback(() => {
    setLiked((prev) => ({ ...prev, [story.id]: !prev[story.id] }))
  }, [story.id])

  const toggleSave = useCallback(() => {
    setSaved((prev) => ({ ...prev, [story.id]: !prev[story.id] }))
  }, [story.id])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" && currentStory < stories.length - 1) {
        setCurrentStory((prev) => prev + 1)
      } else if (e.key === "ArrowUp" && currentStory > 0) {
        setCurrentStory((prev) => prev - 1)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentStory])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Story Content */}
      <div className="relative w-full h-full">
        {/* Background Image */}
        <Image
          src={story.image}
          alt={story.title}
          fill
          className="object-cover"
          priority
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70" />

        {/* Top Bar */}
        <div className="absolute top-0 left-0 right-0 p-4 z-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                <Image
                  src={story.designerImage}
                  alt={story.designer}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-white text-sm font-light">{story.designer}</p>
                <p className="text-white/70 text-xs font-light">Créateur</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4 text-white" />
                ) : (
                  <Volume2 className="h-4 w-4 text-white" />
                )}
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4 text-white" />
                ) : (
                  <Play className="h-4 w-4 text-white ml-0.5" />
                )}
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4 flex gap-1">
            {stories.map((_, idx) => (
              <div
                key={idx}
                className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden"
              >
                <div
                  className={`h-full bg-white rounded-full transition-all duration-300 ${
                    idx < currentStory
                      ? "w-full"
                      : idx === currentStory
                      ? "w-full"
                      : "w-0"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="absolute right-4 bottom-32 z-20 flex flex-col items-center gap-6">
          {/* Like */}
          <button
            onClick={toggleLike}
            onDoubleClick={handleDoubleClick}
            className="flex flex-col items-center"
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                liked[story.id]
                  ? "bg-red-500 scale-110"
                  : "bg-white/20 backdrop-blur-sm"
              }`}
            >
              <Heart
                className={`h-6 w-6 ${
                  liked[story.id] ? "text-white fill-white" : "text-white"
                }`}
              />
            </div>
            <span className="text-white text-xs font-light mt-1">
              {story.likes + (liked[story.id] ? 1 : 0)}
            </span>
          </button>

          {/* Comment */}
          <button className="flex flex-col items-center">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <MessageCircle className="h-6 w-6 text-white" />
            </div>
            <span className="text-white text-xs font-light mt-1">{story.comments}</span>
          </button>

          {/* Save */}
          <button onClick={toggleSave} className="flex flex-col items-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                saved[story.id]
                  ? "bg-yellow-500"
                  : "bg-white/20 backdrop-blur-sm"
              }`}
            >
              <Bookmark
                className={`h-6 w-6 ${
                  saved[story.id] ? "text-white fill-white" : "text-white"
                }`}
              />
            </div>
            <span className="text-white text-xs font-light mt-1">Sauver</span>
          </button>

          {/* Share */}
          <button className="flex flex-col items-center">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <Share2 className="h-6 w-6 text-white" />
            </div>
            <span className="text-white text-xs font-light mt-1">Partager</span>
          </button>
        </div>

        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-20 p-6 z-20">
          {/* Category Badge */}
          <Badge className="mb-3 bg-white/20 text-white border-white/30 backdrop-blur-sm font-light tracking-wide">
            {story.category}
          </Badge>

          {/* Title */}
          <h2 className="text-2xl font-extralight tracking-wide text-white mb-2 serif-font">
            {story.title}
          </h2>

          {/* Description */}
          <p className="text-white/80 font-light text-sm mb-4 line-clamp-2">
            {story.description}
          </p>

          {/* Impact Tags */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <Leaf className="h-3 w-3 text-green-400" />
              <span className="text-white text-xs font-light">{story.impact.co2}</span>
            </div>
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <MapPin className="h-3 w-3 text-white/70" />
              <span className="text-white text-xs font-light">{story.impact.origin}</span>
            </div>
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <Clock className="h-3 w-3 text-white/70" />
              <span className="text-white text-xs font-light">{story.impact.hours}</span>
            </div>
          </div>

          {/* Price & CTA */}
          <div className="flex items-center justify-between">
            <span className="text-xl font-light text-white">{story.price}</span>
            <Button className="bg-white text-black hover:bg-gray-200 font-light tracking-[0.1em] uppercase text-xs">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Voir la pièce
            </Button>
          </div>
        </div>

        {/* Swipe Up Indicator */}
        {currentStory < stories.length - 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 animate-bounce">
            <ChevronUp className="h-6 w-6 text-white/50" />
          </div>
        )}

        {/* Double Tap Heart Animation */}
        {liked[story.id] && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <Heart className="h-24 w-24 text-red-500 fill-red-500 animate-ping" />
          </div>
        )}
      </div>
    </div>
  )
}
