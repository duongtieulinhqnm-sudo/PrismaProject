import { CrawlerService } from "./crawler-service.js";
import { MockCrawler } from "./mock-crawler.js";

const crawler = new MockCrawler();
const service = new CrawlerService(crawler);

const result = await service.run({
  platform: "TIKTOK",
  targetType: "USER",
  targetValue: "test-user",
  maxItems: 10,
});

console.log("Crawler test OK");
console.log(result);