"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Play,
  Search,
  Camera,
  User,
  Home,
  ShoppingBag,
  Heart,
  Settings,
  LogOut,
} from "lucide-react"

interface NavItem {
  icon: any
  label: string
  href: string
  isCenter?: boolean
}

const navItems: NavItem[] = [
  {
    icon: Play,
    label: "Story",
    href: "/story",
  },
  {
    icon: Search,
    label: "Explorer",
    href: "/collections",
  },
  {
    icon: Camera,
    label: "Scanner",
    href: "/scan",
    isCenter: true,
  },
  {
    icon: User,
    label: "Mon Espace",
    href: "/mon-impact",
  },
]

export default function MobileBottomNav() {
  const pathname = usePathname()
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    setShowMenu(false)
  }, [pathname])

  return (
    <>
      {/* Bottom Nav Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-100 safe-area-bottom">
        <div className="flex items-center justify-around px-4 py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            if (item.isCenter) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative -mt-6"
                >
                  <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </Link>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center py-2 min-w-[60px]"
              >
                <Icon
                  className={`h-5 w-5 mb-1 transition-colors ${
                    isActive ? "text-black" : "text-gray-400"
                  }`}
                />
                <span
                  className={`text-[10px] font-light tracking-wider transition-colors ${
                    isActive ? "text-black" : "text-gray-400"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-20 md:hidden" />
    </>
  )
}
