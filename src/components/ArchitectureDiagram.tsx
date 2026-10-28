"use client";

interface ArchitectureDiagramProps {
  type: "platform" | "imagery" | "videorag" | "nyaya";
  title?: string;
  caption?: string;
}

export function ArchitectureDiagram({ type, title, caption }: ArchitectureDiagramProps) {
  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] shadow-sm">
      {title && (
        <div className="border-b border-[var(--border-color)] bg-[var(--sidebar-bg)] px-4 py-2.5 text-xs font-semibold text-[var(--foreground)]">
          {title}
        </div>
      )}

      <div className="overflow-x-auto p-4 sm:p-6 flex justify-center">
        {type === "platform" && (
          <div className="w-full max-w-[760px] text-xs font-sans">
            <div className="rounded-lg border border-[var(--border-color)] bg-[var(--sidebar-bg)] p-3 text-center font-bold text-[var(--foreground)] mb-6 shadow-sm">
              Veritas Unified Forensic &amp; Legal Reasoning Client Portal (React 19 / Next.js)
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Module 1 */}
              <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-sm mb-2 text-[var(--foreground)]">
                    <span className="h-2 w-2 rounded-full bg-[var(--foreground)]" />
                    AI Imagery Detection
                  </div>
                  <p className="text-[11px] text-[var(--muted-text)] mb-3">
                    Frequency-aware spectral routing across specialist vision classifiers.
                  </p>
                  <ul className="space-y-1 text-[11px] font-mono text-[var(--foreground)]">
                    <li>• 2D FFT Radial Profiler</li>
                    <li>• UniversalFakeDetect (CLIP)</li>
                    <li>• NPR (Pixel Residuals)</li>
                    <li>• CLIP-LoRA (OMAT)</li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-[var(--border-color)] text-[10px] text-[var(--subtle-text)]">
                  Local PyTorch Inference (8GB VRAM)
                </div>
              </div>

              {/* Module 2 */}
              <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-sm mb-2 text-[var(--foreground)]">
                    <span className="h-2 w-2 rounded-full bg-[var(--foreground)]" />
                    VideoRAG
                  </div>
                  <p className="text-[11px] text-[var(--muted-text)] mb-3">
                    Multimodal courtroom video QA with sub-second timestamp evidence.
                  </p>
                  <ul className="space-y-1 text-[11px] font-mono text-[var(--foreground)]">
                    <li>• OpenCV / Whisper / YOLOv8</li>
                    <li>• 4x ChromaDB Collections</li>
                    <li>• SQLite Detections &amp; Citations</li>
                    <li>• Groq LLM Agent Synthesis</li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-[var(--border-color)] text-[10px] text-[var(--subtle-text)]">
                  FastAPI :8000 + React :5173
                </div>
              </div>

              {/* Module 3 */}
              <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-sm mb-2 text-[var(--foreground)]">
                    <span className="h-2 w-2 rounded-full bg-[var(--foreground)]" />
                    Nyaya Legal RAG
                  </div>
                  <p className="text-[11px] text-[var(--muted-text)] mb-3">
                    Citation-grounded statutory reasoning over Indian penal codes.
                  </p>
                  <ul className="space-y-1 text-[11px] font-mono text-[var(--foreground)]">
                    <li>• Dense Qdrant + BM25 Hybrid</li>
                    <li>• IRAC Reranking Framework</li>
                    <li>• Temporal Validity Filter</li>
                    <li>• Ollama (qwen2.5:3b / 14b)</li>
                  </ul>
                </div>
                <div className="mt-4 pt-3 border-t border-[var(--border-color)] text-[10px] text-[var(--subtle-text)]">
                  FastAPI :8000 + Next.js :3000
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-lg border border-[var(--border-color)] bg-[var(--sidebar-bg)] p-3 text-center text-[11px] text-[var(--subtle-text)]">
              Decoupled Architecture: Independent backends, specialized storage schemas, zero cross-module single-point-of-failure.
            </div>
          </div>
        )}

        {type === "imagery" && (
          <div className="w-full max-w-[720px] text-xs font-sans">
            <div className="flex flex-col gap-3">
              <div className="rounded-lg border border-[var(--border-color)] bg-[var(--sidebar-bg)] p-3 text-center font-bold text-[var(--foreground)]">
                Input Image (RGB Canvas)
              </div>

              <div className="text-center text-[var(--subtle-text)] font-mono">↓ Preprocessing (Resize vs Native Scale)</div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] p-3 text-center">
                  <div className="font-bold text-[var(--foreground)]">2D FFT Spectral Analysis</div>
                  <p className="text-[10px] text-[var(--muted-text)] mt-1">High-frequency radial energy profile (outer 20% radius)</p>
                </div>
                <div className="rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] p-3 text-center">
                  <div className="font-bold text-[var(--foreground)]">Compression Audit</div>
                  <p className="text-[10px] text-[var(--muted-text)] mt-1">JPEG quantization artifact check &amp; PNG confound detector</p>
                </div>
              </div>

              <div className="text-center text-[var(--subtle-text)] font-mono">↓ Frequency-Aware Dynamic Router</div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg border border-[var(--border-color)] bg-[var(--sidebar-bg)] p-3 text-center">
                  <div className="font-semibold text-xs text-[var(--foreground)]">UniversalFakeDetect</div>
                  <p className="text-[10px] text-[var(--subtle-text)] mt-1">ProGAN baseline, optimal on GANs (83.0% on BigGAN)</p>
                </div>
                <div className="rounded-lg border border-[var(--border-color)] bg-[var(--sidebar-bg)] p-3 text-center">
                  <div className="font-semibold text-xs text-[var(--foreground)]">NPR Up-Sampling</div>
                  <p className="text-[10px] text-[var(--subtle-text)] mt-1">Neighboring pixel residual, 97.7% on clean FLUX.1 (35x fast)</p>
                </div>
                <div className="rounded-lg border border-[var(--border-color)] bg-[var(--sidebar-bg)] p-3 text-center">
                  <div className="font-semibold text-xs text-[var(--foreground)]">GenImage++ CLIP-LoRA</div>
                  <p className="text-[10px] text-[var(--subtle-text)] mt-1">OMAT adversarial tuning, 98.7% mean acc, ECE &lt; 0.020</p>
                </div>
              </div>

              <div className="text-center text-[var(--subtle-text)] font-mono">↓ Calibrated Classification</div>

              <div className="rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] p-3 text-center">
                <span className="font-bold text-[var(--foreground)]">
                  Binary Verdict (Fake vs Real) + Expected Calibration Error (ECE) + Threshold Warning
                </span>
              </div>
            </div>
          </div>
        )}

        {type === "videorag" && (
          <div className="w-full max-w-[760px] text-xs font-sans">
            <div className="flex flex-col gap-3">
              <div className="rounded-lg border border-[var(--border-color)] bg-[var(--sidebar-bg)] p-3 text-center font-bold text-[var(--foreground)]">
                Video Evidence Upload (POST /execute)
              </div>

              <div className="text-center text-[var(--subtle-text)] font-mono">↓ Background Ingestion Worker</div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="rounded-lg border border-[var(--border-color)] bg-[var(--sidebar-bg)] p-2">
                  <div className="font-semibold text-[11px] text-[var(--foreground)]">OpenCV</div>
                  <p className="text-[9px] text-[var(--subtle-text)]">Adaptive Scene Sampling</p>
                </div>
                <div className="rounded-lg border border-[var(--border-color)] bg-[var(--sidebar-bg)] p-2">
                  <div className="font-semibold text-[11px] text-[var(--foreground)]">Whisper ASR</div>
                  <p className="text-[9px] text-[var(--subtle-text)]">Timestamped Transcripts</p>
                </div>
                <div className="rounded-lg border border-[var(--border-color)] bg-[var(--sidebar-bg)] p-2">
                  <div className="font-semibold text-[11px] text-[var(--foreground)]">EasyOCR</div>
                  <p className="text-[9px] text-[var(--subtle-text)]">On-screen Text (Stride 3)</p>
                </div>
                <div className="rounded-lg border border-[var(--border-color)] bg-[var(--sidebar-bg)] p-2">
                  <div className="font-semibold text-[11px] text-[var(--foreground)]">YOLOv8 + Graph</div>
                  <p className="text-[9px] text-[var(--subtle-text)]">Object Detection &amp; Relations</p>
                </div>
              </div>

              <div className="text-center text-[var(--subtle-text)] font-mono">↓ Multi-Store Persistence</div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] p-3">
                  <div className="font-bold text-[var(--foreground)] text-center mb-1">ChromaDB Vector Collections</div>
                  <p className="text-[10px] text-[var(--muted-text)] text-center font-mono">
                    image_index • caption_index_clip • speech_index_clip • ocr_index
                  </p>
                </div>
                <div className="rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] p-3">
                  <div className="font-bold text-[var(--foreground)] text-center mb-1">SQLite Structured Stores</div>
                  <p className="text-[10px] text-[var(--muted-text)] text-center font-mono">
                    detections.db • testimony.db • citations.db (SHA-256)
                  </p>
                </div>
              </div>

              <div className="text-center text-[var(--subtle-text)] font-mono">↓ Natural Language Query (POST /chat)</div>

              <div className="rounded-lg border border-[var(--border-color)] bg-[var(--sidebar-bg)] p-3 text-center">
                <div className="font-bold text-[var(--foreground)]">Agentic Query Planner (Groq llama-3.3-70b-versatile)</div>
                <p className="text-[10px] text-[var(--muted-text)] mt-1">
                  JSON query plan → Parallel multi-index retrieval → Evidence merge → Grounded answer + Playable video clips + Citation audit
                </p>
              </div>
            </div>
          </div>
        )}

        {type === "nyaya" && (
          <div className="w-full max-w-[720px] text-xs font-sans">
            <div className="flex flex-col gap-3">
              <div className="rounded-lg border border-[var(--border-color)] bg-[var(--sidebar-bg)] p-3 text-center font-bold text-[var(--foreground)]">
                Legal Query &amp; Optional Case Documents (FIR / Charge Sheet)
              </div>

              <div className="text-center text-[var(--subtle-text)] font-mono">↓ Dual Hybrid Retrieval</div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] p-3 text-center">
                  <div className="font-bold text-[var(--foreground)]">Dense Vector Retrieval</div>
                  <p className="text-[10px] text-[var(--muted-text)] mt-1">Qdrant statutory code embeddings &amp; semantic match</p>
                </div>
                <div className="rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] p-3 text-center">
                  <div className="font-bold text-[var(--foreground)]">Sparse Lexical Retrieval</div>
                  <p className="text-[10px] text-[var(--muted-text)] mt-1">BM25 index for exact section numbers &amp; legal terms</p>
                </div>
              </div>

              <div className="text-center text-[var(--subtle-text)] font-mono">↓ Fusion &amp; Temporal Verification</div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-[var(--border-color)] bg-[var(--sidebar-bg)] p-3 text-center">
                  <div className="font-semibold text-xs text-[var(--foreground)]">Temporal Validity Filter</div>
                  <p className="text-[10px] text-[var(--subtle-text)] mt-1">Incident date routing: IPC/CrPC (pre-July 2024) vs BNS/BNSS (post-July 2024)</p>
                </div>
                <div className="rounded-lg border border-[var(--border-color)] bg-[var(--sidebar-bg)] p-3 text-center">
                  <div className="font-semibold text-xs text-[var(--foreground)]">IRAC Relevance Reranking</div>
                  <p className="text-[10px] text-[var(--subtle-text)] mt-1">Re-ordering candidate statutes by Issue, Rule, and Precedent weight</p>
                </div>
              </div>

              <div className="text-center text-[var(--subtle-text)] font-mono">↓ Grounded Statutory Generation (Ollama qwen2.5:14b)</div>

              <div className="rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] p-3 text-center">
                <span className="font-bold text-[var(--foreground)]">
                  IRAC-Structured Response with Exact Statutory Citations &amp; Legal Reasoning
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {caption && (
        <figcaption className="border-t border-[var(--border-color)] bg-[var(--sidebar-bg)] px-4 py-2 text-center text-[11px] text-[var(--subtle-text)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
