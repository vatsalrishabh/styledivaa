import { NextResponse } from "next/server";
import Otp from "../../model/Otp";
import User from "../../model/User";
import connectDB from "../../config/db";
import { generateToken } from "../../config/jwtGenerator";

// @api - api/users/verifyOtp
// @method - POST
// @access - PUBLIC
export async function POST(request) {
  try {
    const dataa = await request.json(); // Extract request body
    console.log("Received Data:", dataa);

    // Ensure DB is connected
    await connectDB().catch((err) => {
      console.log("Database connection failed:", err);
      return NextResponse.json({ message: "Database Error" }, { status: 500 });
    });

    // Convert OTP to Number
    const otpNumber = Number(dataa.otp);
    console.log("Converted OTP:", otpNumber);

    // Check if OTP exists
    const userExist = await Otp.findOne({ email: dataa.email, otp: otpNumber });
    console.log("Found OTP Entry:", userExist);

    if (!userExist) {
      return NextResponse.json({ message: "Invalid or Expired OTP" }, { status: 400 });
    }

    // Create new user
    const { email, name, mobile } = dataa;
    const newUser = await User.create({ email, name, mobileNumber: mobile });

    // Remove OTP after successful verification
    await Otp.deleteOne({ email: dataa.email });

    // Generate JWT Token
    const token = generateToken({ email: newUser.email, name: newUser.name, mobile: newUser.mobileNumber, isLoggedIn: true });

    return NextResponse.json(
      { message: "User created successfully", token, user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error in verifyOtp:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
