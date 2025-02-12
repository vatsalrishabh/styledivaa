import { NextResponse } from "next/server";
import connectDB from "./config/db";
import User from "./model/User";



// @Route- /api
// @Methos- GET
// @Access- Public
export async function GET() {
  try {
    // Establish the database connection
    await connectDB();
    const newUser = new User({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "hashedpassword123", // Ideally, hash the password before saving
    });

    // Save the user to the database
    await newUser.save();

    return NextResponse.json({ message: "User saved successfully", user: newUser });


  } catch (error) {
    // Error handling
    console.error(error);
    return NextResponse.json({ error: "Failed to connect to the database" }, { status: 500 });
  }
}
