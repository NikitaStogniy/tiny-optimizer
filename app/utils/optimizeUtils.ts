import { optimizeImage } from "./optimise";

export const handleOptimize = async (
  formData: FormData,
  setOptimizedImages: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const files = formData.getAll("file") as File[];

  for (const file of files) {
    const fileFormData = new FormData();
    fileFormData.append("file", file);

    const result = await optimizeImage(fileFormData);

    if (result) {
      const blob = await fetch(
        `data:${result.contentType};base64,${result.base64Data}`
      ).then((res) => res.blob());
      const url = URL.createObjectURL(blob);
      setOptimizedImages((prev) => [...prev, url]);
    }
  }
};
