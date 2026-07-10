"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Edit2, Eye, Leaf, Plus, Search, Trash2, } from "lucide-react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"

const products = [
  {
    id: "1",
    title: "Robe Lambda en Soie Sauvage",
    category: "Robes",
    price: "150 000 Ar",
    image: "/img/Collection3.jpg",
    status: "active",
    stock: 12,
    ecoScore: 85,
    views: 1247,
  },
  {
    id: "2",
    title: "Veste Upcycled Denim",
    category: "Vestes",
    price: "200 000 Ar",
    image: "/img/Collection1.jpg",
    status: "preorder",
    stock: 0,
    ecoScore: 92,
    views: 892,
  },
  {
    id: "3",
    title: "T-Shirt Graphique Malgache",
    category: "Tops",
    price: "80 000 Ar",
    image: "/img/Collection2.jpg",
    status: "active",
    stock: 24,
    ecoScore: 78,
    views: 2341,
  },
  {
    id: "4",
    title: "Écharpe Lamba Moderne",
    category: "Accessoires",
    price: "120 000 Ar",
    image: "/img/Collection4.jpg",
    status: "active",
    stock: 8,
    ecoScore: 88,
    views: 567,
  },
  {
    id: "5",
    title: "Pantalon Lin Naturel",
    category: "Pantalons",
    price: "95 000 Ar",
    image: "/img/Collection5.jpg",
    status: "draft",
    stock: 15,
    ecoScore: 82,
    views: 0,
  },
]

export default function StudioCataloguePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === "all" || product.status === filterStatus
    return matchesSearch && matchesStatus
  })

  return (
      <div className="min-h-screen bg-white text-black pt-20">
        <Header/>

        {/* Header */}
        <section className="py-16 bg-gray-50 border-b border-gray-100">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-4xl font-extralight tracking-[0.2em] mb-4 serif-font">
                  Gestion du Catalogue
                </h1>
                <p className="text-gray-600 font-light">
                  Gérez vos produits et calculez votre éco-score
                </p>
              </div>
              <Button className="bg-black text-white hover:bg-gray-800">
                <Plus className="h-4 w-4 mr-2"/>
                Ajouter un produit
              </Button>
            </div>
          </div>
        </section>

        {/* Filters & Search */}
        <section className="py-8">
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-4 flex-wrap">
              {/* Search */}
              <div className="relative flex-1 min-w-[300px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"/>
                <Input
                    type="text"
                    placeholder="Rechercher un produit..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-gray-300 focus:border-black font-light"
                />
              </div>

              {/* Status Filters */}
              <div className="flex gap-2">
                {["all", "active", "preorder", "draft"].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`px-4 py-2 text-xs font-light tracking-[0.1em] uppercase transition-all rounded ${
                            filterStatus === status
                                ? "bg-black text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                      {status === "all"
                          ? "Tous"
                          : status === "active"
                              ? "Actif"
                              : status === "preorder"
                                  ? "Précommande"
                                  : "Brouillon"}
                    </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-8 pb-24">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                  <Card key={product.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      {/* Product Image */}
                      <div className="relative h-48 overflow-hidden">
                        <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge
                              className={`text-xs font-light ${
                                  product.status === "active"
                                      ? "bg-green-100 text-green-800"
                                      : product.status === "preorder"
                                          ? "bg-blue-100 text-blue-800"
                                          : "bg-gray-100 text-gray-800"
                              }`}
                          >
                            {product.status === "active"
                                ? "Actif"
                                : product.status === "preorder"
                                    ? "Précommande"
                                    : "Brouillon"}
                          </Badge>
                        </div>
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-white/90 text-black font-light flex items-center gap-1">
                            <Leaf className="h-3 w-3 text-green-600"/>
                            {product.ecoScore}
                          </Badge>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-light serif-font tracking-wide mb-1">
                              {product.title}
                            </h3>
                            <p className="text-xs text-gray-500 font-light uppercase tracking-wider">
                              {product.category}
                            </p>
                          </div>
                          <p className="text-lg font-light text-green-700">{product.price}</p>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-xs text-gray-500 font-light mt-4 mb-4">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3"/>
                            {product.views} vues
                          </div>
                          <div>
                            Stock: {product.stock}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-4 border-t border-gray-100">
                          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                            <Edit2 className="h-4 w-4 mr-1"/>
                            Modifier
                          </Button>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            <Eye className="h-4 w-4"/>
                          </Button>
                          <Button variant="outline" size="sm"
                                  className="bg-transparent text-red-600 hover:text-red-700 hover:bg-red-50">
                            <Trash2 className="h-4 w-4"/>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
              ))}
            </div>
          </div>
        </section>

        <Footer/>
      </div>
  )
}
