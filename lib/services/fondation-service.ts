import { fondationStore } from "@/lib/stores"
import type { FoundationValue, FoundationImpact } from "@/types/data"

export const fondationService = {
  getValues: (): FoundationValue[] => fondationStore.getValues(),
  getImpacts: (): FoundationImpact[] => fondationStore.getImpacts(),
}
