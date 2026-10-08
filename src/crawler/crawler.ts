import type { CrawlerInput } from "./types/crawler-input.js";
import type { CrawlerResult } from "./types/crawler-result.js";

export interface Crawler {
  crawl(input: CrawlerInput): Promise<CrawlerResult>;
}