import type { FondationData } from "@/types/data"
import fondationDataJson from "@/data/fondation-data.json"

const data = fondationDataJson as unknown as FondationData

export const fondationStore = {
  getValues: () => [...data.foundationValues],
  getImpacts: () => [...data.foundationImpacts],
}
