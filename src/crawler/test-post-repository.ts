import { PrismaSocialPostRepository } from "./repositories/prisma-social-post-repository.js";

const postRepository =
  new PrismaSocialPostRepository();

const saved = await postRepository.save({
  platform: "TIKTOK",
  platformPostId: "mock-post-001",
  accountPlatformUserId: "mock-user-001",

  postType: "VIDEO",
  caption: "Mock post for repository test",
  permalink: "https://www.tiktok.com/@mock_user/video/mock-post-001",

  publishedAt: new Date().toISOString(),

  duration: 30,
  language: "vi",

  thumbnailUrl: "https://example.com/mock-thumbnail.jpg",
  mediaUrl: "https://example.com/mock-video.mp4",
});

console.log("Post saved:", saved);