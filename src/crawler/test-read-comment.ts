import { db } from "../prisma/db.js";

const comment = await db.orm.public.SocialComment
  .where({
    platform: "TIKTOK",
    platformCommentId: "mock-comment-pipeline-001",
  })
  .first();

console.log("Comment from database:");
console.log(comment);