import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from "react-compare-slider";
import OptimisationComp from "../components/OptimisationComp";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

const img_src = `${process.env.NEXT_PUBLIC_API_URL}/santaLucia.jpg`;

import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "Meta" });

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
  };
}

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("HomePage");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">{t("title")}</h1>
      <div className="flex flex-col items-center justify-center max-h-[500px] h-auto w-[300px] rounded-lg bg-clip-border overflow-clip overflow-hidden">
        <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage
              src={img_src}
              srcSet={img_src}
              alt="Image one"
            />
          }
          itemTwo={
            <ReactCompareSliderImage
              src={img_src}
              srcSet={img_src}
              alt="Image two"
            />
          }
        />
      </div>
      <OptimisationComp />
    </main>
  );
}
