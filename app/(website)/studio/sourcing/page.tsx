"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Award, CheckCircle2, FileText, Leaf, Plus, Shield, Trash2, Upload, } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

const certifications = [
  {
    id: "1",
    name: "GOTS",
    fullName: "Global Organic Textile Standard",
    status: "verified",
    expiryDate: "2025-12-31",
    uploadDate: "2024-01-15",
    icon: Leaf,
    description: "Certification pour l'utilisation de fibres biologiques",
  },
  {
    id: "2",
    name: "Fair Trade",
    fullName: "Commerce Équitable",
    status: "verified",
    expiryDate: "2025-06-30",
    uploadDate: "2024-02-20",
    icon: Award,
    description: "Garantie de conditions de travail justes",
  },
  {
    id: "3",
    name: "OEKO-TEX",
    fullName: "Standard 100",
    status: "pending",
    expiryDate: null,
    uploadDate: "2024-03-10",
    icon: Shield,
    description: "Test et certification des articles textiles",
  },
]

const materials = [
  {
    id: "1",
    name: "Soie Sauvage (Landibe)",
    origin: "Fianarantsoa",
    type: "Fibre naturelle",
    certified: true,
    co2Factor: "Faible",
  },
  {
    id: "2",
    name: "Coton Biologique",
    origin: "Antananarivo",
    type: "Fibre biologique",
    certified: true,
    co2Factor: "Très faible",
  },
  {
    id: "3",
    name: "Denim Recyclé",
    origin: "Antananarivo",
    type: "Matériau recyclé",
    certified: true,
    co2Factor: "Faible",
  },
  {
    id: "4",
    name: "Lamba Hoany",
    origin: "Fianarantsoa",
    type: "Tissu traditionnel",
    certified: false,
    co2Factor: "Moyen",
  },
]

