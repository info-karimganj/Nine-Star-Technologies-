import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('9star_admin_token')?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function GET() {
  try {
    const posts = db.posts.getAll();
    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    if (!body.title?.en) {
      return NextResponse.json({ error: 'English Title is required' }, { status: 400 });
    }

    const slug = body.slug || body.title.en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    const newPost = {
      id: `post-${Date.now()}`,
      slug,
      title: body.title,
      excerpt: body.excerpt || { en: '' },
      content: body.content || { en: '' },
      authorId: user.userId,
      coverImage: body.coverImage || '',
      categoryIds: body.categoryIds || [],
      tags: body.tags || [],
      isPublished: body.isPublished ?? false,
      publishDate: body.isPublished ? new Date().toISOString() : '',
      seoMetadata: body.seoMetadata
    };

    const saved = db.posts.create(newPost as any);

    db.auditLogs.log({
      userId: user.userId,
      userName: user.name,
      userEmail: user.email,
      action: 'CREATE',
      entity: 'BLOG_POST',
      entityId: saved.id,
      details: `Created blog post: ${saved.title.en}`
    });

    revalidatePath('/[lang]/blog', 'page');
    return NextResponse.json({ success: true, post: saved });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
