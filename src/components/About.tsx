import RevealWrapper from "./RevealWrapper";

const values = [
  {
    title: "Calidad Premium",
    description:
      "Paneles CLT de gran espesor fabricados con madera certificada. Un material que aísla, respira y dura generaciones.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-7 h-7"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
    ),
  },
  {
    title: "Entrega Rápida",
    description:
      "Al preparar cada pieza en taller antes de llegar a tu terreno, reducimos los tiempos de obra hasta un 50% respecto a la construcción tradicional.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-7 h-7"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    title: "Personalización Total",
    description:
      "El diseño se pacta contigo desde el primer día. Tu casa no se adapta a un catálogo: el catálogo se adapta a tu vida.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-7 h-7"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
        />
      </svg>
    ),
  },
  {
    title: "Eficiencia Energética",
    description:
      "El CLT regula de forma natural la temperatura interior, reduciendo el consumo energético y tu huella de carbono desde el primer día.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="w-7 h-7"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
        />
      </svg>
    ),
  },
];

export default function About() {
  return (
    <section
      id="nosotros"
      className="py-20 lg:py-28 bg-[#fdfcf5]"
      aria-label="Sobre nosotros"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text column */}
          <div>
            <RevealWrapper>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#9f804f] mb-4">
                Sobre Rannia
              </p>
            </RevealWrapper>
            <RevealWrapper delay={1}>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#43473e] leading-tight mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Construimos diferente
              </h2>
            </RevealWrapper>
            <RevealWrapper delay={2}>
              <p className="text-[#43473e]/70 text-lg leading-relaxed mb-6">
                En Rannia no construimos casas en serie. Cada proyecto comienza
                con una conversación: escuchamos cómo quieres vivir, qué
                espacios necesitas y cómo imaginas tu hogar. A partir de ahí,
                diseñamos cada detalle contigo.
              </p>
            </RevealWrapper>
            <RevealWrapper delay={3}>
              <p className="text-[#43473e]/70 text-lg leading-relaxed">
                Una vez cerrado el diseño, fabricamos en taller los paneles de
                madera CLT cortados y preparados con precisión milimétrica para
                tu proyecto. El resultado es una construcción limpia, rápida y
                sin imprevistos: los materiales llegan a tu terreno listos para
                encajar, reduciendo los tiempos de obra a la mitad sin renunciar
                a un milímetro de calidad ni de aislamiento.
              </p>
            </RevealWrapper>
          </div>

          {/* Values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-stretch">
            {values.map((value, i) => (
              <RevealWrapper
                key={value.title}
                delay={((i % 4) + 1) as 1 | 2 | 3 | 4}
                className="h-full"
              >
                <div className="bg-white rounded-2xl p-6 border border-[#d4c9b0]/50 hover:border-[#9f804f]/40 hover:shadow-md transition-all duration-300 group h-full flex flex-col">
                  <div className="w-12 h-12 rounded-xl bg-[#9f804f]/10 flex items-center justify-center text-[#9f804f] mb-4 group-hover:bg-[#9f804f]/20 transition-colors duration-300">
                    {value.icon}
                  </div>
                  <h3
                    className="font-semibold text-[#43473e] text-base mb-2"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {value.title}
                  </h3>
                  <p className="text-sm text-[#43473e]/65 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </RevealWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
