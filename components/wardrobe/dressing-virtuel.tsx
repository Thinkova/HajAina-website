"use client"

import { useCallback, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, GripVertical, Plus, RotateCcw, Save, Shuffle, Trash2, X, } from "lucide-react"
import Image from "next/image"

interface ClothingItem {
  brand?: string
  category: "top" | "bottom" | "shoes" | "accessory"
  color: string
  id: string
  image: string
  name: string
}

interface Outfit {
  createdAt: Date
  id: string
  items: ClothingItem[]
  name: string
}

const defaultWardrobe: ClothingItem[] = [
  {
    id: "w1",
    name: "T-Shirt Blanc Bio",
    category: "top",
    image: "/img/tshirt-blanc.jpg",
    color: "#FFFFFF",
    brand: "Haj'Aina",
  },
  {
    id: "w2",
    name: "Veste Denim Recyclée",
    category: "top",
    image: "/img/veste-denim.jpg",
    color: "#4A6FA5",
    brand: "Hery Andriantsoa",
  },
  {
    id: "w3",
    name: "Pantalon Lin Naturel",
    category: "bottom",
    image: "/img/pantalon-lin.jpg",
    color: "#E8DCC4",
    brand: "Miora Rasoanaivo",
  },
  {
    id: "w4",
    name: "Jupe Lamba Moderne",
    category: "bottom",
    image: "/img/jupe-lamba.jpg",
    color: "#8B4513",
    brand: "Lalaina Rakoto",
  },
  {
    id: "w5",
    name: "Sneakers Upcycled",
    category: "shoes",
    image: "/img/sneakers.jpg",
    color: "#2D2D2D",
    brand: "Hery Andriantsoa",
  },
  {
    id: "w6",
    name: "Sac Banane Tissé",
    category: "accessory",
    image: "/img/sac-banane.jpg",
    color: "#6B4423",
    brand: "Lalaina Rakoto",
  },
  {
    id: "w7",
    name: "Robe Soie Sauvage",
    category: "top",
    image: "/img/robe-soie.jpg",
    color: "#C9B1FF",
    brand: "Miora Rasoanaivo",
  },
  {
    id: "w8",
    name: "Short Jean Recyclé",
    category: "bottom",
    image: "/img/short-jean.jpg",
    color: "#6B8EAD",
    brand: "Hery Andriantsoa",
  },
]

