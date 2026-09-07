import Image from "next/image";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/page-header";
import { journal } from "@/lib/data";

export function generateStaticParams() {
  return journal.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = journal.find((item) => item.slug === slug);
  return { title: post?.title ?? "Journal" };
}

export default async function JournalPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = journal.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <main className="bg-paper">
      <article className="mx-auto max-w-[760px] px-5 pb-24 pt-28 md:px-8 md:pt-36">
        <BackLink href="/journal" label="All notes" />
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-muted">
          {post.date} · {post.read}
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">{post.title}</h1>
        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl">
          <Image src={post.image} alt="" fill sizes="(max-width: 760px) 100vw, 760px" className="object-cover" key={post.image} priority />
        </div>
        <div className="mt-10 space-y-6 text-base leading-8 text-ink/85 md:text-lg">
          {post.body.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
