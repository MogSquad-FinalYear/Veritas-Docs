import { DocPageWrapper } from "@/components/DocPageWrapper";
import { CodeBlock } from "@/components/CodeBlock";
import { Callout } from "@/components/Callout";

export const metadata = {
  title: "Installation & Setup Guide",
  description: "Step-by-step installation instructions for VideoRAG, Nyaya, and AI Imagery detection environments.",
};

const toc = [
  { id: "videorag-setup", title: "1. VideoRAG Setup", level: 2 as const },
  { id: "nyaya-setup", title: "2. Nyaya Setup", level: 2 as const },
  { id: "imagery-setup", title: "3. AI Imagery Detection Setup", level: 2 as const },
  { id: "docs-portal-setup", title: "4. Documentation Portal Setup", level: 2 as const },
];

export default function InstallationPage() {
  return (
    <DocPageWrapper
      title="Installation & Setup"
      description="Step-by-step setup instructions for configuring Python virtual environments, installing locked packages, and building frontend interfaces."
      badge="Setup Guide"
      toc={toc}
    >
      <section id="videorag-setup" className="space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          1. VideoRAG Setup
        </h2>
        <p>
          VideoRAG comprises a Python FastAPI backend and a React 19 single-page application.
        </p>

        <h3 className="text-sm font-bold text-[var(--foreground)] mt-4">Backend Environment</h3>
        <CodeBlock
          filename="Clone & Setup VideoRAG Backend"
          language="bash"
          code={`git clone https://github.com/MogSquad-FinalYear/VideoRAG.git
cd VideoRAG

# Create and activate Python virtual environment
python3 -m venv .venv
source .venv/bin/activate  # Windows: .venv\\Scripts\\Activate.ps1

# Upgrade pip and install dependencies
pip install --upgrade pip
pip install -r backend/requirements.txt`}
        />

        <Callout type="note" title="Whisper / pkg_resources Compatibility">
          If Whisper installation produces an error regarding <code className="font-mono text-xs">pkg_resources</code>, pin setuptools below v81 before installing requirements:
          <div className="mt-2 font-mono text-xs text-[var(--foreground)]">
            pip install &quot;setuptools&lt;81&quot; &amp;&amp; pip install -r backend/requirements.txt
          </div>
        </Callout>

        <h3 className="text-sm font-bold text-[var(--foreground)] mt-4">Frontend Dashboard</h3>
        <CodeBlock
          filename="Install Frontend Packages"
          language="bash"
          code={`cd frontend
npm install`}
        />
      </section>

      <section id="nyaya-setup" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          2. Nyaya Setup
        </h2>
        <p>
          Nyaya includes a Python legal RAG pipeline (<code className="font-mono text-xs">rag/</code>), an in-process FastAPI service (<code className="font-mono text-xs">backend/</code>), and a Next.js chat frontend (<code className="font-mono text-xs">frontend/</code>).
        </p>

        <h3 className="text-sm font-bold text-[var(--foreground)] mt-4">Nyaya Backend</h3>
        <CodeBlock
          filename="Setup Nyaya Backend"
          language="bash"
          code={`cd nyaya/backend
python3 -m venv .venv
source .venv/bin/activate

pip install --upgrade pip
pip install -r requirements.txt
cp .env.example .env`}
        />

        <h3 className="text-sm font-bold text-[var(--foreground)] mt-4">Nyaya Frontend</h3>
        <CodeBlock
          filename="Setup Nyaya Next.js Frontend"
          language="bash"
          code={`cd ../frontend
npm install
cp .env.local.example .env.local`}
        />

        <p className="text-xs text-[var(--muted-text)]">
          The Nyaya repository ships with pre-populated datasets in <code className="font-mono text-xs">rag/data/final_dataset.json</code> and indexed Qdrant vector databases in <code className="font-mono text-xs">rag/qdrant_db</code>.
        </p>
      </section>

      <section id="imagery-setup" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          3. AI Imagery Detection Setup
        </h2>
        <p>
          The AI Imagery detection harness runs via PyTorch and evaluated pretrained public checkpoints (UniversalFakeDetect, NPR, GenImage++ CLIP-LoRA).
        </p>

        <CodeBlock
          filename="Setup Imagery Evaluation Harness"
          language="bash"
          code={`cd AI-Imagery-Detection
python3 -m venv .venv
source .venv/bin/activate

pip install torch torchvision --index-url https://download.pytorch.org/whl/cu118
pip install kornia open_clip_torch scikit-learn scipy matplotlib`}
        />
      </section>

      <section id="docs-portal-setup" className="mt-10 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-color)] pb-2">
          4. Documentation Portal Setup
        </h2>
        <p>
          To run or build this documentation website locally:
        </p>
        <CodeBlock
          filename="Run Veritas Docs Website"
          language="bash"
          code={`cd Veritas-Docs
npm install
npm run dev     # Starts Next.js development server on http://localhost:3000
npm run build   # Compiles optimized static assets via Next.js Turbopack`}
        />
      </section>
    </DocPageWrapper>
  );
}
