import type { NormalizedRawObject } from "../types/raw-object.js";

export interface RawObjectInput {
  objectType: string;

  sourceId?: string | null;

  bucket: string;
  objectKey: string;

  contentType?: string | null;
  fileSize?: bigint | number | null;
  sha256?: string | null;

  fetchedAt?: string | null;
}

function toBigInt(
  value: bigint | number | null | undefined
): bigint | undefined {
  if (value === null || value === undefined) {
    return undefined;
  }

  return BigInt(value);
}

export function normalizeRawObject(
  platform: "TIKTOK" | "INSTAGRAM",
  raw: RawObjectInput
): NormalizedRawObject {
  return {
    platform,

    objectType: raw.objectType.trim(),
    sourceId: raw.sourceId?.trim() || undefined,

    bucket: raw.bucket.trim(),
    objectKey: raw.objectKey.trim(),

    contentType: raw.contentType?.trim() || undefined,
    fileSize: toBigInt(raw.fileSize),
    sha256: raw.sha256?.trim() || undefined,

    fetchedAt: raw.fetchedAt || undefined,
  };
}