import { locales } from "../config";

export type imageType = "png" | "jpg" | "jpeg" | "webp" | "gif";

export type Locale = (typeof locales)[number];
