import type { User, UserRole } from "@/types/auth"

const KEYS = {
  isLoggedIn: "isLoggedIn",
  userRoles: "userRoles",
  userEmail: "userEmail",
  userName: "userName",
  userBrand: "userBrand",
} as const

export const userStore = {
  get isLoggedIn(): boolean {
    if (typeof window === "undefined") return false
    return localStorage.getItem(KEYS.isLoggedIn) === "true"
  },

  getRoles(): UserRole[] {
    if (typeof window === "undefined") return []
    const raw = localStorage.getItem(KEYS.userRoles)
    if (!raw) return []
    try {
      return JSON.parse(raw) as UserRole[]
    } catch {
      return []
    }
  },

  hasRole(role: UserRole): boolean {
    return this.getRoles().includes(role)
  },

  isCreator(): boolean {
    return this.hasRole("createur")
  },

  isConsumer(): boolean {
    return this.hasRole("consommateur")
  },

  getUser(): User | null {
    if (!this.isLoggedIn) return null
    return {
      email: localStorage.getItem(KEYS.userEmail) || "",
      roles: this.getRoles(),
      firstName: localStorage.getItem(KEYS.userName) || undefined,
      brandName: localStorage.getItem(KEYS.userBrand) || undefined,
    }
  },

  login(roles: UserRole[], email: string, name?: string, brand?: string) {
    localStorage.setItem(KEYS.isLoggedIn, "true")
    localStorage.setItem(KEYS.userRoles, JSON.stringify(roles))
    localStorage.setItem(KEYS.userEmail, email)
    if (name) localStorage.setItem(KEYS.userName, name)
    if (brand) localStorage.setItem(KEYS.userBrand, brand)
  },

  logout() {
    localStorage.removeItem(KEYS.isLoggedIn)
    localStorage.removeItem(KEYS.userRoles)
    localStorage.removeItem(KEYS.userEmail)
    localStorage.removeItem(KEYS.userName)
    localStorage.removeItem(KEYS.userBrand)
  },
}
