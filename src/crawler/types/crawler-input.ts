import type { SocialPlatform } from "./social-account.js";

export interface CrawlerInput {
  platform: SocialPlatform;

  targetType: "USER" | "POST" | "HASHTAG";

  targetValue: string;

  maxItems?: number;
}