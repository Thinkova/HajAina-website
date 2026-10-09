"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ManajaButton } from "@/components/ui/manaja-button"
import { ArrowRight, Recycle, Heart, Star, ChevronLeft, ChevronRight, Handshake } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import CustomCursor from '@/components/custom-cursor'
import { useAnimation } from "@/animations"
import { useLanguage } from "@/lib/language-context"

export default function HajAinaFashion() {
  useAnimation([
    "heroSection",
    "collectionSection",
    "designersSection",
    "collaborationsSection",
    "ethiqueSection",
    "recyclageSection",
    "newsletterSection",
    "qrcodeSection",
  ]);
  
  const [currentSlide, setCurrentSlide] = useState(0)
  const { t } = useLanguage()

  const featuredDesigners = [
    {
      name: "Miora Rasoanaivo",
      specialty: t("designer.1.specialty"),
      image: "/img/Miora.jpg",
      description: t("designer.1.description"),
      id: "1", 
    },
    {
      name: "Hery Andriantsoa",
      specialty: t("designer.2.specialty"),
      image: "/img/Hery.jpg",
      description: t("designer.2.description"),
      id: "2", 
    },
    {
      name: "Lalaina Rakoto",
      specialty: t("designer.3.specialty"),
      image: "/img/Lalaina.jpg",
      description: t("designer.3.description"),
      id: "3", 
    },
  ]

  const collections = [
    {
      id: "1", 
      title: t("collection.item1.title"),
      designer: "Miora Rasoanaivo",
      image: "/img/Collection3.jpg",
      category: t("collection.item1.category"),
    },
    {
      id: "2", 
      title: t("collection.item2.title"),
      designer: "Hery Andriantsoa",
      image: "/img/Collection1.jpg",
      category: t("collection.item2.category"),
    },
    {
      id: "3", 
      title: t("collection.item3.title"),
      designer: "Lalaina Rakoto",
      image: "/img/Collection2.jpg",
      category: t("collection.item3.category"),
    },
    {
      id: "4", 
      title: t("collection.item4.title"),
      designer: "Miora Rasoanaivo",
      image: "/img/Collection4.jpg",
      category: t("collection.item4.category"),
    },
  ]

  const collaborationAnnouncements = [
    {
      id: "ann1",
      title: t("collab.1.title"),
      company: "Mode Circulaire",
      description: t("collab.1.desc"),
      image: "/img/Collab1.jpg",
      link: "/collaborations",
    },
    {
      id: "ann2",
      title: t("collab.2.title"),
      company: "Future Fibres Lab",
      description: t("collab.2.desc"),
      image: "/img/Collab2.jpg",
      link: "/collaborations",
    },
    {
      id: "ann3",
      title: t("collab.3.title"),
      company: "Conscience & Style",
      description: t("collab.3.desc"),
      image: "/img/Collab3.jpg",
      link: "/collaborations",
    },
  ]

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Header */}
      <Header />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Hero Section */}
      <section className="relative min-h-[115vh] py-10 flex items-center justify-center overflow-hidden bg-[#0b0b0b]">
        {/* Hero Image Left */}
        <div className="absolute inset-0 md:inset-y-0 md:left-0 md:w-[45%] h-full z-10 overflow-hidden">
          <div className="hero-image invisible relative w-full h-full">
            <Image
              src="/img/hero-image.jpg"
              alt="Hero Fashion"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute right-0 inset-0 bg-gradient-to-r from-white/30 via-black/20 to-[#0b0b0b] z-10" />
          </div>
        </div>

        {/* Hero Text Content */}
        <div className="relative z-20 text-white px-6 md:px-12 lg:px-20 max-w-3xl md:ml-[45%] text-center md:text-left md:-translate-y-5">
          <h1 className="hero-title invisible text-4xl sm:text-5xl md:text-8xl font-extralight tracking-[0.2em] mb-10 serif-font">
            HAJ&apos;AINA
          </h1>
          <div className="hero-subtext invisible flex items-center mb-10 gap-3">
            <p className="text-lg md:text-xl font-meliora font-light tracking-[0.05em] opacity-90">
              {t("hero.tagline")}
            </p> 
            <Image src="/img/madagascar.png" alt="" width={20} height={0} className="mt-1"/>
          </div>
          <p className="hero-description invisible text-base md:text-lg mb-10 leading-relaxed font-light opacity-80 md:text-justify">
            {t("hero.description")}
          </p>
          <Link href="/collections">
            <Button
              size="lg"
              className="hero-button invisible bg-green-700 text-white hover:bg-green-600 text-xs tracking-[0.15em] px-8 py-4 font-normal uppercase"
            >
              {t("hero.cta")}
              <ArrowRight className="ml-3 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <Image
          src="/logo-med.jpg"
          alt="Hero Fashion"
          width={500}
          height={500}
          className="main-logo invisible absolute left-[50%] top-[42%] -translate-x-[50%] -translate-y-[50%] object-cover mb-10"
          priority
        />
      </section>

      {/* Marquee section*/}
      <section className="marquee-section relative w-full py-28 h-full bg-gray-50 overflow-visible z-20">
        {/* Grand ruban */}
        <div className="absolute overlay top-2 -left-full w-[202%] h-full rotate-[-4deg] z-1 bg-gray-50" />

        <div className="absolute -top-1 -left-full w-[202%] rotate-[-4deg] z-9 bg-gray-400">
          <div className="flex animate-marquee whitespace-nowrap text-2xl md:text-4xl font-light serif-font text-white uppercase gap-12 py-5">
            {Array(20)
              .fill("")
              .map((_, i) => (
                <div key={i} className="flex gap-12">
                  <span>extend bc</span>
                  <span>conserfashion</span>
                  <span>made for woman</span>
                </div>
              ))}
          </div>
        </div>

        {/* Petit ruban */}
        <div className="absolute top-[50%] -left-full w-[202%] rotate-[4deg] z-3 bg-black/95 py-2">
          <div className="flex animate-marquee-slow whitespace-nowrap text-2xl md:text-4xl font-light serif-font text-white uppercase gap-12 py-2">
            {Array(20)
              .fill("")
              .map((_, i) => (
                <div key={i} className="flex gap-12">
                  <span>IFM Madagascar</span>
                  <span>{t("marquee.modeEthique")}</span>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Featured Collections Carousel */}
      <section className="collections-section py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extralight tracking-[0.2em] mb-6 serif-font">{t("collections.title")}</h2>
            <div className="w-32 h-px bg-black mx-auto mb-8 separator" />
            <p className="text-lg text-gray-600 font-light tracking-wide max-w-2xl mx-auto leading-relaxed">
              {t("collections.subtitle")}
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-lg">
              <div
                className="flex transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {collections.map((collection, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                      <div className="relative h-[500px] md:h-[700px] overflow-hidden rounded-lg">
                        <Image
                          src={collection.image || "/placeholder.svg"}
                          alt={collection.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      </div>
                      <div className="space-y-8 px-4">
                        <Badge
                          variant="outline"
                          className="text-xs tracking-[0.15em] font-light uppercase border-gray-300"
                        >
                          {collection.category}
                        </Badge>
                        <h3 className="text-4xl font-extralight tracking-[0.1em] serif-font leading-tight">
                          {collection.title}
                        </h3>
                        <p className="text-gray-600 text-lg font-light tracking-wide">{t("collections.by")} {collection.designer}</p>
                        <p className="text-gray-700 leading-relaxed font-light text-lg">
                          {t("collections.description")}
                        </p>
                        
                        <div className="flex gap-4">
                          <ManajaButton/>
                          <Link href={`/collections/${collection.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="tracking-[0.1em] font-light uppercase text-xs bg-transparent"
                            >
                              {t("collections.discover")}
                              <ArrowRight className="ml-3 h-4 w-4" /> 
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + collections.length) % collections.length)}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-xl transition-all backdrop-blur-sm"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % collections.length)}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-xl transition-all backdrop-blur-sm"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Designers */}
      <section className="designers-section py-24">
        <div className="container relative mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extralight tracking-[0.2em] mb-6 serif-font">{t("designers.title")}</h2>
            <div className="w-32 h-px bg-black mx-auto mb-8" />
            <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-lg">
              {t("designers.subtitle")}
            </p>
            
            <div className="absolute top-[-8rem] md:top-0 right-16">
              <div className="rotating-star min-w-[60px] min-h-[60px] md:min-w-[100px] md:min-h-[100px]"/>
              <div className="absolute inset-0 flex justify-center items-center text-lg md:text-2xl serif-font text-white">
                <p className="tag">
                  100<span className="text-lg">%</span><br/>
                  <span>Gasy</span>
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {featuredDesigners.map((designer, index) => (
              <Link key={index} href={`/stylistes/${designer.id}`}>
                <Card className="group cursor-pointer border-0 shadow-none hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-[500px] overflow-hidden">
                      <Image
                        src={designer.image || "/placeholder.svg"}
                        alt={designer.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-8 left-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                        <Badge className="mb-3 bg-white/20 text-white border-white/30 backdrop-blur-sm font-light tracking-wide">
                          {designer.specialty}
                        </Badge>
                        <p className="text-sm font-light leading-relaxed max-w-xs">{designer.description}</p>
                      </div>
                    </div>
                    <div className="p-8">
                      <h3 className="text-2xl font-light mb-3 serif-font tracking-wide">{designer.name}</h3>
                      <p className="text-gray-600 text-sm mb-4 tracking-wide font-light uppercase">
                        {designer.specialty}
                      </p>
                      <p className="text-gray-700 text-sm leading-relaxed font-light">{designer.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Ethical Fashion Section */}
      <section className="ethique-section py-24 bg-black text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-extralight tracking-[0.2em] mb-8 serif-font">{t("ethique.title")}</h2>
              <div className="w-32 h-px bg-white mb-10" />
              <p className="text-xl leading-relaxed mb-10 text-gray-300 font-light">
                {t("ethique.description")}
              </p>
              <div className="space-y-6 mb-12">
                <div className="flex items-center space-x-4">
                  <Heart className="h-6 w-6 text-white flex-shrink-0" />
                  <span className="font-light tracking-wide">{t("ethique.point1")}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Recycle className="h-6 w-6 text-white flex-shrink-0" />
                  <span className="font-light tracking-wide">{t("ethique.point2")}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <Star className="h-6 w-6 text-white flex-shrink-0" />
                  <span className="font-light tracking-wide">{t("ethique.point3")}</span>
                </div>
              </div>
              <Link href="/ethique">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black bg-transparent font-light tracking-[0.1em] uppercase px-8 py-3"
                >
                  {t("ethique.learnMore")}
                </Button>
              </Link>
            </div>
            <div className="relative h-[600px] overflow-hidden rounded-lg">
              <Image
                src="/img/Ethique.jpg"
                alt="Mode Éthique"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Recycling Section */}
      <section className="recyclage-section py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-extralight tracking-[0.2em] mb-6 serif-font">{t("recyclage.title")}</h2>
            <div className="w-32 h-px bg-black mx-auto mb-8" />
            <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-lg">
              {t("recyclage.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] overflow-hidden rounded-lg">
              <Image
                src="/img/Recyclage.jpg"
                alt="Recyclage Mode"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
            </div>
            <div className="space-y-8">
              <h3 className="text-3xl font-extralight tracking-[0.1em] serif-font">{t("recyclage.howTitle")}</h3>
              <div className="space-y-8">
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-sm font-light flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-light mb-2 text-lg tracking-wide">{t("recyclage.step1.title")}</h4>
                    <p className="text-gray-600 font-light leading-relaxed">
                      {t("recyclage.step1.desc")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-sm font-light flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-light mb-2 text-lg tracking-wide">{t("recyclage.step2.title")}</h4>
                    <p className="text-gray-600 font-light leading-relaxed">
                      {t("recyclage.step2.desc")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center text-sm font-light flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-light mb-2 text-lg tracking-wide">{t("recyclage.step3.title")}</h4>
                    <p className="text-gray-600 font-light leading-relaxed">
                      {t("recyclage.step3.desc")}
                    </p>
                  </div>
                </div>
              </div>
              <Link href="/recyclage">
                <Button className="bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase px-8 py-3 mt-8">
                  {t("recyclage.cta")}
                  <Recycle className="ml-3 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Announcements Section */}
      <section className="collaborations-section py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extralight tracking-[0.2em] mb-6 serif-font">{t("collabs.title")}</h2>
            <div className="w-32 h-px bg-black mx-auto mb-8" />
            <p className="text-gray-600 max-w-3xl mx-auto font-light leading-relaxed text-lg">
              {t("collabs.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {collaborationAnnouncements.map((announcement) => (
              <Card
                key={announcement.id}
                className="card group cursor-pointer border-0 shadow-none hover:shadow-2xl"
              >
                <CardContent className="p-0">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={announcement.image || "/placeholder.svg"}
                      alt={announcement.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  <div className="p-8">
                    <Badge variant="outline" className="mb-4 text-xs tracking-[0.15em] font-light uppercase">
                      {announcement.company}
                    </Badge>
                    <h3 className="text-xl font-light mb-3 serif-font tracking-wide leading-tight">
                      {announcement.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed font-light mb-6">{announcement.description}</p>
                    <Link href={announcement.link}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="tracking-[0.1em] font-light uppercase text-xs bg-transparent"
                      >
                        {t("collabs.viewAnnouncement")}
                        <ArrowRight className="ml-2 h-3 w-3" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link href="/collaborations">
              <Button className="bg-black text-white hover:bg-gray-800 font-light tracking-[0.1em] uppercase px-8 py-3">
                {t("collabs.viewAll")}
                <Handshake className="ml-3 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* QRCode Section */}
      <section className="ethique-section py-24 bg-gray-50 text-black">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-extralight tracking-[0.2em] mb-8 serif-font">
                {t("qrcode.title")}
              </h2>
              <div className="w-32 h-px bg-black mb-10" />
              <p className="text-xl leading-relaxed mb-10 text-gray-800 font-light">
                {t("qrcode.description")}
              </p>
              <div className="space-y-6 mb-12">
                <div className="flex items-center space-x-4">
                  <Heart className="h-8 w-8 text-black flex-shrink-0" />
                  <span className="font-light tracking-wide">
                    {t("qrcode.point1")}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <Handshake className="h-6 w-6 text-black flex-shrink-0" />
                  <span className="font-light tracking-wide">
                    {t("qrcode.point2")}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <Recycle className="h-6 w-6 text-black flex-shrink-0" />
                  <span className="font-light tracking-wide">
                    {t("qrcode.point3")}
                  </span>
                </div>
              </div>
              <Link href="/ethique">
                <Button
                  variant="outline"
                  className="border-black text-black hover:bg-black hover:text-white bg-transparent font-light tracking-[0.1em] uppercase px-8 py-3"
                >
                  {t("qrcode.cta")}
                </Button>
              </Link>
            </div>
            <div className="scanner-container relative overflow-visible w-full aspect-[1/0.75] rounded-lg flex justify-center items-center">
              <div className="scanned-image"/>
              <div className="qrcode-frame"/>
              <div className="scanner absolute left-1/2 -translate-x-1/2 top-1/2 w-[95%] h-1 bg-green-300 rounded blur-xs z-20 shadow-lg" />
            </div>
          </div>
        </div>
      </section>


      {/* Newsletter */}
      <section className="newsletter-section py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-extralight tracking-[0.2em] mb-6 serif-font">{t("newsletter.title")}</h2>
            <div className="w-32 h-px bg-black mx-auto mb-8" />
            <p className="text-gray-600 mb-12 font-light leading-relaxed text-lg">
              {t("newsletter.subtitle")}
            </p>
            <div className="flex gap-4 max-w-lg mx-auto">
              <Input
                type="email"
                placeholder={t("newsletter.placeholder")}
                className="border-gray-300 focus:border-black font-light tracking-wide"
              />
              <Button className="bg-black text-white hover:bg-gray-800 px-10 font-light tracking-[0.1em] uppercase">
                {t("newsletter.subscribe")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
