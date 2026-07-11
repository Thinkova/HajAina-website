import { collaborationStore } from "@/lib/stores"
import type {
  CollaborationConversation,
  CollaborationMessage,
  CollaborationTodo,
  MarketplaceService,
} from "@/types/data"

export const collaborationService = {
  getConversations: (): CollaborationConversation[] =>
    collaborationStore.getConversations(),
  getMessages: (): CollaborationMessage[] =>
    collaborationStore.getMessages(),
  getTodos: (): CollaborationTodo[] =>
    collaborationStore.getTodos(),
  getServicesByCategory: (category: string): MarketplaceService[] =>
    collaborationStore.getServicesByCategory(category),
}
