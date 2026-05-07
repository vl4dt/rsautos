const baseUrl = process.env.SMOKE_BASE_URL ?? "http://localhost:3000";

const routes = [
  { path: "/", text: "Vehiculos importados" },
  { path: "/inventory", text: "Inventario transparente" },
  { path: "/importamos-tu-auto", text: "Importamos tu auto" },
  { path: "/sobre-nosotros", text: "Transparencia para comprar mejor" },
  { path: "/contacto", text: "Contacto directo" },
  { path: "/robots.txt", text: "User-Agent" },
  { path: "/sitemap.xml", text: "<urlset" },
  {
    path: "/api/import-estimate?vehicleValueUsd=20000",
    text: "estimatedTotalUsd"
  },
  {
    path: "/api/vin/decode?vin=INVALID",
    status: 400,
    text: "VIN invalido"
  }
];

const detailSlug = process.env.SMOKE_DETAIL_SLUG;

if (detailSlug) {
  routes.push(
    { path: `/inventory/${detailSlug}`, text: "Ficha transparente" },
    { path: `/inventory/${detailSlug}/report`, contentType: "application/pdf" }
  );
}

const failures = [];

for (const route of routes) {
  const url = new URL(route.path, baseUrl);
  const response = await fetch(url);
  const expectedStatus = route.status ?? 200;

  if (response.status !== expectedStatus) {
    failures.push(`${route.path}: expected ${expectedStatus}, got ${response.status}`);
    continue;
  }

  if (route.contentType) {
    const contentType = response.headers.get("content-type") ?? "";

    if (!contentType.includes(route.contentType)) {
      failures.push(`${route.path}: expected content-type ${route.contentType}`);
    }

    continue;
  }

  if (route.text) {
    const body = await response.text();

    if (!body.includes(route.text)) {
      failures.push(`${route.path}: missing text "${route.text}"`);
    }
  }
}

if (failures.length) {
  console.error("Smoke test failures:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Smoke tests passed for ${routes.length} routes at ${baseUrl}.`);
