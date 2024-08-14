"use client";

import { memo, useState } from "react";
interface SentFormProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const SentForm = ({ onSubmit }: SentFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [isOptimized, setIsOptimized] = useState(false);
  return (
    <form
      className="flex flex-row items-center justify-center gap-2"
      onSubmit={async (event) => {
        setIsLoading(true);
        onSubmit(event);
        setIsLoading(false);
        setIsOptimized(true);
      }}
    >
      <input
        disabled={isLoading}
        className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100 file:h-[48px]"
        aria-describedby="file_input_help"
        id="file_input"
        type="file"
        name="file"
        multiple
        onChange={(event) => {
          const files = event.target.files;
          if (files) {
            setImages(Array.from(files));
          }
        }}
      />

      <button
        disabled={isLoading || images.length === 0 || isOptimized}
        className="rounded-xl bg-violet-500 px-4 py-2 text-white  h-[48px] disabled:opacity-50"
        type="submit"
      >
        Optimize
      </button>
    </form>
  );
};

export default memo(SentForm);
