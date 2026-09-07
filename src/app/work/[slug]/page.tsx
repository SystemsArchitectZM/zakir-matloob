import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CaseStorySequence } from "@/components/case-story-sequence";
import { BackLink } from "@/components/page-header";
import { caseStudies } from "@/lib/data";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  return { title: study?.title ?? "Case study" };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies.find((item) => item.slug === slug);
  if (!study) notFound();

  return (
    <main className="bg-black text-white">
      <article className={cn("mx-auto max-w-[1100px] px-5 pt-28 md:px-8 md:pt-36", study.story?.length ? "pb-4" : "pb-24")}>
        <BackLink href="/work" label="All work" />
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-orange">
          {study.kicker} · {study.year}
        </p>
        <h1 className="mt-3 font-condensed text-6xl md:text-8xl">{study.title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-white/70">{study.summary}</p>
        {study.url ? <LiveLink url={study.url} /> : null}
        <div className={cn("relative mt-10 overflow-hidden rounded-[28px]", study.imageAspectClass ?? "aspect-[16/8]")}>
          <Image
            src={study.image}
            alt={study.title}
            fill
            sizes="(max-width: 1100px) 100vw, 1100px"
            className={cn("object-cover", study.imageClassName)}
            key={study.image}
            priority
          />
        </div>
        {study.heroCaption ? (
          <p className="mt-4 max-w-3xl font-mono text-[11px] uppercase leading-relaxed tracking-[0.14em] text-white/45">
            {study.heroCaption}
          </p>
        ) : null}
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          <Block title="Challenge" body={study.challenge} />
          <Block title="Approach" body={study.approach} />
          <Block title="Outcome" body={study.outcome} />
        </div>
        <div className="mt-12 flex flex-wrap gap-2">
          {study.stack.map((item) => (
            <span key={item} className="rounded-full border border-white/15 px-3 py-1 font-mono text-xs uppercase tracking-wider text-white/70">
              {item}
            </span>
          ))}
        </div>
      </article>
      {study.story?.length ? (
        <div className="mx-auto max-w-[1280px] px-5 pb-24 md:px-8">
          <CaseStorySequence steps={study.story} />
        </div>
      ) : null}
    </main>
  );
}

function liveLinkLabel(url: string) {
  return url.includes("github.com") ? "View repository" : "Visit site";
}

function LiveLink({ url }: { url: string }) {
  const hostname = url.includes("github.com")
    ? "GitHub"
    : new URL(url).hostname.replace(/^www\./, "");

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="mt-6 inline-flex items-center overflow-hidden rounded-full bg-white pl-4 text-sm font-medium text-ink shadow-sm transition hover:bg-white/90"
    >
      <span className="pr-3">
        {liveLinkLabel(url)}
        <span className="ml-2 font-mono text-[11px] uppercase tracking-wider text-ink/45">
          {hostname}
        </span>
      </span>
      <span className="flex size-10 items-center justify-center bg-orange text-white">
        <ArrowUpRight className="size-4" />
      </span>
    </a>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-orange">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-white/70">{body}</p>
    </div>
  );
}

