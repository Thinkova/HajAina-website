import { userStore } from "@/lib/stores/user-store"
import type { UserRole } from "@/types/auth"

export const ROLE_LABELS: Record<UserRole, string> = {
  createur: "Créateur de mode",
  consommateur: "Passionné de mode",
}

export const roleService = {
  getRoles: (): UserRole[] => userStore.getRoles(),
  hasRole: (role: UserRole): boolean => userStore.hasRole(role),
  isCreator: (): boolean => userStore.isCreator(),
  isConsumer: (): boolean => userStore.isConsumer(),
  hasAnyRole: (roles: UserRole[]): boolean =>
    roles.some((role) => userStore.hasRole(role)),
  hasAllRoles: (roles: UserRole[]): boolean =>
    roles.every((role) => userStore.hasRole(role)),
  getLabel: (role: UserRole): string => ROLE_LABELS[role],
}
