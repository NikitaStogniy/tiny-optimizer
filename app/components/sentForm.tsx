"use client";
//TODO MOVE EVERYTHING ON EACH PLACE

import { useEffect, useState } from "react";
import { optimizeImage } from "../utils/optimise";
import Image from "next/image";
import JSZip from "jszip";

const SentForm = () => {
  const [optimizedImages, setOptimizedImages] = useState<string[]>([]);

  const handleOptimize = async (formData: FormData) => {
    const files = formData.getAll("file") as File[];

    for (const file of files) {
      const fileFormData = new FormData();
      fileFormData.append("file", file);

      const result = await optimizeImage(fileFormData);

      if (result) {
        const blob = await fetch(
          `data:${result.contentType};base64,${result.base64Data}`
        ).then((res) => res.blob());
        const url = URL.createObjectURL(blob);
        setOptimizedImages((prev) => [...prev, url]);
      }
    }
  };

  const handleDownload = async () => {
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

  return (
    <div className="flex flex-col items-start justify-start gap-2">
      <form action={handleOptimize}>
        <input type="file" name="file" multiple />
        <button type="submit">Optimize</button>
      </form>
      <div className="flex flex-col items-start justify-start gap-2">
        <p>Output images</p>
        <button onClick={handleDownload}>Download ZIP</button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {optimizedImages.map((url, index) => (
          <div
            key={index}
            className="flex flex-col items-start justify-start gap-2"
          >
            <p>Optimized Image {index + 1}</p>
            <Image
              className="rounded-md"
              width={300}
              height={300}
              src={url}
              alt={`optimized-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SentForm;
