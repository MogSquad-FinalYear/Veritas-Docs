import { DocPageWrapper } from "@/components/DocPageWrapper";
import { Callout } from "@/components/Callout";
import { CodeBlock } from "@/components/CodeBlock";

export const metadata = {
  title: "System Prerequisites",
  description: "Hardware, operating systems, Python packages, Node.js runtimes, and local AI model requirements for Veritas.",
};

const toc = [
  { id: "system-requirements", title: "Hardware Requirements", level: 2 as const },
  { id: "software-runtime", title: "Software Runtimes", level: 2 as const },
  { id: "external-tools", title: "External Binaries & Media Tools", level: 2 as const },
  { id: "local-models", title: "Local AI Model Assets", level: 2 as const },
];

export default function PrerequisitesPage() {
  return (
    <DocPageWrapper
      title="Prerequisites"
      description="System specifications, runtime dependencies, and foundational tools needed before deploying the Veritas modules."
      badge="Setup Guide"
      toc={toc}
    >
      <section id="system-requirements" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Hardware Requirements
        </h2>
        <p>
          Veritas modules execute multimodal machine learning models locally. Below are recommended hardware specifications:
        </p>

        <div className="overflow-x-auto rounded-xl border border-[var(--border-color)] my-4">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[var(--sidebar-bg)] border-b border-[var(--border-color)] font-semibold text-[var(--foreground)]">
                <th className="p-3">Component</th>
                <th className="p-3">Minimum Requirement</th>
                <th className="p-3">Recommended Production</th>
                <th className="p-3">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--muted-text)]">
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">GPU (VRAM)</td>
                <td className="p-3 font-mono">8 GB VRAM</td>
                <td className="p-3 font-mono">16 GB+ VRAM (NVIDIA CUDA)</td>
                <td className="p-3">Evaluations were benchmarked on a single 8GB consumer GPU.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">System Memory</td>
                <td className="p-3 font-mono">16 GB RAM</td>
                <td className="p-3 font-mono">32 GB RAM</td>
                <td className="p-3">Required when executing Ollama qwen2.5:14b on CPU offload.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">Disk Storage</td>
                <td className="p-3 font-mono">30 GB SSD Free</td>
                <td className="p-3 font-mono">100 GB+ NVMe SSD</td>
                <td className="p-3">ChromaDB frame vectors, SQLite databases, and Ollama models.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-[var(--foreground)]">Operating System</td>
                <td className="p-3">Ubuntu 22.04 LTS / macOS 13+</td>
                <td className="p-3">Ubuntu 22.04 LTS / macOS 14+</td>
                <td className="p-3">Windows 11 supported via WSL2 or native PowerShell.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="software-runtime" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Software Runtimes
        </h2>
        <p>Ensure the following language runtimes are installed on your host:</p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--muted-text)]">
          <li>
            <strong className="text-[var(--foreground)]">Python:</strong> Version <code className="font-mono text-xs">3.10</code> or newer (tested with 3.10 and 3.11).
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Node.js:</strong> Version <code className="font-mono text-xs">^20.19.0</code> or <code className="font-mono text-xs">&gt;=22.12.0</code> (required for Next.js 16 and Vite 8).
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Package Managers:</strong> <code className="font-mono text-xs">npm</code> (v10+), <code className="font-mono text-xs">pip</code> (v23+), and Python <code className="font-mono text-xs">venv</code>.
          </li>
        </ul>

        <CodeBlock
          filename="Verify Runtimes"
          language="bash"
          code={`python3 --version  # Output: Python 3.10.x or higher
node --version     # Output: v20.19.x or v22.x+
npm --version      # Output: 10.x+`}
        />
      </section>

      <section id="external-tools" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          External Binaries & Media Tools
        </h2>
        <p>
          Video processing requires FFmpeg and associated codec libraries:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--muted-text)]">
          <li>
            <strong className="text-[var(--foreground)]">FFmpeg:</strong> Used for audio track extraction and byte-range video streaming. VideoRAG bundles <code className="font-mono text-xs">imageio-ffmpeg</code> binary fallbacks, but having system FFmpeg is strongly recommended.
          </li>
          <li>
            <strong className="text-[var(--foreground)]">Ollama:</strong> Required for the Nyaya Legal RAG module to run local open-weight instruction models.
          </li>
        </ul>

        <CodeBlock
          filename="Install System Media Tools"
          language="bash"
          code={`# macOS (Homebrew)
brew install ffmpeg ollama

# Ubuntu / Debian
sudo apt-get update
sudo apt-get install -y ffmpeg curl
curl -fsSL https://ollama.com/install.sh | sh`}
        />
      </section>

      <section id="local-models" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          Local AI Model Assets
        </h2>
        <p>
          Before running Nyaya, pull the required Qwen models via Ollama:
        </p>
        <CodeBlock
          filename="Pull Ollama Models for Nyaya"
          language="bash"
          code={`# Pull the fast extractor model
ollama pull qwen2.5:3b

# Pull the primary legal reasoning model
ollama pull qwen2.5:14b`}
        />

        <Callout type="tip" title="Ollama Background Service">
          Verify Ollama is actively serving requests by running <code className="font-mono text-xs">curl http://localhost:11434/api/tags</code>. If running inside Docker, ensure host networking or appropriate container gateway addresses are configured.
        </Callout>
      </section>
    </DocPageWrapper>
  );
}
