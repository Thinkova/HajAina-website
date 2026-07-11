import { InMemoryStore } from "./in-memory-store"
import type { Styliste } from "@/types/data"
import stylistesData from "@/data/stylistes.json"

export const stylisteStore = new InMemoryStore<Styliste>(stylistesData as Styliste[])