export default function StudioSourcingPage() {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  return (
      <div className="min-h-screen bg-white text-black pt-20">
        <Header/>

        {/* Header */}
        <section className="py-16 bg-gray-50 border-b border-gray-100">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-4xl font-extralight tracking-[0.2em] mb-4 serif-font">
                  Sourcing & Certifications
                </h1>
                <p className="text-gray-600 font-light">
                  Gérez vos certifications et la traçabilité de vos matériaux
                </p>
              </div>
              <Button className="bg-black text-white hover:bg-gray-800">
                <Plus className="h-4 w-4 mr-2"/>
                Ajouter une certification
              </Button>
            </div>
          </div>
        </section>

        <section className="py-8 pb-24">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Certifications */}
              <div className="space-y-6">
                <h2 className="text-2xl font-light serif-font tracking-wide mb-6">
                  Mes Certifications
                </h2>

                {certifications.map((cert) => {
                  const Icon = cert.icon
                  return (
                      <Card key={cert.id} className="border-0 shadow-md">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div
                                className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                              <Icon className="h-7 w-7 text-gray-600"/>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className="font-light text-lg">{cert.name}</h3>
                                <Badge
                                    className={`text-xs font-light ${
                                        cert.status === "verified"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-yellow-100 text-yellow-800"
                                    }`}
                                >
                                  {cert.status === "verified" ? "Vérifié" : "En attente"}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-500 font-light mb-2">
                                {cert.fullName}
                              </p>
                              <p className="text-sm text-gray-600 font-light mb-3">
                                {cert.description}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-gray-500 font-light">
                                <span>Uploadé le {cert.uploadDate}</span>
                                {cert.expiryDate && <span>Expire le {cert.expiryDate}</span>}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
                            <Button variant="outline" size="sm" className="bg-transparent">
                              <FileText className="h-4 w-4 mr-1"/>
                              Voir le document
                            </Button>
                            <Button variant="outline" size="sm" className="bg-transparent">
                              <Upload className="h-4 w-4 mr-1"/>
                              Mettre à jour
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                  )
                })}

                {/* Upload Area */}
                <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                        dragActive
                            ? "border-green-500 bg-green-50"
                            : "border-gray-300 hover:border-gray-400"
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrag}
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4"/>
                  <p className="font-light mb-2">
                    Glissez vos documents de certification ici
                  </p>
                  <p className="text-sm text-gray-500 font-light mb-4">
                    ou cliquez pour parcourir
                  </p>
                  <Button variant="outline" className="bg-transparent">
                    Parcourir les fichiers
                  </Button>
                </div>
              </div>

              {/* Materials */}
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-light serif-font tracking-wide">
                    Mes Matériaux
                  </h2>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Plus className="h-4 w-4 mr-1"/>
                    Ajouter
                  </Button>
                </div>

                <Card className="border-0 shadow-md">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                        <tr className="border-b border-gray-100">
                          <th className="text-left text-xs font-light text-gray-500 uppercase tracking-wider p-4">
                            Matériau
                          </th>
                          <th className="text-left text-xs font-light text-gray-500 uppercase tracking-wider p-4">
                            Origine
                          </th>
                          <th className="text-left text-xs font-light text-gray-500 uppercase tracking-wider p-4">
                            Type
                          </th>
                          <th className="text-left text-xs font-light text-gray-500 uppercase tracking-wider p-4">
                            CO₂
                          </th>
                          <th className="text-left text-xs font-light text-gray-500 uppercase tracking-wider p-4">
                            Statut
                          </th>
                          <th className="text-left text-xs font-light text-gray-500 uppercase tracking-wider p-4">
                            Actions
                          </th>
                        </tr>
                        </thead>
                        <tbody>
                        {materials.map((material) => (
                            <tr
                                key={material.id}
                                className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                            >
                              <td className="p-4 font-light">{material.name}</td>
                              <td className="p-4 font-light text-gray-600">{material.origin}</td>
                              <td className="p-4">
                                <Badge variant="outline" className="text-xs font-light">
                                  {material.type}
                                </Badge>
                              </td>
                              <td className="p-4">
                                <Badge
                                    className={`text-xs font-light ${
                                        material.co2Factor === "Très faible"
                                            ? "bg-green-100 text-green-800"
                                            : material.co2Factor === "Faible"
                                                ? "bg-green-50 text-green-700"
                                                : "bg-yellow-100 text-yellow-800"
                                    }`}
                                >
                                  {material.co2Factor}
                                </Badge>
                              </td>
                              <td className="p-4">
                                {material.certified ? (
                                    <CheckCircle2 className="h-4 w-4 text-green-600"/>
                                ) : (
                                    <AlertCircle className="h-4 w-4 text-yellow-500"/>
                                )}
                              </td>
                              <td className="p-4">
                                <div className="flex gap-2">
                                  <Button variant="ghost" size="sm">
                                    Modifier
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                                    <Trash2 className="h-4 w-4"/>
                                  </Button>
                                </div>
                              </td>
                            </tr>
                        ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                {/* Eco Score Calculator */}
                <Card className="border-0 shadow-md bg-gray-50">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-light serif-font tracking-wide mb-4">
                      Calculateur d'Éco-Score
                    </h3>
                    <p className="text-sm text-gray-600 font-light mb-6">
                      Estimez l'impact environnemental de votre collection en fonction des matériaux utilisés
                    </p>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-white rounded-lg">
                        <div className="text-3xl font-light serif-font text-green-700">85</div>
                        <div className="text-xs text-gray-500 font-light mt-1">Score Moyen</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg">
                        <div className="text-3xl font-light serif-font text-green-700">12.5</div>
                        <div className="text-xs text-gray-500 font-light mt-1">Tonnes CO₂ évitées</div>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg">
                        <div className="text-3xl font-light serif-font text-green-700">78%</div>
                        <div className="text-xs text-gray-500 font-light mt-1">Matériaux certifiés</div>
                      </div>
                    </div>
                    <Button className="w-full bg-black text-white hover:bg-gray-800">
                      Calculer l'impact détaillé
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <Footer/>
      </div>
  )
}
