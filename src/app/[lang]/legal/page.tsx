import { Metadata } from 'next';
import Link from 'next/link';
import { getAllLegalDocuments } from '@/lib/legal';
import { Locale } from '@/i18n/config';
import { CookieSettingsButton } from '@/components/layout/CookieSettingsButton';

export async function generateMetadata(props: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const isBn = lang === 'bn';
  const isAr = lang === 'ar';

  return {
    title: isBn 
      ? 'আইনি ও নীতিমালা কেন্দ্র (Legal Center) | 9STAR Technologies'
      : isAr 
      ? 'المركز القانوني وسياسات الخصوصية | 9STAR Technologies'
      : 'Legal & Privacy Compliance Center | 9STAR Technologies',
    description: isBn
      ? '৯স্টার টেকনোলজিসের প্রাতিষ্ঠানিক নীতিমালা, গোপনীয়তা সুরক্ষা, পরিষেবার শর্তাবলী এবং আন্তর্জাতিক কমপ্লায়েন্স সংক্রান্ত নথি।'
      : isAr
      ? 'الوثائق القانونية الرسمية وسياسات حماية البيانات والشروط والأحكام لشركة ناين ستار للتقنية.'
      : 'Official legal governance policies, data protection notices, user rights, and commercial operational terms for 9STAR Technologies.',
  };
}

