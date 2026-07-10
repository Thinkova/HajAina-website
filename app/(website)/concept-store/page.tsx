"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Leaf } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { productService } from "@/lib/services"

export default function ConceptStorePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const allProducts = productService.getAll()
  const categories = ["all", ...new Set(allProducts.map((p) => p.category))]
  const filteredProducts =
      selectedCategory === "all"
          ? allProducts
          : allProducts.filter((p) => p.category === selectedCategory)

  return (
      <div className="min-h-screen bg-white text-black pt-20">
        <Header/>

        {/* Hero Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.2em] mb-6 serif-font">
                Concept Store
              </h1>
              <div className="w-32 h-px bg-black mx-auto mb-8"/>
              <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-lg">
                Des pièces uniques, conçues avec conscience. Chaque produit raconte une histoire
                de durabilité, d'artisanat et d'engagement environnemental
              </p>
            </div>

            {/* Category Filters */}
            <div className="flex justify-center gap-4 flex-wrap">
              {categories.map((category) => (
                  <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-6 py-3 tracking-[0.1em] uppercase text-sm font-light transition-all ${
                          selectedCategory === category
                              ? "bg-black text-white"
                              : "bg-white text-black hover:bg-gray-100 border border-gray-200"
                      }`}
                  >
                    {category === "all" ? "Tout" : category}
                  </button>
              ))}
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              {filteredProducts.map((product) => {
                const preorderProgress = (product.preorder.current / product.preorder.target) * 100
                return (
                    <Link
                        key={product.id}
                        href={`/concept-store/${product.id}`}
                        className="group block"
                    >
                      <Card
                          className="border-0 shadow-none hover:shadow-2xl transition-all duration-500 overflow-hidden h-full">
                        <CardContent className="p-0 h-full flex flex-col">
                          {/* Product Image */}
                          <div className="relative h-80 overflow-hidden bg-gray-100">
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                            />

                            {/* Eco Badge */}
                            <div className="absolute top-4 left-4">
                              <Badge
                                  className="bg-green-600 text-white font-light tracking-wide flex items-center gap-1">
                                <Leaf className="h-3 w-3"/>
                                Éco-score
                              </Badge>
                            </div>

                            {/* Preorder Progress */}
                            <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-3">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="font-light text-gray-600">Précommande</span>
                                <span className="font-light">
                              {product.preorder.current}/{product.preorder.target}
                            </span>
                              </div>
                              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-green-600 rounded-full"
                                    style={{width: `${preorderProgress}%`}}
                                />
                              </div>
                            </div>
                          </div>

                          {/* Product Info */}
                          <div className="p-8 flex-1 flex flex-col">
                            <Badge variant="outline"
                                   className="mb-3 text-xs tracking-[0.15em] font-light uppercase w-fit">
                              {product.category}
                            </Badge>
                            <h3 className="text-xl font-light mb-2 serif-font tracking-wide group-hover:text-green-700 transition-colors">
                              {product.title}
                            </h3>
                            <p className="text-gray-500 text-sm font-light mb-4">
                              Par {product.designer}
                            </p>
                            <p className="text-2xl font-light text-green-700 mb-4">
                              {product.price}
                            </p>

                            {/* Passport Preview */}
                            <div className="bg-gray-50 rounded-lg p-4 mb-6">
                              <div className="grid grid-cols-2 gap-3 text-xs">
                                <div>
                                  <span className="text-gray-500 font-light">CO₂ évité</span>
                                  <p className="font-light">{product.passport.co2Saved}</p>
                                </div>
                                <div>
                                  <span className="text-gray-500 font-light">Eau économisée</span>
                                  <p className="font-light">{product.passport.waterSaved}</p>
                                </div>
                              </div>
                            </div>

                            {/* CTA */}
                            <div
                                className="mt-auto flex items-center text-sm font-light tracking-wide text-black group-hover:text-green-700 transition-colors">
                              <span>Voir le produit</span>
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
