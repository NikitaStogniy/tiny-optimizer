import { memo, useEffect } from "react";
import ImageComp from "./ImageComp";
import { useTranslations } from "next-intl";
import { useUploadedContext } from "../context/UploadedContext";
import { Spinner } from "./Spinner";

export interface optimizedImage {
  url: string;
  type: string;
  name: string;
}

interface ResultBlockProps {
  optimizedImages: optimizedImage[];
  handleDownload: () => void;
  deleteImage: (url: string) => void;
}

const ResultBlock = ({
  optimizedImages,
  handleDownload,
  deleteImage,
}: ResultBlockProps) => {
  const { setIsLoading, uploadedImages } = useUploadedContext();

  useEffect(() => {
    if (optimizedImages.length === uploadedImages.length) {
      setIsLoading(false);
    }
  }, [optimizedImages]);

  const t = useTranslations("Common");
  return (
    <div className="flex flex-col items-start justify-start gap-2 my-4">
      <div className="flex flex-row items-start justify-between gap-2 w-full">
        <h2 className="text-2xl font-bold">{t("optimizedimages")}</h2>
        <button
          aria-label={t("downloadzip")}
          className="bg-fuchsia-900 text-fuchsia-500 px-4 py-2 rounded-full"
          onClick={handleDownload}
        >
          {t("downloadzip")}
        </button>
      </div>
      <div className="grid lg:grid-cols-4 grid-cols-1 mx-auto md:grid-cols-2 gap-2">
        {uploadedImages
          .filter(
            (image) =>
              !optimizedImages.some(
                (optimizedImage) => optimizedImage.name === image.file.name
              )
          )
          .map((image, index) => (
            <div
              data-name={image.file.name}
              key={index}
              className="flex flex-col items-start justify-start gap-2 relative"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-fuchsia-900/50 z-10 flex justify-center items-center">
                <Spinner />
              </div>
              <ImageComp
                name={image.file.name}
                url={URL.createObjectURL(image.file)} // Convert File to URL string
                index={index}
                type={image.type}
                deleteImage={deleteImage}
              />
            </div>
          ))}
        {optimizedImages.map((image, index) => (
          <div
            data-name={image.name || "test"}
            key={index}
            className="flex flex-col items-start justify-start gap-2"
          >
            <ImageComp
              name={image.name}
              url={image.url}
              index={index}
              type={image.type}
              deleteImage={deleteImage}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(ResultBlock);
