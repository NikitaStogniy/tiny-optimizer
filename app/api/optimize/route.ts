import { NextResponse } from "next/server";
import sharp from "sharp";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    const optimizedBuffer = await sharp(buffer)
      .webp({ quality: 95, effort: 6 })
      .toBuffer();
    return new NextResponse(optimizedBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Disposition": 'attachment; filename="optimized.png"',
      },
    });
  } catch (error) {
    console.error("Error optimizing image:", error);
    return NextResponse.json(
      { error: "Failed to optimize image" },
      { status: 500 }
    );
  }
}
