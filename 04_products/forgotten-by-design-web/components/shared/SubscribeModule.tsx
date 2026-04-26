"use client";

import { useState } from "react";

interface SubscribeModuleProps {
  variant?: "inline" | "full";
}

export function SubscribeModule({ variant = "inline" }: SubscribeModuleProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Something went wrong");
      }

      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (variant === "full") {
    return (
      <section className="bg-surface border border-border p-10 md:p-14 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">
          Stay in the archive
        </p>
        <h2 className="font-serif text-2xl md:text-3xl font-bold text-paper mb-4">
          Get release alerts &amp; source packs
        </h2>
        <p className="text-mist leading-relaxed mb-8 max-w-lg mx-auto">
          New investigations, documentation packages, and research notes — when they&apos;re
          ready, not on a schedule.
        </p>
        <SubscribeForm
          email={email}
          setEmail={setEmail}
          status={status}
          errorMsg={errorMsg}
          onSubmit={handleSubmit}
        />
      </section>
    );
  }

  return (
    <div className="bg-surface border border-border p-6">
      <p className="font-mono text-xs uppercase tracking-widest text-accent mb-2">
        Stay in the archive
      </p>
      <p className="text-paper font-serif text-lg font-bold mb-1">
        Release alerts &amp; source packs
      </p>
      <p className="text-sm text-mist mb-4">
        No schedule. Just new investigations when they drop.
      </p>
      <SubscribeForm
        email={email}
        setEmail={setEmail}
        status={status}
        errorMsg={errorMsg}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

interface SubscribeFormProps {
  email: string;
  setEmail: (v: string) => void;
  status: "idle" | "loading" | "success" | "error";
  errorMsg: string;
  onSubmit: (e: React.FormEvent) => void;
}

function SubscribeForm({ email, setEmail, status, errorMsg, onSubmit }: SubscribeFormProps) {
  if (status === "success") {
    return (
      <p className="font-mono text-sm text-green-400">
        ✓ You&apos;re in. Watch for release alerts.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        disabled={status === "loading"}
        className="flex-1 bg-ink border border-border text-paper font-mono text-sm px-4 py-2.5 placeholder:text-mist/50 focus:outline-none focus:border-accent/60 disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-accent text-paper font-mono text-xs uppercase tracking-widest px-6 py-2.5 hover:bg-accent/80 transition-colors disabled:opacity-60"
      >
        {status === "loading" ? "..." : "Subscribe"}
      </button>
      {status === "error" && (
        <p className="w-full font-mono text-xs text-red-400 mt-1">{errorMsg}</p>
      )}
    </form>
  );
}
