"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { locales } from "../config";

const ChangeLanguage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const currentLocale = pathname.split("/")[1].split("-")[0];

  const handleLanguageChange = (locale: string) => {
    const newPath = pathname.replace(/^\/[^\/]+/, `/${locale}`);
    router.push(newPath);
    setIsOpen(false);
  };

  return (
    <div className="absolute top-4 right-4 min-w-[100px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-fuchsia-500/50 text-fuchsia-500 rounded-md w-full"
      >
        {currentLocale.toUpperCase()}
      </button>
      {isOpen && (
        <ul className="absolute mt-2 w-full bg-fuchsia-500/75 border border-fuchsia-900 rounded-md shadow-lg z-50">
          {locales.map((locale) => (
            <li key={locale}>
              <button
                onClick={() => handleLanguageChange(locale)}
                className="w-full text-left text-fuchsia-300 px-4 py-2 hover:bg-fuchsia-900"
              >
                {locale.toUpperCase()}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChangeLanguage;
