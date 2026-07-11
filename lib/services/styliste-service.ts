import { stylisteStore } from "@/lib/stores"
import type { Styliste } from "@/types/data"

export const stylisteService = {
  getAll: (): Styliste[] => stylisteStore.findAll(),
  getById: (id: string): Styliste | undefined => stylisteStore.findById(id),
  getByLocation: (location: string): Styliste[] =>
    stylisteStore.where((s) => s.location === location),
  create: (styliste: Styliste): Styliste => stylisteStore.create(styliste),
  update: (id: string, updates: Partial<Styliste>): Styliste | undefined =>
    stylisteStore.update(id, updates),
  delete: (id: string): boolean => stylisteStore.delete(id),
}
