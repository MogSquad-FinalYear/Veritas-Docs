import { DocPageWrapper } from "@/components/DocPageWrapper";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";

export const metadata = {
  title: "How Veritas Works",
  description: "End-to-end evidence pipelines across frequency routing, video ingestion, and legal RAG.",
};

const toc = [
  { id: "evidence-journey", title: "The Evidentiary Life Cycle", level: 2 as const },
  { id: "image-workflow", title: "Workflow 1: Synthetic Image Forensics", level: 2 as const },
  { id: "video-workflow", title: "Workflow 2: Forensic Video Analysis", level: 2 as const },
  { id: "legal-workflow", title: "Workflow 3: Statutory Legal Q&A", level: 2 as const },
];

export default function HowItWorksPage() {
  return (
    <DocPageWrapper
      title="How Veritas Works"
      description="An end-to-end technical walkthrough of how data moves through Veritas's three specialized verification pipelines."
      badge="Workflows"
      toc={toc}
    >
      <section id="evidence-journey" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          The Evidentiary Life Cycle
        </h2>
        <p>
          Regardless of the modality—whether inspecting a single JPEG photograph, indexing an hour-long courtroom deposition video, or researching statutory penal provisions—Veritas follows a strict evidentiary lifecycle:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 my-6 text-center text-xs">
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-3">
            <span className="font-mono text-[10px] text-[var(--subtle-text)] font-bold">STAGE 01</span>
            <p className="mt-1 font-bold text-[var(--foreground)]">Ingest &amp; Audit</p>
            <p className="mt-1 text-[11px] text-[var(--muted-text)]">Format verification, metadata parsing, and compression check</p>
          </div>
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-3">
            <span className="font-mono text-[10px] text-[var(--subtle-text)] font-bold">STAGE 02</span>
            <p className="mt-1 font-bold text-[var(--foreground)]">Feature Indexing</p>
            <p className="mt-1 text-[11px] text-[var(--muted-text)]">2D FFT, OpenCLIP vectors, Whisper ASR, and BM25 lexicons</p>
          </div>
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-3">
            <span className="font-mono text-[10px] text-[var(--subtle-text)] font-bold">STAGE 03</span>
            <p className="mt-1 font-bold text-[var(--foreground)]">Targeted Routing</p>
            <p className="mt-1 text-[11px] text-[var(--muted-text)]">Dynamic model dispatch &amp; multimodal agent query plans</p>
          </div>
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-3">
            <span className="font-mono text-[10px] text-[var(--subtle-text)] font-bold">STAGE 04</span>
            <p className="mt-1 font-bold text-[var(--foreground)]">Verified Grounding</p>
            <p className="mt-1 text-[11px] text-[var(--muted-text)]">Calibrated confidence, SHA-256 clips, and IRAC citations</p>
          </div>
        </div>
      </section>

      <section id="image-workflow" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Workflow 1: Synthetic Image Forensics
        </h2>
        <p>
          When an image is submitted for AI detection:
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-[var(--muted-text)]">
          <li>
            <strong className="text-[var(--foreground)]">Frequency Decomposition:</strong> A 2D Fast Fourier Transform (FFT) computes the log-magnitude spectral energy across concentric frequency radii.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Spectral Profiling:</strong> Modern Diffusion Transformers (like FLUX.1 and SD3) exhibit distinct spectral signatures compared to GANs. SD3 exhibits an anomalous <code className="font-mono text-xs">+15.1%</code> high-frequency energy deviation, while BigGAN exhibits <code className="font-mono text-xs">-283.5%</code>.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Dynamic Routing:</strong> Rather than relying on a single detector that collapses on unseen architectures, the router selects the specialist model whose training lineage matches the generator&apos;s frequency profile.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Calibration &amp; Robustness:</strong> The system computes the Expected Calibration Error (ECE) and warns if JPEG re-encoding artifacts threaten detector discriminability.
          </li>
        </ol>

        <ArchitectureDiagram type="imagery" caption="AI Imagery Detection Pipeline: Spectral decomposition and specialist routing." />
      </section>

      <section id="video-workflow" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Workflow 2: Forensic Video Analysis
        </h2>
        <p>
          Courtroom video analysis in VideoRAG operates across multiple modalities in parallel:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--muted-text)]">
          <li>
            <strong className="text-[var(--foreground)]">Adaptive Sampling:</strong> OpenCV extracts scene changes at 1 FPS (capped at 300 frames per video) to eliminate redundancy.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Parallel Embedding:</strong> Frames are embedded with OpenCLIP ViT-B-32; audio is transcribed into timestamped segments with Whisper; on-screen text is extracted every 3 frames with EasyOCR; object bounding boxes are detected every 2 frames with YOLOv8.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Agentic Query Planning:</strong> When a user asks a question, an LLM decomposes the prompt into targeted sub-queries across speech, visual, OCR, detection, and contradiction tools.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Audit Verification:</strong> The synthesis engine returns playable video clips alongside SHA-256 evidence hashes and citation verification logs in <code className="font-mono text-xs">citations.db</code>.
          </li>
        </ul>

        <ArchitectureDiagram type="videorag" caption="VideoRAG ingestion and multimodal query resolution workflow." />
      </section>

      <section id="legal-workflow" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Workflow 3: Statutory Legal Q&amp;A
        </h2>
        <p>
          Nyaya provides citation-grounded answers over Indian penal statutes:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--muted-text)]">
          <li>
            <strong className="text-[var(--foreground)]">Hybrid Retrieval:</strong> The query is embedded via Qdrant for semantic similarity and matched via BM25 for precise statutory section numbers (e.g. &ldquo;Section 302 IPC&rdquo; vs &ldquo;Section 103 BNS&rdquo;).
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Temporal Filtering:</strong> If the offense occurred prior to July 1, 2024, colonial laws (IPC 1860, CrPC 1973) apply; subsequent offenses are routed to the Bharatiya Nyaya Sanhita (BNS 2023) and BNSS.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Case Document Fusion:</strong> Uploaded FIRs, charge sheets, and witness statements are fused into the context window.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">IRAC Formulation:</strong> Answers are synthesized using local Ollama models following the judicial Issue, Rule, Application, and Conclusion standard.
          </li>
        </ul>

        <ArchitectureDiagram type="nyaya" caption="Nyaya Legal RAG workflow: Hybrid retrieval, temporal routing, and IRAC synthesis." />
      </section>
    </DocPageWrapper>
  );
}
