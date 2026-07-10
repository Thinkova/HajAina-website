import { InMemoryStore } from "./in-memory-store"
import type { Atelier } from "@/types/data"
import ateliersData from "@/data/ateliers.json"

export const atelierStore = new InMemoryStore<Atelier>(ateliersData as Atelier[])
