export interface SearchEntry {
  id: string;
  title: string;
  section: string;
  href: string;
  content: string;
  keywords: string[];
}

export const SEARCH_INDEX: SearchEntry[] = [
  // Overview
  {
    id: "overview-intro",
    title: "Introduction to Veritas",
    section: "Overview",
    href: "/docs/overview/introduction",
    content: "Veritas is a specialized developer platform uniting three core AI intelligence engines: AI Imagery Detection, VideoRAG multimodal forensic video analysis, and Nyaya Indian legal RAG.",
    keywords: ["veritas", "overview", "introduction", "forensics", "modules", "detection", "legal"],
  },
  {
    id: "overview-arch",
    title: "Veritas Platform Architecture",
    section: "Overview",
    href: "/docs/overview/architecture",
    content: "Architectural design principles of Veritas: decoupled execution domains, local ML inference, specialized backends, and independent execution boundaries for forensic and legal safety.",
    keywords: ["architecture", "pipeline", "decoupled", "modular", "fastapi", "react", "nextjs"],
  },
  {
    id: "overview-how",
    title: "How Veritas Works",
    section: "Overview",
    href: "/docs/overview/how-it-works",
    content: "End-to-end evidence workflow: Image frequency analysis and routing, video ingestion with multi-index ChromaDB retrieval, and Indian statute citation-grounded question answering.",
    keywords: ["workflow", "data flow", "how it works", "routing", "ingestion", "retrieval", "synthesis"],
  },
  {
    id: "overview-modules",
    title: "Module Comparative Overview",
    section: "Overview",
    href: "/docs/overview/modules",
    content: "Detailed technical comparison of the three modules: AI Imagery Detection (frequency routing), VideoRAG (forensic courtroom video QA), and Nyaya (Indian legal statutory RAG).",
    keywords: ["modules", "matrix", "comparison", "imagery", "videorag", "nyaya"],
  },

  // Getting Started
  {
    id: "gs-prereq",
    title: "System Prerequisites",
    section: "Getting Started",
    href: "/docs/getting-started/prerequisites",
    content: "Hardware and software requirements: Python 3.10+, Node.js 20+, Ollama with qwen2.5 models, FFmpeg, optional NVIDIA CUDA GPU with at least 8GB VRAM.",
    keywords: ["prerequisites", "requirements", "python", "node", "ollama", "gpu", "cuda", "ffmpeg"],
  },
  {
    id: "gs-install",
    title: "Installation & Setup",
    section: "Getting Started",
    href: "/docs/getting-started/installation",
    content: "Installing VideoRAG backend, React frontend, Nyaya FastAPI backend with in-process RAG pipeline, and AI Imagery detection weights.",
    keywords: ["installation", "setup", "pip", "npm", "virtualenv", "dependencies"],
  },
  {
    id: "gs-config",
    title: "Configuration Guide",
    section: "Getting Started",
    href: "/docs/getting-started/configuration",
    content: "Configuring environment variables: GROQ_API_KEY, HF_TOKEN, OLLAMA_HOST, QDRANT_PATH, CLIP_MODEL, and CAPTION_MODE for local and cloud reasoning.",
    keywords: ["configuration", "environment", "env", "keys", "tokens", "ports", "settings"],
  },
  {
    id: "gs-running",
    title: "Running the Modules",
    section: "Getting Started",
    href: "/docs/getting-started/running",
    content: "Startup procedures: Running uvicorn for VideoRAG on port 8000, Vite frontend on port 5173, Nyaya backend on port 8000, and Next.js frontend on port 3000.",
    keywords: ["running", "uvicorn", "vite", "next dev", "startup", "commands"],
  },
  {
    id: "gs-trouble",
    title: "Troubleshooting & Common Errors",
    section: "Getting Started",
    href: "/docs/getting-started/troubleshooting",
    content: "Resolving common issues: Whisper pkg_resources error, pyannote Hugging Face token authorization, CUDA out of memory, and Qdrant lock contention.",
    keywords: ["troubleshooting", "errors", "fixes", "oom", "whisper", "pkg_resources", "locks"],
  },

  // AI Imagery Detection
  {
    id: "img-intro",
    title: "AI Imagery Detection: Introduction",
    section: "AI Imagery Detection",
    href: "/docs/imagery/introduction",
    content: "Overview of cross-generator generalization audit: Why detectors fail on modern Diffusion Transformers (FLUX.1, SD3) and how frequency routing addresses blind spots.",
    keywords: ["imagery", "ai generated images", "deepfake", "flux", "sdxl", "biggan", "glide", "sd3"],
  },
  {
    id: "img-arch",
    title: "Imagery Architecture & Pipeline",
    section: "AI Imagery Detection",
    href: "/docs/imagery/architecture",
    content: "Frequency-aware detection pipeline: 2D FFT spectral decomposition, radial energy band filtering, profile classifier, and specialized detector dispatch.",
    keywords: ["pipeline", "fft", "spectral", "router", "architecture", "preprocessing"],
  },
  {
    id: "img-routing",
    title: "Frequency-Based Routing",
    section: "AI Imagery Detection",
    href: "/docs/imagery/frequency-routing",
    content: "High-frequency spectral deviation analysis: SD3 carries +15.1% more high-frequency energy than real photos, while BigGAN (-283.5%), GLIDE (-234.3%), and FLUX.1 (-31.6%) under-produce texture.",
    keywords: ["frequency", "routing", "spectral deviation", "fft", "high frequency", "texture"],
  },
  {
    id: "img-detectors",
    title: "Specialist Image Detectors",
    section: "AI Imagery Detection",
    href: "/docs/imagery/detectors",
    content: "Five evaluated detectors: UniversalFakeDetect (CLIP ViT-L/14 + linear probe), NPR (neighboring pixel artifacts), GenImage++ ResNet-50, GenImage++ CLIP, and GenImage++ CLIP-LoRA (OMAT).",
    keywords: ["detectors", "universalfakedetect", "npr", "resnet-50", "clip-lora", "omat"],
  },
  {
    id: "img-eval",
    title: "Imagery Evaluation & Benchmarks",
    section: "AI Imagery Detection",
    href: "/docs/imagery/evaluation",
    content: "Empirical results from 12,000-image evaluation: NPR scores 97.7% fake accuracy on FLUX.1 where UniversalFakeDetect scores 7.0% (p < 10^-300 McNemar test). CLIP-LoRA achieves 98.7% mean accuracy.",
    keywords: ["evaluation", "metrics", "mcnemar", "auc", "ece", "calibration", "benchmark", "flux.1"],
  },
  {
    id: "img-prep",
    title: "Preprocessing Hazards & JPEG Robustness",
    section: "AI Imagery Detection",
    href: "/docs/imagery/preprocessing-and-robustness",
    content: "Methodological findings: Resizing to 224x224 vs native padding shifts CLIP baseline accuracy by 6x on BigGAN. Under JPEG quality 75, NPR collapses from 98.0% to 1.50% (AUC 50.63, chance level).",
    keywords: ["preprocessing", "jpeg", "compression", "robustness", "bicubic", "nearest neighbor", "confound"],
  },
  {
    id: "img-limits",
    title: "Imagery Limitations & Dual-Use Ethics",
    section: "AI Imagery Detection",
    href: "/docs/imagery/limitations",
    content: "Detectors fail confidently rather than uncertainly (ECE rises with error). No support for face reenactment or video deepfakes. Results measured on ImageNet objects, not people.",
    keywords: ["limitations", "ethics", "dual-use", "calibration", "confidence", "imagenet"],
  },
  {
    id: "img-ref",
    title: "Imagery References & Citations",
    section: "AI Imagery Detection",
    href: "/docs/imagery/references",
    content: "Academic citations for Wang et al., Zhu et al. (GenImage), Ojha et al. (UniversalFakeDetect), Tan et al. (NPR), and Zhou et al. (OMAT/GenImage++).",
    keywords: ["references", "citations", "papers", "cvpr", "neurips"],
  },

  // VideoRAG
  {
    id: "vr-intro",
    title: "VideoRAG: Introduction",
    section: "VideoRAG",
    href: "/docs/videorag/introduction",
    content: "Multimodal forensic video analysis system for legal evidence: local media processing with Whisper, OpenCLIP, EasyOCR, YOLOv8, pyannote, and Groq LLM synthesis.",
    keywords: ["videorag", "video", "forensics", "courtroom", "evidence", "timestamps"],
  },
  {
    id: "vr-arch",
    title: "VideoRAG Architecture & Data Flow",
    section: "VideoRAG",
    href: "/docs/videorag/architecture",
    content: "Full-stack system architecture: FastAPI ingestion daemon, OpenCV adaptive frame sampling, 4 ChromaDB vector collections, SQLite relational stores, and Groq synthesis agent.",
    keywords: ["architecture", "data flow", "chromadb", "sqlite", "fastapi", "groq", "diagram"],
  },
  {
    id: "vr-ingest",
    title: "Video Ingestion Pipeline",
    section: "VideoRAG",
    href: "/docs/videorag/ingestion",
    content: "Step-by-step ingestion: chunked file upload, metadata probing, scene-change adaptive frame sampling, WAV audio extraction, batch OpenCLIP embedding, EasyOCR, and YOLOv8 detections.",
    keywords: ["ingestion", "upload", "sampling", "frames", "whisper", "yolo", "ocr"],
  },
  {
    id: "vr-retrieval",
    title: "Multimodal Retrieval & Vector Indexing",
    section: "VideoRAG",
    href: "/docs/videorag/retrieval",
    content: "Four local ChromaDB vector collections: image_index, caption_index_clip, speech_index_clip, and ocr_index, plus SQLite spatial relations and object count querying.",
    keywords: ["retrieval", "indexing", "chromadb", "embeddings", "openclip", "speech", "ocr"],
  },
  {
    id: "vr-qa",
    title: "Question Answering & Agentic Synthesis",
    section: "VideoRAG",
    href: "/docs/videorag/question-answering",
    content: "Three-stage agentic workflow: JSON query decoupling via Groq llama-3.3-70b-versatile, parallel retrieval across modalities, evidence merge, and deterministic local fallback synthesis.",
    keywords: ["qa", "agent", "groq", "synthesis", "fallback", "llama-3.3-70b", "query plan"],
  },
  {
    id: "vr-citations",
    title: "Timestamp Citations & Audit Trail",
    section: "VideoRAG",
    href: "/docs/videorag/citations",
    content: "Timestamp-grounded evidence: automatic clip boundary creation, LLM citation verification against speech/caption context, and SHA-256 evidence clip hashing in citations.db.",
    keywords: ["citations", "timestamps", "sha256", "verifier", "audit log", "playable clips"],
  },
  {
    id: "vr-speakers",
    title: "Speaker Diarization & Testimony Analysis",
    section: "VideoRAG",
    href: "/docs/videorag/speakers-testimony",
    content: "pyannote.audio 3.1 speaker turns, Resemblyzer voiceprints, courtroom role tagging (Judge, Witness, Prosecutor), and cross-session CONTRADICT/ENTAIL/UNRELATED classifier.",
    keywords: ["speakers", "diarization", "voiceprints", "testimony", "contradictions", "pyannote"],
  },
  {
    id: "vr-api",
    title: "VideoRAG API Reference",
    section: "VideoRAG",
    href: "/docs/videorag/api",
    content: "REST endpoints: POST /execute, GET /status/{task_id}, GET /videos, POST /chat, POST /chat/image, GET /videos/{id}/speakers, GET /cases/{id}/testimony, and health checks.",
    keywords: ["api", "endpoints", "rest", "execute", "chat", "speakers", "testimony"],
  },
  {
    id: "vr-config",
    title: "VideoRAG Configuration & Environment",
    section: "VideoRAG",
    href: "/docs/videorag/configuration",
    content: "Configuring backend/config.py: GROQ_API_KEY, GROQ_MODEL, WHISPER_MODEL, FRAME_SAMPLE_FPS, CAPTION_MODE, and SQLite storage locations.",
    keywords: ["configuration", "env", "settings", "models", "caption_mode"],
  },
  {
    id: "vr-eval",
    title: "VideoRAG Evaluation & Limitations",
    section: "VideoRAG",
    href: "/docs/videorag/evaluation",
    content: "Seven benchmark evaluations: timestamp fidelity, multimodal recall@k, image search ROC, speaker verification EER, contradiction accuracy, citation verification, and scalability.",
    keywords: ["evaluation", "benchmarks", "limits", "scalability", "latency"],
  },

  // Nyaya Legal RAG
  {
    id: "ny-intro",
    title: "Nyaya: Introduction to Legal RAG",
    section: "Nyaya",
    href: "/docs/nyaya/introduction",
    content: "Full-stack statutory legal question answering over Indian law (IPC, CrPC, IEA, BNS, BNSS, BSA) with optional case file integration (FIRs, charge sheets, testimony).",
    keywords: ["nyaya", "legal", "rag", "indian law", "ipc", "crpc", "bns", "statute"],
  },
  {
    id: "ny-arch",
    title: "Nyaya Architecture & Components",
    section: "Nyaya",
    href: "/docs/nyaya/architecture",
    content: "Three-tier architecture: Python rag/ core library, in-process FastAPI backend with request serialization lock, and responsive Next.js courtroom chat frontend.",
    keywords: ["architecture", "rag", "fastapi", "frontend", "in-process", "locks"],
  },
  {
    id: "ny-retrieval",
    title: "Hybrid Retrieval & Reranking",
    section: "Nyaya",
    href: "/docs/nyaya/retrieval",
    content: "Dual retrieval pipeline: dense vector search using Qdrant embeddings fused with sparse lexical BM25 search, followed by legal relevance reranking.",
    keywords: ["retrieval", "hybrid", "qdrant", "bm25", "dense", "sparse", "reranking"],
  },
  {
    id: "ny-generation",
    title: "Legal Answer Generation & IRAC",
    section: "Nyaya",
    href: "/docs/nyaya/generation",
    content: "Structured legal reasoning using IRAC (Issue, Rule, Application, Conclusion) with strict citation anchoring to statutory sections and court precedents.",
    keywords: ["irac", "generation", "legal answers", "issue", "rule", "application", "conclusion"],
  },
  {
    id: "ny-temporal",
    title: "Temporal Validity Filtering",
    section: "Nyaya",
    href: "/docs/nyaya/temporal-filtering",
    content: "Handling transition between colonial laws (IPC 1860, CrPC 1973, IEA 1872) and Bharatiya Nyaya Sanhita (BNS 2023) based on the exact incident date.",
    keywords: ["temporal", "validity", "ipc", "bns", "crpc", "bnss", "date filtering"],
  },
  {
    id: "ny-case-docs",
    title: "Case Document Integration",
    section: "Nyaya",
    href: "/docs/nyaya/case-documents",
    content: "Fusing external evidentiary documents into the legal query pipeline: First Information Reports (FIRs), police charge sheets, forensic reports, and witness statements.",
    keywords: ["case documents", "fir", "charge sheet", "evidence", "fusion", "police"],
  },
  {
    id: "ny-api",
    title: "Nyaya API Reference",
    section: "Nyaya",
    href: "/docs/nyaya/api",
    content: "FastAPI endpoints: POST /api/query (natural language legal query), POST /api/cases/upload (document ingestion), and GET /api/health (model readiness status).",
    keywords: ["api", "endpoints", "query", "upload", "health", "fastapi"],
  },
  {
    id: "ny-config",
    title: "Nyaya Configuration & Models",
    section: "Nyaya",
    href: "/docs/nyaya/configuration",
    content: "Configuring Ollama local LLMs (qwen2.5:3b for extraction, qwen2.5:14b for reasoning), Qdrant vector storage path, and pre-indexed statutory data files.",
    keywords: ["configuration", "ollama", "qwen", "qdrant", "environment", "settings"],
  },
  {
    id: "ny-limits",
    title: "Nyaya Limitations & Legal Disclaimer",
    section: "Nyaya",
    href: "/docs/nyaya/limitations",
    content: "Critical operational caveats: AI-generated answers do not constitute legal advice. Boundary limits of statutory coverage, jurisdictional nuances, and hallucination guardrails.",
    keywords: ["limitations", "disclaimer", "legal advice", "statutory coverage", "hallucination"],
  },

  // Reference
  {
    id: "ref-api",
    title: "Unified API Reference",
    section: "Reference",
    href: "/docs/reference/api",
    content: "Comprehensive REST API schema for both VideoRAG (port 8000) and Nyaya (port 8000) backend services.",
    keywords: ["api", "reference", "openapi", "contracts", "schemas", "json"],
  },
  {
    id: "ref-env",
    title: "Environment Variables Reference",
    section: "Reference",
    href: "/docs/reference/environment-variables",
    content: "Master list of all environment variables across Veritas: GROQ_API_KEY, HF_TOKEN, OLLAMA_HOST, QDRANT_PATH, CLIP_MODEL, YOLO_MODEL, FRAME_SAMPLE_FPS.",
    keywords: ["environment", "variables", "env", "tokens", "paths", "flags"],
  },
  {
    id: "ref-tech",
    title: "Technology Stack Specification",
    section: "Reference",
    href: "/docs/reference/tech-stack",
    content: "Complete breakdown of languages (Python 3.10+, TypeScript), frameworks (FastAPI, React 19, Next.js 16), ML backends (PyTorch, Whisper, OpenCLIP, YOLOv8), and databases.",
    keywords: ["tech stack", "technologies", "frameworks", "libraries", "pytorch", "chromadb", "sqlite"],
  },
  {
    id: "ref-repo",
    title: "Repository Directory Structure",
    section: "Reference",
    href: "/docs/reference/repo-structure",
    content: "Annotated directory tree of the Veritas documentation portal, VideoRAG repository, Nyaya legal RAG package, and AI imagery detection modules.",
    keywords: ["repository", "tree", "structure", "folders", "files", "layout"],
  },
  {
    id: "ref-research",
    title: "Research Papers & Citations",
    section: "Reference",
    href: "/docs/reference/research",
    content: "Formal citations for the AI Imagery Detection ICMLDE 2025 paper, VideoRAG research paper, and underlying foundation models (CLIP, Whisper, BLIP, YOLOv8).",
    keywords: ["research", "papers", "citations", "bibtex", "icmlde", "academic"],
  },
];

export function searchDocs(query: string): SearchEntry[] {
  if (!query || query.trim().length === 0) return [];
  const q = query.toLowerCase().trim();
  const words = q.split(/\s+/);

  return SEARCH_INDEX.filter((entry) => {
    const titleMatch = entry.title.toLowerCase().includes(q);
    const contentMatch = entry.content.toLowerCase().includes(q);
    const sectionMatch = entry.section.toLowerCase().includes(q);
    const keywordMatch = entry.keywords.some((kw) => kw.includes(q) || words.some((w) => kw.includes(w)));
    const allWordsMatch = words.every(
      (w) =>
        entry.title.toLowerCase().includes(w) ||
        entry.content.toLowerCase().includes(w) ||
        entry.section.toLowerCase().includes(w) ||
        entry.keywords.some((kw) => kw.includes(w))
    );

    return titleMatch || contentMatch || sectionMatch || keywordMatch || allWordsMatch;
  });
}
