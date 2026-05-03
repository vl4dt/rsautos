import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

for (const filename of [".env.production.local", ".env.local"]) {
  const envPath = resolve(process.cwd(), filename);

  if (!existsSync(envPath)) {
    continue;
  }

  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith("#") || !trimmedLine.includes("=")) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf("=");
    const name = trimmedLine.slice(0, separatorIndex).trim();
    const value = trimmedLine.slice(separatorIndex + 1).trim().replace(/^["']|["']$/g, "");

    process.env[name] ??= value;
  }
}

const requiredVars = [
  "NEXT_PUBLIC_SANITY_PROJECT_ID",
  "NEXT_PUBLIC_SANITY_DATASET",
  "NEXT_PUBLIC_SANITY_API_VERSION",
  "NEXT_PUBLIC_SITE_URL",
  "NEXT_PUBLIC_BUSINESS_NAME",
  "NEXT_PUBLIC_PRIMARY_MARKET",
  "NEXT_PUBLIC_BUSINESS_LOCATION",
  "NEXT_PUBLIC_CONTACT_PHONE",
  "SANITY_REVALIDATE_SECRET"
];

const missingVars = requiredVars.filter((name) => !process.env[name]?.trim());

const errors = missingVars.map((name) => `${name} is required.`);

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
if (projectId && !/^[a-z0-9-]+$/.test(projectId)) {
  errors.push("NEXT_PUBLIC_SANITY_PROJECT_ID must be a Sanity project id.");
}

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim();
if (dataset && !/^[a-z0-9_-]+$/.test(dataset)) {
  errors.push("NEXT_PUBLIC_SANITY_DATASET must be a valid Sanity dataset name.");
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
if (siteUrl) {
  try {
    const parsedUrl = new URL(siteUrl);

    if (
      parsedUrl.protocol !== "https:" ||
      ["localhost", "127.0.0.1", "::1"].includes(parsedUrl.hostname)
    ) {
      errors.push("NEXT_PUBLIC_SITE_URL must be a production HTTPS URL.");
    }
  } catch {
    errors.push("NEXT_PUBLIC_SITE_URL must be a valid absolute URL.");
  }
}

const contactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim();
if (contactPhone && !/^\d{8,15}$/.test(contactPhone)) {
  errors.push("NEXT_PUBLIC_CONTACT_PHONE must use digits only, including country code.");
}

const revalidateSecret = process.env.SANITY_REVALIDATE_SECRET?.trim();
if (revalidateSecret && revalidateSecret.length < 24) {
  errors.push("SANITY_REVALIDATE_SECRET must be at least 24 characters.");
}

if (errors.length > 0) {
  console.error("Production environment validation failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("Production environment validation passed.");
