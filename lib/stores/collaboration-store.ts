import type { CollaborationData } from "@/types/data"
import collaborationDataJson from "@/data/collaboration-data.json"

const data = collaborationDataJson as unknown as CollaborationData

export const collaborationStore = {
  getConversations: () => [...data.conversations],
  getMessages: () => [...data.messages],
  getTodos: () => [...data.todos],
  getServicesByCategory: (category: string) =>
    [...(data.servicesByCategory[category] || [])],
  getAllServicesByCategory: () => ({ ...data.servicesByCategory }),
}
