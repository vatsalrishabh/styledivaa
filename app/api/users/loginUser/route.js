import { NextResponse } from "next/server";
import User from "../../models/User";
import { generateToken } from "../../config/jwtGenerator";
import connectDB from "../../config/db"; 

// @api - api/users/loginUser
// @method - POST
// @access - PUBLIC
export async function POST(request) {
    try {
        await connectDB(); // Ensure database connection
        
        const { email, password } = await request.json();

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "Email not registered" }, { status: 400 });
        }

        // Compare passwords (assuming passwords are stored as plain text, but hashing is recommended)
        if (user.password !== password) {
            return NextResponse.json({ message: "Incorrect password" }, { status: 401 });
        }

        // Generate JWT Token
        const token = generateToken({ 
            email: user.email, 
            name: user.name, 
            mobile: user.mobileNumber, 
            isLoggedIn: true 
        });
        delete user.password;
        delete user._id;
        return NextResponse.json({ message: "Login successful", token,  user: {
            name: user.name,
            email: user.email,
            mobile: user.mobileNumber,
            userId:user.userId,
        } }, { status: 200 });

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
