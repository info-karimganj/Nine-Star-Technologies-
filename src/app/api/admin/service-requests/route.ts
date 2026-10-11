import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('9star_admin_token')?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const requests = db.serviceRequests.getAll();
    return NextResponse.json({ requests });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch service requests' }, { status: 500 });
  }
}

// Public Intake Endpoint: allow public customer submissions
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.customerName || !body.customerEmail || !body.projectGoal) {
      return NextResponse.json({ error: 'Name, email, and project goal are required' }, { status: 400 });
    }

    const refNumber = `9STAR-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;

    const newRequest = {
      id: `req-${Date.now()}`,
      referenceNumber: refNumber,
      serviceId: body.serviceId,
      serviceTitle: body.serviceTitle || 'General Service Request',
      customerName: body.customerName,
      customerEmail: body.customerEmail,
      customerPhone: body.customerPhone,
      country: body.country,
      projectBudget: body.projectBudget,
      projectTimeline: body.projectTimeline,
      projectGoal: body.projectGoal,
      projectDetails: body.projectDetails || '',
      technicalRequirements: body.technicalRequirements || [],
      attachedFiles: body.attachedFiles || [],
      status: 'NEW' as const,
      priority: 'MEDIUM' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const created = db.serviceRequests.create(newRequest);

    // Persist to Supabase if table is created, gracefully fallback if pending migration
    try {
      const { supabase } = await import('@/lib/supabase');
      await supabase.from('service_requests').insert({
        id: newRequest.id,
        reference_number: newRequest.referenceNumber,
        service_id: newRequest.serviceId,
        service_title: newRequest.serviceTitle,
        customer_name: newRequest.customerName,
        customer_email: newRequest.customerEmail,
        customer_phone: newRequest.customerPhone,
        country: newRequest.country,
        project_budget: newRequest.projectBudget,
        project_timeline: newRequest.projectTimeline,
        project_goal: newRequest.projectGoal,
        project_details: newRequest.projectDetails,
        technical_requirements: newRequest.technicalRequirements,
        attached_files: newRequest.attachedFiles,
        status: newRequest.status,
        priority: newRequest.priority,
      });
    } catch (sbErr) {
      console.warn('[Supabase Sync] Queued locally; Supabase error:', sbErr);
    }

    return NextResponse.json({
      success: true,
      referenceNumber: created.referenceNumber,
      message: 'Your request has been received. Our team will review and follow up shortly.'
    });
  } catch (error) {
    console.error('Request submission error:', error);
    return NextResponse.json({ error: 'Failed to submit service request' }, { status: 500 });
  }
}
