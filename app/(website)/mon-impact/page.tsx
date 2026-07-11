"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Leaf,
  Droplets,
  Wind,
  TreePine,
  ShoppingBag,
  TrendingUp,
  ArrowUpRight,
  Recycle,
  Heart,
  Award,
  Package,
  ChevronRight,
  Download,
  Share2,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

const impactStats = {
  co2Saved: 47.2,
  waterSaved: 234000,
  wasteReduced: 89,
  treesEquivalent: 12,
  fastFashionComparison: {
    co2: 180,
    water: 750000,
    waste: 95,
  },
}

const recentOrders = [
  {
    id: "ORD-001",
    product: "Robe Lambda en Soie Sauvage",
    designer: "Miora Rasoanaivo",
    image: "/img/Collection3.jpg",
    date: "2024-03-10",
    status: "delivered",
    impact: { co2: 2.4, water: 1200 },
  },
  {
    id: "ORD-002",
    product: "Veste Upcycled Denim",
    designer: "Hery Andriantsoa",
    image: "/img/Collection1.jpg",
    date: "2024-03-05",
    status: "shipped",
    impact: { co2: 3.8, water: 2500 },
  },
  {
    id: "ORD-003",
    product: "T-Shirt Graphique Malgache",
    designer: "Lalaina Rakoto",
    image: "/img/Collection2.jpg",
    date: "2024-02-28",
    status: "delivered",
    impact: { co2: 1.2, water: 800 },
  },
  {
    id: "ORD-004",
    product: "Écharpe Lamba Moderne",
    designer: "Miora Rasoanaivo",
    image: "/img/Collection4.jpg",
    date: "2024-02-20",
    status: "delivered",
    impact: { co2: 1.8, water: 900 },
  },
]

const monthlyImpact = [
  { month: "Oct", co2: 8.2, water: 38000 },
  { month: "Nov", co2: 12.5, water: 56000 },
  { month: "Déc", co2: 15.8, water: 72000 },
  { month: "Jan", co2: 10.7, water: 68000 },
]

