"use client";

import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { downloadOptimizedImages } from "../utils/downloadUtils";
import { handleOptimize } from "../utils/optimizeUtils";
import SentForm from "./sentForm";
import ResultBlock, { optimizedImage } from "./ResultBlock";

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
    downloadOptimizedImages(optimizedImages);
  };

  return (
    <>
      <SentForm onSubmit={onSubmit} />
      <AnimatePresence>
        {optimizedImages.length > 0 && (
          <motion.div
            key="result-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {isUploading && optimizedImages.length === 0 && (
              <div className="text-fuchsia-500">Uploading...</div>
            )}
            {optimizedImages.length > 0 && (
              <ResultBlock
                optimizedImages={optimizedImages}
                handleDownload={handleDownload}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default memo(OptimisationComp);
