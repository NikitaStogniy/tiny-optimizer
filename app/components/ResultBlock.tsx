import { memo } from "react";
import ImageComp from "./ImageComp";

export interface optimizedImage {
  url: string;
  type: string;
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
}: ResultBlockProps) => (
  <div className="flex flex-col items-start justify-start gap-2 my-4">
    <div className="flex flex-row items-start justify-between gap-2 w-full">
      <h2 className="text-2xl font-bold">Optimized images</h2>
      <button
        className="bg-fuchsia-900 text-fuchsia-500 px-4 py-2 rounded-full"
        onClick={handleDownload}
      >
        Download ZIP
      </button>
    </div>
    <div className="grid grid-cols-4 gap-2">
      {optimizedImages.map((image, index) => (
        <div
          key={index}
          className="flex flex-col items-start justify-start gap-2"
        >
          <ImageComp
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

export default memo(ResultBlock);
