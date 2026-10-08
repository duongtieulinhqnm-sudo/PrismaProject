import type { NormalizedSocialComment } from "../types/social-comment.js";

export interface RawSocialComment {
  platformCommentId: string;

  platformPostId: string;

  parentCommentId?: string | null;

  text?: string | null;

  likeCount?: bigint | number | null;
  replyCount?: bigint | number | null;

  publishedAt?: string | null;
}

function toBigInt(
  value: bigint | number | null | undefined
): bigint | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }

  return BigInt(value);
}

export function normalizeSocialComment(
  platform: "TIKTOK" | "INSTAGRAM",
  raw: RawSocialComment
): NormalizedSocialComment {
  return {
    platform,
    platformCommentId: raw.platformCommentId.trim(),

    platformPostId: raw.platformPostId.trim(),

    parentCommentId:
      raw.parentCommentId?.trim() || undefined,

    text: raw.text?.trim() || undefined,

    likeCount: toBigInt(raw.likeCount),
    replyCount: toBigInt(raw.replyCount),

    publishedAt: raw.publishedAt || undefined,
  };
}