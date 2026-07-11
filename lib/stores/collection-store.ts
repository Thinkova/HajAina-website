import { InMemoryStore } from "./in-memory-store"
import type { Collection } from "@/types/data"
import collectionsData from "@/data/collections.json"

export const collectionStore = new InMemoryStore<Collection>(collectionsData as Collection[])
