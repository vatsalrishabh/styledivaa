import mongoose, { Schema } from "mongoose";

// Define Gallery Schema
const gallerySchema = new Schema(
  {
    productId: { type: String, required: true, unique: true },
    imageUrls: [String], // Array of image URLs
  },
  { timestamps: true }
);

// Create or retrieve the model
const Gallery = mongoose.models.Gallery || mongoose.model("Gallery", gallerySchema);

export default Gallery;