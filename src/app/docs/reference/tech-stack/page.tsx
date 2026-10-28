import { DocPageWrapper } from "@/components/DocPageWrapper";

export const metadata = {
  title: "Technology Stack Specification",
  description: "Complete bill of materials, frameworks, computer vision backends, and storage engines across Veritas.",
};

const toc = [
  { id: "languages-frameworks", title: "Languages & Frameworks", level: 2 as const },
  { id: "ml-vision-nlp", title: "Machine Learning, Vision & Audio", level: 2 as const },
  { id: "database-storage", title: "Vector & Relational Storage", level: 2 as const },
];

export default function TechStackPage() {
  return (
    <DocPageWrapper
      title="Technology Stack Specification"
      description="The official technology stack across the Veritas documentation application, VideoRAG forensic engine, Nyaya Legal RAG, and AI Imagery Detection."
      badge="Tech Stack"
      toc={toc}
    >
      <section id="languages-frameworks" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Languages &amp; Frameworks
        </h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] my-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[var(--sidebar-bg)] border-b border-[var(--border-color)] font-semibold text-[var(--foreground)]">
                <th className="p-3">Component</th>
                <th className="p-3">Technology</th>
                <th className="p-3">Version</th>
                <th className="p-3">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--muted-text)] font-mono">
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">Backend Runtime</td>
                <td className="p-3 font-bold text-[var(--foreground)]">Python</td>
                <td className="p-3">3.10+</td>
                <td className="p-3 font-sans">Core ML backends, FastAPI services, evaluation harnesses</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">Frontend Runtime</td>
                <td className="p-3 font-bold text-[var(--foreground)]">Node.js</td>
                <td className="p-3">^20.19.0 / &gt;=22.12.0</td>
                <td className="p-3 font-sans">Vite and Next.js frontend builds</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">Web Backend</td>
                <td className="p-3 font-bold text-[var(--foreground)]">FastAPI</td>
                <td className="p-3">0.115.6</td>
                <td className="p-3 font-sans">Asynchronous HTTP endpoints, streaming uploads, CORS</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">ASGI Server</td>
                <td className="p-3 font-bold text-[var(--foreground)]">Uvicorn</td>
                <td className="p-3">0.34.0</td>
                <td className="p-3 font-sans">Production ASGI web server</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">Validation</td>
                <td className="p-3 font-bold text-[var(--foreground)]">Pydantic</td>
                <td className="p-3">v2</td>
                <td className="p-3 font-sans">Typed request/response data contracts</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">Documentation Portal</td>
                <td className="p-3 font-bold text-[var(--foreground)]">Next.js</td>
                <td className="p-3">16.4.3 (Turbopack)</td>
                <td className="p-3 font-sans">Documentation portal App Router and static prerendering</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">UI Library</td>
                <td className="p-3 font-bold text-[var(--foreground)]">React</td>
                <td className="p-3">19.3.0</td>
                <td className="p-3 font-sans">Reactive component hierarchy</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">Styling</td>
                <td className="p-3 font-bold text-[var(--foreground)]">Tailwind CSS</td>
                <td className="p-3">v4</td>
                <td className="p-3 font-sans">Theme tokens and responsive layout utilities</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="ml-vision-nlp" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Machine Learning, Vision &amp; Audio
        </h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] my-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[var(--sidebar-bg)] border-b border-[var(--border-color)] font-semibold text-[var(--foreground)]">
                <th className="p-3">Model / Library</th>
                <th className="p-3">Source Checkpoint</th>
                <th className="p-3">Domain</th>
                <th className="p-3">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--muted-text)] font-mono">
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">OpenCLIP</td>
                <td className="p-3">ViT-B-32 (laion2b_s34b_b79k)</td>
                <td className="p-3 font-sans">Vision-Language</td>
                <td className="p-3 font-sans">Image, text, caption, and transcript embeddings</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">OpenAI Whisper</td>
                <td className="p-3">whisper-tiny</td>
                <td className="p-3 font-sans">Speech Recognition</td>
                <td className="p-3 font-sans">Automatic speech transcription with word-level timestamps</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">Salesforce BLIP</td>
                <td className="p-3">blip-image-captioning-base</td>
                <td className="p-3 font-sans">Vision-Language</td>
                <td className="p-3 font-sans">Automated natural language scene descriptions</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">Ultralytics YOLOv8</td>
                <td className="p-3">yolov8n.pt</td>
                <td className="p-3 font-sans">Object Detection</td>
                <td className="p-3 font-sans">Object bounding boxes and spatial relationship extraction</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">EasyOCR</td>
                <td className="p-3">Standard English Model</td>
                <td className="p-3 font-sans">Optical Character</td>
                <td className="p-3 font-sans">On-screen text, signage, and document text extraction</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">pyannote.audio</td>
                <td className="p-3">speaker-diarization-3.1</td>
                <td className="p-3 font-sans">Acoustic Diarization</td>
                <td className="p-3 font-sans">Speaker turn boundary segmentation</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">Resemblyzer</td>
                <td className="p-3">Voice Encoder (256-d)</td>
                <td className="p-3 font-sans">Voiceprint Matching</td>
                <td className="p-3 font-sans">Case-wide cross-session speaker re-identification</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">Ollama Qwen2.5</td>
                <td className="p-3">qwen2.5:3b &amp; qwen2.5:14b</td>
                <td className="p-3 font-sans">Legal Reasoning</td>
                <td className="p-3 font-sans">IRAC legal answer synthesis over Indian penal law</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="database-storage" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Vector &amp; Relational Storage
        </h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] my-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[var(--sidebar-bg)] border-b border-[var(--border-color)] font-semibold text-[var(--foreground)]">
                <th className="p-3">Engine</th>
                <th className="p-3">Type</th>
                <th className="p-3">Collections / Tables</th>
                <th className="p-3">Persistence Path</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--muted-text)] font-mono">
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">ChromaDB</td>
                <td className="p-3 font-sans">Embedded Vector DB</td>
                <td className="p-3">image_index, caption_index_clip, speech_index_clip, ocr_index</td>
                <td className="p-3">data/chromadb/</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">Qdrant</td>
                <td className="p-3 font-sans">Vector Database</td>
                <td className="p-3">Indian Statutory Provisions Collection</td>
                <td className="p-3">rag/qdrant_db/</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">SQLite</td>
                <td className="p-3 font-sans">Embedded Relational</td>
                <td className="p-3">detections.db, testimony.db, citations.db</td>
                <td className="p-3">data/*.db</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocPageWrapper>
  );
}
