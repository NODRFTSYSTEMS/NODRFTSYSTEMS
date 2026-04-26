import Link from "next/link";

const navLinks = [
  { href: "/investigations", label: "Investigations" },
  { href: "/documentation", label: "Documentation" },
  { href: "/archive", label: "Archive" },
  { href: "/series", label: "Series" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-ink/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Wordmark */}
        <Link
          href="/"
          className="font-serif text-lg font-bold text-paper tracking-tight hover:text-accent transition-colors"
        >
          FORGOTTEN BY DESIGN
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-xs uppercase tracking-widest text-mist hover:text-paper transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Subscribe CTA */}
        <Link
          href="/subscribe"
          className="hidden md:inline-flex items-center gap-2 bg-accent text-paper font-mono text-xs uppercase tracking-widest px-4 py-2 hover:bg-accent/80 transition-colors"
        >
          Subscribe
        </Link>

        {/* Mobile menu toggle — minimal, no JS dependency for SSR */}
        <details className="md:hidden relative">
          <summary className="cursor-pointer list-none text-mist hover:text-paper p-2">
            <span className="sr-only">Open menu</span>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <rect y="3" width="20" height="2" />
              <rect y="9" width="20" height="2" />
              <rect y="15" width="20" height="2" />
            </svg>
          </summary>
          <nav className="absolute right-0 top-full mt-1 w-56 bg-surface border border-border p-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-xs uppercase tracking-widest text-mist hover:text-paper transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/subscribe"
              className="mt-2 text-center bg-accent text-paper font-mono text-xs uppercase tracking-widest px-4 py-2"
            >
              Subscribe
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
