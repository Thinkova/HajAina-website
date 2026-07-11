"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  User,
  BookOpen,
  Store,
  Briefcase,
  Handshake,
  Palette,
  GalleryHorizontal,
  Sparkles,
  Settings,
  ShoppingCart,
  Package,
  BarChart3,
  BookMarked,
  Heart,
} from "lucide-react";
import Header from "@/components/header";
import Link from "next/link";
import Footer from "@/components/footer";

interface DashboardCard {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  roles: ("createur" | "consommateur")[]
}

const ALL_CARDS: DashboardCard[] = [
  {
    title: "Mon profile",
    description: "Gérer vos informations personnelles.",
    href: "/user-profile",
    icon: <User className="h-8 w-8 text-black" />,
    roles: ["createur", "consommateur"],
  },
  {
    title: "Ma garde-robe",
    description: "Gérer vos vêtements et vos habitudes vestimentaires.",
    href: "/wardrobe",
    icon: <Briefcase className="h-8 w-8 text-black" />,
    roles: ["createur", "consommateur"],
  },
  {
    title: "Conseiller vestimentaire",
    description: "Utiliser l'IA pour vous conseiller dans vos tenues.",
    href: "/chat",
    icon: <Sparkles className="h-8 w-8 text-black" />,
    roles: ["createur", "consommateur"],
  },
  {
    title: "Paramètres du compte",
    description: "Gérer vos paramètres de compte et préférences.",
    href: "/settings",
    icon: <Settings className="h-8 w-8 text-black" />,
    roles: ["createur", "consommateur"],
  },
  {
    title: "Mon blog",
    description: "Créer et gérer vos articles de blog.",
    href: "/blog",
    icon: <BookOpen className="h-8 w-8 text-black" />,
    roles: ["createur"],
  },
  {
    title: "Ma boutique",
    description: "Gérer votre boutique et vos produits.",
    href: "/shop",
    icon: <Store className="h-8 w-8 text-black" />,
    roles: ["createur"],
  },
  {
    title: "Mes collections",
    description: "Gérer vos collections et pièces.",
    href: "/collections/gestion",
    icon: <Palette className="h-8 w-8 text-black" />,
    roles: ["createur"],
  },
  {
    title: "Projets & Marketplace",
    description: "Gérer vos partenariats et projets collaboratifs.",
    href: "/collaborations",
    icon: <Handshake className="h-8 w-8 text-black" />,
    roles: ["createur"],
  },
  {
    title: "Exposition en ligne",
    description: "Gérer vos expositions et événements.",
    href: "/expositions",
    icon: <GalleryHorizontal className="h-8 w-8 text-black" />,
    roles: ["createur"],
  },
  {
    title: "Mon panier",
    description: "Consulter votre panier et finaliser vos achats.",
    href: "/shopping-cart",
    icon: <ShoppingCart className="h-8 w-8 text-black" />,
    roles: ["consommateur"],
  },
  {
    title: "Mes commandes",
    description: "Suivre l'état de vos commandes.",
    href: "/mes-commandes",
    icon: <Package className="h-8 w-8 text-black" />,
    roles: ["consommateur"],
  },
  {
    title: "Mon impact",
    description: "Découvrir votre impact environnemental.",
    href: "/mon-impact",
    icon: <Heart className="h-8 w-8 text-black" />,
    roles: ["consommateur"],
  },
  {
    title: "Studio analytics",
    description: "Analyser les performances de votre boutique.",
    href: "/studio/analytics",
    icon: <BarChart3 className="h-8 w-8 text-black" />,
    roles: ["createur"],
  },
]

export default function DashboardPage() {
  const { isLoggedIn, roles, userEmail, loaded, logout } = useAuth();
  const router = useRouter();

  if (loaded && !isLoggedIn) {
    router.push("/login");
    return null;
  }

  if (!loaded || !isLoggedIn) {
    return null;
  }

  const visibleCards = ALL_CARDS.filter((card) =>
    card.roles.some((role) => roles.includes(role))
  );

  const creatorCards = visibleCards.filter((c) => c.roles.includes("createur") && !c.roles.includes("consommateur"));
  const consumerCards = visibleCards.filter((c) => c.roles.includes("consommateur") && !c.roles.includes("createur"));
  const sharedCards = visibleCards.filter((c) => c.roles.includes("createur") && c.roles.includes("consommateur"));

  return (
    <div className="min-h-screen bg-white text-black pt-20">
      <Header />
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <h1 className="text-4xl md:text-6xl font-extralight tracking-[0.2em] mb-6 serif-font">
              Mon Compte
            </h1>
            <div className="w-32 h-px bg-black mx-auto mb-8" />
            <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-lg">
              Bienvenue, {userEmail} !
            </p>
            <div className="flex justify-center gap-2 mt-4">
              {roles.map((role) => (
                <span
                  key={role}
                  className="px-3 py-1 text-xs tracking-[0.1em] uppercase font-light bg-black text-white rounded-full"
                >
                  {role === "createur" ? "Créateur" : "Passionné"}
                </span>
              ))}
            </div>
          </div>

          {sharedCards.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-light serif-font mb-8">Espace commun</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                {sharedCards.map((card) => (
                  <Card key={card.href} className="py-2 bg-white text-center border-0 shadow-none hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        {card.icon}
                      </div>
                      <h3 className="text-xl font-light mb-4 serif-font tracking-wide">{card.title}</h3>
                      <p className="text-gray-600 font-light leading-relaxed mb-6">{card.description}</p>
                      <Link href={card.href}>
                        <Button className="bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase">Accéder</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {creatorCards.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-light serif-font mb-8">Espace créateur</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                {creatorCards.map((card) => (
                  <Card key={card.href} className="py-2 bg-white text-center border-0 shadow-none hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        {card.icon}
                      </div>
                      <h3 className="text-xl font-light mb-4 serif-font tracking-wide">{card.title}</h3>
                      <p className="text-gray-600 font-light leading-relaxed mb-6">{card.description}</p>
                      <Link href={card.href}>
                        <Button className="bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase">Accéder</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {consumerCards.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-light serif-font mb-8">Espace passionné</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                {consumerCards.map((card) => (
                  <Card key={card.href} className="py-2 bg-white text-center border-0 shadow-none hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        {card.icon}
                      </div>
                      <h3 className="text-xl font-light mb-4 serif-font tracking-wide">{card.title}</h3>
                      <p className="text-gray-600 font-light leading-relaxed mb-6">{card.description}</p>
                      <Link href={card.href}>
                        <Button className="bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase">Accéder</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}
