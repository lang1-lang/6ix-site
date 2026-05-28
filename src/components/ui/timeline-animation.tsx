"use client";

import { motion, type Variants } from "motion/react";
import type { ComponentPropsWithoutRef, ElementType, RefObject } from "react";

type TimelineContentProps<T extends ElementType> = {
  as?: T;
  animationNum: number;
  timelineRef: RefObject<HTMLElement | null>;
  customVariants: Variants;
  className?: string;
  children?: React.ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

const motionCache = new Map<ElementType, ElementType>();

function getMotionComponent(Tag: ElementType): ElementType {
  if (typeof Tag === "string" && Tag in motion) {
    return (motion as unknown as Record<string, ElementType>)[Tag];
  }
  const cached = motionCache.get(Tag);
  if (cached) return cached;
  const created = motion.create(Tag as never) as unknown as ElementType;
  motionCache.set(Tag, created);
  return created;
}

export function TimelineContent<T extends ElementType = "div">({
  as,
  animationNum,
  timelineRef,
  customVariants,
  className,
  children,
  ...rest
}: TimelineContentProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  const MotionTag = getMotionComponent(Tag) as ElementType;

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ root: timelineRef, once: true, amount: 0.2 }}
      variants={customVariants}
      custom={animationNum}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
