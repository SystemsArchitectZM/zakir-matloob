"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { type FormEvent, useState } from "react";
import { Magnetic } from "@/components/magnetic";
import { site } from "@/lib/data";
import { cn } from "@/lib/utils";

const topics = ["Platforms", "AI systems", "SAP"] as const;

export function ContactPanel({
  priority = false,
  page = false,
}: {
  priority?: boolean;
  page?: boolean;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [selected, setSelected] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    const note = String(data.message ?? "");
    const regarding = selected.length ? `Regarding: ${selected.join(", ")}\n\n` : "";
    const payload = {
      name: data.name,
      email: data.email,
      message: `${regarding}${note}`,
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Could not send");
      setStatus("success");
      setSelected([]);
      form.reset();
    } catch {
      const subject = encodeURIComponent(`Portfolio note from ${data.name ?? ""}`);
      const body = encodeURIComponent(payload.message);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      setStatus("success");
    }
  }

  return (
    <section
      id="contact"
      className={cn(
        "relative overflow-hidden bg-paper text-ink",
        page ? "pb-24 pt-28 md:pb-32 md:pt-36" : "py-24 md:py-32",
      )}
    >
      <div className="paper-grid pointer-events-none absolute inset-0 opacity-70" />
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[min(52%,640px)] lg:block">
        <Image
          src="/images/contact-bg.png"
          alt=""
          fill
          sizes="(max-width: 1024px) 0px, 52vw"
          priority={priority}
          className="object-cover object-center opacity-[0.14]"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-paper/30 via-paper/75 to-paper" />
      </div>
      <p
        aria-hidden
        className="pointer-events-none absolute -bottom-[10%] right-[-4%] select-none font-condensed text-[min(42vw,22rem)] leading-none text-transparent [-webkit-text-stroke:1px_rgba(226,58,18,0.18)]"
      >
        WRITE
      </p>

      <div className="relative mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="flex flex-col gap-4 border-b border-black/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            05 / Contact
          </p>
          <p className="flex items-start gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted sm:items-center">
            <span className="relative mt-1 flex size-2 shrink-0 sm:mt-0">
              <span className="absolute inset-0 animate-ping rounded-full bg-orange/70 [animation-duration:2.4s] motion-reduce:animate-none" />
              <span className="relative size-2 rounded-full bg-orange" />
            </span>
            <span>
              <span className="sm:hidden">Open for selected work</span>
              <span className="hidden sm:inline">
                Open for selected work · {site.location}
              </span>
            </span>
          </p>
        </div>

        <div className="mt-12 grid items-start gap-10 lg:mt-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-x-20 lg:gap-y-12">
          <div>
            <h2 className="font-condensed text-[clamp(3.4rem,10vw,7.5rem)] leading-[0.82]">
              <span className="block">Start a</span>
              <span className="font-editorial text-[0.62em] italic leading-none tracking-normal text-orange">
                conversation.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-ink/70 md:text-[15px]">
              For platforms, AI systems, or SAP-adjacent work. I read every note.
              If the form is quiet, write me directly.
            </p>
          </div>

          <div className="lg:row-span-2 lg:border-l lg:border-black/10 lg:pl-12 xl:pl-16">
            {status === "success" ? (
              <div aria-live="polite">
                <p className="font-condensed text-6xl leading-none md:text-7xl">Sent.</p>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink/70">
                  Thank you. I will reply to the address you left.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="mt-8 inline-flex items-center gap-2 text-sm text-ink/80 transition hover:text-orange"
                >
                  Write another
                  <ArrowUpRight className="size-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-8">
                <LineField name="name" index="01" label="Name" required />
                <LineField name="email" index="02" label="Email" type="email" required />
                <LineField name="message" index="03" label="Note" textarea required />

                <fieldset>
                  <legend className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                    About
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {topics.map((topic) => {
                      const active = selected.includes(topic);
                      return (
                        <button
                          key={topic}
                          type="button"
                          aria-pressed={active}
                          onClick={() =>
                            setSelected((current) =>
                              current.includes(topic)
                                ? current.filter((item) => item !== topic)
                                : [...current, topic],
                            )
                          }
                          className={cn(
                            "rounded-full border px-3 py-1.5 text-[12px] transition",
                            active
                              ? "border-orange bg-orange text-white"
                              : "border-black/15 bg-white/70 text-ink/75 hover:border-black/35 hover:text-ink",
                          )}
                        >
                          {topic}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <Magnetic strength={12}>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className={cn(
                      "group inline-flex items-center gap-4 text-left",
                      status === "loading" && "opacity-60",
                    )}
                  >
                    <span className="flex size-12 items-center justify-center rounded-full border border-black/15 bg-white transition group-hover:border-orange group-hover:bg-orange group-hover:text-white">
                      <ArrowUpRight className="size-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-medium">
                        {status === "loading" ? "Sending…" : "Send the note"}
                      </span>
                      <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                        Direct to inbox
                      </span>
                    </span>
                  </button>
                </Magnetic>
              </form>
            )}
          </div>

          <ul className="divide-y divide-black/10 border-y border-black/10">
            <li>
              <button
                type="button"
                onClick={copyEmail}
                className="group flex w-full items-center justify-between gap-4 py-4 text-left"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Email
                </span>
                <span className="min-w-0 truncate text-sm text-ink group-hover:text-orange">
                  {copied ? "Copied to clipboard" : site.email}
                </span>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.16em] text-orange">
                  {copied ? "Done" : "Copy"}
                </span>
              </button>
            </li>
            <ChannelRow label="GitHub" href={site.socials.github} value="ZakirCodeArchitect" />
            <ChannelRow label="LinkedIn" href={site.socials.linkedin} value="zakir-matloob" />
          </ul>
        </div>
      </div>
    </section>
  );
}

function ChannelRow({
  label,
  href,
  value,
}: {
  label: string;
  href: string;
  value: string;
}) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="group flex items-center justify-between gap-4 py-4"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
          {label}
        </span>
        <span className="min-w-0 truncate text-sm text-ink group-hover:text-orange">
          {value}
        </span>
        <ArrowUpRight className="size-4 shrink-0 text-ink/30 transition group-hover:text-orange" />
      </a>
    </li>
  );
}

function LineField({
  name,
  index,
  label,
  type = "text",
  textarea,
  required,
}: {
  name: string;
  index: string;
  label: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const cls =
    "contact-line mt-2 w-full resize-none border-0 border-b border-black/15 bg-transparent pb-3 text-[15px] text-ink caret-orange outline-none transition-colors placeholder:text-ink/35 focus:border-orange";

  return (
    <label className="block">
      <span className="flex items-baseline gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
        <span className="text-orange">{index}</span>
        {label}
      </span>
      {textarea ? (
        <textarea
          name={name}
          placeholder="What should we build?"
          required={required}
          rows={3}
          className={cls}
        />
      ) : (
        <input
          name={name}
          type={type}
          placeholder={label}
          required={required}
          className={cls}
        />
      )}
    </label>
  );
}
