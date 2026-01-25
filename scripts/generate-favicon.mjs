import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const paths = JSON.parse(
  readFileSync(join(root, "src/icons/flaskConicalPaths.json"), "utf8")
);

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F4B942"/>
      <stop offset="100%" stop-color="#f7d486"/>
    </linearGradient>
  </defs>
  <rect width="24" height="24" rx="4" fill="url(#bg)"/>
  <g fill="none" stroke="#1A3B47" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
${paths.map((d) => `    <path d="${d}"/>`).join("\n")}
  </g>
</svg>
`;

writeFileSync(join(root, "public/favicon.svg"), svg.trimEnd() + "\n");
console.log("Generated public/favicon.svg from src/icons/flaskConicalPaths.json");
