export type SocialPlatform = "TIKTOK" | "INSTAGRAM";

export interface NormalizedSocialAccount {
  platform: SocialPlatform;
  platformUserId: string;

  username?: string;
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  isVerified: boolean;
}