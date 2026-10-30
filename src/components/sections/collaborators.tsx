"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/reveal";
import { collaborators } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Collaborators() {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const prev = () => setIndex((i) => (i === 0 ? collaborators.length - 1 : i - 1));
  const next = () => setIndex((i) => (i + 1) % collaborators.length);
  const active = collaborators[index];

  useEffect(() => {
    const scroller = scrollerRef.current;
    const card = cardRefs.current[index];
    if (!scroller || !card) return;
    const left = card.offsetLeft - (scroller.clientWidth - card.clientWidth) / 2;
    scroller.scrollTo({ left, behavior: "smooth" });
  }, [index]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <section className="overflow-hidden border-t border-white/10 bg-black py-24 text-white md:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">
              Network
            </p>
            <h2 className="mt-3 max-w-xl font-display text-[1.75rem] font-bold leading-tight sm:text-4xl md:text-6xl">
              Collaborators I deliver with
            </h2>
          </div>
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous collaborator"
              className="flex size-9 items-center justify-center rounded-xl border border-white/20 sm:size-11"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next collaborator"
              className="flex size-9 items-center justify-center rounded-xl border border-white/20 sm:size-11"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="mt-14 h-[400px] overflow-x-auto overflow-y-hidden scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:h-[520px]"
        >
          <div className="flex h-full snap-x snap-mandatory items-end gap-4 md:gap-6">
            {collaborators.map((person, i) => {
              const focused = i === index;
              return (
                <button
                  key={person.role}
                  type="button"
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  onClick={() => {
                    setIndex(i);
                    if (focused) setOpen(true);
                  }}
                  aria-label={`${person.name ?? person.role}, ${person.role}. ${focused ? "View details" : "Select"}`}
                  className={cn(
                    "relative shrink-0 snap-center overflow-hidden rounded-[28px]",
                    "transition-[width,height,filter] duration-500 ease-out",
                    focused
                      ? "h-full w-[min(78vw,320px)] grayscale-0"
                      : "h-[82%] w-[min(58vw,220px)] grayscale md:h-[78%]",
                  )}
                >
                  <Image
                    src={person.image}
                    alt={person.name ?? person.role}
                    fill
                    sizes="320px"
                    className={cn(
                      "object-cover object-top transition-[filter] duration-500 ease-out",
                      focused ? "grayscale-0" : "grayscale",
                    )}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-3 text-left sm:bottom-5 sm:left-5 sm:right-4">
                    <p className="font-display text-lg font-bold leading-tight sm:text-xl">
                      {person.name ?? person.role}
                    </p>
                    <p className="mt-1 text-xs text-white/70 sm:text-sm">
                      {person.name ? person.role : person.focus}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <Reveal>
          <div className="mt-10 flex max-w-2xl flex-col items-start gap-5">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
                {active.name ? `${active.name} · ${active.role}` : active.role}
              </p>
              <p className="mt-3 font-display text-xl font-semibold leading-snug text-white/85 sm:text-2xl">
                {active.summary}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex h-11 items-center rounded-full border border-white/25 px-5 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black"
            >
              View details
            </button>
          </div>
        </Reveal>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 p-3 backdrop-blur-sm sm:items-center sm:p-8"
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="collaborator-detail-title"
            className="grid max-h-[min(92vh,760px)] w-full max-w-3xl overflow-hidden rounded-[28px] bg-[#111] text-white shadow-2xl sm:grid-cols-[240px_1fr] md:grid-cols-[280px_1fr]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="relative h-56 sm:h-auto">
              <Image
                src={active.image}
                alt=""
                fill
                sizes="280px"
                className="object-cover object-top"
              />
            </div>
            <div className="relative overflow-y-auto px-6 py-7 sm:px-8 sm:py-9">
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close details"
                className="absolute top-4 right-4 flex size-9 items-center justify-center rounded-xl border border-white/15 text-white/80 hover:bg-white/10"
              >
                <X className="size-4" />
              </button>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
                Specializes in
              </p>
              <h3
                id="collaborator-detail-title"
                className="mt-3 pr-10 font-display text-2xl font-bold leading-tight sm:text-3xl"
              >
                {active.name ?? active.role}
              </h3>
              {active.name ? (
                <p className="mt-2 text-sm text-white/60">{active.role}</p>
              ) : null}
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
                {active.summary}
              </p>
              <ul className="mt-6 space-y-3">
                {active.specialties.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-snug text-white/90 sm:text-base">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-orange" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
