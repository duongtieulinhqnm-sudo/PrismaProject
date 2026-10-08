import type { SocialPlatform } from "./social-account.js";

export interface NormalizedSocialComment {
  platform: SocialPlatform;
  platformCommentId: string;

  platformPostId: string;

  parentCommentId?: string;

  text?: string;

  likeCount?: bigint;
  replyCount?: bigint;

  publishedAt?: string;
}