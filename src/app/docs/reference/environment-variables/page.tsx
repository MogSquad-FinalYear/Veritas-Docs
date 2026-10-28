import { DocPageWrapper } from "@/components/DocPageWrapper";

export const metadata = {
  title: "Environment Variables Master Reference",
  description: "Complete list of environment variables, defaults, and descriptions across VideoRAG, Nyaya, and AI Imagery.",
};

const toc = [
  { id: "videorag-vars", title: "VideoRAG Environment Variables", level: 2 as const },
  { id: "nyaya-vars", title: "Nyaya Environment Variables", level: 2 as const },
  { id: "docs-vars", title: "Veritas Docs Portal Variables", level: 2 as const },
];

export default function MasterEnvVarsPage() {
  return (
    <DocPageWrapper
      title="Environment Variables"
      description="Consolidated master reference of all environment flags, model names, and file path parameters across the Veritas platform."
      badge="Configuration Reference"
      toc={toc}
    >
      <section id="videorag-vars" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          VideoRAG Environment Variables
        </h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] my-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[var(--sidebar-bg)] border-b border-[var(--border-color)] font-semibold text-[var(--foreground)]">
                <th className="p-3">Variable</th>
                <th className="p-3">Default Value</th>
                <th className="p-3">Type</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--muted-text)] font-mono">
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">GROQ_API_KEY</td>
                <td className="p-3 italic">None</td>
                <td className="p-3">String</td>
                <td className="p-3 font-sans">API key for Groq Cloud. Enables agentic query planning and LLM answer synthesis.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">GROQ_MODEL</td>
                <td className="p-3">llama-3.3-70b-versatile</td>
                <td className="p-3">String</td>
                <td className="p-3 font-sans">Groq model identifier for query decomposition and evidence merge.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">HF_TOKEN</td>
                <td className="p-3 italic">None</td>
                <td className="p-3">String</td>
                <td className="p-3 font-sans">Hugging Face token for accessing gated pyannote speaker diarization models.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">WHISPER_MODEL</td>
                <td className="p-3">tiny</td>
                <td className="p-3">String</td>
                <td className="p-3 font-sans">OpenAI Whisper checkpoint for speech-to-text transcription.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">CLIP_MODEL</td>
                <td className="p-3">ViT-B-32</td>
                <td className="p-3">String</td>
                <td className="p-3 font-sans">OpenCLIP visual and text encoder architecture.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">CLIP_PRETRAINED</td>
                <td className="p-3">laion2b_s34b_b79k</td>
                <td className="p-3">String</td>
                <td className="p-3 font-sans">Pretrained weights checkpoint for OpenCLIP encoder.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">FRAME_SAMPLE_FPS</td>
                <td className="p-3">1</td>
                <td className="p-3">Integer</td>
                <td className="p-3 font-sans">Target frame rate for video sampling.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">MAX_FRAMES_PER_VIDEO</td>
                <td className="p-3">300</td>
                <td className="p-3">Integer</td>
                <td className="p-3 font-sans">Ceiling on extracted scene frames per ingested video file.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">CAPTION_MODE</td>
                <td className="p-3">sync</td>
                <td className="p-3">String</td>
                <td className="p-3 font-sans">Caption execution strategy: <code className="font-mono text-xs">sync</code>, <code className="font-mono text-xs">async</code>, or <code className="font-mono text-xs">off</code>.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="nyaya-vars" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Nyaya Environment Variables
        </h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] my-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[var(--sidebar-bg)] border-b border-[var(--border-color)] font-semibold text-[var(--foreground)]">
                <th className="p-3">Variable</th>
                <th className="p-3">Default Value</th>
                <th className="p-3">Type</th>
                <th className="p-3">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--muted-text)] font-mono">
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">OLLAMA_BASE_URL</td>
                <td className="p-3">http://localhost:11434</td>
                <td className="p-3">String</td>
                <td className="p-3 font-sans">Base HTTP URL of the local running Ollama instance.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">OLLAMA_MODEL_REASONING</td>
                <td className="p-3">qwen2.5:14b</td>
                <td className="p-3">String</td>
                <td className="p-3 font-sans">Primary Ollama model for IRAC legal synthesis and precedent application.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">OLLAMA_MODEL_EXTRACTION</td>
                <td className="p-3">qwen2.5:3b</td>
                <td className="p-3">String</td>
                <td className="p-3 font-sans">Fast Ollama model for query parsing and FIR date extraction.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">QDRANT_PATH</td>
                <td className="p-3">../rag/qdrant_db</td>
                <td className="p-3">Path</td>
                <td className="p-3 font-sans">Directory containing local Qdrant statutory vectors.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">NEXT_PUBLIC_API_URL</td>
                <td className="p-3">http://localhost:8000</td>
                <td className="p-3">String</td>
                <td className="p-3 font-sans">FastAPI backend URL accessed by the Next.js chat frontend.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocPageWrapper>
  );
}
