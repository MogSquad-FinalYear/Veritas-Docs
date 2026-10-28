import React from "react";

type CalloutType = "note" | "tip" | "important" | "warning" | "caution";

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}

const calloutStyles: Record<
  CalloutType,
  {
    bg: string;
    border: string;
    defaultTitle: string;
    icon: React.ReactNode;
  }
> = {
  note: {
    bg: "var(--callout-note-bg)",
    border: "var(--callout-note-border)",
    defaultTitle: "Note",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
  },
  tip: {
    bg: "var(--callout-tip-bg)",
    border: "var(--callout-tip-border)",
    defaultTitle: "Tip",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor">
        <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14H8a4 4 0 01-.8-7.92 5 5 0 019.6 0A4 4 0 0112 14z" />
      </svg>
    ),
  },
  important: {
    bg: "var(--callout-note-bg)",
    border: "var(--callout-note-border)",
    defaultTitle: "Important",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
  },
  warning: {
    bg: "var(--callout-warning-bg)",
    border: "var(--callout-warning-border)",
    defaultTitle: "Warning",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    ),
  },
  caution: {
    bg: "var(--callout-caution-bg)",
    border: "var(--callout-caution-border)",
    defaultTitle: "Caution",
    icon: (
      <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
    ),
  },
};

export function Callout({ type = "note", title, children }: CalloutProps) {
  const config = calloutStyles[type];

  return (
    <div
      style={{
        backgroundColor: config.bg,
        borderColor: config.border,
      }}
      className="my-5 rounded-xl border p-4.5 text-[13px] leading-relaxed shadow-sm transition-colors text-[var(--foreground)]"
      role="alert"
    >
      <div className="flex items-center gap-2 font-semibold text-[var(--foreground)]">
        <span className="text-[var(--foreground)]">{config.icon}</span>
        <span>{title || config.defaultTitle}</span>
      </div>
      <div className="mt-2 text-[var(--muted-text)]">{children}</div>
    </div>
  );
}
