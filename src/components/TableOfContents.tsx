"use client";

import { useEffect, useState } from "react";

export interface TocItem {
  id: string;
  title: string;
  level?: 2 | 3;
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (!items || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0% -60% 0%",
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <div className="hidden xl:block w-[230px] shrink-0 pl-6">
      <div className="sticky top-[100px] max-h-[calc(100vh-120px)] overflow-y-auto">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--subtle-text)] mb-3">
          On this page
        </p>
        <ul className="space-y-2 border-l border-[var(--border-color)] text-[12px]">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id} className={item.level === 3 ? "pl-3" : ""}>
                <a
                  href={`#${item.id}`}
                  className={`-ml-px block border-l-2 py-0.5 pl-3 transition-colors ${
                    isActive
                      ? "border-[var(--accent)] font-semibold text-[var(--accent)]"
                      : "border-transparent text-[var(--muted-text)] hover:border-[var(--accent-border)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Back to top */}
        <div className="mt-6 pt-4 border-t border-[var(--border-color)]">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-1.5 text-[11px] font-medium text-[var(--subtle-text)] hover:text-[var(--accent)] transition-colors"
          >
            <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M8 12V4M4 8l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to top
          </button>
        </div>
      </div>
    </div>
  );
}
