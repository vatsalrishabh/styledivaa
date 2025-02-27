import { NextResponse } from "next/server";
import connectDB from "../../config/db";
import ContactUs from "../../model/ContactUs"; // Import the ContactUs model
import crypto from "crypto";
import { sendAdminNotification, sendUserConfirmation } from "../../utils/contactUs"; // Import email functions

// @api - api/users/contactus
// @method - POST
// @access - PUBLIC
export async function POST(request) {
    try {
        const { name, number, subject, message, email } = await request.json();

        await connectDB(); // Connect to MongoDB

        // Generate a unique Ticket ID
        const ticketId = "TID-" + crypto.randomBytes(3).toString("hex").toUpperCase();

        // Save the contact request in the database
        const contactEntry = new ContactUs({
            ticketId,
            name,
            number,
            subject,
            message,
        });

        await contactEntry.save();

        // Send notification to admin
        await sendAdminNotification(name, number, subject, message);

        // Send confirmation email to the user
        await sendUserConfirmation(email, ticketId, name, number, subject, message);

        return NextResponse.json({ message: "Contact request submitted successfully" }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Failed to submit request" }, { status: 500 });
    }
}