export default function DressingVirtuel() {
  const [wardrobe] = useState<ClothingItem[]>(defaultWardrobe)
  const [outfit, setOutfit] = useState<Partial<Record<ClothingItem["category"], ClothingItem>>>({})
  const [savedOutfits, setSavedOutfits] = useState<Outfit[]>([])
  const [activeCategory, setActiveCategory] = useState<ClothingItem["category"] | "all">("all")
  const [draggedItem, setDraggedItem] = useState<ClothingItem | null>(null)
  const [outfitName, setOutfitName] = useState("")
  const [showSaveModal, setShowSaveModal] = useState(false)
  const [isDraggingOver, setIsDraggingOver] = useState<string | null>(null)

  const categories = [
    {key: "top" as const, label: "Hauts"},
    {key: "bottom" as const, label: "Bas"},
    {key: "shoes" as const, label: "Chaussures"},
    {key: "accessory" as const, label: "Accessoires"},
  ]

  const filteredWardrobe =
      activeCategory === "all"
          ? wardrobe
          : wardrobe.filter((item) => item.category === activeCategory)

  const handleDragStart = useCallback((item: ClothingItem) => {
    setDraggedItem(item)
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent, slot: string) => {
    e.preventDefault()
    setIsDraggingOver(slot)
  }, [])

  const handleDragLeave = useCallback(() => {
    setIsDraggingOver(null)
  }, [])

  const handleDrop = useCallback(
      (e: React.DragEvent, category: ClothingItem["category"]) => {
        e.preventDefault()
        if (draggedItem && draggedItem.category === category) {
          setOutfit((prev) => ({...prev, [category]: draggedItem}))
        }
        setDraggedItem(null)
        setIsDraggingOver(null)
      },
      [draggedItem]
  )

  const handleSlotClick = useCallback(
      (category: ClothingItem["category"]) => {
        if (draggedItem && draggedItem.category === category) {
          setOutfit((prev) => ({...prev, [category]: draggedItem}))
          setDraggedItem(null)
        }
      },
      [draggedItem]
  )

  const removeItem = useCallback((category: ClothingItem["category"]) => {
    setOutfit((prev) => {
      const newOutfit = {...prev}
      delete newOutfit[category]
      return newOutfit
    })
  }, [])

  const randomizeOutfit = useCallback(() => {
    const newOutfit: Partial<Record<ClothingItem["category"], ClothingItem>> = {}
    categories.forEach(({key}) => {
      const items = wardrobe.filter((item) => item.category === key)
      if (items.length > 0) {
        newOutfit[key] = items[Math.floor(Math.random() * items.length)]
      }
    })
    setOutfit(newOutfit)
  }, [wardrobe])

  const clearOutfit = useCallback(() => {
    setOutfit({})
  }, [])

  const saveOutfit = useCallback(() => {
    if (Object.keys(outfit).length === 0) return

    const newOutfit: Outfit = {
      id: Date.now().toString(),
      name: outfitName || `Look ${savedOutfits.length + 1}`,
      items: Object.values(outfit).filter(Boolean) as ClothingItem[],
      createdAt: new Date(),
    }

    setSavedOutfits((prev) => [newOutfit, ...prev])
    setShowSaveModal(false)
    setOutfitName("")
  }, [outfit, outfitName, savedOutfits.length])

  const deleteOutfit = useCallback((id: string) => {
    setSavedOutfits((prev) => prev.filter((o) => o.id !== id))
  }, [])

  const outfitCount = Object.keys(outfit).length

  return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-2xl font-light serif-font tracking-wide mb-2">Mix & Match</h3>
            <p className="text-gray-600 font-light text-sm">
              Glissez les vêtements pour créer votre look idéal
            </p>
          </div>
          <div className="flex gap-3">
            <Button
                variant="outline"
                size="sm"
                onClick={randomizeOutfit}
                className="bg-transparent"
            >
              <Shuffle className="h-4 w-4 mr-2"/>
              Aléatoire
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={clearOutfit}
                className="bg-transparent"
            >
              <RotateCcw className="h-4 w-4 mr-2"/>
              Effacer
            </Button>
            <Button
                size="sm"
                onClick={() => setShowSaveModal(true)}
                disabled={outfitCount === 0}
                className="bg-black text-white hover:bg-gray-800"
            >
              <Save className="h-4 w-4 mr-2"/>
              Sauvegarder
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Outfit Preview (Left Side) */}
          <div className="space-y-6">
            <h4 className="text-sm font-light tracking-[0.1em] uppercase text-gray-500">
              Votre Look
            </h4>

            {/* Outfit Slots */}
            <div className="grid grid-cols-2 gap-4">
              {categories.map(({key, label}) => {
                const item = outfit[key]
                return (
                    <div
                        key={key}
                        className={`relative aspect-[3/4] rounded-xl border-2 border-dashed transition-all ${
                            isDraggingOver === key
                                ? "border-green-500 bg-green-50"
                                : item
                                    ? "border-transparent bg-gray-100"
                                    : "border-gray-300 bg-gray-50 hover:border-gray-400"
                        }`}
                        onDragOver={(e) => handleDragOver(e, key)}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, key)}
                        onClick={() => handleSlotClick(key)}
                    >
                      {item ? (
                          <>
                            <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover rounded-xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl"/>
                            <div className="absolute bottom-3 left-3 right-3">
                              <p className="text-white text-xs font-light truncate">{item.name}</p>
                            </div>
                            <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  removeItem(key)
                                }}
                                className="absolute top-2 right-2 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                            >
                              <X className="h-3 w-3 text-white"/>
                            </button>
                          </>
                      ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <Plus className="h-6 w-6 text-gray-400 mb-2"/>
                            <span className="text-xs text-gray-400 font-light">{label}</span>
                          </div>
                      )}
                    </div>
                )
              })}
            </div>

            {/* Outfit Summary */}
            {outfitCount > 0 && (
                <div className="bg-gray-50 rounded-xl p-4">
                  <h5 className="text-xs font-light tracking-[0.1em] uppercase text-gray-500 mb-3">
                    Pièces sélectionnées
                  </h5>
                  <div className="space-y-2">
                    {Object.entries(outfit).map(([category, item]) => (
                        <div key={category} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-200">
                              {item && (
                                  <Image
                                      src={item.image}
                                      alt={item.name}
                                      width={40}
                                      height={40}
                                      className="object-cover"
                                  />
                              )}
                            </div>
                            <div>
                              <p className="text-sm font-light">{item?.name}</p>
                              <p className="text-xs text-gray-500 font-light capitalize">{category}</p>
                            </div>
                          </div>
                          <div
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{backgroundColor: item?.color}}
                          />
                        </div>
                    ))}
                  </div>
                </div>
            )}
          </div>

          {/* Wardrobe Selection (Right Side) */}
          <div className="space-y-6">
            <h4 className="text-sm font-light tracking-[0.1em] uppercase text-gray-500">
              Votre Dressing
            </h4>

            {/* Category Filters */}
            <div className="flex gap-2 flex-wrap">
              <button
                  onClick={() => setActiveCategory("all")}
                  className={`px-4 py-2 text-xs font-light tracking-[0.1em] uppercase transition-all rounded-full ${
                      activeCategory === "all"
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
              >
                Tout
              </button>
              {categories.map(({key, label}) => (
                  <button
                      key={key}
                      onClick={() => setActiveCategory(key)}
                      className={`px-4 py-2 text-xs font-light tracking-[0.1em] uppercase transition-all rounded-full ${
                          activeCategory === key
                              ? "bg-black text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                  >
                    {label}
                  </button>
              ))}
            </div>

            {/* Clothing Grid */}
            <div className="grid grid-cols-3 gap-3">
              {filteredWardrobe.map((item) => {
                const isSelected = Object.values(outfit).some((i) => i?.id === item.id)
                return (
                    <div
                        key={item.id}
                        draggable
                        onDragStart={() => handleDragStart(item)}
                        className={`relative aspect-[3/4] rounded-lg overflow-hidden cursor-grab active:cursor-grabbing transition-all ${
                            isSelected ? "ring-2 ring-green-500 opacity-50" : "hover:ring-2 hover:ring-gray-300"
                        }`}
                    >
                      <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"/>
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="text-white text-[10px] font-light truncate">{item.name}</p>
                      </div>
                      {isSelected && (
                          <div
                              className="absolute top-2 right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                            <Check className="h-3 w-3 text-white"/>
                          </div>
                      )}
                      <div className="absolute top-2 left-2 opacity-0 hover:opacity-100 transition-opacity">
                        <GripVertical className="h-4 w-4 text-white/70"/>
                      </div>
                    </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Saved Outfits */}
        {savedOutfits.length > 0 && (
            <div className="mt-12">
              <h4 className="text-sm font-light tracking-[0.1em] uppercase text-gray-500 mb-6">
                Looks Sauvegardés
              </h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedOutfits.map((savedOutfit) => (
                    <Card key={savedOutfit.id} className="border-0 shadow-md">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-light serif-font">{savedOutfit.name}</h5>
                          <button
                              onClick={() => deleteOutfit(savedOutfit.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="h-4 w-4"/>
                          </button>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {savedOutfit.items.map((item) => (
                              <div key={item.id} className="relative aspect-square rounded-lg overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                />
                              </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500 font-light mt-2">
                          {savedOutfit.items.length} pièces
                        </p>
                      </CardContent>
                    </Card>
                ))}
              </div>
            </div>
        )}

        {/* Save Modal */}
        {showSaveModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                  onClick={() => setShowSaveModal(false)}
              />
              <div className="relative bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
                <h3 className="text-xl font-light serif-font tracking-wide mb-4">Sauvegarder le look</h3>
                <input
                    type="text"
                    placeholder="Nom du look (optionnel)"
                    value={outfitName}
                    onChange={(e) => setOutfitName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg font-light focus:outline-none focus:border-black mb-6"
                />
                <div className="flex gap-3">
                  <Button
                      variant="outline"
                      onClick={() => setShowSaveModal(false)}
                      className="flex-1 bg-transparent"
                  >
                    Annuler
                  </Button>
                  <Button
                      onClick={saveOutfit}
                      className="flex-1 bg-black text-white hover:bg-gray-800"
                  >
                    <Save className="h-4 w-4 mr-2"/>
                    Sauvegarder
                  </Button>
                </div>
              </div>
            </div>
        )}
      </div>
  )
}
