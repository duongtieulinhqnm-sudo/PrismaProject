import type { SocialPlatform } from "./social-account.js";

export interface NormalizedRawObject {
  platform: SocialPlatform;

  objectType: string;
  sourceId?: string;

  bucket: string;
  objectKey: string;

  contentType?: string;
  fileSize?: bigint;
  sha256?: string;

  fetchedAt?: string;
}