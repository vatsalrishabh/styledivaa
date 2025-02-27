import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "../../model/User";
import { generateToken } from "../../config/jwtGenerator";
import connectDB from "../../config/db";

// @api - api/admin/login
// @method - POST
// @access - Admin
export async function POST(request) {
    try {
        await connectDB(); // Ensure database connection
        
        const { email, password, role } = await request.json();

        // Only allow admins
        if (role !== "admin") {
            return NextResponse.json({ message: "You are unauthorized" }, { status: 403 });
        }

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "Email not registered" }, { status: 400 });
        }

        // Secure password comparison using bcrypt
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: "Incorrect password" }, { status: 401 });
        }

        // Generate JWT Token
        const token = generateToken({ 
            email: user.email, 
            name: user.name, 
            mobile: user.mobileNumber, 
            isLoggedIn: true 
        });

        // Convert user to a plain object and remove sensitive info
        const userData = user.toObject();
        delete userData.password;
        delete userData._id;

        return NextResponse.json({ 
            message: "Login successful", 
            token,  
            user: {
                name: userData.name,
                email: userData.email,
                mobile: userData.mobileNumber,
                userId: userData.userId,
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
