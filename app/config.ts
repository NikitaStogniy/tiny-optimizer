import { Pathnames, LocalePrefix } from "next-intl/routing";

export const defaultLocale = "en" as const;
export const locales = [
  "en",
  "de",
  "ru",
  "es",
  "fr",
  "it",
  "pt",
  "zh",
  "ja",
] as const;

export const pathnames: Pathnames<typeof locales> = {
  "/": "/",
  "/pathnames": {
    en: "/pathnames",
    de: "/pfadnamen",
    ru: "/пути",
    es: "/rutas",
    fr: "/chemins",
    it: "/percorsi",
    pt: "/caminhos",
    zh: "/路径",
    ja: "/パス",
  },
};

export const localePrefix: LocalePrefix<typeof locales> = "always";

export const host = process.env.NEXT_PUBLIC_API_URL;
