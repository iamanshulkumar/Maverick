"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

interface ComparisonSliderProps {
  beforeLabel?: string;
  afterLabel?: string;
  beforeContent: React.ReactNode;
  afterContent: React.ReactNode;
  className?: string;
}

export function ComparisonSlider({
  beforeLabel = "Before",
  afterLabel = "After",
  beforeContent,
  afterContent,
  className,
}: ComparisonSliderProps) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current || !isDragging.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setPosition(percent);
  }, []);

  const handleMouseDown = useCallback(() => { isDragging.current = true; }, []);
  const handleMouseUp = useCallback(() => { isDragging.current = false; }, []);
  const handleMouseMove = useCallback((e: React.MouseEvent) => { handleMove(e.clientX); }, [handleMove]);
  const handleTouchMove = useCallback((e: React.TouchEvent) => { handleMove(e.touches[0].clientX); }, [handleMove]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl border border-border ${className || ""}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onTouchMove={handleTouchMove}
      style={{ cursor: isDragging.current ? "col-resize" : "default" }}
    >
      <div className="relative">
        <div className="w-full">{afterContent}</div>
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          {beforeContent}
        </div>
      </div>

      <div
        className="absolute top-0 bottom-0 w-0.5 bg-accent z-10"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent bg-card shadow-lg cursor-col-resize">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-accent">
            <path d="M5 3L2 8L5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 3L14 8L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div className="absolute top-3 left-3 z-10 rounded-md bg-card/80 px-2.5 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
        {beforeLabel}
      </div>
      <div className="absolute top-3 right-3 z-10 rounded-md bg-card/80 px-2.5 py-1 text-xs font-medium text-accent backdrop-blur-sm">
        {afterLabel}
      </div>
    </div>
  );
}
