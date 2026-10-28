import { DocPageWrapper } from "@/components/DocPageWrapper";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata = {
  title: "AI Imagery References & Licenses",
  description: "Academic literature, peer-reviewed citations, dataset acknowledgments, and open-source model licenses.",
};

const toc = [
  { id: "primary-paper", title: "Primary Paper Citation", level: 2 as const },
  { id: "academic-references", title: "Academic References", level: 2 as const },
  { id: "model-licenses", title: "Model Licenses & Attribution", level: 2 as const },
];

export default function ImageryReferencesPage() {
  return (
    <DocPageWrapper
      title="References & Licenses"
      description="Formal citations and open-source licensing for the AI Imagery Detection research paper, evaluated baselines, and benchmark datasets."
      badge="Citations"
      toc={toc}
    >
      <section id="primary-paper" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Primary Paper Citation
        </h2>
        <p className="text-sm text-[var(--muted-text)]">
          If you utilize Veritas AI Imagery detection benchmarks or frequency routing algorithms, cite our publication:
        </p>

        <CodeBlock
          filename="BibTeX Citation"
          language="bibtex"
          code={`@article{kavinesh2025why,
  title={Why AI-Generated Image Detectors Fail on Modern Diffusion Generators: A Cross-Architecture Generalization and Failure-Mode Analysis},
  author={Kavinesh, P. and Raam Prathap, R. V. and Santhosh, A. S. and Kasam, Sai Venkata Siddardha and Ashish, M. and Anbazhagan, M.},
  journal={Procedia Computer Science},
  series={International Conference on Machine Learning and Data Engineering (ICMLDE 2025)},
  publisher={Elsevier B.V.},
  year={2025}
}`}
        />
      </section>

      <section id="academic-references" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Academic References
        </h2>
        <ol className="list-decimal pl-5 space-y-2 text-xs text-[var(--muted-text)] leading-relaxed">
          <li><strong>Wang et al. (CVPR 2020)</strong>: CNN-generated images are surprisingly easy to spot... for now.</li>
          <li><strong>Zhu et al. (NeurIPS 2023)</strong>: GenImage: A million-scale benchmark for detecting AI-generated image.</li>
          <li><strong>Ojha et al. (CVPR 2023)</strong>: Towards Universal Fake Image Detectors that Generalize Across Generative Models.</li>
          <li><strong>Tan et al. (CVPR 2024)</strong>: Rethinking the Up-Sampling Operations in CNN-based Generative Network for Generalizable Deepfake Detection (NPR).</li>
          <li><strong>Zhou et al. (arXiv 2025)</strong>: Breaking Latent Prior Bias in Detectors for Generalizable AIGC Image Detection (OMAT / GenImage++).</li>
          <li><strong>Grommelt et al. (arXiv 2024)</strong>: Fake or JPEG? Revealing common biases in generated image detection datasets.</li>
          <li><strong>Guo et al. (ICML 2017)</strong>: On calibration of modern neural networks.</li>
          <li><strong>McNemar, Quinn (Psychometrika 1947)</strong>: Note on the sampling error of the difference between correlated proportions or percentages.</li>
        </ol>
      </section>

      <section id="model-licenses" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Model Licenses & Attribution
        </h2>
        <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] my-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[var(--sidebar-bg)] border-b border-[var(--border-color)] font-semibold text-[var(--foreground)]">
                <th className="p-3">Asset</th>
                <th className="p-3">Author / Organization</th>
                <th className="p-3">License</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--muted-text)]">
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">CLIP ViT-L/14</td>
                <td className="p-3">OpenAI</td>
                <td className="p-3 font-mono">MIT License</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">UniversalFakeDetect Weights</td>
                <td className="p-3">Ojha, Li, &amp; Lee (UC Merced)</td>
                <td className="p-3 font-mono">BSD 3-Clause License</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">NPR Weights &amp; Code</td>
                <td className="p-3">Tan et al. (BJTU)</td>
                <td className="p-3 font-mono">MIT License</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">GenImage++ OMAT Checkpoints</td>
                <td className="p-3">Zhou et al. (USTC)</td>
                <td className="p-3 font-mono">Academic Research License</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </DocPageWrapper>
  );
}
