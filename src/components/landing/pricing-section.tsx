"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { useLeadForm } from "@/lib/lead-form-context";
import { LiquidMetalBorder } from "./liquid-metal-border";

const plans = [
  {
    name: "The Site",
    tagline: "Look legit. Stop losing customers to competitors with nicer sites.",
    monthly: 100,
    setup: 850,
    features: [
      "Custom website (5–7 pages)",
      "Mobile-first design",
      "On-page SEO optimization",
      "Google Business Profile setup",
      "Contact form with email alerts",
      "SSL + fast Vercel hosting",
      "LocalBusiness schema markup",
    ],
    highlight: false,
  },
  {
    name: "The Lead Machine",
    tagline: "Capture leads even while you're on a job — automatically.",
    monthly: 200,
    setup: 1200,
    features: [
      "Everything in The Site",
      "Instant SMS lead alerts",
      "Auto-text reply to new leads",
      "Review request automation",
      "More reviews = higher rankings",
    ],
    highlight: true,
  },
  {
    name: "The Full System",
    tagline: "We run your entire digital presence. You focus on the work.",
    monthly: 300,
    setup: 1500,
    features: [
      "Everything in Lead Machine",
      "AI SMS booking assistant",
      "Monthly performance reports",
      "Priority same-week updates",
      "Seasonal content updates",
    ],
    highlight: false,
  },
];

function MostPopularPennant() {
  return (
    <div
      className="absolute -top-2 left-6 z-30 select-none pointer-events-none"
      style={{ width: 34, height: 110 }}
    >
      {/* Horizontal rod */}
      <div
        className="absolute top-0 left-[-6px] right-[-6px] h-[2px] rounded-full"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.45) 50%, rgba(255,255,255,0.15) 100%)",
          boxShadow: "0 1px 2px rgba(0,0,0,0.4)",
        }}
      />
      {/* Rod end caps */}
      <span
        className="absolute -top-[2px] -left-[7px] w-[6px] h-[6px] rounded-full"
        style={{
          background: "rgba(255,255,255,0.5)",
          boxShadow: "0 1px 2px rgba(0,0,0,0.5)",
        }}
      />
      <span
        className="absolute -top-[2px] -right-[7px] w-[6px] h-[6px] rounded-full"
        style={{
          background: "rgba(255,255,255,0.5)",
          boxShadow: "0 1px 2px rgba(0,0,0,0.5)",
        }}
      />

      {/* Pennant body */}
      <div
        className="absolute top-[3px] left-0 right-0 bottom-0 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.06) 100%)",
          backdropFilter: "blur(14px) saturate(160%)",
          WebkitBackdropFilter: "blur(14px) saturate(160%)",
          clipPath:
            "polygon(0 0, 100% 0, 100% 86%, 50% 100%, 0 86%)",
          boxShadow:
            "inset 0 1px 0 0 rgba(255,255,255,0.28), 0 10px 20px -8px rgba(0,0,0,0.65)",
        }}
      >
        {/* Vertical "Most Popular" label */}
        <span
          className="absolute inset-0 flex items-center justify-center font-mono uppercase text-white/85"
          style={{
            writingMode: "vertical-lr",
            fontSize: "9px",
            letterSpacing: "0.28em",
            paddingBottom: "14px",
          }}
        >
          ✦ Most Popular
        </span>
      </div>

      {/* Tassel dots at chevron tips */}
      <span
        className="absolute w-[3px] h-[3px] rounded-full"
        style={{
          background: "rgba(255,255,255,0.5)",
          left: "-1px",
          top: "calc(3px + 86% - 1.5px)",
        }}
      />
      <span
        className="absolute w-[3px] h-[3px] rounded-full"
        style={{
          background: "rgba(255,255,255,0.5)",
          right: "-1px",
          top: "calc(3px + 86% - 1.5px)",
        }}
      />
    </div>
  );
}

export function PricingSection() {
  const [showMonthly, setShowMonthly] = useState(false);
  const { openLeadForm } = useLeadForm();

  return (
    <section className="relative bg-black overflow-hidden py-28 lg:py-36">
      {/* Giant background "Pricing" text */}
      <div
        className="absolute top-0 inset-x-0 flex justify-center pointer-events-none select-none"
        aria-hidden
      >
        <span
          className="font-display text-white leading-none whitespace-nowrap"
          style={{
            fontSize: "clamp(96px, 16vw, 240px)",
            opacity: 0.045,
            letterSpacing: "-0.02em",
          }}
        >
          Pricing
        </span>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* Cards */}
        <div className="grid gap-4 lg:gap-6 items-stretch lg:[grid-template-columns:1fr_1.35fr_1fr]">
          {plans.map((plan) =>
            plan.highlight ? (
              <HeroCard
                key={plan.name}
                plan={plan}
                showMonthly={showMonthly}
                onCta={() => openLeadForm(plan.name)}
              />
            ) : (
              <SideCard
                key={plan.name}
                plan={plan}
                showMonthly={showMonthly}
                onCta={() => openLeadForm(plan.name)}
              />
            ),
          )}
        </div>

        {/* Billing toggle */}
        <div className="mt-10 flex items-center gap-3">
          <button
            onClick={() => setShowMonthly(!showMonthly)}
            className="relative w-11 h-[22px] rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
            style={{
              background: showMonthly
                ? "rgba(255,255,255,0.28)"
                : "rgba(255,255,255,0.12)",
            }}
            aria-label="Toggle monthly pricing"
          >
            <div
              className="absolute top-[3px] w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300"
              style={{
                transform: showMonthly ? "translateX(21px)" : "translateX(3px)",
              }}
            />
          </button>
          <span className="text-sm text-white/40 font-mono">Monthly retainer</span>
        </div>
      </div>
    </section>
  );
}

