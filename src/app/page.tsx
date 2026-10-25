const ArrowUpRight = () => (
  <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4">
    <path d="M4 12 12 4M5 4h7v7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
  </svg>
);

const ChevronDown = () => (
  <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4">
    <path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
  </svg>
);

const SearchIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5">
    <circle cx="8.75" cy="8.75" r="5.75" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="m13 13 4 4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
  </svg>
);

const BookIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6">
    <path d="M5 4.75A2.75 2.75 0 0 1 7.75 2H20v17H7.75A2.75 2.75 0 0 0 5 21.75m0-17v17m0-17h12.5M8 6h8m-8 4h8" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
  </svg>
);

const TerminalIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6">
    <path d="m5 7 5 5-5 5m7 0h7" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
  </svg>
);

const LayersIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6">
    <path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5m-18 5 9 5 9-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
  </svg>
);

const navSections = [
  { label: "Overview", items: ["Introduction", "How Veritas works"] },
  { label: "Get started", items: ["Quickstart", "Installation", "Configuration"] },
  { label: "Core concepts", items: ["Truth signals", "Evidence graph", "Trust scores"] },
  { label: "Guides", items: ["Build a verifier", "Integrations", "Best practices"] },
];

const cards = [
  {
    icon: TerminalIcon,
    eyebrow: "Start here",
    title: "Quickstart",
    description: "Go from your first input to a verified result in under five minutes.",
    action: "Read the quickstart",
  },
  {
    icon: LayersIcon,
    eyebrow: "Understand the system",
    title: "Core concepts",
    description: "Learn how signals, evidence, and trust scores work together.",
    action: "Explore concepts",
  },
  {
    icon: BookIcon,
    eyebrow: "Build with Veritas",
    title: "API reference",
    description: "Everything you need to integrate verification into your product.",
    action: "View the reference",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fbfcfe] text-[#142033]">
      <header className="sticky top-0 z-20 border-b border-[#e5e9f0] bg-[#fbfcfe]/90 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6 lg:px-10">
          <Link href="/" className="flex items-center gap-3" aria-label="Veritas home">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#1c57c7] text-white shadow-[0_4px_10px_rgba(28,87,199,0.2)]">
              <span className="absolute h-4 w-4 rounded-full border-[1.5px] border-white/90" />
              <span className="absolute h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            <span className="text-[19px] font-semibold tracking-[-0.03em]">Veritas</span>
          </Link>
          <nav className="hidden items-center gap-8 text-[13px] font-medium text-[#5b687d] md:flex" aria-label="Main navigation">
            <a className="text-[#17263b] transition-colors hover:text-[#1c57c7]" href="#docs">Docs</a>
            <a className="transition-colors hover:text-[#1c57c7]" href="#guides">Guides</a>
            <a className="transition-colors hover:text-[#1c57c7]" href="#api">API reference</a>
            <a className="transition-colors hover:text-[#1c57c7]" href="#community">Community</a>
          </nav>
          <div className="flex items-center gap-2">
            <button className="hidden items-center gap-1.5 rounded-lg border border-[#dfe5ee] bg-white px-3 py-2 text-[13px] font-medium text-[#526075] transition-colors hover:border-[#b9c6d8] sm:flex" type="button">
              v1.0 <ChevronDown />
            </button>
            <a className="hidden items-center gap-1.5 rounded-lg bg-[#1c57c7] px-3.5 py-2 text-[13px] font-medium text-white transition-colors hover:bg-[#1649aa] sm:flex" href="#quickstart">
              Get started <ArrowUpRight />
            </a>
            <button className="rounded-lg p-2 text-[#526075] md:hidden" type="button" aria-label="Open navigation">
              <svg aria-hidden="true" viewBox="0 0 20 20" className="h-5 w-5"><path d="M3 5h14M3 10h14M3 15h14" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" /></svg>
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 lg:grid-cols-[230px_minmax(0,1fr)]">
        <aside className="hidden border-r border-[#e5e9f0] px-6 py-10 lg:block lg:px-8">
          <div className="sticky top-[112px]">
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8c98a9]">Documentation</p>
            <nav className="space-y-7" aria-label="Documentation navigation">
              {navSections.map((section) => (
                <div key={section.label}>
                  <p className="mb-2.5 text-[12px] font-semibold text-[#394a61]">{section.label}</p>
                  <ul className="space-y-1 border-l border-[#e4e9f0]">
                    {section.items.map((item, index) => (
                      <li key={item}>
                        <a className={`-ml-px block border-l-2 py-1.5 pl-3 text-[12px] transition-colors ${index === 0 && section.label === "Overview" ? "border-[#1c57c7] font-medium text-[#1c57c7]" : "border-transparent text-[#78869a] hover:border-[#b9c8dd] hover:text-[#1c57c7]"}`} href={`#${item.toLowerCase().replaceAll(" ", "-")}`}>{item}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
            <div className="mt-12 rounded-xl border border-[#e0e7f1] bg-white p-4">
              <p className="text-[12px] font-semibold text-[#34455c]">Need help?</p>
              <p className="mt-1 text-[11px] leading-5 text-[#8490a1]">Ask a question in our community.</p>
              <a className="mt-3 inline-flex items-center gap-1 text-[11px] font-medium text-[#1c57c7]" href="#community">Join Discord <ArrowUpRight /></a>
            </div>
          </div>
        </aside>

        <main id="docs" className="min-w-0">
          <section className="relative overflow-hidden border-b border-[#e5e9f0] px-6 pb-20 pt-20 sm:px-10 lg:px-20 lg:pb-24 lg:pt-24">
            <div className="pointer-events-none absolute -right-28 -top-32 h-[440px] w-[440px] rounded-full bg-[#eaf1ff] blur-3xl" />
            <div className="relative mx-auto max-w-[820px]">
              <div className="mb-6 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1c57c7]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1c57c7]" /> Documentation
              </div>
              <h1 className="max-w-[750px] text-[clamp(2.6rem,5vw,4.75rem)] font-semibold leading-[1.04] tracking-[-0.06em] text-[#142033]">
                Build with confidence.
              </h1>
              <p className="mt-6 max-w-[570px] text-[17px] leading-8 text-[#68768a]">
                Veritas helps you turn uncertain information into decisions you can trust. Explore the platform, learn the principles, and start building.
              </p>
              <div className="mt-9 flex max-w-[610px] items-center gap-3 rounded-xl border border-[#dce4ef] bg-white p-2.5 shadow-[0_8px_24px_rgba(35,67,112,0.05)]">
                <SearchIcon />
                <input className="min-w-0 flex-1 bg-transparent text-[14px] text-[#223249] outline-none placeholder:text-[#9aa6b6]" placeholder="Search the documentation..." type="search" />
                <kbd className="hidden rounded-md border border-[#e3e8ef] bg-[#f8fafc] px-2 py-1 text-[10px] text-[#97a2b1] sm:block">⌘ K</kbd>
              </div>
              <div className="mt-5 flex items-center gap-5 text-[12px] text-[#8b97a7]">
                <span>Latest version <strong className="font-medium text-[#59687c]">v1.0.0</strong></span>
                <span className="h-1 w-1 rounded-full bg-[#cbd3de]" />
                <span>Updated October 2025</span>
              </div>
            </div>
          </section>

          <section id="quickstart" className="px-6 py-16 sm:px-10 lg:px-20 lg:py-20">
            <div className="mx-auto max-w-[940px]">
              <div className="mb-8 flex items-end justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8c98a9]">Explore Veritas</p>
                  <h2 className="mt-2 text-[25px] font-semibold tracking-[-0.035em] text-[#17263b]">Start where you are</h2>
                </div>
                <a className="hidden items-center gap-1.5 text-[12px] font-medium text-[#1c57c7] sm:flex" href="#guides">View all guides <ArrowUpRight /></a>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {cards.map((card) => (
                  <a className="group rounded-xl border border-[#e0e7f0] bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[#b9cbea] hover:shadow-[0_12px_30px_rgba(35,67,112,0.08)]" href="#guides" key={card.title}>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#edf3ff] text-[#1c57c7]"><card.icon /></div>
                    <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#8a96a7]">{card.eyebrow}</p>
                    <h3 className="mt-2 text-[17px] font-semibold tracking-[-0.025em] text-[#1b2b42]">{card.title}</h3>
                    <p className="mt-2 min-h-[48px] text-[13px] leading-6 text-[#78869a]">{card.description}</p>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[12px] font-medium text-[#1c57c7]">{card.action} <ArrowUpRight /></span>
                  </a>
                ))}
              </div>
            </div>
          </section>

          <section id="guides" className="border-t border-[#e5e9f0] bg-[#f5f8fc] px-6 py-14 sm:px-10 lg:px-20">
            <div className="mx-auto flex max-w-[940px] flex-col justify-between gap-8 sm:flex-row sm:items-center">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1c57c7]">What&apos;s new</p>
                <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.035em] text-[#17263b]">Veritas v1.0 is here</h2>
                <p className="mt-2 max-w-[530px] text-[13px] leading-6 text-[#78869a]">The first public release brings the complete verification toolkit, a richer evidence graph, and a simpler way to measure trust.</p>
              </div>
              <a className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg border border-[#d8e2ef] bg-white px-4 py-2.5 text-[12px] font-medium text-[#1c57c7] transition-colors hover:border-[#aebfda] sm:self-center" href="#changelog">Read the changelog <ArrowUpRight /></a>
            </div>
          </section>
        </main>
      </div>

      <footer id="community" className="border-t border-[#e5e9f0] bg-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-6 py-7 text-[12px] text-[#8793a4] sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <p>© 2025 Veritas. Built for better decisions.</p>
          <div className="flex gap-5"><a className="hover:text-[#1c57c7]" href="#github">GitHub</a><a className="hover:text-[#1c57c7]" href="#discord">Discord</a><a className="hover:text-[#1c57c7]" href="#status">Status</a></div>
        </div>
      </footer>
    </div>
  );
}
import Link from "next/link";
