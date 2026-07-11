"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  ChevronRight,
  Download,
  Eye,
  Leaf,
  Droplets,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

const orders = [
  {
    id: "ORD-2024-001",
    product: "Robe Lambda en Soie Sauvage",
    designer: "Miora Rasoanaivo",
    image: "/img/Collection3.jpg",
    date: "10 Mars 2024",
    amount: "150 000 Ar",
    status: "delivered",
    deliveryDate: "28 Mars 2024",
    tracking: "MG-123456789",
    impact: { co2: 2.4, water: 1200 },
    passport: {
      origin: "Fianarantsoa",
      material: "Soie sauvage",
      artisan: "Soavina",
    },
  },
  {
    id: "ORD-2024-002",
    product: "Veste Upcycled Denim",
    designer: "Hery Andriantsoa",
    image: "/img/Collection1.jpg",
    date: "5 Mars 2024",
    amount: "200 000 Ar",
    status: "shipped",
    estimatedDelivery: "15 Avril 2024",
    tracking: "MG-987654321",
    impact: { co2: 3.8, water: 2500 },
    passport: {
      origin: "Antananarivo",
      material: "Denim recyclé",
      artisan: "Andry",
    },
  },
  {
    id: "ORD-2024-003",
    product: "T-Shirt Graphique Malgache",
    designer: "Lalaina Rakoto",
    image: "/img/Collection2.jpg",
    date: "28 Février 2024",
    amount: "80 000 Ar",
    status: "delivered",
    deliveryDate: "12 Mars 2024",
    tracking: "MG-456789123",
    impact: { co2: 1.2, water: 800 },
    passport: {
      origin: "Toamasina",
      material: "Coton bio",
      artisan: "Hanta",
    },
  },
  {
    id: "ORD-2024-004",
    product: "Écharpe Lamba Moderne",
    designer: "Miora Rasoanaivo",
    image: "/img/Collection4.jpg",
    date: "20 Février 2024",
    amount: "120 000 Ar",
    status: "delivered",
    deliveryDate: "5 Mars 2024",
    tracking: "MG-789123456",
    impact: { co2: 1.8, water: 900 },
    passport: {
      origin: "Antananarivo",
      material: "Lamba hoany",
      artisan: "Fara",
    },
  },
]

const statusConfig = {
  pending: { label: "En attente", icon: Clock, color: "bg-yellow-100 text-yellow-800" },
  processing: { label: "Préparation", icon: Package, color: "bg-blue-100 text-blue-800" },
  shipped: { label: "Expédié", icon: Truck, color: "bg-purple-100 text-purple-800" },
  delivered: { label: "Livré", icon: CheckCircle2, color: "bg-green-100 text-green-800" },
}

export default function MesCommandesPage() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-white text-black pt-20">
      <Header />

      {/* Hero Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.2em] mb-6 serif-font">
              Mes Commandes
            </h1>
            <div className="w-32 h-px bg-black mx-auto mb-8" />
            <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-lg">
              Suivez vos commandes et découvrez l'histoire derrière chaque pièce
            </p>
          </div>
        </div>
      </section>

      {/* Orders List */}
      <section className="py-8 pb-24">
        <div className="container mx-auto px-6">
          <div className="space-y-6">
            {orders.map((order) => {
              const status = statusConfig[order.status as keyof typeof statusConfig]
              const StatusIcon = status.icon
              const isExpanded = selectedOrder === order.id

              return (
                <Card
                  key={order.id}
                  className="border-0 shadow-md hover:shadow-lg transition-all"
                >
                  <CardContent className="p-0">
                    {/* Order Header */}
                    <div
                      className="flex flex-col md:flex-row gap-6 p-6 cursor-pointer"
                      onClick={() => setSelectedOrder(isExpanded ? null : order.id)}
                    >
                      {/* Product Image */}
                      <div className="relative w-full md:w-24 h-24 overflow-hidden rounded-lg flex-shrink-0">
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
                          <Badge className={`text-xs font-light ${status.color}`}>
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {status.label}
                          </Badge>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-gray-600 font-light">
                          <span>{order.id}</span>
                          <span>{order.date}</span>
                          <span className="font-normal text-black">{order.amount}</span>
                        </div>
                      </div>

                      <ChevronRight
                        className={`h-5 w-5 text-gray-400 transition-transform ${
                          isExpanded ? "rotate-90" : ""
                        }`}
                      />
                    </div>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <div className="border-t border-gray-100 p-6 bg-gray-50">
                        <div className="grid md:grid-cols-2 gap-8">
                          {/* Delivery Info */}
                          <div className="space-y-4">
                            <h4 className="text-sm font-light tracking-[0.1em] uppercase text-gray-500">
                              Livraison
                            </h4>
                            <div className="space-y-3">
                              <div className="flex items-center gap-3">
                                <Truck className="h-4 w-4 text-gray-400" />
                                <span className="font-light text-sm">
                                  {order.status === "delivered"
                                    ? `Livré le ${order.deliveryDate}`
                                    : `Livraison estimée : ${order.estimatedDelivery}`}
                                </span>
                              </div>
                              <div className="flex items-center gap-3">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                <span className="font-light text-sm">Suivi : {order.tracking}</span>
                              </div>
                            </div>
                          </div>

                          {/* Impact */}
                          <div className="space-y-4">
                            <h4 className="text-sm font-light tracking-[0.1em] uppercase text-gray-500">
                              Impact de cette commande
                            </h4>
                            <div className="flex gap-4">
                              <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                                <Leaf className="h-4 w-4 text-green-600" />
                                <span className="text-sm font-light">{order.impact.co2} kg CO₂</span>
                              </div>
                              <div className="flex items-center gap-2 p-3 bg-white rounded-lg">
                                <Droplets className="h-4 w-4 text-blue-600" />
                                <span className="text-sm font-light">{order.impact.water} L</span>
                              </div>
                            </div>
                          </div>

                          {/* Passeport */}
                          <div className="space-y-4">
                            <h4 className="text-sm font-light tracking-[0.1em] uppercase text-gray-500">
                              Passeport Numérique
                            </h4>
                            <div className="bg-white p-4 rounded-lg space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500 font-light">Origine</span>
                                <span className="font-light">{order.passport.origin}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500 font-light">Matériau</span>
                                <span className="font-light">{order.passport.material}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500 font-light">Artisan</span>
                                <span className="font-light">{order.passport.artisan}</span>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="space-y-4">
                            <h4 className="text-sm font-light tracking-[0.1em] uppercase text-gray-500">
                              Actions
                            </h4>
                            <div className="flex gap-3">
                              <Button variant="outline" size="sm" className="bg-transparent">
                                <Eye className="h-4 w-4 mr-1" />
                                Détails
                              </Button>
                              <Button variant="outline" size="sm" className="bg-transparent">
                                <Download className="h-4 w-4 mr-1" />
                                Facture
                              </Button>
                              {order.status === "delivered" && (
                                <Link href={`/concept-store/${order.id.replace("ORD-2024-", "")}`}>
                                  <Button variant="outline" size="sm" className="bg-transparent">
                                    <Leaf className="h-4 w-4 mr-1" />
                                    Passeport
                                  </Button>
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
