import { NextResponse } from "next/server";
import Otp from "../../models/Otp";
import User from "../../models/User";
import connectDB from "../../config/db";
import { adminChPass } from "../../utils/adminChPass"; // Import the email function

// @api - api/admin/sendotp
// @method - POST
// @access - Admin
export async function POST(request) {
    try {
        await connectDB();

        // Extract email, role, and mobileNumber from request body
        const { email, role, mobileNumber } = await request.json();

        if (role !== "admin") {
            return NextResponse.json({ message: "You are unauthorized" }, { status: 403 });
        }

        // Check if user exists and is an admin
        const user = await User.findOne({ email });
        if (!user || user.typeOfUser !== "Admin") {
            return NextResponse.json({ message: "Email not registered as Admin" }, { status: 400 });
        }

        // Generate OTP (6-digit)
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const mobile = mobileNumber || "9742782429"; // Default mobile number if not provided

        // Update or Insert OTP in DB
        await Otp.updateOne(
            { mobileNumber: mobile }, // Find by mobileNumber
            { 
                $set: { 
                    email, 
                    otp, 
                    createdAt: new Date(), 
                    expiresAt: Date.now() + 300000 
                } 
            },
            { upsert: true } // Insert if not found, otherwise update
        );

        // Send OTP via email
        await adminChPass(email, otp, "Admin Password Reset OTP");

        return NextResponse.json({ message: "OTP sent successfully" }, { status: 200 });

    } catch (error) {
        console.error("Send OTP error:", error);
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
    }
}
