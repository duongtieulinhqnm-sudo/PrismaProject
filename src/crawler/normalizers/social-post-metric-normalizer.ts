import type { NormalizedSocialPostMetric } from "../types/social-post-metric.js";

export interface RawSocialPostMetric {
  platformPostId: string;

  views?: bigint | number | null;
  likes?: bigint | number | null;
  comments?: bigint | number | null;
  shares?: bigint | number | null;
  favorites?: bigint | number | null;

  recordedAt?: string | null;
}

function toBigInt(
  value: bigint | number | null | undefined
): bigint | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }

  return BigInt(value);
}

export function normalizeSocialPostMetric(
  platform: "TIKTOK" | "INSTAGRAM",
  raw: RawSocialPostMetric
): NormalizedSocialPostMetric {
  return {
    platform,
    platformPostId: raw.platformPostId.trim(),

    views: toBigInt(raw.views),
    likes: toBigInt(raw.likes),
    comments: toBigInt(raw.comments),
    shares: toBigInt(raw.shares),
    favorites: toBigInt(raw.favorites),

    recordedAt: raw.recordedAt || undefined,
  };
}