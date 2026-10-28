"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col transition-colors">
      <Header
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
        isSidebarOpen={isSidebarOpen}
      />

      <div className="mx-auto flex w-full max-w-[1440px] flex-1">
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="min-w-0 flex-1 overflow-x-hidden">
          {children}
        </main>
      </div>

      <footer className="border-t border-[var(--border-color)] bg-[var(--sidebar-bg)] py-6 text-center text-xs text-[var(--subtle-text)]">
        <div className="mx-auto max-w-[1440px] px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2025–2026 Veritas Project. Forensic AI & Statutory Legal Intelligence.</p>
          <div className="flex gap-4 font-medium">
            <a href="/docs/overview/introduction" className="hover:text-[var(--accent)]">Overview</a>
            <a href="/docs/imagery/introduction" className="hover:text-[var(--accent)]">AI Imagery</a>
            <a href="/docs/videorag/introduction" className="hover:text-[var(--accent)]">VideoRAG</a>
            <a href="/docs/nyaya/introduction" className="hover:text-[var(--accent)]">Nyaya</a>
            <a href="/docs/reference/api" className="hover:text-[var(--accent)]">API Reference</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
