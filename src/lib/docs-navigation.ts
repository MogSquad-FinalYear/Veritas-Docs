export interface NavItem {
  title: string;
  href: string;
  description?: string;
  badge?: string;
}

export interface NavSection {
  title: string;
  slug: string;
  items: NavItem[];
}

export const DOCS_NAVIGATION: NavSection[] = [
  {
    title: "Overview",
    slug: "overview",
    items: [
      {
        title: "Introduction",
        href: "/docs/overview/introduction",
        description: "Welcome to Veritas: Multi-modal AI forensics and statutory legal reasoning.",
      },
      {
        title: "Veritas Architecture",
        href: "/docs/overview/architecture",
        description: "High-level architectural layout and separation of concerns across modules.",
      },
      {
        title: "How Veritas Works",
        href: "/docs/overview/how-it-works",
        description: "End-to-end evidence ingestion, frequency routing, and citation synthesis.",
      },
      {
        title: "Module Overview",
        href: "/docs/overview/modules",
        description: "Comparative matrix of AI Imagery Detection, VideoRAG, and Nyaya.",
      },
    ],
  },
  {
    title: "Getting Started",
    slug: "getting-started",
    items: [
      {
        title: "Prerequisites",
        href: "/docs/getting-started/prerequisites",
        description: "Hardware specifications, Python 3.10+, Node.js, Ollama, and models.",
      },
      {
        title: "Installation & Setup",
        href: "/docs/getting-started/installation",
        description: "Step-by-step setup for backend, frontend, and offline vector databases.",
      },
      {
        title: "Configuration",
        href: "/docs/getting-started/configuration",
        description: "Environment variables, model weights, and API keys for all services.",
      },
      {
        title: "Running the Application",
        href: "/docs/getting-started/running",
        description: "Commands to launch FastAPI services, Next.js portals, and vector DBs.",
      },
      {
        title: "Troubleshooting",
        href: "/docs/getting-started/troubleshooting",
        description: "Resolving CUDA OOM, Whisper/FFmpeg issues, and Qdrant lock errors.",
      },
    ],
  },
  {
    title: "AI Imagery Detection",
    slug: "imagery",
    items: [
      {
        title: "Introduction",
        href: "/docs/imagery/introduction",
        description: "Frequency-aware AI generation detection and cross-generator audit.",
      },
      {
        title: "Architecture & Pipeline",
        href: "/docs/imagery/architecture",
        description: "FFT decomposition, frequency filtering, and detector routing workflow.",
      },
      {
        title: "Frequency-Based Routing",
        href: "/docs/imagery/frequency-routing",
        description: "High-frequency spectral deviations across GAN, U-Net, and DiT generators.",
      },
      {
        title: "Specialist Detectors",
        href: "/docs/imagery/detectors",
        description: "Deep dive into UniversalFakeDetect, NPR, ResNet-50, CLIP, and CLIP-LoRA (OMAT).",
      },
      {
        title: "Evaluation & Benchmarks",
        href: "/docs/imagery/evaluation",
        description: "Empirical results across BigGAN, GLIDE, FLUX.1, SD3, and SDXL with paired McNemar tests.",
      },
      {
        title: "Preprocessing & Robustness",
        href: "/docs/imagery/preprocessing-and-robustness",
        description: "Resize hazards, JPEG-75 compression collapse, and PNG vs JPEG confound.",
      },
      {
        title: "Limitations & Ethics",
        href: "/docs/imagery/limitations",
        description: "Calibration errors, non-generalizability, and dual-use ethical considerations.",
      },
      {
        title: "References & Licenses",
        href: "/docs/imagery/references",
        description: "Primary citations from CVPR, NeurIPS, and benchmark source repositories.",
      },
    ],
  },
  {
    title: "VideoRAG",
    slug: "videorag",
    items: [
      {
        title: "Introduction",
        href: "/docs/videorag/introduction",
        description: "Multimodal retrieval-augmented generation for courtroom video evidence.",
      },
      {
        title: "Architecture & Data Flow",
        href: "/docs/videorag/architecture",
        description: "Decoupled pipeline: Ingestion daemon, ChromaDB vectors, SQLite, and Groq agent.",
      },
      {
        title: "Video Ingestion Pipeline",
        href: "/docs/videorag/ingestion",
        description: "Adaptive scene-change sampling, OpenCLIP batch embeddings, EasyOCR, and YOLOv8.",
      },
      {
        title: "Multimodal Retrieval & Indexing",
        href: "/docs/videorag/retrieval",
        description: "ChromaDB collections for image, caption, speech, and OCR embeddings.",
      },
      {
        title: "Question Answering & Synthesis",
        href: "/docs/videorag/question-answering",
        description: "Agentic query decomposition, parallel multi-index queries, and local fallback synthesis.",
      },
      {
        title: "Timestamp Grounding & Citations",
        href: "/docs/videorag/citations",
        description: "Sub-second timestamp extraction, LLM citation verification, and SHA-256 clip hashing.",
      },
      {
        title: "Speaker Analysis & Testimony",
        href: "/docs/videorag/speakers-testimony",
        description: "pyannote diarization, Resemblyzer voiceprints, cross-session contradiction engine.",
      },
      {
        title: "API Reference",
        href: "/docs/videorag/api",
        description: "Complete REST API reference for /execute, /status, /chat, /videos, and /cases.",
      },
      {
        title: "Configuration & Environment",
        href: "/docs/videorag/configuration",
        description: "Environment flags, model checkpoints, caption modes, and storage layout.",
      },
      {
        title: "Evaluation & Limitations",
        href: "/docs/videorag/evaluation",
        description: "Seven production evaluations, memory task limits, and courtroom disclaimer.",
      },
    ],
  },
  {
    title: "Nyaya Legal RAG",
    slug: "nyaya",
    items: [
      {
        title: "Introduction",
        href: "/docs/nyaya/introduction",
        description: "Citation-grounded legal Q&A over Indian statutory codes and judicial precedents.",
      },
      {
        title: "Architecture & Components",
        href: "/docs/nyaya/architecture",
        description: "RAG pipeline, FastAPI backend with thread serialization, and Next.js frontend.",
      },
      {
        title: "Hybrid Retrieval & Reranking",
        href: "/docs/nyaya/retrieval",
        description: "Dense Qdrant vector search fused with sparse BM25 keyword matching.",
      },
      {
        title: "Legal Generation & IRAC",
        href: "/docs/nyaya/generation",
        description: "Issue, Rule, Application, Conclusion framework with strict statutory citation grounding.",
      },
      {
        title: "Temporal Validity Filtering",
        href: "/docs/nyaya/temporal-filtering",
        description: "Transition logic between colonial penal codes (IPC/CrPC) and modern codes (BNS/BNSS/BSA).",
      },
      {
        title: "Case Document Integration",
        href: "/docs/nyaya/case-documents",
        description: "Fusing FIRs, charge sheets, witness statements, and trial evidentiary documents.",
      },
      {
        title: "API Reference",
        href: "/docs/nyaya/api",
        description: "REST API endpoints: POST /api/query, POST /api/cases/upload, and GET /api/health.",
      },
      {
        title: "Configuration & Indexes",
        href: "/docs/nyaya/configuration",
        description: "Qdrant collections, local Ollama models (qwen2.5:3b/14b), and environment parameters.",
      },
      {
        title: "Limitations & Legal Disclaimer",
        href: "/docs/nyaya/limitations",
        description: "Statutory boundaries, non-replacement of legal counsel, and hallucination safeguards.",
      },
    ],
  },
  {
    title: "Reference",
    slug: "reference",
    items: [
      {
        title: "API Overview",
        href: "/docs/reference/api",
        description: "Consolidated API contracts for VideoRAG and Nyaya FastAPI endpoints.",
      },
      {
        title: "Environment Variables",
        href: "/docs/reference/environment-variables",
        description: "All environment configurations across VideoRAG, Nyaya, and AI Imagery.",
      },
      {
        title: "Technology Stack",
        href: "/docs/reference/tech-stack",
        description: "Comprehensive software bill of materials and library dependencies.",
      },
      {
        title: "Repository Structure",
        href: "/docs/reference/repo-structure",
        description: "Directory tree and component breakdown across all modules.",
      },
      {
        title: "Research & Citations",
        href: "/docs/reference/research",
        description: "Academic publications, benchmark datasets, and formal citations.",
      },
    ],
  },
];