export default function MonImpactPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "compare">("overview")

  const maxCo2 = Math.max(...monthlyImpact.map((m) => m.co2))

  return (
    <div className="min-h-screen bg-white text-black pt-20">
      <Header />

      {/* Hero Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.2em] mb-6 serif-font">
              Mon Impact
            </h1>
            <div className="w-32 h-px bg-black mx-auto mb-8" />
            <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-lg">
              Suivez votre contribution à la mode durable. Chaque aqueste compte pour la planète.
            </p>
          </div>

          {/* Impact Score Circle */}
          <div className="flex justify-center mb-12">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="#16a34a"
                  strokeWidth="8"
                  strokeDasharray={`${(impactStats.wasteReduced / 100) * 283} 283`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-light serif-font text-green-700">
                  {impactStats.wasteReduced}%
                </span>
                <span className="text-xs text-gray-500 font-light uppercase tracking-wider">
                  Éco-Score
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="py-8 -mt-8">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center">
                    <Wind className="h-7 w-7 text-green-600" />
                  </div>
                  <div>
                    <p className="text-3xl font-light serif-font">{impactStats.co2Saved}</p>
                    <p className="text-sm text-gray-500 font-light">kg CO₂ évités</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center">
                    <Droplets className="h-7 w-7 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-3xl font-light serif-font">
                      {(impactStats.waterSaved / 1000).toFixed(0)}k
                    </p>
                    <p className="text-sm text-gray-500 font-light">litres d'eau</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-orange-50 rounded-full flex items-center justify-center">
                    <Recycle className="h-7 w-7 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-3xl font-light serif-font">{impactStats.wasteReduced}%</p>
                    <p className="text-sm text-gray-500 font-light">déchets évités</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center">
                    <TreePine className="h-7 w-7 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-3xl font-light serif-font">{impactStats.treesEquivalent}</p>
                    <p className="text-sm text-gray-500 font-light">arbres sauvés</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <div className="flex gap-4 border-b border-gray-200 mb-8">
            {[
              { key: "overview", label: "Aperçu" },
              { key: "orders", label: "Mes Commandes" },
              { key: "compare", label: "Comparaison" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`px-6 py-4 text-sm font-light tracking-[0.1em] uppercase transition-all border-b-2 -mb-px ${
                  activeTab === tab.key
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-black"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Monthly Impact Chart */}
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-lg font-light serif-font tracking-wide mb-6">
                    Impact Mensuel (kg CO₂)
                  </h3>
                  <div className="flex items-end justify-between h-48 gap-4">
                    {monthlyImpact.map((m, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center">
                        <div
                          className="w-full bg-green-600 rounded-t transition-all duration-500"
                          style={{ height: `${(m.co2 / maxCo2) * 100}%` }}
                        />
                        <span className="text-xs font-light text-gray-500 mt-2">{m.month}</span>
                        <span className="text-xs font-light text-green-600">{m.co2}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Impact Breakdown */}
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-lg font-light serif-font tracking-wide mb-6">
                    Répartition de l'Impact
                  </h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-light">CO₂ évité</span>
                        <span className="text-sm font-light text-green-600">{impactStats.co2Saved} kg</span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-600 rounded-full"
                          style={{ width: "75%" }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-light">Eau économisée</span>
                        <span className="text-sm font-light text-blue-600">
                          {(impactStats.waterSaved / 1000).toFixed(0)}k L
                        </span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: "65%" }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-light">Déchets recyclés</span>
                        <span className="text-sm font-light text-orange-600">
                          {impactStats.wasteReduced}%
                        </span>
                      </div>
                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-orange-600 rounded-full"
                          style={{ width: `${impactStats.wasteReduced}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-green-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Award className="h-6 w-6 text-green-600" />
                      <div>
                        <p className="font-light text-sm">Badge obtenu</p>
                        <p className="text-green-700 font-light">Éco-Warrior Niveau 3</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              {recentOrders.map((order) => (
                <Card key={order.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Product Image */}
                      <div className="relative w-full md:w-32 h-32 overflow-hidden rounded-lg flex-shrink-0">
                        <Image
                          src={order.image}
                          alt={order.product}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Order Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-light serif-font tracking-wide">{order.product}</h3>
                            <p className="text-sm text-gray-500 font-light">Par {order.designer}</p>
                          </div>
                          <Badge
                            className={`text-xs font-light ${
                              order.status === "delivered"
                                ? "bg-green-100 text-green-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {order.status === "delivered" ? "Livré" : "En transit"}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-gray-600 font-light mt-4">
                          <span>Commande {order.id}</span>
                          <span>{order.date}</span>
                        </div>

                        {/* Impact from this order */}
                        <div className="flex items-center gap-4 mt-4 p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-1 text-xs">
                            <Wind className="h-3 w-3 text-green-600" />
                            <span className="font-light">{order.impact.co2} kg CO₂</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs">
                            <Droplets className="h-3 w-3 text-blue-600" />
                            <span className="font-light">{order.impact.water} L</span>
                          </div>
                        </div>
                      </div>

                      {/* Passeport Link */}
                      <div className="flex items-center">
                        <Link href={`/concept-store/${order.id.replace("ORD-", "")}`}>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            Passeport
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Compare Tab */}
          {activeTab === "compare" && (
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-md">
                <CardContent className="p-8">
                  <h3 className="text-xl font-light serif-font tracking-wide mb-6 text-center">
                    Haj'Aina vs Fast Fashion
                  </h3>

                  <div className="space-y-8">
                    {/* CO2 Comparison */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-light">Empreinte CO₂</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-light w-20">Haj'Aina</span>
                          <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-600 rounded-full flex items-center justify-end pr-2"
                              style={{ width: `${(impactStats.co2Saved / impactStats.fastFashionComparison.co2) * 100}%` }}
                            >
                              <span className="text-[10px] text-white font-light">{impactStats.co2Saved} kg</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-light w-20">Fast Fashion</span>
                          <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-red-400 rounded-full flex items-center justify-end pr-2"
                              style={{ width: "100%" }}
                            >
                              <span className="text-[10px] text-white font-light">
                                {impactStats.fastFashionComparison.co2} kg
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Water Comparison */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-light">Consommation d'eau</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-light w-20">Haj'Aina</span>
                          <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full flex items-center justify-end pr-2"
                              style={{ width: `${(impactStats.waterSaved / impactStats.fastFashionComparison.water) * 100}%` }}
                            >
                              <span className="text-[10px] text-white font-light">
                                {(impactStats.waterSaved / 1000).toFixed(0)}k L
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-light w-20">Fast Fashion</span>
                          <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-red-400 rounded-full flex items-center justify-end pr-2"
                              style={{ width: "100%" }}
                            >
                              <span className="text-[10px] text-white font-light">
                                {(impactStats.fastFashionComparison.water / 1000).toFixed(0)}k L
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Waste Comparison */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-light">Déchets générés</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-light w-20">Haj'Aina</span>
                          <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-600 rounded-full flex items-center justify-end pr-2"
                              style={{ width: `${100 - impactStats.fastFashionComparison.waste}%` }}
                            >
                              <span className="text-[10px] text-white font-light">
                                {100 - impactStats.fastFashionComparison.waste}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-light w-20">Fast Fashion</span>
                          <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-red-400 rounded-full flex items-center justify-end pr-2"
                              style={{ width: "100%" }}
                            >
                              <span className="text-[10px] text-white font-light">
                                {impactStats.fastFashionComparison.waste}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-green-50 rounded-xl text-center">
                    <p className="text-green-700 font-light">
                      Vous avez économisé{" "}
                      <span className="font-normal">
                        {impactStats.fastFashionComparison.co2 - impactStats.co2Saved} kg de CO₂
                      </span>{" "}
                      par rapport à la fast fashion
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="space-y-6">
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-light serif-font tracking-wide mb-4">
                      Partagez votre impact
                    </h3>
                    <p className="text-gray-600 font-light text-sm mb-6">
                      Montrez à vos amis votre engagement pour la mode durable
                    </p>
                    <div className="flex gap-3">
                      <Button className="flex-1 bg-black text-white hover:bg-gray-800">
                        <Share2 className="h-4 w-4 mr-2" />
                        Partager
                      </Button>
                      <Button variant="outline" className="bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Certificat
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-light serif-font tracking-wide mb-4">
                      Continuez votre impact
                    </h3>
                    <p className="text-gray-600 font-light text-sm mb-6">
                      Découvrez de nouvelles pièces éthiques et éco-responsables
                    </p>
                    <Link href="/concept-store">
                      <Button className="w-full bg-green-700 text-white hover:bg-green-600">
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Explorer le Concept Store
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md bg-gray-50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                        <Heart className="h-8 w-8 text-red-500" />
                      </div>
                      <div>
                        <p className="font-light serif-font">Merci !</p>
                        <p className="text-sm text-gray-600 font-light">
                          Votre choix fait la différence pour la planète et les artisans malgaches
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
