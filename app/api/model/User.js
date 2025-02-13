// models/User.js
import mongoose, { Schema } from 'mongoose';

const addressSchema = new Schema({
    latitude: Number,
    longitude: Number,
    zipcode: String,
    state: String,
    city: String,
    streetAddress: String,
    roomNumber: String, // Or flatNumber
    houseNumber: String,
    floor: String,
    category: String, // E.g., "Home", "Work", "Other"
});

const userSchema = new Schema({
    userId: { type: String, required: true, unique: true }, // Changed to userId
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password:{type: String, required: true },
    dpUrl: String, // Profile picture URL
    addresses: [addressSchema], // Array of addresses
    mobileNumber: { type: String, required: true },
    typeOfUser: String, // E.g., "Customer", "Admin", "Vendor"
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;