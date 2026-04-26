import Link from "next/link";

const platformLinks = [
  { href: "https://www.youtube.com/@ForgottenByDesign", label: "YouTube" },
  { href: "https://www.tiktok.com/@ForgottenByDesign", label: "TikTok" },
];

const siteLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact / Press" },
  { href: "/subscribe", label: "Subscribe" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="font-serif text-base font-bold text-paper block mb-2"
            >
              FORGOTTEN BY DESIGN
            </Link>
            <p className="font-mono text-xs text-mist leading-relaxed max-w-xs">
              Archive-driven investigations into the stories institutions
              simplified, erased, or renamed.
            </p>
          </div>

          {/* Platform links */}
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-mist mb-4">
              Platforms
            </p>
            <div className="flex flex-col gap-2">
              {platformLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-mist hover:text-paper transition-colors"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          </div>

          {/* Site links */}
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-mist mb-4">
              Site
            </p>
            <div className="flex flex-col gap-2">
              {siteLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-mono text-xs text-mist hover:text-paper transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-mono text-xs text-mist">
            © {new Date().getFullYear()} Forgotten by Design. All rights reserved.
          </p>
          <Link
            href="/subscribe"
            className="font-mono text-xs uppercase tracking-widest text-accent hover:text-paper transition-colors"
          >
            Get release alerts →
          </Link>
        </div>
      </div>
    </footer>
  );
}
