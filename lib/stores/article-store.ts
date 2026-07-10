import { InMemoryStore } from "./in-memory-store"
import type { Article } from "@/types/data"
import articlesData from "@/data/articles.json"

export const articleStore = new InMemoryStore<Article>(articlesData as Article[])
