"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, BarChart3, Package, Shield } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

const studioFeatures = [
  {
    title: "Analytics",
    description:
        "Suivez vos ventes, précommandes et performances en temps réel avec des graphiques détaillés",
    icon: BarChart3,
    href: "/studio/analytics",
    color: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    title: "Catalogue",
    description:
        "Gérez votre catalogue de produits, ajoutez de nouvelles pièces et calculez votre éco-score",
    icon: Package,
    href: "/studio/catalogue",
    color: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    title: "Sourcing & Certifications",
    description:
        "Uploadez vos labels (GOTS, OEKO-TEX) et gérez la traçabilité de vos matériaux",
    icon: Shield,
    href: "/studio/sourcing",
    color: "bg-purple-50",
    iconColor: "text-purple-600",
  },
]

export default function StudioPage() {
  return (
      <div className="min-h-screen bg-white text-black pt-20">
        <Header/>

        {/* Hero Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.2em] mb-6 serif-font">
                Studio Créateur
              </h1>
              <div className="w-32 h-px bg-black mx-auto mb-8"/>
              <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-lg">
                Votre espace professionnel pour gérer vos ventes, votre catalogue et vos certifications.
                Tout ce dont vous avez besoin pour développer votre marque éthique
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              {studioFeatures.map((feature, idx) => {
                const Icon = feature.icon
                return (
                    <Link key={idx} href={feature.href} className="group block">
                      <Card
                          className="h-full border-0 shadow-md hover:shadow-xl transition-all duration-500 group-hover:-translate-y-1">
                        <CardContent className="p-8">
                          <div
                              className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                          >
                            <Icon className={`h-8 w-8 ${feature.iconColor}`}/>
                          </div>
                          <h3 className="text-2xl font-light serif-font tracking-wide mb-4">
                            {feature.title}
                          </h3>
                          <p className="text-gray-600 font-light leading-relaxed mb-6">
                            {feature.description}
                          </p>
                          <div
                              className="flex items-center text-sm font-light tracking-wide text-black group-hover:text-green-700 transition-colors">
                            <span>Accéder</span>
                            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform"/>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extralight tracking-[0.2em] mb-6 serif-font">
                Aperçu Rapide
              </h2>
              <div className="w-32 h-px bg-black mx-auto"/>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-light serif-font mb-2">6</div>
                <div className="text-sm text-gray-600 font-light uppercase tracking-wide">Collections</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light serif-font mb-2">24</div>
                <div className="text-sm text-gray-600 font-light uppercase tracking-wide">Produits</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light serif-font mb-2">85</div>
                <div className="text-sm text-gray-600 font-light uppercase tracking-wide">Éco-Score Moyen</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-light serif-font mb-2">2</div>
                <div className="text-sm text-gray-600 font-light uppercase tracking-wide">Certifications</div>
              </div>
            </div>
          </div>
        </section>

        <Footer/>
      </div>
  )
}
