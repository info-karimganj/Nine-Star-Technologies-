import { Metadata } from 'next';
import { Typography } from '@/components/ui/Typography';
import { Card } from '@/components/ui/Card';
import { ContactForm } from '@/components/contact/ContactForm';
import { getDictionary } from '@/i18n/getDictionary';
import { Locale } from '@/i18n/config';

export async function generateMetadata(props: { params: Promise<{ lang: Locale }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  
  return {
    title: `${dict.navigation.contact} | 9STAR Technologies`,
    description: dict.contact.hero.subtitle,
  };
}

export default async function ContactPage(props: { params: Promise<{ lang: Locale }> }) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  
  return (
    <main className="w-full">
      {/* Hero */}
      <section className="bg-[var(--color-primary)] text-[var(--color-base)] pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <Typography variant="h1" className="text-[var(--color-base)] mb-6">{dict.contact.hero.title}</Typography>
          <Typography variant="body" className="text-[var(--color-text-muted)] text-xl max-w-2xl">
            {dict.contact.hero.subtitle}
          </Typography>
        </div>
      </section>

      <section className="py-20 bg-[var(--color-surface)]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <div>
              <Typography variant="h2" className="mb-8">{dict.contact.form.title}</Typography>
              <ContactForm dict={dict} />
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <Typography variant="h2" className="mb-8">{dict.contact.info.title}</Typography>
              
              <Card className="p-6 bg-[var(--color-surface)] border-[var(--color-border)] flex items-start">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] opacity-10 text-[var(--color-primary)] flex items-center justify-center mr-4 shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <Typography variant="small" className="text-[var(--color-text)] opacity-50 uppercase tracking-wider font-bold mb-1">{dict.contact.info.email}</Typography>
                  <Typography variant="body" className="font-medium">contact@9startechnologies.com</Typography>
                </div>
              </Card>

              <Card className="p-6 bg-[var(--color-surface)] border-[var(--color-border)] flex items-start">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] opacity-10 text-[var(--color-primary)] flex items-center justify-center mr-4 shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <Typography variant="small" className="text-[var(--color-text)] opacity-50 uppercase tracking-wider font-bold mb-1">{dict.contact.info.phone}</Typography>
                  <Typography variant="body" className="font-medium">+1 (800) 555-0199</Typography>
                </div>
              </Card>

              <Card className="p-6 bg-[var(--color-surface)] border-[var(--color-border)] flex items-start">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] opacity-10 text-[var(--color-primary)] flex items-center justify-center mr-4 shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <Typography variant="small" className="text-[var(--color-text)] opacity-50 uppercase tracking-wider font-bold mb-1">{dict.contact.info.office}</Typography>
                  <Typography variant="body" className="font-medium">123 Innovation Drive, Tech District<br/>San Francisco, CA 94105</Typography>
                </div>
              </Card>

              <Card className="p-6 bg-[var(--color-surface)] border-[var(--color-border)] flex items-start">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] opacity-10 text-[var(--color-primary)] flex items-center justify-center mr-4 shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <Typography variant="small" className="text-[var(--color-text)] opacity-50 uppercase tracking-wider font-bold mb-1">{dict.contact.info.hours}</Typography>
                  <Typography variant="body" className="font-medium">Mon - Fri: 9:00 AM - 6:00 PM<br/>Pacific Time (PT)</Typography>
                </div>
              </Card>

            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
