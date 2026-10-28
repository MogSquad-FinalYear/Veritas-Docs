import { DocPageWrapper } from "@/components/DocPageWrapper";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export const metadata = {
  title: "Nyaya Hybrid Retrieval & Reranking",
  description: "Dense Qdrant vector retrieval fused with sparse BM25 lexical search and IRAC relevance reranking.",
};

const toc = [
  { id: "dual-retrieval", title: "Why Hybrid Retrieval is Critical in Law", level: 2 as const },
  { id: "dense-vector-qdrant", title: "Dense Vector Search (Qdrant)", level: 2 as const },
  { id: "sparse-bm25", title: "Sparse Lexical Search (BM25)", level: 2 as const },
  { id: "reciprocal-rank-fusion", title: "Reciprocal Rank Fusion (RRF) & Reranking", level: 2 as const },
];

export default function NyayaRetrievalPage() {
  return (
    <DocPageWrapper
      title="Hybrid Retrieval & Reranking"
      description="How Nyaya fuses dense semantic vectors with exact sparse lexical matching to retrieve precise Indian statutory provisions."
      badge="Legal Retrieval"
      toc={toc}
    >
      <section id="dual-retrieval" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Why Hybrid Retrieval is Critical in Law
        </h2>
        <p>
          Pure semantic vector search (dense retrieval) fails on legal statutes for two reasons:
        </p>
        <ol className="list-decimal pl-5 space-y-1.5 text-sm text-[var(--muted-text)]">
          <li><strong>Exact Section Numbers:</strong> A query for &ldquo;Section 302 IPC&rdquo; (Murder) vs &ldquo;Section 304 IPC&rdquo; (Culpable homicide) shares almost identical embedding space in standard vector encoders, but represents completely distinct statutory offenses.</li>
          <li><strong>Statutory Terminology:</strong> Terms of art like &ldquo;mens rea&rdquo;, &ldquo;quashment&rdquo;, &ldquo;anticipatory bail&rdquo;, or &ldquo;default bail under Section 167(2)&rdquo; require exact keyword matching that dense models frequently dilute.</li>
        </ol>
        <p className="text-sm text-[var(--muted-text)]">
          Conversely, pure keyword search fails on natural-language layman descriptions (e.g. &ldquo;someone cheated me by selling fake gold online&rdquo;). Nyaya solves this with a <strong>hybrid dense + sparse pipeline</strong>.
        </p>
      </section>

      <section id="dense-vector-qdrant" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Dense Vector Search (Qdrant)
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          Nyaya indexes over 1,500 statutory sections and annotated legal precedents into a local Qdrant collection located in <code className="font-mono text-xs">rag/qdrant_db/</code>:
        </p>

        <CodeBlock
          filename="Qdrant Payload Schema"
          language="json"
          code={`{
  "section_id": "IPC_302",
  "act": "Indian Penal Code",
  "year": 1860,
  "section_number": "302",
  "title": "Punishment for murder",
  "content": "Whoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine.",
  "bailable": false,
  "cognizable": true,
  "triable_by": "Court of Session",
  "corresponding_bns_section": "BNS_103"
}`}
        />
      </section>

      <section id="sparse-bm25" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Sparse Lexical Search (BM25)
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          In parallel, a BM25 index built over tokenized statutory text is loaded from <code className="font-mono text-xs">rag/data/bm25_index.pkl</code>:
        </p>

        <CodeBlock
          filename="BM25 Token Scoring Formula"
          language="text"
          code={`Score(D, Q) = ∑ IDF(q_i) · [ f(q_i, D) · (k_1 + 1) ] / [ f(q_i, D) + k_1 · (1 - b + b · |D| / avgdl) ]`}
        />
        <p className="text-xs text-[var(--muted-text)]">
          Tuned with parameters <code className="font-mono text-xs">k1 = 1.5</code>, <code className="font-mono text-xs">b = 0.75</code> to prioritize exact legal section matches and phrase keywords.
        </p>
      </section>

      <section id="reciprocal-rank-fusion" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Reciprocal Rank Fusion (RRF) &amp; Reranking
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          Candidate results from Qdrant and BM25 are fused using Reciprocal Rank Fusion:
        </p>

        <CodeBlock
          filename="RRF Scoring Algorithm"
          language="python"
          code={`def reciprocal_rank_fusion(dense_ranks, sparse_ranks, k=60):
    rrf_scores = {}
    for rank, doc_id in enumerate(dense_ranks):
        rrf_scores[doc_id] = rrf_scores.get(doc_id, 0.0) + 1.0 / (k + rank + 1)
    for rank, doc_id in enumerate(sparse_ranks):
        rrf_scores[doc_id] = rrf_scores.get(doc_id, 0.0) + 1.0 / (k + rank + 1)
    
    # Sort documents by combined RRF score
    return sorted(rrf_scores.items(), key=lambda x: x[1], reverse=True)`}
        />

        <Callout type="tip" title="IRAC Legal Relevance Reranking">
          Following RRF, top candidates pass through an IRAC cross-encoder that elevates statutes directly addressing the <em>Issue</em> and <em>Rule</em> components of the legal query over tangential definitions.
        </Callout>
      </section>
    </DocPageWrapper>
  );
}
