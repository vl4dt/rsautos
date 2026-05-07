import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const forbiddenTerms = ["usaAuctionPrice", "priceBreakdown"];
const scanRoots = ["app", "components", "lib"];
const allowedFiles = new Set([]);
const findings = [];

for (const root of scanRoots) {
  scanDirectory(root);
}

function scanDirectory(directory) {
  for (const entry of readdirSync(directory)) {
    const fullPath = join(directory, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      scanDirectory(fullPath);
      continue;
    }

    if (!/\.(ts|tsx|js|jsx|mjs)$/.test(entry)) {
      continue;
    }

    const normalizedPath = relative(process.cwd(), fullPath).replaceAll("\\", "/");

    if (allowedFiles.has(normalizedPath)) {
      continue;
    }

    const content = readFileSync(fullPath, "utf8");

    forbiddenTerms.forEach((term) => {
      if (content.includes(term)) {
        findings.push(`${normalizedPath}: contains ${term}`);
      }
    });
  }
}

if (findings.length) {
  console.error("Privacy scan failed. Public app code references internal fields:");
  findings.forEach((finding) => console.error(`- ${finding}`));
  process.exit(1);
}

console.log("Privacy scan passed. No public app references to internal acquisition fields.");
