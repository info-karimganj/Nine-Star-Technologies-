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
    const pages = db.pages.getAll();
    return NextResponse.json({ pages });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch pages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    if (!body.slug || !body.title?.en) {
      return NextResponse.json({ error: 'Slug and Title (English) are required' }, { status: 400 });
    }

    const existing = db.pages.getById(body.slug);
    if (existing) {
      return NextResponse.json({ error: 'A page with this slug already exists' }, { status: 400 });
    }

    const newPage = {
      id: body.id || `pg-${Date.now()}`,
      slug: body.slug,
      title: body.title,
      content: body.content || { en: '' },
      seoTitle: body.seoTitle,
      seoDescription: body.seoDescription,
      status: body.status || 'PUBLISHED',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const saved = db.pages.create(newPage as any);

    db.auditLogs.log({
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      action: 'CREATE',
      entity: 'page',
      entityId: saved.id,
      details: `Created page: ${saved.title.en} (${saved.slug})`
    });

    try {
      revalidatePath(`/[lang]/${saved.slug}`, 'page');
      revalidatePath('/[lang]', 'page');
    } catch (err) {}

    return NextResponse.json({ page: saved });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create page' }, { status: 500 });
  }
}
