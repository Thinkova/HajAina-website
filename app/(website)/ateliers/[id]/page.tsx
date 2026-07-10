"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowLeft,
  Award,
  Calendar,
  ChevronRight,
  Droplets,
  Handshake,
  Leaf,
  MapPin,
  Pause,
  Play,
  Shield,
  Trash2,
  Users,
  Wind,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import allAteliers from "@/data/ateliers.json"
import allStylistes from "@/data/stylistes.json"

const certIcons: Record<string, any> = {
  leaf: Leaf,
  handshake: Handshake,
  shield: Shield,
  award: Award,
}

export default function AtelierVirtuelPage() {
  const {id} = useParams()
  const router = useRouter()
  const [atelier, setAtelier] = useState<any>(null)
  const [styliste, setStyliste] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    setLoading(true)
    const foundAtelier = allAteliers.find((a) => a.id === id)
    if (foundAtelier) {
      setAtelier(foundAtelier)
      const foundStyliste = allStylistes.find((s) => s.id === foundAtelier.stylisteId)
      setStyliste(foundStyliste)
    } else {
      router.push("/ateliers")
    }
    setLoading(false)
  }, [id, router])

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white text-black">
          <p className="font-light tracking-wide">Chargement de l'atelier...</p>
        </div>
    )
  }

  if (!atelier || !styliste) {
    return null
  }

  return (
      <div className="min-h-screen bg-white text-black pt-20">
        <Header/>

        {/* Hero Section with Video Background */}
        <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
          {/* Video Background */}
          <div className="absolute inset-0 bg-[#0b0b0b]">
            <video
                autoPlay
                muted
                loop
                playsInline
                className={`w-full h-full object-cover transition-opacity duration-1000 ${
                    isPlaying ? "opacity-60" : "opacity-30"
                }`}
            >
              <source src={atelier.videoUrl} type="video/mp4"/>
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"/>
          </div>

          {/* Play/Pause Control */}
          <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute top-24 right-6 z-20 bg-white/20 backdrop-blur-sm p-3 rounded-full hover:bg-white/30 transition-colors"
          >
            {isPlaying ? (
                <Pause className="h-5 w-5 text-white"/>
            ) : (
                <Play className="h-5 w-5 text-white"/>
            )}
          </button>

          {/* Hero Content */}
          <div className="absolute inset-0 z-10 flex items-end">
            <div className="container mx-auto px-6 pb-16">
              <Button
                  variant="ghost"
                  onClick={() => router.back()}
                  className="mb-6 text-white/80 hover:text-white text-sm font-light tracking-wide flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4"/>
                Retour aux ateliers
              </Button>

              <div className="flex items-end justify-between flex-wrap gap-8">
                <div>
                  <Badge
                      className="mb-4 bg-white/20 text-white border-white/30 backdrop-blur-sm font-light tracking-wide">
                    Atelier Virtuel
                  </Badge>
                  <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.2em] mb-4 serif-font text-white">
                    {atelier.name}
                  </h1>
                  <p className="text-xl md:text-2xl font-meliora font-light tracking-[0.05em] text-white/90">
                    {atelier.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-6 text-white/80">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4"/>
                    <span className="font-light text-sm">{atelier.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4"/>
                    <span className="font-light text-sm">Fondé en {atelier.founded}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4"/>
                    <span className="font-light text-sm">{atelier.artisansCount} artisans</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Creator Profile Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-3 gap-16 items-start">
              {/* Creator Image & Quick Info */}
              <div className="lg:col-span-1">
                <div className="relative h-[400px] overflow-hidden rounded-lg shadow-lg mb-8">
                  <Image
                      src={styliste.image}
                      alt={styliste.name}
                      fill
                      className="object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-extralight tracking-[0.1em] serif-font">
                    {styliste.name}
                  </h2>
                  <Badge variant="outline" className="text-sm tracking-[0.15em] font-light uppercase">
                    {styliste.specialty}
                  </Badge>
                  <p className="text-gray-700 leading-relaxed font-light text-lg">
                    {styliste.bio}
                  </p>
                </div>
              </div>

              {/* Workshop Description & Certifications */}
              <div className="lg:col-span-2 space-y-12">
                <div>
                  <h2 className="text-4xl font-extralight tracking-[0.1em] serif-font mb-6">
                    L'Atelier
                  </h2>
                  <div className="w-32 h-px bg-black mb-8"/>
                  <p className="text-gray-700 leading-relaxed font-light text-lg">
                    {atelier.workshopDescription}
                  </p>
                </div>

                {/* Certifications */}
                <div>
                  <h3 className="text-2xl font-light mb-6 serif-font">Certifications</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {atelier.certifications.map((cert: any, idx: number) => {
                      const Icon = certIcons[cert.icon] || Award
                      return (
                          <Card key={idx} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                              <div className="flex items-start gap-4">
                                <div
                                    className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                                  <Icon className="h-6 w-6 text-green-700"/>
                                </div>
                                <div>
                                  <h4 className="font-light text-lg tracking-wide mb-1">{cert.name}</h4>
                                  <p className="text-xs text-gray-500 font-light uppercase tracking-wider mb-2">
                                    {cert.label}
                                  </p>
                                  <p className="text-gray-600 font-light text-sm leading-relaxed">
                                    {cert.description}
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                      )
                    })}
                  </div>
                </div>

                {/* Impact Statistics */}
                <div className="bg-gray-50 rounded-lg p-8">
                  <h3 className="text-2xl font-light mb-6 serif-font">Notre Impact</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div
                          className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Wind className="h-6 w-6 text-green-700"/>
                      </div>
                      <div className="text-2xl font-light serif-font">{atelier.impactStats.co2Saved}</div>
                      <div className="text-xs text-gray-600 font-light uppercase tracking-wide">CO₂ évité</div>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Droplets className="h-6 w-6 text-blue-700"/>
                      </div>
                      <div className="text-2xl font-light serif-font">{atelier.impactStats.waterSaved}</div>
                      <div className="text-xs text-gray-600 font-light uppercase tracking-wide">Eau économisée</div>
                    </div>
                    <div className="text-center">
                      <div
                          className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Trash2 className="h-6 w-6 text-orange-700"/>
                      </div>
                      <div className="text-2xl font-light serif-font">{atelier.impactStats.wasteReduced}</div>
                      <div className="text-xs text-gray-600 font-light uppercase tracking-wide">Déchets réduits</div>
                    </div>
                    <div className="text-center">
                      <div
                          className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Users className="h-6 w-6 text-purple-700"/>
                      </div>
                      <div className="text-2xl font-light serif-font">{atelier.impactStats.localEmployment}</div>
                      <div className="text-xs text-gray-600 font-light uppercase tracking-wide">Emplois locaux</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upcycling Process Timeline */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-extralight tracking-[0.2em] mb-6 serif-font">
                Processus d'Upcycling
              </h2>
              <div className="w-32 h-px bg-black mx-auto mb-8"/>
              <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-lg">
                Découvrez comment nous transformons les matériaux en créations uniques,
                de la collecte à la finition
              </p>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-300 hidden md:block"/>

              <div className="space-y-12">
                {atelier.upcyclingProcess.map((step: any, idx: number) => (
                    <div
                        key={idx}
                        className={`relative flex items-center gap-8 cursor-pointer group ${
                            idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                        }`}
                        onClick={() => setActiveStep(idx)}
                    >
                      {/* Step Number */}
                      <div
                          className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-black text-white rounded-full flex items-center justify-center z-10 font-light text-sm group-hover:scale-110 transition-transform">
                        {step.step}
                      </div>

                      {/* Content Card */}
                      <div className={`md:w-5/12 ${idx % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                        <Card
                            className={`border-0 shadow-md hover:shadow-lg transition-all ${
                                activeStep === idx ? "ring-2 ring-black" : ""
                            }`}
                        >
                          <CardContent className="p-6">
                            <div className="relative h-48 overflow-hidden rounded-lg mb-4">
                              <Image
                                  src={step.image}
                                  alt={step.title}
                                  fill
                                  className="object-cover"
                              />
                            </div>
                            <h4 className="text-xl font-light mb-2 serif-font tracking-wide">
                              {step.title}
                            </h4>
                            <p className="text-gray-600 font-light text-sm leading-relaxed">
                              {step.description}
                            </p>
                          </CardContent>
                        </Card>
                      </div>

                      {/* Spacer for alternating layout */}
                      <div className="hidden md:block md:w-5/12"/>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Workshop Gallery */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extralight tracking-[0.2em] mb-6 serif-font">
                Galerie de l'Atelier
              </h2>
              <div className="w-32 h-px bg-black mx-auto mb-8"/>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {atelier.gallery.map((image: string, idx: number) => (
                  <div
                      key={idx}
                      className="relative h-64 overflow-hidden rounded-lg group cursor-pointer"
                  >
                    <Image
                        src={image}
                        alt={`Atelier ${idx + 1}`}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div
                        className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"/>
                  </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Collections */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extralight tracking-[0.2em] mb-6 serif-font">
                Collections de {styliste.name}
              </h2>
              <div className="w-32 h-px bg-black mx-auto mb-8"/>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {styliste.featuredCollections.map((col: any, idx: number) => (
                  <Link key={idx} href={col.link} className="group block">
                    <div className="relative h-80 overflow-hidden rounded-lg shadow-md">
                      <Image
                          src={col.image}
                          alt={col.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"/>
                      <div className="absolute bottom-8 left-8 right-8">
                        <h3 className="text-2xl font-light text-white serif-font tracking-wide mb-2">
                          {col.title}
                        </h3>
                        <div className="flex items-center text-white/80 text-sm font-light">
                          <span>Voir la collection</span>
                          <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"/>
                        </div>
                      </div>
                    </div>
                  </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-black text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-5xl font-extralight tracking-[0.2em] mb-6 serif-font">
              Rejoignez l'Aventure
            </h2>
            <div className="w-32 h-px bg-white mx-auto mb-8"/>
            <p className="text-xl text-gray-300 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
              Découvrez les pièces uniques de {styliste.name} et participez à la révolution de la mode éthique à
              Madagascar
            </p>
            <div className="flex gap-4 justify-center">
              <Link href={`/collections`}>
                <Button
                    className="bg-white text-black hover:bg-gray-200 font-light tracking-[0.1em] uppercase px-8 py-3">
                  Explorer les Collections
                </Button>
              </Link>
              <Link href="/concept-store">
                <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-black bg-transparent font-light tracking-[0.1em] uppercase px-8 py-3"
                >
                  Concept Store
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <Footer/>
      </div>
  )
}
