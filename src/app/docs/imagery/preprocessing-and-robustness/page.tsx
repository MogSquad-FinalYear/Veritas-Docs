import { DocPageWrapper } from "@/components/DocPageWrapper";
import { Callout } from "@/components/Callout";

export const metadata = {
  title: "Preprocessing Hazards & JPEG Robustness",
  description: "A reproducible investigation into resize artifacts, interpolation kernels, JPEG-75 collapse, and benchmark compression confounds.",
};

const toc = [
  { id: "preprocessing-hazard", title: "The 6x Preprocessing Discrepancy", level: 2 as const },
  { id: "padding-vs-upsampling", title: "Table 5: Padding vs Official Upsampling", level: 2 as const },
  { id: "border-vs-interpolation", title: "Separating Interpolation from Border Artifacts", level: 2 as const },
  { id: "jpeg-robustness", title: "Table 6: JPEG Quality-75 Collapse", level: 2 as const },
  { id: "compression-confound", title: "The PNG vs JPEG Benchmark Confound", level: 2 as const },
];

export default function PreprocessingRobustnessPage() {
  return (
    <DocPageWrapper
      title="Preprocessing Hazards & JPEG Robustness"
      description="Methodological findings on how undocumented resize conventions shift accuracy by over 15 points, how ordinary JPEG re-encoding breaks artifact detectors, and the PNG vs JPEG benchmark confound."
      badge="Methodology"
      toc={toc}
    >
      <section id="preprocessing-hazard" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          The 6x Preprocessing Discrepancy
        </h2>
        <p>
          During our initial evaluation, our fake accuracy for the GenImage++ CLIP baseline on BigGAN sat at <strong>9.6%</strong>, roughly <strong>6x below</strong> the 62.66% reported by Zhou et al. on the same benchmark.
        </p>
        <p>
          We investigated this gap to eliminate implementation bugs. We discovered two compounding factors:
        </p>
        <ol className="list-decimal pl-5 space-y-1.5 text-sm text-[var(--muted-text)]">
          <li><strong>Metric Definition Mismatch:</strong> The source paper reported overall accuracy across both classes (real and fake), whereas our first reading was fake-only.</li>
          <li><strong>Resize Convention:</strong> GenImage ships BigGAN fakes at 128x128 (while GLIDE ships at 256x256). Released code resizes every input to 224x224 via bicubic interpolation, upsampling BigGAN by nearly 2x.</li>
        </ol>
      </section>

      <section id="padding-vs-upsampling" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Table 5: Padding vs Official Upsampling
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          Swapping the official upsample for a native-resolution-preserving path (pasting 128x128 onto a 224x224 black canvas) moves the baseline closer to the paper, but catastrophically collapses the OMAT checkpoint:
        </p>

        <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] my-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[var(--sidebar-bg)] border-b border-[var(--border-color)] font-semibold text-[var(--foreground)]">
                <th className="p-3">Generator</th>
                <th className="p-3">Checkpoint / Preprocessing</th>
                <th className="p-3">Fake Acc (%)</th>
                <th className="p-3">Real Acc (%)</th>
                <th className="p-3">AUC (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--muted-text)] font-mono">
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">BigGAN (128)</td>
                <td className="p-3">CLIP, official upsample</td>
                <td className="p-3">9.60</td>
                <td className="p-3">96.48</td>
                <td className="p-3">67.97</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">BigGAN (128)</td>
                <td className="p-3">CLIP, native padding</td>
                <td className="p-3 font-bold text-[var(--foreground)]">25.30</td>
                <td className="p-3">98.02</td>
                <td className="p-3 font-bold text-[var(--foreground)]">90.38</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">BigGAN (128)</td>
                <td className="p-3">CLIP-LoRA (OMAT), upsample</td>
                <td className="p-3 font-bold text-[var(--foreground)]">99.70</td>
                <td className="p-3">94.82</td>
                <td className="p-3 font-bold text-[var(--foreground)]">99.70</td>
              </tr>
              <tr className="bg-[var(--sidebar-bg)]">
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">BigGAN (128)</td>
                <td className="p-3">CLIP-LoRA (OMAT), padding</td>
                <td className="p-3 font-bold text-[var(--foreground)]">16.28</td>
                <td className="p-3">93.12</td>
                <td className="p-3 font-bold text-[var(--foreground)]">69.13</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">GLIDE (256)</td>
                <td className="p-3">CLIP, official upsample</td>
                <td className="p-3">69.13</td>
                <td className="p-3">96.05</td>
                <td className="p-3">94.03</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">GLIDE (256)</td>
                <td className="p-3">CLIP, native padding</td>
                <td className="p-3">76.93</td>
                <td className="p-3">98.20</td>
                <td className="p-3">97.44</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">GLIDE (256)</td>
                <td className="p-3">CLIP-LoRA (OMAT), upsample</td>
                <td className="p-3">99.87</td>
                <td className="p-3">94.87</td>
                <td className="p-3">99.82</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">GLIDE (256)</td>
                <td className="p-3">CLIP-LoRA (OMAT), padding</td>
                <td className="p-3">99.77</td>
                <td className="p-3">92.82</td>
                <td className="p-3">99.88</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="border-vs-interpolation" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Separating Interpolation from Border Artifacts
        </h2>
        <p>
          On BigGAN, padding introduced a black frame covering <strong>67.3% of the image canvas</strong>. To isolate whether the OMAT collapse was caused by interpolation changes or the out-of-distribution black border, we ran a nearest-neighbor upsampling experiment on matched 2,000-image samples:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--muted-text)]">
          <li>
            <strong className="text-[var(--foreground)]">Dropping Interpolation Alone (Nearest-Neighbor):</strong> Fake accuracy fell from 99.25% to 61.45%, but <strong>AUC fell by only 1.7 points</strong> (99.63% to 97.90%). Ranking remained intact; the scores merely shifted under the fixed threshold cut.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Adding the Black Border:</strong> Accuracy fell to 5.30% and AUC collapsed to 60.36 (near chance). The border destroys discriminative information entirely.
          </li>
        </ul>
        <Callout type="note" title="Methodological Takeaway">
          Two checkpoints trained on identical data prefer opposite preprocessing pipelines. Smooth interpolation of a 128x128 output destroys discriminative signal for un-finetuned models, whereas fine-tuned models depend heavily on the interpolation kernel present during training.
        </Callout>
      </section>

      <section id="jpeg-robustness" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Table 6: JPEG Quality-75 Collapse
        </h2>
        <p>
          Real-world images uploaded to web platforms routinely undergo JPEG re-encoding. We re-evaluated FLUX.1 with every image re-encoded at JPEG quality 75 (2,000 images per class, strictly paired):
        </p>

        <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] my-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[var(--sidebar-bg)] border-b border-[var(--border-color)] font-semibold text-[var(--foreground)]">
                <th className="p-3">Detector</th>
                <th className="p-3">Clean Fake Acc (%)</th>
                <th className="p-3">JPEG-75 Fake Acc (%)</th>
                <th className="p-3">Clean AUC (%)</th>
                <th className="p-3">JPEG-75 AUC (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--muted-text)] font-mono">
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">UniversalFakeDetect</td>
                <td className="p-3">7.30</td>
                <td className="p-3">6.00</td>
                <td className="p-3">61.19</td>
                <td className="p-3">55.54</td>
              </tr>
              <tr className="bg-[var(--sidebar-bg)]">
                <td className="p-3 font-sans font-bold text-[var(--foreground)]">NPR (Tan et al.)</td>
                <td className="p-3 font-bold text-[var(--foreground)]">98.00</td>
                <td className="p-3 font-bold text-[var(--foreground)]">1.50</td>
                <td className="p-3 font-bold text-[var(--foreground)]">97.10</td>
                <td className="p-3 font-bold text-[var(--foreground)]">50.63 (Chance)</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">GenImage++ ResNet-50</td>
                <td className="p-3">69.45</td>
                <td className="p-3">58.00</td>
                <td className="p-3">91.27</td>
                <td className="p-3">88.48</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">GenImage++ CLIP Baseline</td>
                <td className="p-3">89.60</td>
                <td className="p-3">59.80</td>
                <td className="p-3">98.56</td>
                <td className="p-3">97.28</td>
              </tr>
              <tr className="bg-[var(--sidebar-bg)]">
                <td className="p-3 font-sans font-semibold text-[var(--foreground)]">GenImage++ CLIP-LoRA (OMAT)</td>
                <td className="p-3">97.65</td>
                <td className="p-3">41.90</td>
                <td className="p-3 font-bold text-[var(--foreground)]">99.30</td>
                <td className="p-3 font-bold text-[var(--foreground)]">90.67</td>
              </tr>
            </tbody>
          </table>
        </div>

        <Callout type="caution" title="The NPR Vulnerability">
          <strong>NPR is completely destroyed by JPEG-75 compression</strong>, falling from 98.0% to 1.50% (AUC 50.63). Because NPR reads high-frequency neighboring-pixel residuals, standard 8x8 DCT quantization obliterates its detection signal. A clean-data leaderboard recommends the detector least suited to production deployment.
        </Callout>
      </section>

      <section id="compression-confound" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          The PNG vs JPEG Benchmark Confound
        </h2>
        <p>
          Our investigation exposed a systemic bias in academic synthetic image benchmarks documented by Grommelt et al. [25]:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--muted-text)]">
          <li>Across GenImage, GenImage++, and other popular suites, <strong>all generated images are distributed as lossless PNGs</strong>, while <strong>all real images are ImageNet JPEGs</strong>.</li>
          <li>Detectors sensitive to high-frequency compression artifacts can exploit this asymmetry, achieving high accuracy by simply classifying PNG compression traces rather than generative synthesis.</li>
        </ul>
        <p className="text-xs text-[var(--muted-text)]">
          In Veritas, all cross-detector comparisons remain valid because every detector scored the identical files. However, absolute headline accuracies should always be treated as upper bounds.
        </p>
      </section>
    </DocPageWrapper>
  );
}
