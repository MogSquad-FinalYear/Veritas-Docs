import { DocPageWrapper } from "@/components/DocPageWrapper";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata = {
  title: "Repository Directory Structure",
  description: "Annotated directory tree of the Veritas documentation portal, VideoRAG repository, and Nyaya codebase.",
};

const toc = [
  { id: "docs-structure", title: "1. Veritas Docs Repository Structure", level: 2 as const },
  { id: "videorag-structure", title: "2. VideoRAG Repository Structure", level: 2 as const },
  { id: "nyaya-structure", title: "3. Nyaya Legal RAG Structure", level: 2 as const },
];

export default function RepoStructurePage() {
  return (
    <DocPageWrapper
      title="Repository Structure"
      description="Annotated directory trees of the Veritas documentation codebase and the underlying AI modules."
      badge="Directory Map"
      toc={toc}
    >
      <section id="docs-structure" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          1. Veritas Docs Repository Structure
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          The Next.js 16.4.3 documentation application located in <code className="font-mono text-xs">Veritas-Docs/</code>:
        </p>

        <CodeBlock
          filename="Veritas-Docs Directory Tree"
          language="text"
          code={`Veritas-Docs/
├── package.json               # Next.js 16, React 19, Tailwind CSS v4
├── next.config.ts             # App router configuration
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with theme script & metadata
│   │   ├── page.tsx           # Veritas Documentation Hub Homepage
│   │   ├── globals.css        # Theme tokens (light/dark variables)
│   │   └── docs/
│   │       ├── layout.tsx     # Documentation shell (Header, Sidebar)
│   │       ├── overview/      # Introduction, Architecture, Modules
│   │       ├── getting-started/ # Prerequisites, Installation, Troubleshooting
│   │       ├── imagery/       # Spectral analysis, Detectors, Benchmarks
│   │       ├── videorag/      # Ingestion, Retrieval, Citations, APIs
│   │       ├── nyaya/         # Legal RAG, IRAC, Temporal filtering
│   │       └── reference/     # Consolidated APIs, Env vars, Tech stack
│   ├── components/
│   │   ├── Header.tsx         # Sticky header with Search & ThemeToggle
│   │   ├── Sidebar.tsx        # Responsive navigation tree & mobile drawer
│   │   ├── ThemeToggle.tsx    # Light/dark toggle with localStorage persistence
│   │   ├── SearchModal.tsx    # Command palette search (⌘K shortcut)
│   │   ├── TableOfContents.tsx # On this page anchor scrollspy
│   │   ├── Breadcrumbs.tsx    # Section trail navigation
│   │   ├── PrevNextNav.tsx    # Previous/Next article footer cards
│   │   ├── CodeBlock.tsx      # Copyable syntax-styled code containers
│   │   ├── Callout.tsx        # Note, Tip, Important, Warning alerts
│   │   ├── ArchitectureDiagram.tsx # Theme-adaptive visual diagrams
│   │   └── DocPageWrapper.tsx # Article layout container
│   └── lib/
│       ├── docs-navigation.ts # Centralized sitemap & breadcrumb resolver
│       └── search-index.ts    # Full-text documentation search index`}
        />
      </section>

      <section id="videorag-structure" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          2. VideoRAG Repository Structure
        </h2>
        <CodeBlock
          filename="VideoRAG Directory Tree"
          language="text"
          code={`VideoRAG/
├── backend/
│   ├── agent/                 # Query planning, tools, evidence synthesis
│   │   ├── agent.py           # 3-stage query decoupling & fallback engine
│   │   └── tools.py           # Groq-compatible JSON function definitions
│   ├── routers/               # FastAPI endpoint routers
│   │   ├── execute.py         # Chunked upload & background ingestion
│   │   ├── status.py          # In-memory progress tracking
│   │   ├── chat.py            # Text and reference-image QA endpoints
│   │   ├── videos.py          # Video library catalog & byte-range streaming
│   │   ├── speakers.py        # Speaker roles & voiceprint confirmation
│   │   └── testimony.py       # Statements & contradiction logs
│   ├── services/              # ML and storage service modules
│   │   ├── video_processor.py # OpenCV sampling & audio extraction
│   │   ├── embedding_service.py # OpenCLIP ViT-B-32 vectorizer
│   │   ├── captioning_service.py # BLIP base scene captioner
│   │   ├── transcription_service.py # Whisper timestamped ASR
│   │   ├── indexing_service.py # ChromaDB collection CRUD
│   │   ├── ocr_service.py     # EasyOCR bounding box extractor
│   │   ├── detection_service.py # YOLOv8 object detector
│   │   ├── scene_graph_service.py # Rule-based spatial relation triples
│   │   ├── speaker_service.py # pyannote diarization & Resemblyzer
│   │   ├── citation_service.py # LLM citation audit & SHA-256 clip hashing
│   │   ├── detection_db.py    # SQLite detections & scene_graph tables
│   │   ├── testimony_db.py    # SQLite statements & contradiction tables
│   │   └── citation_db.py     # SQLite citation verification audit log
│   ├── config.py              # Environment configuration loader
│   ├── main.py                # FastAPI initialization & static mounts
│   └── requirements.txt       # Locked Python dependencies
├── frontend/                  # React 19 + Vite 8 forensic dashboard
├── evaluation/                # 7 benchmark evaluation scripts & figures
└── README.md`}
        />
      </section>

      <section id="nyaya-structure" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          3. Nyaya Legal RAG Structure
        </h2>
        <CodeBlock
          filename="Nyaya Directory Tree"
          language="text"
          code={`nyaya/
├── rag/                       # Python RAG pipeline
│   ├── data/
│   │   ├── final_dataset.json # Ground-truth statutory provisions (IPC, BNS)
│   │   └── bm25_index.pkl     # Pre-built inverted lexical index
│   ├── qdrant_db/             # Local Qdrant statutory vector collection
│   └── pipeline/              # Dense retrieval, IRAC reranking, temporal logic
├── backend/                   # FastAPI HTTP service
│   ├── app/
│   │   ├── main.py            # Endpoints: /api/query, /api/cases/upload, /health
│   │   ├── config.py          # Path bootstrapping for in-process rag/ import
│   │   └── state.py           # Async concurrency lock for model serialization
│   └── requirements.txt
└── frontend/                  # Next.js courtroom chat UI`}
        />
      </section>
    </DocPageWrapper>
  );
}
