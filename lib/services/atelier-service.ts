import { atelierStore } from "@/lib/stores"
import type { Atelier } from "@/types/data"

export const atelierService = {
  getAll: (): Atelier[] => atelierStore.findAll(),
  getById: (id: string): Atelier | undefined => atelierStore.findById(id),
  getByStylisteId: (stylisteId: string): Atelier | undefined =>
    atelierStore.find((a) => a.stylisteId === stylisteId),
  create: (atelier: Atelier): Atelier => atelierStore.create(atelier),
  update: (id: string, updates: Partial<Atelier>): Atelier | undefined =>
    atelierStore.update(id, updates),
  delete: (id: string): boolean => atelierStore.delete(id),
}
