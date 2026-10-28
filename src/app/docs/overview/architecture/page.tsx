import { DocPageWrapper } from "@/components/DocPageWrapper";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata = {
  title: "Veritas Architecture",
  description: "Detailed system architecture, decoupled service boundaries, and data pipelines across Veritas.",
};

const toc = [
  { id: "platform-topology", title: "Platform Topology", level: 2 as const },
  { id: "execution-boundaries", title: "Execution Boundaries", level: 2 as const },
  { id: "module-isolation", title: "Module Isolation & Data Privacy", level: 2 as const },
  { id: "common-standards", title: "Common Standards & Integration", level: 2 as const },
];

export default function ArchitecturePage() {
  return (
    <DocPageWrapper
      title="Veritas Architecture"
      description="A decoupled, modular architecture designed for local execution, low-latency forensic analysis, and strict evidentiary boundaries."
      badge="System Architecture"
      toc={toc}
    >
      <section id="platform-topology" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Platform Topology
        </h2>
        <p>
          Veritas rejects the concept of an opaque single-model monolithic backend. Forensic image analysis, video ingestion, and statutory legal reasoning have fundamentally incompatible compute profiles, memory requirements, and latency targets.
        </p>
        <p>
          Instead, Veritas implements three decoupled systems unified by standard schema contracts, forensic citation conventions, and a cohesive design system:
        </p>

        <ArchitectureDiagram
          type="platform"
          title="Veritas Component & Storage Topology"
          caption="Independent subsystems with local model execution, dedicated storage engines, and non-blocking background workers."
        />
      </section>

      <section id="execution-boundaries" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Execution Boundaries
        </h2>
        <p>
          Each module operates within carefully guarded execution boundaries:
        </p>

        <div className="space-y-4 my-6">
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
            <h3 className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--foreground)]" />
              AI Imagery Detection Boundary
            </h3>
            <p className="mt-1 text-xs text-[var(--muted-text)]">
              Operates entirely via local PyTorch inference. Uses frozen backbones (CLIP ViT-L/14, ResNet-50) and lightweight classification heads. Requires no cloud network access, guaranteeing full confidentiality for sensitive evidence.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
            <h3 className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--foreground)]" />
              VideoRAG Boundary
            </h3>
            <p className="mt-1 text-xs text-[var(--muted-text)]">
              Frames, audio extractions, transcripts, OCR tokens, and SQLite records remain strictly local on the host server. Groq API is called exclusively for text-based query decomposition and answer synthesis when configured. Deterministic local fallbacks ensure basic retrieval functions even when completely offline.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
            <h3 className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--foreground)]" />
              Nyaya Legal RAG Boundary
            </h3>
            <p className="mt-1 text-xs text-[var(--muted-text)]">
              Directly imports the Python RAG core in-process inside FastAPI. All model inference runs via local Ollama instances (<code className="text-xs font-mono">qwen2.5:3b</code> and <code className="text-xs font-mono">qwen2.5:14b</code>). Requests are protected behind an execution lock to eliminate concurrency thrashing on model weights.
            </p>
          </div>
        </div>

        <Callout type="note" title="Thread Serialization in Nyaya">
          In Nyaya&apos;s backend, the RAG core is imported directly into the FastAPI process. Because local LLMs and cross-encoders are GPU-bound and synchronous, incoming requests acquire an async mutex lock in <code className="font-mono text-xs">backend/app/state.py</code>, ensuring inference stability without race conditions.
        </Callout>
      </section>

      <section id="module-isolation" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Module Isolation &amp; Data Privacy
        </h2>
        <p>
          Because court video evidence and legal case records contain sensitive, confidential, or legally privileged material, Veritas keeps storage segregated:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--muted-text)]">
          <li>
            <strong className="text-[var(--foreground)]">ChromaDB Collections:</strong> Video embeddings are partitioned into 4 discrete vector collections (<code className="text-xs font-mono">image_index</code>, <code className="text-xs font-mono">caption_index_clip</code>, <code className="text-xs font-mono">speech_index_clip</code>, <code className="text-xs font-mono">ocr_index</code>).
          </li>
          <li>
            <strong className="text-[var(--foreground)]">SQLite Audit Stores:</strong> Structured detections, spatial relations (<code className="text-xs font-mono">detections.db</code>), witness testimony ledger (<code className="text-xs font-mono">testimony.db</code>), and citation verification logs (<code className="text-xs font-mono">citations.db</code>) use standard relational transactions with SHA-256 evidence hashes.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Qdrant Legal Vector Store:</strong> Indian statutory provisions are vectorized in dedicated local Qdrant collections alongside BM25 sparse inverse-index tables.
          </li>
        </ul>
      </section>

      <section id="common-standards" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Common Standards &amp; Integration
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          While the backend runtimes are decoupled, they share common architectural conventions:
        </p>
        <CodeBlock
          filename="Common Veritas Health Check Pattern"
          language="json"
          code={`// GET http://localhost:8000/health (VideoRAG)
{
  "status": "ok",
  "chroma": {
    "image_index": 1284,
    "caption_index_clip": 428,
    "speech_index_clip": 312,
    "ocr_index": 184
  },
  "sqlite": {
    "detections": "available",
    "testimony": "available",
    "citations": "available"
  }
}

// GET http://localhost:8000/api/health (Nyaya)
{
  "status": "ready",
  "models": {
    "generator": "qwen2.5:14b",
    "extractor": "qwen2.5:3b"
  },
  "qdrant": "connected",
  "bm25_index": "loaded"
}`}
        />
      </section>
    </DocPageWrapper>
  );
}
