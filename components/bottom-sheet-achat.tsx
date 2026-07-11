"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  X,
  ChevronDown,
  ChevronUp,
  Leaf,
  CreditCard,
  Smartphone,
  CheckCircle2,
  Shield,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react"
import Image from "next/image"

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  product: {
    id: string
    title: string
    price: string
    image: string
    designer: string
    sizes: string[]
    ecoScore: number
    passport: {
      material: string
      origin: string
      co2Saved: string
    }
  }
}

export default function BottomSheetAchat({ isOpen, onClose, product }: BottomSheetProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState<"mobile" | "card">("mobile")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const sheetRef = useRef<HTMLDivElement>(null)
  const touchStartY = useRef(0)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY
  }, [])

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY
      const diff = touchEndY - touchStartY.current

      if (diff > 100) {
        onClose()
      }
    },
    [onClose]
  )

  const handlePurchase = useCallback(async () => {
    if (!selectedSize) return

    setIsProcessing(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessing(false)
    setIsSuccess(true)

    // Reset after success
    setTimeout(() => {
      setIsSuccess(false)
      onClose()
    }, 3000)
  }, [selectedSize, onClose])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[85vh] overflow-hidden transition-transform duration-300"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Handle */}
        <div className="flex justify-center py-3">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-80px)] px-6 pb-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-light serif-font tracking-wide">Acheter</h3>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {isSuccess ? (
            /* Success State */
            <div className="py-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>
              <h4 className="text-xl font-light serif-font mb-2">Commande confirmée !</h4>
              <p className="text-gray-600 font-light text-sm mb-6">
                Merci pour votre achat éco-responsable
              </p>
              <div className="flex items-center justify-center gap-2 text-green-600">
                <Leaf className="h-4 w-4" />
                <span className="text-sm font-light">
                  {product.passport.co2Saved} de CO₂ économisés
                </span>
              </div>
            </div>
          ) : (
            <>
              {/* Product Preview */}
              <div className="flex gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="relative w-20 h-20 overflow-hidden rounded-lg flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-light serif-font tracking-wide mb-1">{product.title}</h4>
                  <p className="text-sm text-gray-500 font-light mb-2">Par {product.designer}</p>
                  <p className="text-lg font-light text-green-700">{product.price}</p>
                </div>
              </div>

              {/* Eco Score */}
              <div className="flex items-center gap-3 mb-6 p-3 bg-green-50 rounded-xl">
                <Leaf className="h-5 w-5 text-green-600" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-light">Éco-Score</span>
                    <span className="text-sm font-light text-green-600">{product.ecoScore}/100</span>
                  </div>
                  <div className="h-2 bg-green-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-600 rounded-full"
                      style={{ width: `${product.ecoScore}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <h4 className="text-sm font-light tracking-[0.1em] uppercase text-gray-500 mb-3">
                  Taille
                </h4>
                <div className="flex gap-3 flex-wrap">
                  {product.sizes.map((size) => (
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

              {/* Quantity */}
              <div className="mb-6">
                <h4 className="text-sm font-light tracking-[0.1em] uppercase text-gray-500 mb-3">
                  Quantité
                </h4>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:border-black transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="text-lg font-light w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:border-black transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <h4 className="text-sm font-light tracking-[0.1em] uppercase text-gray-500 mb-3">
                  Paiement
                </h4>
                <div className="space-y-3">
                  <button
                    onClick={() => setPaymentMethod("mobile")}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                      paymentMethod === "mobile"
                        ? "border-black bg-gray-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Smartphone className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-light">Mobile Money</p>
                      <p className="text-xs text-gray-500 font-light">Paiement instantané</p>
                    </div>
                    {paymentMethod === "mobile" && (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    )}
                  </button>

                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${
                      paymentMethod === "card"
                        ? "border-black bg-gray-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-light">Carte bancaire</p>
                      <p className="text-xs text-gray-500 font-light">Visa, Mastercard</p>
                    </div>
                    {paymentMethod === "card" && (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    )}
                  </button>
                </div>
              </div>

              {/* Passport Summary */}
              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-light">Passeport Numérique</span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-gray-500 font-light">Matériau</span>
                    <p className="font-light">{product.passport.material}</p>
                  </div>
                  <div>
                    <span className="text-gray-500 font-light">Origine</span>
                    <p className="font-light">{product.passport.origin}</p>
                  </div>
                </div>
              </div>

              {/* Total & Buy Button */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-light">Total</span>
                  <span className="text-xl font-light">
                    {(parseInt(product.price.replace(/\s/g, "")) * quantity).toLocaleString()} Ar
                  </span>
                </div>

                <Button
                  className="w-full bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase py-6"
                  onClick={handlePurchase}
                  disabled={!selectedSize || isProcessing}
                >
                  {isProcessing ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Traitement...
                    </span>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Acheter en 2 clics
                    </>
                  )}
                </Button>

                <p className="text-center text-xs text-gray-500 font-light mt-4">
                  Paiement sécurisé • Livraison 2-3 semaines
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
