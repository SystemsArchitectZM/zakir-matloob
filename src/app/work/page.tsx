import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { PageHeader } from "@/components/page-header";
import { caseStudies, type CaseStudy } from "@/lib/data";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Work",
};

export default function WorkPage() {
  return (
    <main className="bg-black text-white">
      <PageHeader
        dark
        eyebrow="Selected work"
        title="Case studies"
        description="Platforms, AI systems, and enterprise workflows shipped with production constraints attached."
      />
      <div className="mx-auto grid max-w-[1440px] gap-x-8 px-5 pb-24 md:grid-cols-2 md:px-8">
        {caseStudies.map((study, i) => (
          <Fragment key={study.slug}>
            {i > 0 ? (
              <div
                aria-hidden
                className={cn(
                  "h-px bg-gradient-to-r from-transparent via-white/35 to-transparent",
                  i % 2 === 0 ? "col-span-full my-8 md:my-10" : "my-8 md:hidden",
                )}
              />
            ) : null}
            <StudyCard study={study} />
          </Fragment>
        ))}
      </div>
    </main>
  );
}

function StudyCard({ study }: { study: CaseStudy }) {
  return (
    <article className="group">
      <Link href={`/work/${study.slug}`} className="block">
        <div
          className={cn(
            "relative overflow-hidden rounded-[24px]",
            study.imageAspectClass ?? "aspect-[16/10]",
          )}
        >
          <Image
            src={study.image}
            alt={study.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={cn(
              "object-cover",
              !study.imageAspectClass && "transition duration-700 group-hover:scale-105",
              study.imageClassName,
            )}
            key={study.image}
          />
        </div>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-orange">
          {study.kicker} · {study.year}
        </p>
        <h2 className="mt-1 font-condensed text-4xl">{study.title}</h2>
        <p className="mt-2 max-w-md text-sm text-white/65">{study.summary}</p>
      </Link>
      {study.url ? (
        <a
          href={study.url}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-orange transition hover:text-white"
        >
          {study.url.includes("github.com") ? "View repository" : "Visit site"}
          <ArrowUpRight className="size-3.5" />
        </a>
      ) : null}
    </article>
  );
}