// Flat array of all navigation items for previous/next navigation
export const ALL_DOCS_ITEMS: (NavItem & { sectionTitle: string; sectionSlug: string })[] =
  DOCS_NAVIGATION.flatMap((section) =>
    section.items.map((item) => ({
      ...item,
      sectionTitle: section.title,
      sectionSlug: section.slug,
    }))
  );

export function getPrevNextDocs(currentPath: string) {
  const currentIndex = ALL_DOCS_ITEMS.findIndex((item) => item.href === currentPath);
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }
  const prev = currentIndex > 0 ? ALL_DOCS_ITEMS[currentIndex - 1] : null;
  const next = currentIndex < ALL_DOCS_ITEMS.length - 1 ? ALL_DOCS_ITEMS[currentIndex + 1] : null;
  return { prev, next };
}

export function getBreadcrumbs(currentPath: string) {
  for (const section of DOCS_NAVIGATION) {
    const item = section.items.find((i) => i.href === currentPath);
    if (item) {
      return [
        { title: "Docs", href: "/docs/overview/introduction" },
        { title: section.title, href: section.items[0].href },
        { title: item.title, href: item.href },
      ];
    }
  }
  return [
    { title: "Docs", href: "/docs/overview/introduction" },
    { title: "Overview", href: "/docs/overview/introduction" },
  ];
}
