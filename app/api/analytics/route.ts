import { NextResponse } from "next/server";

const allowedEvents = new Set([
  "page_view",
  "whatsapp_click",
  "filter_submit",
  "detail_view",
  "report_download",
  "form_start",
  "form_submit"
]);

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const event = typeof body?.event === "string" ? body.event : "";

  if (!allowedEvents.has(event)) {
    return NextResponse.json({ accepted: false }, { status: 400 });
  }

  if (process.env.NODE_ENV === "development") {
    console.info("[analytics]", {
      event,
      href: typeof body?.href === "string" ? body.href : undefined,
      path: typeof body?.path === "string" ? body.path : undefined,
      source: typeof body?.source === "string" ? body.source : undefined
    });
  }

  return NextResponse.json({ accepted: true });
}
