import { DocPageWrapper } from "@/components/DocPageWrapper";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import Link from "next/link";

export const metadata = {
  title: "VideoRAG: Introduction",
  description: "Multimodal retrieval-augmented generation for courtroom video evidence with sub-second timestamp citations.",
};

const toc = [
  { id: "core-mission", title: "Forensic Video Evidence Analysis", level: 2 as const },
  { id: "multimodal-capabilities", title: "Core Capabilities", level: 2 as const },
  { id: "runtime-architecture", title: "Simplified Runtime View", level: 2 as const },
  { id: "execution-boundaries", title: "Local Execution & Cloud Boundaries", level: 2 as const },
];

export default function VideoRAGIntroPage() {
  return (
    <DocPageWrapper
      title="VideoRAG: Introduction"
      description="A full-stack multimodal forensic video analysis system designed for legal proceedings, courtroom depositions, and evidentiary investigation."
      badge="Multimodal RAG"
      toc={toc}
    >
      <section id="core-mission" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Forensic Video Evidence Analysis
        </h2>
        <p>
          Video evidence in legal proceedings is voluminous, unstructured, and multimodal. A single trial proceeding or security recording may contain hours of spoken testimony, visible physical actions, fleeting on-screen text, and recurring individuals whose identities span multiple sessions.
        </p>
        <p>
          Traditional video QA systems either downsample videos into low-resolution summaries or feed raw tokens into monolithic vision-language models, losing precise sub-second timestamp accuracy and hallucinating details.
        </p>
        <p>
          <strong>VideoRAG</strong> is an end-to-end multimodal system that ingests raw courtroom video evidence, builds four local vector indexes (frames, scene captions, spoken transcripts, and OCR text), extracts structured spatial relations, tracks speaker voiceprints, and synthesizes answers backed by <strong>verified timestamp citations and playable video clips</strong>.
        </p>
      </section>

      <section id="multimodal-capabilities" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Core Capabilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
            <h3 className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--foreground)]" />
              Adaptive Ingestion &amp; 4 Vector Indexes
            </h3>
            <p className="mt-1 text-xs text-[var(--muted-text)]">
              Streams uploads to disk in 1 MiB chunks. Samples scene changes adaptively (max 300 frames). Builds 4 separate ChromaDB collections for visual embeddings (OpenCLIP ViT-B-32), scene captions (BLIP), speech (Whisper), and on-screen text (EasyOCR).
            </p>
          </div>

          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
            <h3 className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--foreground)]" />
              Structured Spatial &amp; Object Reasoning
            </h3>
            <p className="mt-1 text-xs text-[var(--muted-text)]">
              Runs YOLOv8 object detection every second valid frame. Automatically derives rule-based spatial relation triples (<code className="font-mono text-xs">left of</code>, <code className="font-mono text-xs">above</code>, <code className="font-mono text-xs">inside</code>, <code className="font-mono text-xs">near</code>) stored in SQLite for exact count and location queries.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
            <h3 className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--foreground)]" />
              Cross-Session Speaker &amp; Testimony Memory
            </h3>
            <p className="mt-1 text-xs text-[var(--muted-text)]">
              Diarizes speakers with pyannote.audio (falling back to silence gaps), registers Resemblyzer voiceprints across court sessions, and classifies cross-session testimony into <code className="font-mono text-xs">CONTRADICT</code>, <code className="font-mono text-xs">ENTAIL</code>, or <code className="font-mono text-xs">UNRELATED</code>.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
            <h3 className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--foreground)]" />
              Citation Verification &amp; Audit Trail
            </h3>
            <p className="mt-1 text-xs text-[var(--muted-text)]">
              Verifies answer timestamps against nearby context frames and audio transcripts. Retains verification decisions and SHA-256 evidence clip hashes in <code className="font-mono text-xs">citations.db</code> for evidentiary chain-of-custody.
            </p>
          </div>
        </div>
      </section>

      <section id="runtime-architecture" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Simplified Runtime View
        </h2>
        <ArchitectureDiagram
          type="videorag"
          title="VideoRAG Multimodal Architecture"
          caption="Data boundary and workflow from video upload to Groq-powered agentic synthesis and verified clip playback."
        />
      </section>

      <section id="execution-boundaries" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Local Execution &amp; Cloud Boundaries
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          It is critical to distinguish what runs locally versus what touches external APIs:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-[var(--muted-text)]">
          <li>
            <strong className="text-[var(--foreground)]">Strictly Local:</strong> Video files, sampled frames, WAV audio, Whisper transcription, OpenCLIP embeddings, EasyOCR, YOLOv8 detections, ChromaDB collections, and SQLite relational databases all reside on the host machine.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">External Cloud Call:</strong> Groq API (<code className="font-mono text-xs">llama-3.3-70b-versatile</code>) receives query prompts and retrieved text evidence for query decomposition, answer synthesis, and contradiction classification when <code className="font-mono text-xs">GROQ_API_KEY</code> is enabled.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Offline Fallback:</strong> If Groq is unavailable, deterministic local fallbacks construct text responses and playable clips directly from top ChromaDB and SQLite matches.
          </li>
        </ul>

        <div className="mt-6 flex gap-4">
          <Link
            href="/docs/videorag/architecture"
            className="rounded-lg bg-black dark:bg-white px-4 py-2 text-xs font-semibold text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
          >
            VideoRAG Architecture →
          </Link>
          <Link
            href="/docs/videorag/ingestion"
            className="rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] px-4 py-2 text-xs font-semibold text-[var(--foreground)] hover:border-[var(--card-hover-border)] transition-colors"
          >
            Ingestion Pipeline →
          </Link>
        </div>
      </section>
    </DocPageWrapper>
  );
}
