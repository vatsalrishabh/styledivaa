import { NextResponse } from "next/server";
import connectDB from "../../config/db"; // ✅ Use absolute import
import Product from "../../models/Product"; // ✅ Use absolute import


export async function GET(request, { params }) {
  await connectDB(); 
  const { id } = params; 
    console.log(id);
    
    if(!id){
      return NextResponse.json({ error: "Id not provided" }, { status: 400 });
    }

  try {
    const product = await Product.find(id);

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
