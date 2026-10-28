import { DocPageWrapper } from "@/components/DocPageWrapper";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata = {
  title: "Nyaya: Legal Answer Generation & IRAC",
  description: "Judicial reasoning structure using the Issue, Rule, Application, and Conclusion (IRAC) framework and citation grounding.",
};

const toc = [
  { id: "irac-methodology", title: "The IRAC Judicial Framework", level: 2 as const },
  { id: "local-models", title: "Two-Stage Ollama Model Pipeline", level: 2 as const },
  { id: "prompt-engineering", title: "Statutory Grounding System Prompt", level: 2 as const },
  { id: "sample-output", title: "Verified Legal Answer Example", level: 2 as const },
];

export default function NyayaGenerationPage() {
  return (
    <DocPageWrapper
      title="Legal Answer Generation & IRAC"
      description="How Nyaya structures legal reasoning using the Issue, Rule, Application, Conclusion (IRAC) judicial standard with strict statutory grounding."
      badge="Legal Reasoning"
      toc={toc}
    >
      <section id="irac-methodology" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          The IRAC Judicial Framework
        </h2>
        <p>
          Judicial opinions and legal memoranda adhere to the IRAC structure to ensure logical coherence and defensibility. Nyaya strictly formats all synthesized legal answers into four constituent blocks:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--sidebar-bg)] p-4">
            <span className="font-bold text-xs uppercase tracking-wider text-[var(--foreground)]">1. Issue</span>
            <p className="mt-1 text-xs text-[var(--muted-text)]">
              Formulates the precise legal question raised by the facts (e.g. &ldquo;Whether dishonor of a cheque for insufficiency of funds constitutes an offense under Section 138 of the Negotiable Instruments Act&rdquo;).
            </p>
          </div>

          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--sidebar-bg)] p-4">
            <span className="font-bold text-xs uppercase tracking-wider text-[var(--foreground)]">2. Rule</span>
            <p className="mt-1 text-xs text-[var(--muted-text)]">
              Cites the exact governing statutory provisions, section numbers, elements of the offense, and binding Supreme Court or High Court precedents.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--sidebar-bg)] p-4">
            <span className="font-bold text-xs uppercase tracking-wider text-[var(--foreground)]">3. Application</span>
            <p className="mt-1 text-xs text-[var(--muted-text)]">
              Applies each element of the Rule to the specific factual matrix or uploaded case evidence (FIR, charge sheet, witness testimony).
            </p>
          </div>

          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--sidebar-bg)] p-4">
            <span className="font-bold text-xs uppercase tracking-wider text-[var(--foreground)]">4. Conclusion</span>
            <p className="mt-1 text-xs text-[var(--muted-text)]">
              Delivers the final legal finding, procedural remedies, bailability status, cognizable nature, and appropriate judicial forum.
            </p>
          </div>
        </div>
      </section>

      <section id="local-models" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Two-Stage Ollama Model Pipeline
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          Nyaya separates information extraction from legal synthesis across two local Ollama models:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-sm text-[var(--muted-text)]">
          <li>
            <strong className="text-[var(--foreground)]">qwen2.5:3b (Extractor):</strong> Rapidly parses user queries and uploaded FIRs to extract the incident date, monetary sums, suspect names, and key factual predicates.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">qwen2.5:14b (Reasoner):</strong> Ingests the retrieved statutory sections and structured facts to generate the complete IRAC answer with rigorous citation grounding.
          </li>
        </ul>
      </section>

      <section id="prompt-engineering" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Statutory Grounding System Prompt
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          The synthesizer is constrained by a system prompt that penalizes hallucinated legal citations:
        </p>

        <CodeBlock
          filename="Nyaya System Prompt (Excerpt)"
          language="text"
          code={`You are Nyaya, a judicial legal reasoning engine over Indian statutory law.
Rules:
1. Every legal principle MUST cite an exact statutory section present in the retrieved context.
2. If an incident occurred before July 1, 2024, DO NOT apply BNS/BNSS/BSA; apply IPC/CrPC/IEA.
3. Structure your response into:
   ### Issue
   ### Rule
   ### Application
   ### Conclusion
4. If the retrieved statutes do not address the question, state: "The provided statutory corpus does not contain sufficient provisions to substantiate this claim." Do not invent sections.`}
        />
      </section>

      <section id="sample-output" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Verified Legal Answer Example
        </h2>

        <CodeBlock
          filename="Sample Nyaya Output"
          language="markdown"
          code={`### Issue
Whether a police officer can arrest an accused without a warrant for an offense under Section 420 IPC (Cheating), where the alleged fraud involves ₹5,00,000.

### Rule
- **Section 420 IPC (1860):** Cheating and dishonestly inducing delivery of property. Classified under the First Schedule of the Code of Criminal Procedure (CrPC 1973) as **Cognizable** and **Non-Bailable**.
- **Section 41 CrPC (1973):** Empowers police officers to arrest without warrant for cognizable offenses, subject to the conditions laid down by the Supreme Court in *Arnesh Kumar v. State of Bihar (2014)* for offenses punishable with imprisonment up to 7 years.

### Application
The offense under Section 420 carries a maximum sentence of 7 years imprisonment. While cognizable (permitting arrest without warrant in principle), the investigating officer must satisfy the objective conditions under Section 41(1)(b) CrPC—preventing further offense, tampering with evidence, or fleeing justice. In the absence of recorded reasons in writing, a notice of appearance under Section 41A CrPC must be served first.

### Conclusion
The offense is cognizable and non-bailable, triable by a Magistrate of the First Class. However, under the mandate of *Arnesh Kumar*, immediate arrest is not mandatory unless the officer records written reasons justifying custodial detention.`}
        />
      </section>
    </DocPageWrapper>
  );
}
