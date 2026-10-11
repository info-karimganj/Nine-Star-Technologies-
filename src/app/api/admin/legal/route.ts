import { NextResponse } from 'next/server';
import { getAllLegalDocuments, saveLegalDocument } from '@/lib/legal';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('9star_admin_token')?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function GET() {
  try {
    const docs = getAllLegalDocuments();
    return NextResponse.json({ documents: docs });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch legal documents' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    if (!body.slug || !body.title?.en) {
      return NextResponse.json({ error: 'Slug and title are required' }, { status: 400 });
    }

    const updatedDoc = {
      ...body,
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    saveLegalDocument(updatedDoc);

    db.auditLogs.log({
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      action: 'UPDATE',
      entity: 'legal_policy',
      entityId: updatedDoc.slug,
      details: `Updated legal document ${updatedDoc.title.en} (v${updatedDoc.version})`
    });

    try {
      revalidatePath(`/[lang]/legal/${updatedDoc.slug}`, 'page');
      revalidatePath('/[lang]/legal', 'page');
    } catch (e) {}

    return NextResponse.json({ document: updatedDoc });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update legal document' }, { status: 500 });
  }
}
