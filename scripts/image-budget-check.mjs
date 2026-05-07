import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const imageRoot = "public/images/rs-autos";
const maxImageBytes = Number(process.env.IMAGE_BUDGET_BYTES ?? 900_000);
const failures = [];

for (const file of readdirSync(imageRoot)) {
  const fullPath = join(imageRoot, file);
  const stat = statSync(fullPath);

  if (!stat.isFile()) {
    continue;
  }

  if (!/\.(png|jpe?g|webp|avif)$/i.test(file)) {
    continue;
  }

  if (stat.size > maxImageBytes) {
    failures.push(`${file}: ${stat.size} bytes exceeds ${maxImageBytes}`);
  }
}

if (failures.length) {
  console.error("Image budget failures:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Image budget passed for ${imageRoot}. Limit: ${maxImageBytes} bytes.`);
