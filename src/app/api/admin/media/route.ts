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

    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${Date.now()}-${safeName}`;
    let publicUrl = '';

    // 1. Try Supabase Storage first (High-speed Cloud Storage CDN)
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qzxzttmrbeftlgujrldk.supabase.co';
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      const key = serviceKey || 
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
        'sb_publishable_DQ_bNbJ8tB8plWGrBbRngw_Y7HhXrwi';

      const supabaseClient = createClient(supabaseUrl, key);

      // If service role key is present, auto-create the public-media bucket if not existing
      if (serviceKey) {
        try {
          await supabaseClient.storage.createBucket('public-media', { public: true });
        } catch (_) {}
      }

      const { data: storageData, error: storageErr } = await supabaseClient.storage
        .from('public-media')
        .upload(`media/${filename}`, buffer, {
          contentType: file.type || 'application/octet-stream',
          upsert: true
        });

      if (!storageErr && storageData?.path) {
        const { data: urlData } = supabaseClient.storage.from('public-media').getPublicUrl(`media/${filename}`);
        if (urlData?.publicUrl) {
          publicUrl = urlData.publicUrl;
        }
      } else if (storageErr) {
        console.warn('[Supabase Storage]:', storageErr.message);
      }
    } catch (sbStorageErr) {
      console.warn('[Supabase Storage upload warning]:', sbStorageErr);
    }

    // 2. If not uploaded to Supabase Storage, try local disk (works in local dev environments)
    if (!publicUrl) {
      try {
        const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
        await mkdir(uploadsDir, { recursive: true });
        const filePath = path.join(uploadsDir, filename);
        await writeFile(filePath, buffer);
        publicUrl = `/uploads/${filename}`;
      } catch (localFsErr) {
        // Expected on read-only serverless platforms like Vercel Lambda
        console.warn('[Local disk upload skipped - read-only filesystem]:', localFsErr);
      }
    }

    // 3. Fallback for serverless environments (Vercel) when cloud bucket is not yet active:
    // Convert to Data URI so the image upload succeeds without breaking and renders cleanly everywhere!
    if (!publicUrl) {
      const mime = file.type || 'image/png';
      const base64Data = buffer.toString('base64');
      publicUrl = `data:${mime};base64,${base64Data}`;
    }

    const mediaItem = {
      id: `media-${Date.now()}`,
      filename: file.name,
      url: publicUrl,
      mimeType: file.type || 'application/octet-stream',
      sizeBytes: file.size,
      altText,
      uploadedBy: user.name || user.email || 'Admin',
      createdAt: new Date().toISOString()
    };

    const saved = db.media.create(mediaItem);

    db.auditLogs.log({
      userId: user.id || 'admin',
      userName: user.name || 'Admin',
      userEmail: user.email || 'admin@9star.com',
      action: 'CREATE',
      entity: 'media',
      entityId: saved.id,
      details: `Uploaded media: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`
    });

    return NextResponse.json({ media: saved });
  } catch (error: any) {
    console.error('Media upload error:', error);
    return NextResponse.json({ error: error?.message || 'Failed to upload media' }, { status: 500 });
  }
}
