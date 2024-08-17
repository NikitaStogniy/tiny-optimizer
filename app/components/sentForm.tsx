"use client";

import { memo, useState } from "react";
import { imageType } from "@utils/types";
import SelectType from "./SelectType";
interface SentFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SentForm = ({ onSubmit }: SentFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [isOptimized, setIsOptimized] = useState(false);
  const [type, setType] = useState<imageType | null>(null);
  return (
    <form
      className="flex flex-row items-center justify-center gap-2 bg-fuchsia-900/50 p-[2px] rounded-full"
      onSubmit={(event) => {
        setIsLoading(true);
        onSubmit(event);
        setIsLoading(false);
        setIsOptimized(true);
      }}
    >
      <input
        disabled={isLoading}
        className="block w-full text-sm text-fuchsia-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-fuchsia-900 file:text-fuchsia-500
      hover:file:bg-fuchsia-700 file:h-[48px] file:ease-in-out file:duration-300 file:cursor-pointer"
        aria-describedby="file_input_help"
        id="file_input"
        type="file"
        name="file"
        accept="image/*"
        multiple
        onChange={(event) => {
          setIsLoading(true);
          const files = event.target.files;
          if (files && files.length > 0) {
            setImages(Array.from(files));
            setType(files[0].type.split("/")[1] as imageType);
          }
          setIsLoading(false);
        }}
      />
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
        className="rounded-full bg-fuchsia-900 text-fuchsia-500 px-4 py-2 border border-fuchsia-900 h-[48px] disabled:opacity-50 hover:bg-fuchsia-700 hover:text-fuchsia-400 ease-in-out duration-300 cursor-pointer"
        type="submit"
      >
        Optimize
      </button>
    </form>
  );
};

export default memo(SentForm);
