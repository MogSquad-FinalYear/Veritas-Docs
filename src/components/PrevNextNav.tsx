import Link from "next/link";
import { NavItem } from "@/lib/docs-navigation";

interface PrevNextNavProps {
  prev: (NavItem & { sectionTitle: string }) | null;
  next: (NavItem & { sectionTitle: string }) | null;
}

export function PrevNextNav({ prev, next }: PrevNextNavProps) {
  if (!prev && !next) return null;

  return (
    <div className="mt-16 pt-8 border-t border-[var(--border-color)] grid grid-cols-1 sm:grid-cols-2 gap-4">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-col rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4 transition-all hover:border-[var(--accent)] hover:shadow-sm"
        >
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--subtle-text)] group-hover:text-[var(--accent)]">
            <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>Previous</span>
          </div>
          <span className="mt-2 text-[14px] font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
            {prev.title}
          </span>
          <span className="mt-0.5 text-[11px] text-[var(--subtle-text)]">
            {prev.sectionTitle}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={next.href}
          className="group flex flex-col items-end text-right rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4 transition-all hover:border-[var(--accent)] hover:shadow-sm"
        >
          <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[var(--subtle-text)] group-hover:text-[var(--accent)]">
            <span>Next</span>
            <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="mt-2 text-[14px] font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
            {next.title}
          </span>
          <span className="mt-0.5 text-[11px] text-[var(--subtle-text)]">
            {next.sectionTitle}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
