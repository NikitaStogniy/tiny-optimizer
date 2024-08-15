import { NextResponse } from "next/server";
import { Compressor } from "@/app/utils/compressor";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No file uploaded or invalid file" },
        { status: 400 }
      );
    }

    const optimizedBuffer = await Compressor(file);

    if (!optimizedBuffer) {
      return NextResponse.json(
        { error: "Failed to optimize image" },
        { status: 500 }
      );
    }

    return new NextResponse(optimizedBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
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
