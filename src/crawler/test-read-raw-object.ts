import { db } from "../prisma/db.js";

const rawObject = await db.orm.public.RawObject
  .where({
    platform: "TIKTOK",
    objectType: "POST_JSON",
    sourceId: "mock-post-001",
  })
  .first();

console.log("Raw object from database:");
console.log(rawObject);