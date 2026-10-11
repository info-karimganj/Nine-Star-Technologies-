import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('9star_admin_token')?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function GET() {
  try {
    const media = db.media.getAll();
    return NextResponse.json({ media });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch media' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const altText = (formData.get('altText') as string) || '';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size exceeds 10MB limit' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadsDir, { recursive: true });

    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${Date.now()}-${safeName}`;
    const filePath = path.join(uploadsDir, filename);

    await writeFile(filePath, buffer);

    let publicUrl = `/uploads/${filename}`;

    // Upload to Supabase Storage bucket 'public-media'
    try {
      const { supabase } = await import('@/lib/supabase');
      const { data: storageData, error: storageErr } = await supabase.storage
        .from('public-media')
        .upload(`media/${filename}`, buffer, {
          contentType: file.type || 'application/octet-stream',
          upsert: true
        });

      if (!storageErr && storageData?.path) {
        const { data: urlData } = supabase.storage.from('public-media').getPublicUrl(`media/${filename}`);
        if (urlData?.publicUrl) {
          publicUrl = urlData.publicUrl;
        }
      }
    } catch (sbStorageErr) {
      console.warn('[Supabase Storage] Fallback to local disk upload:', sbStorageErr);
    }

    const mediaItem = {
      id: `media-${Date.now()}`,
      filename: file.name,
      url: publicUrl,
      mimeType: file.type || 'application/octet-stream',
      sizeBytes: file.size,
      altText,
      uploadedBy: user.name || user.email,
      createdAt: new Date().toISOString()
    };

    const saved = db.media.create(mediaItem);

    db.auditLogs.log({
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      action: 'CREATE',
      entity: 'media',
      entityId: saved.id,
      details: `Uploaded media: ${file.name} (${(file.size / 1024).toFixed(1)} KB) -> ${publicUrl}`
    });

    return NextResponse.json({ media: saved });
  } catch (error) {
    console.error('Media upload error:', error);
    return NextResponse.json({ error: 'Failed to upload media' }, { status: 500 });
  }
}
