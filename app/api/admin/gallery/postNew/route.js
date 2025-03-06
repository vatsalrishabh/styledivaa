import { NextResponse } from "next/server";
import Product from "../../../models/Product";
import path from "path";
import fs from "fs/promises";

export const config = { api: { bodyParser: false } }; // Disable default body parser

export async function POST(request) {
  try {
    const req = await request.formData();

    // Ensure the uploads directory exists
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    // Parse form data
    const files = [];
    const fields = {};

    for (const [key, value] of req.entries()) {
      if (value instanceof Blob) {
        const buffer = Buffer.from(await value.arrayBuffer());
        const safeFilename = value.name.replace(/\s+/g, "_");
        const tempPath = path.join(uploadDir, safeFilename);

        await fs.writeFile(tempPath, buffer);
        files.push(`/uploads/${safeFilename}`);
      } else {
        fields[key] = value;
      }
    }

    // Validate required fields
    if (!fields.productId || !fields.name || !fields.price || !fields.category ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Parse sizes
    const sizes = Object.keys(fields)
      .filter(key => key.startsWith("sizes["))
      .map(key => ({
        size: key.match(/\[(.*?)\]/)[1], // Extract size name
        quantity: parseInt(fields[key], 10),
      }));

    // Create and save product
    const newProduct = new Product({
      productId: fields.productId,
      name: fields.name,
      imageUrls: files, // Store uploaded image URLs
      price: parseFloat(fields.price),
      discount: fields.discount ? parseFloat(fields.discount) : 0,
      details: fields.description || "",
      category: fields.category,
      gender: fields.gender,
      sizes: sizes,
    });

    await newProduct.save();

    return NextResponse.json({ message: "Product added successfully", product: newProduct }, { status: 201 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
