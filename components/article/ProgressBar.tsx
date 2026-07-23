"use client";

import { useEffect, useState } from "react";

/** Fixed reading-progress bar, mirrors the original export's scroll indicator. */
export default function ProgressBar() {
  const [width, setWidth] = useState("0%");

  useEffect(() => {
    const onScroll = () => {
      const el = document.scrollingElement || document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const p = max > 0 ? Math.min(100, Math.max(0, (el.scrollTop / max) * 100)) : 0;
      setWidth(p.toFixed(2) + "%");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div className="progress-bar" style={{ width }} aria-hidden="true" />;
}
