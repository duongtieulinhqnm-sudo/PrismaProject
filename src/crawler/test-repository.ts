import { MockCrawler } from "./mock-crawler.js";
import { CrawlerService } from "./crawler-service.js";
import { PrismaSocialAccountRepository } from "./repositories/prisma-social-account-repository.js";

const crawler = new MockCrawler();
const service = new CrawlerService(crawler);

const accountRepository =
  new PrismaSocialAccountRepository();

const result = await service.run({
  platform: "TIKTOK",
  targetType: "USER",
  targetValue: "test-user",
  maxItems: 10,
});

for (const account of result.accounts) {
  const saved = await accountRepository.save(account);

  console.log("Account saved:", saved);
}