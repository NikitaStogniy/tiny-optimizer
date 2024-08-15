"use server";

import sharp from "sharp";
import { imageType } from "./types";

export const Compressor = async (file: File, type: imageType | null) => {
  const buffer = Buffer.from(await file.arrayBuffer());
  const safeType = type ?? "jpeg";
  console.log(type);
  if (type === null) {
    return buffer;
  }
  try {
    const optimizedBuffer = await sharp(buffer)
      .toFormat(safeType, { quality: 95 })
      .toBuffer();
    return optimizedBuffer;
  } catch (error) {
    console.error("Error optimizing image:", error);
    return null;
  }
};
