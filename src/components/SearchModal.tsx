"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { searchDocs } from "@/lib/search-index";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Derive search hits directly from query during render
  const results = useMemo(() => {
    return query.trim().length > 0 ? searchDocs(query) : [];
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setQuery("");
    setSelectedIndex(0);
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (results.length > 0 && results[selectedIndex]) {
          router.push(results[selectedIndex].href);
          handleClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, router, handleClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:p-6 sm:pt-24">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal dialog */}
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-2xl transition-all"
        role="dialog"
        aria-modal="true"
        aria-label="Search documentation"
      >
        {/* Search Input Bar */}
        <div className="flex items-center border-b border-[var(--border-color)] px-4 py-3">
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="h-5 w-5 text-[var(--subtle-text)] shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
          >
            <circle cx="8.75" cy="8.75" r="5.75" />
            <path d="m13 13 4 4" strokeLinecap="round" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Search Veritas documentation (e.g., FLUX.1, ChromaDB, IRAC, Groq)..."
            className="ml-3 flex-1 bg-transparent text-[14px] text-[var(--foreground)] placeholder-[var(--subtle-text)] outline-none"
          />
          {query.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setSelectedIndex(0);
              }}
              className="mr-2 text-xs text-[var(--subtle-text)] hover:text-[var(--foreground)]"
            >
              Clear
            </button>
          )}
          <kbd className="hidden sm:inline-block rounded border border-[var(--border-color)] bg-[var(--sidebar-bg)] px-2 py-0.5 text-[10px] font-medium text-[var(--subtle-text)]">
            ESC
          </kbd>
        </div>

        {/* Results list or Empty State */}
        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query.trim().length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--subtle-text)]">
                Popular Searches
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {[
                  { label: "FLUX.1 Failure Mode", href: "/docs/imagery/evaluation" },
                  { label: "Video Ingestion Pipeline", href: "/docs/videorag/ingestion" },
                  { label: "Nyaya IRAC Generation", href: "/docs/nyaya/generation" },
                  { label: "Frequency Routing", href: "/docs/imagery/frequency-routing" },
                  { label: "Contradiction Classifier", href: "/docs/videorag/speakers-testimony" },
                  { label: "Temporal Validity", href: "/docs/nyaya/temporal-filtering" },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      router.push(item.href);
                      handleClose();
                    }}
                    className="rounded-lg border border-[var(--border-color)] bg-[var(--sidebar-bg)] px-2.5 py-1 text-xs text-[var(--muted-text)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm font-medium text-[var(--foreground)]">No documentation matches &ldquo;{query}&rdquo;</p>
              <p className="mt-1 text-xs text-[var(--subtle-text)]">
                Try searching for detector names (UniversalFakeDetect, NPR), modules (VideoRAG, Nyaya), or concepts (FFT, IRAC).
              </p>
            </div>
          ) : (
            <ul className="space-y-1">
              {results.map((entry, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <li key={entry.id}>
                    <Link
                      href={entry.href}
                      onClick={handleClose}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`block rounded-xl p-3 transition-colors ${
                        isSelected
                          ? "bg-[var(--accent-subtle)] border border-[var(--accent-border)]"
                          : "hover:bg-[var(--sidebar-bg)] border border-transparent"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-[var(--foreground)]">
                          {entry.title}
                        </span>
                        <span className="rounded-md border border-[var(--border-color)] bg-[var(--sidebar-bg)] px-2 py-0.5 text-[10px] font-medium text-[var(--accent)]">
                          {entry.section}
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs text-[var(--muted-text)]">
                        {entry.content}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-[var(--border-color)] bg-[var(--sidebar-bg)] px-4 py-2.5 text-[11px] text-[var(--subtle-text)]">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="font-mono font-semibold">↑</kbd> <kbd className="font-mono font-semibold">↓</kbd> to navigate
            </span>
            <span>
              <kbd className="font-mono font-semibold">↵</kbd> to select
            </span>
            <span>
              <kbd className="font-mono font-semibold">esc</kbd> to close
            </span>
          </div>
          <span>{results.length} {results.length === 1 ? "result" : "results"}</span>
        </div>
      </div>
    </div>
  );
}
