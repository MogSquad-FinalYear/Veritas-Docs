import { DocPageWrapper } from "@/components/DocPageWrapper";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export const metadata = {
  title: "Timestamp Citations & Evidence Verification",
  description: "Sub-second timestamp extraction, playable clip boundaries, LLM citation verification, and SHA-256 evidence hashing.",
};

const toc = [
  { id: "timestamp-grounding", title: "Sub-Second Timestamp Grounding", level: 2 as const },
  { id: "playable-clip-generation", title: "Playable Video Clip Boundaries", level: 2 as const },
  { id: "citation-verification", title: "Automated Citation Verification", level: 2 as const },
  { id: "audit-trail", title: "SHA-256 Chain-of-Custody Audit Log", level: 2 as const },
];

export default function CitationsPage() {
  return (
    <DocPageWrapper
      title="Timestamp Grounding &amp; Citations"
      description="How VideoRAG establishes evidentiary integrity through timestamp citations, automated LLM verification checks, and cryptographic SHA-256 clip hashing."
      badge="Evidence Verification"
      toc={toc}
    >
      <section id="timestamp-grounding" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Sub-Second Timestamp Grounding
        </h2>
        <p>
          In forensic and legal settings, an answer is only as credible as its underlying citation. VideoRAG anchors every extracted fact to the exact millisecond timestamp of the source recording.
        </p>
        <p className="text-sm text-[var(--muted-text)]">
          Whisper segments provide start and end timestamps (<code className="font-mono text-xs">start_ms</code>, <code className="font-mono text-xs">end_ms</code>), while OpenCV frames and EasyOCR records are indexed with exact video presentation timestamps (<code className="font-mono text-xs">pts_time</code>).
        </p>
      </section>

      <section id="playable-clip-generation" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Playable Video Clip Boundaries
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          When an answer references a timestamp (e.g. <code className="font-mono text-xs">03:42</code>), the system automatically constructs a bounded clip window around the event (typically <code className="font-mono text-xs">timestamp &plusmn; 4.0 seconds</code>):
        </p>

        <CodeBlock
          filename="Clip Generation Model (Pydantic Schema)"
          language="python"
          code={`# Excerpt from backend/models.py
class ClipResponse(BaseModel):
    clip_id: str
    video_id: str
    start_time: float   # in seconds
    end_time: float     # in seconds
    label: str          # e.g., "Witness testimony on vehicle speed"
    thumbnail_url: str  # e.g., "/frames/vid_01/frame_222000.jpg"
    stream_url: str     # e.g., "/videos/vid_01/play?start=218.0&end=226.0"
    sha256_hash: str    # cryptographic integrity digest`}
        />
        <p className="text-xs text-[var(--muted-text)]">
          In the React frontend, clicking any timestamp badge immediately plays the targeted clip inside the built-in HTML5 video player without downloading the full recording.
        </p>
      </section>

      <section id="citation-verification" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Automated Citation Verification
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          Generative AI models are prone to citing incorrect timestamps. VideoRAG integrates an independent citation verification check in <code className="font-mono text-xs">backend/services/citation_service.py</code>:
        </p>
        <ol className="list-decimal pl-5 space-y-1.5 text-sm text-[var(--muted-text)]">
          <li>Extracts all timestamp claims from the generated answer text using regular expressions.</li>
          <li>Fetches the actual surrounding speech segments, OCR tokens, and frame captions occurring within &plusmn;5 seconds of that timestamp.</li>
          <li>Calls Groq with an audit prompt asking whether the claimed statement is strictly supported by the nearby evidence.</li>
          <li>Tags the citation as <code className="font-mono text-xs font-bold text-[var(--foreground)]">SUPPORTED</code> or <code className="font-mono text-xs font-bold text-[var(--muted-text)]">UNSUPPORTED</code>.</li>
        </ol>

        <Callout type="important" title="Evaluation Finding">
          In our benchmark evaluation (eval_06_citation_verification), automated citation verification caught over 84% of hallucinated timestamps compared to a naive &ldquo;trust-all&rdquo; baseline, preventing unsupported claims from entering court records.
        </Callout>
      </section>

      <section id="audit-trail" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          SHA-256 Chain-of-Custody Audit Log
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          To satisfy evidentiary chain-of-custody standards, all verification decisions and bounded video clips are hashed with SHA-256 and logged into <code className="font-mono text-xs">data/citations.db</code>:
        </p>

        <CodeBlock
          filename="citations.db Schema"
          language="sql"
          code={`CREATE TABLE citation_audit (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    query_id TEXT NOT NULL,
    video_id TEXT NOT NULL,
    claimed_timestamp REAL NOT NULL,
    statement_text TEXT NOT NULL,
    verification_status TEXT NOT NULL,  -- 'SUPPORTED' or 'UNSUPPORTED'
    verification_reason TEXT,
    clip_sha256 TEXT NOT NULL,          -- SHA-256 of extracted MP4 chunk
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`}
        />
      </section>
    </DocPageWrapper>
  );
}
