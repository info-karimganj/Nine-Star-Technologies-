export default function Loading() {
  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center bg-[var(--color-base)]">
      <div className="relative w-16 h-16">
        {/* Simple minimal loading spinner */}
        <div className="absolute inset-0 rounded-full border-4 border-[var(--color-surface)]"></div>
        <div className="absolute inset-0 rounded-full border-4 border-[var(--color-primary)] border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-6 text-sm font-medium text-[var(--color-text-muted)] uppercase tracking-widest animate-pulse">
        Loading...
      </p>
    </div>
  );
}
