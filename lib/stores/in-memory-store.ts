export class InMemoryStore<T extends { id: string | number }> {
  private items: T[]

  constructor(initialData: T[]) {
    this.items = [...initialData]
  }

  findAll(): T[] {
    return [...this.items]
  }

  findById(id: string | number): T | undefined {
    return this.items.find((item) => item.id === id)
  }

  where(predicate: (item: T) => boolean): T[] {
    return this.items.filter(predicate)
  }

  find(predicate: (item: T) => boolean): T | undefined {
    return this.items.find(predicate)
  }

  create(item: T): T {
    this.items.push(item)
    return item
  }

  update(id: string | number, updates: Partial<T>): T | undefined {
    const index = this.items.findIndex((item) => item.id === id)
    if (index === -1) return undefined
    this.items[index] = { ...this.items[index], ...updates }
    return this.items[index]
  }

  delete(id: string | number): boolean {
    const index = this.items.findIndex((item) => item.id === id)
    if (index === -1) return false
    this.items.splice(index, 1)
    return true
  }

  count(): number {
    return this.items.length
  }

  reset(newData: T[]): void {
    this.items = [...newData]
  }
}
