"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Breadcrumbs } from "./Breadcrumbs";
import { TableOfContents, TocItem } from "./TableOfContents";
import { PrevNextNav } from "./PrevNextNav";
import { getBreadcrumbs, getPrevNextDocs } from "@/lib/docs-navigation";

interface DocPageWrapperProps {
  title: string;
  description?: string;
  badge?: string;
  toc?: TocItem[];
  children: React.ReactNode;
}

export function DocPageWrapper({
  title,
  description,
  badge,
  toc = [],
  children,
}: DocPageWrapperProps) {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);
  const { prev, next } = getPrevNextDocs(pathname);

  return (
    <div className="flex w-full min-w-0 justify-between gap-8 px-4 py-8 sm:px-8 sm:py-12 lg:px-12">
      {/* Central Article Content */}
      <article className="w-full max-w-[820px] min-w-0">
        <Breadcrumbs items={breadcrumbs} />

        <header className="mb-8 border-b border-[var(--border-color)] pb-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-[28px] sm:text-[34px] font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
              {title}
            </h1>
            {badge && (
              <span className="rounded-full bg-[var(--accent-subtle)] border border-[var(--accent-border)] px-2.5 py-0.5 text-xs font-semibold text-[var(--accent)]">
                {badge}
              </span>
            )}
          </div>
          {description && (
            <p className="mt-3 text-[15px] sm:text-[16px] leading-relaxed text-[var(--muted-text)]">
              {description}
            </p>
          )}
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none text-[14px] leading-relaxed text-[var(--foreground)]">
          {children}
        </div>

        <PrevNextNav prev={prev} next={next} />
      </article>

      {/* Right Table of Contents */}
      {toc.length > 0 && <TableOfContents items={toc} />}
    </div>
  );
}
