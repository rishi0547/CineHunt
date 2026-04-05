import { useState } from "react";

const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Trending", href: "#trending" },
  { label: "Favorites", href: "#favorites", muted: true },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0f0f1a]/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 xs:px-6 sm:px-10">
        <a
          href="#top"
          className="group flex items-center gap-1 text-2xl font-black tracking-[0.14em] text-transparent transition-all duration-300 hover:drop-shadow-[0_0_14px_rgba(171,139,255,0.55)] sm:text-3xl"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="CineHunt home"
        >
          <span className="bg-linear-to-r from-[#D6C7FF] to-[#AB8BFF] bg-clip-text uppercase">
            CineHunt
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) =>
            link.muted ? (
              <span
                key={link.label}
                className="rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-light-200/70"
                title="Coming soon"
              >
                {link.label}
              </span>
            ) : (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-light-200 transition-colors duration-300 hover:text-white"
              >
                {link.label}
              </a>
            ),
          )}
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10 md:hidden"
          onClick={() => setIsMobileMenuOpen((current) => !current)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="sr-only">Toggle navigation</span>
          <div className="flex flex-col gap-1.5">
            <span className="h-0.5 w-5 rounded-full bg-current" />
            <span className="h-0.5 w-5 rounded-full bg-current" />
            <span className="h-0.5 w-5 rounded-full bg-current" />
          </div>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#0f0f1a]/95 px-5 py-4 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3">
            {navLinks.map((link) =>
              link.muted ? (
                <span
                  key={link.label}
                  className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-medium text-light-200/60"
                >
                  {link.label}
                </span>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-medium text-light-200 transition-colors hover:border-[#E50914]/40 hover:bg-white/5 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ),
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
