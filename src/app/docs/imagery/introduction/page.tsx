import { DocPageWrapper } from "@/components/DocPageWrapper";
import { Callout } from "@/components/Callout";
import Link from "next/link";

export const metadata = {
  title: "AI Imagery Detection: Introduction",
  description: "Cross-architecture generalization audit and frequency-aware routing across synthetic image detectors.",
};

const toc = [
  { id: "core-challenge", title: "The Generalization Paradox", level: 2 as const },
  { id: "the-myth-of-recency", title: "Why Generator Age Fails to Predict Difficulty", level: 2 as const },
  { id: "veritas-solution", title: "The Veritas Frequency-Aware Solution", level: 2 as const },
  { id: "scope-boundaries", title: "Scope & Terminology Boundaries", level: 2 as const },
];

export default function ImageryIntroPage() {
  return (
    <DocPageWrapper
      title="AI Imagery Detection: Introduction"
      description="A rigorous, empirical investigation into why pretrained AI-generated image detectors fail on modern Diffusion Transformers (FLUX.1, SD3) and how frequency-aware routing mitigates cross-generator failure."
      badge="Computer Vision"
      toc={toc}
    >
      <section id="core-challenge" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          The Generalization Paradox
        </h2>
        <p>
          AI-generated image detectors are routinely reported with a single summary accuracy score (e.g., &ldquo;98.5% detection accuracy&rdquo;). In practice, a detector trained on one generator&apos;s outputs regularly loses most of its accuracy when evaluated against another generator.
        </p>
        <p>
          The computer vision field has largely explained this with a single narrative: <em>newer, more sophisticated generators produce subtler artifacts that older detectors were never designed to catch</em>.
        </p>
        <p>
          If this conventional explanation were true, detectors should consistently fail worst on the newest generators (such as FLUX.1 and Stable Diffusion 3), and performance patterns should look broadly similar across detectors.
        </p>
      </section>

      <section id="the-myth-of-recency" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Why Generator Age Fails to Predict Difficulty
        </h2>
        <p>
          In a comprehensive controlled audit evaluating five independently trained detectors against five generators spanning three architecture families (GAN, U-Net Diffusion, and Diffusion Transformers), <strong>this prediction completely breaks down</strong>:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
            <h3 className="font-bold text-sm text-[var(--foreground)]">
              UniversalFakeDetect (CVPR 2023)
            </h3>
            <p className="mt-1 text-xs text-[var(--muted-text)]">
              Trained on ProGAN. Scores <strong>83.0%</strong> on BigGAN, but collapses to a catastrophic <strong>7.0%</strong> fake accuracy on FLUX.1 and <strong>11.7%</strong> on SD3.
            </p>
          </div>

          <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4">
            <h3 className="font-bold text-sm text-[var(--foreground)]">
              NPR Up-Sampling Detector (CVPR 2024)
            </h3>
            <p className="mt-1 text-xs text-[var(--muted-text)]">
              Also trained on ProGAN. Achieves <strong>97.7%</strong> fake accuracy on FLUX.1 and <strong>90.1%</strong> on SD3, but drops to <strong>54.6%</strong> on SDXL.
            </p>
          </div>
        </div>

        <p className="text-sm text-[var(--muted-text)]">
          On the exact same 12,000-image evaluation set of FLUX.1, NPR correctly detects <strong>5,452 images</strong> that UniversalFakeDetect misses, while losing only 8 in the opposite direction (<code className="font-mono text-xs">p &lt; 10^-300</code> by paired McNemar test).
        </p>

        <Callout type="important" title="Key Scientific Takeaway">
          Generator age or release recency does not drive detector failure. <strong>A detector&apos;s own training distribution and representation define its blind spots.</strong> No generator is intrinsically &ldquo;easy&rdquo; or &ldquo;hard&rdquo; without specifying the detector evaluating it.
        </Callout>
      </section>

      <section id="veritas-solution" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          The Veritas Frequency-Aware Solution
        </h2>
        <p>
          Veritas addresses cross-generator failure not by hoping a single monolithic model can generalize to all future generative architectures, but through:
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-sm text-[var(--muted-text)]">
          <li>
            <strong className="text-[var(--foreground)]">2D Spectral Energy Profiling:</strong> Measuring high-frequency Fourier energy deviations to categorize the generative architecture family.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Dynamic Specialist Routing:</strong> Directing the input image to the specialist detector with the optimal inductive bias for that generative family.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Calibration Transparency:</strong> Computing Expected Calibration Error (ECE) to prevent confident misclassifications.
          </li>
        </ol>

        <div className="mt-6 flex gap-4">
          <Link
            href="/docs/imagery/architecture"
            className="rounded-lg bg-black dark:bg-white px-4 py-2 text-xs font-semibold text-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
          >
            Read Architecture &amp; Pipeline →
          </Link>
          <Link
            href="/docs/imagery/evaluation"
            className="rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] px-4 py-2 text-xs font-semibold text-[var(--foreground)] hover:border-[var(--card-hover-border)] transition-colors"
          >
            View Evaluation Benchmarks →
          </Link>
        </div>
      </section>

      <section id="scope-boundaries" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Scope &amp; Terminology Boundaries
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          To maintain forensic integrity, Veritas adheres to precise technical definitions:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--muted-text)]">
          <li>
            <strong className="text-[var(--foreground)]">AI-Generated Image Detection:</strong> The task of deciding whether an entire image was synthesized from whole cloth (ImageNet-style object and scene imagery).
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Deepfake (Facial Manipulation):</strong> A distinct problem involving local facial swapping or reenactment inside an otherwise genuine photograph (e.g. FaceForensics++, Celeb-DF). Veritas AI Imagery Detection does not evaluate face-swap edits.
          </li>
        </ul>
      </section>
    </DocPageWrapper>
  );
}
