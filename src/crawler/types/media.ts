import type { SocialPlatform } from "./social-account.js";

export interface NormalizedMedia {
  platform: SocialPlatform;
  platformPostId: string;

  storageProvider: string;
  bucket: string;
  objectKey: string;

  mediaType?: string;
  mimeType?: string;

  fileSize?: bigint;
  width?: number;
  height?: number;
  duration?: number;

  sha256?: string;
}