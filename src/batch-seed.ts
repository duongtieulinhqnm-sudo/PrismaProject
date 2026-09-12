import { db } from "./prisma/db.js";

const totalUsers = 1_000_000;
const batchSize = 1_000;

console.time("Batch insert 1,000,000 users");

for (let start = 20002; start <= 1_000_001; start += batchSize) {
  const end = Math.min(start + batchSize - 1, 1_000_001);

  const users = [];

  for (let i = start; i <= end; i++) {
    users.push({
      email: `millionuser${i}@example.com`,
      username: `millionuser${i}`,
      name: `Million User ${i}`,
    });
  }

  const plan = db.sql.public.user
    .insert(users)
    .build();

  await db.runtime().execute(plan);

  console.log(`Đã thêm đến user ${end}`);
}

console.timeEnd("Batch insert 1,000,000 users");