"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Camera,
  X,
  ScanLine,
  CheckCircle2,
  Leaf,
  Droplets,
  Clock,
  MapPin,
  User,
  Shield,
  Scissors,
  Sparkles,
  ChevronRight,
  Share2,
  Heart,
} from "lucide-react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"

interface ScannedProduct {
  id: string
  title: string
  designer: string
  designerImage: string
  image: string
  unlockedAt: string
  passport: {
    origin: string
    material: string
    co2Saved: string
    waterSaved: string
    workHours: string
    artisanName: string
    techniques: string[]
    certifications: string[]
  }
  careInstructions: {
    wash: string
    dry: string
    iron: string
    store: string
  }
}

const mockScannedProduct: ScannedProduct = {
  id: "1",
  title: "Robe Lambda en Soie Sauvage",
  designer: "Miora Rasoanaivo",
  designerImage: "/img/Miora.jpg",
  image: "/img/Collection3.jpg",
  unlockedAt: "10 Mars 2024",
  passport: {
    origin: "Fianarantsoa, Madagascar",
    material: "Soie sauvage (Landibe)",
    co2Saved: "2.4 kg",
    waterSaved: "1 200 litres",
    workHours: "45 heures",
    artisanName: "Soavina",
    techniques: ["Tissage à la main", "Teinture naturelle"],
    certifications: ["GOTS", "Fair Trade"],
  },
  careInstructions: {
    wash: "Lavage à la main à 30°C avec savon neutre",
    dry: "Sécher à l'ombre, ne pas essorer",
    iron: "Repassage à basse température, à l'envers",
    store: "Placer dans un sachet en coton, éviter l'humidité",
  },
}

