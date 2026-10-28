import { DocPageWrapper } from "@/components/DocPageWrapper";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export const metadata = {
  title: "Video Ingestion Pipeline",
  description: "Detailed step-by-step video ingestion, adaptive sampling, Whisper transcription, OCR, and YOLOv8 extraction.",
};

const toc = [
  { id: "ingestion-stages", title: "The 10 Ingestion Steps", level: 2 as const },
  { id: "frame-sampling", title: "Adaptive Scene Sampling vs Uniform Fallback", level: 2 as const },
  { id: "parallel-indexing", title: "Multimodal Feature Extraction", level: 2 as const },
  { id: "spatial-relations", title: "Scene Graph & Spatial Relations", level: 2 as const },
  { id: "non-fatal-enhancements", title: "Non-Fatal Enhancement Philosophy", level: 2 as const },
];

export default function IngestionPage() {
  return (
    <DocPageWrapper
      title="Video Ingestion Pipeline"
      description="How VideoRAG ingests courtroom video files, extracts multimodal feature streams, and populates ChromaDB and SQLite stores."
      badge="Video Pipeline"
      toc={toc}
    >
      <section id="ingestion-stages" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          The 10 Ingestion Steps
        </h2>
        <p>
          Submitting a video via <code className="font-mono text-xs">POST /execute</code> streams the file to disk in 1 MiB chunks and starts a background daemon thread executing these ten sequential steps:
        </p>

        <ol className="list-decimal pl-5 space-y-2 text-sm text-[var(--muted-text)]">
          <li>
            <strong className="text-[var(--foreground)]">Metadata Extraction:</strong> Probes video duration, resolution, native FPS, and total frame count using OpenCV, saving JSON to <code className="font-mono text-xs">data/metadata/&lt;video_id&gt;.json</code>.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Adaptive Frame Sampling:</strong> Detects scene transitions bounded by <code className="font-mono text-xs">MAX_FRAMES_PER_VIDEO</code> (default: 300); falls back to uniform 1 FPS extraction if scene detection fails.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Audio Track Extraction:</strong> Extracts a 16kHz mono WAV audio file using the bundled <code className="font-mono text-xs">imageio-ffmpeg</code> binary.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Batch Image Embeddings:</strong> Encodes sampled frames with OpenCLIP ViT-B-32 and indexes them in ChromaDB&apos;s <code className="font-mono text-xs">image_index</code> with microsecond-accurate video timestamps.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Caption Generation:</strong> Generates frame captions synchronously or asynchronously according to <code className="font-mono text-xs">CAPTION_MODE</code> (BLIP base model or CLIP label matching), indexing in <code className="font-mono text-xs">caption_index_clip</code>.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">OCR Text Extraction:</strong> Runs EasyOCR on every 3rd valid frame (<code className="font-mono text-xs">stride = 3</code>), storing recognized text and bounding boxes in ChromaDB&apos;s <code className="font-mono text-xs">ocr_index</code>.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Object Detection &amp; Spatial Relations:</strong> Runs Ultralytics YOLOv8n every 2nd frame (<code className="font-mono text-xs">stride = 2</code>). When 2+ objects are detected, computes rule-based relation triples (<code className="font-mono text-xs">left of</code>, <code className="font-mono text-xs">above</code>, <code className="font-mono text-xs">near</code>, <code className="font-mono text-xs">inside</code>) and saves to <code className="font-mono text-xs">detections.db</code>.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Whisper ASR &amp; Diarization:</strong> Transcribes the WAV track with OpenAI Whisper (tiny), assigns speaker labels via pyannote (or silence gaps), and infers courtroom roles from keyword cues.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Voiceprint Registration &amp; Contradictions:</strong> If a case ID is active, extracts 256-d Resemblyzer voiceprints, updates the case speaker registry, appends statements to <code className="font-mono text-xs">testimony.db</code>, and initiates background contradiction scanning.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Task Completion:</strong> Flags task status as <code className="font-mono text-xs">&quot;complete&quot;</code> in process memory, making video instantly searchable.
          </li>
        </ol>
      </section>

      <section id="frame-sampling" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Adaptive Scene Sampling vs Uniform Fallback
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          Standard uniform sampling at 1 FPS frequently captures redundant stationary frames (e.g. an attorney standing motionless). VideoRAG computes pixel difference histograms between consecutive frames:
        </p>

        <CodeBlock
          filename="Adaptive Frame Extraction Logic (OpenCV)"
          language="python"
          code={`# Excerpt from backend/services/video_processor.py
def sample_frames_adaptively(video_path, output_dir, max_frames=300, min_interval=0.5):
    cap = cv2.VideoCapture(video_path)
    fps = cap.get(cv2.CAP_PROP_FPS)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    
    prev_hist = None
    saved_frames = []
    last_saved_time = -min_interval

    for frame_idx in range(total_frames):
        ret, frame = cap.read()
        if not ret:
            break
        
        current_time = frame_idx / fps
        if current_time - last_saved_time < min_interval:
            continue

        # Compute HSV color histogram for scene change detection
        hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
        hist = cv2.calcHist([hsv], [0, 1], None, [50, 60], [0, 180, 0, 256])
        cv2.normalize(hist, hist, alpha=0, beta=1, norm_type=cv2.NORM_MINMAX)

        if prev_hist is None or cv2.compareHist(prev_hist, hist, cv2.HISTCMP_CORREL) < 0.7:
            # Significant scene transition or initial frame
            filename = f"frame_{int(current_time * 1000)}.jpg"
            cv2.imwrite(os.path.join(output_dir, filename), frame)
            saved_frames.append((filename, current_time))
            last_saved_time = current_time
            prev_hist = hist

        if len(saved_frames) >= max_frames:
            break
            
    cap.release()
    return saved_frames`}
        />
      </section>

      <section id="spatial-relations" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Scene Graph & Spatial Relations
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          When YOLOv8 detects bounding boxes for multiple objects in the same frame (e.g. <code className="font-mono text-xs">person</code> and <code className="font-mono text-xs">chair</code>), <code className="font-mono text-xs">scene_graph_service.py</code> computes geometric relation triples stored in SQLite:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-[var(--muted-text)]">
          <li><strong>left of / right of:</strong> Checked via centroid horizontal distance: <code className="font-mono text-xs">x2 &gt; x1 + threshold</code>.</li>
          <li><strong>above / below:</strong> Checked via centroid vertical distance: <code className="font-mono text-xs">y2 &gt; y1 + threshold</code>.</li>
          <li><strong>inside:</strong> Checked via bounding box containment: <code className="font-mono text-xs">box1</code> completely enclosed within <code className="font-mono text-xs">box2</code>.</li>
          <li><strong>near:</strong> Euclidean normalized centroid distance &lt; 0.25.</li>
        </ul>
      </section>

      <section id="non-fatal-enhancements" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Non-Fatal Enhancement Philosophy
        </h2>
        <Callout type="tip" title="Resilience by Design">
          In VideoRAG, secondary forensic enhancements—such as OCR, YOLO object detection, pyannote speaker diarization, voiceprints, and contradiction classification—are <strong>intentionally non-fatal</strong>.
          <br /><br />
          If an OCR model times out or pyannote fails due to missing Hugging Face tokens, errors are logged gracefully without aborting the core video index. Visual search and speech transcription remain immediately usable.
        </Callout>
      </section>
    </DocPageWrapper>
  );
}
