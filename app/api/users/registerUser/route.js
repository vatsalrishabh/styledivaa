import { NextResponse } from "next/server";
import connectDB from "../../config/db";
import { emailRegistration } from "../../utils/emailRegistration";
import Otp from "../../model/Otp";
import User from "../../model/User";


// @api - api/users/registerUser
// @method - POST
// @access - PUBLIC
export async function POST(request) {
   
    try {
         const dataa = await request.json(); //{email:"vatsalrishabh00@gmail.com", name:"Vatsal", mobile:"2323232323"}
        
        await connectDB();
        let userExist = await User.find({ email: dataa?.email });

        if (userExist.length > 0) {
            return NextResponse.json({ message: "User already exists" }, { status: 409 });
        }
        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000); 

        // Create a new OTP entry in the Otp collection
        const otpData = {
            name:dataa?.name,
            email: dataa?.email,
            mobileNumber: dataa?.mobile,
            otp: otp,
            createdAt: new Date(),
        };
        const otpExists = await Otp.find({email:dataa?.email});
        if(!otpExists){
            await emailRegistration(dataa?.email, otp, "StyleDivaa OTP Verification"); 
            await Otp.create(otpData);
            return NextResponse.json({ message: "User Created and OTP Sent" }, { status: 201 });
        }
        await emailRegistration(dataa?.email, otpExists.otp, "StyleDivaa OTP Verification"); 
       
        console.log("OTP created:", otp);


    
        

        return NextResponse.json({ message: "User Created and OTP Sent" }, { status: 201 });
    } catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return NextResponse.json({ message: "User Already Exists" }, { status: 409 });
        }
        return NextResponse.json({ message: "Failed to create user" }, { status: 500 });
    }
}
