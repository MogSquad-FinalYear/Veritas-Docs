"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { SearchModal } from "./SearchModal";

interface HeaderProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export function Header({ onToggleSidebar, isSidebarOpen }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-[var(--border-color)] bg-[var(--header-bg)] backdrop-blur-md transition-colors">
        <div className="mx-auto flex h-[70px] max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Mobile hamburger + Veritas Brand */}
          <div className="flex items-center gap-3">
            {onToggleSidebar && (
              <button
                type="button"
                onClick={onToggleSidebar}
                aria-label={isSidebarOpen ? "Close navigation menu" : "Open navigation menu"}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--muted-text)] transition-colors hover:text-[var(--foreground)] lg:hidden"
              >
                <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75">
                  {isSidebarOpen ? (
                    <path d="M5 5l10 10M15 5L5 15" strokeLinecap="round" />
                  ) : (
                    <path d="M3 5h14M3 10h14M3 15h14" strokeLinecap="round" />
                  )}
                </svg>
              </button>
            )}

            <Link href="/" className="flex items-center gap-2.5 group" aria-label="Veritas Home">
              <span className="relative flex h-8 w-8 items-center justify-center rounded-[9px] bg-black dark:bg-white text-white dark:text-black shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-transform group-hover:scale-105">
                <span className="absolute h-3.5 w-3.5 rounded-full border-[1.5px] border-current" />
                <span className="absolute h-1 w-1 rounded-full bg-current" />
              </span>
              <div className="flex flex-col">
                <span className="text-[17px] font-bold tracking-tight text-[var(--foreground)] leading-none">
                  Veritas
                </span>
                <span className="text-[10px] font-medium tracking-wider uppercase text-[var(--subtle-text)] mt-0.5">
                  Docs
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Module quick-switch tabs on desktop */}
          <nav className="hidden items-center gap-6 text-[13px] font-medium md:flex" aria-label="Main navigation">
            <Link
              href="/docs/overview/introduction"
              className="text-[var(--muted-text)] transition-colors hover:text-[var(--foreground)]"
            >
              Overview
            </Link>
            <Link
              href="/docs/imagery/introduction"
              className="text-[var(--muted-text)] transition-colors hover:text-[var(--foreground)]"
            >
              AI Imagery
            </Link>
            <Link
              href="/docs/videorag/introduction"
              className="text-[var(--muted-text)] transition-colors hover:text-[var(--foreground)]"
            >
              VideoRAG
            </Link>
            <Link
              href="/docs/nyaya/introduction"
              className="text-[var(--muted-text)] transition-colors hover:text-[var(--foreground)]"
            >
              Nyaya Legal RAG
            </Link>
            <Link
              href="/docs/reference/api"
              className="text-[var(--muted-text)] transition-colors hover:text-[var(--foreground)]"
            >
              Reference
            </Link>
          </nav>

          {/* Right: Search button + Theme toggle + Version */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search shortcut button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] px-3 py-1.5 text-xs text-[var(--muted-text)] shadow-sm transition-all hover:border-[var(--card-hover-border)] hover:text-[var(--foreground)]"
            >
              <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-[var(--subtle-text)]" fill="none" stroke="currentColor" strokeWidth="1.75">
                <circle cx="8.75" cy="8.75" r="5.75" />
                <path d="m13 13 4 4" strokeLinecap="round" />
              </svg>
              <span className="hidden sm:inline">Search docs...</span>
              <kbd className="hidden sm:inline-block rounded border border-[var(--border-color)] bg-[var(--sidebar-bg)] px-1.5 py-0.5 text-[9px] font-medium text-[var(--subtle-text)]">
                ⌘K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Version Badge */}
            <span className="hidden items-center rounded-md border border-[var(--border-color)] bg-[var(--sidebar-bg)] px-2.5 py-1 text-[11px] font-semibold text-[var(--foreground)] sm:inline-flex">
              v1.0.0
            </span>
          </div>
        </div>
      </header>

      {/* Global search command modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
