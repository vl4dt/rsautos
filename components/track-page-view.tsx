"use client";

import { useEffect } from "react";

export function TrackPageView({
  event,
  source
}: {
  event: string;
  source?: string;
}) {
  useEffect(() => {
    void fetch("/api/analytics", {
      body: JSON.stringify({
        event,
        occurredAt: new Date().toISOString(),
        path: window.location.pathname,
        source
      }),
      headers: { "Content-Type": "application/json" },
      keepalive: true,
      method: "POST"
    });
  }, [event, source]);

  return null;
}
