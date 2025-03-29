import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import Otp from "../../models/Otp";
import User from "../../models/User";
import connectDB from "../../config/db";

export async function POST(request) {
  try {
    await connectDB();
    const { email, otp, newPassword, confirmPassword } = await request.json();

    // Validate input
    if (!email || !otp || !newPassword || !confirmPassword) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json({ message: "Passwords do not match" }, { status: 400 });
    }

    // Verify OTP
    const otpRecord = await Otp.findOne({ email, otp });
    if (!otpRecord) {
      return NextResponse.json({ message: "Invalid or expired OTP" }, { status: 400 });
    }

    // Hash new password
    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    // Update user password
    await User.findOneAndUpdate({ email }, { $set: { password: hashedPassword } });

    // Remove OTP record after successful reset
    await Otp.deleteOne({ email });

    return NextResponse.json({ message: "Password reset successful!" }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
