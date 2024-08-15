import { NextResponse } from "next/server";
import { Compressor } from "@/app/utils/compressor";
import { imageType } from "@/app/utils/types";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const type = formData.get("type");
    console.log("Request received", type);
    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No file uploaded or invalid file" },
        { status: 400 }
      );
    }

    const optimizedBuffer = await Compressor(file, type as imageType);

    if (!optimizedBuffer) {
      return NextResponse.json(
        { error: "Failed to optimize image" },
        { status: 500 }
      );
    }

    return new NextResponse(optimizedBuffer, {
      status: 200,
      headers: {
        "Content-Type": `image/${type}`,
        "Content-Disposition": `attachment; filename="${file.name}"`,
      },
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
