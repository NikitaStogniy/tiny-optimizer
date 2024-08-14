import Image from "next/image";
import { memo } from "react";

interface ImageCompProps {
  url: string;
  index: number;
}

const downloadImage = (url: string, index: number) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = `optimized-${index + 1}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const ImageComp = ({ url, index }: ImageCompProps) => {
  return (
    <div className="flex flex-col items-start justify-start h-full relative">
      <div className="bg-violet-500/75 rounded-md absolute flex flex-row items-center justify-between bottom-2 left-2 p-2 gap-2">
        <p className="text-sm text-white">Optimized Image {index + 1}</p> |
        <button
          className="text-sm text-white font-bold"
          onClick={() => downloadImage(url, index)}
        >
          Download
        </button>
      </div>

      <Image
        className="rounded-md"
        width={300}
        height={300}
        src={url}
        alt={`optimized-${index + 1}`}
      />
    </div>
  );
};

export default memo(ImageComp);
