import { db } from "./prisma/db.js";

const START_USER = 3415;
const TOTAL_USERS = 10000;
const BATCH_SIZE = 500;

console.time("Seed users");

for (let start = START_USER; start <= TOTAL_USERS; start += BATCH_SIZE) {
  const end = Math.min(start + BATCH_SIZE - 1, TOTAL_USERS);

  const users = [];

  for (let i = start; i <= end; i++) {
    users.push({
      email: `user${i}@example.com`,
      username: `user${i}`,
      name: `User ${i}`,
    });
  }

  const inserted = await db.orm.public.User.createAndCount(users);

  console.log(`Batch ${start}-${end}: inserted ${inserted}`);
}

console.timeEnd("Seed users");