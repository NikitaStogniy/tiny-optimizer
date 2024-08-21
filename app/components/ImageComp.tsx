import Image from "next/image";
import { memo } from "react";
import { LuDownload, LuTrash } from "react-icons/lu";
import { useDownloadImage } from "../utils/useDownloadImage";
import { useTranslations } from "next-intl";

interface ImageCompProps {
  url: string;
  index: number;
  type: string;
  deleteImage: (url: string) => void;
}

const ImageComp = ({ url, index, type, deleteImage }: ImageCompProps) => {
  const downloadImage = useDownloadImage(url, type, index);
  const t = useTranslations("Common");
  return (
    <div className="flex flex-col items-start justify-start h-full relative">
      <div className="absolute flex flex-row items-center justify-between bottom-2 left-2 p-2 gap-2 w-full">
        <div className="flex flex-row items-center justify-between gap-2">
          <div className="bg-fuchsia-900/50 rounded-md p-2 h-[38px] w-[38px] flex items-center justify-center cursor-default backdrop-blur-2xl">
            <p className="text-sm text-fuchsia-500 ">{index + 1}</p>
          </div>
          <button
            aria-label={t("downloadimage", { index: index + 1 })}
            className="text-sm text-green-500 font-bold hover:bg-green-900/50 bg-green-900/10 hover:text-green-400 ease-in-out duration-300 rounded-md p-3 backdrop-blur-2xl"
            onClick={() => downloadImage}
          >
            <LuDownload />
          </button>
        </div>
        <button
          aria-label={t("deleteimage", { index: index + 1 })}
          className="text-sm text-red-500 font-bold ease-in-out duration-300 hover:bg-red-500/75 bg-red-500/10 hover:text-red-400 rounded-md p-3 mr-4 backdrop-blur-2xl"
          onClick={() => deleteImage(url)}
        >
          <LuTrash />
        </button>
      </div>

      <Image
        data-index={type}
        className="rounded-md"
        width={300}
        height={300}
        src={url}
        alt={`optimized-${index + 1}`}
        aria-label={t("optimizedimage", { index: index + 1 })}
      />
    </div>
  );
};

export default memo(ImageComp);
