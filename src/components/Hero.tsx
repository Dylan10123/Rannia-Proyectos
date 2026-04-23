"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import Logo from "./Logo";

export default function Hero() {
  const logoRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [
      logoRef.current,
      headingRef.current,
      subRef.current,
      ctaRef.current,
    ];
    els.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      setTimeout(
        () => {
          if (!el) return;
          el.style.transition =
            "opacity 0.8s ease-out, transform 0.8s ease-out";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        },
        100 + i * 160,
      );
    });
  }, []);

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-dvh flex items-center justify-center overflow-hidden"
      aria-label="Sección principal"
    >
      {/* Background image */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/hero-image.webp"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Radial overlay: light cream in centre (text area), transparent at edges */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 45%, rgba(253,252,245,0.84) 0%, rgba(253,252,245,0.55) 55%, rgba(253,252,245,0.08) 100%)",
          }}
        />
        {/* Bottom fade into page */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#fdfcf5] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Logo mark */}
        <div ref={logoRef} className="flex justify-center">
          <Logo variant="icon" size={130} />
        </div>

        <p className="inline-flex items-center gap-2 text-[#9f804f] text-sm font-semibold uppercase tracking-widest mb-6">
          <span className="inline-block w-8 h-px bg-[#9f804f]" />
          Proyectos Modulares Premium
          <span className="inline-block w-8 h-px bg-[#9f804f]" />
        </p>

        <h1
          ref={headingRef}
          className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-[#43473e] leading-tight mb-6"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Tu hogar modular,
          <br />
          <span className="text-[#9f804f]">diseñado para vivir mejor</span>
        </h1>

        <p
          ref={subRef}
          className="text-lg sm:text-xl text-[#43473e]/75 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Construimos casas modulares de alta calidad con los mejores
          materiales, tiempos de entrega optimizados y total personalización
          para adaptarse a tu estilo de vida.
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#contacto"
            onClick={(e) => handleScroll(e, "#contacto")}
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold text-white bg-[#9f804f] hover:bg-[#8a6e42] transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
          >
            Solicitar información gratuita
          </a>
          <a
            href="#galeria"
            onClick={(e) => handleScroll(e, "#galeria")}
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-base font-semibold text-[#43473e] border-2 border-[#43473e]/30 hover:border-[#9f804f] hover:text-[#9f804f] transition-all duration-200 cursor-pointer"
          >
            Ver proyectos acabados
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-6 sm:gap-10 max-w-lg mx-auto">
          {[
            { value: "100", label: "Días y te entregamos las llaves" },
            { value: "70%", label: "De ahorro en luz y calefacción" },
            {
              value: "30%",
              label: "De ahorro comparado con obra tradicional",
            },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="text-2xl sm:text-3xl font-bold text-[#9f804f]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {stat.value}
              </p>
              <p className="text-xs sm:text-sm text-[#43473e]/60 mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#nosotros"
        onClick={(e) => handleScroll(e, "#nosotros")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#43473e]/40 hover:text-[#9f804f] transition-colors cursor-pointer animate-bounce"
        aria-label="Ir a la siguiente sección"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  );
}
