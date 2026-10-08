import { PrismaSocialPostMetricRepository } from "./repositories/prisma-social-post-metric-repository.js";

const metricRepository =
  new PrismaSocialPostMetricRepository();

const saved = await metricRepository.save({
  platform: "TIKTOK",
  platformPostId: "mock-post-001",

  views: 1000n,
  likes: 100n,
  comments: 10n,
  shares: 20n,
  favorites: 50n,

  recordedAt: new Date().toISOString(),
});

console.log("Post metric saved:", saved);