import type { NormalizedSocialPost } from "../types/social-post.js";

export interface RawSocialPost {
  platformPostId: string;

  accountPlatformUserId: string;

  postType?: string | null;
  caption?: string | null;
  permalink?: string | null;

  publishedAt?: string | null;

  duration?: number | null;
  language?: string | null;

  thumbnailUrl?: string | null;
  mediaUrl?: string | null;
}

export function normalizeSocialPost(
  platform: "TIKTOK" | "INSTAGRAM",
  raw: RawSocialPost
): NormalizedSocialPost {
  return {
    platform,
    platformPostId: raw.platformPostId.trim(),

    accountPlatformUserId:
      raw.accountPlatformUserId.trim(),

    postType: raw.postType?.trim() || undefined,
    caption: raw.caption?.trim() || undefined,
    permalink: raw.permalink?.trim() || undefined,

    publishedAt: raw.publishedAt || undefined,

    duration: raw.duration ?? undefined,
    language: raw.language?.trim() || undefined,

    thumbnailUrl:
      raw.thumbnailUrl?.trim() || undefined,

    mediaUrl:
      raw.mediaUrl?.trim() || undefined,
  };
}