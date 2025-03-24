import { NextResponse } from "next/server";
import connectDB from "../../config/db";
import Product from "../../models/Product";

// @API- /api/products/deleteProduct?productId
// @Access- admin
// @Method- DELETE
export async function DELETE(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get("productId"); // Get product ID from query params

  if (!productId) {
    return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
  }

  try {
    // Use findOneAndDelete instead of findByIdAndDelete
    const deletedProduct = await Product.findOneAndDelete({ productId });

    if (!deletedProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
