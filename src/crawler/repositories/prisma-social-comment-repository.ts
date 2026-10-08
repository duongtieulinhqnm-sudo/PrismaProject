import { db } from "../../prisma/db.js";
import type { NormalizedSocialComment } from "../types/social-comment.js";
import type { SocialCommentRepository } from "./social-comment-repository.js";

export class PrismaSocialCommentRepository
  implements SocialCommentRepository
{
  async save(comment: NormalizedSocialComment): Promise<{ id: number }> {
    const post = await db.orm.public.SocialPost
      .where({
        platform: comment.platform,
        platformPostId: comment.platformPostId,
      })
      .first();

    if (!post) {
      throw new Error(
        `SocialPost not found: ${comment.platform}:${comment.platformPostId}`
      );
    }

    const existing = await db.orm.public.SocialComment
      .where({
        platform: comment.platform,
        platformCommentId: comment.platformCommentId,
      })
      .first();

    if (existing) {
      const result = await db.orm.public.SocialComment
        .where({
          id: existing.id,
        })
        .update({
          postId: post.id,
          parentCommentId: comment.parentCommentId,
          text: comment.text,
          likeCount: comment.likeCount,
          replyCount: comment.replyCount,
          publishedAt: comment.publishedAt,
        });

      if (!result) {
        throw new Error(
          `Failed to update SocialComment: ${comment.platform}:${comment.platformCommentId}`
        );
      }

      return {
        id: result.id,
      };
    }

    const result = await db.orm.public.SocialComment.create({
      platform: comment.platform,
      platformCommentId: comment.platformCommentId,
      postId: post.id,
      parentCommentId: comment.parentCommentId,
      text: comment.text,
      likeCount: comment.likeCount,
      replyCount: comment.replyCount,
      publishedAt: comment.publishedAt,
    });

    return {
      id: result.id,
    };
  }
}