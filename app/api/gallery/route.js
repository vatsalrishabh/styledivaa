import { NextResponse } from "next/server";
import connectDB from "../config/db";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json([
      { instagramLink: "https://www.instagram.com/p/C3KHOW8x-Gy/", productId: "product1" },
      { instagramLink: "https://www.instagram.com/p/DGSqSruvCUE", productId: "product2" },
      { instagramLink: "https://www.instagram.com/p/C-zFuKESvBY/", productId: "product3" },
      { instagramLink: "https://www.instagram.com/p/C94t02Py9En/", productId: null },
      { instagramLink: "https://www.instagram.com/p/C8VxMkoI83_/", productId: "product5" },
      { instagramLink: "https://www.instagram.com/p/C7jCwMhykKQ/", productId: null },
      { instagramLink: "https://www.instagram.com/reel/C4VnGqqyuvg/", productId: "product7" },
    ]);
  } catch (error) {
    console.error("Error fetching Instagram posts:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
