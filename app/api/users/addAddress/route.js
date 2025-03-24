import { NextResponse } from "next/server";
import User from "../../models/User";
import connectDB from "../../config/db";

// @api - api/users/addAddress
// @method - PUT
// @access - PUBLIC
export async function PUT(request) {
    try {
        await connectDB(); // Ensure database connection

        const { email, address } = await request.json();

        // Check if both email and address are provided
        if (!email || !address) {
            return NextResponse.json({ message: "Email and address are required" }, { status: 400 });
        }

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "Email not registered" }, { status: 400 });
        }

        // Add the new address to the user's address array
        user.addresses.push(address);

        // Save the updated user document
        await user.save();

        return NextResponse.json({ message: "Address added successfully", addresses: user.addresses }, { status: 200 });

    } catch (error) {
        console.error("Error adding address:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
