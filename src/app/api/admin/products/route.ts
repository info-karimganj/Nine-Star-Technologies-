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
    const products = db.products.getAll(true);
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
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
      return NextResponse.json({ error: 'Product title is required' }, { status: 400 });
    }

    const slug = body.slug || body.title.en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const existing = db.products.getById(slug);
    if (existing) {
      return NextResponse.json({ error: 'Product with this slug already exists' }, { status: 400 });
    }

    const newProduct = {
      id: body.id || `prod-${Date.now()}`,
      slug,
      title: body.title,
      description: body.description || { en: '' },
      features: body.features || [],
      isActive: body.isActive ?? true,
      pricing: body.pricing,
      relatedServiceId: body.relatedServiceId,
      demoUrl: body.demoUrl,
      order: body.order || 0
    };

    const saved = db.products.create(newProduct as any);

    db.auditLogs.log({
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      action: 'CREATE',
      entity: 'product',
      entityId: saved.id,
      details: `Created product: ${saved.title.en} (${saved.slug})`
    });

    try {
      revalidatePath('/[lang]/products', 'page');
      revalidatePath('/[lang]', 'page');
    } catch (err) {}

    return NextResponse.json({ product: saved });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
