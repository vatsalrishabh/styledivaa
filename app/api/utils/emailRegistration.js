import nodemailer from "nodemailer";

// Configure the transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other email services if needed
    auth: {
        user: process.env.Nodemailer_Email, // Your email address
        pass: process.env.Nodemailer_Pass  // Your email password (preferably stored securely in environment variables)
    }
});

await new Promise((resolve, reject) => {
    // verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
            reject(error);
        } else {
            console.log("Server is ready to take our messages");
            resolve(success);
        }
    });
});

// Function to send OTP email
const emailRegistration = async (to, otp, subject) => {
    const mailOptions = {
        from: process.env.Nodemailer_Email, // Sender email address
        to, // Recipient email address
        subject: subject, // Email subject
        text: `${subject}: ${otp}. `,
        html: `
            <div style="font-family: 'Arial', sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #E91E63; text-align: center;">Welcome to StyleDivaa!</h2>
                <p style="font-size: 16px; color: #333;">Dear Fashion Lover,</p>
                <p style="font-size: 16px; color: #333;">To complete your registration on StyleDivaa and start shopping the latest trends, please verify your email by using the One-Time Password (OTP) below.</p>
                <div style="text-align: center; margin: 20px 0;">
                    <span style="font-size: 24px; color: #E91E63; font-weight: bold;">Your OTP: ${otp}</span>
                </div>
                <p style="font-size: 16px; color: #333;">Please enter the OTP above to complete your registration. Once verified, you’ll have access to our latest clothing collections and exclusive discounts!</p>
                <p style="text-align: center; margin: 20px 0;">
                    <img src="https://example.com/fashion-image.jpg" alt="Fashion Store" style="width: 100%; max-width: 400px; border-radius: 10px;" />
                </p>
                <p style="font-size: 16px; color: #333;">We’re excited to have you as part of our fashionable community. Happy shopping!</p>
                <p style="color: #777; font-size: 14px;">Best regards,<br/>The StyleDivaa Team</p>
            </div>
        `,
    };

    // Send the email using a Promise
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                reject(error);
            } else {
                console.log('Email sent:', info.response);
                resolve(info);
            }
        });
    });
};

module.exports = {
    emailRegistration
};