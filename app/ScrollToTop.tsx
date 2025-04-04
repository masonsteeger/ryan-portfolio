"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    const container = document.getElementById("site-container");
    if (container) container.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
