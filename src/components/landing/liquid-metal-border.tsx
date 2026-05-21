"use client";

import { useEffect, useRef } from "react";

type ShaderMountInstance = {
  destroy?: () => void;
  setSpeed?: (s: number) => void;
};

export function LiquidMetalBorder({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<ShaderMountInstance | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const mod = (await import("@paper-design/shaders")) as unknown as {
          liquidMetalFragmentShader: string;
          ShaderMount: new (
            host: HTMLElement,
            shader: string,
            uniforms: Record<string, number>,
            extra: unknown,
            speed: number,
          ) => ShaderMountInstance;
        };
        if (cancelled || !hostRef.current) return;

        mountRef.current = new mod.ShaderMount(
          hostRef.current,
          mod.liquidMetalFragmentShader,
          {
            u_repetition: 4,
            u_softness: 0.5,
            u_shiftRed: 0.3,
            u_shiftBlue: 0.3,
            u_distortion: 0,
            u_contour: 0,
            u_angle: 45,
            u_scale: 8,
            u_shape: 1,
            u_offsetX: 0.1,
            u_offsetY: -0.1,
          },
          undefined,
          0.6,
        );
      } catch (err) {
        console.error("LiquidMetalBorder shader load failed", err);
      }
    })();

    return () => {
      cancelled = true;
      mountRef.current?.destroy?.();
      mountRef.current = null;
    };
  }, []);

  return <div ref={hostRef} className={`liquid-metal-host ${className ?? ""}`} />;
}
