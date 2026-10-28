import { DocPageWrapper } from "@/components/DocPageWrapper";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata = {
  title: "VideoRAG Configuration & Environment",
  description: "Comprehensive parameters, models, flags, and directory layouts for VideoRAG.",
};

const toc = [
  { id: "environment-variables", title: "Environment Variables Reference", level: 2 as const },
  { id: "model-checkpoints", title: "Model Checkpoints & Weights", level: 2 as const },
  { id: "processing-parameters", title: "Processing & Ingestion Tunables", level: 2 as const },
];

export default function VideoRAGConfigPage() {
  return (
    <DocPageWrapper
      title="Configuration &amp; Environment"
      description="Reference manual for configuring backend/config.py, setting GPU acceleration parameters, and overriding collection schemas in VideoRAG."
      badge="VideoRAG Config"
      toc={toc}
    >
      <section id="environment-variables" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Environment Variables Reference
        </h2>
        <p>
          Environment variables can be specified in a <code className="font-mono text-xs">.env</code> file in the repository root or <code className="font-mono text-xs">backend/</code>:
        </p>

        <CodeBlock
          filename="backend/.env (Complete Template)"
          language="bash"
          code={`# LLM Reasoning Settings
GROQ_API_KEY=gsk_your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile

# Hugging Face Access (for gated pyannote diarization)
HF_TOKEN=hf_your_token_here

# Local AI Models
WHISPER_MODEL=tiny                               # options: tiny, base, small, medium, large-v3
CLIP_MODEL=ViT-B-32                              # options: ViT-B-32, ViT-L-14
CLIP_PRETRAINED=laion2b_s34b_b79k
BLIP_MODEL=Salesforce/blip-image-captioning-base
YOLO_MODEL=yolov8n.pt                            # options: yolov8n, yolov8s, yolov8m

# Ingestion Tunables
FRAME_SAMPLE_FPS=1
MAX_FRAMES_PER_VIDEO=300
CAPTION_STRIDE=3
CAPTION_MAX_FRAMES=24
CAPTION_MODE=sync                                # options: sync, async, off
CAPTION_BACKEND=blip                             # options: blip, clip
ENABLE_LLM_POLISH=false

# Port Configurations
BACKEND_PORT=8000
FRONTEND_PORT=5173

# ChromaDB Collection Names
IMAGE_COLLECTION=image_index
CAPTION_COLLECTION=caption_index_clip
SPEECH_COLLECTION=speech_index_clip
OCR_COLLECTION=ocr_index`}
        />
      </section>

      <section id="model-checkpoints" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Model Checkpoints &amp; Weights
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          All vision and audio models are lazy-loaded on initial invocation to ensure rapid service boot times:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--muted-text)]">
          <li><strong>OpenCLIP:</strong> Loads weights into GPU memory only when the first frame or text query is vectorized.</li>
          <li><strong>Whisper:</strong> Prepared with bundled FFmpeg binaries; models download automatically to <code className="font-mono text-xs">~/.cache/whisper</code>.</li>
          <li><strong>YOLOv8:</strong> Uses Ultralytics lightweight <code className="font-mono text-xs">yolov8n</code> (nano) weights (~6.2 MB) for minimal inference latency.</li>
        </ul>
      </section>

      <section id="processing-parameters" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Processing &amp; Ingestion Tunables
        </h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] my-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[var(--sidebar-bg)] border-b border-[var(--border-color)] font-semibold text-[var(--foreground)]">
                <th className="p-3">Parameter</th>
                <th className="p-3">Default</th>
                <th className="p-3">Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--muted-text)]">
              <tr>
                <td className="p-3 font-mono font-semibold text-[var(--foreground)]">MAX_FRAMES_PER_VIDEO</td>
                <td className="p-3 font-mono">300</td>
                <td className="p-3">Bounds total frame extractions. Increase for high-action videos; decrease to conserve VRAM.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-[var(--foreground)]">CAPTION_MODE</td>
                <td className="p-3 font-mono">sync</td>
                <td className="p-3">Set to <code className="font-mono text-xs">async</code> to allow chat queries immediately while BLIP captions index in the background.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-[var(--foreground)]">CAPTION_STRIDE</td>
                <td className="p-3 font-mono">3</td>
                <td className="p-3">Generates captions every Nth frame, reducing BLIP compute overhead by 66%.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocPageWrapper>
  );
}
