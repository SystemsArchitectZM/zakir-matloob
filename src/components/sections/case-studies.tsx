import { BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DotGlow } from "@/components/dot-glow";
import { caseStudies, type CaseStudy } from "@/lib/data";
import { cn } from "@/lib/utils";

function Card({ study }: { study: CaseStudy }) {
  return (
    <Link
      href={`/work/${study.slug}`}
      className="group relative block w-[280px] shrink-0 overflow-hidden rounded-[20px] border border-white/8 sm:w-[380px] lg:w-[460px]"
    >
      <div className="relative aspect-[16/10]">
        <Image
          src={study.image}
          alt={study.title}
          fill
          sizes="(max-width: 640px) 280px, (max-width: 1024px) 380px, 460px"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/65">
            {study.kicker}
          </p>
          <p className="mt-1 font-geometric text-lg font-light tracking-wide md:text-xl">
            {study.title}
          </p>
        </div>
      </div>
    </Link>
  );
}

function Row({ studies, reverse }: { studies: CaseStudy[]; reverse?: boolean }) {
  // A single set must be wider than the viewport, and the whole track is
  // duplicated once so the -50% translate loops seamlessly.
  const set = [...studies, ...studies];
  const items = [...set, ...set];
  return (
    <div className="marquee-row relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
      <div
        className={cn(
          "flex w-max gap-5 pr-5 md:gap-6 md:pr-6",
          reverse ? "marquee-reverse" : "marquee",
        )}
      >
        {items.map((study, i) => (
          <Card key={`${study.slug}-${i}`} study={study} />
        ))}
      </div>
    </div>
  );
}

export function CaseStudies() {
  const half = Math.ceil(caseStudies.length / 2);
  const topRow = caseStudies.slice(0, half);
  const bottomRow = caseStudies.slice(half);

  return (
    <section id="work" className="relative overflow-hidden bg-black py-20 text-white md:py-28">
      <DotGlow />

      <div className="relative z-10 mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="flex flex-col items-center pb-10 text-center md:pb-12">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.24em] text-white/70">
            <BookOpen className="size-3.5 text-orange" />
            Selected work
          </span>

          <h2 className="mt-5 font-condensed text-6xl leading-[0.9] sm:text-7xl md:text-9xl">
            Case <span className="font-editorial italic lowercase text-orange">study</span>
          </h2>

          <p className="mt-5 max-w-md font-geometric text-base font-light leading-relaxed text-white/60 md:text-lg">
            In-depth looks at how engineering decisions solved real business challenges.
          </p>

          <span className="mt-8 h-px w-40 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
        </div>
      </div>

      <div className="relative z-10 mt-8 flex flex-col gap-5 md:mt-10 md:gap-6">
        <Row studies={topRow} />
        <Row studies={bottomRow} reverse />
      </div>
    </section>
  );
}
