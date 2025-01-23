// models/Product.js
import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
    productId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    imageUrls: [String], // Array of image URLs
    price: { type: Number, required: true },
    discount: Number, // Percentage discount
    details: String,
    sizes: [String], // Array of available sizes (e.g., "S", "M", "L")
    category:{
        type:String,
        required:true
    }
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;