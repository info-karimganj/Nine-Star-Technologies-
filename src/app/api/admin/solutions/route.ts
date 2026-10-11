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
    const solutions = db.solutions.getAll(true);
    return NextResponse.json({ solutions });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch solutions' }, { status: 500 });
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
      return NextResponse.json({ error: 'Solution title is required' }, { status: 400 });
    }

    const slug = body.slug || body.title.en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const existing = db.solutions.getById(slug);
    if (existing) {
      return NextResponse.json({ error: 'Solution with this slug already exists' }, { status: 400 });
    }

    const newSolution = {
      id: body.id || `sol-${Date.now()}`,
      slug,
      title: body.title,
      description: body.description || { en: '' },
      industry: body.industry || { en: 'General' },
      challenges: body.challenges || [],
      solutions: body.solutions || [],
      results: body.results || [],
      relatedServiceIds: body.relatedServiceIds || [],
      isActive: body.isActive ?? true,
      order: body.order || 0
    };

    const saved = db.solutions.create(newSolution as any);

    db.auditLogs.log({
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      action: 'CREATE',
      entity: 'solution',
      entityId: saved.id,
      details: `Created solution: ${saved.title.en} (${saved.slug})`
    });

    try {
      revalidatePath('/[lang]/solutions', 'page');
      revalidatePath('/[lang]', 'page');
    } catch (err) {}

    return NextResponse.json({ solution: saved });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create solution' }, { status: 500 });
  }
}
