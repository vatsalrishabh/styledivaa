import { NextRequest, NextResponse } from "next/server";
import connectDB from "../config/db";
import Product from "../models/Product";


// @api - api/products/
// @method - GEt
// @access - PUBLIC
export async function GET(request) {
    try {
        await connectDB(); // Ensure MongoDB connection
    
        const products = await Product.find({}); // Fetch all products
    
        return NextResponse.json(products, { status: 200 });
      } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
      }
}