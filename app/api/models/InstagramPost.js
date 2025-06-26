import mongoose from "mongoose";

const InstagramPostSchema = new mongoose.Schema({
  instagramLink: { type: String, required: true },
  productId: { type: String, default: null },
}, { timestamps: true });

export default mongoose.models.InstagramPost || mongoose.model("InstagramPost", InstagramPostSchema);
