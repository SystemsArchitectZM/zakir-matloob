import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { ImpactField } from "@/components/sections/impact-field";
import { site, stats } from "@/lib/data";

export function Impact() {
  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-28">
      <div
        aria-hidden
        className="impact-dot-grid pointer-events-none absolute inset-0 z-0 [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_92%,transparent)]"
      />
      <ImpactField />
      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-8">
        <Reveal>
          <span className="inline-flex rounded-full border border-black/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
            Better digital journeys.
          </span>
        </Reveal>
        <div className="mt-6 grid items-end gap-10 lg:grid-cols-[1.4fr_220px]">
          <Reveal delay={0.05} className="min-w-0">
            <h2 className="max-w-full font-grotesk text-[clamp(2.5rem,6.6vw+0.85rem,6.5rem)] font-extrabold leading-[0.86] tracking-[-0.045em] break-words">
              My impact{" "}
              <span className="font-editorial font-normal italic tracking-[-0.005em] text-black/40">
                through engineering
              </span>{" "}
              experience
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="hidden lg:block">
            <div className="relative h-48 overflow-hidden rounded-2xl">
              <Image
                src={site.portrait}
                alt=""
                fill
                className="object-cover object-top"
                sizes="220px"
              />
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-3">
          {stats.map((stat, i) => (
            <Reveal key={stat.value} delay={i * 0.08}>
              <article className="relative rounded-3xl border border-black/6 bg-white/92 p-5 shadow-[0_20px_50px_rgba(10,10,10,0.05)] backdrop-blur-[2px] sm:p-7">
                <p className="font-grotesk text-5xl font-extrabold tracking-[-0.045em] sm:text-6xl">
                  {stat.value}
                  <span className="ml-1 text-orange">*</span>
                </p>
                <p className="mt-3 text-sm font-medium uppercase tracking-[0.12em] text-ink">
                  {stat.label}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{stat.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
