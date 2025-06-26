import { NextResponse } from "next/server";
import connectDB from "../../config/db";
import InstagramPost from "../../models/InstagramPost";

// Corrected POST method
export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();
    console.log(body); // { productId, instagramLink }

    // Optional: Validate inputs
    const { productId, instagramLink } = body;
    if (!productId || !instagramLink) {
      return NextResponse.json(
        { message: "productId and instagramLink are required" },
        { status: 400 }
      );
    }

    // Save to DB
    const newPost = new InstagramPost({ productId, instagramLink });
    const savedPost = await newPost.save();

    return NextResponse.json(savedPost, { status: 201 });
  } catch (error) {
    console.error("Error creating Instagram post:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
