import { NextResponse } from "next/server";
import User from "../../models/User";
import connectDB from "../../config/db"; 

// @api - api/users/getAddress
// @method - POST
// @access - PUBLIC
export async function POST(request) {
    try {
        await connectDB(); // Ensure database connection
        
        const { email } = await request.json();

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: "Email not registered" }, { status: 400 });
        }

        // Return the user's addresses properly
        return NextResponse.json({ addresses: user.addresses }, { status: 200 });

    } catch (error) {
        console.error("Error fetching address:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
