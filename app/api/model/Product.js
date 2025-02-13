import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    productId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    imageUrls: [String], // Array of image URLs
    price: { type: Number, required: true },
    discount: Number, // Percentage discount
    details: String,
    category: { type: String, required: true },
    gender: { type: String, enum: ["Men", "Women", "Unisex"], required: true }, // Gender category

    // Array of size and quantity
    sizes: [
      {
        size: { type: String, required: true }, // Example: "S", "M", "L"
        quantity: { type: Number, required: true, default: 0 }, // Stock for this size
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
