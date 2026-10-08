import type { SocialPlatform } from "./social-account.js";

export interface NormalizedSocialPost {
  platform: SocialPlatform;
  platformPostId: string;

  accountPlatformUserId: string;

  postType?: string;
  caption?: string;
  permalink?: string;

  publishedAt?: string;

  duration?: number;
  language?: string;

  thumbnailUrl?: string;
  mediaUrl?: string;
}