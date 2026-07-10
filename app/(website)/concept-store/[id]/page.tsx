"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Droplets,
  Heart,
  Leaf,
  MapPin,
  Share2,
  Shield,
  User,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import allProducts from "@/data/products.json"
import allStylistes from "@/data/stylistes.json"

export default function ProductDetailPage() {
  const {id} = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<any>(null)
  const [styliste, setStyliste] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [currentImage, setCurrentImage] = useState(0)
  const [showPassport, setShowPassport] = useState(false)
  const [isPreordered, setIsPreordered] = useState(false)

  useEffect(() => {
    setLoading(true)
    const foundProduct = allProducts.find((p) => p.id === id)
    if (foundProduct) {
      setProduct(foundProduct)
      const foundStyliste = allStylistes.find((s) => s.id === foundProduct.designerId)
      setStyliste(foundStyliste)
    } else {
      router.push("/concept-store")
    }
    setLoading(false)
  }, [id, router])

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white text-black">
          <p className="font-light tracking-wide">Chargement du produit...</p>
        </div>
    )
  }

  if (!product) {
    return null
  }

  const preorderProgress = (product.preorder.current / product.preorder.target) * 100
  const daysLeft = Math.max(
      0,
      Math.ceil(
          (new Date(product.preorder.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      )
  )

  return (
      <div className="min-h-screen bg-white text-black pt-20">
        <Header/>

        {/* Breadcrumb */}
        <section className="py-4 bg-gray-50 border-b border-gray-100">
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-2 text-sm text-gray-500 font-light">
              <Link href="/" className="hover:text-black transition-colors">
                Accueil
              </Link>
              <span>/</span>
              <Link href="/concept-store" className="hover:text-black transition-colors">
                Concept Store
              </Link>
              <span>/</span>
              <span className="text-black">{product.title}</span>
            </div>
          </div>
        </section>

        {/* Product Detail */}
        <section className="py-16">
          <div className="container mx-auto px-6">
            <Button
                variant="ghost"
                onClick={() => router.back()}
                className="mb-8 text-sm font-light tracking-wide flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4"/>
              Retour au Concept Store
            </Button>

            <div className="grid lg:grid-cols-2 gap-16">
              {/* Product Images */}
              <div className="space-y-4">
                {/* Main Image */}
                <div className="relative h-[600px] overflow-hidden rounded-lg bg-gray-100">
                  <Image
                      src={product.gallery[currentImage]}
                      alt={product.title}
                      fill
                      className="object-cover"
                  />

                  {/* Image Navigation */}
                  <button
                      onClick={() =>
                          setCurrentImage((prev) => (prev - 1 + product.gallery.length) % product.gallery.length)
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                  >
                    <ChevronLeft className="h-5 w-5"/>
                  </button>
                  <button
                      onClick={() =>
                          setCurrentImage((prev) => (prev + 1) % product.gallery.length)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                  >
                    <ChevronRight className="h-5 w-5"/>
                  </button>

                  {/* Image Indicators */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {product.gallery.map((_: any, idx: number) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentImage(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${
                                currentImage === idx ? "bg-black w-6" : "bg-white/60"
                            }`}
                        />
                    ))}
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                <div className="flex gap-4">
                  {product.gallery.map((image: string, idx: number) => (
                      <button
                          key={idx}
                          onClick={() => setCurrentImage(idx)}
                          className={`relative w-20 h-20 overflow-hidden rounded-lg border-2 transition-all ${
                              currentImage === idx ? "border-black" : "border-transparent"
                          }`}
                      >
                        <Image src={image} alt="" fill className="object-cover"/>
                      </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-8">
                {/* Header */}
                <div>
                  <Badge variant="outline" className="mb-4 text-xs tracking-[0.15em] font-light uppercase">
                    {product.category}
                  </Badge>
                  <h1 className="text-4xl font-extralight tracking-[0.1em] mb-4 serif-font">
                    {product.title}
                  </h1>
                  <p className="text-2xl font-light text-green-700 mb-4">{product.price}</p>
                  <Link href={`/stylistes/${product.designerId}`}
                        className="text-gray-600 font-light hover:text-black transition-colors">
                    Par {product.designer}
                  </Link>
                </div>

                {/* Description */}
                <p className="text-gray-700 font-light leading-relaxed text-lg">
                  {product.description}
                </p>

                {/* Size Selection */}
                <div>
                  <h3 className="text-sm font-light tracking-[0.1em] uppercase mb-4">Taille</h3>
                  <div className="flex gap-3">
                    {product.sizes.map((size: string) => (
                        <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`w-12 h-12 border rounded-lg font-light text-sm transition-all ${
                                selectedSize === size
                                    ? "border-black bg-black text-white"
                                    : "border-gray-300 hover:border-black"
                            }`}
                        >
                          {size}
                        </button>
                    ))}
                  </div>
                </div>

                {/* Passeport Numérique Toggle */}
                <Button
                    variant="outline"
                    className="w-full justify-between bg-transparent border-gray-300 hover:border-black"
                    onClick={() => setShowPassport(!showPassport)}
                >
                <span className="flex items-center gap-2">
                  <Shield className="h-4 w-4"/>
                  Passeport Numérique
                </span>
                  <span className="text-xs">{showPassport ? "Masquer" : "Afficher"}</span>
                </Button>

                {/* Passeport Numérique Panel (Glassmorphism) */}
                {showPassport && (
                    <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
                      <h3 className="text-xl font-light mb-6 serif-font tracking-wide flex items-center gap-2">
                        <Shield className="h-5 w-5"/>
                        Passeport Numérique
                      </h3>

                      <div className="space-y-4">
                        {/* Origin */}
                        <div className="flex items-start gap-4 p-4 bg-white/50 rounded-xl">
                          <div
                              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <MapPin className="h-5 w-5 text-gray-600"/>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-light uppercase tracking-wider">Origine</p>
                            <p className="font-light">{product.passport.origin}</p>
                          </div>
                        </div>

                        {/* Material */}
                        <div className="flex items-start gap-4 p-4 bg-white/50 rounded-xl">
                          <div
                              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Leaf className="h-5 w-5 text-green-600"/>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-light uppercase tracking-wider">Matériau</p>
                            <p className="font-light">{product.passport.material}</p>
                          </div>
                        </div>

                        {/* Environmental Impact */}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 bg-green-50 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                              <Leaf className="h-4 w-4 text-green-600"/>
                              <span className="text-xs text-green-600 font-light uppercase">CO₂ évité</span>
                            </div>
                            <p className="text-xl font-light text-green-700">{product.passport.co2Saved}</p>
                          </div>
                          <div className="p-4 bg-blue-50 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                              <Droplets className="h-4 w-4 text-blue-600"/>
                              <span className="text-xs text-blue-600 font-light uppercase">Eau économisée</span>
                            </div>
                            <p className="text-xl font-light text-blue-700">{product.passport.waterSaved}</p>
                          </div>
                        </div>

                        {/* Artisan */}
                        <div className="flex items-start gap-4 p-4 bg-white/50 rounded-xl">
                          <div
                              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="h-5 w-5 text-gray-600"/>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-light uppercase tracking-wider">Artisan</p>
                            <p className="font-light">{product.passport.artisanName}</p>
                          </div>
                        </div>

                        {/* Work Hours */}
                        <div className="flex items-start gap-4 p-4 bg-white/50 rounded-xl">
                          <div
                              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <Clock className="h-5 w-5 text-gray-600"/>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 font-light uppercase tracking-wider">Heures de
                              travail</p>
                            <p className="font-light">{product.passport.workHours}</p>
                          </div>
                        </div>

                        {/* Techniques */}
                        <div className="p-4 bg-white/50 rounded-xl">
                          <p className="text-xs text-gray-500 font-light uppercase tracking-wider mb-2">Techniques</p>
                          <div className="flex flex-wrap gap-2">
                            {product.passport.techniques.map((tech: string, idx: number) => (
                                <Badge key={idx} variant="secondary" className="text-xs font-light">
                                  {tech}
                                </Badge>
                            ))}
                          </div>
                        </div>

                        {/* Certifications */}
                        <div className="p-4 bg-white/50 rounded-xl">
                          <p className="text-xs text-gray-500 font-light uppercase tracking-wider mb-2">Certifications</p>
                          <div className="flex flex-wrap gap-2">
                            {product.passport.certifications.map((cert: string, idx: number) => (
                                <Badge key={idx} className="text-xs font-light bg-green-100 text-green-800">
                                  {cert}
                                </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                )}

                {/* Précommande Dynamique */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-light serif-font tracking-wide">Précommande</h3>
                    <Badge
                        className={
                          product.preorder.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                        }
                    >
                      {daysLeft} jours restants
                    </Badge>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden mb-4">
                    <div
                        className="absolute inset-y-0 left-0 bg-green-600 rounded-full transition-all duration-1000"
                        style={{width: `${preorderProgress}%`}}
                    />
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm mb-6">
                  <span className="font-light text-gray-600">
                    <span
                        className="font-normal text-black">{product.preorder.current}</span> / {product.preorder.target} pièces nécessaires
                  </span>
                    <span className="font-light text-gray-600">
                    {product.preorder.target - product.preorder.current} pièces restantes
                  </span>
                  </div>

                  {/* Warning if close to deadline */}
                  {daysLeft <= 7 && (
                      <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg mb-4">
                        <AlertCircle className="h-4 w-4 text-orange-600"/>
                        <span className="text-sm font-light text-orange-800">
                      Attention : la précommande se termine dans {daysLeft} jours !
                    </span>
                      </div>
                  )}

                  {/* Success message if goal reached */}
                  {product.preorder.current >= product.preorder.target && (
                      <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg mb-4">
                        <CheckCircle2 className="h-4 w-4 text-green-600"/>
                        <span className="text-sm font-light text-green-800">
                      Objectif atteint ! La production va démarrer.
                    </span>
                      </div>
                  )}

                  {/* Action Button */}
                  <Button
                      className={`w-full font-light tracking-[0.1em] uppercase py-6 ${
                          isPreordered
                              ? "bg-green-600 text-white hover:bg-green-700"
                              : "bg-black text-white hover:bg-gray-800"
                      }`}
                      onClick={() => setIsPreordered(!isPreordered)}
                      disabled={product.preorder.current >= product.preorder.target}
                  >
                    {isPreordered ? (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4"/>
                          Précommande confirmée
                        </>
                    ) : product.preorder.current >= product.preorder.target ? (
                        "Objectif atteint"
                    ) : (
                        "Rejoindre la précommande"
                    )}
                  </Button>

                  {/* Impact Message */}
                  <p className="text-center text-xs text-gray-500 font-light mt-4">
                    En précommandant, vous évitez le gaspillage et soutenez l'artisanat local
                  </p>
                </div>

                {/* Share & Favorite */}
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Heart className="h-4 w-4 mr-2"/>
                    Favoris
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <Share2 className="h-4 w-4 mr-2"/>
                    Partager
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer/>
      </div>
  )
}
