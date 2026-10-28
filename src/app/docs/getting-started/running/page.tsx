import { DocPageWrapper } from "@/components/DocPageWrapper";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export const metadata = {
  title: "Running Veritas Modules",
  description: "Commands and procedures to start VideoRAG, Nyaya, and AI Imagery services.",
};

const toc = [
  { id: "running-videorag", title: "Running VideoRAG", level: 2 as const },
  { id: "running-nyaya", title: "Running Nyaya Legal RAG", level: 2 as const },
  { id: "running-imagery", title: "Running AI Imagery Detection", level: 2 as const },
  { id: "verifying-health", title: "Verifying Service Health", level: 2 as const },
];

export default function RunningPage() {
  return (
    <DocPageWrapper
      title="Running the Applications"
      description="Step-by-step commands to launch backend APIs, background ingestion workers, and interactive chat dashboards."
      badge="Operations"
      toc={toc}
    >
      <section id="running-videorag" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Running VideoRAG
        </h2>
        <p>
          VideoRAG requires two terminal processes: the FastAPI backend and the Vite frontend.
        </p>

        <h3 className="text-sm font-bold text-[var(--foreground)] mt-4">Terminal 1: FastAPI Backend</h3>
        <CodeBlock
          filename="Start VideoRAG Backend"
          language="bash"
          code={`cd VideoRAG
source .venv/bin/activate
python -m uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload`}
        />

        <h3 className="text-sm font-bold text-[var(--foreground)] mt-4">Terminal 2: React Forensic Dashboard</h3>
        <CodeBlock
          filename="Start VideoRAG Frontend"
          language="bash"
          code={`cd VideoRAG/frontend
npm run dev`}
        />
        <p className="text-xs text-[var(--muted-text)]">
          Open <a href="http://localhost:5173" target="_blank" rel="noreferrer" className="text-[var(--accent)] underline font-mono">http://localhost:5173</a> in your browser. The Vite proxy forwards API routes (<code className="font-mono text-xs">/execute</code>, <code className="font-mono text-xs">/chat</code>, <code className="font-mono text-xs">/videos</code>) to port 8000.
        </p>
      </section>

      <section id="running-nyaya" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Running Nyaya Legal RAG
        </h2>
        <p>
          Nyaya requires Ollama running in the background, followed by the FastAPI service and Next.js frontend.
        </p>

        <h3 className="text-sm font-bold text-[var(--foreground)] mt-4">Step 1: Ensure Ollama is Active</h3>
        <CodeBlock
          filename="Verify Ollama"
          language="bash"
          code={`ollama serve
# In another tab, confirm models are present
ollama list  # Should list qwen2.5:3b and qwen2.5:14b`}
        />

        <h3 className="text-sm font-bold text-[var(--foreground)] mt-4">Step 2: Start Nyaya Backend</h3>
        <CodeBlock
          filename="Start Nyaya FastAPI Backend"
          language="bash"
          code={`cd nyaya/backend
source .venv/bin/activate
uvicorn app.main:app --reload --port 8000`}
        />

        <h3 className="text-sm font-bold text-[var(--foreground)] mt-4">Step 3: Start Nyaya Next.js Frontend</h3>
        <CodeBlock
          filename="Start Nyaya Chat Frontend"
          language="bash"
          code={`cd nyaya/frontend
npm run dev`}
        />
        <p className="text-xs text-[var(--muted-text)]">
          Access the Nyaya courtroom chat UI at <a href="http://localhost:3000" target="_blank" rel="noreferrer" className="text-[var(--accent)] underline font-mono">http://localhost:3000</a>.
        </p>
      </section>

      <section id="running-imagery" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Running AI Imagery Detection
        </h2>
        <p>
          Execute batch evaluation or individual image classification via the PyTorch inference harness:
        </p>
        <CodeBlock
          filename="Run Image Detection Inference"
          language="bash"
          code={`cd AI-Imagery-Detection
source .venv/bin/activate

# Classify an image with frequency routing across specialist detectors
python -m src.infer --image path/to/suspect_image.png --router-profile auto

# Run cross-generator benchmark evaluation
python -m src.evaluate --dataset GenImage++ --generators flux,sd3,sdxl,biggan,glide`}
        />
      </section>

      <section id="verifying-health" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Verifying Service Health
        </h2>
        <p>
          You can test whether backend services are operational using standard cURL commands:
        </p>
        <CodeBlock
          filename="Check Backend Health"
          language="bash"
          code={`# Check VideoRAG Health
curl -s http://localhost:8000/health | jq .

# Check Nyaya Readiness (wait until status: "ready")
curl -s http://localhost:8000/api/health | jq .`}
        />

        <Callout type="note" title="Nyaya Initial Loading">
          Model loading in Nyaya happens once in the background during initial startup. Wait until <code className="font-mono text-xs">/api/health</code> returns <code className="font-mono text-xs">&quot;status&quot;: &quot;ready&quot;</code> before submitting queries.
        </Callout>
      </section>
    </DocPageWrapper>
  );
}
