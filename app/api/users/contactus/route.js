import { NextResponse } from "next/server";
import connectDB from "../../config/db";
import ContactUs from "../../models/ContactUs";
import crypto from "crypto";
import { sendAdminNotification, sendUserConfirmation } from "../../utils/contactUs";

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, number, subject, message, email } = body;
        console.log()
        await connectDB(); 

        const ticketId = "TID-" + crypto.randomBytes(3).toString("hex").toUpperCase();

        const contactEntry = new ContactUs({
            ticketId,
            name,
            number,
            subject,
            message,
        });

        await contactEntry.save();

        await sendAdminNotification(name, number, subject, message);
        await sendUserConfirmation(email, ticketId, name, number, subject, message);

        return NextResponse.json({ success: true, message: "Contact request submitted successfully" }, { status: 201 });
    } catch (error) {
        console.error("Error in contact API:", error);
        return NextResponse.json({ success: false, message: "Failed to submit request" }, { status: 500 });
    }
}
