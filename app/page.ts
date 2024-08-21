"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

// This page only renders when the app is built statically (output: 'export')
export default function RootPage() {
  useEffect(() => {
    const userLang = navigator.language;
    const locale = userLang.startsWith("en")
      ? "en"
      : userLang.startsWith("es")
      ? "es"
      : "en";
    redirect(`/${locale}`);
  }, []);

  return null;
}
