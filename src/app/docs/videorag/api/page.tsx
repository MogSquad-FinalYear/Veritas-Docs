import { DocPageWrapper } from "@/components/DocPageWrapper";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata = {
  title: "VideoRAG REST API Reference",
  description: "Complete endpoint contracts, request schemas, parameters, and responses for VideoRAG FastAPI backend.",
};

const toc = [
  { id: "ingestion-endpoints", title: "Ingestion & Status Endpoints", level: 2 as const },
  { id: "chat-endpoints", title: "Chat & Search Endpoints", level: 2 as const },
  { id: "speaker-testimony-endpoints", title: "Speaker & Testimony Endpoints", level: 2 as const },
  { id: "video-media-endpoints", title: "Video Media Endpoints", level: 2 as const },
];

export default function VideoRAGApiPage() {
  return (
    <DocPageWrapper
      title="VideoRAG API Reference"
      description="Detailed technical specification of all REST endpoints exposed by the VideoRAG FastAPI service on port 8000."
      badge="REST API"
      toc={toc}
    >
      <section id="ingestion-endpoints" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Ingestion &amp; Status Endpoints
        </h2>

        <div className="space-y-6">
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="rounded border border-[var(--border-color)] bg-[var(--sidebar-bg)] px-2 py-0.5 font-bold text-[var(--foreground)]">POST</span>
              <span className="font-semibold text-[var(--foreground)]">/execute</span>
            </div>
            <p className="mt-2 text-xs text-[var(--muted-text)]">
              Uploads a video file in multipart format and kicks off background multimodal ingestion.
            </p>
            <div className="mt-3">
              <CodeBlock
                language="bash"
                filename="cURL Example"
                code={`curl -X POST http://localhost:8000/execute \\
  -F "file=@/path/to/evidence.mp4" \\
  -F "case_id=case_trial_2026"`}
              />
            </div>
            <CodeBlock
              language="json"
              filename="Response (200 OK)"
              code={`{
  "task_id": "task_a92f8b1c",
  "video_id": "vid_d8174e92",
  "case_id": "case_trial_2026",
  "status": "extracting"
}`}
            />
          </div>

          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="rounded border border-[var(--border-color)] bg-[var(--sidebar-bg)] px-2 py-0.5 font-bold text-[var(--foreground)]">GET</span>
              <span className="font-semibold text-[var(--foreground)]">/status/&#123;task_id&#125;</span>
            </div>
            <p className="mt-2 text-xs text-[var(--muted-text)]">
              Polls background ingestion progress.
            </p>
            <CodeBlock
              language="json"
              filename="Response (200 OK)"
              code={`{
  "task_id": "task_a92f8b1c",
  "status": "complete",
  "progress_percentage": 100,
  "frames_extracted": 284,
  "speech_segments": 42,
  "ocr_tokens": 118,
  "detections_count": 560
}`}
            />
          </div>
        </div>
      </section>

      <section id="chat-endpoints" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Chat &amp; Search Endpoints
        </h2>

        <div className="space-y-6">
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="rounded border border-[var(--border-color)] bg-[var(--sidebar-bg)] px-2 py-0.5 font-bold text-[var(--foreground)]">POST</span>
              <span className="font-semibold text-[var(--foreground)]">/chat</span>
            </div>
            <p className="mt-2 text-xs text-[var(--muted-text)]">
              Submit a natural language question scoped to a specific video or entire case.
            </p>
            <CodeBlock
              language="json"
              filename="Request Body"
              code={`{
  "message": "What did the witness state regarding the silver vehicle?",
  "video_id": "vid_d8174e92",
  "case_id": "case_trial_2026"
}`}
            />
            <CodeBlock
              language="json"
              filename="Response (200 OK)"
              code={`{
  "answer": "At 02:45, witness Maria Chen testified that a silver sedan sped through the crosswalk.",
  "clips": [
    {
      "clip_id": "clip_01",
      "start_time": 161.0,
      "end_time": 169.0,
      "thumbnail_url": "/frames/vid_d8174e92/frame_165000.jpg",
      "stream_url": "/videos/vid_d8174e92/play?start=161.0&end=169.0",
      "sha256_hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855"
    }
  ],
  "citations": [
    {
      "timestamp": "02:45",
      "status": "SUPPORTED",
      "evidence_snippet": "Maria Chen: 'the silver sedan sped right through...'"
    }
  ]
}`}
            />
          </div>

          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
            <div className="flex items-center gap-2 font-mono text-xs">
              <span className="rounded border border-[var(--border-color)] bg-[var(--sidebar-bg)] px-2 py-0.5 font-bold text-[var(--foreground)]">POST</span>
              <span className="font-semibold text-[var(--foreground)]">/chat/image</span>
            </div>
            <p className="mt-2 text-xs text-[var(--muted-text)]">
              Multipart reference-image search across indexed video frames.
            </p>
          </div>
        </div>
      </section>

      <section id="speaker-testimony-endpoints" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Speaker &amp; Testimony Endpoints
        </h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] my-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[var(--sidebar-bg)] border-b border-[var(--border-color)] font-semibold text-[var(--foreground)]">
                <th className="p-3">Method</th>
                <th className="p-3">Endpoint</th>
                <th className="p-3">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--muted-text)] font-mono">
              <tr>
                <td className="p-3 font-bold text-[var(--foreground)]">GET</td>
                <td className="p-3">/videos/{`{id}`}/speakers</td>
                <td className="p-3 font-sans">List identified speakers and roles for a single video.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[var(--foreground)]">POST</td>
                <td className="p-3">/videos/{`{id}`}/speakers</td>
                <td className="p-3 font-sans">Save human-edited speaker names and courtroom roles.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[var(--foreground)]">GET</td>
                <td className="p-3">/cases/{`{id}`}/speaker-matches</td>
                <td className="p-3 font-sans">Retrieve pending voiceprint cross-session matches.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[var(--foreground)]">POST</td>
                <td className="p-3">/cases/{`{id}`}/speaker-matches/confirm</td>
                <td className="p-3 font-sans">Confirm or rename a matched speaker profile.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[var(--foreground)]">GET</td>
                <td className="p-3">/cases/{`{id}`}/testimony</td>
                <td className="p-3 font-sans">Fetch full statement ledger for an entire court case.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[var(--foreground)]">GET</td>
                <td className="p-3">/cases/{`{id}`}/contradictions</td>
                <td className="p-3 font-sans">Retrieve detected cross-session contradictions.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="video-media-endpoints" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Video Media Endpoints
        </h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] my-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[var(--sidebar-bg)] border-b border-[var(--border-color)] font-semibold text-[var(--foreground)]">
                <th className="p-3">Method</th>
                <th className="p-3">Endpoint</th>
                <th className="p-3">Purpose</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--muted-text)] font-mono">
              <tr>
                <td className="p-3 font-bold text-[var(--foreground)]">GET</td>
                <td className="p-3">/videos</td>
                <td className="p-3 font-sans">Returns evidence library metadata (durations, resolutions, case IDs).</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[var(--foreground)]">GET</td>
                <td className="p-3">/videos/{`{id}`}/play</td>
                <td className="p-3 font-sans">HTTP 307 redirect to static video URL with HTTP 206 byte-range seeking.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[var(--foreground)]">DELETE</td>
                <td className="p-3">/videos/{`{id}`}</td>
                <td className="p-3 font-sans">Cascading deletion: removes video, frames, ChromaDB vectors, and SQLite records.</td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-[var(--foreground)]">GET</td>
                <td className="p-3">/frames/...</td>
                <td className="p-3 font-sans">Serves extracted JPEG thumbnails.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocPageWrapper>
  );
}
