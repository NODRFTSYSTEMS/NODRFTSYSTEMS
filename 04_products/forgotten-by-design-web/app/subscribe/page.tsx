import type { Metadata } from "next";
import { SubscribeModule } from "@/components/shared/SubscribeModule";

export const metadata: Metadata = {
  title: "Subscribe",
  description: "Get release alerts, documentation packages, and research notes — when they're ready, not on a schedule.",
};

export default function SubscribePage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-24">
      <header className="mb-12 text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-accent mb-4">Stay in the archive</p>
        <h1 className="font-serif text-4xl font-bold text-paper mb-4">
          Release alerts &amp; source packs
        </h1>
        <p className="text-mist leading-relaxed">
          New investigations drop irregularly — we don&apos;t publish on a schedule, we publish
          when the evidence warrants it. Subscribe to be notified when new investigations,
          documentation packages, and research notes go live.
        </p>
      </header>

      <SubscribeModule variant="full" />

      <div className="mt-12 border-t border-border pt-8">
        <p className="font-mono text-xs text-mist text-center">
          No schedule promises. No spam. Unsubscribe any time.
        </p>
      </div>
    </div>
  );
}
