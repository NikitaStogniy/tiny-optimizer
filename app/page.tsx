"use client";

import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { useEffect } from "react";

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

  return (
    <div>
      <h1>Redirecting to your preferred language...</h1>
    </div>
  );
}
