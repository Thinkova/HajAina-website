import { InMemoryStore } from "./in-memory-store"
import type { Product } from "@/types/data"
import productsData from "@/data/products.json"

export const productStore = new InMemoryStore<Product>(productsData as Product[])
