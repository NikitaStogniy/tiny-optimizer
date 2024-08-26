"use client";

import { memo, useState } from "react";
import { downloadImageZip } from "../utils/useDownloadImage";
import { handleOptimize } from "../utils/optimizeUtils";
import UploadForm from "./UploadForm";
import ResultBlock, { optimizedImage } from "./ResultBlock";
import { useTranslations } from "next-intl";
import { UploadedProvider } from "../context/UploadedContext";

const OptimisationComp = () => {
  const [optimizedImages, setOptimizedImages] = useState<optimizedImage[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsUploading(true);
    const formData = new FormData(event.currentTarget);
    await handleOptimize(formData, setOptimizedImages);
  };

  const handleDownload = () => {
    downloadImageZip(optimizedImages);
  };

  const handleDelete = (name: string) => {
    setOptimizedImages(optimizedImages.filter((image) => image.url !== name));
  };
  const t = useTranslations("Common");
  return (
    <UploadedProvider>
      <UploadForm onSubmit={onSubmit} />
      {optimizedImages.length > 0 && (
        <div key="result-block">
          {isUploading && optimizedImages.length === 0 && (
            <div className="text-fuchsia-500">{t("uploading")}</div>
          )}

          <ResultBlock
            optimizedImages={optimizedImages}
            handleDownload={handleDownload}
            deleteImage={handleDelete}
          />
        </div>
      )}
    </UploadedProvider>
  );
};

export default memo(OptimisationComp);
