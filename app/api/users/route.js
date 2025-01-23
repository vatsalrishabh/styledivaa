// app/api/users/route.js (POST route)
import { NextResponse } from 'next/server';
import connectMongoDB from '../config/db';
import User from '../model/User';

export async function POST(request) {
    try {

        const data = await request.json();
        await connectMongoDB();
        await User.create(data); // data should contain all required fields
        return NextResponse.json({ message: "User Created" }, { status: 201 });
    } catch (error) {
        if (error.code === 11000) {
            return NextResponse.json({ message: "User Already Exist" }, { status: 409 })
        }
        return NextResponse.json({ message: "Failed to create user" }, { status: 500 })
    }
}