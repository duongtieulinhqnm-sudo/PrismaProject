import type { Crawler } from "./crawler.js";
import type { CrawlerInput } from "./types/crawler-input.js";
import type { CrawlerResult } from "./types/crawler-result.js";

import type { SocialAccountRepository } from "./repositories/social-account-repository.js";
import type { SocialPostRepository } from "./repositories/social-post-repository.js";
import type { SocialCommentRepository } from "./repositories/social-comment-repository.js";
import type { SocialPostMetricRepository } from "./repositories/social-post-metric-repository.js";
import type { MediaRepository } from "./repositories/media-repository.js";
import type { RawObjectRepository } from "./repositories/raw-object-repository.js";

export class CrawlerPipeline {
  constructor(
    private readonly crawler: Crawler,
    private readonly accountRepository: SocialAccountRepository,
    private readonly postRepository: SocialPostRepository,
    private readonly commentRepository: SocialCommentRepository,
    private readonly metricRepository: SocialPostMetricRepository,
    private readonly mediaRepository: MediaRepository,
    private readonly rawObjectRepository: RawObjectRepository,
  ) {}

  async run(input: CrawlerInput): Promise<CrawlerResult> {
    const result = await this.crawler.crawl(input);

for (const account of result.accounts) {
  await this.accountRepository.save(account);
}

for (const post of result.posts) {
  await this.postRepository.save(post);
}

for (const comment of result.comments) {
  await this.commentRepository.save(comment);
}

for (const metric of result.metrics) {
  await this.metricRepository.save(metric);
}

for (const media of result.media) {
  await this.mediaRepository.save(media);
}

for (const rawObject of result.rawObjects) {
  await this.rawObjectRepository.save(rawObject);
}

return result;
  }
}