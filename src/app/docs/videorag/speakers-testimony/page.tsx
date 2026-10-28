import { DocPageWrapper } from "@/components/DocPageWrapper";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export const metadata = {
  title: "Speaker Diarization & Testimony Analysis",
  description: "pyannote audio diarization, Resemblyzer voiceprints, courtroom role tagging, and cross-session contradiction engine.",
};

const toc = [
  { id: "speaker-diarization", title: "Speaker Diarization & Gap Fallback", level: 2 as const },
  { id: "voiceprint-matching", title: "Resemblyzer Voiceprints & Registry", level: 2 as const },
  { id: "courtroom-roles", title: "Courtroom Role Heuristics & Editing", level: 2 as const },
  { id: "contradiction-detection", title: "Cross-Session Contradiction Detection", level: 2 as const },
];

export default function SpeakersTestimonyPage() {
  return (
    <DocPageWrapper
      title="Speaker Analysis &amp; Testimony"
      description="How VideoRAG performs speaker diarization, cross-session voiceprint matching, courtroom role mapping, and three-way contradiction detection."
      badge="Testimony Intelligence"
      toc={toc}
    >
      <section id="speaker-diarization" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Speaker Diarization &amp; Gap Fallback
        </h2>
        <p>
          In judicial proceedings, attributing statements to specific individuals (e.g. Judge, Witness, Defense Attorney, Prosecutor) is paramount. VideoRAG employs a two-tier diarization strategy:
        </p>

        <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--muted-text)]">
          <li>
            <strong className="text-[var(--foreground)]">Primary Path (pyannote.audio 3.1):</strong> If <code className="font-mono text-xs">HF_TOKEN</code> is provided and model access terms are accepted, pyannote extracts neural speaker turn boundaries with millisecond precision.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Fallback Path (Silence Gaps):</strong> If pyannote is unavailable, the pipeline falls back to an acoustic silence-gap detector (<code className="font-mono text-xs">&gt; 0.75s</code> silence threshold) to split turns.
          </li>
        </ul>

        <Callout type="note" title="Fallback Limitation">
          The gap-based fallback segments audio into separate utterances, but cannot re-identify the same speaker across different turns. For multi-speaker courtroom recordings, configuring a valid Hugging Face token is strongly recommended.
        </Callout>
      </section>

      <section id="voiceprint-matching" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Resemblyzer Voiceprints &amp; Registry
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          When multiple videos share the same <code className="font-mono text-xs">case_id</code> (representing different days or sessions of the same trial), VideoRAG links recurring speakers using <strong>Resemblyzer voice embeddings</strong>:
        </p>

        <ol className="list-decimal pl-5 space-y-1.5 text-sm text-[var(--muted-text)]">
          <li>Extracts a 256-dimensional d-vector voiceprint from each speaker turn.</li>
          <li>Averages voiceprints per identified cluster to form a speaker profile.</li>
          <li>Computes cosine similarity against previously registered speakers in the case registry.</li>
          <li>If similarity exceeds threshold (<code className="font-mono text-xs">&gt; 0.78</code>), flags a pending match for human confirmation.</li>
        </ol>

        <CodeBlock
          filename="Speaker Match API Response"
          language="json"
          code={`// GET /cases/{case_id}/speaker-matches
{
  "case_id": "case_trial_2026_09",
  "pending_matches": [
    {
      "match_id": "match_849",
      "new_speaker_id": "spk_session_03_02",
      "matched_registered_speaker": "spk_session_01_01",
      "canonical_name": "Dr. Sarah Lin (Forensic Expert)",
      "similarity_score": 0.892,
      "status": "pending_confirmation"
    }
  ]
}`}
        />
      </section>

      <section id="courtroom-roles" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Courtroom Role Heuristics &amp; Editing
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          Initial courtroom roles are inferred using linguistic cue phrases:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-[var(--muted-text)]">
          <li><strong>Judge:</strong> Cues such as &ldquo;Order in the court&rdquo;, &ldquo;Sustained&rdquo;, &ldquo;Overruled&rdquo;, &ldquo;Bailiff&rdquo;.</li>
          <li><strong>Counsel:</strong> Cues such as &ldquo;Your Honor&rdquo;, &ldquo;Objection&rdquo;, &ldquo;I submit that&rdquo;.</li>
          <li><strong>Witness:</strong> Cues responding directly to interrogation turns.</li>
        </ul>
        <p className="text-xs text-[var(--muted-text)]">
          Users can manually edit, rename, or reassign roles via the CasePanel in the React UI or by submitting <code className="font-mono text-xs">POST /videos/&#123;id&#125;/speakers</code>.
        </p>
      </section>

      <section id="contradiction-detection" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Cross-Session Contradiction Detection
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          When a speaker testifies across multiple trial sessions, statements are indexed into <code className="font-mono text-xs">testimony.db</code>. VideoRAG scans for cross-session inconsistencies using a three-way classifier:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4 text-center text-xs">
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-3">
            <span className="font-bold text-[var(--foreground)]">CONTRADICT</span>
            <p className="mt-1 text-[11px] text-[var(--muted-text)]">Mutually exclusive claims (e.g. &ldquo;car was green&rdquo; vs &ldquo;car was red&rdquo;).</p>
          </div>
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-3">
            <span className="font-bold text-[var(--foreground)]">ENTAIL</span>
            <p className="mt-1 text-[11px] text-[var(--muted-text)]">Consistent elaborations (e.g. &ldquo;vehicle was speeding&rdquo; &rarr; &ldquo;over 70 mph&rdquo;).</p>
          </div>
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-3">
            <span className="font-bold text-[var(--foreground)]">UNRELATED</span>
            <p className="mt-1 text-[11px] text-[var(--muted-text)]">Unconnected topics or unrelated factual assertions.</p>
          </div>
        </div>

        <p className="text-xs text-[var(--muted-text)]">
          Contradiction records highlight both exact timestamps and quote excerpts, allowing attorneys to pinpoint where a witness altered their deposition.
        </p>
      </section>
    </DocPageWrapper>
  );
}
