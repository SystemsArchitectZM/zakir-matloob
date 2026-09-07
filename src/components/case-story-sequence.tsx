"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import type { CaseStudyStoryStep } from "@/lib/data";
import { cn } from "@/lib/utils";

export function CaseStorySequence({ steps }: { steps: CaseStudyStoryStep[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [live, setLive] = useState(false);

  useEffect(() => {
    setLive(true);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const apply = () => {
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const passed = Math.min(total, Math.max(0, -rect.top));
      const next = Math.min(steps.length - 1, Math.floor((passed / total) * steps.length + 0.001));
      setIndex((prev) => (prev === next ? prev : next));
    };

    apply();
    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", apply);
    return () => {
      window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
    };
  }, [steps.length]);

  const step = steps[index];
  const imageLeft = index % 2 === 1;

  return (
    <section className="mt-16 border-t border-white/10 pt-10">
      <div ref={trackRef} className="relative" style={{ height: `${steps.length * 100}vh` }}>
        <div className="sticky top-16 flex h-[calc(100svh-4rem)] flex-col overflow-visible md:top-20 md:h-[calc(100svh-5rem)]">
          <div className="relative min-h-0 flex-1">
            {live ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.step}
                  className="absolute inset-0"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                >
                  <StoryStage step={step} total={steps.length} imageLeft={imageLeft} />
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="absolute inset-0">
                <StoryStage step={step} total={steps.length} imageLeft={imageLeft} />
              </div>
            )}
          </div>
          <ScrollHint active={index} total={steps.length} />
        </div>
      </div>
    </section>
  );
}

function ScrollHint({ active, total }: { active: number; total: number }) {
  return (
    <div className="flex shrink-0 items-center justify-center gap-3 pb-3 pt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
      <span className="text-orange">{String(active + 1).padStart(2, "0")}</span>
      <span className="relative h-px w-16 overflow-hidden bg-white/15">
        <span
          className="absolute inset-y-0 left-0 bg-orange transition-[width] duration-500"
          style={{ width: `${((active + 1) / total) * 100}%` }}
        />
      </span>
      <span>{String(total).padStart(2, "0")}</span>
    </div>
  );
}

function StoryStage({
  step,
  total,
  imageLeft = false,
}: {
  step: CaseStudyStoryStep;
  total: number;
  imageLeft?: boolean;
}) {
  return (
    <div className="relative flex h-full min-h-0 flex-col justify-center md:flex-row md:items-center md:gap-4 lg:gap-8">
      <span
        className={cn(
          "pointer-events-none absolute select-none font-condensed leading-none text-white/[0.055]",
          "text-[clamp(6.5rem,22vw,14rem)]",
          imageLeft ? "right-0 top-[-4%]" : "left-0 top-[-6%] lg:left-8",
        )}
      >
        {step.step}
      </span>

      <div
        className={cn(
          "relative z-20 w-full shrink-0 md:w-[38%] lg:w-[34%]",
          imageLeft ? "md:order-2 md:translate-y-6 lg:pr-4" : "md:order-1 md:-translate-y-4 lg:pl-10",
        )}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-orange">
          Beat {step.step}
          <span className="text-white/30"> / {String(total).padStart(2, "0")}</span>
        </p>
        <h3 className="mt-2 max-w-[14ch] font-condensed text-[1.9rem] leading-[0.9] md:text-[2.7rem] lg:text-[3.1rem]">
          {step.title}
        </h3>
        <CircleScribble className="mt-1 w-24 text-orange/55" />
        <div className="relative mt-4">
          <ConnectorArrow imageLeft={imageLeft} />
          <p className="font-editorial text-xl italic leading-snug text-orange/90">The snag.</p>
        </div>
        <p className="mt-1.5 text-[13px] leading-relaxed text-white/65">{step.problem}</p>
        <p className="mt-4 font-editorial text-xl italic leading-snug text-white/80">What ships.</p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-white/65">{step.solution}</p>
      </div>

      <div
        className={cn(
          "relative z-10 mt-5 min-w-0 flex-1 md:mt-0",
          imageLeft ? "md:order-1 md:-rotate-2 md:pr-4" : "md:order-2 md:rotate-2 md:pl-4",
        )}
      >
        <StoryFrames step={step} tilt={imageLeft ? -1.4 : 1.6} />
      </div>
    </div>
  );
}

function StoryFrames({ step, tilt }: { step: CaseStudyStoryStep; tilt: number }) {
  const layout = step.layout ?? (step.companion ? "pair" : "wide");

  if (layout === "panel") {
    return (
      <Frame className="mx-auto w-[min(100%,340px)]" style={{ transform: `rotate(${tilt}deg)` }}>
        <Image
          src={step.image}
          alt={step.imageAlt}
          width={1536}
          height={1152}
          className="h-auto w-full max-h-[32svh] object-contain md:max-h-[52svh]"
        />
      </Frame>
    );
  }

  if (layout === "pair" && step.companion) {
    return (
      <div className="relative mx-auto max-w-[620px] pb-8">
        <Frame className="w-[78%]" style={{ transform: `rotate(${tilt}deg)` }}>
          <Image
            src={step.image}
            alt={step.imageAlt}
            width={1536}
            height={864}
            className="h-auto w-full max-h-[24svh] object-contain md:max-h-[34svh]"
          />
        </Frame>
        <Frame className="absolute bottom-0 right-0 w-[64%]" style={{ transform: `rotate(${-tilt * 1.4}deg)` }}>
          <Image
            src={step.companion.image}
            alt={step.companion.alt}
            width={1536}
            height={864}
            className="h-auto w-full max-h-[20svh] object-contain md:max-h-[28svh]"
          />
        </Frame>
      </div>
    );
  }

  return (
    <Frame style={{ transform: `rotate(${tilt * 0.35}deg)` }}>
      <Image
        src={step.image}
        alt={step.imageAlt}
        width={1536}
        height={864}
        className="h-auto w-full max-h-[30svh] object-contain md:max-h-[50svh]"
      />
    </Frame>
  );
}

function Frame({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      style={style}
      className={cn(
        "overflow-hidden rounded-[22px] border border-white/12 bg-[#f3f3f4] shadow-[0_28px_70px_rgba(0,0,0,0.45)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function ConnectorArrow({ imageLeft }: { imageLeft: boolean }) {
  // Single hand-drawn arc + open V. Tip == shaft end so the line bisects the head.
  const shaft = "M16 96C48 22 118 6 188 46";
  const head = "M159 48L188 46L175 20";

  return (
    <motion.svg
      viewBox="0 0 210 120"
      fill="none"
      aria-hidden
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.3, delay: 0.25, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={cn(
        "pointer-events-none absolute top-1/2 z-30 hidden w-[130px] -translate-y-[75%] text-orange lg:block xl:w-[160px]",
        imageLeft ? "right-full mr-1 -scale-x-100" : "left-full ml-1",
      )}
    >
      <motion.path
        d={shaft}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        variants={{
          hidden: { pathLength: 0 },
          visible: {
            pathLength: 1,
            transition: { duration: 0.85, delay: 0.28, ease: [0.22, 1, 0.36, 1] },
          },
        }}
      />
      <motion.path
        d={head}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          hidden: { pathLength: 0 },
          visible: {
            pathLength: 1,
            transition: { duration: 0.32, delay: 1.0, ease: [0.22, 1, 0.36, 1] },
          },
        }}
      />
    </motion.svg>
  );
}

function CircleScribble({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 18" fill="none" className={className} aria-hidden>
      <path d="M4 11c18-8 38 6 58 1 16-4 36-7 54 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
