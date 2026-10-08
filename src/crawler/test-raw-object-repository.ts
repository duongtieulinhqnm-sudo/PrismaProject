import { PrismaRawObjectRepository } from "./repositories/prisma-raw-object-repository.js";

const rawObjectRepository =
  new PrismaRawObjectRepository();

const saved = await rawObjectRepository.save({
  platform: "TIKTOK",

  objectType: "POST_JSON",
  sourceId: "mock-post-001",

  bucket: "social-media",
  objectKey: "tiktok/raw/mock-post-001.json",

  contentType: "application/json",
  fileSize: 2048n,

  sha256: "mock-raw-sha256-001",

  fetchedAt: new Date().toISOString(),
});

console.log("Raw object saved:", saved);