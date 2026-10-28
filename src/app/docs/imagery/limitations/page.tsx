import { DocPageWrapper } from "@/components/DocPageWrapper";
import { Callout } from "@/components/Callout";

export const metadata = {
  title: "AI Imagery Limitations & Ethics",
  description: "Operational limitations, calibration risks, out-of-scope tasks, and dual-use ethical considerations.",
};

const toc = [
  { id: "operational-limitations", title: "Operational Limitations", level: 2 as const },
  { id: "dataset-sampling-caveats", title: "Dataset Sampling Asymmetries", level: 2 as const },
  { id: "out-of-scope", title: "Out-of-Scope Capabilities", level: 2 as const },
  { id: "dual-use-ethics", title: "Dual-Use & Ethical Considerations", level: 2 as const },
];

export default function ImageryLimitationsPage() {
  return (
    <DocPageWrapper
      title="Limitations & Ethics"
      description="Documenting the failure modes, unmodeled artifact spaces, and dual-use ethical implications of synthetic image detectors."
      badge="Safety & Ethics"
      toc={toc}
    >
      <section id="operational-limitations" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Operational Limitations
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--muted-text)]">
          <li>
            <strong className="text-[var(--foreground)]">Detector Diversity:</strong> Three of the five evaluated models share a common CLIP ViT-L/14 backbone family. While NPR and ResNet-50 provide architectural independence, broader evaluation over diffusion reconstruction models (like DIRE) remains an open area for future integration.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Fixed Operating Threshold:</strong> All published benchmark figures reflect a default fixed cut-off at <code className="font-mono text-xs">&tau; = 0.5</code> with zero tuning. Deploying models into specialized environments requires calibrating decision thresholds against target domain cost ratios.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Compression Fragility:</strong> Neighboring-pixel models like NPR lose all discriminative signal under standard social-media JPEG compression.
          </li>
        </ul>
      </section>

      <section id="dataset-sampling-caveats" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Dataset Sampling Asymmetries
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          To maintain transparency, two empirical caveats documented in our research paper are highlighted:
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-[var(--muted-text)]">
          <li>
            <strong className="text-[var(--foreground)]">Unpaired Real Images for GenImage++:</strong> Because GenImage++ released synthetic images only for FLUX.1, SD3, and SDXL, evaluations paired these fakes against a shared pool of 162,000 BigGAN ImageNet reals. Individual detector runs drew their own random samples from this pool with minor incidental overlap (7 of 6,000 for FLUX.1/SD3, 200 of 18,300 for SDXL). All fake-accuracy metrics and paired McNemar tests are 100% strictly paired.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Training Subset Overlap:</strong> Whether the ImageNet images in the GenImage++ checkpoints&apos; training data overlap our evaluation real pools is unconfirmed from released code. This does not affect fake-accuracy findings, but could slightly flatter real-accuracy.
          </li>
        </ol>
      </section>

      <section id="out-of-scope" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Out-of-Scope Capabilities
        </h2>
        <p>
          Veritas AI Imagery Detection is explicitly <strong>NOT</strong> evaluated for:
        </p>
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4 space-y-2 text-xs text-[var(--muted-text)]">
          <p>❌ <strong>Facial Deepfakes:</strong> Face swapping, reenactment, lip-syncing (e.g. FaceForensics++, Celeb-DF). Facial manipulation has completely different artifact structures.</p>
          <p>❌ <strong>Photographs of People:</strong> Benchmarks are derived from ImageNet object and scene imagery; no claims are made regarding facial biometrics or human subjects.</p>
          <p>❌ <strong>Video Deepfake Streams:</strong> Static image pipelines do not analyze temporal inter-frame consistency (use VideoRAG for courtroom video analysis).</p>
        </div>
      </section>

      <section id="dual-use-ethics" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Dual-Use & Ethical Considerations
        </h2>
        <p>
          Publishing detailed detector blind spots carries dual-use risk: malicious actors could use this information to select generators that evade specific detectors (e.g., using FLUX.1 to evade UniversalFakeDetect).
        </p>
        <p>
          However, the information asymmetry currently harms defenders, who often deploy a single detector under the assumption that high published benchmark accuracy transfers across generators. Demonstrating that multi-lineage ensembling and frequency routing are required to eliminate blind spots provides essential defense.
        </p>

        <Callout type="caution" title="Forensic & Evidentiary Warning">
          None of these image detectors should serve as the sole evidentiary basis in legal, punitive, or employment decisions regarding an individual. The best-calibrated model still misclassifies genuine images at a non-zero rate, and the worst models are confidently wrong outside their training distribution.
        </Callout>
      </section>
    </DocPageWrapper>
  );
}
