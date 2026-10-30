import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { experience, site } from "@/lib/data";

export function Experience() {
  const roles = experience.slice(0, 3);

  return (
    <section id="experience" className="bg-black py-24 text-white md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 text-center md:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/50">
          Experience
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl md:text-6xl">
          Professional milestones &amp; impact
        </h2>
      </div>

      <div className="mx-auto mt-16 grid max-w-[1200px] items-start gap-10 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <Reveal>
          <div className="relative aspect-[3/4] overflow-hidden rounded-[28px]">
            <Image
              src={site.milestonesPortrait}
              alt={site.name}
              fill
              quality={90}
              className="object-cover object-[center_35%]"
              sizes="(max-width: 1024px) 90vw, 480px"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/55">
                Currently shipping
              </p>
              <p className="mt-1 font-display text-lg font-semibold">{site.shortRole}</p>
            </div>
          </div>
        </Reveal>

        <div className="relative text-left">
          <div
            aria-hidden
            className="pointer-events-none absolute top-3 bottom-10 left-0 hidden w-8 md:block"
          >
            <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-orange via-white/25 to-transparent" />
          </div>

          <div>
            {roles.map((job, i) => (
              <Reveal key={job.slug} delay={i * 0.06}>
                <Link
                  href={`/experience/${job.slug}`}
                  className="group relative grid gap-4 border-b border-dashed border-white/12 py-8 first:pt-0 last:border-b-0 md:grid-cols-[32px_1fr] md:gap-5 md:py-9"
                >
                  <div className="relative z-10 hidden justify-center pt-2 md:flex">
                    <span
                      className={
                        i === 0
                          ? "size-3 shrink-0 rounded-full bg-orange shadow-[0_0_0_4px_rgba(255,77,28,0.2)]"
                          : "mt-0.5 size-2.5 shrink-0 rounded-full bg-white/40 transition-colors group-hover:bg-orange"
                      }
                    />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-orange">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white/60">
                        {job.dates}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
                        {job.location}
                      </span>
                    </div>

                    <h3 className="mt-4 flex items-start justify-between gap-4 font-condensed text-3xl tracking-wide text-white md:text-4xl">
                      <span>{job.role}</span>
                      <ArrowUpRight className="mt-1 size-6 shrink-0 text-white/30 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-orange" />
                    </h3>
                    <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-white/45">
                      {job.company}
                    </p>

                    <div className="mt-5 space-y-3">
                      {job.bullets.map((bullet) => (
                        <p
                          key={bullet}
                          className="border-l border-orange/40 pl-4 text-sm leading-relaxed text-white/70 md:text-[15px]"
                        >
                          {bullet}
                        </p>
                      ))}
                    </div>
                    <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35 transition-colors group-hover:text-orange">
                      Open chapter
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
