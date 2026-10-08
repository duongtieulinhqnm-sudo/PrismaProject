import type { NormalizedSocialAccount } from "../types/social-account.js";

export interface RawSocialAccount {
  platformUserId: string;

  username?: string | null;
  displayName?: string | null;
  bio?: string | null;
  avatarUrl?: string | null;
  isVerified?: boolean | null;
}

export function normalizeSocialAccount(
  platform: "TIKTOK" | "INSTAGRAM",
  raw: RawSocialAccount
): NormalizedSocialAccount {
  return {
    platform,
    platformUserId: raw.platformUserId.trim(),

    username: raw.username?.trim() || undefined,
    displayName: raw.displayName?.trim() || undefined,
    bio: raw.bio?.trim() || undefined,
    avatarUrl: raw.avatarUrl?.trim() || undefined,

    isVerified: raw.isVerified === true,
  };
}