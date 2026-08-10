"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  by?: "words" | "chars";
  delay?: number;
  stagger?: number;
  className?: string;
}

export function TextReveal({
  text,
  as: Tag = "h2",
  by = "words",
  delay = 0,
  stagger = 0.04,
  className,
}: TextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  const items = by === "words" ? text.split(" ") : text.split("");

  useGSAP(() => {
    if (!ref.current) return;

    const spans = ref.current.querySelectorAll("span");
    if (!spans.length) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      gsap.set(spans, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(spans, { opacity: 0, y: 16, display: "inline-block" });

    gsap.to(spans, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      delay,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: "top 88%",
        once: true,
      },
    });
  }, { scope: ref });

  return (
    // @ts-expect-error — Tag is a valid HTML element type
    <Tag ref={ref} className={className}>
      {items.map((item, i) => (
        <span key={i} className="inline-block">
          {item}
          {by === "words" && i < items.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </Tag>
  );
}
