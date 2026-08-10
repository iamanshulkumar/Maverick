"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 1.5,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      ref.current.textContent = `${prefix}${value.toLocaleString()}${suffix}`;
      return;
    }

    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 88%",
        once: true,
      },
      onUpdate: () => {
        if (!ref.current) return;
        const formatted = value >= 1000
          ? Math.floor(obj.val).toLocaleString()
          : Math.floor(obj.val).toString();
        ref.current.textContent = `${prefix}${formatted}${suffix}`;
      },
    });
  }, { scope: ref });

  return (
    <span ref={ref} className={className}>
      {prefix}0{suffix}
    </span>
  );
}
