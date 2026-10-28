import { DocPageWrapper } from "@/components/DocPageWrapper";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata = {
  title: "Nyaya: Case Document Integration",
  description: "Fusing external evidentiary documents (FIRs, charge sheets, witness statements) into the statutory RAG pipeline.",
};

const toc = [
  { id: "supported-documents", title: "Supported Document Types", level: 2 as const },
  { id: "ingestion-process", title: "Document Ingestion & Chunking Workflow", level: 2 as const },
  { id: "fact-statute-fusion", title: "Fact-Statute Fusion Strategy", level: 2 as const },
  { id: "sample-fir-query", title: "End-to-End FIR Analysis Example", level: 2 as const },
];

export default function CaseDocumentsPage() {
  return (
    <DocPageWrapper
      title="Case Document Integration"
      description="How Nyaya ingests, chunks, and fuses external trial documents—such as police FIRs and charge sheets—into the statutory reasoning pipeline."
      badge="Evidence Fusion"
      toc={toc}
    >
      <section id="supported-documents" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Supported Document Types
        </h2>
        <p>
          Legal questions rarely exist in the abstract; they arise from specific case files. Nyaya accepts evidentiary documents in PDF, TXT, and Markdown formats:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 text-xs">
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
            <span className="font-bold text-[var(--foreground)]">1. First Information Reports (FIRs)</span>
            <p className="mt-1 text-[var(--muted-text)]">
              Police complaints recording initial cognizable offense allegations, incident dates, jurisdiction, and suspect names.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
            <span className="font-bold text-[var(--foreground)]">2. Final Police Reports (Charge Sheets)</span>
            <p className="mt-1 text-[var(--muted-text)]">
              Formal charges filed under Section 173 CrPC / Section 193 BNSS specifying investigated facts and cited penal sections.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
            <span className="font-bold text-[var(--foreground)]">3. Witness Depositions &amp; Section 161 Statements</span>
            <p className="mt-1 text-[var(--muted-text)]">
              Transcripts of witness statements recorded during preliminary police inquiries or trial cross-examination.
            </p>
          </div>
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
            <span className="font-bold text-[var(--foreground)]">4. Medical &amp; Chemical Forensic Reports</span>
            <p className="mt-1 text-[var(--muted-text)]">
              Injury summaries, post-mortem findings, and ballistic/chemical test reports.
            </p>
          </div>
        </div>
      </section>

      <section id="ingestion-process" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Document Ingestion &amp; Chunking Workflow
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          When a case document is submitted via <code className="font-mono text-xs">POST /api/cases/upload</code>:
        </p>

        <ol className="list-decimal pl-5 space-y-1.5 text-sm text-[var(--muted-text)]">
          <li><strong>Text Normalization:</strong> Strips judicial boilerplate, cleans OCR artifacts, and extracts metadata headers (FIR number, Police Station, Date).</li>
          <li><strong>Structural Chunking:</strong> Partitions the text using boundary-aware chunking (chunks of 500 tokens with 100-token overlap), preserving numbered allegations.</li>
          <li><strong>Case Vector Isolation:</strong> Embeds chunks into a temporary case-isolated collection or session context window, avoiding cross-case data contamination.</li>
        </ol>
      </section>

      <section id="fact-statute-fusion" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Fact-Statute Fusion Strategy
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          The reasoner executes a two-step context assembly:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-[var(--muted-text)]">
          <li><strong>Step A (Fact Retrieval):</strong> Matches the legal question against the uploaded case documents to identify relevant factual allegations.</li>
          <li><strong>Step B (Statute Grounding):</strong> Uses the extracted factual allegations to query Qdrant and BM25 for applicable penal statutes.</li>
          <li><strong>Step C (Fusion Synthesis):</strong> Ollama (<code className="font-mono text-xs">qwen2.5:14b</code>) synthesizes the application section by mapping facts to statutory elements.</li>
        </ul>
      </section>

      <section id="sample-fir-query" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          End-to-End FIR Analysis Example
        </h2>

        <CodeBlock
          filename="cURL: Upload FIR and Query"
          language="bash"
          code={`# 1. Upload the FIR document
curl -X POST http://localhost:8000/api/cases/upload \\
  -F "file=@/path/to/FIR_102_2024.pdf" \\
  -F "case_id=case_fir_102"

# 2. Query legal merits based on uploaded document
curl -X POST http://localhost:8000/api/query \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "Based on the allegations in the FIR, what offenses are made out and what is the bailability status?",
    "case_id": "case_fir_102"
  }'`}
        />
      </section>
    </DocPageWrapper>
  );
}
