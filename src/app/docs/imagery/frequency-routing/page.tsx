import { DocPageWrapper } from "@/components/DocPageWrapper";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata = {
  title: "Frequency-Based Routing in Veritas",
  description: "Mathematical breakdown of 2D FFT spectral deviations across GANs, U-Net diffusion, and Diffusion Transformers.",
};

const toc = [
  { id: "spectral-deviations", title: "Measured Spectral Deviations", level: 2 as const },
  { id: "spatial-shapes", title: "Spatial 2D Energy Shapes", level: 2 as const },
  { id: "spectral-detectability-disconnect", title: "Spectral Energy vs Detectability", level: 2 as const },
  { id: "routing-algorithm", title: "The Routing Heuristic", level: 2 as const },
];

export default function FrequencyRoutingPage() {
  return (
    <DocPageWrapper
      title="Frequency-Based Routing"
      description="How frequency-domain spectral analysis reveals the latent architecture family of synthetic images and informs routing decisions."
      badge="Signal Processing"
      toc={toc}
    >
      <section id="spectral-deviations" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Measured Spectral Deviations
        </h2>
        <p>
          Generative models differ fundamentally in how their denoisers and up-samplers handle high-frequency spatial frequencies. In our paper, we measured the high-frequency spectral deviation from real-photo statistics (mean log-magnitude FFT energy in the outer 20% of the frequency radius, over 300-image samples):
        </p>

        <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] my-6">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[var(--sidebar-bg)] border-b border-[var(--border-color)] font-semibold text-[var(--foreground)]">
                <th className="p-3">Generator</th>
                <th className="p-3">Architecture Family</th>
                <th className="p-3">Spectral Deviation</th>
                <th className="p-3">Spectral Behavior vs Real Photos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--muted-text)]">
              <tr className="bg-[var(--sidebar-bg)]">
                <td className="p-3 font-semibold text-[var(--foreground)]">SD3 (Stable Diffusion 3)</td>
                <td className="p-3">Diffusion Transformer (DiT)</td>
                <td className="p-3 font-mono font-bold text-[var(--foreground)]">+15.1%</td>
                <td className="p-3">Unique positive deviation: carries <em>more</em> high-frequency energy than real photos.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">FLUX.1</td>
                <td className="p-3">Diffusion Transformer (DiT)</td>
                <td className="p-3 font-mono text-[var(--foreground)] font-medium">-31.6%</td>
                <td className="p-3">Mild high-frequency smoothing, soft central spatial concentration.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">SDXL</td>
                <td className="p-3">Modern U-Net Latent Diffusion</td>
                <td className="p-3 font-mono text-[var(--foreground)] font-medium">-52.4%</td>
                <td className="p-3">Moderate texture smoothing across a broad diffuse frequency field.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">GLIDE</td>
                <td className="p-3">Early U-Net Diffusion</td>
                <td className="p-3 font-mono text-[var(--foreground)] font-medium">-234.3%</td>
                <td className="p-3">Heavy suppression of fine spatial textures.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">BigGAN</td>
                <td className="p-3">Class-Conditional GAN</td>
                <td className="p-3 font-mono text-[var(--foreground)] font-medium">-283.5%</td>
                <td className="p-3">Extreme deficit of high-frequency energy due to transposed convolution upsamplers.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="spatial-shapes" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Spatial 2D Energy Shapes
        </h2>
        <p>
          A single radial scalar average hides critical 2D orientation structure:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--muted-text)]">
          <li>
            <strong className="text-[var(--foreground)]">FLUX.1:</strong> Exhibits a soft, circularly isotropic concentration of low-frequency power with gradual rolloff.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Stable Diffusion 3 (SD3):</strong> Exhibits a sharp, anisotropic vertical band of high-frequency energy caused by its multidimensional latent transformer patchification.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">SDXL:</strong> Produces a broad, diffuse rectangular field characteristic of multi-scale U-Net residual cross-attention blocks.
          </li>
        </ul>
      </section>

      <section id="spectral-detectability-disconnect" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Spectral Energy vs Detectability
        </h2>
        <p>
          A common assumption in computer vision literature is that spectral deviation directly predicts detection difficulty. Our empirical results prove that <strong>spectral signature and detectability are separate axes</strong>:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--muted-text)]">
          <li>
            BigGAN and GLIDE deviate the most (-283.5% and -234.3%), yet sit at opposite ends of detector rankings (e.g., UniversalFakeDetect catches 83.0% of BigGAN but only 27.4% of GLIDE).
          </li>
          <li>
            SD3&apos;s uniquely positive high-frequency deviation (+15.1%) does not make it an outlier in accuracy tables; it scores similarly to FLUX.1 across both UniversalFakeDetect and the CLIP baseline.
          </li>
        </ul>

        <Callout type="note" title="Empirical Clarification">
          We deliberately avoid computing a simplistic linear correlation between the spectral deviation scalar and fake accuracy. What drives detector accuracy is whether the detector&apos;s representation (e.g. CLIP semantic embedding vs pixel residual) captures the specific artifact type left by that generative architecture.
        </Callout>
      </section>

      <section id="routing-algorithm" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          The Routing Heuristic
        </h2>
        <p>
          The dynamic router uses spectral characteristics to steer images toward detectors with complementary training lineages:
        </p>

        <CodeBlock
          filename="Routing Decision Flow (Python Pseudocode)"
          language="python"
          code={`def route_detector(image_tensor, jpeg_quality_estimate):
    # 1. JPEG Compression Guardrail
    if jpeg_quality_estimate < 85:
        # NPR collapses under JPEG-75; use CLIP-LoRA
        return "GenImage++ CLIP-LoRA (OMAT)"

    # 2. Compute 2D High-Frequency Radial Energy
    hf_energy_dev = compute_spectral_deviation(image_tensor)

    # 3. Route according to family signature
    if hf_energy_dev > -40.0:
        # Diffusion Transformer profile (SD3 or FLUX.1)
        # NPR achieves 97.7% on FLUX.1 and runs 35x faster
        return "NPR Up-Sampling Detector"
    elif hf_energy_dev < -200.0:
        # Extreme texture deficit (BigGAN or early GLIDE)
        return "GenImage++ CLIP-LoRA (OMAT)"
    else:
        # Moderate U-Net profile (SDXL)
        return "GenImage++ CLIP-LoRA (OMAT)"`}
        />
      </section>
    </DocPageWrapper>
  );
}
