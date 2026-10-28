import { DocPageWrapper } from "@/components/DocPageWrapper";
import { Callout } from "@/components/Callout";

export const metadata = {
  title: "AI Imagery Evaluation & Benchmarks",
  description: "Controlled empirical cross-generator audit: 25 detector-generator cells, threshold-free AUC, ECE, and paired McNemar tests.",
};

const toc = [
  { id: "methodology-controls", title: "Methodology & Controls", level: 2 as const },
  { id: "accuracy-benchmarks", title: "Table 2: Fake / Real Accuracy", level: 2 as const },
  { id: "auc-ece-benchmarks", title: "Table 3: Threshold-Free AUC & Calibration (ECE)", level: 2 as const },
  { id: "mcnemar-tests", title: "Table 4: Paired McNemar Significance Tests", level: 2 as const },
  { id: "confident-error-signature", title: "The Signature of Confident Error", level: 2 as const },
];

export default function ImageryEvaluationPage() {
  return (
    <DocPageWrapper
      title="Evaluation & Benchmarks"
      description="Full empirical audit of five pretrained detectors across five generator architectures, validated on identical image splits with strict statistical significance tests."
      badge="Empirical Audit"
      toc={toc}
    >
      <section id="methodology-controls" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Methodology &amp; Controls
        </h2>
        <p>
          Every result comes from running pretrained, publicly released detector checkpoints over verified test image sets with zero fine-tuning:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-[var(--muted-text)]">
          <li><strong>Generators:</strong> BigGAN (GAN, 128x128), GLIDE (early U-Net diffusion, 256x256), SDXL (modern U-Net, 1024x1024), FLUX.1 (Diffusion Transformer, 1024x1024), and SD3 (Diffusion Transformer, 1024x1024).</li>
          <li><strong>Sample Sizes:</strong> 6,000 real and 6,000 fake images for BigGAN, GLIDE, FLUX.1, and SD3; 18,300–18,301 per class for SDXL (95% CI half-width of &plusmn;1.26 points for n=6,000, &plusmn;0.72 for n=18,300).</li>
          <li><strong>Leakage Verified Absent:</strong> None of the five evaluation generators appeared in any detector&apos;s training data (confirmed against primary publications).</li>
        </ul>
      </section>

      <section id="accuracy-benchmarks" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Table 2: Fake / Real Accuracy (%) at Threshold 0.5
        </h2>
        <p className="text-xs text-[var(--muted-text)]">
          Real accuracy is reported alongside fake accuracy so the fake column cannot be misinterpreted as a degenerate detector that merely predicts &ldquo;generated&rdquo; everywhere.
        </p>

        <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] my-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[var(--sidebar-bg)] border-b border-[var(--border-color)] font-semibold text-[var(--foreground)]">
                <th className="p-3">Detector</th>
                <th className="p-3">BigGAN</th>
                <th className="p-3">GLIDE</th>
                <th className="p-3">FLUX.1</th>
                <th className="p-3">SD3</th>
                <th className="p-3">SDXL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--muted-text)] font-mono">
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">UniversalFakeDetect</td>
                <td className="p-3">83.0 / 97.4</td>
                <td className="p-3">27.4 / 97.7</td>
                <td className="p-3 font-bold text-[var(--foreground)]">7.0 / 96.8</td>
                <td className="p-3">11.7 / 96.8</td>
                <td className="p-3">38.5 / 96.8</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">NPR</td>
                <td className="p-3">84.1 / 86.0</td>
                <td className="p-3">94.3 / 86.2</td>
                <td className="p-3 font-bold text-[var(--foreground)]">97.7 / 88.1</td>
                <td className="p-3">90.1 / 88.1</td>
                <td className="p-3 font-bold text-[var(--foreground)]">54.6 / 87.7</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">GenImage++ ResNet-50</td>
                <td className="p-3 font-bold text-[var(--foreground)]">0.4 / 98.5</td>
                <td className="p-3">6.0 / 98.3</td>
                <td className="p-3">54.9 / 98.9</td>
                <td className="p-3">66.1 / 98.9</td>
                <td className="p-3">15.2 / 98.6</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">GenImage++ CLIP Baseline</td>
                <td className="p-3 font-bold text-[var(--foreground)]">9.6 / 96.5</td>
                <td className="p-3">69.1 / 96.0</td>
                <td className="p-3">86.5 / 97.4</td>
                <td className="p-3">88.6 / 97.4</td>
                <td className="p-3">77.0 / 97.4</td>
              </tr>
              <tr className="bg-[var(--sidebar-bg)]">
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">GenImage++ CLIP-LoRA (OMAT)</td>
                <td className="p-3 font-bold text-[var(--foreground)]">99.7 / 94.8</td>
                <td className="p-3 font-bold text-[var(--foreground)]">99.9 / 94.9</td>
                <td className="p-3 font-bold text-[var(--foreground)]">96.5 / 96.0</td>
                <td className="p-3 font-bold text-[var(--foreground)]">98.3 / 96.0</td>
                <td className="p-3 font-bold text-[var(--foreground)]">99.2 / 94.7</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="auc-ece-benchmarks" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Table 3: Threshold-Free AUC (%) / Calibration (ECE, 15 bins)
        </h2>
        <p className="text-xs text-[var(--muted-text)]">
          Expected Calibration Error (ECE) measures how closely predicted probabilities reflect actual empirical correctness (lower is better).
        </p>

        <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] my-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[var(--sidebar-bg)] border-b border-[var(--border-color)] font-semibold text-[var(--foreground)]">
                <th className="p-3">Detector</th>
                <th className="p-3">BigGAN</th>
                <th className="p-3">GLIDE</th>
                <th className="p-3">FLUX.1</th>
                <th className="p-3">SD3</th>
                <th className="p-3">SDXL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--muted-text)] font-mono">
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">UniversalFakeDetect</td>
                <td className="p-3">98.2 / .042</td>
                <td className="p-3">85.6 / .300</td>
                <td className="p-3 font-bold text-[var(--foreground)]">61.4 / .439</td>
                <td className="p-3">72.5 / .406</td>
                <td className="p-3">85.4 / .245</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">NPR</td>
                <td className="p-3">91.3 / .126</td>
                <td className="p-3">95.2 / .084</td>
                <td className="p-3 font-bold text-[var(--foreground)]">96.9 / .060</td>
                <td className="p-3">94.4 / .091</td>
                <td className="p-3">76.5 / .268</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">GenImage++ ResNet-50</td>
                <td className="p-3 font-bold text-[var(--foreground)]">51.4 / .503</td>
                <td className="p-3">60.3 / .469</td>
                <td className="p-3">86.2 / .212</td>
                <td className="p-3">92.8 / .153</td>
                <td className="p-3">68.8 / .415</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">GenImage++ CLIP Baseline</td>
                <td className="p-3 font-bold text-[var(--foreground)]">68.0 / .433</td>
                <td className="p-3">94.0 / .120</td>
                <td className="p-3">98.6 / .034</td>
                <td className="p-3">98.7 / .031</td>
                <td className="p-3">97.0 / .076</td>
              </tr>
              <tr className="bg-[var(--sidebar-bg)]">
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">GenImage++ CLIP-LoRA (OMAT)</td>
                <td className="p-3 font-bold text-[var(--foreground)]">99.7 / .015</td>
                <td className="p-3 font-bold text-[var(--foreground)]">99.8 / .015</td>
                <td className="p-3 font-bold text-[var(--foreground)]">99.3 / .020</td>
                <td className="p-3 font-bold text-[var(--foreground)]">99.7 / .015</td>
                <td className="p-3 font-bold text-[var(--foreground)]">99.4 / .012</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="mcnemar-tests" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Table 4: Paired McNemar Tests on Identical Fake Images
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          Differences read off a table are not proof of superiority. We conducted exact two-sided binomial tests on discordant pairs (<code className="font-mono text-xs">n01</code> vs <code className="font-mono text-xs">n10</code>) on matched image sets:
        </p>

        <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] my-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[var(--sidebar-bg)] border-b border-[var(--border-color)] font-semibold text-[var(--foreground)]">
                <th className="p-3">Generator</th>
                <th className="p-3">Comparison (A vs B)</th>
                <th className="p-3">n01 (A correct, B wrong)</th>
                <th className="p-3">n10 (B correct, A wrong)</th>
                <th className="p-3">Exact p-value</th>
                <th className="p-3">Statistical Conclusion</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--muted-text)]">
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">BigGAN</td>
                <td className="p-3">UniversalFakeDetect vs NPR</td>
                <td className="p-3 font-mono">835</td>
                <td className="p-3 font-mono">905</td>
                <td className="p-3 font-mono">p = 0.098</td>
                <td className="p-3 font-medium text-[var(--foreground)]">Non-significant: detectors behave identically on shared lineage.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">BigGAN</td>
                <td className="p-3">CLIP vs CLIP-LoRA</td>
                <td className="p-3 font-mono">0</td>
                <td className="p-3 font-mono">5406</td>
                <td className="p-3 font-mono">&lt; 10^-300</td>
                <td className="p-3 font-medium text-[var(--foreground)]">Decisive improvement via adversarial fine-tuning.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">GLIDE</td>
                <td className="p-3">UniversalFakeDetect vs NPR</td>
                <td className="p-3 font-mono">97</td>
                <td className="p-3 font-mono">4113</td>
                <td className="p-3 font-mono">&lt; 10^-300</td>
                <td className="p-3 font-medium text-[var(--foreground)]">Decisive divergence across representations.</td>
              </tr>
              <tr className="bg-[var(--sidebar-bg)]">
                <td className="p-3 font-semibold text-[var(--foreground)]">FLUX.1</td>
                <td className="p-3 font-bold text-[var(--foreground)]">UniversalFakeDetect vs NPR</td>
                <td className="p-3 font-mono font-bold">8</td>
                <td className="p-3 font-mono font-bold text-[var(--foreground)]">5452</td>
                <td className="p-3 font-mono font-bold">&lt; 10^-300</td>
                <td className="p-3 font-bold text-[var(--foreground)]">Sharpest contrast: NPR recovers 5,452 images missed by UFD.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">SDXL</td>
                <td className="p-3">CLIP vs CLIP-LoRA</td>
                <td className="p-3 font-mono">74</td>
                <td className="p-3 font-mono">4136</td>
                <td className="p-3 font-mono">&lt; 10^-300</td>
                <td className="p-3 font-medium text-[var(--foreground)]">Decisive generalization on modern U-Net.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="confident-error-signature" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          The Signature of Confident Error
        </h2>
        <p>
          A benign detector failure mode would push probabilities toward the uncertain boundary (<code className="font-mono text-xs">p &asymp; 0.5</code>) and yield a low Expected Calibration Error.
        </p>
        <p>
          Instead, our calibration analysis shows that <strong>calibration error rises alongside error rate</strong>. On FLUX.1 and SD3, where UniversalFakeDetect fails hardest, the predicted fake-probability distribution collapses into the <code className="font-mono text-xs">0.0–0.1</code> bin (the region occupied by genuine photographs), reaching an ECE of <code className="font-mono text-xs">0.439</code>.
        </p>
        <Callout type="caution" title="Deployment Consequence">
          Detectors outside their training distribution do not signal unreliability through hesitation or lower confidence; <strong>they stay confident and become wrong</strong>. Systems relying on simple confidence thresholding will silently admit deepfakes unless paired with frequency routing.
        </Callout>
      </section>
    </DocPageWrapper>
  );
}
