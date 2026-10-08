import type { NormalizedSocialAccount } from "./social-account.js";
import type { NormalizedSocialPost } from "./social-post.js";
import type { NormalizedSocialComment } from "./social-comment.js";
import type { NormalizedSocialPostMetric } from "./social-post-metric.js";
import type { NormalizedMedia } from "./media.js";
import type { NormalizedRawObject } from "./raw-object.js";

export interface CrawlerResult {
  accounts: NormalizedSocialAccount[];
  posts: NormalizedSocialPost[];
  comments: NormalizedSocialComment[];
  metrics: NormalizedSocialPostMetric[];
  media: NormalizedMedia[];
  rawObjects: NormalizedRawObject[];
}