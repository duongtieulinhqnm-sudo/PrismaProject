import type { NormalizedSocialComment } from "../types/social-comment.js";

export interface SocialCommentRepository {
  save(
    comment: NormalizedSocialComment
  ): Promise<{ id: number }>;
}