import { NextResponse } from "next/server";
import connectDB from "../../config/db";
import Product from "../../models/Product";
import path from "path";
import fs from "fs/promises";

export const config = { api: { bodyParser: false } }; // Disable default body parser

export async function POST(request) {
  await connectDB(); // Ensure DB connection

  try {
    const req = await request.formData();
    console.log("Received form data:", Object.fromEntries(req.entries())); // Debugging log

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

    // Validate required fields
    if (!fields.name || !fields.price || !fields.mrp || !fields.category) {
      return NextResponse.json({ error: "Missing required fields (name, price, mrp, category)" }, { status: 400 });
    }

    // Fetch the latest productId and generate a new one
    const lastProduct = await Product.findOne().sort({ productId: -1 });
    let newProductId = "PRD000001"; // Default if no products exist

    if (lastProduct && lastProduct.productId) {
      const lastNumber = parseInt(lastProduct.productId.replace("PRD", ""), 10);
      newProductId = `PRD${String(lastNumber + 1).padStart(6, "0")}`;
    }

    // Save images with specific filenames
    const imageUrls = {};
    for (const [key, { buffer, ext }] of Object.entries(files)) {
      const savedFileName = `${newProductId}-${key}${ext}`;
      const filePath = path.join(uploadDir, savedFileName);

      await fs.writeFile(filePath, buffer);
      imageUrls[key] = `/uploads/${savedFileName}`;
    }

    // Parse stock sizes properly
    const stock = {
      XS: parseInt(fields["stock[XS]"] || "0", 10),
      S: parseInt(fields["stock[S]"] || "0", 10),
      M: parseInt(fields["stock[M]"] || "0", 10),
      L: parseInt(fields["stock[L]"] || "0", 10),
      XL: parseInt(fields["stock[XL]"] || "0", 10),
      XXL: parseInt(fields["stock[XXL]"] || "0", 10),
    };

    console.log("Parsed Stock Data:", stock); // Debugging log

    // Create and save product
    const newProduct = new Product({
      productId: newProductId,
      name: fields.name,
      rating: fields.rating ? parseFloat(fields.rating) : 0,
      reviews: fields.reviews || "0",
      price: parseFloat(fields.price),
      mrp: parseFloat(fields.mrp),
      discount: fields.discount ? parseFloat(fields.discount) : 0,
      inclusiveOfTaxes: fields.inclusiveOfTaxes === "true",

      category: fields.category || "Kurta",
      color: fields.color || "",
      print: fields.print || "",
      neck: fields.neck || "",
      pockets: fields.pockets === "true",
      sleeves: fields.sleeves || "",
      shape: fields.shape || "",
      length: fields.length || "",
      material: fields.material || "",
      fit: fields.fit || "",

      stock, // Updated stock mapping

      imageOne: imageUrls.image1 || "",
      imageTwo: imageUrls.image2 || "",
      imageThree: imageUrls.image3 || "",
      imageFour: imageUrls.image4 || "",
      imageFive: imageUrls.image5 || "",
      imageSix: imageUrls.image6 || "",
    });

    await newProduct.save();

    return NextResponse.json(
      { message: "Product added successfully", product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing product upload:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
