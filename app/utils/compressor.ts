"use server";

import sharp from "sharp";
import { imageType } from "./types";

export const Compressor = async (file: File, type: imageType | null) => {
  const buffer = Buffer.from(await file.arrayBuffer());
  const safeType = type ?? "jpeg";
  try {
    let optimizedBuffer;
    switch (safeType) {
      case "jpeg":
        optimizedBuffer = await sharp(buffer).jpeg({ quality: 85 }).toBuffer();
        break;
      case "png":
        optimizedBuffer = await sharp(buffer)
          .png({ compressionLevel: 9 })
          .toBuffer();
        break;
      case "webp":
        optimizedBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer();
        break;
      default:
        optimizedBuffer = await sharp(buffer)
          .toFormat(safeType, { quality: 85 })
          .toBuffer();
        break;
    }
    return optimizedBuffer;
  } catch (error) {
    console.error("Error optimizing image:", error);
    return null;
  }
};
