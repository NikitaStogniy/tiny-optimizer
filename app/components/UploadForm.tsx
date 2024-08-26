"use client";

import { memo, useRef, useState } from "react";
import { imageType } from "@utils/types";
import SelectType from "./SelectType";
import { useTranslations } from "next-intl";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useUploadedContext } from "../context/UploadedContext";

interface UploadFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const UploadForm = ({ onSubmit }: UploadFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [isOptimized, setIsOptimized] = useState(false);
  const [type, setType] = useState<imageType | null>(null);
  const t = useTranslations("Common");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    uploadedImages,
    setUploadedImages,
    clearUploadedImages,
    addUploadedImage,
  } = useUploadedContext();

  const resetForm = () => {
    setImages([]);
    setType(null);
    clearUploadedImages();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    const files = event.target.files;
    if (files && files.length > 0) {
      const newImages = Array.from(files);
      setImages((prevImages) => [...prevImages, ...newImages]);
      setType(newImages[0].type.split("/")[1] as imageType);
      const newUploadedImages = newImages.map((file, index) => ({
        file,
        type: newImages[index].type.split("/")[1] as imageType,
      }));
      setUploadedImages([...uploadedImages, ...newUploadedImages]);
    }
    setIsLoading(false);
  };
  return (
    <form
      className="flex md:flex-row flex-col items-center justify-center gap-2 bg-fuchsia-900/50 p-[2px] rounded-xl md:rounded-full p-4 w-full max-w-[700px]"
      onSubmit={(event) => {
        setIsLoading(true);
        onSubmit(event);
        setIsLoading(false);
        setIsOptimized(true);
      }}
    >
      <label
        htmlFor="file_input"
        className="w-full text-sm text-fuchsia-500 align-center flex items-center justify-center
      md:mr-4 md:py-2 md:px-4
      md:rounded-full rounded-xl border-0
      text-sm font-semibold
      bg-fuchsia-900 text-fuchsia-500
      hover:bg-fuchsia-700 h-[48px] ease-in-out duration-300 cursor-pointer"
      >
        {t("upload")}
      </label>
      <input
        ref={fileInputRef}
        disabled={isLoading}
        className="hidden"
        aria-describedby="file_input_help"
        id="file_input"
        placeholder="test"
        type="file"
        name="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
      />
      <div className="flex flex-row items-center justify-center gap-2 w-full md:h-auto h-[48px]">
        <p className="text-fuchsia-500 w-full">
          {images.length > 1
            ? `${images.length} files selected`
            : images.length === 1
            ? images[0].name
            : ""}
        </p>
        {images.length > 0 && (
          <button
            className="text-fuchsia-500
        hover:text-fuchsia-400
        ease-in-out duration-300 cursor-pointer "
            aria-label={t("reset")}
            onClick={resetForm}
          >
            <IoMdCloseCircleOutline size={24} />
          </button>
        )}
      </div>
      <input
        className="hidden"
        type="text"
        id="type"
        name="type"
        value={type ? type : ""}
      />
      <SelectType type={type} setType={setType} />
      <button
        disabled={isLoading || images.length === 0 || type === null}
        className="md:rounded-full w-full md:w-auto rounded-xl bg-fuchsia-900 text-fuchsia-500 px-4 py-2 border border-fuchsia-900 h-[48px] disabled:opacity-50 hover:bg-fuchsia-700 hover:text-fuchsia-400 ease-in-out duration-300 cursor-pointer"
        type="submit"
      >
        {t("optimize")}
      </button>
    </form>
  );
};

export default memo(UploadForm);
