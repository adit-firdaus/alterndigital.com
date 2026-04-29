"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

export type NavbarClientProps = {
  brandShort: string;
  brandLegal: string;
  navItems: { label: string; hash: string }[];
  waHref: string;
  ctaLabel: string;
};

export default function NavbarClient({
  brandShort,
  brandLegal,
  navItems,
  waHref,
  ctaLabel,
}: NavbarClientProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: "instant" }));
  }, [pathname]);

  const handleNavClick = (hash: string) => {
    setMobileOpen(false);
    if (pathname !== "/") {
      router.push("/" + hash);
      return;
    }
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "instant" });
  };

  return (
    <nav
      data-testid="navbar"
      className={`fixed top-0 left-0 w-full z-50 bg-black transition-colors duration-200 ${
        scrolled ? "border-b border-white/15" : "border-b border-white/5"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 h-20 flex items-center justify-between">
        <Link href="/" data-testid="navbar-logo" className="flex flex-col leading-none">
          <span className="text-white font-bold text-xl tracking-[0.15em] uppercase">{brandShort}</span>
          <span className="text-[#666666] text-[10px] tracking-[0.1em] uppercase mt-0.5">
            {brandLegal}
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((link) => (
            <button
              key={link.hash}
              type="button"
              onClick={() => handleNavClick(link.hash)}
              data-testid={`nav-link-${link.hash.replace("#", "")}`}
              className="text-[#AAAAAA] text-xs uppercase tracking-widest hover:text-white transition-colors duration-200 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="navbar-cta-button"
            className="border border-white text-white text-xs uppercase tracking-widest px-6 py-3 hover:bg-white hover:text-black transition-colors duration-200"
          >
            {ctaLabel}
          </a>
        </div>

        <button
          type="button"
          className="lg:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-testid="mobile-menu-toggle"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div
          data-testid="mobile-menu"
          className="lg:hidden bg-black border-t border-white/10 px-6 py-6 flex flex-col gap-4"
        >
          {navItems.map((link) => (
            <button
              key={link.hash}
              type="button"
              onClick={() => handleNavClick(link.hash)}
              className="text-[#AAAAAA] text-sm uppercase tracking-widest hover:text-white transition-colors duration-200 text-left"
            >
              {link.label}
            </button>
          ))}
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white text-white text-xs uppercase tracking-widest px-6 py-3 text-center hover:bg-white hover:text-black transition-colors duration-200 mt-2"
          >
            {ctaLabel}
          </a>
        </div>
      )}
    </nav>
  );
}
