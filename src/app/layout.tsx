import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Providers } from "@/components/providers";
import "./globals.css";
import { site } from "@/lib/data";

const syne = localFont({
  src: "./fonts/syne.woff2",
  variable: "--font-syne",
  weight: "500 800",
  display: "swap",
});

const bricolage = localFont({
  src: "./fonts/bricolage-grotesque.woff2",
  variable: "--font-bricolage",
  weight: "200 800",
  display: "swap",
});

const instrumentSerif = localFont({
  src: [
    {
      path: "./fonts/instrument-serif.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/instrument-serif-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-instrument-serif",
  display: "swap",
});

const bebas = localFont({
  src: "./fonts/bebas-neue.woff2",
  variable: "--font-bebas",
  weight: "400",
  display: "swap",
});

const jost = localFont({
  src: "./fonts/jost.woff2",
  variable: "--font-jost",
  weight: "300 400",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.name }],
  openGraph: {
    title: site.name,
    description: site.description,
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${syne.variable} ${bricolage.variable} ${instrumentSerif.variable} ${bebas.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper text-ink">
        <Providers>{children}</Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
