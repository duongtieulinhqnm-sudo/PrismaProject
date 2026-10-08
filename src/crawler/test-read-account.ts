import { db } from "../prisma/db.js";

const account = await db.orm.public.SocialAccount
  .where({
    platform: "TIKTOK",
    platformUserId: "mock-user-001",
  })
  .first();

console.log("Account from database:");
console.log(account);