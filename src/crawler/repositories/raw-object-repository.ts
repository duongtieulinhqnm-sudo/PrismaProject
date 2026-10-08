import type { NormalizedRawObject } from "../types/raw-object.js";

export interface RawObjectRepository {
  save(
    rawObject: NormalizedRawObject
  ): Promise<{ id: number }>;
}