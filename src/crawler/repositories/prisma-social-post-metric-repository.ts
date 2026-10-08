import { db } from "../../prisma/db.js";
import type { NormalizedSocialPostMetric } from "../types/social-post-metric.js";
import type { SocialPostMetricRepository } from "./social-post-metric-repository.js";

export class PrismaSocialPostMetricRepository
  implements SocialPostMetricRepository
{
  async save(
    metric: NormalizedSocialPostMetric
  ): Promise<{ id: number }> {
    const post = await db.orm.public.SocialPost
      .where({
        platform: metric.platform,
        platformPostId: metric.platformPostId,
      })
      .first();

    if (!post) {
      throw new Error(
        `SocialPost not found: ${metric.platform}:${metric.platformPostId}`
      );
    }

    const result = await db.orm.public.SocialPostMetric.create({
      postId: post.id,
      views: metric.views,
      likes: metric.likes,
      comments: metric.comments,
      shares: metric.shares,
      favorites: metric.favorites,
      recordedAt: metric.recordedAt,
    });

    return {
      id: result.id,
    };
  }
}