import type { NormalizedSocialPostMetric } from "../types/social-post-metric.js";

export interface SocialPostMetricRepository {
  save(
    metric: NormalizedSocialPostMetric
  ): Promise<{ id: number }>;
}