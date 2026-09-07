import puppeteer from "puppeteer-core";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const chrome =
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const outDir = path.resolve(".tmp-nav-shots");
await mkdir(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: chrome,
  headless: true,
  args: ["--window-size=1440,900"],
  defaultViewport: { width: 1440, height: 900 },
});

const pages = [
  { name: "journal", url: "http://localhost:43127/journal" },
  { name: "work", url: "http://localhost:43127/work" },
  { name: "case-study", url: "http://localhost:43127/work/ha-engagepro" },
  { name: "about", url: "http://localhost:43127/about" },
  { name: "journal-post", url: "http://localhost:43127/journal/rag-in-the-enterprise" },
  { name: "contact", url: "http://localhost:43127/contact" },
];

function headerInfo(header) {
  if (!header) return { missing: true };
  const s = getComputedStyle(header);
  return {
    color: s.color,
    backgroundColor: s.backgroundColor,
    className: header.className,
  };
}

for (const page of pages) {
  const tab = await browser.newPage();
  await tab.goto(page.url, { waitUntil: "networkidle0", timeout: 30000 });
  await tab.waitForSelector("header.fixed");
  const top = await tab.evaluate(headerInfo, await tab.$("header.fixed"));
  await tab.screenshot({ path: path.join(outDir, `${page.name}-top.png`) });

  await tab.evaluate(() => window.scrollTo(0, 800));
  await new Promise((r) => setTimeout(r, 700));
  const scrolled = await tab.evaluate(headerInfo, await tab.$("header.fixed"));
  await tab.screenshot({ path: path.join(outDir, `${page.name}-scrolled.png`) });

  console.log(JSON.stringify({ page: page.name, top, scrolled }, null, 2));
  await tab.close();
}

await browser.close();
