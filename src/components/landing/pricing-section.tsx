"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import NumberFlow from "@number-flow/react";
import {
  BarChart,
  Bell,
  Bot,
  CheckCheck,
  MessageSquare,
  Monitor,
  Search,
  Smartphone,
  Star,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useLeadForm } from "@/lib/lead-form-context";

const plans = [
  {
    name: "Starter",
    description:
      "Look legit. Stop losing customers to competitors with nicer sites.",
    price: 100,
    yearlyPrice: 1000,
    buttonText: "Contact Us",
    buttonVariant: "outline" as const,
    features: [
      { text: "Custom website (5–7 pages)", icon: <Monitor size={20} /> },
      { text: "Mobile-first design", icon: <Smartphone size={20} /> },
      { text: "On-page SEO optimization", icon: <Search size={20} /> },
    ],
    includes: [
      "Starter includes:",
      "Google Business Profile setup",
      "Contact form with email alerts",
      "SSL + fast Vercel hosting",
      "LocalBusiness schema markup",
    ],
  },
  {
    name: "Business",
    description:
      "Capture leads even while you're on a job — automatically.",
    price: 200,
    yearlyPrice: 2000,
    buttonText: "Contact Us",
    buttonVariant: "default" as const,
    popular: true,
    features: [
      { text: "Instant SMS lead alerts", icon: <Bell size={20} /> },
      { text: "Auto-text reply to new leads", icon: <MessageSquare size={20} /> },
      { text: "Review request automation", icon: <Star size={20} /> },
    ],
    includes: [
      "Everything in Starter, plus:",
      "More reviews = higher rankings",
    ],
  },
  {
    name: "Enterprise",
    description:
      "We run your entire digital presence. You focus on the work.",
    price: 300,
    yearlyPrice: 3000,
    buttonText: "Contact Us",
    buttonVariant: "outline" as const,
    features: [
      { text: "AI SMS booking assistant", icon: <Bot size={20} /> },
      { text: "Monthly performance reports", icon: <BarChart size={20} /> },
      { text: "Priority same-week updates", icon: <Zap size={20} /> },
    ],
    includes: [
      "Everything in Business, plus:",
      "Seasonal content updates",
    ],
  },
];

const PricingSwitch = ({ onSwitch }: { onSwitch: (value: string) => void }) => {
  const [selected, setSelected] = useState("0");

  const handleSwitch = (value: string) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div className="flex justify-center">
      <div className="relative z-50 mx-auto flex w-fit rounded-full bg-neutral-50 border border-gray-200 p-1">
        <button
          onClick={() => handleSwitch("0")}
          className={`relative z-10 w-fit sm:h-12 h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors ${
            selected === "0"
              ? "text-white"
              : "text-muted-foreground hover:text-black"
          }`}
        >
          {selected === "0" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 sm:h-12 h-10 w-full rounded-full border-4 shadow-sm shadow-blue-600 border-blue-600 bg-gradient-to-t from-blue-500 via-blue-400 to-blue-600"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">Monthly</span>
        </button>

        <button
          onClick={() => handleSwitch("1")}
          className={`relative z-10 w-fit sm:h-12 h-8 flex-shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors ${
            selected === "1"
              ? "text-white"
              : "text-muted-foreground hover:text-black"
          }`}
        >
          {selected === "1" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 sm:h-12 h-10 w-full rounded-full border-4 shadow-sm shadow-blue-600 border-blue-600 bg-gradient-to-t from-blue-500 via-blue-400 to-blue-600"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-2">
            Yearly
            <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-black">
              Save 20%
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const { openLeadForm } = useLeadForm();

  const togglePricingPeriod = (value: string) =>
    setIsYearly(Number.parseInt(value) === 1);

  return (
    <div className="px-4 pt-20 min-h-screen mx-auto relative bg-neutral-100">
      <div
        className="absolute top-0 left-[10%] right-[10%] w-[80%] h-full z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at center, #206ce8 0%, transparent 70%)",
          opacity: 0.6,
          mixBlendMode: "multiply",
        }}
      />
      <div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[55%] h-[18%] z-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 100% at 50% 0%, #206ce8 0%, transparent 70%)",
          opacity: 0.35,
          mixBlendMode: "multiply",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
        }}
      />

      <div className="text-center mb-6 max-w-3xl mx-auto">
        <h2 className="md:text-6xl sm:text-4xl text-3xl font-medium text-gray-900 mb-4">
          Plans that works best for your{" "}
          <span className="border border-dashed border-blue-500 px-2 py-1 rounded-xl bg-blue-100 capitalize inline-block">
            business
          </span>
        </h2>

        <p className="sm:text-base text-sm text-gray-600 sm:w-[70%] w-[80%] mx-auto">
          Trusted by millions, We help teams all around the world, Explore which
          option is right for you.
        </p>
      </div>

      <PricingSwitch onSwitch={togglePricingPeriod} />

      <div className="grid md:grid-cols-3 max-w-7xl gap-4 py-6 mx-auto">
        {plans.map((plan) => (
          <div key={plan.name}>
            <Card
              className={`relative border-neutral-200 ${
                plan.popular ? "ring-2 ring-blue-500 bg-blue-50" : "bg-white "
              }`}
            >
              <CardHeader className="text-left">
                <div className="flex justify-between">
                  <h3 className="text-3xl font-semibold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  {plan.popular && (
                    <div className="">
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Popular
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-baseline">
                  <span className="text-4xl font-semibold text-gray-900">
                    $
                    <NumberFlow
                      value={isYearly ? plan.yearlyPrice : plan.price}
                      className="text-4xl font-semibold"
                    />
                  </span>
                  <span className="text-gray-600 ml-1">
                    /{isYearly ? "year" : "month"}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <button
                  onClick={() => openLeadForm(plan.name)}
                  className={`w-full mb-6 p-4 text-xl rounded-xl ${
                    plan.popular
                      ? "bg-gradient-to-t from-blue-500 to-blue-600  shadow-lg shadow-blue-500 border border-blue-400 text-white"
                      : plan.buttonVariant === "outline"
                        ? "bg-gradient-to-t from-neutral-900 to-neutral-600  shadow-lg shadow-neutral-900 border border-neutral-700 text-white"
                        : ""
                  }`}
                >
                  {plan.buttonText}
                </button>
                <ul className="space-y-2 font-semibold py-5">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <span className="text-neutral-800 grid place-content-center mt-0.5 mr-3">
                        {feature.icon}
                      </span>
                      <span className="text-sm text-gray-600">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3 pt-4 border-t border-neutral-200">
                  <h4 className="font-medium text-base text-gray-900 mb-3">
                    {plan.includes[0]}
                  </h4>
                  <ul className="space-y-2 font-semibold">
                    {plan.includes.slice(1).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <span className="h-6 w-6 bg-green-50 border border-blue-500 rounded-full grid place-content-center mt-0.5 mr-3">
                          <CheckCheck className="h-4 w-4 text-blue-500 " />
                        </span>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
