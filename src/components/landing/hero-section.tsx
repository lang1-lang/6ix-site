"use client";

import { useRef } from "react";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { useLeadForm } from "@/lib/lead-form-context";

const LOGO_TEXT_STYLE: React.CSSProperties = {
  fontSize: "18px",
  fontWeight: 600,
  color: "#4B5563",
  letterSpacing: "-0.01em",
  lineHeight: 1,
};

const LOGO_ICON_COLOR = "#4B5563";

function AsteriskIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: LOGO_ICON_COLOR }}>
      <g transform="translate(9,9)">
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <g key={deg} transform={`rotate(${deg})`}>
            <rect x="-1" y="-5" width="2" height="10" fill="currentColor" rx="0.5" />
          </g>
        ))}
      </g>
    </svg>
  );
}

const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.15,
      duration: 0.5,
    },
  }),
  hidden: {
    filter: "blur(10px)",
    y: -20,
    opacity: 0,
  },
};

export function HeroSection() {
  const { openLeadForm } = useLeadForm();
  const heroRef = useRef<HTMLElement | null>(null);

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden bg-neutral-100">
      {/* Bottom blue spill — same paint as pricing radial, tight + masked */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[55%] h-[18%] z-[1] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 100% at 50% 100%, #206ce8 0%, transparent 70%)",
          opacity: 0.35,
          mixBlendMode: "multiply",
          maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)",
        }}
      />

      {/* Content stack */}
      <div
        className="relative z-10 flex flex-col items-center justify-center min-h-screen"
        style={{ paddingTop: "120px", paddingBottom: "80px" }}
      >
        {/* Icon badge */}
        <TimelineContent
          as="div"
          animationNum={0}
          timelineRef={heroRef}
          customVariants={revealVariants}
          className="relative flex justify-center items-end mb-8"
        >
          <div
            className="relative flex items-center justify-center"
            style={{
              width: "72px",
              height: "72px",
              background: "#FFFFFF",
              borderRadius: "18px",
              boxShadow:
                "0 12px 32px -8px rgba(32,108,232,0.25), 0 4px 12px -2px rgba(15,23,42,0.12)",
            }}
          >
            <svg width="112" height="112" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M 192.835 154.091 C 187.151 161.841, 179.448 172.303, 175.717 177.341 C 139.183 226.675, 131.820 241.914, 131.674 268.500 C 131.622 278.048, 132.067 282.135, 133.856 288.500 C 139.469 308.479, 154.394 323.544, 174.500 329.528 C 182.328 331.857, 198.448 331.954, 205.753 329.716 C 219.991 325.353, 233.124 315.089, 240.382 302.652 C 242.517 298.993, 244.317 296.001, 244.382 296.001 C 244.447 296.002, 248.101 299.490, 252.501 303.751 C 276.122 326.626, 310.169 329.293, 337.872 310.437 L 341.500 307.967 341.792 315.484 L 342.084 323 354.054 323 L 366.023 323 365.762 283.750 L 365.500 244.500 333.500 244.500 L 301.500 244.500 291.337 259.500 C 285.747 267.750, 281.135 274.837, 281.087 275.250 C 281.039 275.663, 292.341 276, 306.203 276 L 331.406 276 327.453 280.061 C 318.605 289.149, 303.047 293.191, 290.711 289.604 C 278.133 285.948, 266.205 274.096, 262.591 261.665 C 257.069 242.672, 266.685 221.662, 284.782 213.180 C 289.656 210.895, 291.828 210.500, 299.500 210.500 C 307.450 210.500, 309.200 210.845, 314.500 213.455 C 317.911 215.136, 322.970 218.911, 326.225 222.205 L 331.950 228 347.975 228 C 366.392 228, 365.628 228.547, 361.114 218.591 C 349.516 193.013, 325.828 177.081, 299.299 177.017 C 274.038 176.956, 250.859 191.468, 239.613 214.386 C 237.693 218.299, 235.821 222.738, 235.453 224.250 C 235.084 225.762, 234.561 227, 234.289 227 C 234.016 227, 231.598 225.026, 228.914 222.613 C 221.967 216.367, 212.640 212.155, 202.524 210.694 L 194.111 209.480 199.722 201.990 C 202.809 197.870, 209.230 189.550, 213.991 183.500 C 218.753 177.450, 227.736 165.750, 233.954 157.500 C 240.172 149.250, 245.707 141.938, 246.252 141.250 C 247.040 140.258, 242.700 140, 225.207 140 L 203.170 140 192.835 154.091 M 183.344 240.011 C 173.884 241.952, 165.358 248.634, 160.978 257.542 C 158.942 261.683, 158.540 263.983, 158.540 271.500 C 158.540 281.108, 160.131 285.900, 165.509 292.482 C 167.928 295.443, 167.966 295.452, 170.877 293.732 C 174.430 291.633, 177.837 291.562, 180.441 293.532 C 181.965 294.684, 182.553 294.731, 183.176 293.750 C 184.410 291.806, 184.149 278.549, 182.851 277.251 C 181.986 276.386, 182.099 275.498, 183.305 273.657 C 184.313 272.120, 185.018 268.477, 185.204 263.855 L 185.500 256.500 186.273 263.500 C 186.699 267.350, 187.532 272.007, 188.124 273.849 C 188.901 276.265, 188.894 277.506, 188.101 278.299 C 186.332 280.068, 187.251 300, 189.102 300 C 189.551 300, 190.050 296.288, 190.210 291.750 C 190.473 284.263, 190.685 283.500, 192.500 283.500 C 194.299 283.500, 194.557 284.355, 195.064 292 C 195.374 296.675, 195.711 298.794, 195.814 296.708 C 196.112 290.627, 202 286.203, 202 292.059 C 202 293.127, 202.450 294, 203 294 C 203.550 294, 204 295.152, 204 296.559 C 204 298.010, 204.433 298.851, 205 298.500 C 205.550 298.160, 206 294.534, 206 290.441 C 206 286.147, 206.423 283, 207 283 C 207.550 283, 208.061 281.762, 208.136 280.250 C 208.247 278.004, 208.350 277.899, 208.696 279.677 C 208.929 280.875, 209.768 282.393, 210.560 283.050 C 211.375 283.726, 212.014 286.037, 212.033 288.372 L 212.067 292.500 213.977 290.209 C 216.876 286.731, 220 277.478, 220 272.366 C 220 252.442, 201.660 236.254, 183.344 240.011"
                fill="#0A0E1F"
                fillRule="evenodd"
              />
            </svg>
          </div>
        </TimelineContent>

        {/* Headline */}
        <TimelineContent
          as="h1"
          animationNum={1}
          timelineRef={heroRef}
          customVariants={revealVariants}
          className="text-gray-900 text-center font-extrabold"
          style={{
            fontSize: "clamp(44px, 7.3vw, 88px)",
            lineHeight: 1.04,
            letterSpacing: "-0.025em",
            maxWidth: "720px",
            margin: "0 auto 20px",
          }}
        >
          Dominate<br />Your Market.
        </TimelineContent>

        {/* Subheadline */}
        <TimelineContent
          as="p"
          animationNum={2}
          timelineRef={heroRef}
          customVariants={revealVariants}
          className="text-center text-gray-600"
          style={{
            fontSize: "17px",
            fontWeight: 400,
            lineHeight: 1.5,
            maxWidth: "540px",
            margin: "0 auto 36px",
          }}
        >
          Websites &amp; Lead generation systems across the GTA — We handle the digital, you run the jobs.
        </TimelineContent>

        {/* CTA buttons */}
        <TimelineContent
          as="div"
          animationNum={3}
          timelineRef={heroRef}
          customVariants={revealVariants}
          className="flex flex-row gap-3 justify-center mb-12"
        >
          <button
            onClick={() => openLeadForm()}
            className="bg-gradient-to-t from-blue-500 to-blue-600 shadow-lg shadow-blue-500 border border-blue-400 text-white rounded-xl px-6 py-3 text-base font-medium transition-[filter] duration-150 hover:brightness-110"
          >
            Free Audit
          </button>
          <button
            className="bg-gradient-to-t from-neutral-900 to-neutral-600 shadow-lg shadow-neutral-900 border border-neutral-700 text-white rounded-xl px-6 py-3 text-base font-medium transition-[filter] duration-150 hover:brightness-110"
          >
            Learn More
          </button>
        </TimelineContent>

        {/* Trust line */}
        <TimelineContent
          as="p"
          animationNum={4}
          timelineRef={heroRef}
          customVariants={revealVariants}
          className="text-center text-gray-600"
          style={{ fontSize: "13px", fontWeight: 400, margin: "0 auto 24px" }}
        >
          Adopted by renowned, trusted, and leading enterprises
        </TimelineContent>

        {/* Logo strip */}
        <TimelineContent
          as="div"
          animationNum={5}
          timelineRef={heroRef}
          customVariants={revealVariants}
          className="flex flex-row justify-center items-center flex-wrap"
          style={{ gap: "64px" }}
        >
          <div className="flex items-center gap-2">
            <AsteriskIcon />
            <span style={LOGO_TEXT_STYLE}>Asterisk</span>
          </div>

          <div className="flex items-center gap-2">
            <span style={LOGO_TEXT_STYLE}>Oasis</span>
          </div>

          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: LOGO_ICON_COLOR }}>
              <rect x="1" y="3" width="7" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <rect x="10" y="3" width="7" height="12" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <line x1="9" y1="3" x2="9" y2="15" stroke="currentColor" strokeWidth="1.5" />
            </svg>
            <span style={LOGO_TEXT_STYLE}>Ebooks</span>
          </div>

          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: LOGO_ICON_COLOR }}>
              <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
              <circle cx="9" cy="9" r="3" fill="currentColor" />
            </svg>
            <span style={LOGO_TEXT_STYLE}>Opal</span>
          </div>

          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ color: LOGO_ICON_COLOR }}>
              <defs>
                <mask id="crescent-mask">
                  <circle cx="9" cy="9" r="7" fill="white" />
                  <circle cx="12" cy="7" r="5.5" fill="black" />
                </mask>
              </defs>
              <circle cx="9" cy="9" r="7" fill="currentColor" mask="url(#crescent-mask)" />
            </svg>
            <span style={LOGO_TEXT_STYLE}>Dunlir</span>
          </div>
        </TimelineContent>
      </div>
    </section>
  );
}
