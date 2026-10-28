import { DocPageWrapper } from "@/components/DocPageWrapper";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { Callout } from "@/components/Callout";
import Link from "next/link";

export const metadata = {
  title: "Nyaya Legal RAG: Introduction",
  description: "Citation-grounded statutory question answering over Indian penal law and judicial evidence fusion.",
};

const toc = [
  { id: "legal-context", title: "The Indian Legal Landscape & The 2024 Transition", level: 2 as const },
  { id: "core-capabilities", title: "Core Capabilities", level: 2 as const },
  { id: "three-tier-design", title: "Three-Tier Architecture", level: 2 as const },
  { id: "legal-disclaimer", title: "Evidentiary & Legal Disclaimer", level: 2 as const },
];

export default function NyayaIntroPage() {
  return (
    <DocPageWrapper
      title="Nyaya Legal RAG: Introduction"
      description="A full-stack, citation-grounded question answering system over Indian statutory law, with hybrid dense-sparse retrieval, temporal validity filtering, and case document fusion."
      badge="Legal Intelligence"
      toc={toc}
    >
      <section id="legal-context" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          The Indian Legal Landscape &amp; The 2024 Transition
        </h2>
        <p>
          On July 1, 2024, India implemented a historic overhaul of its criminal justice system, replacing colonial-era statutes with modernized penal codes:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4 text-xs">
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-3">
            <span className="font-bold text-[var(--foreground)]">Penal Code</span>
            <p className="mt-1 text-[var(--muted-text)] font-mono">Indian Penal Code (IPC 1860) &rarr; Bharatiya Nyaya Sanhita (BNS 2023)</p>
          </div>
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-3">
            <span className="font-bold text-[var(--foreground)]">Criminal Procedure</span>
            <p className="mt-1 text-[var(--muted-text)] font-mono">Code of Criminal Procedure (CrPC 1973) &rarr; BNSS 2023</p>
          </div>
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-3">
            <span className="font-bold text-[var(--foreground)]">Evidence Act</span>
            <p className="mt-1 text-[var(--muted-text)] font-mono">Indian Evidence Act (IEA 1872) &rarr; Bharatiya Sakshya Adhiniyam (BSA 2023)</p>
          </div>
        </div>
        <p className="text-sm text-[var(--muted-text)]">
          This transition creates a severe legal challenge: <strong>crimes committed before July 1, 2024 must be prosecuted under IPC/CrPC</strong>, whereas crimes committed after that date must be prosecuted under BNS/BNSS. Standard legal LLMs frequently conflate these codes, citing repealed sections or applying new statutes retrospectively.
        </p>
      </section>

      <section id="core-capabilities" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Core Capabilities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
            <h3 className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--foreground)]" />
              Hybrid Retrieval (Dense + Sparse BM25)
            </h3>
            <p className="mt-1 text-xs text-[var(--muted-text)]">
              Combines semantic dense vector search via Qdrant with exact statutory section matching via BM25, ensuring queries like &ldquo;Section 420 IPC vs Section 318 BNS&rdquo; retrieve the exact provisions.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
            <h3 className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--foreground)]" />
              Temporal Validity Filtering
            </h3>
            <p className="mt-1 text-xs text-[var(--muted-text)]">
              Automatically evaluates the alleged date of incident. If prior to July 1, 2024, filters out BNS statutes; if subsequent, applies modern penal provisions without retrospective leakage.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
            <h3 className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--foreground)]" />
              Case Document Fusion
            </h3>
            <p className="mt-1 text-xs text-[var(--muted-text)]">
              Integrates external case files—including First Information Reports (FIRs), police charge sheets, forensic chemical analyses, and witness depositions—into the statutory retrieval context.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
            <h3 className="font-bold text-sm text-[var(--foreground)] flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--foreground)]" />
              IRAC Legal Reasoning Formulation
            </h3>
            <p className="mt-1 text-xs text-[var(--muted-text)]">
              Structures all synthesized answers according to the formal judicial IRAC framework: <strong>Issue</strong>, <strong>Rule</strong>, <strong>Application</strong>, and <strong>Conclusion</strong>, backed by statutory citations.
            </p>
          </div>
        </div>
      </section>

      <section id="three-tier-design" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Three-Tier Architecture
        </h2>
        <ArchitectureDiagram
          type="nyaya"
          title="Nyaya Full-Stack System Architecture"
          caption="Data flow from legal prompt and case documents to hybrid retrieval, temporal filtering, and IRAC answer generation."
        />

        <div className="mt-6 flex gap-4">
          <Link
            href="/docs/nyaya/architecture"
            className="rounded-lg bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-white hover:bg-[var(--accent-hover)] transition-colors"
          >
            Nyaya Architecture Details →
          </Link>
          <Link
            href="/docs/nyaya/retrieval"
            className="rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] px-4 py-2 text-xs font-semibold text-[var(--foreground)] hover:border-[var(--accent)] transition-colors"
          >
            Hybrid Retrieval Pipeline →
          </Link>
        </div>
      </section>

      <section id="legal-disclaimer" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Evidentiary & Legal Disclaimer
        </h2>
        <Callout type="caution" title="Important Legal Notice">
          Nyaya is an academic and investigative software system designed to assist legal researchers, advocates, and paralegals. <strong>Nyaya does not provide formal legal advice</strong>. AI-generated statutory citations and IRAC analyses must always be verified against official government gazettes and certified court records by a qualified advocate.
        </Callout>
      </section>
    </DocPageWrapper>
  );
}
