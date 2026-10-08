import { db } from "../prisma/db.js";

const post = await db.orm.public.SocialPost
  .where({
    platform: "TIKTOK",
    platformPostId: "mock-post-pipeline-001",
  })
  .first();

console.log("Post from database:");
console.log(post);