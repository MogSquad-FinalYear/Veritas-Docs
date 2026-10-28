import { DocPageWrapper } from "@/components/DocPageWrapper";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata = {
  title: "Nyaya REST API Reference",
  description: "REST API endpoints for Nyaya FastAPI service: /api/query, /api/cases/upload, and /api/health.",
};

const toc = [
  { id: "post-query", title: "POST /api/query", level: 2 as const },
  { id: "post-case-upload", title: "POST /api/cases/upload", level: 2 as const },
  { id: "get-health", title: "GET /api/health", level: 2 as const },
];

export default function NyayaApiPage() {
  return (
    <DocPageWrapper
      title="Nyaya API Reference"
      description="Technical documentation of the REST endpoints exposed by Nyaya's FastAPI service."
      badge="REST API"
      toc={toc}
    >
      <section id="post-query" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          POST /api/query
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          Submit a natural language legal question, with optional incident date for temporal validity filtering and optional case document linkage.
        </p>

        <CodeBlock
          filename="Request JSON Payload"
          language="json"
          code={`{
  "query": "What constitutes an offense of criminal breach of trust and what is the punishment?",
  "incident_date": "2024-08-15",     // Optional: ISO 8601 date string
  "case_id": "case_fir_102",         // Optional: link to uploaded case documents
  "top_k": 5                         // Optional: number of statutes to retrieve
}`}
        />

        <CodeBlock
          filename="Response (200 OK)"
          language="json"
          code={`{
  "irac_response": {
    "issue": "Whether the entrustment of property and subsequent dishonest misappropriation satisfies the ingredients of criminal breach of trust.",
    "rule": "Section 316 of the Bharatiya Nyaya Sanhita (BNS 2023) defines criminal breach of trust, punishable with imprisonment up to 5 years, or fine, or both.",
    "application": "Because the alleged offense occurred on August 15, 2024, the provisions of BNS 2023 apply pursuant to the notification of July 1, 2024.",
    "conclusion": "The offense under Section 316 BNS is Cognizable and Non-Bailable, triable by a Magistrate of the First Class."
  },
  "temporal_routing": {
    "incident_date": "2024-08-15",
    "applied_statutory_corpus": "Bharatiya Nyaya Sanhita (BNS 2023)",
    "colonial_code_equivalent": "Section 405 / 406 IPC (1860)"
  },
  "cited_statutes": [
    {
      "section_id": "BNS_316",
      "act": "Bharatiya Nyaya Sanhita",
      "section_number": "316",
      "title": "Criminal breach of trust"
    }
  ]
}`}
        />
      </section>

      <section id="post-case-upload" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          POST /api/cases/upload
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          Uploads an evidentiary case document (PDF, TXT, or MD) to be indexed for query fusion.
        </p>

        <CodeBlock
          filename="cURL Multipart Request"
          language="bash"
          code={`curl -X POST http://localhost:8000/api/cases/upload \\
  -F "file=@/path/to/ChargeSheet_2024.pdf" \\
  -F "case_id=case_fir_102"`}
        />

        <CodeBlock
          filename="Response (200 OK)"
          language="json"
          code={`{
  "status": "success",
  "case_id": "case_fir_102",
  "filename": "ChargeSheet_2024.pdf",
  "chunks_indexed": 14,
  "detected_incident_date": "2024-08-15"
}`}
        />
      </section>

      <section id="get-health" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          GET /api/health
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          Health check endpoint reporting backend readiness, model status, and vector store connectivity.
        </p>

        <CodeBlock
          filename="Response (200 OK)"
          language="json"
          code={`{
  "status": "ready",
  "rag_in_process": true,
  "ollama": {
    "host": "http://localhost:11434",
    "extractor_model": "qwen2.5:3b",
    "reasoner_model": "qwen2.5:14b",
    "status": "connected"
  },
  "qdrant": {
    "storage_path": "../rag/qdrant_db",
    "status": "ready"
  },
  "bm25_index": {
    "status": "loaded",
    "corpus_size": 1542
  }
}`}
        />
      </section>
    </DocPageWrapper>
  );
}