export default async function LegalCenterIndexPage(props: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await props.params;
  const docs = getAllLegalDocuments();

  const isBn = lang === 'bn';
  const isAr = lang === 'ar';

  return (
    <main className="w-full min-h-screen bg-[#fafafa] dark:bg-[#070e17]">
      {/* 1. Hero Section */}
      <section className="bg-[#0a192f] text-white pt-24 pb-16 md:pt-32 md:pb-24 border-b border-[#1e293b] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#d4af37] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#d4af37] inline-block" />
            <span>{isBn ? 'আন্তর্জাতিক আইনি ও কমপ্লায়েন্স ফ্রেমওয়ার্ক' : isAr ? 'إطار الامتثال القانوني الدولي' : 'International Legal & Privacy Governance'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            {isBn ? '৯স্টার আইনি ও নীতিমালা কেন্দ্র' : isAr ? 'مركز الحوكمة والسياسات القانونية' : 'Legal & Trust Center'}
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
            {isBn
              ? 'আমাদের গ্রাহক, অংশীদার এবং ওয়েব ব্যবহারকারীদের অধিকার, তথ্যের নিরাপত্তা এবং স্বচ্ছ ডিজিটাল নীতিমালার পূর্ণ বিবরণ।'
              : isAr
              ? 'دليلك الشامل لسياسات الخصوصية، حماية البيانات، شروط تقديم الخدمات والامتثال التقني الدولي.'
              : 'Our commitment to data privacy, cybersecurity transparency, fair commercial terms, and accessible technical operations.'}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-white/10">
            <div>
              <span className="text-slate-500 uppercase font-mono text-[10px] block">Governance Version</span>
              <span className="text-white font-medium">Release 2026.1</span>
            </div>
            <div className="hidden sm:block h-6 w-px bg-white/10" />
            <div>
              <span className="text-slate-500 uppercase font-mono text-[10px] block">Verification Status</span>
              <span className="text-emerald-400 font-medium">Active & Audited</span>
            </div>
            <div className="hidden sm:block h-6 w-px bg-white/10" />
            <div>
              <span className="text-slate-500 uppercase font-mono text-[10px] block">Privacy Inquiries</span>
              <a href="mailto:privacy@9startechnologies.com" className="text-[#d4af37] font-medium hover:underline">
                privacy@9startechnologies.com
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Primary Legal Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {isBn ? 'কার্যকরী আইনি নীতিমালা ও বিজ্ঞপ্তি' : isAr ? 'السياسات والإشعارات القانونية المعتمدة' : 'Official Policies & Legal Notices'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {isBn 
                  ? 'প্রতিটি পলিসির পূর্ণ বিবরণ এবং ধারা পড়তে নিচের কার্ডগুলোতে ক্লিক করুন।'
                  : 'Select any policy to review complete contractual clauses, technical specifics, and user rights.'}
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs font-mono text-slate-500">{docs.length} Active Documents</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {docs.map((doc) => {
              const title = (doc.title as any)[lang] || doc.title.en;
              const summary = (doc.summary as any)[lang] || doc.summary.en;

              return (
                <Link
                  key={doc.slug}
                  href={`/${lang}/legal/${doc.slug}`}
                  className="group p-6 rounded-2xl bg-white dark:bg-[#0b1523] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-[#d4af37]/60 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20">
                        v{doc.version}
                      </span>
                      <span className="text-xs text-slate-400 group-hover:text-[#d4af37] transition-colors">
                        Updated {doc.lastUpdated}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-[#d4af37] transition-colors mb-2">
                      {title}
                    </h3>
                    
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed mb-4">
                      {summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-[#d4af37]">
                    <span>{isBn ? 'সম্পূর্ণ পলিসি পড়ুন' : isAr ? 'عرض الوثيقة بالكامل' : 'Read Full Policy'}</span>
                    <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* 3. Privacy Quick Controls Callout */}
          <div className="mt-16 p-8 rounded-3xl bg-[#0a192f] text-white border border-[#1e293b] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d4af37]">
                <span>⚡</span>
                <span>{isBn ? 'তাৎক্ষণিক গোপনীয়তা নিয়ন্ত্রণ' : isAr ? 'التحكم الفوري بالخصوصية' : 'Immediate Privacy Controls'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {isBn ? 'আপনার কুকি সম্মতি ও ট্র্যাকিং পছন্দ পরিবর্তন করতে চান?' : 'Need to update your Cookie & Tracking Choices?'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {isBn
                  ? 'আপনি যেকোনো সময় আমাদের ইন্টারেক্টিভ প্রেফারেন্স সেন্টার খুলে ইচ্ছানুযায়ী পছন্দ পরিবর্তন অথবা প্রত্যাহার করতে পারেন।'
                  : 'You can audit, customize, or immediately withdraw your consent for non-essential cookies and analytics at any time.'}
              </p>
            </div>
            <div className="shrink-0">
              <div className="px-5 py-3 rounded-xl bg-[#d4af37] hover:bg-[#e0be48] text-[#070e17] font-bold text-sm shadow-lg transition-colors cursor-pointer text-center">
                <CookieSettingsButton label={isBn ? 'কুকি প্রেফারেন্স সেন্টার খুলুন' : isAr ? 'فتح مركز تفضيلات ملفات تعريف الارتباط' : 'Open Cookie Preference Center'} />
              </div>
            </div>
          </div>

          {/* 4. Responsible Disclosure & Transparency Box */}
          <div className="mt-8 p-6 rounded-2xl bg-white dark:bg-[#0b1523] border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
              {isBn ? 'আন্তর্জাতিক আইনি ও কমপ্লায়েন্স সংক্রান্ত নোটিশ' : 'Regulatory & Professional Counsel Notice'}
            </h4>
            <p className="leading-relaxed">
              {isBn
                ? '৯স্টার টেকনোলজিস আন্তর্জাতিকভাবে স্বীকৃত নীতি (GDPR, ePrivacy, CCPA/CPRA) অনুসারে সাইবার নিরাপত্তা এবং তথ্যের স্বচ্ছতা নিশ্চিত করে। তবে বিভিন্ন দেশের অধিক্ষেত্রের স্থানীয় বাণিজ্যিক ও কর্পোরেট প্রয়োজনীয়তার প্রেক্ষিতে এই নীতিসমূহ পরিবর্তন সাপেক্ষ।'
                : '9STAR Technologies provides these policies grounded in international benchmarks (including EU GDPR, ePrivacy, UK PECR, and California standards). Certain regulatory formalities and registered corporate particulars remain subject to final verification by qualified legal counsel.'}
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}
