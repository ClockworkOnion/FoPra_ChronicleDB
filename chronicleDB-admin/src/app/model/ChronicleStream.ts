import { ChronicleEventElement, EventCompoundType } from "./ChronicleEvent";

export interface ChronicleStream {
  id: number,
  event: ChronicleEventElement[]
  compoundType: EventCompoundType
}