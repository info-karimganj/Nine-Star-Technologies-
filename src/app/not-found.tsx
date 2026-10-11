import Link from 'next/link';
import { Typography } from '@/components/ui/Typography';
import { Button } from '@/components/ui/Button';

export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="min-h-screen flex items-center justify-center bg-[#070e17] text-white font-sans p-6">
        <div className="text-center max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto rounded-full bg-white/10 flex items-center justify-center text-[#d4af37] font-bold text-2xl mb-6 border border-white/10">
            404
          </div>
          <Typography variant="h1" className="text-2xl font-bold mb-3 text-white">
            Page Not Found
          </Typography>
          <Typography variant="body" className="text-slate-400 text-sm mb-8 leading-relaxed">
            The link you followed could not be found or has moved.
          </Typography>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Link href="/en" className="btn btn-primary px-6 py-2.5 text-sm font-semibold rounded-lg bg-[#d4af37] text-[#070e17]">
              Return to Homepage
            </Link>
            <Link href="/en/contact" className="btn btn-outline px-6 py-2.5 text-sm font-semibold rounded-lg border border-white/20 text-white">
              Contact Support
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
