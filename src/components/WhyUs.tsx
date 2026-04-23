import { Clock, Leaf, Handshake, PiggyBank } from "lucide-react";
import RevealWrapper from "./RevealWrapper";

const advantages = [
  {
    title: "100 días, llave en mano",
    description:
      "Desde que firmamos hasta que entras en tu casa, 100 días. Nuestro sistema de paneles CLT prefabricados en taller elimina los retrasos típicos de la obra tradicional.",
    icon: <Clock className="w-8 h-8" aria-hidden="true" />,
  },
  {
    title: "Hasta un 70% menos en tu factura",
    description:
      "El grosor y la densidad de nuestros paneles de madera regulan la temperatura de forma natural. Menos calefacción en invierno, menos aire acondicionado en verano.",
    icon: <Leaf className="w-8 h-8" aria-hidden="true" />,
  },
  {
    title: "Tu hipoteca, sin complicaciones",
    description:
      "Gestionamos tu hipoteca de autopromoción directamente con entidades financieras que ya conocen nuestro sistema y avalan la calidad de nuestras viviendas.",
    icon: <Handshake className="w-8 h-8" aria-hidden="true" />,
  },
  {
    title: "Hasta un 30% más económico",
    description:
      "Construir con Rannia es más rentable que la obra tradicional. El proceso industrializado reduce residuos, tiempos y costes, sin que notes la diferencia en el resultado.",
    icon: <PiggyBank className="w-8 h-8" aria-hidden="true" />,
  },
];

function Card({ adv }: { adv: (typeof advantages)[number] }) {
  return (
    <div className="relative bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 hover:border-[#9f804f]/40 transition-all duration-300 group h-full">
      <div className="w-14 h-14 rounded-xl bg-[#9f804f]/15 flex items-center justify-center text-[#9f804f] mb-5 group-hover:bg-[#9f804f]/25 transition-colors duration-300">
        {adv.icon}
      </div>
      <h3
        className="text-lg font-semibold text-white mb-3"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {adv.title}
      </h3>
      <p className="text-white/60 text-sm leading-relaxed">{adv.description}</p>
    </div>
  );
}

export default function WhyUs() {
  return (
    <section
      id="ventajas"
      className="py-20 lg:py-28 bg-[#43473e]"
      aria-label="Por qué elegirnos"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <RevealWrapper>
            <p className="text-sm font-semibold uppercase tracking-widest text-[#9f804f] mb-4">
              Por qué elegirnos
            </p>
          </RevealWrapper>
          <RevealWrapper delay={1}>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              La diferencia Rannia
            </h2>
          </RevealWrapper>
          <RevealWrapper delay={2}>
            <p className="mt-4 text-white/65 text-lg">
              No somos una constructora más. Somos tu socio de confianza para el
              proyecto más importante de tu vida.
            </p>
          </RevealWrapper>
        </div>

        {/* 4 tarjetas: grid 2×2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {advantages.map((adv, i) => (
              <RevealWrapper key={adv.title} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                <Card adv={adv} />
              </RevealWrapper>
            ))}
        </div>

        {/* Testimonial */}
        <RevealWrapper delay={1}>
          <div className="mt-16 bg-white/5 border border-white/10 rounded-3xl p-8 lg:p-10 max-w-3xl mx-auto text-center">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-8 h-8 text-[#9f804f] mx-auto mb-4"
              aria-hidden="true"
            >
              <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
            </svg>
            <blockquote className="text-white/85 text-lg lg:text-xl leading-relaxed italic mb-6">
              "Desde el primer contacto hasta la entrega, el equipo de Rannia
              estuvo presente en cada paso. Nuestra casa superó todas las
              expectativas. El proceso fue transparente y el resultado,
              impecable."
            </blockquote>
          </div>
        </RevealWrapper>
      </div>
    </section>
  );
}
