import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Política de Privacidad | Rannia Proyectos Modulares",
  description:
    "Información sobre el tratamiento de datos personales conforme al RGPD en Rannia Proyectos Modulares.",
  robots: { index: false, follow: false },
};

export default function PoliticaDePrivacidad() {
  return (
    <div className="min-h-screen bg-[#fdfcf5] pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#9f804f] hover:text-[#8a6e42] transition-colors mb-10 cursor-pointer"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4" aria-hidden="true">
            <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
          </svg>
          Volver a la página principal
        </Link>

        <article className="prose prose-stone max-w-none">
          <h1
            className="text-3xl sm:text-4xl font-bold text-[#43473e] mb-8"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Política de Privacidad
          </h1>

          <p className="text-[#43473e]/60 text-sm mb-10">
            Última actualización: {new Date().toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div className="space-y-8 text-[#43473e]/80 leading-relaxed">
            <section aria-labelledby="responsable">
              <h2 id="responsable" className="text-xl font-bold text-[#43473e] mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                1. Responsable del tratamiento
              </h2>
              <p>
                En cumplimiento del Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica
                3/2018 de Protección de Datos Personales (LOPDGDD), le informamos de
                que el responsable del tratamiento de sus datos personales es:
              </p>
              <ul className="list-none mt-3 space-y-1 text-sm">
                <li><strong>Nombre:</strong> Noelia Corbalán Señoret</li>
                <li><strong>NIF:</strong> 52945209Z</li>
                <li><strong>Dirección:</strong> Calle Virgen de las Nieves 25, Burriana</li>
                <li><strong>Email:</strong> rannia.proyectos@gmail.com</li>
                <li><strong>Teléfono:</strong> +34 654 542 920</li>
              </ul>
            </section>

            <section aria-labelledby="datos-recogidos">
              <h2 id="datos-recogidos" className="text-xl font-bold text-[#43473e] mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                2. Datos personales que recogemos
              </h2>
              <p>
                A través del formulario de contacto de nuestra web recogemos los
                siguientes datos personales:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1 text-sm">
                <li>Nombre y apellidos</li>
                <li>Dirección de correo electrónico</li>
                <li>Número de teléfono</li>
                <li>El contenido del mensaje que nos envíes</li>
              </ul>
            </section>

            <section aria-labelledby="finalidades">
              <h2 id="finalidades" className="text-xl font-bold text-[#43473e] mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                3. Finalidades del tratamiento
              </h2>
              <p>
                Tratamos sus datos personales para las siguientes finalidades:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1 text-sm">
                <li>Atender y gestionar su consulta o solicitud de información.</li>
                <li>Contactarle para proporcionarle la información solicitada sobre nuestros servicios.</li>
                <li>Gestión interna de leads y clientes potenciales.</li>
              </ul>
            </section>

            <section aria-labelledby="base-legal">
              <h2 id="base-legal" className="text-xl font-bold text-[#43473e] mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                4. Base legal del tratamiento
              </h2>
              <p>
                La base legal para el tratamiento de sus datos es el <strong>consentimiento
                expreso</strong> que usted otorga al marcar la casilla de aceptación de la
                presente política y enviar el formulario (art. 6.1.a RGPD).
              </p>
              <p className="mt-3">
                Puede retirar su consentimiento en cualquier momento sin que ello afecte
                a la licitud del tratamiento basado en el consentimiento previo a su
                retirada.
              </p>
            </section>

            <section aria-labelledby="conservacion">
              <h2 id="conservacion" className="text-xl font-bold text-[#43473e] mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                5. Plazo de conservación
              </h2>
              <p>
                Sus datos se conservarán durante el tiempo necesario para atender su
                consulta y, posteriormente, durante el plazo de prescripción de las
                posibles responsabilidades legales derivadas del tratamiento (máximo
                3 años). Transcurrido dicho plazo, los datos serán eliminados o
                anonimizados.
              </p>
            </section>

            <section aria-labelledby="destinatarios">
              <h2 id="destinatarios" className="text-xl font-bold text-[#43473e] mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                6. Destinatarios
              </h2>
              <p>
                Sus datos no serán cedidos a terceros salvo obligación legal.
                Para la gestión técnica, utilizamos los siguientes proveedores de
                confianza que actúan como encargados del tratamiento:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1 text-sm">
                <li><strong>Supabase Inc.</strong> (almacenamiento de datos) — con acuerdo de tratamiento conforme al RGPD.</li>
                <li><strong>Resend Inc.</strong> (servicio de envío de emails) — con acuerdo de tratamiento conforme al RGPD.</li>
                <li><strong>Vercel Inc.</strong> (infraestructura de hosting) — con acuerdo de tratamiento conforme al RGPD.</li>
              </ul>
            </section>

            <section aria-labelledby="derechos">
              <h2 id="derechos" className="text-xl font-bold text-[#43473e] mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                7. Sus derechos
              </h2>
              <p>
                Como interesado, puede ejercer los siguientes derechos ante el
                responsable del tratamiento, enviando un email a <strong>rannia.proyectos@gmail.com</strong>
                {" "}junto con una copia de su documento de identidad:
              </p>
              <ul className="list-disc list-inside mt-3 space-y-1 text-sm">
                <li><strong>Derecho de acceso:</strong> conocer qué datos tratamos sobre usted.</li>
                <li><strong>Derecho de rectificación:</strong> corregir datos inexactos.</li>
                <li><strong>Derecho de supresión:</strong> solicitar la eliminación de sus datos.</li>
                <li><strong>Derecho a la limitación del tratamiento.</strong></li>
                <li><strong>Derecho a la portabilidad de los datos.</strong></li>
                <li><strong>Derecho de oposición.</strong></li>
              </ul>
              <p className="mt-3">
                Si considera que el tratamiento no se ajusta a la normativa vigente,
                puede presentar reclamación ante la{" "}
                <strong>Agencia Española de Protección de Datos (AEPD)</strong>{" "}
                a través de <a href="https://www.aepd.es" className="text-[#9f804f] hover:underline" target="_blank" rel="noopener noreferrer">www.aepd.es</a>.
              </p>
            </section>

            <section aria-labelledby="cookies">
              <h2 id="cookies" className="text-xl font-bold text-[#43473e] mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                8. Cookies
              </h2>
              <p>
                Esta web no utiliza cookies de seguimiento ni de publicidad. Únicamente
                se pueden utilizar cookies técnicas estrictamente necesarias para el
                funcionamiento de la web.
              </p>
            </section>

            <section aria-labelledby="seguridad">
              <h2 id="seguridad" className="text-xl font-bold text-[#43473e] mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                9. Seguridad
              </h2>
              <p>
                Rannia Proyectos Modulares ha adoptado las medidas técnicas y
                organizativas necesarias para garantizar la seguridad e integridad
                de los datos personales y evitar su alteración, pérdida, tratamiento
                o acceso no autorizado, teniendo en cuenta el estado de la tecnología,
                la naturaleza de los datos y los riesgos identificados.
              </p>
            </section>

            <section aria-labelledby="modificaciones">
              <h2 id="modificaciones" className="text-xl font-bold text-[#43473e] mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                10. Modificaciones
              </h2>
              <p>
                Rannia Proyectos Modulares se reserva el derecho de modificar la
                presente política de privacidad para adaptarla a novedades legislativas
                o jurisprudenciales. En tales casos, se anunciará en esta página con
                la nueva fecha de actualización.
              </p>
            </section>
          </div>
        </article>
      </div>
    </div>
  );
}
