"use server";

export const optimizeImage = async (formData: FormData) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/optimize`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const contentType = response.headers.get("content-type");
  const name = formData.get("name") as string;
  if (contentType && contentType.includes("image")) {
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    return {
      contentType,
      base64Data: base64,
      name: name,
    };
  } else {
    throw new Error("The response is not an image");
  }
};
