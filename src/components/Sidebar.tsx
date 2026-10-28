"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOCS_NAVIGATION } from "@/lib/docs-navigation";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  // Keep track of collapsed sections (all open by default)
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggleSection = (slug: string) => {
    setCollapsed((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const content = (
    <div className="flex h-full flex-col justify-between py-6">
      <div className="space-y-6">
        <div className="px-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--subtle-text)]">
            Documentation Tree
          </p>
        </div>

        <nav className="space-y-5 px-1" aria-label="Documentation Sidebar">
          {DOCS_NAVIGATION.map((section) => {
            const isCollapsed = !!collapsed[section.slug];

            return (
              <div key={section.slug} className="space-y-1">
                <button
                  type="button"
                  onClick={() => toggleSection(section.slug)}
                  className="flex w-full items-center justify-between px-2 py-1 text-left text-xs font-semibold text-[var(--foreground)] hover:text-[var(--subtle-text)] transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    {section.title}
                  </span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className={`h-3.5 w-3.5 text-[var(--subtle-text)] transition-transform duration-200 ${
                      isCollapsed ? "-rotate-90" : "rotate-0"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  >
                    <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {!isCollapsed && (
                  <ul className="space-y-0.5 border-l border-[var(--border-color)] ml-3 pl-2.5">
                    {section.items.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={onClose}
                            className={`group -ml-[11px] flex items-center justify-between border-l-2 py-1.5 pl-3 pr-2 text-[12px] font-medium transition-colors ${
                              isActive
                                ? "border-[var(--foreground)] font-semibold text-[var(--foreground)] bg-[var(--accent-subtle)] rounded-r-md"
                                : "border-transparent text-[var(--muted-text)] hover:border-[var(--card-hover-border)] hover:text-[var(--foreground)]"
                            }`}
                          >
                            <span className="truncate">{item.title}</span>
                            {item.badge && (
                              <span className="rounded bg-[var(--accent-subtle)] px-1.5 py-0.2 text-[9px] font-bold text-[var(--foreground)] border border-[var(--border-color)]">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Sidebar footer assistance card */}
      <div className="mt-8 px-2">
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--sidebar-bg)] p-3.5 text-xs">
          <p className="font-semibold text-[var(--foreground)]">Veritas Research Suite</p>
          <p className="mt-1 text-[11px] leading-relaxed text-[var(--subtle-text)]">
            Explore peer-reviewed models across computer vision and Indian statutory jurisprudence.
          </p>
          <div className="mt-2.5 flex items-center gap-2">
            <Link
              href="/docs/reference/research"
              className="text-[11px] font-semibold text-[var(--foreground)] hover:underline inline-flex items-center gap-1"
            >
              Academic Citations
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 12L12 4M5 4h7v7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop static sidebar */}
      <aside className="hidden w-[260px] shrink-0 border-r border-[var(--border-color)] bg-[var(--sidebar-bg)] lg:block">
        <div className="sticky top-[70px] h-[calc(100vh-70px)] overflow-y-auto px-4">
          {content}
        </div>
      </aside>

      {/* Mobile drawer overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onClose}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 z-50 w-72 max-w-[80vw] bg-[var(--card-bg)] px-4 shadow-2xl overflow-y-auto">
            <div className="flex h-[70px] items-center justify-between border-b border-[var(--border-color)] pb-2">
              <span className="text-sm font-bold text-[var(--foreground)]">Veritas Navigation</span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-lg p-1.5 text-[var(--subtle-text)] hover:text-[var(--foreground)]"
              >
                <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            {content}
          </div>
        </div>
      )}
    </>
  );
}
