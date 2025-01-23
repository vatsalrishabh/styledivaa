import { NextResponse } from "next/server";
import connectDb from "./config/db";

// Database model import, if needed
// import MyModel from './models/MyModel';

export async function GET() {
  try {
    // Establish the database connection
    await connectDb();

 
    return NextResponse.json({ hello: "world" });

  } catch (error) {
    // Error handling
    console.error(error);
    return NextResponse.json({ error: "Failed to connect to the database" }, { status: 500 });
  }
}
