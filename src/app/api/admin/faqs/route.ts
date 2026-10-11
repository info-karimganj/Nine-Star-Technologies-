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
    const faqs = db.faqs.getAll();
    return NextResponse.json({ faqs });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch FAQs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    if (!body.question?.en || !body.answer?.en) {
      return NextResponse.json({ error: 'Question and Answer (English) are required' }, { status: 400 });
    }

    const newFAQ = {
      id: body.id || `faq-${Date.now()}`,
      question: body.question,
      answer: body.answer,
      category: body.category || 'General',
      relatedServiceId: body.relatedServiceId,
      order: body.order || 0
    };

    const saved = db.faqs.create(newFAQ as any);

    db.auditLogs.log({
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      action: 'CREATE',
      entity: 'faq',
      entityId: saved.id,
      details: `Created FAQ: ${saved.question.en.substring(0, 40)}...`
    });

    try {
      revalidatePath('/[lang]/faq', 'page');
      revalidatePath('/[lang]', 'page');
    } catch (err) {}

    return NextResponse.json({ faq: saved });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create FAQ' }, { status: 500 });
  }
}
