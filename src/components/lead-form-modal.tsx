"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Check, X } from "lucide-react";
import { useLeadForm } from "@/lib/lead-form-context";

const PLAN_OPTIONS = [
  "Not sure yet",
  "The Site",
  "The Lead Machine",
  "The Full System",
];

type FormData = {
  name: string;
  email: string;
  phone: string;
  business: string;
  plan: string;
  message: string;
};

function initialFormData(initialPlan?: string): FormData {
  return {
    name: "",
    email: "",
    phone: "",
    business: "",
    plan: initialPlan && PLAN_OPTIONS.includes(initialPlan) ? initialPlan : "Not sure yet",
    message: "",
  };
}

export function LeadFormModal() {
  const { state, closeLeadForm } = useLeadForm();

  return (
    <Dialog.Root open={state.open} onOpenChange={(o) => !o && closeLeadForm()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-[101] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 focus:outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-90 data-[state=closed]:fade-out data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95"
          aria-describedby={undefined}
        >
          <ModalShell>
            <LeadFormBody initialPlan={state.plan} onClose={closeLeadForm} />
          </ModalShell>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function ModalShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.09) 0%, rgba(255,255,255,0.04) 100%)",
        backdropFilter: "blur(28px) saturate(160%) brightness(1.05)",
        WebkitBackdropFilter: "blur(28px) saturate(160%) brightness(1.05)",
        border: "1px solid rgba(255,255,255,0.14)",
        boxShadow:
          "inset 0 1px 0 0 rgba(255,255,255,0.18), inset 0 0 0 1px rgba(255,255,255,0.06), 0 24px 60px -20px rgba(0,0,0,0.7)",
      }}
    >
      {/* Soft static top glow — monochrome, seam-free */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-3xl">
        <div
          className="absolute -top-1/4 left-1/2 -translate-x-1/2 w-[140%] aspect-square rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.20) 0%, transparent 60%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* Close button */}
      <Dialog.Close asChild>
        <button
          type="button"
          aria-label="Close"
          className="absolute right-4 top-4 z-10 w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </Dialog.Close>

      <div className="relative p-8 lg:p-10">{children}</div>
    </div>
  );
}

function LeadFormBody({
  initialPlan,
  onClose,
}: {
  initialPlan?: string;
  onClose: () => void;
}) {
  const [form, setForm] = useState<FormData>(() => initialFormData(initialPlan));
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Send failed");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Send failed");
    }
  };

  if (status === "success") {
    return <SuccessView onClose={onClose} />;
  }

  return (
    <>
      <Dialog.Title asChild>
        <h2 className="font-display text-4xl lg:text-5xl text-white leading-[0.95] mb-2">
          Let&apos;s talk.
        </h2>
      </Dialog.Title>
      <p className="text-sm text-white/45 mb-7 leading-relaxed">
        Tell us about your business and we&apos;ll be in touch within one business day.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Field
          label="Name"
          type="text"
          value={form.name}
          onChange={handleChange("name")}
          required
          autoFocus
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            required
          />
          <Field
            label="Phone"
            type="tel"
            value={form.phone}
            onChange={handleChange("phone")}
            required
          />
        </div>
        <Field
          label="Business name"
          type="text"
          value={form.business}
          onChange={handleChange("business")}
          required
        />

        <div>
          <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1.5">
            Plan interest
          </label>
          <select
            value={form.plan}
            onChange={handleChange("plan")}
            className="w-full px-4 py-3 rounded-xl font-mono text-sm text-white bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none transition-colors appearance-none cursor-pointer"
          >
            {PLAN_OPTIONS.map((p) => (
              <option key={p} value={p} className="bg-neutral-900">
                {p}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1.5">
            Message <span className="text-white/25 normal-case">(optional)</span>
          </label>
          <textarea
            value={form.message}
            onChange={handleChange("message")}
            rows={3}
            className="w-full px-4 py-3 rounded-xl font-mono text-sm text-white bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none transition-colors resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full mt-4 py-3.5 rounded-xl text-sm font-mono tracking-wide bg-white text-black hover:bg-white/90 active:scale-[0.98] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? "Sending…" : "Send message"}
        </button>

        {status === "error" && (
          <p className="text-xs text-red-300/90 font-mono mt-2 text-center">
            {errorMsg ?? "Something went wrong. Please try again."}
          </p>
        )}
      </form>
    </>
  );
}

function Field({
  label,
  ...inputProps
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1.5">
        {label}
      </label>
      <input
        {...inputProps}
        className="w-full px-4 py-3 rounded-xl font-mono text-sm text-white bg-white/5 border border-white/10 focus:border-white/30 focus:outline-none transition-colors placeholder:text-white/25"
      />
    </div>
  );
}

function SuccessView({ onClose }: { onClose: () => void }) {
  return (
    <div className="text-center py-6">
      <div
        className="w-14 h-14 rounded-full mx-auto mb-5 flex items-center justify-center"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.08) 100%)",
          boxShadow:
            "inset 0 1px 0 0 rgba(255,255,255,0.35), 0 8px 24px -8px rgba(0,0,0,0.5)",
        }}
      >
        <Check className="w-6 h-6 text-white" />
      </div>
      <Dialog.Title asChild>
        <h2 className="font-display text-3xl lg:text-4xl text-white leading-tight mb-3">
          Message sent.
        </h2>
      </Dialog.Title>
      <p className="text-sm text-white/50 max-w-xs mx-auto mb-7 leading-relaxed">
        We&apos;ll be in touch within one business day. Check your inbox for confirmation.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="px-6 py-3 rounded-xl text-sm font-mono tracking-wide text-white/80 hover:text-white border border-white/15 hover:bg-white/5 transition-all"
      >
        Close
      </button>
    </div>
  );
}
