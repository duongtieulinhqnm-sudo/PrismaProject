import { db } from "./prisma/db.js";

console.time("Insert 10,000 users");

for (let i = 1; i <= 10000; i++) {
  await db.orm.public.User.create({
    email: `user${i}@example.com`,
    username: `user${i}`,
    name: `User ${i}`,
  });
}

console.timeEnd("Insert 10,000 users");