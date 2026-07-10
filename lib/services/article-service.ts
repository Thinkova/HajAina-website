import { articleStore } from "@/lib/stores"
import type { Article } from "@/types/data"

export const articleService = {
  getAll: (): Article[] => articleStore.findAll(),
  getById: (id: number): Article | undefined => articleStore.findById(id),
  getByCategory: (category: string): Article[] =>
    articleStore.where((a) => a.category === category),
  getFeatured: (): Article | undefined =>
    articleStore.find((a) => a.featured),
  getRegular: (): Article[] =>
    articleStore.where((a) => !a.featured),
  create: (article: Article): Article => articleStore.create(article),
  update: (id: number, updates: Partial<Article>): Article | undefined =>
    articleStore.update(id, updates),
  delete: (id: number): boolean => articleStore.delete(id),
}
