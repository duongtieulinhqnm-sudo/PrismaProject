import type { Crawler } from "./crawler.js";
import type { CrawlerInput } from "./types/crawler-input.js";
import type { CrawlerResult } from "./types/crawler-result.js";

export class CrawlerService {
  constructor(
    private readonly crawler: Crawler
  ) {}

  async run(
    input: CrawlerInput
  ): Promise<CrawlerResult> {
    return this.crawler.crawl(input);
  }
}