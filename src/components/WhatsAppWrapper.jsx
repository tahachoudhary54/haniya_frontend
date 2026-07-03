"use client";

import { usePathname } from "next/navigation";
import WhatsAppWidget from "./WhatsAppWidget";

export default function WhatsAppWrapper() {
  const pathname = usePathname();
  // Hide on any admin route
  if (pathname.startsWith("/admin")) {
    return null;
  }
  return <WhatsAppWidget />;
}
