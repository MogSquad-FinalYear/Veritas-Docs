import { DocPageWrapper } from "@/components/DocPageWrapper";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export const metadata = {
  title: "Nyaya Architecture & Components",
  description: "Three-tier architecture of Nyaya: rag/ core, FastAPI in-process service with request serialization, and Next.js UI.",
};

const toc = [
  { id: "system-tiers", title: "Three-Tier Repository Structure", level: 2 as const },
  { id: "in-process-import", title: "In-Process Backend Import & Path Bootstrapping", level: 2 as const },
  { id: "request-serialization", title: "Request Serialization & Concurrency Locks", level: 2 as const },
  { id: "frontend-integration", title: "Next.js Courtroom Chat Interface", level: 2 as const },
];

export default function NyayaArchitecturePage() {
  return (
    <DocPageWrapper
      title="Architecture & Components"
      description="The system architecture of Nyaya: linking the Python RAG core, in-process FastAPI service, and Next.js courtroom chat frontend."
      badge="Nyaya Architecture"
      toc={toc}
    >
      <section id="system-tiers" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Three-Tier Repository Structure
        </h2>
        <p>
          Nyaya is partitioned into three cleanly separated tiers:
        </p>

        <CodeBlock
          filename="Nyaya Repository Layout"
          language="text"
          code={`.
├── rag/        # Python RAG pipeline — hybrid retrieval, IRAC reranking,
│               # temporal validity filtering, grounded answer generation.
│               # CLI-first, zero web layer of its own.
├── backend/    # FastAPI service that imports rag/ in-process and exposes
│               # it over HTTP (query, case upload, health).
└── frontend/   # Next.js app — the courtroom chat UI: citation-grounded answers,
                # IRAC coverage, case management, document upload.`}
        />
      </section>

      <section id="in-process-import" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          In-Process Backend Import & Path Bootstrapping
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          Rather than spawning Python subprocesses or maintaining expensive IPC pipes, the FastAPI backend imports <code className="font-mono text-xs">rag/</code> directly in-process:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-[var(--muted-text)]">
          <li><strong>Shared Process Memory:</strong> One Python process holds the loaded Qdrant vector client, BM25 indices, and tokenizer pipelines.</li>
          <li><strong>Zero Inter-Process Latency:</strong> Embeddings and retrieved statutory chunks pass directly through Python memory references.</li>
          <li><strong>Path Bootstrapping:</strong> <code className="font-mono text-xs">backend/app/config.py:bootstrap_rag()</code> automatically resolves relative file paths so <code className="font-mono text-xs">rag/</code> finds its data files regardless of current working directory.</li>
        </ul>

        <CodeBlock
          filename="Excerpt: backend/app/config.py"
          language="python"
          code={`def bootstrap_rag():
    """Ensure rag/ can be imported and resolves its data/ and qdrant_db paths correctly."""
    rag_dir = Path(__file__).resolve().parent.parent.parent / "rag"
    if str(rag_dir) not in sys.path:
        sys.path.insert(0, str(rag_dir))
    
    # Verify pre-indexed Qdrant directory exists
    qdrant_db = rag_dir / "qdrant_db"
    assert qdrant_db.exists(), f"Qdrant storage not found at {qdrant_db}"`}
        />
      </section>

      <section id="request-serialization" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Request Serialization & Concurrency Locks
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          Requests to the Nyaya legal RAG pipeline are serialized behind an asynchronous mutex lock in <code className="font-mono text-xs">backend/app/state.py</code>:
        </p>

        <CodeBlock
          filename="backend/app/state.py"
          language="python"
          code={`import asyncio

# The RAG pipeline is synchronous and model-bound.
# We serialize incoming requests to prevent GPU memory thrashing.
pipeline_lock = asyncio.Lock()

async def execute_query_safely(query_payload):
    async with pipeline_lock:
        # Calls the in-process synchronous RAG engine
        result = await asyncio.to_thread(rag_pipeline.generate_answer, query_payload)
        return result`}
        />

        <Callout type="important" title="Design Note">
          The RAG pipeline is model-bound and synchronous. Serializing calls behind an async lock ensures consistent GPU memory footprints during 14B model generation and eliminates concurrency race conditions on Qdrant and SQLite file locks.
        </Callout>
      </section>

      <section id="frontend-integration" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Next.js Courtroom Chat Interface
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          The frontend never communicates with <code className="font-mono text-xs">rag/</code> directly. All network interaction flows through the typed API client in <code className="font-mono text-xs">frontend/src/lib/api.ts</code>:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-[var(--muted-text)]">
          <li>Displays citation-grounded statutory answers with clickable statute pill tags.</li>
          <li>Visualizes the IRAC structural breakdown with color-coded badges (Issue, Rule, Application, Conclusion).</li>
          <li>Provides drag-and-drop document upload for FIRs, charge sheets, and witness statements.</li>
          <li>Displays temporal validity routing notices when pre-2024 offenses are queried.</li>
        </ul>
      </section>
    </DocPageWrapper>
  );
}
