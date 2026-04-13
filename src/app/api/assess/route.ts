import { NextRequest, NextResponse } from "next/server";
import { assessDamage } from "@/lib/claude";
import { stripDataUriPrefix } from "@/lib/imageUtils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { images } = body;

    if (!Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { error: "Please provide at least one image." },
        { status: 400 }
      );
    }

    if (images.length > 5) {
      return NextResponse.json(
        { error: "Maximum 5 images allowed." },
        { status: 400 }
      );
    }

    for (const img of images) {
      if (typeof img !== "string" || !img.startsWith("data:image/")) {
        return NextResponse.json(
          { error: "Invalid image format. Expected base64 data URI." },
          { status: 400 }
        );
      }
    }

    const processedImages = images.map((dataUri: string) => {
      const { mediaType, base64Data } = stripDataUriPrefix(dataUri);
      return {
        mediaType: mediaType as "image/jpeg" | "image/png" | "image/gif" | "image/webp",
        base64Data,
      };
    });

    const assessment = await assessDamage(processedImages);

    return NextResponse.json({ assessment });
  } catch (error) {
    console.error("Assessment error:", error);
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
