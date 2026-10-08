import { db } from "../prisma/db.js";

const media = await db.orm.public.Media
  .where({
    storageProvider: "SUPABASE",
    bucket: "social-media",
    objectKey: "tiktok/mock-post-pipeline-001/video.mp4",
  })
  .first();

console.log("Media from database:");
console.log(media);