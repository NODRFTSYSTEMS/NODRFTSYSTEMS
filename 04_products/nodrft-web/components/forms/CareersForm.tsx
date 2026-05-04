"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const AVAILABILITY_OPTIONS = {
  en: [
    { value: "", label: "Select availability" },
    { value: "freelance", label: "Freelance / independent contractor" },
    { value: "part-time", label: "Part-time engagement" },
    { value: "open", label: "Open to discussion" },
  ],
  es: [
    { value: "", label: "Seleccione disponibilidad" },
    { value: "freelance", label: "Freelance / contratista independiente" },
    { value: "part-time", label: "Compromiso de tiempo parcial" },
    { value: "open", label: "Abierto a discusión" },
  ],
};

const COPY = {
  en: {
    name: "Your name",
    namePh: "First and last name",
    email: "Email",
    emailPh: "your@email.com",
    discipline: "Discipline / Specialty",
    disciplinePh: "e.g. Frontend Development, UX Design, Copywriting, QA",
    availability: "How you work",
    portfolio: "Portfolio or LinkedIn URL (optional)",
    portfolioPh: "https://",
    brief: "Tell us about your work and why NoDrftSystems",
    briefPh: "What you do, what you're best at, and why you're interested in working with a studio that operates under a Zero Drift standard. Be specific — generic applications aren't evaluated.",
    submit: "Submit application",
    submitting: "Submitting…",
    success: "Your application has been received. We review every submission and reach out when there's a fit with active needs.",
    error: "Submission failed. Please try again or email us at sales@nodrftsystems.com",
    required: "Required field",
  },
  es: {
    name: "Su nombre",
    namePh: "Nombre y apellido",
    email: "Correo electrónico",
    emailPh: "su@correo.com",
    discipline: "Disciplina / Especialidad",
    disciplinePh: "ej. Desarrollo Frontend, Diseño UX, Redacción, QA",
    availability: "Cómo trabaja",
    portfolio: "Portafolio o URL de LinkedIn (opcional)",
    portfolioPh: "https://",
    brief: "Cuéntenos sobre su trabajo y por qué NoDrftSystems",
    briefPh: "Qué hace, en qué es mejor y por qué le interesa trabajar con un estudio que opera bajo un estándar de Cero Deriva. Sea específico — las aplicaciones genéricas no se evalúan.",
    submit: "Enviar aplicación",
    submitting: "Enviando…",
    success: "Su aplicación ha sido recibida. Revisamos cada envío y nos comunicamos cuando hay un ajuste con las necesidades activas.",
    error: "Error al enviar. Por favor intente nuevamente o escríbanos a sales@nodrftsystems.com",
    required: "Campo requerido",
  },
};

interface Props {
  locale: "en" | "es";
}

export function CareersForm({ locale }: Props) {
  const c = COPY[locale];
  const availabilities = AVAILABILITY_OPTIONS[locale];

  const [status, setStatus] = useState<Status>("idle");
  const [fields, setFields] = useState({
    name: "",
    email: "",
    discipline: "",
    availability: "",
    portfolio: "",
    brief: "",
  });

  function update(key: keyof typeof fields) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    try {
      const res = await fetch("/api/submit/careers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, locale }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="nd-form-status nd-form-status--success" role="status">
        <p className="nd-p">{c.success}</p>
      </div>
    );
  }

  return (
    <form className="nd-form" onSubmit={handleSubmit} noValidate>
      <div className="nd-field">
        <label className="nd-field-label" htmlFor="car-name">
          {c.name} <span className="nd-field-req" aria-label={c.required}>*</span>
        </label>
        <input
          id="car-name"
          className="nd-input"
          type="text"
          placeholder={c.namePh}
          value={fields.name}
          onChange={update("name")}
          required
          autoComplete="name"
        />
      </div>

      <div className="nd-field">
        <label className="nd-field-label" htmlFor="car-email">
          {c.email} <span className="nd-field-req" aria-label={c.required}>*</span>
        </label>
        <input
          id="car-email"
          className="nd-input"
          type="email"
          placeholder={c.emailPh}
          value={fields.email}
          onChange={update("email")}
          required
          autoComplete="email"
        />
      </div>

      <div className="nd-field">
        <label className="nd-field-label" htmlFor="car-discipline">
          {c.discipline} <span className="nd-field-req" aria-label={c.required}>*</span>
        </label>
        <input
          id="car-discipline"
          className="nd-input"
          type="text"
          placeholder={c.disciplinePh}
          value={fields.discipline}
          onChange={update("discipline")}
          required
          autoComplete="off"
        />
      </div>

      <div className="nd-field">
        <label className="nd-field-label" htmlFor="car-availability">
          {c.availability} <span className="nd-field-req" aria-label={c.required}>*</span>
        </label>
        <select
          id="car-availability"
          className="nd-select"
          value={fields.availability}
          onChange={update("availability")}
          required
        >
          {availabilities.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.value === ""}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="nd-field">
        <label className="nd-field-label" htmlFor="car-portfolio">
          {c.portfolio}
        </label>
        <input
          id="car-portfolio"
          className="nd-input"
          type="url"
          placeholder={c.portfolioPh}
          value={fields.portfolio}
          onChange={update("portfolio")}
          autoComplete="url"
        />
      </div>

      <div className="nd-field">
        <label className="nd-field-label" htmlFor="car-brief">
          {c.brief} <span className="nd-field-req" aria-label={c.required}>*</span>
        </label>
        <textarea
          id="car-brief"
          className="nd-textarea"
          placeholder={c.briefPh}
          value={fields.brief}
          onChange={update("brief")}
          required
          rows={7}
        />
      </div>

      {status === "error" && (
        <div className="nd-form-status nd-form-status--error" role="alert">
          <p className="nd-p-sm">{c.error}</p>
        </div>
      )}

      <button
        type="submit"
        className="btn"
        disabled={status === "submitting"}
        aria-busy={status === "submitting"}
        style={{ marginTop: "var(--space-5)", width: "100%" }}
      >
        {status === "submitting" ? c.submitting : c.submit}
      </button>
    </form>
  );
}
