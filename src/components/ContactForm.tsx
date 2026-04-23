"use client";

import { useState } from "react";
import Link from "next/link";

type FormData = {
  nombre: string;
  email: string;
  telefono: string;
  mensaje: string;
  privacidad: boolean;
  website: string; // honeypot
};

type FormErrors = Partial<Record<keyof FormData, string>>;

type SubmitState = "idle" | "loading" | "success" | "error";

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.nombre.trim()) errors.nombre = "El nombre es obligatorio.";
  if (!data.email.trim()) {
    errors.email = "El email es obligatorio.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Introduce un email válido.";
  }
  if (!data.telefono.trim()) {
    errors.telefono = "El teléfono es obligatorio.";
  } else if (!/^[+\d\s\-()]{7,15}$/.test(data.telefono.trim())) {
    errors.telefono = "Introduce un teléfono válido.";
  }
  if (!data.privacidad)
    errors.privacidad =
      "Debes aceptar la política de privacidad para continuar.";
  return errors;
}

export default function ContactForm() {
  const [form, setForm] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
    privacidad: false,
    website: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [serverError, setServerError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setForm((prev) => ({ ...prev, [name]: val }));
    // Clear field error on change
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = e.target;
    const fieldErrors = validate(form);
    if (fieldErrors[name as keyof FormData]) {
      setErrors((prev) => ({
        ...prev,
        [name]: fieldErrors[name as keyof FormData],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Focus first error field
      const firstErrorKey = Object.keys(validationErrors)[0];
      const el = document.querySelector<HTMLElement>(
        `[name="${firstErrorKey}"]`,
      );
      el?.focus();
      return;
    }

    setSubmitState("loading");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al enviar el formulario.");
      }

      setSubmitState("success");
      setForm({
        nombre: "",
        email: "",
        telefono: "",
        mensaje: "",
        privacidad: false,
        website: "",
      });
    } catch (err) {
      setSubmitState("error");
      setServerError(
        err instanceof Error
          ? err.message
          : "Ha ocurrido un error. Por favor, inténtalo de nuevo o llámanos directamente.",
      );
    }
  };

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3 rounded-xl border text-[#43473e] bg-white text-base transition-colors duration-200 outline-none focus:ring-2 focus:ring-[#9f804f]/30 ${
      errors[field]
        ? "border-red-400 focus:border-red-400"
        : "border-[#d4c9b0] focus:border-[#9f804f]"
    }`;

  if (submitState === "success") {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12 px-6">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-8 h-8 text-green-600"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3
          className="text-2xl font-bold text-[#43473e] mb-3"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          ¡Mensaje enviado con éxito!
        </h3>
        <p className="text-[#43473e]/70 max-w-md">
          Gracias por contactar con Rannia Proyectos Modulares. Nos pondremos en
          contacto contigo en un plazo máximo de 24 horas laborables.
        </p>
        <button
          onClick={() => setSubmitState("idle")}
          className="mt-8 text-sm font-medium text-[#9f804f] hover:text-[#8a6e42] transition-colors cursor-pointer underline-offset-2 hover:underline"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Formulario de contacto"
      className="space-y-5"
    >
      {/* Nombre */}
      <div>
        <label
          htmlFor="nombre"
          className="block text-sm font-medium text-[#43473e] mb-1.5"
        >
          Nombre y apellidos{" "}
          <span className="text-red-500" aria-label="obligatorio">
            *
          </span>
        </label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          value={form.nombre}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="María García López"
          autoComplete="name"
          className={inputClass("nombre")}
          aria-describedby={errors.nombre ? "error-nombre" : undefined}
          aria-invalid={!!errors.nombre}
        />
        {errors.nombre && (
          <p
            id="error-nombre"
            role="alert"
            className="mt-1.5 text-sm text-red-600 flex items-center gap-1"
          >
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-3.5 h-3.5 shrink-0"
              aria-hidden="true"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
            </svg>
            {errors.nombre}
          </p>
        )}
      </div>

      {/* Email + Teléfono en fila */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#43473e] mb-1.5"
          >
            Email{" "}
            <span className="text-red-500" aria-label="obligatorio">
              *
            </span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="maria@ejemplo.es"
            autoComplete="email"
            className={inputClass("email")}
            aria-describedby={errors.email ? "error-email" : undefined}
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p
              id="error-email"
              role="alert"
              className="mt-1.5 text-sm text-red-600 flex items-center gap-1"
            >
              <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-3.5 h-3.5 shrink-0"
                aria-hidden="true"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
              </svg>
              {errors.email}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="telefono"
            className="block text-sm font-medium text-[#43473e] mb-1.5"
          >
            Teléfono{" "}
            <span className="text-red-500" aria-label="obligatorio">
              *
            </span>
          </label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            value={form.telefono}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="+34 600 000 000"
            autoComplete="tel"
            className={inputClass("telefono")}
            aria-describedby={errors.telefono ? "error-telefono" : undefined}
            aria-invalid={!!errors.telefono}
          />
          {errors.telefono && (
            <p
              id="error-telefono"
              role="alert"
              className="mt-1.5 text-sm text-red-600 flex items-center gap-1"
            >
              <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-3.5 h-3.5 shrink-0"
                aria-hidden="true"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
              </svg>
              {errors.telefono}
            </p>
          )}
        </div>
      </div>

      {/* Mensaje */}
      <div>
        <label
          htmlFor="mensaje"
          className="block text-sm font-medium text-[#43473e] mb-1.5"
        >
          ¿En qué podemos ayudarte?{" "}
          <span className="text-[#43473e]/40 text-xs font-normal">
            (opcional)
          </span>
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={5}
          value={form.mensaje}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Cuéntanos tu proyecto, el terreno que tienes, que tipo de casa te interesa o cualquier duda que tengas..."
          className={`${inputClass("mensaje")} resize-none`}
          aria-describedby={errors.mensaje ? "error-mensaje" : undefined}
        />
        {errors.mensaje && (
          <p
            id="error-mensaje"
            role="alert"
            className="mt-1.5 text-sm text-red-600 flex items-center gap-1"
          >
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-3.5 h-3.5 shrink-0"
              aria-hidden="true"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
            </svg>
            {errors.mensaje}
          </p>
        )}
      </div>

      {/* Privacy checkbox */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="relative mt-0.5 shrink-0">
            <input
              id="privacidad"
              name="privacidad"
              type="checkbox"
              checked={form.privacidad}
              onChange={handleChange}
              className="sr-only"
              aria-describedby={
                errors.privacidad ? "error-privacidad" : undefined
              }
              aria-invalid={!!errors.privacidad}
            />
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                form.privacidad
                  ? "bg-[#9f804f] border-[#9f804f]"
                  : errors.privacidad
                    ? "border-red-400 bg-white"
                    : "border-[#d4c9b0] bg-white group-hover:border-[#9f804f]/60"
              }`}
            >
              {form.privacidad && (
                <svg
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="white"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-3 h-3"
                  aria-hidden="true"
                >
                  <path d="M2 6l3 3 5-5" />
                </svg>
              )}
            </div>
          </div>
          <span className="text-sm text-[#43473e]/70 leading-snug">
            He leído y acepto la{" "}
            <Link
              href="/politica-de-privacidad"
              className="text-[#9f804f] hover:text-[#8a6e42] underline underline-offset-2 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              política de privacidad
            </Link>{" "}
            y el tratamiento de mis datos con la finalidad de atender mi
            consulta.{" "}
            <span className="text-red-500" aria-label="obligatorio">
              *
            </span>
          </span>
        </label>
        {errors.privacidad && (
          <p
            id="error-privacidad"
            role="alert"
            className="mt-1.5 text-sm text-red-600 flex items-center gap-1 ml-8"
          >
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-3.5 h-3.5 shrink-0"
              aria-hidden="true"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
            </svg>
            {errors.privacidad}
          </p>
        )}
      </div>

      {/* Server error */}
      {submitState === "error" && serverError && (
        <div
          role="alert"
          className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 shrink-0 mt-0.5"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
              clipRule="evenodd"
            />
          </svg>
          <div>
            <p className="font-medium">Error al enviar el formulario</p>
            <p>{serverError}</p>
          </div>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitState === "loading"}
        className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-white bg-[#9f804f] hover:bg-[#8a6e42] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer text-base"
      >
        {submitState === "loading" ? (
          <>
            <svg
              className="animate-spin w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Enviando...
          </>
        ) : (
          "Enviar solicitud de información"
        )}
      </button>

      <p className="text-xs text-[#43473e]/50 text-center">
        Responderemos en menos de 24 horas laborables. Sin compromiso.
      </p>

      {/* Honeypot — oculto para usuarios reales, los bots lo rellenarán */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", opacity: 0 }}
      />
    </form>
  );
}
