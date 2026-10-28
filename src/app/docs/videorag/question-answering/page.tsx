import { DocPageWrapper } from "@/components/DocPageWrapper";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export const metadata = {
  title: "Question Answering & Agentic Synthesis",
  description: "Three-stage query decoupling, Groq LLM tool routing, parallel multi-index queries, and local fallback synthesis.",
};

const toc = [
  { id: "agentic-workflow", title: "The Three-Stage Agentic Workflow", level: 2 as const },
  { id: "query-decoupling", title: "Stage 1: JSON Query Decoupling", level: 2 as const },
  { id: "parallel-retrieval", title: "Stage 2: Parallel Multi-Index Search", level: 2 as const },
  { id: "synthesis-and-fallback", title: "Stage 3: Evidence Synthesis & Local Fallback", level: 2 as const },
];

export default function QAAndSynthesisPage() {
  return (
    <DocPageWrapper
      title="Question Answering & Synthesis"
      description="How VideoRAG decomposes complex natural-language courtroom inquiries into parallel multimodal retrieval plans and synthesizes grounded answers."
      badge="Reasoning Engine"
      toc={toc}
    >
      <section id="agentic-workflow" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          The Three-Stage Agentic Workflow
        </h2>
        <p>
          Courtroom queries frequently mix visual, verbal, and temporal evidence (e.g., &ldquo;Did the witness mention the red car before or after the police officer entered?&rdquo;). Rather than dumping all tokens into a generic context window, VideoRAG executes a three-stage decoupled workflow:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6 text-center text-xs">
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-3">
            <span className="font-mono text-[10px] text-[var(--accent)] font-bold">STAGE 1</span>
            <p className="mt-1 font-bold text-[var(--foreground)]">Query Decoupling</p>
            <p className="mt-1 text-[11px] text-[var(--muted-text)]">Groq LLM extracts sub-queries across speech, caption, OCR, and relations.</p>
          </div>
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-3">
            <span className="font-mono text-[10px] text-[var(--accent)] font-bold">STAGE 2</span>
            <p className="mt-1 font-bold text-[var(--foreground)]">Parallel Retrieval</p>
            <p className="mt-1 text-[11px] text-[var(--muted-text)]">Simultaneous queries across ChromaDB collections and SQLite tables.</p>
          </div>
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-3">
            <span className="font-mono text-[10px] text-[var(--accent)] font-bold">STAGE 3</span>
            <p className="mt-1 font-bold text-[var(--foreground)]">Synthesis & Clips</p>
            <p className="mt-1 text-[11px] text-[var(--muted-text)]">Merges evidence, formats timestamps, and validates citations.</p>
          </div>
        </div>
      </section>

      <section id="query-decoupling" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Stage 1: JSON Query Decoupling
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          The agent calls Groq (<code className="font-mono text-xs">llama-3.3-70b-versatile</code>) with a strict JSON function schema defined in <code className="font-mono text-xs">backend/agent/tools.py</code>:
        </p>

        <CodeBlock
          filename="Decomposed Retrieval Plan JSON Schema"
          language="json"
          code={`{
  "speech_query": "red car vehicle statement",
  "visual_query": "police officer entering doorway",
  "ocr_query": null,
  "detection_query": {
    "target_classes": ["car", "person"],
    "relation": "near"
  },
  "contradiction_check": false,
  "expected_answer_type": "temporal_comparison"
}`}
        />
        <p className="text-xs text-[var(--muted-text)]">
          If query decomposition times out or fails, the agent falls back to direct heuristic regex routing.
        </p>
      </section>

      <section id="parallel-retrieval" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Stage 2: Parallel Multi-Index Search
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          The decoupled sub-queries execute concurrently against their respective stores:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-[var(--muted-text)]">
          <li><code className="font-mono text-xs">speech_query</code> &rarr; Queries <code className="font-mono text-xs">speech_index_clip</code> for timestamped transcript segments.</li>
          <li><code className="font-mono text-xs">visual_query</code> &rarr; Queries <code className="font-mono text-xs">caption_index_clip</code> and <code className="font-mono text-xs">image_index</code>.</li>
          <li><code className="font-mono text-xs">ocr_query</code> &rarr; Queries <code className="font-mono text-xs">ocr_index</code> for visible badges, text, and signs.</li>
          <li><code className="font-mono text-xs">detection_query</code> &rarr; Executes SQL queries against <code className="font-mono text-xs">detections.db</code>.</li>
        </ul>
      </section>

      <section id="synthesis-and-fallback" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Stage 3: Evidence Synthesis & Local Fallback
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          All returned matches are deduplicated, scored, and enriched with surrounding context frames. Groq synthesizes the final response formatted with clickable timestamp links:
        </p>

        <CodeBlock
          filename="Synthesized Grounded Response Example"
          language="markdown"
          code={`Based on courtroom video evidence from Session 02:

1. At **[01:14]**, Officer Jenkins is observed entering through the side door (verified in frame \`frame_74000.jpg\`).
2. At **[02:45]**, witness Maria Chen states: *"The red sedan accelerated past the intersection"* (Speech transcript, Speaker 02).

**Conclusion:** The witness described the red sedan 1 minute and 31 seconds after Officer Jenkins entered the room.`}
        />

        <Callout type="note" title="Local Fallback Synthesis">
          If <code className="font-mono text-xs">GROQ_API_KEY</code> is not provided, VideoRAG executes a local deterministic fallback: it ranks top retrieved speech segments, captions, and detection timestamps, rendering a structured tabular summary with playable clip buttons directly in the UI.
        </Callout>
      </section>
    </DocPageWrapper>
  );
}
