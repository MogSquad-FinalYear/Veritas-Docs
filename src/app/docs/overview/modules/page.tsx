import { DocPageWrapper } from "@/components/DocPageWrapper";
import Link from "next/link";

export const metadata = {
  title: "Module Comparative Overview",
  description: "Side-by-side comparison matrix of AI Imagery Detection, VideoRAG, and Nyaya Legal RAG.",
};

const toc = [
  { id: "comparative-matrix", title: "Comparative Specification Matrix", level: 2 as const },
  { id: "modality-tradeoffs", title: "Modality & Compute Trade-Offs", level: 2 as const },
  { id: "selection-guide", title: "When to Use Which Module", level: 2 as const },
];

export default function ModulesPage() {
  return (
    <DocPageWrapper
      title="Module Overview"
      description="A detailed side-by-side technical comparison of capabilities, tech stacks, and hardware footprints across the three Veritas modules."
      badge="Subsystem Comparison"
      toc={toc}
    >
      <section id="comparative-matrix" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Comparative Specification Matrix
        </h2>
        <p>
          The table below contrasts the core operational parameters of the three Veritas modules:
        </p>

        <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] my-6">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[var(--sidebar-bg)] border-b border-[var(--border-color)] font-semibold text-[var(--foreground)]">
                <th className="p-3">Attribute</th>
                <th className="p-3">AI Imagery Detection</th>
                <th className="p-3">VideoRAG</th>
                <th className="p-3">Nyaya Legal RAG</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--muted-text)]">
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">Primary Modality</td>
                <td className="p-3">Static RGB Images (PNG/JPEG)</td>
                <td className="p-3">Video (MP4, AVI, MKV, MOV)</td>
                <td className="p-3">Text & Legal PDF/DOC Documents</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">Core Problem</td>
                <td className="p-3">Synthetic artifact detection</td>
                <td className="p-3">Forensic courtroom evidence QA</td>
                <td className="p-3">Indian statutory legal reasoning</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">Backend Framework</td>
                <td className="p-3 font-mono">PyTorch / Python CLI</td>
                <td className="p-3 font-mono">FastAPI 0.115.6</td>
                <td className="p-3 font-mono">FastAPI (In-process RAG)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">Frontend Interface</td>
                <td className="p-3">Web Portal / Research CLI</td>
                <td className="p-3">React 19 + Vite 8 SPA</td>
                <td className="p-3">Next.js Chat UI</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">Vector Storage</td>
                <td className="p-3">In-memory feature tensors</td>
                <td className="p-3 font-mono">ChromaDB (4 collections)</td>
                <td className="p-3 font-mono">Qdrant vector engine</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">Structured Storage</td>
                <td className="p-3">CSV / JSON evaluation logs</td>
                <td className="p-3 font-mono">SQLite (detections, testimony, citations)</td>
                <td className="p-3 font-mono">JSON statutory index + BM25</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">Vision Models</td>
                <td className="p-3">CLIP ViT-L/14, ResNet-50</td>
                <td className="p-3">OpenCLIP ViT-B-32, YOLOv8n</td>
                <td className="p-3">N/A (Text only)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">Audio / Speech</td>
                <td className="p-3">N/A</td>
                <td className="p-3">Whisper tiny + pyannote 3.1</td>
                <td className="p-3">N/A</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">LLM Reasoning</td>
                <td className="p-3">N/A (Classifier Heads)</td>
                <td className="p-3">Groq (llama-3.3-70b-versatile)</td>
                <td className="p-3">Ollama (qwen2.5:3b & 14b)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">Min Hardware</td>
                <td className="p-3">8GB GPU (PyTorch)</td>
                <td className="p-3">8GB GPU / 16GB RAM</td>
                <td className="p-3">16GB RAM (Ollama 14b)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="modality-tradeoffs" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Modality & Compute Trade-Offs
        </h2>
        <p>
          Each design optimizes for distinct performance characteristics:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--muted-text)]">
          <li>
            <strong className="text-[var(--foreground)]">Throughput vs Latency (AI Imagery):</strong> NPR runs at 229–320 images/sec (35x faster than CLIP ViT-L/14 at 7.4–7.6 images/sec). However, NPR is highly sensitive to JPEG compression, while CLIP models maintain superior ranking robustness.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Ingestion Time vs Depth (VideoRAG):</strong> Ingestion runs in the background. A 10-minute 1080p video generates ~300 frames, taking ~45–90 seconds for complete multimodal indexing (transcription, OCR, YOLO, and CLIP embeddings).
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Precision vs Concurrency (Nyaya):</strong> Because legal advice demands zero factual hallucinations, Nyaya employs two-stage Ollama generation with strict IRAC formatting, serializing inference requests to safeguard memory.
          </li>
        </ul>
      </section>

      <section id="selection-guide" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          When to Use Which Module
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
            <h3 className="font-bold text-sm text-[var(--foreground)]">Use AI Imagery If</h3>
            <p className="mt-2 text-xs text-[var(--muted-text)] leading-relaxed">
              You need to verify whether a single digital photo was rendered by an AI generative model (such as Midjourney, FLUX.1, or Stable Diffusion).
            </p>
            <Link href="/docs/imagery/introduction" className="mt-4 block text-xs font-semibold text-[var(--accent)] hover:underline">
              AI Imagery Docs →
            </Link>
          </div>

          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
            <h3 className="font-bold text-sm text-[var(--foreground)]">Use VideoRAG If</h3>
            <p className="mt-2 text-xs text-[var(--muted-text)] leading-relaxed">
              You have courtroom footage, deposition recordings, or evidentiary video and need answers backed by exact playable timestamps.
            </p>
            <Link href="/docs/videorag/introduction" className="mt-4 block text-xs font-semibold text-[var(--accent)] hover:underline">
              VideoRAG Docs →
            </Link>
          </div>

          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
            <h3 className="font-bold text-sm text-[var(--foreground)]">Use Nyaya If</h3>
            <p className="mt-2 text-xs text-[var(--muted-text)] leading-relaxed">
              You need statutory citations and IRAC legal reasoning over Indian penal laws, police FIRs, charge sheets, and judicial precedents.
            </p>
            <Link href="/docs/nyaya/introduction" className="mt-4 block text-xs font-semibold text-[var(--accent)] hover:underline">
              Nyaya Docs →
            </Link>
          </div>
        </div>
      </section>
    </DocPageWrapper>
  );
}
