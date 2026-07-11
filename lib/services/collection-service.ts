import { collectionStore } from "@/lib/stores"
import type { Collection } from "@/types/data"

export const collectionService = {
  getAll: (): Collection[] => collectionStore.findAll(),
  getById: (id: string): Collection | undefined => collectionStore.findById(id),
  getByCategory: (category: string): Collection[] =>
    collectionStore.where((c) => c.category === category),
  getByDesigner: (designer: string): Collection[] =>
    collectionStore.where((c) => c.designer === designer),
  create: (collection: Collection): Collection =>
    collectionStore.create(collection),
  update: (id: string, updates: Partial<Collection>): Collection | undefined =>
    collectionStore.update(id, updates),
  delete: (id: string): boolean => collectionStore.delete(id),
}
