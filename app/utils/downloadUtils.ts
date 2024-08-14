import JSZip from "jszip";

export const downloadOptimizedImages = async (optimizedImages: string[]) => {
  const zip = new JSZip();

  for (let i = 0; i < optimizedImages.length; i++) {
    const response = await fetch(optimizedImages[i]);
    const blob = await response.blob();
    zip.file(`optimized_image_${i + 1}.png`, blob);
  }

  const content = await zip.generateAsync({ type: "blob" });

  const url = URL.createObjectURL(content);
  const a = document.createElement("a");
  a.href = url;
  a.download = "optimized_images.zip";
  a.click();
  URL.revokeObjectURL(url);
};
