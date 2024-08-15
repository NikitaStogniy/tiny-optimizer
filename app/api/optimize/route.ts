import { NextResponse } from "next/server";
import { Compressor } from "@/app/utils/compressor";
import formidable, { Files } from "formidable";

export async function POST(request: Request) {
  try {
    const form = formidable({ multiples: true });
    const [fields, files]: [formidable.Fields, Files] = await new Promise(
      (resolve, reject) => {
        form.parse(request.body as any, (err, fields, files) => {
          if (err) reject(err);
          else resolve([fields, files]);
        });
      }
    );

    const file = files.file?.[0];
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
