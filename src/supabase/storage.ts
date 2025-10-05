'use client';

import { v4 as uuidv4 } from 'uuid';
import { SupabaseClient } from './client';

export async function uploadPublicImage(
  supabase: SupabaseClient,
  params: { folder: string; baseId: string; file?: File }
): Promise<{ publicUrl: string | null; error: string | null }> {
  if (!params.file) return { publicUrl: null, error: null };

  const bucket = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'images';
  const fileExt = params.file.name.split('.').pop();
  const fileName = `${params.baseId}-${uuidv4()}.${fileExt}`;
  const path = `${params.folder}/${fileName}`;

  const { data: uploadRes, error: uploadErr } = await supabase.storage
    .from(bucket)
    .upload(path, params.file, { upsert: false });
  if (uploadErr) return { publicUrl: null, error: uploadErr.message };

  const { data: publicUrl } = supabase.storage.from(bucket).getPublicUrl(uploadRes.path);
  return { publicUrl: publicUrl.publicUrl, error: null };
}

