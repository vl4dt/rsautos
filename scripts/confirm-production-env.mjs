import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const envFiles = [".env.production.local", ".env.local"];

for (const filename of envFiles) {
  const envPath = resolve(process.cwd(), filename);

  if (!existsSync(envPath)) {
    continue;
  }

  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmedLine = line.trim();

    if (
      !trimmedLine ||
      trimmedLine.startsWith("#") ||
      !trimmedLine.includes("=")
    ) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf("=");
    const name = trimmedLine.slice(0, separatorIndex).trim();
    const value = trimmedLine
      .slice(separatorIndex + 1)
      .trim()
      .replace(/^["']|["']$/g, "");

    process.env[name] ??= value;
  }
}

const envChecks = [
  {
    label: "Business name",
    name: "NEXT_PUBLIC_BUSINESS_NAME",
    expected: "RS Autos HN"
  },
  {
    label: "Primary market",
    name: "NEXT_PUBLIC_PRIMARY_MARKET",
    expected: "Honduras"
  },
  {
    label: "Business location",
    name: "NEXT_PUBLIC_BUSINESS_LOCATION",
    expected: "Santa Rosa de Copan, Copan"
  },
  {
    label: "WhatsApp phone",
    name: "NEXT_PUBLIC_CONTACT_PHONE",
    expected: "50489057397",
    validate: (value) => /^\d{8,15}$/.test(value)
  },
  {
    label: "Site URL",
    name: "NEXT_PUBLIC_SITE_URL",
    validate: (value) => {
      try {
        const url = new URL(value);
        return (
          url.protocol === "https:" &&
          !["localhost", "127.0.0.1", "::1"].includes(url.hostname)
        );
      } catch {
        return false;
      }
    }
  },
  {
    label: "Sanity project",
    name: "NEXT_PUBLIC_SANITY_PROJECT_ID",
    redact: true,
    validate: (value) => /^[a-z0-9-]+$/.test(value)
  },
  {
    label: "Sanity dataset",
    name: "NEXT_PUBLIC_SANITY_DATASET",
    expected: "production",
    validate: (value) => /^[a-z0-9_-]+$/.test(value)
  },
  {
    label: "Sanity API version",
    name: "NEXT_PUBLIC_SANITY_API_VERSION",
    expected: "2026-05-01"
  },
  {
    label: "ISR webhook secret",
    name: "SANITY_REVALIDATE_SECRET",
    secret: true,
    validate: (value) => value.length >= 24
  }
];

function maskValue(value, { redact = false, secret = false } = {}) {
  if (!value) {
    return "(missing)";
  }

  if (secret) {
    return `(set, ${value.length} characters)`;
  }

  if (redact) {
    return value.length <= 4
      ? "(set)"
      : `${value.slice(0, 2)}...${value.slice(-2)}`;
  }

  return value;
}

const rows = envChecks.map((check) => {
  const value = process.env[check.name]?.trim() ?? "";
  const matchesExpected = check.expected ? value === check.expected : true;
  const passesValidation = check.validate ? check.validate(value) : Boolean(value);
  const ok = Boolean(value) && matchesExpected && passesValidation;

  return {
    status: ok ? "OK" : "FAIL",
    label: check.label,
    variable: check.name,
    value: maskValue(value, check),
    expected:
      check.name === "NEXT_PUBLIC_SITE_URL"
        ? "production HTTPS URL"
        : (check.expected ?? "(valid value)")
  };
});

const maxLabelLength = Math.max(...rows.map((row) => row.label.length));
const maxVariableLength = Math.max(...rows.map((row) => row.variable.length));

console.log("Production environment confirmation");

for (const row of rows) {
  console.log(
    `${row.status.padEnd(4)} ${row.label.padEnd(maxLabelLength)}  ${row.variable.padEnd(
      maxVariableLength
    )}  ${row.value}  expected: ${row.expected}`
  );
}

const failedRows = rows.filter((row) => row.status !== "OK");

if (failedRows.length > 0) {
  console.error(
    `\n${failedRows.length} production environment value(s) need attention.`
  );
  process.exit(1);
}

console.log("\nAll production environment values are confirmed.");
