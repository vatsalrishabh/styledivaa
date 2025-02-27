import { NextResponse } from "next/server";
import Gallery from "@/app/api/model/Gallery";

// Handle POST request
export async function POST(request) {
  try {
    const { productId, imageUrls } = await request.json();

    if (!productId || !Array.isArray(imageUrls)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const newGalleryItem = new Gallery({ productId, imageUrls });
    await newGalleryItem.save();

    return NextResponse.json({ message: "Gallery item added successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
