import { db } from "../../prisma/db.js";
import type { NormalizedSocialAccount } from "../types/social-account.js";
import type { SocialAccountRepository } from "./social-account-repository.js";

export class PrismaSocialAccountRepository
  implements SocialAccountRepository
{
  async save(
    account: NormalizedSocialAccount
  ): Promise<{ id: number }> {
    const existing = await db.orm.public.SocialAccount
      .where({
        platform: account.platform,
        platformUserId: account.platformUserId,
      })
      .first();

    if (existing) {
      const result = await db.orm.public.SocialAccount
        .where({
          id: existing.id,
        })
        .update({
          username: account.username,
          displayName: account.displayName,
          bio: account.bio,
          avatarUrl: account.avatarUrl,
          isVerified: account.isVerified,
        });

      if (!result) {
        throw new Error(
          `Failed to update SocialAccount: ${account.platform}:${account.platformUserId}`
        );
      }

      return {
        id: result.id,
      };
    }

    const result = await db.orm.public.SocialAccount.create({
      platform: account.platform,
      platformUserId: account.platformUserId,
      username: account.username,
      displayName: account.displayName,
      bio: account.bio,
      avatarUrl: account.avatarUrl,
      isVerified: account.isVerified,
    });

    return {
      id: result.id,
    };
  }
}