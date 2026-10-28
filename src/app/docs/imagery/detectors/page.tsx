import { DocPageWrapper } from "@/components/DocPageWrapper";
import { Callout } from "@/components/Callout";

export const metadata = {
  title: "Specialist Image Detectors",
  description: "Detailed architecture, backbone, training lineage, and inductive biases of the five evaluated image detectors.",
};

const toc = [
  { id: "detector-inventory", title: "Detector Inventory", level: 2 as const },
  { id: "universalfakedetect", title: "1. UniversalFakeDetect (CVPR 2023)", level: 2 as const },
  { id: "npr", title: "2. NPR Neighboring-Pixel Detector (CVPR 2024)", level: 2 as const },
  { id: "genimage-resnet", title: "3. GenImage++ ResNet-50", level: 2 as const },
  { id: "genimage-clip", title: "4. GenImage++ CLIP Linear Probe", level: 2 as const },
  { id: "genimage-omat", title: "5. GenImage++ CLIP-LoRA (OMAT)", level: 2 as const },
  { id: "architecture-vs-lineage", title: "Architecture vs Training Lineage", level: 2 as const },
];

export default function DetectorsPage() {
  return (
    <DocPageWrapper
      title="Specialist Image Detectors"
      description="In-depth technical analysis of the five evaluated pretrained detectors: their backbones, detection signals, training compositions, and failure modes."
      badge="Model Zoo"
      toc={toc}
    >
      <section id="detector-inventory" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Detector Inventory
        </h2>
        <p>
          Table 1 from our research audit presents the five independently trained, publicly released detector checkpoints evaluated in Veritas:
        </p>

        <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] my-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[var(--sidebar-bg)] border-b border-[var(--border-color)] font-semibold text-[var(--foreground)]">
                <th className="p-3">Detector</th>
                <th className="p-3">Detection Signal &amp; Backbone</th>
                <th className="p-3">Training Data (Verified)</th>
                <th className="p-3">Source Paper</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--muted-text)]">
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">UniversalFakeDetect</td>
                <td className="p-3">CLIP ViT-L/14 embedding + linear probe</td>
                <td className="p-3">ProGAN only (20 LSUN categories)</td>
                <td className="p-3">Ojha et al., CVPR 2023 [3]</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">NPR</td>
                <td className="p-3">Pixel / up-sampling artifact (ResNet-50)</td>
                <td className="p-3">ProGAN only (4 LSUN categories)</td>
                <td className="p-3">Tan et al., CVPR 2024 [4]</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">GenImage++ ResNet-50</td>
                <td className="p-3">Plain CNN classifier (no CLIP)</td>
                <td className="p-3">GenImage SDv1.4 subset only</td>
                <td className="p-3">Zhou et al., 2025 [5]</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">GenImage++ CLIP</td>
                <td className="p-3">CLIP ViT-L/14 embedding + linear probe</td>
                <td className="p-3">GenImage SDv1.4 subset only</td>
                <td className="p-3">Zhou et al., 2025 [5]</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">GenImage++ CLIP-LoRA (OMAT)</td>
                <td className="p-3">Same backbone + LoRA, adversarial fine-tune</td>
                <td className="p-3">Same SDv1.4 data + 6,000 SDv1.4 adversarial examples</td>
                <td className="p-3">Zhou et al., 2025 [5]</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="universalfakedetect" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          1. UniversalFakeDetect (CVPR 2023)
        </h2>
        <p>
          Ojha et al. demonstrated that frozen CLIP image embeddings with a single trainable linear probe transfer to unseen GANs and early diffusion models significantly better than end-to-end trained CNNs.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-[var(--muted-text)]">
          <li><strong>Architecture:</strong> Frozen OpenAI CLIP ViT-L/14 backbone + 2-class linear probe.</li>
          <li><strong>Strength:</strong> Robust against semantic perturbations on GANs (83.0% on BigGAN).</li>
          <li><strong>Failure Mode:</strong> Collapses on modern Diffusion Transformers (7.0% on FLUX.1, 11.7% on SD3). Because CLIP semantic embeddings capture broad semantic layout rather than fine pixel interpolation artifacts, DiT outputs easily deceive the linear probe.</li>
        </ul>
      </section>

      <section id="npr" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          2. NPR Neighboring-Pixel Detector (CVPR 2024)
        </h2>
        <p>
          Tan et al. rethought up-sampling operations in generative networks. Rather than semantic representations, NPR computes high-pass pixel residuals:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-[var(--muted-text)]">
          <li><strong>Architecture:</strong> ResNet-50 modified to process pixel-difference relationships.</li>
          <li><strong>Throughput:</strong> Extremely fast—runs at <strong>229–320 images/second</strong> on an 8GB GPU (~35x faster than CLIP).</li>
          <li><strong>Strength:</strong> Outstanding performance on clean Diffusion Transformers (97.7% on FLUX.1, 90.1% on SD3).</li>
          <li><strong>Critical Flaw:</strong> Highly fragile to compression. Under standard JPEG quality 75, NPR collapses to <strong>1.50% fake accuracy (AUC 50.63)</strong>, which is pure chance.</li>
        </ul>
      </section>

      <section id="genimage-resnet" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          3. GenImage++ ResNet-50
        </h2>
        <p>
          Included specifically to isolate the effect of representation from training data. It was trained on the exact same Stable Diffusion v1.4 subset as the GenImage++ CLIP baseline, but uses a standard ResNet-50 without CLIP pretraining.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-[var(--muted-text)]">
          <li><strong>Mean Fake Accuracy:</strong> 28.5% across the 5 generators.</li>
          <li><strong>BigGAN Behavior:</strong> Sitting at 0.4% fake accuracy and 98.5% real accuracy, effectively predicting &ldquo;real&rdquo; on all inputs with an Expected Calibration Error of 0.503.</li>
        </ul>
      </section>

      <section id="genimage-clip" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          4. GenImage++ CLIP Linear Probe
        </h2>
        <p>
          Trained on the same SDv1.4 data as the ResNet-50, but leveraging the pretrained CLIP ViT-L/14 representation.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-[var(--muted-text)]">
          <li><strong>Mean Fake Accuracy:</strong> 66.2% across the 5 generators (a 37.6-point increase over ResNet-50).</li>
          <li><strong>Generalization ordering:</strong> Perfectly matches the ResNet-50 ordering: BigGAN &lt; GLIDE &lt; SDXL &lt; FLUX.1 &lt; SD3.</li>
        </ul>
      </section>

      <section id="genimage-omat" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          5. GenImage++ CLIP-LoRA (OMAT)
        </h2>
        <p>
          Zhou et al. proposed On-Manifold Adversarial Training (OMAT) to eliminate latent prior bias. By fine-tuning CLIP with Low-Rank Adaptation (LoRA) against 6,000 adversarially perturbed initial latents of SDv1.4:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-[var(--muted-text)]">
          <li><strong>Performance:</strong> Mean fake accuracy rises from 66.2% to <strong>98.7%</strong>; AUC rises from 91.3% to <strong>99.6%</strong>.</li>
          <li><strong>Consistency:</strong> The spread across generators shrinks from 79 points to just <strong>3.4 points</strong> (96.5%–99.9%).</li>
          <li><strong>Calibration:</strong> Best calibrated detector across all tests, never exceeding ECE 0.020.</li>
        </ul>
      </section>

      <section id="architecture-vs-lineage" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Architecture vs Training Lineage
        </h2>
        <Callout type="important" title="Core Research Finding">
          Comparing the GenImage++ ResNet-50 and CLIP baseline reveals a profound pattern:
          <br /><br />
          <strong>Training data sets the shape of the failure profile</strong> (which generators a detector struggles on relative to others), while <strong>the architecture and representation set its level</strong>.
          <br /><br />
          The Spearman rank correlation between the two difficulty profiles is <code className="font-mono text-xs font-bold">&rho; = +1.000</code> (exact permutation <code className="font-mono text-xs">p = 0.017</code>), despite a 37.6-point difference in mean accuracy.
        </Callout>
      </section>
    </DocPageWrapper>
  );
}
