import { DocPageWrapper } from "@/components/DocPageWrapper";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export const metadata = {
  title: "Nyaya Configuration & Models",
  description: "Environment parameters, Ollama model setup, Qdrant database indexes, and hardware allocation for Nyaya.",
};

const toc = [
  { id: "backend-env", title: "Backend Environment Configuration", level: 2 as const },
  { id: "ollama-models", title: "Ollama Model Provisioning", level: 2 as const },
  { id: "qdrant-index", title: "Qdrant Vector Database Assets", level: 2 as const },
];

export default function NyayaConfigPage() {
  return (
    <DocPageWrapper
      title="Configuration & Indexes"
      description="Configuration parameters, local model requirements, and vector storage files for the Nyaya Legal RAG system."
      badge="Configuration"
      toc={toc}
    >
      <section id="backend-env" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Backend Environment Configuration
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          Configure <code className="font-mono text-xs">nyaya/backend/.env</code>:
        </p>

        <CodeBlock
          filename="nyaya/backend/.env"
          language="bash"
          code={`# Service Binding
HOST=0.0.0.0
PORT=8000
DEBUG=false

# Ollama Endpoint & Model Identifiers
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL_REASONING=qwen2.5:14b
OLLAMA_MODEL_EXTRACTION=qwen2.5:3b

# RAG & Qdrant Relative File Paths
QDRANT_PATH=../rag/qdrant_db
DATASET_PATH=../rag/data/final_dataset.json
BM25_INDEX_PATH=../rag/data/bm25_index.pkl`}
        />
      </section>

      <section id="ollama-models" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Ollama Model Provisioning
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          Ensure Ollama is running and pull the designated models:
        </p>

        <CodeBlock
          filename="Terminal Commands"
          language="bash"
          code={`# Pull the fast extractor model (~2.0 GB download)
ollama pull qwen2.5:3b

# Pull the primary legal reasoning model (~9.0 GB download)
ollama pull qwen2.5:14b`}
        />

        <Callout type="tip" title="GPU Offload Optimization">
          If your GPU has 8GB VRAM, Ollama automatically offloads layers between GPU and system RAM. Ensure your system has at least 16GB of host RAM when running the 14B parameter model.
        </Callout>
      </section>

      <section id="qdrant-index" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Qdrant Vector Database Assets
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          The Nyaya repository ships pre-populated with:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-[var(--muted-text)]">
          <li><code className="font-mono text-xs">rag/qdrant_db/</code>: Pre-computed Qdrant vector embeddings covering IPC, CrPC, IEA, BNS, BNSS, and BSA.</li>
          <li><code className="font-mono text-xs">rag/data/final_dataset.json</code>: Ground truth statutory text, section numbers, punishments, and bailability metadata.</li>
          <li><code className="font-mono text-xs">rag/data/bm25_index.pkl</code>: Pickled inverted lexical index for instantaneous keyword lookup.</li>
        </ul>
      </section>
    </DocPageWrapper>
  );
}
