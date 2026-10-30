"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/data";
import { cn } from "@/lib/utils";

function isDarkPage(pathname: string) {
  return (
    pathname === "/journal" ||
    pathname.startsWith("/work") ||
    pathname.startsWith("/experience")
  );
}

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const onHome = pathname === "/";
  const dark = open || isDarkPage(pathname);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  // Home uses the in-hero top bar + glass dock.
  if (onHome) return null;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          dark ? "bg-black text-white" : "bg-paper text-ink",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-20 md:px-8">
          <Link href="/" className="flex items-center gap-2 font-mono text-sm font-medium">
            <span className="opacity-50">{"{...}"}</span>
            <span className="uppercase">{site.name}.</span>
            <span className="size-2.5 shrink-0 bg-orange" />
          </Link>

          <nav className="hidden items-center gap-8 text-[13px] font-medium tracking-[0.14em] uppercase lg:flex">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative opacity-80 transition-opacity hover:opacity-100",
                    active && "opacity-100",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden items-center overflow-hidden rounded-full bg-white pl-4 text-sm font-medium text-ink shadow-sm sm:inline-flex"
            >
              <span className="pr-3 text-ink">Book a Call</span>
              <span className="flex size-10 items-center justify-center bg-orange text-white">
                <ArrowUpRight className="size-4" />
              </span>
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="flex size-10 items-center justify-center rounded-full border border-current/20 lg:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-ink text-white transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden",
          open ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <div className="flex h-full flex-col justify-between px-6 pb-10 pt-28">
          <nav className="flex flex-col gap-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="font-condensed text-[16vw] leading-[0.85]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-2 self-start rounded-full bg-orange px-5 py-3 text-sm font-medium"
          >
            Book a Call <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
