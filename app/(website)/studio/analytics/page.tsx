"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowDownRight, ArrowUpRight, Calendar, Download, Eye, Package, ShoppingCart, TrendingUp, } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

const stats = [
  {
    label: "Ventes totales",
    value: "2 450 000 Ar",
    change: "+12.5%",
    trend: "up",
    icon: ShoppingCart,
  },
  {
    label: "Précommandes actives",
    value: "23",
    change: "+8",
    trend: "up",
    icon: Package,
  },
  {
    label: "Visiteurs uniques",
    value: "12 847",
    change: "+23.1%",
    trend: "up",
    icon: Eye,
  },
  {
    label: "Taux de conversion",
    value: "3.2%",
    change: "-0.4%",
    trend: "down",
    icon: TrendingUp,
  },
]

const recentOrders = [
  {
    id: "ORD-001",
    product: "Robe Lambda en Soie Sauvage",
    customer: "Ana R.",
    amount: "150 000 Ar",
    status: "confirmed"
  },
  {id: "ORD-002", product: "Veste Upcycled Denim", customer: "Hery M.", amount: "200 000 Ar", status: "pending"},
  {id: "ORD-003", product: "T-Shirt Graphique Malgache", customer: "Lala N.", amount: "80 000 Ar", status: "shipped"},
  {id: "ORD-004", product: "Écharpe Lamba Moderne", customer: "Fara P.", amount: "120 000 Ar", status: "confirmed"},
  {
    id: "ORD-005",
    product: "Robe Lambda en Soie Sauvage",
    customer: "Mialy R.",
    amount: "150 000 Ar",
    status: "pending"
  },
]

const preorderStats = [
  {name: "Robe Lambda", target: 20, current: 14, deadline: "15 Mars"},
  {name: "Veste Denim", target: 15, current: 8, deadline: "20 Mars"},
  {name: "T-Shirt Graphique", target: 30, current: 22, deadline: "10 Mars"},
  {name: "Écharpe Lamba", target: 25, current: 18, deadline: "25 Mars"},
]

const monthlySales = [
  {month: "Jan", sales: 1800000},
  {month: "Fév", sales: 2100000},
  {month: "Mar", sales: 2450000},
  {month: "Avr", sales: 1950000},
  {month: "Mai", sales: 2800000},
  {month: "Jun", sales: 3200000},
]

export default function StudioAnalyticsPage() {
  const [period, setPeriod] = useState<"week" | "month" | "year">("month")

  const maxSales = Math.max(...monthlySales.map((m) => m.sales))

  return (
      <div className="min-h-screen bg-white text-black pt-20">
        <Header/>

        {/* Header */}
        <section className="py-16 bg-gray-50 border-b border-gray-100">
          <div className="container mx-auto px-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-4xl font-extralight tracking-[0.2em] mb-4 serif-font">
                  Studio Créateur
                </h1>
                <p className="text-gray-600 font-light">
                  Bienvenue, Miora Rasoanaivo
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="bg-transparent">
                  <Download className="h-4 w-4 mr-2"/>
                  Exporter
                </Button>
                <Button className="bg-black text-white hover:bg-gray-800">
                  <Calendar className="h-4 w-4 mr-2"/>
                  Période
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="py-8">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => {
                const Icon = stat.icon
                return (
                    <Card key={idx} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <Icon className="h-6 w-6 text-gray-600"/>
                          </div>
                          <div
                              className={`flex items-center gap-1 text-sm font-light ${
                                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                              }`}
                          >
                            {stat.trend === "up" ? (
                                <ArrowUpRight className="h-4 w-4"/>
                            ) : (
                                <ArrowDownRight className="h-4 w-4"/>
                            )}
                            {stat.change}
                          </div>
                        </div>
                        <p className="text-3xl font-light serif-font mb-1">{stat.value}</p>
                        <p className="text-sm text-gray-500 font-light">{stat.label}</p>
                      </CardContent>
                    </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Charts Section */}
        <section className="py-8">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Sales Chart */}
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-light serif-font tracking-wide">Ventes Mensuelles</h3>
                    <div className="flex gap-2">
                      {(["week", "month", "year"] as const).map((p) => (
                          <button
                              key={p}
                              onClick={() => setPeriod(p)}
                              className={`px-3 py-1 text-xs font-light tracking-[0.1em] uppercase rounded ${
                                  period === p ? "bg-black text-white" : "bg-gray-100 text-gray-600"
                              }`}
                          >
                            {p === "week" ? "Sem" : p === "month" ? "Mois" : "An"}
                          </button>
                      ))}
                    </div>
                  </div>

                  {/* Simple Bar Chart */}
                  <div className="flex items-end justify-between h-48 gap-4">
                    {monthlySales.map((m, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center">
                          <div
                              className="w-full bg-black rounded-t transition-all duration-500"
                              style={{height: `${(m.sales / maxSales) * 100}%`}}
                          />
                          <span className="text-xs font-light text-gray-500 mt-2">{m.month}</span>
                        </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Preorder Progress */}
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <h3 className="text-lg font-light serif-font tracking-wide mb-6">
                    Précommandes en Cours
                  </h3>
                  <div className="space-y-6">
                    {preorderStats.map((preorder, idx) => {
                      const progress = (preorder.current / preorder.target) * 100
                      return (
                          <div key={idx}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-light text-sm">{preorder.name}</span>
                              <span className="text-xs text-gray-500 font-light">
                            {preorder.current}/{preorder.target} • {preorder.deadline}
                          </span>
                            </div>
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                  className="h-full bg-green-600 rounded-full transition-all duration-500"
                                  style={{width: `${progress}%`}}
                              />
                            </div>
                          </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Recent Orders */}
        <section className="py-8 pb-24">
          <div className="container mx-auto px-6">
            <Card className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-light serif-font tracking-wide">Commandes Récentes</h3>
                  <Button variant="outline" size="sm" className="bg-transparent">
                    Voir tout
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                    <tr className="border-b border-gray-100">
                      <th className="text-left text-xs font-light text-gray-500 uppercase tracking-wider pb-4">
                        Commande
                      </th>
                      <th className="text-left text-xs font-light text-gray-500 uppercase tracking-wider pb-4">
                        Produit
                      </th>
                      <th className="text-left text-xs font-light text-gray-500 uppercase tracking-wider pb-4">
                        Client
                      </th>
                      <th className="text-left text-xs font-light text-gray-500 uppercase tracking-wider pb-4">
                        Montant
                      </th>
                      <th className="text-left text-xs font-light text-gray-500 uppercase tracking-wider pb-4">
                        Statut
                      </th>
                    </tr>
                    </thead>
                    <tbody>
                    {recentOrders.map((order, idx) => (
                        <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="py-4 font-light text-sm">{order.id}</td>
                          <td className="py-4 font-light text-sm">{order.product}</td>
                          <td className="py-4 font-light text-sm">{order.customer}</td>
                          <td className="py-4 font-light text-sm">{order.amount}</td>
                          <td className="py-4">
                            <Badge
                                className={`text-xs font-light ${
                                    order.status === "confirmed"
                                        ? "bg-green-100 text-green-800"
                                        : order.status === "pending"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : "bg-blue-100 text-blue-800"
                                }`}
                            >
                              {order.status === "confirmed"
                                  ? "Confirmée"
                                  : order.status === "pending"
                                      ? "En attente"
                                      : "Expédiée"}
                            </Badge>
                          </td>
                        </tr>
                    ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Footer/>
      </div>
  )
}
