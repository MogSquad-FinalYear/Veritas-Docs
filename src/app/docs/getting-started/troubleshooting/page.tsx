import { DocPageWrapper } from "@/components/DocPageWrapper";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata = {
  title: "Troubleshooting Guide",
  description: "Diagnosing and fixing common runtime issues, CUDA OOM errors, package version conflicts, and vector store locks.",
};

const toc = [
  { id: "videorag-issues", title: "VideoRAG Troubleshooting", level: 2 as const },
  { id: "nyaya-issues", title: "Nyaya Troubleshooting", level: 2 as const },
  { id: "imagery-issues", title: "AI Imagery Troubleshooting", level: 2 as const },
];

export default function TroubleshootingPage() {
  return (
    <DocPageWrapper
      title="Troubleshooting"
      description="Practical debugging steps, error messages, and verified solutions for common operational hurdles."
      badge="Debugging"
      toc={toc}
    >
      <section id="videorag-issues" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          VideoRAG Troubleshooting
        </h2>

        <div className="space-y-6">
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
            <h3 className="text-sm font-bold text-[var(--foreground)]">
              Issue: Whisper installation fails with pkg_resources error
            </h3>
            <p className="mt-1 text-xs text-[var(--muted-text)]">
              Caused by recent versions of <code className="font-mono text-xs">setuptools &gt;= 81</code> removing legacy <code className="font-mono text-xs">pkg_resources</code> interfaces required by Whisper.
            </p>
            <div className="mt-3">
              <CodeBlock
                language="bash"
                code={`pip install "setuptools<81"
pip install -r backend/requirements.txt`}
              />
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
            <h3 className="text-sm font-bold text-[var(--foreground)]">
              Issue: pyannote speaker diarization falls back to silence gaps
            </h3>
            <p className="mt-1 text-xs text-[var(--muted-text)]">
              pyannote models are gated on Hugging Face. If <code className="font-mono text-xs">HF_TOKEN</code> is not set or you have not accepted user conditions for <code className="font-mono text-xs">pyannote/speaker-diarization-3.1</code>, VideoRAG logs a warning and falls back to naive audio silence gap segmentation.
            </p>
            <div className="mt-2 text-xs text-[var(--foreground)]">
              <strong>Fix:</strong> Generate a read token at <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noreferrer" className="underline">huggingface.co/settings/tokens</a>, accept the license at <code className="font-mono text-xs">pyannote/speaker-diarization-3.1</code>, and add <code className="font-mono text-xs">HF_TOKEN=hf_...</code> to <code className="font-mono text-xs">backend/.env</code>.
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
            <h3 className="text-sm font-bold text-[var(--foreground)]">
              Issue: Background ingestion status lost after backend restart
            </h3>
            <p className="mt-1 text-xs text-[var(--muted-text)]">
              The ingestion task registry is currently stored in Python process memory. If the backend is restarted during video processing, the task status is lost.
            </p>
            <div className="mt-2 text-xs text-[var(--foreground)]">
              <strong>Workaround:</strong> Re-upload the video with the same case ID. If files were already extracted, ChromaDB will upsert documents without duplication.
            </div>
          </div>
        </div>
      </section>

      <section id="nyaya-issues" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Nyaya Troubleshooting
        </h2>

        <div className="space-y-6">
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
            <h3 className="text-sm font-bold text-[var(--foreground)]">
              Issue: Backend throws FileNotFoundError for rag/ assets
            </h3>
            <p className="mt-1 text-xs text-[var(--muted-text)]">
              The backend imports <code className="font-mono text-xs">rag/</code> directly. <code className="font-mono text-xs">backend/app/config.py:bootstrap_rag()</code> automatically wires CWD-relative paths. If started from an arbitrary directory, path resolution can fail.
            </p>
            <div className="mt-3">
              <CodeBlock
                language="bash"
                code={`# Always launch from inside the backend directory:
cd nyaya/backend
uvicorn app.main:app --port 8000`}
              />
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
            <h3 className="text-sm font-bold text-[var(--foreground)]">
              Issue: Concurrent query requests hang or time out
            </h3>
            <p className="mt-1 text-xs text-[var(--muted-text)]">
              Nyaya uses an async mutex lock in <code className="font-mono text-xs">backend/app/state.py</code> to serialize synchronous model calls. Multiple concurrent queries wait in a sequential queue.
            </p>
            <div className="mt-2 text-xs text-[var(--foreground)]">
              <strong>Explanation:</strong> This is intentional by design to prevent out-of-memory GPU crashes during 14B model text generation.
            </div>
          </div>
        </div>
      </section>

      <section id="imagery-issues" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          AI Imagery Troubleshooting
        </h2>

        <div className="space-y-6">
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
            <h3 className="text-sm font-bold text-[var(--foreground)]">
              Issue: Dataset loader silently caps evaluation at 100 images
            </h3>
            <p className="mt-1 text-xs text-[var(--muted-text)]">
              The inherited GenImage dataset loader contained a silent fallback: whenever the requested sample size exceeded either class pool, it reset to a default of 100 images per class.
            </p>
            <div className="mt-2 text-xs text-[var(--foreground)]">
              <strong>Verified Fix:</strong> Always verify test sample counts in evaluation logs. All numbers reported in Veritas documentation are derived from full-data reruns (<code className="font-mono text-xs">n = 6,000</code> to <code className="font-mono text-xs">18,300</code> images per class).
            </div>
          </div>

          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
            <h3 className="text-sm font-bold text-[var(--foreground)]">
              Issue: ResNet-50 normalization discrepancy
            </h3>
            <p className="mt-1 text-xs text-[var(--muted-text)]">
              The GenImage++ released code and source paper disagreed on input normalization: code routed all detectors through CLIP statistics, whereas the paper specified ImageNet statistics.
            </p>
            <div className="mt-2 text-xs text-[var(--foreground)]">
              <strong>Resolution:</strong> Measuring both on a 150-image FLUX.1 probe showed ImageNet statistics performed better (85.3% vs 80.7% fake accuracy). Veritas uses ImageNet statistics for ResNet-50.
            </div>
          </div>
        </div>
      </section>
    </DocPageWrapper>
  );
}
