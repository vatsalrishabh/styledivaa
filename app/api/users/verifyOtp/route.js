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
    await connectDB();

    // Convert OTP to Number
    const otpNumber = Number(dataa.otp);
    console.log("Converted OTP:", otpNumber);

    // Check if OTP exists
    const userExist = await Otp.findOne({ email: dataa.email, otp: otpNumber });
    console.log("Found OTP Entry:", userExist);

    if (!userExist) {
      return NextResponse.json({ message: "Invalid or Expired OTP" }, { status: 400 });
    }

    // Extract data from request
    const { email, name, mobile, password } = dataa; // Now includes password

    if (!password) {
      return NextResponse.json({ message: "Password is required" }, { status: 400 });
    }

    // Generate a unique user ID
    const userCount = await User.countDocuments();
    const userId = `USR${String(userCount + 1).padStart(4, "0")}`;

    // Create new user
    let newUser;
    try {
      newUser = await User.create({ userId, email, name, mobileNumber: mobile, password });
    } catch (error) {
      console.log("Error creating user:", error);
      return NextResponse.json({ message: "Failed to create user" }, { status: 500 });
    }

    // Delete OTP entry after successful verification
    await Otp.deleteOne({ email: dataa.email });

    // Generate JWT Token
    const token = generateToken({
      email: newUser.email,
      name: newUser.name,
      mobile: newUser.mobileNumber,
      isLoggedIn: true
    });
    
    delete newUser.password;
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
