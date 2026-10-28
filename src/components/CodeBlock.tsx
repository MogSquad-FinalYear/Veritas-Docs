"use client";

import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({ code, language = "bash", filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="my-5 overflow-hidden rounded-xl border border-[var(--code-border)] bg-[var(--code-bg)] text-[var(--code-fg)] shadow-sm">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[var(--code-border)] bg-black/40 px-4 py-2 text-xs">
        <span className="font-mono text-[11px] font-medium text-zinc-400">
          {filename || language}
        </span>
        <button
          type="button"
          onClick={copyToClipboard}
          className="flex items-center gap-1.5 rounded px-2 py-0.5 text-[11px] font-medium text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3.5 8.5l3 3 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-white">Copied!</span>
            </>
          ) : (
            <>
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.75">
                <rect x="5" y="5" width="8" height="8" rx="1.5" />
                <path d="M3 11V3.5A1.5 1.5 0 0 1 4.5 2H11" strokeLinecap="round" />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code contents */}
      <div className="overflow-x-auto p-4 text-[13px] leading-relaxed font-mono">
        <pre className="m-0 font-mono">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
