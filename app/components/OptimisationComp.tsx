"use client";

import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { downloadOptimizedImages } from "../utils/downloadUtils";
import { handleOptimize } from "../utils/optimizeUtils";
import SentForm from "./sentForm";
import ResultBlock from "./ResultBlock";

const OptimisationComp = () => {
  const [optimizedImages, setOptimizedImages] = useState<string[]>([]);
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isUploading ? 0.5 : 0 }}
        transition={{ duration: 0.3 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "black",
          zIndex: 10,
        }}
      />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{
          opacity: 1,
          y: isUploading ? -50 : 0,
        }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        style={{ position: "relative", zIndex: 20 }}
      >
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
              <ResultBlock
                optimizedImages={optimizedImages}
                handleDownload={handleDownload}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default memo(OptimisationComp);
