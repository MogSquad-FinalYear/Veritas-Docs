import { DocPageWrapper } from "@/components/DocPageWrapper";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export const metadata = {
  title: "AI Imagery: Architecture & Pipeline",
  description: "End-to-end processing pipeline, 2D Fast Fourier Transform decomposition, and dynamic detector dispatch.",
};

const toc = [
  { id: "pipeline-stages", title: "End-to-End Pipeline Stages", level: 2 as const },
  { id: "frequency-decomposition", title: "2D Fast Fourier Transform (FFT)", level: 2 as const },
  { id: "router-logic", title: "Dynamic Router Dispatch Logic", level: 2 as const },
  { id: "verdict-calibration", title: "Calibrated Verdict Output", level: 2 as const },
];

export default function ImageryArchitecturePage() {
  return (
    <DocPageWrapper
      title="Architecture & Pipeline"
      description="The technical pipeline of Veritas AI Imagery Detection: from pixel ingestion and spectral transformation to specialized model dispatch."
      badge="AI Imagery"
      toc={toc}
    >
      <section id="pipeline-stages" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          End-to-End Pipeline Stages
        </h2>
        <p>
          The AI Imagery Detection pipeline operates in four linear stages designed to avoid common preprocessing artifacts and select the optimal forensic detector:
        </p>

        <ArchitectureDiagram
          type="imagery"
          title="Veritas Imagery Forensic Pipeline"
          caption="Data flow from RGB image through spectral decomposition, router dispatch, and calibrated probability output."
        />
      </section>

      <section id="frequency-decomposition" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          2D Fast Fourier Transform (FFT)
        </h2>
        <p>
          Generative models leave distinct periodic footprints in the frequency domain. Veritas computes a 2D discrete Fourier transform of the luminance channel:
        </p>

        <CodeBlock
          filename="Spectral Extraction (PyTorch)"
          language="python"
          code={`import torch
import torch.fft as fft

def compute_spectral_profile(image_tensor: torch.Tensor) -> float:
    """
    image_tensor: shape (1, 3, H, W) normalized to [0, 1]
    returns: mean log-magnitude energy in the outer 20% frequency radius
    """
    # Convert to grayscale luminance
    gray = 0.2989 * image_tensor[:, 0] + 0.5870 * image_tensor[:, 1] + 0.1140 * image_tensor[:, 2]
    
    # 2D Fast Fourier Transform shifted to center low frequencies
    f_transform = fft.fftshift(fft.fft2(gray))
    magnitude = torch.log(torch.abs(f_transform) + 1e-8)
    
    # Compute radial distance grid from center (H/2, W/2)
    H, W = gray.shape[-2:]
    y, x = torch.meshgrid(torch.arange(H) - H // 2, torch.arange(W) - W // 2, indexing="ij")
    radius = torch.sqrt(x**2 + y**2)
    max_radius = torch.sqrt(torch.tensor((H // 2)**2 + (W // 2)**2))
    
    # Extract outer 20% high-frequency band
    high_freq_mask = (radius >= 0.80 * max_radius) & (radius <= max_radius)
    high_freq_energy = magnitude[0, high_freq_mask].mean().item()
    
    return high_freq_energy`}
        />

        <p className="text-sm text-[var(--muted-text)]">
          The mean energy in the outer 20% frequency radius is compared against the baseline distribution of real photographic images (from ImageNet validation splits).
        </p>
      </section>

      <section id="router-logic" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Dynamic Router Dispatch Logic
        </h2>
        <p>
          The dynamic router chooses between three specialist models depending on spectral deviations and image resolution:
        </p>

        <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--muted-text)]">
          <li>
            <strong className="text-[var(--foreground)]">Diffusion Transformers (High/Balanced HF):</strong> For images showing low high-frequency attenuation characteristic of DiT architectures (SD3: +15.1%, FLUX.1: -31.6%), the router selects <strong>NPR</strong> or <strong>GenImage++ CLIP-LoRA</strong>.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Severe High-Frequency Deficit (GANs / Early Diffusion):</strong> For images exhibiting extreme negative deviations (BigGAN: -283.5%, GLIDE: -234.3%), the router selects <strong>UniversalFakeDetect</strong> or <strong>GenImage++ CLIP-LoRA</strong>.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Compressed / Quality &lt; 85:</strong> If JPEG re-encoding artifacts are detected, the router falls back to <strong>CLIP-LoRA</strong>, because NPR collapses to chance level under ordinary compression.
          </li>
        </ul>

        <Callout type="warning" title="Routing Caveat">
          As documented in our empirical paper, routing profiles must account for JPEG compression. While NPR is the fastest and highest-performing clean FLUX.1 detector, it cannot be used on compressed media.
        </Callout>
      </section>

      <section id="verdict-calibration" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Calibrated Verdict Output
        </h2>
        <p>
          The model produces a structured JSON output containing the raw probability, the selected detector, the expected calibration error, and any preprocessing warnings:
        </p>

        <CodeBlock
          filename="Illustrative Veritas Detection Response Schema"
          language="json"
          code={`{
  "verdict": "GENERATED",
  "probability": 0.965,
  "confidence_interval": [0.942, 0.981],
  "detector_used": "GenImage++ CLIP-LoRA (OMAT)",
  "spectral_profile": {
    "outer_radius_log_magnitude": -31.6,
    "nearest_generator_family": "Diffusion Transformer (FLUX.1 / SD3)"
  },
  "calibration_status": {
    "expected_calibration_error": 0.020,
    "reliability": "HIGH"
  },
  "compression_warnings": [
    "Image format is PNG; benchmark compression confound checked."
  ]
}`}
        />
      </section>
    </DocPageWrapper>
  );
}
