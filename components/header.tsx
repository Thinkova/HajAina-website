"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Bell, ChevronDown, Globe, LogOut, Menu, Settings, ShoppingCart, User, UserCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAnimation } from "@/animations"
import { Dropdown, DropdownItem } from "@/components/ui/custom-dropdown"
import { userStore } from "@/lib/stores/user-store"
import type { UserRole } from "@/types/auth"
import { useLanguage } from "@/lib/language-context"

function useHeaderState() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [roles, setRoles] = useState<UserRole[]>([])
  const [atTop, setAtTop] = useState(true)

  useEffect(() => {
    setIsLoggedIn(userStore.isLoggedIn)
    setRoles(userStore.getRoles())

    const onScroll = () => {
      setAtTop(window.scrollY < window.innerHeight)
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [pathname])

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const handleLogout = () => {
    userStore.logout()
    setIsLoggedIn(false)
    setRoles([])
    router.push("/")
  }

  const shouldInvert = pathname === "/" && atTop
  const isCreator = roles.includes("createur")
  const isConsumer = roles.includes("consommateur")

  return { isLoggedIn, isActive, handleLogout, shouldInvert, isCreator, isConsumer }
}

function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const [showPopup, setShowPopup] = useState(false)

  // Show popup on first visit
  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("hajaina-lang-popup-seen")
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowPopup(true)
        sessionStorage.setItem("hajaina-lang-popup-seen", "true")
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <>
      {/* Language switcher button */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-1.5 text-xs font-light tracking-[0.1em] uppercase px-3 py-1.5 rounded-full border border-gray-300 hover:border-gray-600 transition-all duration-200 bg-white/80 backdrop-blur-sm"
          aria-label="Change Language"
        >
          <Globe className="h-3.5 w-3.5" />
          <span>{language === "fr" ? "FR" : "EN"}</span>
          <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <div className="absolute right-0 top-full mt-2 z-50 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden min-w-[180px] animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="p-3 border-b border-gray-100">
                <p className="text-xs text-gray-500 font-light tracking-wide uppercase">
                  {language === "fr" ? "Langue" : "Language"}
                </p>
              </div>
              <button
                onClick={() => { setLanguage("fr"); setOpen(false) }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-light text-left hover:bg-gray-50 transition-colors ${language === "fr" ? "bg-gray-50" : ""}`}
              >
                <span className="text-base">🇲🇬</span>
                <div>
                  <div className="font-medium text-xs tracking-wide">Français</div>
                  <div className="text-xs text-gray-400">Langue originale</div>
                </div>
                {language === "fr" && <span className="ml-auto text-green-600 text-xs">✓</span>}
              </button>
              <button
                onClick={() => { setLanguage("en"); setOpen(false) }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-light text-left hover:bg-gray-50 transition-colors ${language === "en" ? "bg-gray-50" : ""}`}
              >
                <span className="text-base">🇬🇧</span>
                <div>
                  <div className="font-medium text-xs tracking-wide">English</div>
                  <div className="text-xs text-gray-400">English version</div>
                </div>
                {language === "en" && <span className="ml-auto text-green-600 text-xs">✓</span>}
              </button>
            </div>
          </>
        )}
      </div>

      {/* First-visit popup */}
      {showPopup && (
        <div className="fixed inset-0 z-[200] flex items-start justify-end pointer-events-none">
          <div className="pointer-events-auto mt-20 mr-6 bg-white border border-gray-200 rounded-2xl shadow-2xl p-5 max-w-xs animate-in slide-in-from-top-4 fade-in duration-500">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <Globe className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-semibold tracking-wide text-gray-900">Choose Your Language</p>
                <p className="text-xs text-gray-500 font-light">Choisir la langue</p>
              </div>
            </div>
            <p className="text-xs text-gray-600 font-light leading-relaxed mb-4">
              This website is available in <strong>French</strong> (original) and <strong>English</strong>. Use the 🌐 button in the top right to switch.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => { setLanguage("fr"); setShowPopup(false) }}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-light border transition-all ${language === "fr" ? "bg-black text-white border-black" : "border-gray-200 hover:border-gray-400"}`}
              >
                🇲🇬 Français
              </button>
              <button
                onClick={() => { setLanguage("en"); setShowPopup(false) }}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-light border transition-all ${language === "en" ? "bg-black text-white border-black" : "border-gray-200 hover:border-gray-400"}`}
              >
                🇬🇧 English
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export function HeaderDesktop() {
  const { isLoggedIn, isActive, handleLogout, shouldInvert, isCreator, isConsumer } = useHeaderState()
  const { t } = useLanguage()

  return (
    <header
      className={`header invisible hidden md:block fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100 ${
        shouldInvert ? "invert" : ""
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-light tracking-[0.2em] serif-font">
            <img src="/logo-transparent.png" alt="Haj'Aina" className="w-auto h-[40px]" />
          </Link>

          <nav className="flex space-x-8">
            {[
              ["/", t("nav.home")],
              ["/collections", t("nav.collections")],
              ["/ateliers", t("nav.ateliers")],
              ["/stylistes", t("nav.stylistes")],
              ["/ethique", t("nav.ethique")],
              ["/recyclage", t("nav.recyclage")],
              ["/magazine", t("nav.magazine")],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className={`navlink text-xs font-light tracking-[0.15em] transition-colors uppercase ${
                  isActive(href) ? "text-black active" : "hover:text-gray-600"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-3">
            <LanguageSwitcher />
            {isLoggedIn ? (
              <>
                {isConsumer && (
                  <Link href="/shopping-cart">
                    <Button variant="ghost" size="sm" className="text-xs tracking-[0.1em] font-light uppercase">
                      <ShoppingCart className="h-5 w-5"/>
                    </Button>
                  </Link>
                )}
                <Link href="/notifications">
                  <Button variant="ghost" size="sm" className="text-xs tracking-[0.1em] font-light uppercase">
                    <Bell className="h-5 w-5" />
                  </Button>
                </Link>
                <Dropdown
                  trigger={
                    <Button variant="ghost" size="sm" className="text-xs tracking-[0.1em] font-light uppercase flex items-center gap-2">
                      <UserCircle className="h-5 w-5"/>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  }
                >
                  <Link href="/dashboard">
                    <DropdownItem className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>{t("nav.monCompte")}</span>
                    </DropdownItem>
                  </Link>
                  {isCreator && (
                    <Link href="/shop">
                      <DropdownItem className="flex items-center">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        <span>{t("nav.maBoutique")}</span>
                      </DropdownItem>
                    </Link>
                  )}
                  <Link href="/settings">
                    <DropdownItem className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>{t("nav.parametres")}</span>
                    </DropdownItem>
                  </Link>
                  <DropdownItem 
                    className="flex items-center text-red-600" 
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t("nav.deconnexion")}</span>
                  </DropdownItem>
                </Dropdown>
              </>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-xs tracking-[0.1em] font-light uppercase">
                  {t("nav.connexion")}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export function HeaderMobile() {
  const { isLoggedIn, isActive, handleLogout, shouldInvert, isConsumer } = useHeaderState()
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)

  return (
    <header
      className={`header invisible block md:hidden fixed top-0 w-full z-50 border-b border-gray-100 ${
        shouldInvert ? "invert bg-white backdrop-blur-sm" : "bg-white backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-light tracking-[0.2em] serif-font">
          <img src="/logo-transparent.png" alt="Haj'Aina" className="h-[36px]" />
        </Link>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          {isLoggedIn && (
            <div className="flex">
              {isConsumer && (
                <Link href="/shopping-cart" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="w-full text-xs uppercase font-light tracking-widest">
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                </Link>
              )}
              <Link href="/notifications" onClick={() => setOpen(false)}>
                <Button variant="ghost" className="w-full text-xs uppercase font-light tracking-widest">
                  <Bell className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button onClick={() => setOpen(!open)} aria-label="Toggle Menu">
                {open ? <X className="h-4 w-4" /> : <Menu className="ml-2 h-4 w-4" />}
              </Button>
            </div>
          )}
        </div>
      </div>

      {open && (
        <>
          <div className="fixed inset-0 z-40 h-screen w-screen bg-gray-50/50 backdrop-blur-xl" onClick={() => setOpen(false)} />
          <div className="fixed top-0 right-0 w-3/4 h-screen z-50 bg-white p-6 flex flex-col gap-6 transition-transform duration-300">
            <nav className="flex flex-col space-y-5 text-xs uppercase font-light tracking-[0.15em]">
              {[
                ["/", t("nav.home")],
                ["/collections", t("nav.collections")],
                ["/ateliers", t("nav.ateliers")],
                ["/stylistes", t("nav.stylistes")],
                ["/ethique", t("nav.ethique")],
                ["/recyclage", t("nav.recyclage")],
                ["/magazine", t("nav.magazine")],
              ].map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className={`${isActive(href) ? "text-black font-semibold" : "text-gray-600"} transition-colors`}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto pt-6 border-t border-gray-200">
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" onClick={() => setOpen(false)}>
                    <Button variant="ghost" className="w-full text-xs uppercase font-light tracking-widest">
                      {t("nav.monCompte")}
                      <User className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleLogout()
                      setOpen(false)
                    }}
                    className="w-full text-xs uppercase font-light tracking-widest"
                  >
                    {t("nav.deconnexion")}
                    <LogOut className="ml-2 h-4 w-4" />
                  </Button>
                </>
              ) : (
                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="w-full text-xs uppercase font-light tracking-widest">
                    {t("nav.connexion")}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  )
}

export default function Header() {
  useAnimation(["header"]);

  return (
    <>
      <HeaderDesktop />
      <HeaderMobile />
    </>
  )
}
