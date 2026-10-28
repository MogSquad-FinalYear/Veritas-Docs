import { DocPageWrapper } from "@/components/DocPageWrapper";
import { Callout } from "@/components/Callout";

export const metadata = {
  title: "VideoRAG Evaluation & Limitations",
  description: "Seven benchmark evaluations, empirical retrieval quality, speaker verification, and operational courtroom limitations.",
};

const toc = [
  { id: "evaluation-suite", title: "The Seven Production Evaluations", level: 2 as const },
  { id: "eval-retrieval", title: "Eval 02: Multimodal Retrieval Quality", level: 2 as const },
  { id: "eval-citations", title: "Eval 06: Citation Verification Accuracy", level: 2 as const },
  { id: "operational-limitations", title: "Operational & Evidentiary Limitations", level: 2 as const },
];

export default function VideoRAGEvalPage() {
  return (
    <DocPageWrapper
      title="Evaluation & Limitations"
      description="Empirical benchmark results across seven production evaluation tracks and critical operational boundaries for legal evidence."
      badge="Benchmarks"
      toc={toc}
    >
      <section id="evaluation-suite" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          The Seven Production Evaluations
        </h2>
        <p>
          VideoRAG includes seven reproducible evaluation harnesses in <code className="font-mono text-xs">evaluation/</code>:
        </p>

        <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] my-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[var(--sidebar-bg)] border-b border-[var(--border-color)] font-semibold text-[var(--foreground)]">
                <th className="p-3">Track</th>
                <th className="p-3">Script Name</th>
                <th className="p-3">Evaluated Capability</th>
                <th className="p-3">Core Measured Metric</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--muted-text)]">
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">01. Timestamp Fidelity</td>
                <td className="p-3 font-mono">eval_01_timestamp_fidelity.py</td>
                <td className="p-3">Presentation timestamp correctness</td>
                <td className="p-3">Mean drift &lt; 42ms vs pre-fix drift &gt; 1200ms</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">02. Multimodal Retrieval</td>
                <td className="p-3 font-mono">eval_02_retrieval.py</td>
                <td className="p-3">Speech, caption, and OCR search</td>
                <td className="p-3">Recall@1, Recall@5, and Mean Reciprocal Rank (MRR)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">03. Image-to-Video</td>
                <td className="p-3 font-mono">eval_03_image_search.py</td>
                <td className="p-3">Visual frame matching with reference photo</td>
                <td className="p-3">ROC-AUC, Precision-Recall curve, Equal Error Rate (EER)</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">04. Speaker Verification</td>
                <td className="p-3 font-mono">eval_04_speaker_verification.py</td>
                <td className="p-3">Resemblyzer voiceprint similarity</td>
                <td className="p-3">Cosine similarity thresholds &amp; cross-session clustering</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">05. Contradictions</td>
                <td className="p-3 font-mono">eval_05_contradiction_detection.py</td>
                <td className="p-3">Three-way statement classifier</td>
                <td className="p-3">Accuracy across CONTRADICT, ENTAIL, UNRELATED</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">06. Citation Verifier</td>
                <td className="p-3 font-mono">eval_06_citation_verification.py</td>
                <td className="p-3">Detection of hallucinated timestamps</td>
                <td className="p-3">Precision/Recall vs naive &ldquo;trust-all&rdquo; baseline</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">07. Scalability</td>
                <td className="p-3 font-mono">eval_07_scalability.py</td>
                <td className="p-3">Ingestion throughput and memory profiling</td>
                <td className="p-3">Cold vs warm processing latency; voiceprint OOM stability</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="eval-retrieval" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Eval 02: Multimodal Retrieval Quality
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          Evaluated across benchmark video queries, speech transcription exhibits significantly higher retrieval recall than automated frame captions or OCR:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-[var(--muted-text)]">
          <li><strong>Speech Retrieval (Whisper + OpenCLIP):</strong> Recall@5 &gt; 88%, MRR = 0.81. Spoken words provide precise, highly discriminative tokens.</li>
          <li><strong>Caption Retrieval (BLIP + OpenCLIP):</strong> Recall@5 &asymp; 64%, MRR = 0.58. Captions capture broad scene layouts well, but miss fine-grained object actions.</li>
          <li><strong>OCR Retrieval (EasyOCR):</strong> Recall@5 &asymp; 52%, MRR = 0.49. Optical character recognition is susceptible to motion blur and variable camera angles.</li>
        </ul>
      </section>

      <section id="eval-citations" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Eval 06: Citation Verification Accuracy
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          Comparing VideoRAG&apos;s automated citation verifier against a standard generative model baseline without citation validation:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-[var(--muted-text)]">
          <li><strong>Standard Trust-All Baseline:</strong> Accepts all generated timestamps, resulting in an unverified hallucination error rate of ~18.5%.</li>
          <li><strong>VideoRAG Verification Pipeline:</strong> Filters citations by checking context frames within &plusmn;5.0 seconds. Identifies 84.2% of timestamp hallucinations while preserving 96.1% of genuine factual claims.</li>
        </ul>
      </section>

      <section id="operational-limitations" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Operational & Evidentiary Limitations
        </h2>
        <div className="space-y-3 text-xs text-[var(--muted-text)]">
          <p>⚠️ <strong>Process Memory Task State:</strong> Ingestion task statuses exist in process memory. A server restart clears in-flight task dictionaries.</p>
          <p>⚠️ <strong>Embedded Stores:</strong> SQLite and ChromaDB are local embedded instances; access control, user authentication, and encrypted-at-rest volumes must be provisioned at the infrastructure layer.</p>
          <p>⚠️ <strong>Cloud Data Boundary:</strong> When <code className="font-mono text-xs">GROQ_API_KEY</code> is enabled, prompt text containing retrieved witness statements is transmitted to Groq servers. Review evidentiary confidentiality policies before enabling cloud reasoning for sealed evidence.</p>
        </div>

        <Callout type="caution" title="Courtroom Evidentiary Disclaimer">
          VideoRAG is a research prototype. It is designed to assist human legal investigators and paralegals in navigating video footage, but <strong>must never replace human evidentiary review or independent chain-of-custody verification in court proceedings</strong>.
        </Callout>
      </section>
    </DocPageWrapper>
  );
}
