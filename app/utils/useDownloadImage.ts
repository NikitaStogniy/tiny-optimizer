import JSZip from "jszip";
import { optimizedImage } from "../components/ResultBlock";

export const useDownloadImageZip = async (
  optimizedImages: optimizedImage[]
) => {
  const zip = new JSZip();

  for (let i = 0; i < optimizedImages.length; i++) {
    const response = await fetch(optimizedImages[i].url);
    const blob = await response.blob();
    zip.file(`optimized_image_${i + 1}.${optimizedImages[i].type}`, blob);
  }

  const content = await zip.generateAsync({ type: "blob" });

  const url = URL.createObjectURL(content);
  const a = document.createElement("a");
  a.href = url;
  a.download = "optimized_images.zip";
  a.click();
  URL.revokeObjectURL(url);
};

export const useDownloadImage = (url: string, type: string, index: number) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = `optimized-${index + 1}.${type}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
