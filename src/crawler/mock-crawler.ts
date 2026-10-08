import type { Crawler } from "./crawler.js";
import type { CrawlerInput } from "./types/crawler-input.js";
import type { CrawlerResult } from "./types/crawler-result.js";

export class MockCrawler implements Crawler {
  async crawl(
    input: CrawlerInput
  ): Promise<CrawlerResult> {
    return {
      accounts: [
        {
          platform: input.platform,
          platformUserId: "mock-user-001",
          username: "mock_user",
          displayName: "Mock User",
          bio: "Test crawler account",
          avatarUrl: undefined,
          isVerified: false,
        },
      ],

      posts: [
  {
    platform: input.platform,
    platformPostId: "mock-post-pipeline-001",
    accountPlatformUserId: "mock-user-001",
    postType: "VIDEO",
    caption: "Mock post for pipeline test",
    permalink: "https://example.com/mock-post-pipeline-001",
    publishedAt: new Date().toISOString(),
    duration: 30,
    language: "vi",
    thumbnailUrl: "https://example.com/mock-thumbnail.jpg",
    mediaUrl: "https://example.com/mock-video.mp4",
  },
],
      comments: [
  {
    platform: input.platform,
    platformCommentId: "mock-comment-pipeline-001",
    platformPostId: "mock-post-pipeline-001",
    parentCommentId: undefined,
    text: "Mock comment for pipeline test",
    likeCount: BigInt(10),
    replyCount: BigInt(2),
    publishedAt: new Date().toISOString(),
  },
],
      metrics: [
  {
    platform: input.platform,
    platformPostId: "mock-post-pipeline-001",
    views: BigInt(1000),
    likes: BigInt(100),
    comments: BigInt(10),
    shares: BigInt(20),
    favorites: BigInt(50),
    recordedAt: new Date().toISOString(),
  },
],
      media: [
  {
    platform: input.platform,
    platformPostId: "mock-post-pipeline-001",
    storageProvider: "SUPABASE",
    bucket: "social-media",
    objectKey: "tiktok/mock-post-pipeline-001/video.mp4",
    mediaType: "VIDEO",
    mimeType: "video/mp4",
    fileSize: BigInt(1024),
    width: 1080,
    height: 1920,
    duration: 30,
    sha256: "mock-sha256-pipeline-001",
  },
],
      rawObjects: [
  {
    platform: input.platform,
    objectType: "POST",
    sourceId: "mock-post-pipeline-001",
    bucket: "social-media",
    objectKey: "raw/tiktok/mock-post-pipeline-001.json",
    contentType: "application/json",
    fileSize: BigInt(2048),
    sha256: "mock-raw-sha256-pipeline-001",
    fetchedAt: new Date().toISOString(),
  },
],
    };
  }
}