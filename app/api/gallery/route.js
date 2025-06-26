import { NextResponse } from "next/server";
import connectDB from "../config/db";
import InstagramPost from "../models/InstagramPost";

export async function GET() {
  try {
    await connectDB();

  const result =  await InstagramPost.find({});
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching Instagram posts:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(){
  try {
    await connectDB();

  const result =  await InstagramPost.findOneAndDelete({});
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching Instagram posts:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
