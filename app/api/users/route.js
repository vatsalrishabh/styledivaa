// app/api/users/route.js (POST route)
import { NextResponse } from 'next/server';
import connectDB from '../config/db';
import User from '../model/User';
import Otp from '../model/Otp';
import { emailRegistration } from '../utils/emailRegistration';

export async function POST(request) {
    try {
        const data = await request.json(); //{email:"vatsalrishabh00@gmail.com", name:"Vatsal", mobile:"2323232323"}
        
        await connectDB();

        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000); 

        // Create a new OTP entry in the Otp collection
        const otpData = {
            email: data.email,
            mobile: data.mobile,
            otp: otp,
            createdAt: new Date(),
        };
        await emailRegistration(email, otp, "StyleDivaa OTP Verification"); //send email and then 
        await Otp.create(otpData);

        console.log("OTP created:", otp);

        // Create the user in the User collection
        await User.create(data); // data should contain all required fields

        return NextResponse.json({ message: "User Created and OTP Sent" }, { status: 201 });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return NextResponse.json({ message: "User Already Exists" }, { status: 409 });
        }
        return NextResponse.json({ message: "Failed to create user" }, { status: 500 });
    }
}
