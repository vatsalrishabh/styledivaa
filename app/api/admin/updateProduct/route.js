import { NextResponse } from "next/server";
import connectDB from "../../config/db";
import Product from "../../models/Product";
import path from "path";
import fs from "fs/promises";

export const config = { api: { bodyParser: false } }; // Disable default body parser

export async function PATCH(request) {
  await connectDB(); // Ensure DB connection

  try {
    const req = await request.formData();
    const productId = req.get("productId"); // Get productId from the request body
    console.log("Received form data:", Object.fromEntries(req.entries())); // Debugging log

    // Check if productId is provided
    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    // Find the existing product by productId
    const existingProduct = await Product.findOne({ productId });
    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Ensure the uploads directory exists
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    // Extract form data (fields and files)
    const files = {};
    const fields = {};

    for (const [key, value] of req.entries()) {
      if (value instanceof File) {
        if (!["image1", "image2", "image3", "image4", "image5", "image6"].includes(key)) {
          continue;
        }

        const ext = path.extname(value.name) || ".jpg";
        const buffer = Buffer.from(await value.arrayBuffer());

        files[key] = { buffer, ext, filename: value.name };
      } else {
        fields[key] = value.toString(); // Convert FormData values to strings
      }
    }

    // Update fields if provided, otherwise keep the existing values
    const updatedFields = {
      name: fields.name || existingProduct.name,
      rating: fields.rating ? parseFloat(fields.rating) : existingProduct.rating,
      reviews: fields.reviews || existingProduct.reviews,
      price: fields.price ? parseFloat(fields.price) : existingProduct.price,
      mrp: fields.mrp ? parseFloat(fields.mrp) : existingProduct.mrp,
      discount: fields.discount ? parseFloat(fields.discount) : existingProduct.discount,
      inclusiveOfTaxes: fields.inclusiveOfTaxes === "true" ? true : existingProduct.inclusiveOfTaxes,
      category: fields.category || existingProduct.category,
      color: fields.color || existingProduct.color,
      print: fields.print || existingProduct.print,
      neck: fields.neck || existingProduct.neck,
      pockets: fields.pockets === "true" ? true : existingProduct.pockets,
      sleeves: fields.sleeves || existingProduct.sleeves,
      shape: fields.shape || existingProduct.shape,
      length: fields.length || existingProduct.length,
      material: fields.material || existingProduct.material,
      fit: fields.fit || existingProduct.fit,
    };

    // Update stock sizes
    const updatedStock = {
      XS: parseInt(fields["stock[XS]"] || existingProduct.stock.XS, 10),
      S: parseInt(fields["stock[S]"] || existingProduct.stock.S, 10),
      M: parseInt(fields["stock[M]"] || existingProduct.stock.M, 10),
      L: parseInt(fields["stock[L]"] || existingProduct.stock.L, 10),
      XL: parseInt(fields["stock[XL]"] || existingProduct.stock.XL, 10),
      XXL: parseInt(fields["stock[XXL]"] || existingProduct.stock.XXL, 10),
    };

    updatedFields.stock = updatedStock;

    // Handle image updates
    const imageUrls = { ...existingProduct.images };

    for (const [key, { buffer, ext }] of Object.entries(files)) {
      const savedFileName = `${productId}-${key}${ext}`;
      const filePath = path.join(uploadDir, savedFileName);

      await fs.writeFile(filePath, buffer);
      imageUrls[key] = `/uploads/${savedFileName}`;
    }

    // Update the product in the database
    const updatedProduct = await Product.findOneAndUpdate(
      { productId },
      {
        ...updatedFields,
        imageOne: imageUrls.image1 || existingProduct.imageOne,
        imageTwo: imageUrls.image2 || existingProduct.imageTwo,
        imageThree: imageUrls.image3 || existingProduct.imageThree,
        imageFour: imageUrls.image4 || existingProduct.imageFour,
        imageFive: imageUrls.image5 || existingProduct.imageFive,
        imageSix: imageUrls.image6 || existingProduct.imageSix,
      },
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
    }

    return NextResponse.json(
      { message: "Product updated successfully", product: updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
