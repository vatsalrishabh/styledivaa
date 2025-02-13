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
   

    // Save the user to the database
  

    return NextResponse.json({ message: "User saved successfully"});


  } catch (error) {
    // Error handling
    console.error(error);
    return NextResponse.json({ error: "Failed to connect to the database" }, { status: 500 });
  }
}
