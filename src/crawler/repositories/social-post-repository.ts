import type { NormalizedSocialPost } from "../types/social-post.js";

export interface SocialPostRepository {
  save(
    post: NormalizedSocialPost
  ): Promise<{ id: number }>;
}