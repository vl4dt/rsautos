"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

type AnalyticsPayload = {
  event: string;
  path: string;
  href?: string;
  source?: string;
  label?: string;
};

export function AnalyticsListener() {
  const pathname = usePathname();

  useEffect(() => {
    trackEvent({
      event: "page_view",
      path: `${pathname}${window.location.search}`
    });
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const link = target.closest("a");

      if (!link) {
        return;
      }

      const href = link.getAttribute("href") ?? "";
      const configuredEvent = link.dataset.analyticsEvent;
      const isWhatsapp = href.includes("wa.me/");

      if (!configuredEvent && !isWhatsapp) {
        return;
      }

      trackEvent({
        event: configuredEvent ?? "whatsapp_click",
        href,
        label: link.textContent?.trim() ?? undefined,
        path: window.location.pathname,
        source: link.dataset.leadSource
      });
    }

    function handleSubmit(event: SubmitEvent) {
      const target = event.target;

      if (!(target instanceof HTMLFormElement)) {
        return;
      }

      const eventName = target.dataset.analyticsEvent;

      if (!eventName) {
        return;
      }

      trackEvent({
        event: eventName,
        path: window.location.pathname,
        source: target.dataset.leadSource
      });
    }

    document.addEventListener("click", handleClick);
    document.addEventListener("submit", handleSubmit);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("submit", handleSubmit);
    };
  }, []);

  return null;
}

function trackEvent(payload: AnalyticsPayload) {
  const body = JSON.stringify({
    ...payload,
    occurredAt: new Date().toISOString()
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/analytics", new Blob([body], { type: "application/json" }));
    return;
  }

  void fetch("/api/analytics", {
    body,
    headers: { "Content-Type": "application/json" },
    keepalive: true,
    method: "POST"
  });
}
