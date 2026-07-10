"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { userStore } from "@/lib/stores/user-store"
import type { UserRole } from "@/types/auth"

export function useAuth() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [roles, setRoles] = useState<UserRole[]>([])
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  const refresh = useCallback(() => {
    setIsLoggedIn(userStore.isLoggedIn)
    setRoles(userStore.getRoles())
    setUserEmail(userStore.getUser()?.email || null)
    setLoaded(true)
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const logout = useCallback(() => {
    userStore.logout()
    setIsLoggedIn(false)
    setRoles([])
    setUserEmail(null)
    router.push("/")
  }, [router])

  const hasRole = useCallback((role: UserRole) => roles.includes(role), [roles])
  const isCreator = useCallback(() => roles.includes("createur"), [roles])
  const isConsumer = useCallback(() => roles.includes("consommateur"), [roles])

  return {
    isLoggedIn,
    roles,
    userEmail,
    loaded,
    logout,
    hasRole,
    isCreator,
    isConsumer,
  }
}
