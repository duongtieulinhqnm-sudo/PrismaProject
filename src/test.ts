import { db } from "./prisma/db.js";

const user = await db.orm.public.User.create({
  email: "test@gmail.com",
  username: "testuser",
  name: "Test User",
});

console.log(user);