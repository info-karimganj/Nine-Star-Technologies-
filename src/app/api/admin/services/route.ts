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

// GET all services
export async function GET() {
  try {
    const services = db.services.getAll();
    return NextResponse.json({ services });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

// POST create service
export async function POST(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    if (!body.title?.en || !body.categoryId) {
      return NextResponse.json({ error: 'Title (English) and Category are required' }, { status: 400 });
    }

    const slug = body.slug || body.title.en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const existing = db.services.getById(slug);
    if (existing) {
      return NextResponse.json({ error: 'A service with this slug or ID already exists' }, { status: 400 });
    }

    const newService = {
      id: body.id || `srv-${Date.now()}`,
      slug,
      categoryId: body.categoryId,
      title: body.title,
      shortDescription: body.shortDescription || { en: '' },
      problemSolved: body.problemSolved || { en: '' },
      whoIsThisFor: body.whoIsThisFor || [],
      whatYouGet: body.whatYouGet || [],
      whatsIncluded: body.whatsIncluded || [],
      whatsNotIncluded: body.whatsNotIncluded || [],
      requirements: body.requirements || [],
      process: body.process || [],
      estimatedDeliveryTime: body.estimatedDeliveryTime || { en: '' },
      pricing: body.pricing || { type: 'CUSTOM_QUOTE', packages: [], addons: [] },
      faqs: body.faqs || [],
      relatedServiceIds: body.relatedServiceIds || [],
      supportInformation: body.supportInformation || { en: '' },
      isActive: body.isActive ?? true,
      isPopular: body.isPopular ?? false,
      isRecommended: body.isRecommended ?? false,
      seoMetadata: body.seoMetadata,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const saved = db.services.create(newService as any);

    db.auditLogs.log({
      userId: user.userId,
      userName: user.name,
      userEmail: user.email,
      action: 'CREATE',
      entity: 'SERVICE',
      entityId: saved.id,
      details: `Created service: ${saved.title.en}`
    });

    // Revalidate public website service paths
    revalidatePath('/[lang]/services', 'page');
    revalidatePath(`/[lang]/services/${saved.slug}`, 'page');

    return NextResponse.json({ success: true, service: saved });
  } catch (error) {
    console.error('Service creation error:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}
