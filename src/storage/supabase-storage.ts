import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl) {
  throw new Error("Missing SUPABASE_URL in .env");
}

if (!supabaseSecretKey) {
  throw new Error("Missing SUPABASE_SECRET_KEY in .env");
}

export const BUCKET_NAME = "social-media";

export const supabase = createClient(
  supabaseUrl,
  supabaseSecretKey
);

/**
 * Upload file lên Supabase Storage
 */
export async function uploadMedia(
  fileBuffer: Buffer,
  objectKey: string,
  contentType: string
) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(objectKey, fileBuffer, {
      contentType,
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error(`Storage upload failed: ${error.message}`);
  }

  return data;
}

/**
 * Lấy public URL của file
 */
export function getPublicUrl(objectKey: string): string {
  const { data } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(objectKey);

  return data.publicUrl;
}

/**
 * Xóa file khỏi Supabase Storage
 */
export async function deleteMedia(objectKey: string) {
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([objectKey]);

  if (error) {
    throw new Error(`Storage delete failed: ${error.message}`);
  }
}