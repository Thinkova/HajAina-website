"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, MapPin, Play, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import allAteliers from "@/data/ateliers.json"
import allStylistes from "@/data/stylistes.json"

export default function AteliersPage() {
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
      <div className="min-h-screen bg-white text-black pt-20">
        <Header/>

        {/* Hero Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.2em] mb-6 serif-font">
                Les Ateliers
              </h1>
              <div className="w-32 h-px bg-black mx-auto mb-8"/>
              <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-lg">
                Entrez dans l'univers de nos créateurs. Découvrez leurs ateliers virtuels,
                leur processus créatif et leur engagement pour une mode plus durable
              </p>
            </div>
          </div>
        </section>

        {/* Ateliers Grid */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {allAteliers.map((atelier) => {
                const styliste = allStylistes.find((s) => s.id === atelier.stylisteId)
                return (
                    <Link
                        key={atelier.id}
                        href={`/ateliers/${atelier.id}`}
                        className="group block"
                        onMouseEnter={() => setHoveredId(atelier.id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                      <Card
                          className="border-0 shadow-none hover:shadow-2xl transition-all duration-500 overflow-hidden h-full">
                        <CardContent className="p-0 h-full flex flex-col">
                          {/* Cover Image with Video Preview */}
                          <div className="relative h-72 overflow-hidden">
                            <Image
                                src={atelier.coverImage}
                                alt={atelier.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"/>

                            {/* Play Button Overlay */}
                            <div
                                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                                    hoveredId === atelier.id ? "opacity-100" : "opacity-0"
                                }`}
                            >
                              <div
                                  className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                                <Play className="h-6 w-6 text-black ml-1"/>
                              </div>
                            </div>

                            {/* Creator Badge */}
                            <div className="absolute top-4 left-4">
                              <Badge
                                  className="bg-white/20 text-white border-white/30 backdrop-blur-sm font-light tracking-wide">
                                {styliste?.specialty}
                              </Badge>
                            </div>

                            {/* Impact Badge */}
                            <div className="absolute top-4 right-4">
                              <Badge className="bg-green-600 text-white border-green-700 font-light tracking-wide">
                                {atelier.impactStats.wasteReduced} zéro déchet
                              </Badge>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-8 flex-1 flex flex-col">
                            <h3 className="text-2xl font-light mb-2 serif-font tracking-wide group-hover:text-green-700 transition-colors">
                              {atelier.name}
                            </h3>
                            <p className="text-gray-500 font-meliora text-sm mb-4 italic">
                              {atelier.tagline}
                            </p>

                            {/* Quick Stats */}
                            <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4"/>
                                <span className="font-light">{atelier.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="h-4 w-4"/>
                                <span className="font-light">{atelier.artisansCount} artisans</span>
                              </div>
                            </div>

                            {/* Certifications */}
                            <div className="flex flex-wrap gap-2 mb-6">
                              {atelier.certifications.map((cert: any, idx: number) => (
                                  <Badge
                                      key={idx}
                                      variant="outline"
                                      className="text-xs font-light"
                                  >
                                    {cert.name}
                                  </Badge>
                              ))}
                            </div>

                            {/* CTA */}
                            <div
                                className="mt-auto flex items-center text-sm font-light tracking-wide text-black group-hover:text-green-700 transition-colors">
                              <span>Visiter l'atelier</span>
                              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform"/>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                )
              })}
            </div>
          </div>
        </section>

        <Footer/>
      </div>
  )
}
