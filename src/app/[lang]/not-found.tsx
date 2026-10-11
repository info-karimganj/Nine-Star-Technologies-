import Link from 'next/link';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <main className="w-full min-h-[70vh] flex items-center justify-center bg-[var(--color-base)] py-20">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <div className="w-24 h-24 mx-auto bg-[var(--color-surface)] rounded-full flex items-center justify-center text-[var(--color-primary)] font-bold text-3xl mb-8 border border-[var(--color-border)] shadow-sm">
          404
        </div>
        <Typography variant="h1" className="mb-6">Page Not Found</Typography>
        <Typography variant="body" className="text-[var(--color-text-muted)] text-lg mb-10">
          The page you are looking for doesn't exist or has been moved. 
          Please double-check the URL or return to the homepage.
        </Typography>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto">Return Home</Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">Contact Support</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
