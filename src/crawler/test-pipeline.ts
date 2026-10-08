import { MockCrawler } from "./mock-crawler.js";
import { CrawlerPipeline } from "./crawler-pipeline.js";

import { PrismaSocialAccountRepository } from "./repositories/prisma-social-account-repository.js";
import { PrismaSocialPostRepository } from "./repositories/prisma-social-post-repository.js";
import { PrismaSocialCommentRepository } from "./repositories/prisma-social-comment-repository.js";
import { PrismaSocialPostMetricRepository } from "./repositories/prisma-social-post-metric-repository.js";
import { PrismaMediaRepository } from "./repositories/prisma-media-repository.js";
import { PrismaRawObjectRepository } from "./repositories/prisma-raw-object-repository.js";

const crawler = new MockCrawler();

const pipeline = new CrawlerPipeline(
  crawler,
  new PrismaSocialAccountRepository(),
  new PrismaSocialPostRepository(),
  new PrismaSocialCommentRepository(),
  new PrismaSocialPostMetricRepository(),
  new PrismaMediaRepository(),
  new PrismaRawObjectRepository(),
);

const result = await pipeline.run({
  platform: "TIKTOK",
  targetType: "USER",
  targetValue: "test-user",
  maxItems: 10,
});

console.log("Pipeline test OK");
console.log(result);