import { NextResponse } from "next/server";
import connectDB from "../../config/db";
import InstagramPost from "../../models/InstagramPost";

// DELETE /api/gallery/:productId
export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const { productId } = params;

    const deletedPost = await InstagramPost.findOneAndDelete({ productId });

    if (!deletedPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post deleted successfully", deletedPost });
  } catch (error) {
    console.error("Error deleting Instagram post:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
