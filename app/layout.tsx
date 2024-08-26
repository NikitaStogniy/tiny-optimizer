import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
const inter = Inter({ subsets: ["latin"] });
import { SpeedInsights } from "@vercel/speed-insights/next";
import GoogleAdsense from "./utils/GoogleAdsense";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata = {
  title: "Compress your images with ease",
  description:
    "Optimize your images effortlessly with our powerful compression tool. Reduce file sizes, improve loading times, and enhance your website's performance without compromising quality. Perfect for web developers, designers, and content creators looking to streamline their image assets.",
  keywords:
    "image compression, image optimizer, file size reduction, web performance, compress image, compress png, compress jpg, compress jpeg, compress webp, compress gif, compress svg, compress bmp, compress tiff, compress webp, compress png, compress jpg, compress jpeg, compress gif, compress svg, compress bmp, compress tiff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics
        gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ""}
      />
      <GoogleAdsense pId={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID || ""} />
      <SpeedInsights />
      <Analytics />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
