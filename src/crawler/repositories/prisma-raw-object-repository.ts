import { db } from "../../prisma/db.js";
import type { NormalizedRawObject } from "../types/raw-object.js";
import type { RawObjectRepository } from "./raw-object-repository.js";

export class PrismaRawObjectRepository
  implements RawObjectRepository
{
  async save(
    rawObject: NormalizedRawObject
  ): Promise<{ id: number }> {
    const result = await db.orm.public.RawObject.create({
      platform: rawObject.platform,
      objectType: rawObject.objectType,
      sourceId: rawObject.sourceId,
      bucket: rawObject.bucket,
      objectKey: rawObject.objectKey,
      contentType: rawObject.contentType,
      fileSize: rawObject.fileSize,
      sha256: rawObject.sha256,
      fetchedAt: rawObject.fetchedAt,
    });

    return {
      id: result.id,
    };
  }
}