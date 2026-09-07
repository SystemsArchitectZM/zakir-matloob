"use client";

import { useEffect, useRef } from "react";

/**
 * Dot grid backdrop whose dots light up around the cursor. Absolutely
 * positioned, so the parent element needs `relative`.
 */
export function DotGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    const host = glow?.parentElement;
    if (!glow || !host) return;

    let frame = 0;

    const onMove = (event: MouseEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = host.getBoundingClientRect();
        glow.style.setProperty("--dx", `${event.clientX - rect.left}px`);
        glow.style.setProperty("--dy", `${event.clientY - rect.top}px`);
        glow.style.opacity = "1";
      });
    };

    const onLeave = () => {
      glow.style.opacity = "0";
    };

    host.addEventListener("mousemove", onMove);
    host.addEventListener("mouseleave", onLeave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      host.removeEventListener("mousemove", onMove);
      host.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <div className="dot-grid pointer-events-none absolute inset-0" aria-hidden />
      <div
        ref={glowRef}
        className="dot-grid-glow pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
        aria-hidden
      />
    </>
  );
}
