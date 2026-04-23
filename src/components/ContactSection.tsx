import RevealWrapper from "./RevealWrapper";
import ContactForm from "./ContactForm";

export default function ContactSection() {
  return (
    <section
      id="contacto"
      className="py-20 lg:py-28 bg-[#f0ede0]"
      aria-label="Formulario de contacto"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left column: info */}
          <div>
            <RevealWrapper>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#9f804f] mb-4">
                Contacto
              </p>
            </RevealWrapper>
            <RevealWrapper delay={1}>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#43473e] leading-tight mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Hablemos de tu proyecto
              </h2>
            </RevealWrapper>
            <RevealWrapper delay={2}>
              <p className="text-[#43473e]/70 text-lg leading-relaxed mb-8">
                ¿Tienes un terreno y quieres saber cuánto costaría tu casa modular?
                ¿Necesitas asesoramiento sobre permisos o plazos? Escríbenos sin compromiso
                y te responderemos en menos de 24 horas.
              </p>
            </RevealWrapper>

            {/* Contact details */}
            <RevealWrapper delay={3}>
              <div className="space-y-5">
                {[
                  {
                    label: "Teléfono",
                    value: "+34 654 542 920",
                    sub: "Lunes a viernes, 9h–18h",
                    icon: (
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                      </svg>
                    ),
                  },
                  {
                    label: "Email",
                    value: "rannia.proyectos@gmail.com",
                    sub: "Respondemos en < 24h laborables",
                    icon: (
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                        <path d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z" />
                        <path d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z" />
                      </svg>
                    ),
                  },
                  {
                    label: "Ubicación",
                    value: "Calle Virgen de las Nieves 25, Burriana",
                    sub: "Con cita previa",
                    icon: (
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                        <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                      </svg>
                    ),
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#9f804f]/15 flex items-center justify-center text-[#9f804f] shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs text-[#43473e]/50 font-medium uppercase tracking-wide mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-[#43473e] font-medium">{item.value}</p>
                      <p className="text-sm text-[#43473e]/55">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </RevealWrapper>
          </div>

          {/* Right column: form */}
          <RevealWrapper delay={2}>
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-sm border border-[#d4c9b0]/50">
              <h3
                className="text-xl font-bold text-[#43473e] mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Solicitar información gratuita
              </h3>
              <ContactForm />
            </div>
          </RevealWrapper>
        </div>
      </div>
    </section>
  );
}