type Plan = (typeof plans)[number];

function SideCard({
  plan,
  showMonthly,
  onCta,
}: {
  plan: Plan;
  showMonthly: boolean;
  onCta: () => void;
}) {
  return (
    <div className="relative">
      <div
        className="relative h-full overflow-hidden rounded-2xl"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
          backdropFilter: "blur(28px) saturate(160%) brightness(1.05)",
          WebkitBackdropFilter: "blur(28px) saturate(160%) brightness(1.05)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow:
            "inset 0 1px 0 0 rgba(255,255,255,0.10), inset 0 0 0 1px rgba(255,255,255,0.03), 0 12px 40px -16px rgba(0,0,0,0.4)",
        }}
      >
        <CardBody plan={plan} showMonthly={showMonthly} onCta={onCta} highlight={false} />
      </div>
    </div>
  );
}

function HeroCard({
  plan,
  showMonthly,
  onCta,
}: {
  plan: Plan;
  showMonthly: boolean;
  onCta: () => void;
}) {
  return (
    <div className="relative">
      {/* Shader-bordered wrapper: shader layer fills the outer rounded rect;
          inner card sits on top with slightly smaller radius, leaving a
          ~2px metallic ring visible around the edges. */}
      <div className="relative rounded-3xl p-[2px] overflow-hidden">
        {/* Liquid metal shader fills the outer area */}
        <div className="absolute inset-0 rounded-3xl overflow-hidden">
          <LiquidMetalBorder className="absolute inset-0" />
        </div>

        {/* Inner card */}
        <div
          className="relative h-full overflow-hidden"
          style={{
            borderRadius: "calc(1.5rem - 2px)",
            background:
              "linear-gradient(180deg, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.92) 100%)",
            backdropFilter: "blur(28px) saturate(160%) brightness(1.05)",
            WebkitBackdropFilter: "blur(28px) saturate(160%) brightness(1.05)",
            boxShadow:
              "inset 0 1px 0 0 rgba(255,255,255,0.18), 0 24px 60px -20px rgba(0,0,0,0.7)",
          }}
        >
          <CardBody plan={plan} showMonthly={showMonthly} onCta={onCta} highlight />
        </div>
      </div>

      {/* Hanging pennant — sits outside the inner card so its top edge
          extends above the card border line. */}
      <MostPopularPennant />
    </div>
  );
}

function CardBody({
  plan,
  showMonthly,
  onCta,
  highlight,
}: {
  plan: Plan;
  showMonthly: boolean;
  onCta: () => void;
  highlight: boolean;
}) {
  return (
    <div
      className={`relative flex h-full flex-col ${
        highlight ? "p-7 lg:p-10 lg:pt-14" : "p-7 lg:p-8"
      }`}
    >
      {/* Name */}
      <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest">
        {plan.name}
      </span>

      {/* Tagline */}
      <p className="text-sm text-white/35 leading-relaxed mt-2 mb-7">
        {plan.tagline}
      </p>

      {/* Price */}
      <div className="mb-8">
        {showMonthly ? (
          <>
            <div className="flex items-baseline gap-1">
              <span
                className={`font-display text-white leading-none ${
                  highlight ? "text-6xl lg:text-7xl" : "text-5xl lg:text-6xl"
                }`}
              >
                ${plan.monthly}
              </span>
              <span className="text-white/35 text-sm font-mono ml-1">/mo</span>
            </div>
            <p className="text-xs text-white/25 font-mono mt-2 tracking-wide">
              + ${plan.setup.toLocaleString()} one-time setup
            </p>
          </>
        ) : (
          <>
            <div className="flex items-baseline gap-1">
              <span
                className={`font-display text-white leading-none ${
                  highlight ? "text-6xl lg:text-7xl" : "text-5xl lg:text-6xl"
                }`}
              >
                ${plan.setup.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-white/25 font-mono mt-2 tracking-wide">
              then ${plan.monthly}/mo
            </p>
          </>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <div
              className="mt-0.5 shrink-0 w-[18px] h-[18px] rounded-full flex items-center justify-center"
              style={{
                background: highlight
                  ? "rgba(255,255,255,0.18)"
                  : "rgba(255,255,255,0.09)",
              }}
            >
              <Check className="w-2.5 h-2.5 text-white" />
            </div>
            <span className="text-sm text-white/50 leading-snug">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={onCta}
        className={`w-full py-3.5 rounded-xl text-sm font-mono tracking-wide transition-all duration-300 ${
          highlight
            ? "bg-white text-black hover:bg-white/90 active:scale-[0.98]"
            : "text-white/70 hover:text-white hover:bg-white/5 active:scale-[0.98]"
        }`}
        style={
          !highlight
            ? { border: "1px solid rgba(255,255,255,0.11)" }
            : undefined
        }
      >
        Contact Us
      </button>
    </div>
  );
}
