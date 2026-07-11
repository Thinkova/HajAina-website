"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import type { UserRole } from "@/types/auth"

interface RoleGuardProps {
  children: React.ReactNode
  requiredRoles?: UserRole[]
  requireAll?: boolean
  fallback?: string
}

export function RoleGuard({
  children,
  requiredRoles,
  requireAll = false,
  fallback = "/dashboard",
}: RoleGuardProps) {
  const { isLoggedIn, roles, loaded } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loaded) return

    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    if (requiredRoles && requiredRoles.length > 0) {
      const hasAccess = requireAll
        ? requiredRoles.every((r) => roles.includes(r))
        : requiredRoles.some((r) => roles.includes(r))

      if (!hasAccess) {
        router.push(fallback)
      }
    }
  }, [loaded, isLoggedIn, roles, requiredRoles, requireAll, fallback, router])

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-black">
        <p className="font-light tracking-wide">Chargement...</p>
      </div>
    )
  }

  if (!isLoggedIn) return null

  if (requiredRoles && requiredRoles.length > 0) {
    const hasAccess = requireAll
      ? requiredRoles.every((r) => roles.includes(r))
      : requiredRoles.some((r) => roles.includes(r))

    if (!hasAccess) return null
  }

  return <>{children}</>
}
