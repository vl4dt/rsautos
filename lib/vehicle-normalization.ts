const makeAcronyms = new Set(["BMW", "GMC", "RAM", "KIA"]);

export function formatVehicleMake(make: string) {
  const normalized = make.trim().replace(/\s+/g, " ");
  const upper = normalized.toUpperCase();

  if (makeAcronyms.has(upper)) {
    return upper;
  }

  return toTitleCase(normalized);
}

export function formatVehicleModel(model: string) {
  return model
    .trim()
    .replace(/\s+/g, " ")
    .split(" ")
    .map((part) => {
      const upper = part.toUpperCase();

      if (/^[A-Z0-9-]{2,}$/.test(upper) && /\d/.test(upper)) {
        return upper;
      }

      if (["LE", "SE", "SEL", "XLE", "EX", "EX-L", "SR5"].includes(upper)) {
        return upper;
      }

      return toTitleCase(part);
    })
    .join(" ");
}

function toTitleCase(value: string) {
  return value
    .toLowerCase()
    .replace(/\b[a-z]/g, (letter) => letter.toUpperCase());
}
