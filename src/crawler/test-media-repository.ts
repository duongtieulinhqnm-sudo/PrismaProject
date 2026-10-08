import { PrismaMediaRepository } from "./repositories/prisma-media-repository.js";

const mediaRepository =
  new PrismaMediaRepository();

const saved = await mediaRepository.save({
  platform: "TIKTOK",
  platformPostId: "mock-post-001",

  storageProvider: "SUPABASE",
  bucket: "social-media",
  objectKey: "tiktok/mock-post-001/video.mp4",

  mediaType: "VIDEO",
  mimeType: "video/mp4",

  fileSize: 1024000n,
  width: 1080,
  height: 1920,
  duration: 30,

  sha256: "mock-sha256-001",
});

console.log("Media saved:", saved);