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
    const productId = req.get("productId");

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const existingProduct = await Product.findOne({ productId });
    if (!existingProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const uploadDir = path.join(process.cwd(), "public/uploads");
    await fs.mkdir(uploadDir, { recursive: true });

    const files = {};
    const fields = {};

    for (const [key, value] of req.entries()) {
      if (value instanceof File) {
        if (!["imageOne", "imageTwo", "imageThree", "imageFour", "imageFive", "imageSix"].includes(key)) continue;
        const ext = path.extname(value.name) || ".jpg";
        const buffer = Buffer.from(await value.arrayBuffer());
        files[key] = { buffer, ext };
      } else {
        fields[key] = value.toString();
      }
    }

    // Parse stock if sent as JSON string
    let stockObj = existingProduct.stock;
    if (fields.stock && typeof fields.stock === "string") {
      try {
        stockObj = JSON.parse(fields.stock);
      } catch (e) {
        console.warn("Invalid stock JSON string. Using existing stock.");
      }
    }

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
      stock: {
        XS: parseInt(stockObj.XS ?? existingProduct.stock.XS, 10),
        S: parseInt(stockObj.S ?? existingProduct.stock.S, 10),
        M: parseInt(stockObj.M ?? existingProduct.stock.M, 10),
        L: parseInt(stockObj.L ?? existingProduct.stock.L, 10),
        XL: parseInt(stockObj.XL ?? existingProduct.stock.XL, 10),
        XXL: parseInt(stockObj.XXL ?? existingProduct.stock.XXL, 10),
      }
    };

    const imageUrls = {
      imageOne: existingProduct.imageOne,
      imageTwo: existingProduct.imageTwo,
      imageThree: existingProduct.imageThree,
      imageFour: existingProduct.imageFour,
      imageFive: existingProduct.imageFive,
      imageSix: existingProduct.imageSix,
    };

    for (const [key, { buffer, ext }] of Object.entries(files)) {
      const filename = `${productId}-${key}${ext}`;
      const filePath = path.join(uploadDir, filename);
      await fs.writeFile(filePath, buffer);
      console.log(`✅ Saved ${key} to ${filePath}`);
      imageUrls[key] = `/uploads/${filename}`;
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { productId },
      {
        ...updatedFields,
        imageOne: imageUrls.imageOne,
        imageTwo: imageUrls.imageTwo,
        imageThree: imageUrls.imageThree,
        imageFour: imageUrls.imageFour,
        imageFive: imageUrls.imageFive,
        imageSix: imageUrls.imageSix,
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "✅ Product updated successfully", product: updatedProduct },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error updating product:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
