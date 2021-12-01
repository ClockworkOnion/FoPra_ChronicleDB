import { ChronicleEventElement, EventCompoundType } from "./ChronicleEvent";

export interface ChronicleStream {
  id: number,
  online: boolean,
  event?: ChronicleEventElement[],
  compoundType?: EventCompoundType
}