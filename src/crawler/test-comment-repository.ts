import { PrismaSocialCommentRepository } from "./repositories/prisma-social-comment-repository.js";

const commentRepository =
  new PrismaSocialCommentRepository();

const saved = await commentRepository.save({
  platform: "TIKTOK",
  platformCommentId: "mock-comment-001",

  platformPostId: "mock-post-001",

  parentCommentId: undefined,

  text: "Mock comment for repository test",

  likeCount: 10n,
  replyCount: 2n,

  publishedAt: new Date().toISOString(),
});

console.log("Comment saved:", saved);