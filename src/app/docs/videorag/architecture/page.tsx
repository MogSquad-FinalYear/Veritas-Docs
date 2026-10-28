import { DocPageWrapper } from "@/components/DocPageWrapper";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata = {
  title: "VideoRAG Architecture & Data Flow",
  description: "Comprehensive backend, frontend, service, and storage architecture for VideoRAG.",
};

const toc = [
  { id: "backend-routing", title: "Backend Core & Routers", level: 2 as const },
  { id: "service-layer", title: "Backend Service Layer", level: 2 as const },
  { id: "storage-layout", title: "Storage Layout & Schemas", level: 2 as const },
  { id: "frontend-architecture", title: "Frontend Forensic Dashboard", level: 2 as const },
];

export default function VideoRAGArchitecturePage() {
  return (
    <DocPageWrapper
      title="Architecture &amp; Data Flow"
      description="The end-to-end full-stack software architecture of VideoRAG: routers, background task daemon, local vector collections, and relational stores."
      badge="VideoRAG"
      toc={toc}
    >
      <section id="backend-routing" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Backend Core &amp; Routers
        </h2>
        <p>
          VideoRAG&apos;s backend is structured as an asynchronous FastAPI 0.115.6 application with modular API routers:
        </p>

        <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] my-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[var(--sidebar-bg)] border-b border-[var(--border-color)] font-semibold text-[var(--foreground)]">
                <th className="p-3">Router Module</th>
                <th className="p-3">Primary Responsibility</th>
                <th className="p-3">Mounted Endpoints</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--muted-text)]">
              <tr>
                <td className="p-3 font-mono font-semibold text-[var(--foreground)]">backend/main.py</td>
                <td className="p-3">FastAPI app initialization, CORS middleware, static mounts for <code className="font-mono text-xs">/frames</code> &amp; <code className="font-mono text-xs">/video-files</code></td>
                <td className="p-3 font-mono">GET /, GET /health</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-[var(--foreground)]">routers/execute.py</td>
                <td className="p-3">Chunked 1 MiB streaming upload, daemon ingestion trigger, cascading video deletion</td>
                <td className="p-3 font-mono">POST /execute, DELETE /videos/{`{id}`}</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-[var(--foreground)]">routers/status.py</td>
                <td className="p-3">In-memory task progress polling (extracting, indexing, complete, failed)</td>
                <td className="p-3 font-mono">GET /status/{`{task_id}`}</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-[var(--foreground)]">routers/chat.py</td>
                <td className="p-3">Natural-language question answering, reference-image queries, agent dictionary conversion</td>
                <td className="p-3 font-mono">POST /chat, POST /chat/image</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-[var(--foreground)]">routers/videos.py</td>
                <td className="p-3">Evidence library metadata, byte-range friendly video streaming redirect</td>
                <td className="p-3 font-mono">GET /videos, GET /videos/{`{id}`}/play</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-[var(--foreground)]">routers/speakers.py</td>
                <td className="p-3">Role mappings, pending voiceprint matches, human confirmation &amp; renaming</td>
                <td className="p-3 font-mono">GET/POST /videos/{`{id}`}/speakers, /cases/...</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-[var(--foreground)]">routers/testimony.py</td>
                <td className="p-3">Case statement ledger and cross-session contradiction retrieval</td>
                <td className="p-3 font-mono">GET /cases/{`{id}`}/testimony, /contradictions</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="service-layer" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Backend Service Layer
        </h2>
        <p>
          Heavy machine learning logic is encapsulated within reusable services in <code className="font-mono text-xs">backend/services/</code>:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-[var(--muted-text)]">
          <li><code className="font-mono text-xs text-[var(--foreground)]">video_processor.py</code>: Metadata extraction via OpenCV, adaptive frame sampling, audio track extraction via FFmpeg.</li>
          <li><code className="font-mono text-xs text-[var(--foreground)]">embedding_service.py</code>: Lazy-loaded OpenCLIP ViT-B-32 encoder for text, image, and batch embeddings.</li>
          <li><code className="font-mono text-xs text-[var(--foreground)]">captioning_service.py</code>: BLIP base image captioning and detailed frame descriptions.</li>
          <li><code className="font-mono text-xs text-[var(--foreground)]">transcription_service.py</code>: Lazy-loaded OpenAI Whisper for timestamped speech-to-text.</li>
          <li><code className="font-mono text-xs text-[var(--foreground)]">indexing_service.py</code>: Persistent ChromaDB collection management, similarity queries, and cascading document deletion.</li>
          <li><code className="font-mono text-xs text-[var(--foreground)]">ocr_service.py</code>: Strided EasyOCR extraction of on-screen text and bounding boxes.</li>
          <li><code className="font-mono text-xs text-[var(--foreground)]">detection_service.py</code> &amp; <code className="font-mono text-xs text-[var(--foreground)]">scene_graph_service.py</code>: Strided YOLOv8 object detection and rule-based spatial relation derivation.</li>
          <li><code className="font-mono text-xs text-[var(--foreground)]">speaker_service.py</code>: pyannote diarization, Resemblyzer voiceprints, and case speaker registry.</li>
          <li><code className="font-mono text-xs text-[var(--foreground)]">citation_service.py</code>: Timestamp extraction, evidence gathering, LLM verification, and SHA-256 evidence hashing.</li>
        </ul>
      </section>

      <section id="storage-layout" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Storage Layout &amp; Schemas
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          All ingested data, media artifacts, vectors, and relational tables are organized on disk under <code className="font-mono text-xs">data/</code>:
        </p>

        <CodeBlock
          filename="Storage Layout on Host"
          language="text"
          code={`data/
├── videos/                 # Uploaded raw MP4/AVI/MKV files
├── frames/<video_id>/      # Sampled JPEG frames (<video_id>_<timestamp_ms>.jpg)
├── audio/<video_id>.wav    # Extracted mono 16kHz WAV audio
├── metadata/<video_id>.json# Resolution, duration, FPS, and frame count
├── chromadb/               # Persistent ChromaDB collections
│   ├── image_index         # OpenCLIP visual embeddings
│   ├── caption_index_clip  # BLIP scene captions embedded with CLIP
│   ├── speech_index_clip   # Whisper speech segments embedded with CLIP
│   └── ocr_index           # EasyOCR on-screen text embedded with CLIP
├── detections.db           # SQLite: detections + scene_graph spatial relations
├── testimony.db            # SQLite: statements, contradictions, speaker voiceprints
└── citations.db            # SQLite: citation verification audit log + SHA-256 clip hashes`}
        />
      </section>

      <section id="frontend-architecture" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Frontend Forensic Dashboard
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          The frontend is a lightweight React 19 single-page application built with Vite 8 and plain CSS:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-[var(--muted-text)]">
          <li><strong>Sidebar:</strong> Evidence library, active video filter, case badges, upload modal trigger, and delete action.</li>
          <li><strong>UploadModal:</strong> Drag-and-drop file validation, 500 MiB client limit, case ID tagging, and upload progress polling.</li>
          <li><strong>ChatWindow:</strong> Text and reference-image query composer, scoped video queries, and message history.</li>
          <li><strong>VideoPlayer:</strong> Selected clip playback, timeline seeking, sub-second timestamp display, and extracted frame carousel.</li>
          <li><strong>CasePanel:</strong> Human-in-the-loop speaker confirmation, courtroom role assignment (Judge, Witness, Prosecutor), cross-session testimony list, and contradiction review.</li>
        </ul>
      </section>
    </DocPageWrapper>
  );
}
