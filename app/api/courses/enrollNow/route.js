import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../config/db';
import Course from '../../models/Course';

export async function POST(req) {
  try {
    await connectDB(); // Ensure database connection is established

    // Get the data from the request body
    const { name, email, phone, course } = await req.json();

    // Validate the data
    if (!name || !email || !phone || !course) {
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create a new course enrollment entry
    const enrollment = new Course({
      name,
      email,
      phone,
      course,
    });

    // Save the enrollment to the database
    await enrollment.save();

    // Respond with a success message
    return NextResponse.json(
      { message: 'Enrollment successful!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error during enrollment:', error);

    // Return error message in case of failure
    return NextResponse.json(
      { message: 'An error occurred during enrollment' },
      { status: 500 }
    );
  }
}
