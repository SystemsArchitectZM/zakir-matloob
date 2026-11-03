import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/page-header";
import { experience } from "@/lib/data";

export function generateStaticParams() {
  return experience.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = experience.find((item) => item.slug === slug);
  return { title: job ? `${job.role} · ${job.company}` : "Experience" };
}

export default async function ExperienceChapterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const index = experience.findIndex((item) => item.slug === slug);
  const job = experience[index];
  if (!job) notFound();

  const previous = index > 0 ? experience[index - 1] : null;
  const next = index < experience.length - 1 ? experience[index + 1] : null;

  return (
    <main className="bg-black text-white">
      <article className="mx-auto max-w-[1100px] px-5 pt-28 pb-24 md:px-8 md:pt-36">
        <BackLink href="/#experience" label="All milestones" />
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-orange">
          {job.kicker} · {job.location}
        </p>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
          {job.dates}
        </p>
        <h1 className="mt-4 font-condensed text-5xl leading-[0.92] md:text-8xl">{job.role}</h1>
        <p className="mt-4 font-display text-xl text-white/70 md:text-2xl">{job.company}</p>

        <div
          className={
            "image" in job && job.image
              ? "mt-14 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-16"
              : "mt-14"
          }
        >
          <div className="max-w-2xl space-y-6 text-base leading-8 text-white/80 md:text-lg">
            {job.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          {"image" in job && job.image ? (
            <figure className="relative mx-auto w-[min(100%,340px)] shrink-0 lg:mx-0 lg:mt-6">
              <div
                aria-hidden
                className="absolute -top-3 left-8 z-10 h-7 w-[4.25rem] rotate-[-18deg] bg-[#f4f1ed]/55 shadow-[0_1px_2px_rgba(0,0,0,0.35)]"
              />
              <div
                aria-hidden
                className="absolute -top-2 right-7 z-10 h-6 w-14 rotate-[22deg] bg-orange/45 shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
              />
              <div className="relative rotate-[-3.5deg] bg-[#f3efe8] p-2.5 pb-11 shadow-[0_18px_40px_rgba(0,0,0,0.45)] transition-transform duration-500 hover:rotate-[-1deg]">
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                  <Image
                    src={job.image}
                    alt={job.imageAlt || job.company}
                    fill
                    priority
                    quality={95}
                    sizes="400px"
                    className="object-cover object-[center_45%]"
                  />
                </div>
                {job.imageCaption ? (
                  <figcaption className="mt-3 px-1 font-editorial text-[0.95rem] leading-snug text-ink/80">
                    {job.imageCaption}
                  </figcaption>
                ) : null}
              </div>
              <p className="mt-8 rotate-[-2deg] font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                Filed with the chapter
              </p>
            </figure>
          ) : null}
        </div>

        <ul className="mt-12 max-w-2xl space-y-4">
          {job.bullets.map((bullet) => (
            <li
              key={bullet}
              className="border-l border-orange/50 pl-4 text-sm leading-relaxed text-white/70 md:text-[15px]"
            >
              {bullet}
            </li>
          ))}
        </ul>

        <nav className="mt-20 grid gap-4 border-t border-white/10 pt-10 md:grid-cols-2">
          {previous ? (
            <ChapterLink job={previous} label="Previous" />
          ) : (
            <div />
          )}
          {next ? <ChapterLink job={next} label="Next" align="right" /> : null}
        </nav>
      </article>
    </main>
  );
}

function ChapterLink({
  job,
  label,
  align,
}: {
  job: (typeof experience)[number];
  label: string;
  align?: "right";
}) {
  return (
    <Link
      href={`/experience/${job.slug}`}
      className={align === "right" ? "text-right" : undefined}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">{label}</p>
      <p className="mt-2 inline-flex items-center gap-2 font-display text-lg font-semibold text-white">
        {job.role}
        <ArrowUpRight className="size-4 text-orange" />
      </p>
      <p className="mt-1 font-mono text-xs uppercase tracking-[0.16em] text-white/45">
        {job.company}
      </p>
    </Link>
  );
}
