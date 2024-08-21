import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { locales } from "./app/config";

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./app/locales/${locale}.json`)).default,
  };
});
