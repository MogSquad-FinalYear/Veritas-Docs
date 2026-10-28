import { DocPageWrapper } from "@/components/DocPageWrapper";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata = {
  title: "Multimodal Retrieval & Indexing",
  description: "Detailed specification of ChromaDB collections, OpenCLIP embeddings, EasyOCR indexing, and SQLite detections.",
};

const toc = [
  { id: "chromadb-collections", title: "Four ChromaDB Vector Collections", level: 2 as const },
  { id: "sqlite-structured-store", title: "SQLite Structured Store & Schema", level: 2 as const },
  { id: "multimodal-search-modalities", title: "Supported Query Modalities", level: 2 as const },
  { id: "image-to-video-search", title: "Image-to-Video Visual Search", level: 2 as const },
];

export default function RetrievalPage() {
  return (
    <DocPageWrapper
      title="Multimodal Retrieval &amp; Indexing"
      description="How VideoRAG organizes multimodal evidence across ChromaDB vector collections and SQLite relational tables for targeted legal retrieval."
      badge="Indexing"
      toc={toc}
    >
      <section id="chromadb-collections" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Four ChromaDB Vector Collections
        </h2>
        <p>
          VideoRAG partitions evidence into four persistent ChromaDB collections located in <code className="font-mono text-xs">data/chromadb/</code>:
        </p>

        <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] my-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[var(--sidebar-bg)] border-b border-[var(--border-color)] font-semibold text-[var(--foreground)]">
                <th className="p-3">Collection Name</th>
                <th className="p-3">Embedded Content</th>
                <th className="p-3">Embedding Model</th>
                <th className="p-3">Key Metadata Fields</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--muted-text)]">
              <tr>
                <td className="p-3 font-mono font-semibold text-[var(--foreground)]">image_index</td>
                <td className="p-3">Sampled video frames (JPEG)</td>
                <td className="p-3">OpenCLIP ViT-B-32 (visual)</td>
                <td className="p-3 font-mono">video_id, timestamp_ms, frame_path</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-[var(--foreground)]">caption_index_clip</td>
                <td className="p-3">BLIP scene descriptions</td>
                <td className="p-3">OpenCLIP ViT-B-32 (text)</td>
                <td className="p-3 font-mono">video_id, timestamp_ms, caption_text</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-[var(--foreground)]">speech_index_clip</td>
                <td className="p-3">Whisper timestamped speech segments</td>
                <td className="p-3">OpenCLIP ViT-B-32 (text)</td>
                <td className="p-3 font-mono">video_id, start_ms, end_ms, speaker_id</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-[var(--foreground)]">ocr_index</td>
                <td className="p-3">EasyOCR recognized on-screen text</td>
                <td className="p-3">OpenCLIP ViT-B-32 (text)</td>
                <td className="p-3 font-mono">video_id, timestamp_ms, bbox_coords</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="sqlite-structured-store" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          SQLite Structured Store &amp; Schema
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          Where exact filtering, numeric counting, or relational predicates are required, vector search is paired with three SQLite databases:
        </p>

        <CodeBlock
          filename="SQLite Relational Schemas (detections.db & testimony.db)"
          language="sql"
          code={`-- detections.db
CREATE TABLE detections (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    video_id TEXT NOT NULL,
    timestamp_ms INTEGER NOT NULL,
    class_name TEXT NOT NULL,
    confidence REAL NOT NULL,
    x1 REAL, y1 REAL, x2 REAL, y2 REAL
);

CREATE TABLE scene_graph (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    video_id TEXT NOT NULL,
    timestamp_ms INTEGER NOT NULL,
    subject TEXT NOT NULL,
    predicate TEXT NOT NULL,   -- 'left_of', 'above', 'near', 'inside'
    object TEXT NOT NULL
);

-- testimony.db
CREATE TABLE statements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    case_id TEXT NOT NULL,
    video_id TEXT NOT NULL,
    speaker_id TEXT NOT NULL,
    role TEXT,                 -- 'Witness', 'Prosecutor', 'Judge', 'Defendant'
    timestamp_start_ms INTEGER,
    timestamp_end_ms INTEGER,
    transcript TEXT NOT NULL
);`}
        />
      </section>

      <section id="multimodal-search-modalities" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Supported Query Modalities
        </h2>
        <p>The retrieval agent routes natural-language questions to specialized tools:</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--muted-text)]">
          <li><strong>Spoken Testimony Queries:</strong> &ldquo;What did the witness say about the vehicle?&rdquo; &rarr; Searches <code className="font-mono text-xs">speech_index_clip</code>.</li>
          <li><strong>Visual Action Queries:</strong> &ldquo;Show when the defendant entered the room&rdquo; &rarr; Queries <code className="font-mono text-xs">caption_index_clip</code> and <code className="font-mono text-xs">image_index</code>.</li>
          <li><strong>Text &amp; Sign Queries:</strong> &ldquo;Read the license plate or sign on the door&rdquo; &rarr; Searches <code className="font-mono text-xs">ocr_index</code>.</li>
          <li><strong>Object Count &amp; Location:</strong> &ldquo;How many people are near the table?&rdquo; &rarr; Queries SQL <code className="font-mono text-xs">detections</code> and <code className="font-mono text-xs">scene_graph</code> tables.</li>
          <li><strong>Cross-Session Contradictions:</strong> &ldquo;Did this witness change their account?&rdquo; &rarr; Queries <code className="font-mono text-xs">testimony.db</code>.</li>
        </ul>
      </section>

      <section id="image-to-video-search" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Image-to-Video Visual Search
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          VideoRAG supports image-to-video queries via <code className="font-mono text-xs">POST /chat/image</code>. A reference photograph (e.g. a suspect&apos;s face or a vehicle) is embedded with OpenCLIP ViT-B-32 and matched via cosine similarity against all indexed video frames:
        </p>

        <CodeBlock
          filename="Image-to-Video Match Logic"
          language="python"
          code={`# Excerpt from backend/routers/chat.py
@router.post("/chat/image")
async def chat_image(image: UploadFile = File(...), video_id: Optional[str] = Form(None)):
    image_bytes = await image.read()
    query_emb = embedding_service.get_image_embedding_bytes(image_bytes)
    
    # Cosine search in ChromaDB image_index
    results = indexing_service.search_image_collection(
        query_vector=query_emb,
        top_k=5,
        video_id=video_id
    )
    return format_visual_match_response(results)`}
        />
      </section>
    </DocPageWrapper>
  );
}
