import Link from "next/link";

interface BreadcrumbItem {
  title: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center space-x-2 text-[12px] text-[var(--subtle-text)]">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <div key={item.href} className="flex items-center space-x-2">
            {index > 0 && (
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3 w-3 shrink-0 text-[var(--subtle-text)]" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            {isLast ? (
              <span className="font-semibold text-[var(--foreground)]" aria-current="page">
                {item.title}
              </span>
            ) : (
              <Link href={item.href} className="hover:text-[var(--accent)] transition-colors">
                {item.title}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
