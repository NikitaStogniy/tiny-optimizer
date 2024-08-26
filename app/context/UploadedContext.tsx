"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import { imageType } from "@utils/types";

interface UploadedImage {
  file: File;
  type: imageType;
}

interface UploadedContextType {
  uploadedImages: UploadedImage[];
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  addUploadedImage: (image: UploadedImage) => void;
  removeUploadedImage: (index: number) => void;
  clearUploadedImages: () => void;
  setUploadedImages: (images: UploadedImage[]) => void;
}

const UploadedContext = createContext<UploadedContextType | undefined>(
  undefined
);

export const useUploadedContext = () => {
  const context = useContext(UploadedContext);
  if (!context) {
    throw new Error(
      "useUploadedContext must be used within an UploadedProvider"
    );
  }
  return context;
};

interface UploadedProviderProps {
  children: ReactNode;
}

export const UploadedProvider: React.FC<UploadedProviderProps> = ({
  children,
}) => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const addUploadedImage = (image: UploadedImage) => {
    setUploadedImages((prev) => [...prev, image]);
  };

  const removeUploadedImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const clearUploadedImages = () => {
    setUploadedImages([]);
  };

  return (
    <UploadedContext.Provider
      value={{
        isLoading,
        uploadedImages,
        addUploadedImage,
        removeUploadedImage,
        clearUploadedImages,
        setUploadedImages,
        setIsLoading,
      }}
    >
      {children}
    </UploadedContext.Provider>
  );
};
