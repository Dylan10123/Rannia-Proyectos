"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const navLinks = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Casas", href: "#casas" },
  { label: "Galería", href: "#galeria" },
  { label: "Por qué elegirnos", href: "#ventajas" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#fdfcf5]/95 backdrop-blur-sm shadow-sm border-b border-[#d4c9b0]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Logo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium text-dark/90 hover:text-accent transition-colors duration-200 cursor-pointer"
              >
                <div className="px-4 py-4">{link.label}</div>
              </a>
            ))}
          </nav>

          {/* CTA button */}
          <a
            href="#contacto"
            onClick={(e) => handleNavClick(e, "#contacto")}
            className="hidden lg:inline-flex items-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-[#9f804f] hover:bg-[#8a6e42] transition-colors duration-200 cursor-pointer shadow-sm"
          >
            Solicitar información
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-md text-[#43473e] hover:text-[#9f804f] transition-colors cursor-pointer"
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } bg-[#fdfcf5] border-b border-[#d4c9b0]`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 pb-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="py-3 text-base font-medium text-[#43473e]/80 hover:text-[#9f804f] border-b border-[#d4c9b0]/50 last:border-0 transition-colors cursor-pointer"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={(e) => handleNavClick(e, "#contacto")}
            className="mt-3 inline-flex justify-center items-center px-5 py-3 rounded-lg text-sm font-semibold text-white bg-[#9f804f] hover:bg-[#8a6e42] transition-colors cursor-pointer"
          >
            Solicitar información
          </a>
        </nav>
      </div>
    </header>
  );
}