export default function QRScanPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [scannedProduct, setScannedProduct] = useState<ScannedProduct | null>(null)
  const [isUnlocked, setIsUnlocked] = useState(false)

  const startScanning = useCallback(() => {
    setIsScanning(true)
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false)
      setScannedProduct(mockScannedProduct)
    }, 3000)
  }, [])

  const unlockStory = useCallback(() => {
    setIsUnlocked(true)
  }, [])

  const resetScan = useCallback(() => {
    setScannedProduct(null)
    setIsUnlocked(false)
  }, [])

  return (
    <div className="min-h-screen bg-white text-black pt-20">
      <Header />

      {/* Hero Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.2em] mb-6 serif-font">
              Scan & AR
            </h1>
            <div className="w-32 h-px bg-black mx-auto mb-8" />
            <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-lg">
              Scannez le QR code sur l'étiquette de votre vêtement pour débloquer son histoire
            </p>
          </div>
        </div>
      </section>

      {/* Scanner / Result */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          {!scannedProduct ? (
            /* Scanner View */
            <div className="max-w-md mx-auto">
              <Card className="border-0 shadow-xl overflow-hidden">
                <CardContent className="p-0">
                  {/* Camera View */}
                  <div className="relative aspect-square bg-gray-900">
                    {isScanning ? (
                      <>
                        {/* Scanning Animation */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="relative w-64 h-64">
                            {/* Corner markers */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-green-400" />
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-green-400" />
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-green-400" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-green-400" />

                            {/* Scanning Line */}
                            <div className="absolute left-0 right-0 h-0.5 bg-green-400 animate-scan" />
                          </div>
                        </div>

                        <div className="absolute bottom-6 left-0 right-0 text-center">
                          <p className="text-white font-light">Scan en cours...</p>
                          <p className="text-white/60 text-sm font-light mt-1">
                            Positionnez le QR code dans le cadre
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        {/* Camera Preview Placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <Camera className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-400 font-light">
                              Appuyez pour scanner
                            </p>
                          </div>
                        </div>

                        {/* Scan Button */}
                        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                          <button
                            onClick={startScanning}
                            className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                          >
                            <ScanLine className="h-8 w-8 text-black" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Instructions */}
              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-light serif-font tracking-wide text-center">
                  Comment scanner ?
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-light">
                      1
                    </div>
                    <p className="text-sm font-light text-gray-600">
                      Trouvez l'étiquette en tissu sur votre vêtement
                    </p>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-light">
                      2
                    </div>
                    <p className="text-sm font-light text-gray-600">
                      Positionnez l'appareil photo face au QR code
                    </p>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-xs font-light">
                      3
                    </div>
                    <p className="text-sm font-light text-gray-600">
                      Découvrez l'histoire complète de votre pièce
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Scanned Product Result */
            <div className="max-w-2xl mx-auto">
              {/* Success Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-light serif-font tracking-wide mb-2">
                  Pièce débloquée !
                </h2>
                <p className="text-gray-600 font-light">
                  Découvrez l'histoire de votre vêtement
                </p>
              </div>

              {/* Product Card */}
              <Card className="border-0 shadow-xl overflow-hidden mb-8">
                <CardContent className="p-0">
                  <div className="relative h-64">
                    <Image
                      src={scannedProduct.image}
                      alt={scannedProduct.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className="mb-2 bg-white/20 text-white border-white/30 backdrop-blur-sm">
                        Débloqué le {scannedProduct.unlockedAt}
                      </Badge>
                      <h3 className="text-2xl font-light text-white serif-font">
                        {scannedProduct.title}
                      </h3>
                      <p className="text-white/80 font-light">Par {scannedProduct.designer}</p>
                    </div>
                  </div>

                  {/* Passport Details */}
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <Shield className="h-5 w-5" />
                      <h4 className="font-light serif-font tracking-wide">Passeport Numérique</h4>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span className="text-xs text-gray-500 font-light uppercase">Origine</span>
                        </div>
                        <p className="font-light text-sm">{scannedProduct.passport.origin}</p>
                      </div>

                      <div className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <Leaf className="h-4 w-4 text-green-600" />
                          <span className="text-xs text-gray-500 font-light uppercase">Matériau</span>
                        </div>
                        <p className="font-light text-sm">{scannedProduct.passport.material}</p>
                      </div>

                      <div className="p-4 bg-green-50 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <Leaf className="h-4 w-4 text-green-600" />
                          <span className="text-xs text-green-600 font-light uppercase">CO₂ évité</span>
                        </div>
                        <p className="font-light text-sm text-green-700">
                          {scannedProduct.passport.co2Saved}
                        </p>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <Droplets className="h-4 w-4 text-blue-600" />
                          <span className="text-xs text-blue-600 font-light uppercase">Eau économisée</span>
                        </div>
                        <p className="font-light text-sm text-blue-700">
                          {scannedProduct.passport.waterSaved}
                        </p>
                      </div>
                    </div>

                    {/* Artisan */}
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl mb-6">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={scannedProduct.designerImage}
                          alt={scannedProduct.designer}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-light uppercase">Artisan</p>
                        <p className="font-light">{scannedProduct.passport.artisanName}</p>
                        <p className="text-xs text-gray-500 font-light">
                          {scannedProduct.passport.workHours} de travail
                        </p>
                      </div>
                    </div>

                    {/* Techniques */}
                    <div className="mb-6">
                      <p className="text-xs text-gray-500 font-light uppercase mb-2">Techniques</p>
                      <div className="flex flex-wrap gap-2">
                        {scannedProduct.passport.techniques.map((tech, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs font-light">
                            <Scissors className="h-3 w-3 mr-1" />
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Certifications */}
                    <div className="mb-6">
                      <p className="text-xs text-gray-500 font-light uppercase mb-2">Certifications</p>
                      <div className="flex flex-wrap gap-2">
                        {scannedProduct.passport.certifications.map((cert, idx) => (
                          <Badge
                            key={idx}
                            className="text-xs font-light bg-green-100 text-green-800"
                          >
                            <Shield className="h-3 w-3 mr-1" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Care Instructions */}
              {isUnlocked && (
                <Card className="border-0 shadow-md mb-8">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-6">
                      <Sparkles className="h-5 w-5" />
                      <h4 className="font-light serif-font tracking-wide">
                        Conseils d'entretien exclusifs
                      </h4>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                        <Droplets className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-light font-medium">Lavage</p>
                          <p className="text-sm text-gray-600 font-light">
                            {scannedProduct.careInstructions.wash}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                        <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-light font-medium">Séchage</p>
                          <p className="text-sm text-gray-600 font-light">
                            {scannedProduct.careInstructions.dry}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                        <Scissors className="h-5 w-5 text-orange-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-light font-medium">Repassage</p>
                          <p className="text-sm text-gray-600 font-light">
                            {scannedProduct.careInstructions.iron}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                        <Leaf className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-light font-medium">Rangement</p>
                          <p className="text-sm text-gray-600 font-light">
                            {scannedProduct.careInstructions.store}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Actions */}
              <div className="flex gap-4">
                {!isUnlocked && (
                  <Button
                    className="flex-1 bg-black text-white hover:bg-gray-800"
                    onClick={unlockStory}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Débloquer les conseils d'entretien
                  </Button>
                )}
                <Button variant="outline" className="bg-transparent">
                  <Share2 className="h-4 w-4 mr-2" />
                  Partager
                </Button>
                <Button variant="outline" className="bg-transparent">
                  <Heart className="h-4 w-4 mr-2" />
                  Favoris
                </Button>
              </div>

              {/* Scan Another */}
              <div className="text-center mt-8">
                <Button
                  variant="ghost"
                  onClick={resetScan}
                  className="text-gray-500"
                >
                  Scanner un autre produit
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Custom CSS for scan animation */}
      <style jsx>{`
        @keyframes scan {
          0% {
            top: 0;
          }
          50% {
            top: calc(100% - 2px);
          }
          100% {
            top: 0;
          }
        }
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
      `}</style>

      <Footer />
    </div>
  )
}
