import { mkdir, readdir, stat, unlink } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { spawn } from "node:child_process";
import puppeteer from "puppeteer";

const rootDir = process.cwd();
const defaultInputDir = path.resolve(rootDir, "notes/html");
const defaultOutputDir = path.resolve(rootDir, "notes/pdf");
const defaultZipName = "notatki-chemia-z-wero.zip";

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

function toTitleCase(topic) {
  const lowercased = topic.toLocaleLowerCase("pl-PL");
  const smallWords = new Set(["i", "oraz", "a", "w", "z", "na", "do", "od", "u", "o"]);
  return lowercased
    .split(/\s+/)
    .map((word, index) => {
      if (!word) {
        return "";
      }
      if (index > 0 && smallWords.has(word)) {
        return word;
      }
      return `${word.charAt(0).toLocaleUpperCase("pl-PL")}${word.slice(1)}`;
    })
    .join(" ");
}

function normalizeTopicTitle(rawTitle) {
  const withoutDecorators = rawTitle
    .replaceAll("—", " ")
    .replaceAll("–", " ")
    .replaceAll("-", " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!withoutDecorators) {
    return "";
  }

  const hasLowercase = /[a-ząćęłńóśźż]/.test(withoutDecorators);
  return hasLowercase ? withoutDecorators : toTitleCase(withoutDecorators);
}

function buildFooterTemplate(sectionSummary) {
  const safeSummary = escapeHtml(trimForFooter(sectionSummary));
  return `
    <div style="width: 100%; padding: 0 12mm; box-sizing: border-box; font-family: 'Nunito', Arial, sans-serif; color: #1c3148;">
      <div style="width: 100%; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; padding-top: 2px; line-height: 1.2;">
        <span style="display: inline-flex; align-items: center; justify-self: start; gap: 6px; min-width: 0; height: 16px;">
          <span style="position: relative; width: 16px; height: 16px; display: inline-block; flex-shrink: 0;">
            <span style="position: absolute; top: -3px; left: 9px; width: 3px; height: 3px; border-radius: 9999px; background: #d3d3c7;"></span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" style="display: block;">
            <defs>
              <linearGradient id="logoGradientPdfFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#F4B942"></stop>
                <stop offset="100%" stop-color="#f7d486"></stop>
              </linearGradient>
            </defs>
            <rect width="24" height="24" rx="8" fill="url(#logoGradientPdfFooter)"></rect>
            <g fill="none" stroke="#1A3B47" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" transform="translate(2.5 2.5) scale(0.79)">
              <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"></path>
              <path d="M6.453 15h11.094"></path>
              <path d="M8.5 2h7"></path>
            </g>
            </svg>
          </span>
          <span style="display: inline-block; font-size: 8px; font-weight: 800; letter-spacing: 0.4px; line-height: 1; color: #e07b39; white-space: nowrap;">chemiazwero.com</span>
        </span>
        <span style="font-size: 8.2px; font-weight: 700; color: #1c3148; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 100%;">${safeSummary}</span>
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

function createZipArchive(outputDir, filePaths) {
  return new Promise((resolve, reject) => {
    const zipPath = path.join(outputDir, defaultZipName);
    const zipArgs = ["-j", "-q", zipPath, ...filePaths];
    const zipProcess = spawn("zip", zipArgs, { stdio: "pipe" });

    let stderr = "";
    zipProcess.stderr.on("data", (chunk) => {
      stderr += chunk.toString("utf8");
    });

    zipProcess.on("error", (error) => {
      reject(
        new Error(
          `Nie udalo sie uruchomic polecenia "zip". Zainstaluj narzedzie zip i sprobuj ponownie. (${error.message})`
        )
      );
    });

    zipProcess.on("close", (code) => {
      if (code === 0) {
        resolve(zipPath);
        return;
      }

      reject(
        new Error(
          `Tworzenie archiwum ZIP zakonczone bledem (kod ${code}). ${stderr.trim()}`.trim()
        )
      );
    });
  });
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
  const generatedPdfPaths = [];

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
      await page.addStyleTag({
        content: `
          .footer,
          .logo-footer {
            display: none !important;
          }
        `,
      });
      const sectionSummary = await page.$$eval(".main-title", (nodes) => {
        const titles = nodes
          .map((node) => node.textContent?.replace(/\s+/g, " ").trim() ?? "")
          .filter(Boolean);
        return titles.join(" · ");
      });
      const normalizedSectionSummary = sectionSummary
        .split(" · ")
        .map((title) => normalizeTopicTitle(title))
        .filter(Boolean)
        .join(" · ");
      const fallbackSummary = toTitleCase(
        path.basename(inputFile, path.extname(inputFile)).replaceAll("_", " ")
      );

      await page.pdf({
        path: outPath,
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
        displayHeaderFooter: true,
        headerTemplate: "<div></div>",
        footerTemplate: buildFooterTemplate(normalizedSectionSummary || fallbackSummary),
        margin: {
          top: "14mm",
          right: "12mm",
          bottom: "18mm",
          left: "12mm",
        },
      });

      await page.close();
      generatedPdfPaths.push(outPath);
      console.log(`OK: ${path.relative(rootDir, inputFile)} -> ${path.relative(rootDir, outPath)}`);
    }
  } finally {
    await browser.close();
  }

  const zipPath = path.join(outputDir, defaultZipName);
  try {
    await unlink(zipPath);
  } catch (error) {
    if (!(error && typeof error === "object" && "code" in error && error.code === "ENOENT")) {
      throw error;
    }
  }

  const createdZipPath = await createZipArchive(outputDir, generatedPdfPaths);
  console.log(`ZIP: ${path.relative(rootDir, createdZipPath)}`);
}

main().catch((error) => {
  console.error("Blad generowania PDF:", error);
  process.exit(1);
});
