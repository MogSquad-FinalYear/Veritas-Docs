import { DocPageWrapper } from "@/components/DocPageWrapper";

export const metadata = {
  title: "Consolidated API Reference",
  description: "Unified master REST API schema across VideoRAG and Nyaya backend services.",
};

const toc = [
  { id: "videorag-api-summary", title: "VideoRAG API Endpoints (:8000)", level: 2 as const },
  { id: "nyaya-api-summary", title: "Nyaya API Endpoints (:8000)", level: 2 as const },
  { id: "common-error-codes", title: "HTTP Status & Error Contracts", level: 2 as const },
];

export default function MasterApiRefPage() {
  return (
    <DocPageWrapper
      title="Unified API Reference"
      description="Consolidated reference guide for all RESTful endpoints across the Veritas platform."
      badge="API Reference"
      toc={toc}
    >
      <section id="videorag-api-summary" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          VideoRAG API Endpoints (:8000)
        </h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] my-4">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="bg-[var(--sidebar-bg)] border-b border-[var(--border-color)] font-semibold text-[var(--foreground)] font-sans">
                <th className="p-3">Method</th>
                <th className="p-3">Route</th>
                <th className="p-3 font-sans">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--muted-text)]">
              <tr>
                <td className="p-3 font-bold text-[var(--foreground)]">GET</td>
                <td className="p-3 font-bold text-[var(--foreground)]">/health</td>
                <td className="p-3 font-sans">ChromaDB collection document counts &amp; SQLite availability</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[var(--foreground)]">POST</td>
                <td className="p-3 font-bold text-[var(--foreground)]">/execute</td>
                <td className="p-3 font-sans">Multipart upload video; kicks off daemon ingestion pipeline</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[var(--foreground)]">GET</td>
                <td className="p-3 font-bold text-[var(--foreground)]">/status/&#123;task_id&#125;</td>
                <td className="p-3 font-sans">Polls background ingestion progress and frame extraction counts</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[var(--foreground)]">POST</td>
                <td className="p-3 font-bold text-[var(--foreground)]">/chat</td>
                <td className="p-3 font-sans">Natural-language question answering; returns answer, clips, citations</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[var(--foreground)]">POST</td>
                <td className="p-3 font-bold text-[var(--foreground)]">/chat/image</td>
                <td className="p-3 font-sans">Reference-image search across OpenCLIP indexed video frames</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[var(--foreground)]">GET</td>
                <td className="p-3 font-bold text-[var(--foreground)]">/videos</td>
                <td className="p-3 font-sans">Evidence video catalog with resolutions, durations, and case IDs</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[var(--foreground)]">GET</td>
                <td className="p-3 font-bold text-[var(--foreground)]">/videos/&#123;id&#125;/play</td>
                <td className="p-3 font-sans">HTTP 307 redirect to byte-range friendly video streaming URL</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[var(--foreground)]">DELETE</td>
                <td className="p-3 font-bold text-[var(--foreground)]">/videos/&#123;id&#125;</td>
                <td className="p-3 font-sans">Cascading deletion of video, frames, ChromaDB vectors, and SQLite records</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[var(--foreground)]">GET</td>
                <td className="p-3 font-bold text-[var(--foreground)]">/cases/&#123;id&#125;/testimony</td>
                <td className="p-3 font-sans">Full statement ledger and witness quotes for a court proceeding</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[var(--foreground)]">GET</td>
                <td className="p-3 font-bold text-[var(--foreground)]">/cases/&#123;id&#125;/contradictions</td>
                <td className="p-3 font-sans">Detected cross-session contradiction records</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="nyaya-api-summary" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Nyaya API Endpoints (:8000)
        </h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] my-4">
          <table className="w-full text-left text-xs border-collapse font-mono">
            <thead>
              <tr className="bg-[var(--sidebar-bg)] border-b border-[var(--border-color)] font-semibold text-[var(--foreground)] font-sans">
                <th className="p-3">Method</th>
                <th className="p-3">Route</th>
                <th className="p-3 font-sans">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--muted-text)]">
              <tr>
                <td className="p-3 font-bold text-[var(--foreground)]">GET</td>
                <td className="p-3 font-bold text-[var(--foreground)]">/api/health</td>
                <td className="p-3 font-sans">Readiness status of in-process RAG core, Ollama models, and Qdrant</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[var(--foreground)]">POST</td>
                <td className="p-3 font-bold text-[var(--foreground)]">/api/query</td>
                <td className="p-3 font-sans">Natural-language legal query with temporal filtering and IRAC response</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[var(--foreground)]">POST</td>
                <td className="p-3 font-bold text-[var(--foreground)]">/api/cases/upload</td>
                <td className="p-3 font-sans">Uploads FIR or charge sheet PDF/TXT and indexes chunks for case fusion</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="common-error-codes" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          HTTP Status &amp; Error Contracts
        </h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] my-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[var(--sidebar-bg)] border-b border-[var(--border-color)] font-semibold text-[var(--foreground)]">
                <th className="p-3">Status Code</th>
                <th className="p-3">Meaning</th>
                <th className="p-3">Example Trigger</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--muted-text)]">
              <tr>
                <td className="p-3 font-mono font-bold text-[var(--foreground)]">200 OK</td>
                <td className="p-3">Successful Request</td>
                <td className="p-3">Answer generated, video metadata retrieved.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-[var(--foreground)]">202 Accepted</td>
                <td className="p-3">Async Processing Started</td>
                <td className="p-3">Video upload received; ingestion running in background.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-[var(--foreground)]">400 Bad Request</td>
                <td className="p-3">Invalid Input Parameters</td>
                <td className="p-3">Unsupported video codec, malformed JSON body.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-[var(--foreground)]">404 Not Found</td>
                <td className="p-3">Resource Missing</td>
                <td className="p-3">Invalid <code className="font-mono text-xs">video_id</code> or <code className="font-mono text-xs">task_id</code>.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-bold text-[var(--foreground)]">503 Service Unavailable</td>
                <td className="p-3">Backend Not Ready</td>
                <td className="p-3">Ollama offline, model loading still in progress.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocPageWrapper>
  );
}
