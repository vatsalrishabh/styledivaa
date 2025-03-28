import nodemailer from "nodemailer";

// Configure the transporter for sending emails
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.Nodemailer_Email, // Your PulseCare email address
        pass: process.env.Nodemailer_Pass, // Your email password (store securely in environment variables)
    },
});

// Function to send notification to admin
export const sendAdminNotification = async (name, number, subject, message) => {
    const mailOptions = {
        from: process.env.Nodemailer_Email,
        to: "rathnastylediva19@gmail.com", // Admin email address
        subject: `New Contact Request - ${subject}`,
        text: `New contact request received:\n\nName: ${name}\nNumber: ${number}\nSubject: ${subject}\nMessage: ${message}`,
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Number:</strong> ${number}</p>
               <p><strong>Subject:</strong> ${subject}</p>
               <p><strong>Message:</strong> ${message}</p>`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Admin notification sent:", info.response);
    } catch (error) {
        console.error("Error sending admin email:", error);
    }
};

// Function to send confirmation to user
export const sendUserConfirmation = async (to, ticketId, name, number, subject, message) => {
    const mailOptions = {
        from: process.env.Nodemailer_Email,
        to, // User email
        subject: "Your Contact Request Has Been Received",
        text: `Dear ${name},\n\nThank you for reaching out. Your ticket ID is ${ticketId}.\n\nDetails:\nName: ${name}\nNumber: ${number}\nSubject: ${subject}\nMessage: ${message}\n\nOur team will get back to you soon.`,
        html: `<p>Dear ${name},</p>
               <p>Thank you for reaching out. Your ticket ID is <strong>${ticketId}</strong>.</p>
               <p><strong>Name:</strong> ${name}</p>
               <p><strong>Number:</strong> ${number}</p>
               <p><strong>Subject:</strong> ${subject}</p>
               <p><strong>Message:</strong> ${message}</p>
               <p>Our team will get back to you soon.</p>`,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("User confirmation sent:", info.response);
    } catch (error) {
        console.error("Error sending user email:", error);
    }
};
