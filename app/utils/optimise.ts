"use server";

export const optimizeImage = async (formData: FormData) => {
  const response = await fetch(
    "https://tiny-optimizer.vercel.app/api/optimize",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("image")) {
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    return {
      contentType,
      base64Data: base64,
    };
  } else {
    throw new Error("The response is not an image");
  }
};
