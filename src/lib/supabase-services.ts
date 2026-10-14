import { Service } from '@/types/cms';
import { getSupabaseServerClient } from './supabase';

export function mapRowToService(row: any): Service {
  const parseJson = (val: any, fallback: any) => {
    if (!val) return fallback;
    if (typeof val === 'string') {
      try {
        return JSON.parse(val);
      } catch {
        return fallback;
      }
    }
    return val;
  };

  return {
    id: row.id,
    slug: row.slug || row.id,
    categoryId: row.category_id || 'web-development',
    title: parseJson(row.title, { en: row.id }),
    shortDescription: parseJson(row.short_description, { en: '' }),
    problemSolved: parseJson(row.problem_solved, { en: '' }),
    whoIsThisFor: parseJson(row.who_is_this_for, []),
    whatYouGet: parseJson(row.what_you_get, []),
    whatsIncluded: parseJson(row.whats_included, []),
    whatsNotIncluded: parseJson(row.whats_not_included, []),
    requirements: parseJson(row.requirements, []),
    process: parseJson(row.process, []),
    estimatedDeliveryTime: parseJson(row.estimated_delivery_time, { en: '' }),
    pricing: parseJson(row.pricing, { type: 'STARTING_FROM', amount: 0, currency: '$' }),
    faqs: parseJson(row.faqs, []),
    relatedServiceIds: parseJson(row.related_service_ids, []),
    supportInformation: parseJson(row.support_information, { en: '' }),
    isActive: row.is_active ?? true,
    isPopular: row.is_popular ?? false,
    isRecommended: row.is_recommended ?? false,
    seoMetadata: parseJson(row.seo_metadata, undefined),
    createdAt: row.created_at || new Date().toISOString(),
    updatedAt: row.updated_at || new Date().toISOString(),
  };
}

export function mapServiceToRow(s: Partial<Service>) {
  const row: Record<string, any> = {
    updated_at: new Date().toISOString(),
  };

  if (s.id !== undefined) row.id = s.id;
  if (s.slug !== undefined) row.slug = s.slug;
  if (s.categoryId !== undefined) row.category_id = s.categoryId;
  if (s.title !== undefined) row.title = s.title;
  if (s.shortDescription !== undefined) row.short_description = s.shortDescription;
  if (s.problemSolved !== undefined) row.problem_solved = s.problemSolved;
  if (s.whoIsThisFor !== undefined) row.who_is_this_for = s.whoIsThisFor;
  if (s.whatYouGet !== undefined) row.what_you_get = s.whatYouGet;
  if (s.whatsIncluded !== undefined) row.whats_included = s.whatsIncluded;
  if (s.whatsNotIncluded !== undefined) row.whats_not_included = s.whatsNotIncluded;
  if (s.requirements !== undefined) row.requirements = s.requirements;
  if (s.process !== undefined) row.process = s.process;
  if (s.estimatedDeliveryTime !== undefined) row.estimated_delivery_time = s.estimatedDeliveryTime;
  if (s.pricing !== undefined) row.pricing = s.pricing;
  if (s.faqs !== undefined) row.faqs = s.faqs;
  if (s.relatedServiceIds !== undefined) row.related_service_ids = s.relatedServiceIds;
  if (s.supportInformation !== undefined) row.support_information = s.supportInformation;
  if (s.isActive !== undefined) row.is_active = s.isActive;
  if (s.isPopular !== undefined) row.is_popular = s.isPopular;
  if (s.isRecommended !== undefined) row.is_recommended = s.isRecommended;
  if (s.createdAt !== undefined) row.created_at = s.createdAt;

  return row;
}

/**
 * Fetch all services from Supabase cloud database
 */
export async function getSupabaseServices(includeInactive = false): Promise<Service[]> {
  try {
    const supabase = getSupabaseServerClient();
    let query = supabase.from('services').select('*').order('created_at', { ascending: false });
    
    if (!includeInactive) {
      query = query.eq('is_active', true);
    }

    const { data, error } = await query;
    if (error) {
      console.warn('[Supabase Services fetch error]:', error.message);
      return [];
    }

    if (!data || data.length === 0) return [];

    return data.map(mapRowToService);
  } catch (err) {
    console.warn('[Supabase Services fetch exception]:', err);
    return [];
  }
}

/**
 * Fetch a single service by slug or id from Supabase
 */
export async function getSupabaseServiceByIdOrSlug(idOrSlug: string): Promise<Service | null> {
  try {
    const supabase = getSupabaseServerClient();
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .or(`id.eq.${idOrSlug},slug.eq.${idOrSlug}`)
      .maybeSingle();

    if (error || !data) return null;
    return mapRowToService(data);
  } catch {
    return null;
  }
}

/**
 * Save or update a service in Supabase
 */
export async function upsertSupabaseService(service: Service): Promise<boolean> {
  try {
    const supabase = getSupabaseServerClient();
    const row = mapServiceToRow(service);
    
    const { error } = await supabase
      .from('services')
      .upsert(row, { onConflict: 'id' });

    if (error) {
      console.error('[Supabase Service upsert error]:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[Supabase Service upsert exception]:', err);
    return false;
  }
}

/**
 * Delete a service from Supabase
 */
export async function deleteSupabaseService(id: string): Promise<boolean> {
  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) {
      console.error('[Supabase Service delete error]:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[Supabase Service delete exception]:', err);
    return false;
  }
}
