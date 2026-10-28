import { DocPageWrapper } from "@/components/DocPageWrapper";
import { Callout } from "@/components/Callout";

export const metadata = {
  title: "Nyaya Limitations & Legal Disclaimer",
  description: "Statutory boundaries, state amendment caveats, hallucination safeguards, and formal disclaimer.",
};

const toc = [
  { id: "statutory-boundaries", title: "Statutory Scope Boundaries", level: 2 as const },
  { id: "state-amendments", title: "State Amendments & Local Procedural Nuances", level: 2 as const },
  { id: "judicial-disclaimer", title: "Formal Judicial Disclaimer", level: 2 as const },
];

export default function NyayaLimitationsPage() {
  return (
    <DocPageWrapper
      title="Limitations & Legal Disclaimer"
      description="Important boundary conditions regarding statutory coverage, state-specific amendments, and formal non-replacement of legal counsel."
      badge="Legal Boundaries"
      toc={toc}
    >
      <section id="statutory-boundaries" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Statutory Scope Boundaries
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          Nyaya is currently trained and indexed over the central penal and procedural statutes of India:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-[var(--muted-text)]">
          <li><strong>Included:</strong> Indian Penal Code (1860), Code of Criminal Procedure (1973), Indian Evidence Act (1872), Bharatiya Nyaya Sanhita (2023), Bharatiya Nagarik Suraksha Sanhita (2023), Bharatiya Sakshya Adhiniyam (2023).</li>
          <li><strong>Partially Supported:</strong> Negotiable Instruments Act (Section 138), Prevention of Corruption Act, Information Technology Act (2000).</li>
          <li><strong>Unverified / Omitted:</strong> Specialized commercial statutes (Insolvency and Bankruptcy Code, Companies Act), local rent control legislation, and customary civil personal laws are currently outside the primary retrieval corpus.</li>
        </ul>
      </section>

      <section id="state-amendments" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          State Amendments &amp; Local Procedural Nuances
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          In India, criminal procedure falls under the Concurrent List of the Seventh Schedule. Several states have enacted state-specific amendments to CrPC provisions (such as anticipatory bail under Section 438 in Uttar Pradesh or West Bengal).
        </p>
        <Callout type="warning" title="Jurisdictional Caution">
          Nyaya evaluates central statutory text. Always confirm whether the jurisdiction in which the trial is pending has passed state amendments altering bailability, compounding eligibility, or maximum police remand periods.
        </Callout>
      </section>

      <section id="judicial-disclaimer" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Formal Judicial Disclaimer
        </h2>
        <Callout type="caution" title="Not Legal Advice">
          <strong>THIS SOFTWARE DOES NOT CONSTITUTE LEGAL ADVICE.</strong>
          <br /><br />
          Nyaya is a research and computational jurisprudence tool. It does not establish an attorney-client relationship. Neither Veritas nor its contributors shall be held liable for judicial actions, filing decisions, or advisory memoranda formulated on the basis of AI-generated IRAC syntheses. Certified court filings must always be prepared and reviewed by a qualified advocate enrolled with the Bar Council.
        </Callout>
      </section>
    </DocPageWrapper>
  );
}
