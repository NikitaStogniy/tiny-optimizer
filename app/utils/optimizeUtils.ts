import { optimizeImage } from "./optimise";
import { imageType } from "./types";
import { optimizedImage } from "../components/ResultBlock";

export const handleOptimize = async (
  formData: FormData,
  setOptimizedImages: React.Dispatch<React.SetStateAction<optimizedImage[]>>
) => {
  const files = formData.getAll("file") as File[];
  const type = formData.get("type") as imageType;

  for (const file of files) {
    const fileFormData = new FormData();
    fileFormData.append("file", file);
    fileFormData.append("type", type);
    fileFormData.append("name", file.name);
    const result = await optimizeImage(fileFormData);

    if (result) {
      const blob = await fetch(
        `data:${result.contentType};base64,${result.base64Data}`
      ).then((res) => res.blob());
      const url = URL.createObjectURL(blob);
      setOptimizedImages((prev) => [...prev, { url, type, name: file.name }]);
    }
  }
};
