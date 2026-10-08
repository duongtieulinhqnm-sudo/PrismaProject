import type { NormalizedMedia } from "../types/media.js";

export interface MediaRepository {
  save(
    media: NormalizedMedia
  ): Promise<{ id: number }>;
}