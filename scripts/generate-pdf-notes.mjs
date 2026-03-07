import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import puppeteer from "puppeteer";

const rootDir = process.cwd();
const defaultInputDir = path.resolve(rootDir, "notes/html");
const defaultOutputDir = path.resolve(rootDir, "notes/pdf");

function toPdfName(fileName) {
  const base = path.basename(fileName, path.extname(fileName));
  return `${base}.pdf`;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function trimForFooter(value, maxLength = 180) {
  if (value.length <= maxLength) {
    return value;
  }
  return `${value.slice(0, maxLength - 1)}…`;
}

function buildFooterTemplate(sectionSummary) {
  const safeSummary = escapeHtml(trimForFooter(sectionSummary));
  return `
    <div style="width: 100%; padding: 0 12mm; box-sizing: border-box; font-family: 'Nunito', Arial, sans-serif; color: #1c3148;">
      <div style="width: 100%; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; padding-top: 3px; line-height: 1.3;">
        <span style="display: inline-flex; align-items: center; justify-self: start; gap: 6px; min-width: 0; height: 14px;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" style="display: block; flex-shrink: 0;">
            <defs>
              <linearGradient id="logoGradientPdfFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#F4B942"></stop>
                <stop offset="100%" stop-color="#f7d486"></stop>
              </linearGradient>
            </defs>
            <rect width="24" height="24" rx="4" fill="url(#logoGradientPdfFooter)"></rect>
            <g fill="none" stroke="#1A3B47" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"></path>
              <path d="M6.453 15h11.094"></path>
              <path d="M8.5 2h7"></path>
            </g>
          </svg>
          <span style="display: inline-block; font-size: 8px; font-weight: 800; letter-spacing: 0.4px; line-height: 1; color: #e07b39; white-space: nowrap;">chemiazwero.com</span>
        </span>
        <span style="font-size: 8.5px; font-weight: 700; color: #1c3148; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;">${safeSummary}</span>
        <span style="justify-self: end; font-size: 8px; font-weight: 800; letter-spacing: 0.6px; color: #e07b39; white-space: nowrap;">strona <span class="pageNumber"></span>/<span class="totalPages"></span></span>
      </div>
    </div>
  `;
}

async function isHtmlFile(filePath) {
  try {
    const fileInfo = await stat(filePath);
    return fileInfo.isFile() && path.extname(filePath).toLowerCase() === ".html";
  } catch {
    return false;
  }
}

async function resolveInputFiles(inputArg) {
  if (!inputArg) {
    const entries = await readdir(defaultInputDir, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".html"))
      .map((entry) => path.join(defaultInputDir, entry.name))
      .sort((a, b) => a.localeCompare(b));
  }

  const normalizedInput = path.resolve(rootDir, inputArg);
  const looksLikeDirectory = path.extname(normalizedInput) === "";

  if (looksLikeDirectory) {
    const entries = await readdir(normalizedInput, { withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".html"))
      .map((entry) => path.join(normalizedInput, entry.name))
      .sort((a, b) => a.localeCompare(b));
  }

  if (await isHtmlFile(normalizedInput)) {
    return [normalizedInput];
  }

  return [];
}

async function main() {
  const [inputArg, outputArg] = process.argv.slice(2);
  const outputDir = outputArg
    ? path.resolve(rootDir, outputArg)
    : defaultOutputDir;

  const inputFiles = await resolveInputFiles(inputArg);

  if (inputFiles.length === 0) {
    const scope = inputArg ? `dla "${inputArg}"` : `w "${defaultInputDir}"`;
    console.error(`Nie znaleziono plikow HTML ${scope}.`);
    process.exit(1);
  }

  await mkdir(outputDir, { recursive: true });

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });

  try {
    for (const inputFile of inputFiles) {
      const page = await browser.newPage();
      const fileUrl = pathToFileURL(inputFile).href;
      const outPath = path.join(outputDir, toPdfName(inputFile));

      await page.goto(fileUrl, { waitUntil: "networkidle0" });
      await page.emulateMediaType("print");
      const sectionSummary = await page.$$eval(".main-title", (nodes) => {
        const titles = nodes
          .map((node) => node.textContent?.replace(/\s+/g, " ").trim() ?? "")
          .filter(Boolean);
        return titles.join(" · ");
      });
      const fallbackSummary = path.basename(inputFile, path.extname(inputFile)).replaceAll("_", " ");

      await page.pdf({
        path: outPath,
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
        displayHeaderFooter: true,
        headerTemplate: "<div></div>",
        footerTemplate: buildFooterTemplate(sectionSummary || fallbackSummary),
        margin: {
          top: "14mm",
          right: "12mm",
          bottom: "18mm",
          left: "12mm",
        },
      });

      await page.close();
      console.log(`OK: ${path.relative(rootDir, inputFile)} -> ${path.relative(rootDir, outPath)}`);
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error("Blad generowania PDF:", error);
  process.exit(1);
});
