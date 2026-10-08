import type { SocialPlatform } from "./social-account.js";

export interface NormalizedSocialPostMetric {
  platform: SocialPlatform;
  platformPostId: string;

  views?: bigint;
  likes?: bigint;
  comments?: bigint;
  shares?: bigint;
  favorites?: bigint;

  recordedAt?: string;
}