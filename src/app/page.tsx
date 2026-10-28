"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { SearchModal } from "@/components/SearchModal";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";

export default function Home() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col transition-colors">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden border-b border-[var(--border-color)] px-6 pb-20 pt-16 sm:px-10 lg:px-20 lg:pb-24 lg:pt-20">
          <div className="pointer-events-none absolute -right-28 -top-32 h-[440px] w-[440px] rounded-full bg-zinc-400/5 dark:bg-zinc-600/5 blur-3xl" />
          <div className="pointer-events-none absolute -left-28 top-40 h-[380px] w-[380px] rounded-full bg-zinc-400/5 dark:bg-zinc-600/5 blur-3xl" />

          <div className="relative mx-auto max-w-[860px] text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--sidebar-bg)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--foreground)] mb-6">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--foreground)]" /> Official Developer Documentation
            </div>

            <h1 className="text-[clamp(2.5rem,5.5vw,4.5rem)] font-extrabold leading-[1.08] tracking-[-0.04em] text-[var(--foreground)]">
              Veritas Documentation
            </h1>

            <p className="mx-auto mt-6 max-w-[650px] text-[16px] sm:text-[18px] leading-relaxed text-[var(--muted-text)]">
              Explore the architecture, workflows, APIs, and implementation details behind Veritas&apos;s three specialised AI analysis modules.
            </p>

            {/* Interactive Search Bar Trigger */}
            <div className="mx-auto mt-8 max-w-[620px]">
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                className="flex w-full items-center justify-between rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-3 text-left shadow-[var(--shadow-card)] transition-all hover:border-[var(--card-hover-border)]"
              >
                <div className="flex items-center gap-3">
                  <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5 text-[var(--subtle-text)]" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <circle cx="8.75" cy="8.75" r="5.75" />
                    <path d="m13 13 4 4" strokeLinecap="round" />
                  </svg>
                  <span className="text-[14px] text-[var(--subtle-text)]">
                    Search docs (e.g. FLUX.1 failure mode, ChromaDB, IRAC, Groq)...
                  </span>
                </div>
                <kbd className="hidden sm:inline-block rounded-md border border-[var(--border-color)] bg-[var(--sidebar-bg)] px-2 py-1 text-[10px] font-semibold text-[var(--subtle-text)]">
                  ⌘K
                </kbd>
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/docs/overview/introduction"
                className="inline-flex items-center gap-2 rounded-xl bg-black dark:bg-white px-5 py-3 text-sm font-semibold text-white dark:text-black shadow-sm transition-all hover:bg-zinc-800 dark:hover:bg-zinc-200"
              >
                Explore Documentation
                <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 12L12 4M5 4h7v7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <a
                href="#modules"
                className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] px-5 py-3 text-sm font-semibold text-[var(--foreground)] transition-colors hover:border-[var(--card-hover-border)]"
              >
                Browse Three Modules
                <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <div className="mt-8 flex items-center justify-center gap-4 text-[12px] text-[var(--subtle-text)]">
              <span>Verified Implementation</span>
              <span className="h-1 w-1 rounded-full bg-[var(--border-color)]" />
              <span>Independent Backends</span>
              <span className="h-1 w-1 rounded-full bg-[var(--border-color)]" />
              <span>Peer-Reviewed Baselines</span>
            </div>
          </div>
        </section>

        {/* The Three Modules Section */}
        <section id="modules" className="px-6 py-16 sm:px-10 lg:px-20 lg:py-20">
          <div className="mx-auto max-w-[1200px]">
            <div className="mb-12 text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--subtle-text)]">
                Core Subsystems
              </p>
              <h2 className="mt-2 text-[28px] sm:text-[34px] font-extrabold tracking-tight text-[var(--foreground)]">
                Specialized Analysis Modules
              </h2>
              <p className="mx-auto mt-3 max-w-[620px] text-[14px] text-[var(--muted-text)]">
                Each module provides purpose-built machine learning pipelines designed for specific forensic and legal reasoning requirements.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Card 1: AI Imagery Detection */}
              <div className="group flex flex-col justify-between rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 transition-all hover:-translate-y-1 hover:border-[var(--card-hover-border)] hover:shadow-[var(--shadow-card)]">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--sidebar-bg)] text-[var(--foreground)]">
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--subtle-text)]">
                      Module 01
                    </p>
                    <span className="rounded bg-[var(--sidebar-bg)] border border-[var(--border-color)] px-2 py-0.5 text-[10px] font-mono text-[var(--subtle-text)]">
                      PyTorch Local
                    </span>
                  </div>
                  <h3 className="mt-2 text-[20px] font-bold tracking-tight text-[var(--foreground)] transition-colors">
                    AI Imagery Detection
                  </h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-[var(--muted-text)]">
                    Frequency-aware dynamic routing across specialist AI-generated image detectors. Analyzes 2D FFT spectral deviations, handles Diffusion Transformers (FLUX.1, SD3), and accounts for JPEG compression artifacts.
                  </p>
                  <div className="mt-4 space-y-1.5 text-xs text-[var(--subtle-text)] border-t border-[var(--border-color)] pt-4">
                    <div className="flex items-center justify-between">
                      <span>Key Detectors:</span>
                      <span className="font-mono text-[var(--foreground)]">UFD, NPR, CLIP-LoRA</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Generators:</span>
                      <span className="font-mono text-[var(--foreground)]">FLUX.1, SD3, SDXL, BigGAN</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3 pt-4 border-t border-[var(--border-color)]">
                  <Link
                    href="/docs/imagery/introduction"
                    className="inline-flex items-center gap-1 text-[12px] font-semibold text-[var(--foreground)] hover:underline"
                  >
                    Overview
                    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 12L12 4M5 4h7v7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                  </Link>
                  <span className="text-[var(--subtle-text)]">•</span>
                  <Link
                    href="/docs/imagery/architecture"
                    className="text-[12px] font-medium text-[var(--muted-text)] hover:text-[var(--foreground)]"
                  >
                    Pipeline &amp; FFT
                  </Link>
                </div>
              </div>

              {/* Card 2: VideoRAG */}
              <div className="group flex flex-col justify-between rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 transition-all hover:-translate-y-1 hover:border-[var(--card-hover-border)] hover:shadow-[var(--shadow-card)]">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--sidebar-bg)] text-[var(--foreground)]">
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <polygon points="23 7 16 12 23 17 23 7" strokeLinecap="round" strokeLinejoin="round" />
                      <rect x="1" y="5" width="15" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--subtle-text)]">
                      Module 02
                    </p>
                    <span className="rounded bg-[var(--sidebar-bg)] border border-[var(--border-color)] px-2 py-0.5 text-[10px] font-mono text-[var(--subtle-text)]">
                      FastAPI + React
                    </span>
                  </div>
                  <h3 className="mt-2 text-[20px] font-bold tracking-tight text-[var(--foreground)] transition-colors">
                    VideoRAG
                  </h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-[var(--muted-text)]">
                    Multimodal courtroom video analysis with timestamp-grounded question answering. Builds 4 local ChromaDB vector collections, extracts EasyOCR and YOLOv8 detections, diarizes speakers, and verifies citations.
                  </p>
                  <div className="mt-4 space-y-1.5 text-xs text-[var(--subtle-text)] border-t border-[var(--border-color)] pt-4">
                    <div className="flex items-center justify-between">
                      <span>Index Store:</span>
                      <span className="font-mono text-[var(--foreground)]">ChromaDB + SQLite</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Reasoning:</span>
                      <span className="font-mono text-[var(--foreground)]">Groq llama-3.3-70b</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3 pt-4 border-t border-[var(--border-color)]">
                  <Link
                    href="/docs/videorag/introduction"
                    className="inline-flex items-center gap-1 text-[12px] font-semibold text-[var(--foreground)] hover:underline"
                  >
                    Overview
                    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 12L12 4M5 4h7v7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <span className="text-[var(--subtle-text)]">•</span>
                  <Link
                    href="/docs/videorag/ingestion"
                    className="text-[12px] font-medium text-[var(--muted-text)] hover:text-[var(--foreground)]"
                  >
                    Ingestion Pipeline
                  </Link>
                </div>
              </div>

              {/* Card 3: Nyaya */}
              <div className="group flex flex-col justify-between rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 transition-all hover:-translate-y-1 hover:border-[var(--card-hover-border)] hover:shadow-[var(--shadow-card)]">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--sidebar-bg)] text-[var(--foreground)]">
                    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--subtle-text)]">
                      Module 03
                    </p>
                    <span className="rounded bg-[var(--sidebar-bg)] border border-[var(--border-color)] px-2 py-0.5 text-[10px] font-mono text-[var(--subtle-text)]">
                      FastAPI + Next.js
                    </span>
                  </div>
                  <h3 className="mt-2 text-[20px] font-bold tracking-tight text-[var(--foreground)] transition-colors">
                    Nyaya Legal RAG
                  </h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-[var(--muted-text)]">
                    Citation-grounded legal question answering over Indian statute law (IPC, CrPC, BNS, BNSS). Employs hybrid Qdrant + BM25 retrieval, IRAC answer reranking, temporal validity filtering, and FIR case document fusion.
                  </p>
                  <div className="mt-4 space-y-1.5 text-xs text-[var(--subtle-text)] border-t border-[var(--border-color)] pt-4">
                    <div className="flex items-center justify-between">
                      <span>Statutes:</span>
                      <span className="font-mono text-[var(--foreground)]">IPC, CrPC, BNS, BNSS</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Local LLM:</span>
                      <span className="font-mono text-[var(--foreground)]">Ollama qwen2.5:14b</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3 pt-4 border-t border-[var(--border-color)]">
                  <Link
                    href="/docs/nyaya/introduction"
                    className="inline-flex items-center gap-1 text-[12px] font-semibold text-[var(--foreground)] hover:underline"
                  >
                    Overview
                    <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 12L12 4M5 4h7v7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                  <span className="text-[var(--subtle-text)]">•</span>
                  <Link
                    href="/docs/nyaya/retrieval"
                    className="text-[12px] font-medium text-[var(--muted-text)] hover:text-[var(--foreground)]"
                  >
                    Hybrid Retrieval
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Architecture Overview */}
        <section className="border-t border-[var(--border-color)] bg-[var(--sidebar-bg)] px-6 py-16 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-[1100px]">
            <div className="text-center mb-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--subtle-text)]">
                System Topology
              </p>
              <h2 className="mt-2 text-[26px] sm:text-[30px] font-extrabold tracking-tight text-[var(--foreground)]">
                Decoupled Multi-Module Architecture
              </h2>
              <p className="mx-auto mt-2 max-w-[600px] text-[13px] text-[var(--muted-text)]">
                Veritas unites three independent verification domains under a unified developer experience, preventing cross-module latency bottlenecks and ensuring strict forensic isolation.
              </p>
            </div>

            <ArchitectureDiagram
              type="platform"
              caption="Veritas platform layout: Each module preserves an independent execution profile, distinct vector/relational databases, and isolated inference runtimes."
            />
          </div>
        </section>

        {/* Quickstart & Technology Stack */}
        <section className="px-6 py-16 sm:px-10 lg:px-20">
          <div className="mx-auto max-w-[1100px] grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Quickstart links */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--subtle-text)]">
                Get Started
              </p>
              <h3 className="mt-2 text-[24px] font-bold tracking-tight text-[var(--foreground)]">
                Quick Setup Guides
              </h3>
              <p className="mt-2 text-[13px] text-[var(--muted-text)] leading-relaxed">
                Step-by-step instructions for installing dependencies, downloading model weights, configuring environment tokens, and launching services.
              </p>

              <div className="mt-6 space-y-3">
                <Link
                  href="/docs/getting-started/installation"
                  className="flex items-center justify-between rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4 transition-all hover:border-[var(--card-hover-border)] hover:shadow-sm"
                >
                  <div>
                    <h4 className="text-[14px] font-semibold text-[var(--foreground)]">Installation &amp; Setup</h4>
                    <p className="text-[12px] text-[var(--muted-text)]">Python virtual environments, Node.js packages, and system libraries</p>
                  </div>
                  <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 text-[var(--foreground)] shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>

                <Link
                  href="/docs/getting-started/configuration"
                  className="flex items-center justify-between rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4 transition-all hover:border-[var(--card-hover-border)] hover:shadow-sm"
                >
                  <div>
                    <h4 className="text-[14px] font-semibold text-[var(--foreground)]">Configuration &amp; Keys</h4>
                    <p className="text-[12px] text-[var(--muted-text)]">Setting up Groq API keys, Hugging Face tokens, and Ollama hosts</p>
                  </div>
                  <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 text-[var(--foreground)] shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>

                <Link
                  href="/docs/getting-started/running"
                  className="flex items-center justify-between rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4 transition-all hover:border-[var(--card-hover-border)] hover:shadow-sm"
                >
                  <div>
                    <h4 className="text-[14px] font-semibold text-[var(--foreground)]">Running the Applications</h4>
                    <p className="text-[12px] text-[var(--muted-text)]">Starting VideoRAG, Nyaya, and AI Imagery inference harnesses</p>
                  </div>
                  <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4 text-[var(--foreground)] shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Verified Tech Stack */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[var(--subtle-text)]">
                Specification
              </p>
              <h3 className="mt-2 text-[24px] font-bold tracking-tight text-[var(--foreground)]">
                Technology Matrix
              </h3>
              <p className="mt-2 text-[13px] text-[var(--muted-text)] leading-relaxed">
                Core technologies confirmed and verified from repository source code and dependency manifests.
              </p>

              <div className="mt-6 overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--border-color)] bg-[var(--sidebar-bg)] font-semibold text-[var(--foreground)]">
                      <th className="p-3">Layer</th>
                      <th className="p-3">Technologies</th>
                      <th className="p-3">Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-color)] text-[var(--muted-text)]">
                    <tr>
                      <td className="p-3 font-medium text-[var(--foreground)]">Core Languages</td>
                      <td className="p-3 font-mono text-[var(--foreground)]">Python 3.10+, TypeScript</td>
                      <td className="p-3">Inference backends &amp; web UI</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-[var(--foreground)]">Web Backends</td>
                      <td className="p-3 font-mono text-[var(--foreground)]">FastAPI, Uvicorn, Pydantic</td>
                      <td className="p-3">Async REST endpoints</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-[var(--foreground)]">Frontends</td>
                      <td className="p-3 font-mono text-[var(--foreground)]">React 19, Next.js 16, Vite 8</td>
                      <td className="p-3">Forensic &amp; legal chat portals</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-[var(--foreground)]">Vector DBs</td>
                      <td className="p-3 font-mono text-[var(--foreground)]">ChromaDB, Qdrant</td>
                      <td className="p-3">Multimodal &amp; statutory embeddings</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-[var(--foreground)]">Vision &amp; ASR</td>
                      <td className="p-3 font-mono text-[var(--foreground)]">OpenCLIP, Whisper, EasyOCR, YOLOv8</td>
                      <td className="p-3">Local media extraction</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-medium text-[var(--foreground)]">Language Models</td>
                      <td className="p-3 font-mono text-[var(--foreground)]">Groq Llama-3.3, Ollama Qwen2.5</td>
                      <td className="p-3">Query planning &amp; legal synthesis</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--border-color)] bg-[var(--sidebar-bg)] py-8 text-xs text-[var(--subtle-text)]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="relative flex h-6 w-6 items-center justify-center rounded-[7px] bg-black dark:bg-white text-white dark:text-black">
              <span className="absolute h-2.5 w-2.5 rounded-full border-[1px] border-current" />
              <span className="absolute h-1 w-1 rounded-full bg-current" />
            </span>
            <span className="font-semibold text-[var(--foreground)]">Veritas Documentation Portal</span>
          </div>
          <p>© 2025–2026 Veritas Project. Verified forensic &amp; legal documentation.</p>
          <div className="flex gap-4">
            <Link href="/docs/overview/introduction" className="hover:text-[var(--foreground)]">Docs</Link>
            <Link href="/docs/reference/api" className="hover:text-[var(--foreground)]">APIs</Link>
            <Link href="/docs/reference/research" className="hover:text-[var(--foreground)]">Research</Link>
          </div>
        </div>
      </footer>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </div>
  );
}
