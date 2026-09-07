import Image from "next/image";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { education, experience, services, site, stack } from "@/lib/data";

export const metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <main className="bg-paper">
      <PageHeader
        eyebrow="About"
        title="The engineer in the room"
        description={site.headline}
      />

      <section className="mx-auto grid max-w-[1200px] items-start gap-10 px-5 pb-24 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:items-center md:gap-14 md:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px]">
            <div className="relative aspect-[3/4]">
              <Image
                src={site.portrait}
                alt={site.name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 90vw, 480px"
                priority
              />
            </div>
          </div>
        </Reveal>
        <div className="flex flex-col justify-center md:max-w-[36rem] md:py-2">
          <p className="text-lg leading-relaxed text-ink/80 md:text-[1.125rem] md:leading-[1.75]">
            I am {site.name}, a software engineer working across web platforms, applied AI, and SAP-adjacent enterprise systems. I currently serve as Information Technology Officer at Fauji Fertilizer Company, build production software with Metavision IT, and lead full-stack delivery for Haraik Global Associates.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-ink/80 md:text-[1.125rem] md:leading-[1.75]">
            The through-line is translation. A plant, a professional-services firm, and a court archive do not need the same interface — they need software that speaks their language. That is the standard I hold: systems that look considered, and that still hold when the demo is over.
          </p>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-muted">
            {education.degree} · {education.school} · {education.years}
          </p>
          <p className="mt-2 text-sm text-muted">{site.location}</p>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <h2 className="font-condensed text-5xl">What I do</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {services.map((service) => (
              <article key={service.title} className="rounded-3xl border border-black/8 p-6">
                <h3 className="font-display text-xl font-bold">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{service.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-2">
            {stack.map((item) => (
              <span key={item} className="rounded-full border border-black/10 px-3 py-1 font-mono text-xs uppercase tracking-wider">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[800px] px-5 py-20 md:px-8">
        <h2 className="font-condensed text-5xl">Path</h2>
        <div className="mt-8">
          {experience.map((job) => (
            <article key={`${job.company}-${job.role}`} className="border-b border-black/10 py-6">
              <p className="text-[11px] uppercase tracking-[0.16em] text-muted">{job.company}</p>
              <h3 className="mt-1 font-display text-xl font-semibold">
                {job.role} <span className="text-muted">({job.dates})</span>
              </h3>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
