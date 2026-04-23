import RevealWrapper from "./RevealWrapper";

export default function OurStory() {
  return (
    <section className="py-20 lg:py-28 bg-[#7286a6]" aria-label="Nuestra historia">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <RevealWrapper>
          <p className="text-sm font-semibold uppercase tracking-widest text-[#fdfcf5]/60 mb-6">
            Nuestra historia
          </p>
        </RevealWrapper>
        <RevealWrapper delay={1}>
          <blockquote
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#fdfcf5] leading-tight mb-8"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            "Como cada casa tiene su historia, nosotros también tenemos la nuestra."
          </blockquote>
        </RevealWrapper>
        <RevealWrapper delay={2}>
          <p className="text-lg text-[#fdfcf5]/80 leading-relaxed">
            Las letras de RANNIA son las iniciales de cada miembro de la familia de nuestra fundadora.
            Un recordatorio de que detrás de cada proyecto hay personas reales,
            comprometidas con hacer bien las cosas.
          </p>
        </RevealWrapper>
      </div>
    </section>
  );
}
