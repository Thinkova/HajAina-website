export type UserRole = "createur" | "consommateur"

export interface User {
  email: string
  roles: UserRole[]
  firstName?: string
  lastName?: string
  brandName?: string
  speciality?: string
}
