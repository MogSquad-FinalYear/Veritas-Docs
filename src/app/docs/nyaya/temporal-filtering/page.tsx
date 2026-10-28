import { DocPageWrapper } from "@/components/DocPageWrapper";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata = {
  title: "Temporal Validity Filtering in Indian Law",
  description: "Handling the transition between colonial laws (IPC/CrPC) and modern codes (BNS/BNSS) based on the date of alleged offense.",
};

const toc = [
  { id: "constitutional-principle", title: "Article 20(1) & Non-Retrospective Criminal Law", level: 2 as const },
  { id: "cut-off-date", title: "The July 1, 2024 Statutory Boundary", level: 2 as const },
  { id: "filtering-algorithm", title: "Temporal Date Extraction & Filtering Logic", level: 2 as const },
  { id: "statute-mapping", title: "Statutory Equivalence Mapping Table", level: 2 as const },
];

export default function TemporalFilteringPage() {
  return (
    <DocPageWrapper
      title="Temporal Validity Filtering"
      description="How Nyaya prevents retrospective criminalization and ensures statutory validity during India's transition to the new criminal penal codes."
      badge="Jurisprudence"
      toc={toc}
    >
      <section id="constitutional-principle" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Article 20(1) &amp; Non-Retrospective Criminal Law
        </h2>
        <p>
          Article 20(1) of the Constitution of India enshrines the fundamental right against <em>ex post facto</em> laws:
        </p>
        <blockquote className="border-l-4 border-[var(--accent)] pl-4 py-1 italic text-xs text-[var(--muted-text)]">
          &ldquo;No person shall be convicted of any offence except for violation of a law in force at the time of the commission of the act charged as an offence...&rdquo;
        </blockquote>
        <p className="text-sm text-[var(--muted-text)]">
          Consequently, any AI system answering legal questions must enforce strict temporal boundaries: an act committed on June 30, 2024 cannot be charged under the Bharatiya Nyaya Sanhita (BNS 2023), as the BNS was not yet in force.
        </p>
      </section>

      <section id="cut-off-date" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          The July 1, 2024 Statutory Boundary
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          The Ministry of Home Affairs notified July 1, 2024 as the official implementation date for:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-[var(--muted-text)]">
          <li><strong>Bharatiya Nyaya Sanhita (BNS 2023):</strong> Replaces the Indian Penal Code (IPC 1860).</li>
          <li><strong>Bharatiya Nagarik Suraksha Sanhita (BNSS 2023):</strong> Replaces the Code of Criminal Procedure (CrPC 1973).</li>
          <li><strong>Bharatiya Sakshya Adhiniyam (BSA 2023):</strong> Replaces the Indian Evidence Act (IEA 1872).</li>
        </ul>
      </section>

      <section id="filtering-algorithm" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Temporal Date Extraction &amp; Filtering Logic
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          Nyaya automatically extracts the offense timestamp from user prompts or uploaded FIR metadata:
        </p>

        <CodeBlock
          filename="Temporal Validity Filter Implementation"
          language="python"
          code={`from datetime import datetime

TRANSITION_DATE = datetime(2024, 7, 1)

def apply_temporal_statutory_filter(qdrant_client, incident_date: datetime):
    """
    Constructs a Qdrant query filter ensuring only statutes in force at incident_date are retrieved.
    """
    if incident_date < TRANSITION_DATE:
        # Pre-transition: enforce IPC, CrPC, and IEA
        filter_condition = {
            "must": [
                {"key": "act", "match": {"any": ["Indian Penal Code", "Code of Criminal Procedure", "Indian Evidence Act"]}}
            ]
        }
    else:
        # Post-transition: enforce modern BNS, BNSS, and BSA
        filter_condition = {
            "must": [
                {"key": "act", "match": {"any": ["Bharatiya Nyaya Sanhita", "Bharatiya Nagarik Suraksha Sanhita", "Bharatiya Sakshya Adhiniyam"]}}
            ]
        }
    return filter_condition`}
        />
      </section>

      <section id="statute-mapping" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Statutory Equivalence Mapping Table
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          Nyaya maintains cross-reference equivalence records for major penal provisions:
        </p>

        <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] my-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[var(--sidebar-bg)] border-b border-[var(--border-color)] font-semibold text-[var(--foreground)]">
                <th className="p-3">Offense</th>
                <th className="p-3">Colonial Code (Pre-July 2024)</th>
                <th className="p-3">New Code (Post-July 2024)</th>
                <th className="p-3">Key Procedural Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--muted-text)]">
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">Murder</td>
                <td className="p-3 font-mono">Section 302 IPC</td>
                <td className="p-3 font-mono font-bold text-[var(--foreground)]">Section 103 BNS</td>
                <td className="p-3">Added sub-clause for mob lynching based on race, caste, or community.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">Cheating</td>
                <td className="p-3 font-mono">Section 420 IPC</td>
                <td className="p-3 font-mono font-bold text-[var(--foreground)]">Section 318 BNS</td>
                <td className="p-3">Consolidated cheating and dishonest inducement under Section 318(4).</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">First Information Report</td>
                <td className="p-3 font-mono">Section 154 CrPC</td>
                <td className="p-3 font-mono font-bold text-[var(--foreground)]">Section 173 BNSS</td>
                <td className="p-3">Explicit statutory recognition of electronic FIR (e-FIR).</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">Electronic Records Evidence</td>
                <td className="p-3 font-mono">Section 65B IEA</td>
                <td className="p-3 font-mono font-bold text-[var(--foreground)]">Section 61 BSA</td>
                <td className="p-3">Electronic evidence given parity with primary documentary evidence.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocPageWrapper>
  );
}
