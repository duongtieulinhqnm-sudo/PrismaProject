import { db } from "../../prisma/db.js";
import type { NormalizedMedia } from "../types/media.js";
import type { MediaRepository } from "./media-repository.js";

export class PrismaMediaRepository
  implements MediaRepository
{
  async save(
    media: NormalizedMedia
  ): Promise<{ id: number }> {
    const post = await db.orm.public.SocialPost
      .where({
        platform: media.platform,
        platformPostId: media.platformPostId,
      })
      .first();

    if (!post) {
      throw new Error(
        `SocialPost not found: ${media.platform}:${media.platformPostId}`
      );
    }

    const existing = await db.orm.public.Media
      .where({
        storageProvider: media.storageProvider,
        bucket: media.bucket,
        objectKey: media.objectKey,
      })
      .first();

    if (existing) {
      const result = await db.orm.public.Media
        .where({
          id: existing.id,
        })
        .update({
          postId: post.id,
          mediaType: media.mediaType,
          mimeType: media.mimeType,
          fileSize: media.fileSize,
          width: media.width,
          height: media.height,
          duration: media.duration,
          sha256: media.sha256,
        });

      if (!result) {
        throw new Error(
          `Failed to update Media: ${media.storageProvider}:${media.bucket}:${media.objectKey}`
        );
      }

      return {
        id: result.id,
      };
    }

    const result = await db.orm.public.Media.create({
      postId: post.id,
      storageProvider: media.storageProvider,
      bucket: media.bucket,
      objectKey: media.objectKey,
      mediaType: media.mediaType,
      mimeType: media.mimeType,
      fileSize: media.fileSize,
      width: media.width,
      height: media.height,
      duration: media.duration,
      sha256: media.sha256,
    });

    return {
      id: result.id,
    };
  }
}