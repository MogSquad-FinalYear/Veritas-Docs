import { DocPageWrapper } from "@/components/DocPageWrapper";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata = {
  title: "Configuration Guide",
  description: "Environment variables, model identifiers, API keys, and pipeline flags across VideoRAG, Nyaya, and AI Imagery.",
};

const toc = [
  { id: "videorag-config", title: "VideoRAG Environment Configuration", level: 2 as const },
  { id: "nyaya-config", title: "Nyaya Environment Configuration", level: 2 as const },
  { id: "imagery-config", title: "AI Imagery Detection Configuration", level: 2 as const },
];

export default function ConfigurationPage() {
  return (
    <DocPageWrapper
      title="Configuration Guide"
      description="Detailed specification of all environment variables, processing flags, and collection schemas across the Veritas platform."
      badge="Configuration"
      toc={toc}
    >
      <section id="videorag-config" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          VideoRAG Environment Configuration
        </h2>
        <p>
          Configure VideoRAG by creating a <code className="font-mono text-xs">.env</code> file in the repository root or inside <code className="font-mono text-xs">backend/</code>:
        </p>

        <CodeBlock
          filename=".env (VideoRAG Backend)"
          language="bash"
          code={`# Required for LLM reasoning features (decomposition, synthesis, contradictions)
GROQ_API_KEY=gsk_your_groq_api_key_here

# Optional: needed for gated pyannote speaker diarization model access
HF_TOKEN=hf_your_hugging_face_token_here

# Foundation Models
GROQ_MODEL=llama-3.3-70b-versatile
WHISPER_MODEL=tiny
CLIP_MODEL=ViT-B-32
CLIP_PRETRAINED=laion2b_s34b_b79k
BLIP_MODEL=Salesforce/blip-image-captioning-base
YOLO_MODEL=yolov8n

# Processing Limits & Pipeline Settings
FRAME_SAMPLE_FPS=1
MAX_FRAMES_PER_VIDEO=300
CAPTION_STRIDE=3
CAPTION_MAX_FRAMES=24
CAPTION_MODE=sync        # options: sync | async | off
CAPTION_BACKEND=blip     # options: blip | clip
ENABLE_LLM_POLISH=false

# Ports and Persistent ChromaDB Collections
BACKEND_PORT=8000
FRONTEND_PORT=5173
IMAGE_COLLECTION=image_index
CAPTION_COLLECTION=caption_index_clip
SPEECH_COLLECTION=speech_index_clip
OCR_COLLECTION=ocr_index`}
        />

        <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] my-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[var(--sidebar-bg)] border-b border-[var(--border-color)] font-semibold text-[var(--foreground)]">
                <th className="p-3">Variable</th>
                <th className="p-3">Default</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--muted-text)]">
              <tr>
                <td className="p-3 font-mono font-semibold text-[var(--foreground)]">GROQ_API_KEY</td>
                <td className="p-3 italic">None (required for cloud LLM)</td>
                <td className="p-3">API key for Groq Cloud. If omitted, local heuristic fallbacks are used.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-[var(--foreground)]">HF_TOKEN</td>
                <td className="p-3 italic">None (optional)</td>
                <td className="p-3">Hugging Face user token with accepted terms for pyannote.audio models.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-[var(--foreground)]">CAPTION_MODE</td>
                <td className="p-3 font-mono">sync</td>
                <td className="p-3"><code className="font-mono">sync</code> generates captions during ingestion; <code className="font-mono">async</code> indexes captions in the background.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-[var(--foreground)]">MAX_FRAMES_PER_VIDEO</td>
                <td className="p-3 font-mono">300</td>
                <td className="p-3">Maximum scene-sampled frames indexed per video to prevent memory exhaustion.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="nyaya-config" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Nyaya Environment Configuration
        </h2>
        <p>
          Nyaya requires backend configuration for connecting to local Ollama and Qdrant instances:
        </p>

        <CodeBlock
          filename="backend/.env (Nyaya Backend)"
          language="bash"
          code={`# Backend Service Ports
HOST=0.0.0.0
PORT=8000
DEBUG=false

# Ollama Endpoint & Model Identifiers
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL_REASONING=qwen2.5:14b
OLLAMA_MODEL_EXTRACTION=qwen2.5:3b

# RAG & Qdrant Settings
QDRANT_PATH=../rag/qdrant_db
DATASET_PATH=../rag/data/final_dataset.json
BM25_INDEX_PATH=../rag/data/bm25_index.pkl`}
        />

        <CodeBlock
          filename="frontend/.env.local (Nyaya Frontend)"
          language="bash"
          code={`# Target FastAPI backend URL
NEXT_PUBLIC_API_URL=http://localhost:8000`}
        />
      </section>

      <section id="imagery-config" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          AI Imagery Detection Configuration
        </h2>
        <p>
          Configuration parameters for image evaluation and spectral routing:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--muted-text)]">
          <li>
            <strong className="text-[var(--foreground)]">Normalization Statistics:</strong> ResNet-50 uses ImageNet statistics (<code className="font-mono text-xs">mean=[0.485, 0.456, 0.406]</code>, <code className="font-mono text-xs">std=[0.229, 0.224, 0.225]</code>), whereas CLIP detectors use OpenAI CLIP statistics (<code className="font-mono text-xs">mean=[0.48145466, 0.4578275, 0.40821073]</code>).
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Classification Threshold:</strong> Uncalibrated evaluations set fixed threshold <code className="font-mono text-xs">τ = 0.5</code>. Calibrated evaluations output raw continuous probabilities alongside threshold warnings.
          </li>
        </ul>
      </section>
    </DocPageWrapper>
  );
}
