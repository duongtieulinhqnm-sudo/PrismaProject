import { db } from "../../prisma/db.js";
import type { NormalizedSocialPost } from "../types/social-post.js";
import type { SocialPostRepository } from "./social-post-repository.js";

export class PrismaSocialPostRepository
  implements SocialPostRepository
{
  async save(post: NormalizedSocialPost): Promise<{ id: number }> {
    const account = await db.orm.public.SocialAccount
      .where({
        platform: post.platform,
        platformUserId: post.accountPlatformUserId,
      })
      .first();

    if (!account) {
      throw new Error(
        `SocialAccount not found: ${post.platform}:${post.accountPlatformUserId}`
      );
    }

    const existing = await db.orm.public.SocialPost
      .where({
        platform: post.platform,
        platformPostId: post.platformPostId,
      })
      .first();

    if (existing) {
      const result = await db.orm.public.SocialPost
        .where({
          id: existing.id,
        })
        .update({
          accountId: account.id,
          postType: post.postType,
          caption: post.caption,
          permalink: post.permalink,
          publishedAt: post.publishedAt,
          duration: post.duration,
          language: post.language,
          thumbnailUrl: post.thumbnailUrl,
          mediaUrl: post.mediaUrl,
        });

      if (!result) {
        throw new Error(
          `Failed to update SocialPost: ${post.platform}:${post.platformPostId}`
        );
      }

      return {
        id: result.id,
      };
    }

    const result = await db.orm.public.SocialPost.create({
      platform: post.platform,
      platformPostId: post.platformPostId,
      accountId: account.id,
      postType: post.postType,
      caption: post.caption,
      permalink: post.permalink,
      publishedAt: post.publishedAt,
      duration: post.duration,
      language: post.language,
      thumbnailUrl: post.thumbnailUrl,
      mediaUrl: post.mediaUrl,
    });

    return {
      id: result.id,
    };
  }
}