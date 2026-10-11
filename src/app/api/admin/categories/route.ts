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
    const categories = db.categories.getAll();
    return NextResponse.json({ categories });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
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
      return NextResponse.json({ error: 'Category title (English) is required' }, { status: 400 });
    }

    const slug = body.slug || body.title.en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const existing = db.categories.getById(slug);
    if (existing) {
      return NextResponse.json({ error: 'Category with this slug already exists' }, { status: 400 });
    }

    const newCategory = {
      id: body.id || `cat-${Date.now()}`,
      slug,
      title: body.title,
      description: body.description || { en: '' },
      iconName: body.iconName || 'folder',
      order: body.order || 0
    };

    const saved = db.categories.create(newCategory as any);

    db.auditLogs.log({
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      action: 'CREATE',
      entity: 'category',
      entityId: saved.id,
      details: `Created category: ${saved.title.en} (${saved.slug})`
    });

    try {
      revalidatePath('/[lang]/services', 'page');
      revalidatePath('/[lang]', 'page');
    } catch (err) {}

    return NextResponse.json({ category: saved });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
