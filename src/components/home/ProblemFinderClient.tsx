'use client';

import React from 'react';
import { Typography } from '@/components/ui/Typography';
import { trackEvent } from '@/lib/analytics';
import { useRouter } from 'next/navigation';

export function ProblemFinderClient({ problems, lang }: { problems: string[], lang: string }) {
  const router = useRouter();
  const [selectedProblem, setSelectedProblem] = React.useState<string | null>(null);

  // Intelligent mapping from problem statement to specific high-converting service or category
  const getTargetRoute = (problem: string): { route: string; label: string } => {
    const p = problem.toLowerCase();
    if (p.includes('website')) return { route: `/${lang}/services/web-1`, label: 'Corporate & Web Platforms' };
    if (p.includes('app')) return { route: `/${lang}/services/web-3`, label: 'Web & Mobile Applications' };
    if (p.includes('document')) return { route: `/${lang}/services/doc-1`, label: 'Document & Online Processing' };
    if (p.includes('automate') || p.includes('business')) return { route: `/${lang}/services/biz-2`, label: 'Business Process Automation' };
    if (p.includes('digital solution')) return { route: `/${lang}/solutions`, label: 'Tailored Enterprise Solutions' };
    return { route: `/${lang}/services`, label: 'Explore All Services' };
  };

  const handleProblemClick = (problem: string) => {
    setSelectedProblem(problem);
    trackEvent('problem_finder_selected', { problem });
    const target = getTargetRoute(problem);
    setTimeout(() => {
      router.push(target.route);
    }, 280);
  };

  return (
    <div className="mx-auto flex flex-col gap-3 slide-up max-w-2xl">
      {problems.map((problem, i) => {
        const isSelected = selectedProblem === problem;
        const target = getTargetRoute(problem);
        return (
          <button 
            key={i} 
            onClick={() => handleProblemClick(problem)}
            className={`text-left w-full p-4 border rounded-lg transition-all duration-150 flex items-center justify-between cursor-pointer focus-visible:outline-none ${
              isSelected 
                ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-white shadow-sm' 
                : 'border-[var(--color-border)] hover:border-[var(--color-primary)] bg-[var(--color-surface)] hover:bg-[var(--color-base)] text-[var(--color-text)]'
            }`}
          >
            <div className="flex flex-col gap-0.5">
              <Typography variant="body" className={`font-semibold m-0 text-sm sm:text-base ${isSelected ? 'text-white' : 'text-inherit'}`}>
                {problem}
              </Typography>
              <span className={`text-xs ${isSelected ? 'text-white/80' : 'text-[var(--color-text-muted)]'}`}>
                Recommended: {target.label}
              </span>
            </div>
            <svg className={`w-4 h-4 shrink-0 transition-transform duration-150 ${isSelected ? 'translate-x-1 text-white' : 'text-[var(--color-text-muted)]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}
