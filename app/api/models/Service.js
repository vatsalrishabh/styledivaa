// models/Service.js
import mongoose, { Schema } from 'mongoose';

const serviceSchema = new Schema({
    serviceId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    imageUrls: [String], // Array of image URLs
    price: { type: Number, required: true },
    discount: Number, // Percentage discount
    details: String,
    category:{
        type:String,
        required:true
    }
    // Add any service-specific fields here
}, { timestamps: true });

const Service = mongoose.models.Service || mongoose.model('Service', serviceSchema);

export default Service;