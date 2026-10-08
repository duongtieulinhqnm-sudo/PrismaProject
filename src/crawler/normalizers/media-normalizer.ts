import type { NormalizedMedia } from "../types/media.js";

export interface RawMedia {
  platformPostId: string;

  storageProvider: string;
  bucket: string;
  objectKey: string;

  mediaType?: string | null;
  mimeType?: string | null;

  fileSize?: bigint | number | null;
  width?: number | null;
  height?: number | null;
  duration?: number | null;

  sha256?: string | null;
}

function toBigInt(
  value: bigint | number | null | undefined
): bigint | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }

  return BigInt(value);
}

export function normalizeMedia(
  platform: "TIKTOK" | "INSTAGRAM",
  raw: RawMedia
): NormalizedMedia {
  return {
    platform,
    platformPostId: raw.platformPostId.trim(),

    storageProvider: raw.storageProvider.trim(),
    bucket: raw.bucket.trim(),
    objectKey: raw.objectKey.trim(),

    mediaType: raw.mediaType?.trim() || undefined,
    mimeType: raw.mimeType?.trim() || undefined,

    fileSize: toBigInt(raw.fileSize),

    width: raw.width ?? undefined,
    height: raw.height ?? undefined,
    duration: raw.duration ?? undefined,

    sha256: raw.sha256?.trim() || undefined,
  };
}