import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { headers } from "next/headers";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function truncate(value: string | undefined, max: number): string {
  return (value ?? "").trim().slice(0, max);
}

// ---------------------------------------------------------------------------
// Rate limiter — skipped gracefully when Upstash env vars are absent
// ---------------------------------------------------------------------------

async function checkRateLimit(ip: string): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return true;

  const { Ratelimit } = await import("@upstash/ratelimit");
  const { Redis } = await import("@upstash/redis");

  const ratelimit = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(3, "10 m"),
    analytics: false,
  });

  const { success } = await ratelimit.limit(ip);
  return success;
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------

export async function POST(request: Request) {
  // ── Rate limiting ─────────────────────────────────────────────────────────
  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";

  const allowed = await checkRateLimit(ip);
  if (!allowed) {
    return Response.json(
      { error: "Demasiados intentos. Por favor, espera unos minutos." },
      { status: 429 }
    );
  }

  // ── Parse body ────────────────────────────────────────────────────────────
  let body: {
    nombre?: string;
    email?: string;
    telefono?: string;
    mensaje?: string;
    privacidad?: boolean;
    website?: string;
  };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Formato de solicitud inválido." }, { status: 400 });
  }

  // ── Honeypot ──────────────────────────────────────────────────────────────
  if (body.website) {
    return Response.json({ success: true }, { status: 200 });
  }

  // ── Sanitize & truncate ───────────────────────────────────────────────────
  const nombre   = truncate(body.nombre,   100);
  const email    = truncate(body.email,    254).toLowerCase();
  const telefono = truncate(body.telefono,  15);
  const mensaje  = truncate(body.mensaje, 1000);
  const privacidad = body.privacidad;

  // ── Server-side validation ────────────────────────────────────────────────
  if (!nombre || !email || !telefono) {
    return Response.json(
      { error: "Nombre, email y teléfono son obligatorios." },
      { status: 400 }
    );
  }

  if (!privacidad) {
    return Response.json(
      { error: "Debes aceptar la política de privacidad." },
      { status: 400 }
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: "Email inválido." }, { status: 400 });
  }

  if (!/^[+\d\s\-()\u00C0-\u024F]{7,15}$/.test(telefono)) {
    return Response.json({ error: "Teléfono inválido." }, { status: 400 });
  }

  // ── Supabase ──────────────────────────────────────────────────────────────
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return Response.json(
      { error: "Error de configuración del servidor. Contacta directamente por teléfono." },
      { status: 500 }
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { error: dbError } = await supabase.from("leads").insert({
    nombre,
    email,
    telefono,
    mensaje: mensaje || null,
    leido: false,
  });

  if (dbError) {
    return Response.json(
      { error: "No se pudo guardar tu solicitud. Por favor, inténtalo de nuevo." },
      { status: 500 }
    );
  }

  // ── Resend email notification ─────────────────────────────────────────────
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail   = process.env.RESEND_TO_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL;

  if (resendKey && toEmail && fromEmail) {
    const resend = new Resend(resendKey);

    const safeNombre   = escapeHtml(nombre);
    const safeEmail    = escapeHtml(email);
    const safeTelefono = escapeHtml(telefono);
    const safeMensaje  = escapeHtml(mensaje || "—").replace(/\n/g, "<br>");

    try { await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `[Rannia] Nuevo lead: ${safeNombre}`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
        <body style="font-family: 'Segoe UI', Arial, sans-serif; background: #f0ede0; margin: 0; padding: 24px;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
            <div style="background: #43473e; padding: 28px 32px; text-align: center;">
              <h1 style="color: #9f804f; font-size: 22px; margin: 0; font-weight: 700; letter-spacing: -0.3px;">
                Rannia Proyectos Modulares
              </h1>
              <p style="color: #ffffff; opacity: 0.7; margin: 6px 0 0; font-size: 14px;">
                Nuevo lead recibido desde la web
              </p>
            </div>
            <div style="padding: 32px;">
              <div style="background: #9f804f; border-radius: 10px; padding: 16px 20px; margin-bottom: 24px;">
                <p style="color: white; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 4px;">
                  Nuevo contacto recibido
                </p>
                <p style="color: rgba(255,255,255,0.8); font-size: 12px; margin: 0;">
                  ${new Date().toLocaleString("es-ES", { dateStyle: "long", timeStyle: "short" })}
                </p>
              </div>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0ede0; width: 130px; vertical-align: top;">
                    <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: #9f804f; letter-spacing: 0.5px;">Nombre</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0ede0; color: #43473e; font-size: 15px; font-weight: 500;">
                    ${safeNombre}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0ede0; vertical-align: top;">
                    <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: #9f804f; letter-spacing: 0.5px;">Email</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0ede0; color: #43473e; font-size: 15px;">
                    <a href="mailto:${safeEmail}" style="color: #7286a6; text-decoration: none;">${safeEmail}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0ede0; vertical-align: top;">
                    <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: #9f804f; letter-spacing: 0.5px;">Teléfono</span>
                  </td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #f0ede0; color: #43473e; font-size: 15px;">
                    <a href="tel:${safeTelefono}" style="color: #7286a6; text-decoration: none;">${safeTelefono}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; vertical-align: top;">
                    <span style="font-size: 12px; font-weight: 600; text-transform: uppercase; color: #9f804f; letter-spacing: 0.5px;">Mensaje</span>
                  </td>
                  <td style="padding: 12px 0; color: #43473e; font-size: 15px; line-height: 1.6;">
                    ${safeMensaje}
                  </td>
                </tr>
              </table>
              <div style="margin-top: 28px; padding: 16px 20px; background: #f0ede0; border-radius: 10px; text-align: center;">
                <p style="font-size: 13px; color: #43473e; opacity: 0.6; margin: 0;">
                  Este lead ha sido guardado automáticamente en Supabase.
                  Responde en menos de 24 horas para maximizar la conversión.
                </p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // ── Confirmación al cliente ───────────────────────────────────────────────
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: "Hemos recibido tu solicitud — Rannia Proyectos Modulares",
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
        <body style="font-family: 'Segoe UI', Arial, sans-serif; background: #f0ede0; margin: 0; padding: 24px;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">

            <!-- Cabecera -->
            <div style="background: #43473e; padding: 36px 32px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 22px; margin: 0 0 6px; font-weight: 700; letter-spacing: -0.3px;">
                Rannia Proyectos Modulares
              </h1>
              <p style="color: #d4c9b0; font-size: 13px; margin: 0;">
                ranniamodular.es
              </p>
            </div>

            <!-- Cuerpo -->
            <div style="padding: 40px 32px 32px;">

              <p style="font-size: 16px; color: #43473e; margin: 0 0 8px; font-weight: 600;">
                Hola, ${safeNombre} 👋
              </p>
              <p style="font-size: 15px; color: #43473e; line-height: 1.7; margin: 0 0 24px;">
                Gracias por contactar con nosotros. Hemos recibido tu solicitud de información
                y nos pondremos en contacto contigo en un plazo máximo de
                <strong>24 horas laborables</strong>.
              </p>

              <!-- Separador con mensaje destacado -->
              <div style="background: #fdfcf5; border-left: 4px solid #9f804f; border-radius: 0 10px 10px 0; padding: 16px 20px; margin-bottom: 28px;">
                <p style="font-size: 14px; color: #43473e; margin: 0; line-height: 1.6;">
                  Mientras tanto, si tienes alguna duda urgente puedes escribirnos directamente
                  respondiendo a este correo o llamarnos por teléfono.
                </p>
              </div>

              <!-- Resumen de los datos enviados -->
              <p style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; color: #9f804f; margin: 0 0 12px;">
                Resumen de tu solicitud
              </p>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0ede0; width: 110px; vertical-align: top;">
                    <span style="font-size: 12px; color: #43473e; opacity: 0.5;">Nombre</span>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0ede0; color: #43473e; font-size: 14px;">
                    ${safeNombre}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0ede0; vertical-align: top;">
                    <span style="font-size: 12px; color: #43473e; opacity: 0.5;">Teléfono</span>
                  </td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #f0ede0; color: #43473e; font-size: 14px;">
                    ${safeTelefono}
                  </td>
                </tr>
                ${mensaje ? `
                <tr>
                  <td style="padding: 10px 0; vertical-align: top;">
                    <span style="font-size: 12px; color: #43473e; opacity: 0.5;">Mensaje</span>
                  </td>
                  <td style="padding: 10px 0; color: #43473e; font-size: 14px; line-height: 1.6;">
                    ${safeMensaje}
                  </td>
                </tr>` : ""}
              </table>

              <p style="font-size: 15px; color: #43473e; line-height: 1.7; margin: 0 0 8px;">
                Estamos deseando conocer tu proyecto. ¡Hasta pronto!
              </p>
              <p style="font-size: 15px; color: #9f804f; font-weight: 600; margin: 0;">
                El equipo de Rannia
              </p>
            </div>

            <!-- Pie -->
            <div style="background: #f0ede0; padding: 20px 32px; text-align: center; border-top: 1px solid #d4c9b0;">
              <p style="font-size: 12px; color: #43473e; opacity: 0.45; margin: 0; line-height: 1.6;">
                Has recibido este correo porque alguien completó el formulario de contacto de
                <a href="https://ranniamodular.es" style="color: #7286a6; text-decoration: none;">ranniamodular.es</a>
                con esta dirección de email.<br>
                Si no has sido tú, ignora este mensaje. No es necesario que hagas nada.
              </p>
            </div>

          </div>
        </body>
        </html>
      `,
    }); } catch (emailError) {
      console.error("[Resend] Error enviando emails:", emailError);
    }
  }

  return Response.json({ success: true }, { status: 200 });
}
