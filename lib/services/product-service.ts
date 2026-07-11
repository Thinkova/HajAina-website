import { productStore } from "@/lib/stores"
import type { Product } from "@/types/data"

export const productService = {
  getAll: (): Product[] => productStore.findAll(),
  getById: (id: string): Product | undefined => productStore.findById(id),
  getByCategory: (category: string): Product[] =>
    productStore.where((p) => p.category === category),
  getByDesignerId: (designerId: string): Product[] =>
    productStore.where((p) => p.designerId === designerId),
  getByCollectionId: (collectionId: string): Product[] =>
    productStore.where((p) => p.collectionId === collectionId),
  getCategories: (): string[] => {
    const products = productStore.findAll()
    return [...new Set(products.map((p) => p.category))]
  },
  create: (product: Product): Product => productStore.create(product),
  update: (id: string, updates: Partial<Product>): Product | undefined =>
    productStore.update(id, updates),
  delete: (id: string): boolean => productStore.delete(id),
}
