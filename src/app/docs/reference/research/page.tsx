import { DocPageWrapper } from "@/components/DocPageWrapper";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata = {
  title: "Research & Citations",
  description: "Academic papers, benchmark suites, methodology publications, and formal citations for Veritas.",
};

const toc = [
  { id: "veritas-publications", title: "Veritas Publications", level: 2 as const },
  { id: "foundational-literature", title: "Foundational Literature", level: 2 as const },
  { id: "datasets-benchmarks", title: "Datasets & Benchmark Suites", level: 2 as const },
];

export default function ResearchCitationsPage() {
  return (
    <DocPageWrapper
      title="Research & Citations"
      description="Peer-reviewed publications, foundation model papers, and forensic benchmark citations supporting the Veritas platform."
      badge="Academic Citations"
      toc={toc}
    >
      <section id="veritas-publications" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Veritas Publications
        </h2>
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-5 space-y-3">
          <h3 className="font-bold text-sm text-[var(--foreground)]">
            Why AI-Generated Image Detectors Fail on Modern Diffusion Generators: A Cross-Architecture Generalization and Failure-Mode Analysis
          </h3>
          <p className="text-xs text-[var(--muted-text)]">
            Kavinesh P, Raam Prathap R V, Santhosh A S, Kasam Sai Venkata Siddardha, Ashish M, M Anbazhagan.
            <br />
            <em>International Conference on Machine Learning and Data Engineering (ICMLDE 2025) / Procedia Computer Science (Elsevier)</em>.
          </p>
          <CodeBlock
            language="bibtex"
            code={`@article{kavinesh2025why,
  title={Why AI-Generated Image Detectors Fail on Modern Diffusion Generators: A Cross-Architecture Generalization and Failure-Mode Analysis},
  author={Kavinesh, P. and Raam Prathap, R. V. and Santhosh, A. S. and Kasam, Sai Venkata Siddardha and Ashish, M. and Anbazhagan, M.},
  journal={Procedia Computer Science},
  year={2025},
  publisher={Elsevier B.V.}
}`}
          />
        </div>
      </section>

      <section id="foundational-literature" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Foundational Literature
        </h2>
        <ul className="list-disc pl-5 space-y-3 text-xs text-[var(--muted-text)] leading-relaxed">
          <li>
            <strong className="text-[var(--foreground)]">UniversalFakeDetect (CVPR 2023):</strong> Ojha, U., Li, Y., &amp; Lee, Y. J. <em>Towards Universal Fake Image Detectors that Generalize Across Generative Models</em>.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">NPR Up-Sampling Detector (CVPR 2024):</strong> Tan, C., Zhao, Y., Wei, S., Gu, G., Liu, P., &amp; Wei, Y. <em>Rethinking the Up-Sampling Operations in CNN-based Generative Network for Generalizable Deepfake Detection</em>.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">GenImage++ &amp; OMAT (2025):</strong> Zhou, Y., He, X., Lin, K., Fan, B., Ding, F., &amp; Li, B. <em>Breaking Latent Prior Bias in Detectors for Generalizable AIGC Image Detection</em>.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">OpenCLIP (ICML 2021):</strong> Radford, A., Kim, J. W., Hallacy, C., Ramesh, A., et al. <em>Learning Transferable Visual Models From Natural Language Supervision</em>.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Model Calibration (ICML 2017):</strong> Guo, C., Pleiss, G., Sun, Y., &amp; Weinberger, K. Q. <em>On Calibration of Modern Neural Networks</em>.
          </li>
        </ul>
      </section>

      <section id="datasets-benchmarks" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Datasets &amp; Benchmark Suites
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-xs text-[var(--muted-text)]">
          <li><strong>GenImage (NeurIPS 2023):</strong> Zhu et al. Million-scale synthetic image benchmark spanning BigGAN, GLIDE, VQDM, SDv1.4, SDv1.5, ADM, Midjourney, and Wukong.</li>
          <li><strong>GenImage++ (2025):</strong> Held-out evaluation subsets from FLUX.1, Stable Diffusion 3 (SD3), and SDXL.</li>
          <li><strong>Dataset Bias Audit (2024):</strong> Grommelt et al. <em>Fake or JPEG? Revealing common biases in generated image detection datasets</em>.</li>
        </ul>
      </section>
    </DocPageWrapper>
  );
}
