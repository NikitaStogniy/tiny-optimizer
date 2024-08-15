"use server";

import sharp from "sharp";

export const Compressor = async (file: File) => {
  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const optimizedBuffer = await sharp(buffer)
      .png({ quality: 95, compressionLevel: 9 })
      .toBuffer();
    return optimizedBuffer;
  } catch (error) {
    console.error("Error optimizing image:", error);
    return null;
  }
};
