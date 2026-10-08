import { db } from "../prisma/db.js";

const metric = await db.orm.public.SocialPostMetric
  .where({
    postId: 1,
  })
  .first();

console.log("Post metric from database:");
console.log(metric);