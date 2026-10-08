import type { NormalizedSocialAccount } from "../types/social-account.js";

export interface SocialAccountRepository {
  save(
    account: NormalizedSocialAccount
  ): Promise<{ id: number }>;
}
