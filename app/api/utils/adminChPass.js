import nodemailer from "nodemailer";

// Configure the transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.Nodemailer_Email,
        pass: process.env.Nodemailer_Pass
    }
});

// Function to verify transporter (using Promises)
const verifyTransporter = () => {
    return new Promise((resolve, reject) => {
        transporter.verify((error, success) => {
            if (error) {
                console.error("Transporter verification failed:", error);
                reject(error);
            } else {
                console.log("Server is ready to take our messages");
                resolve(success);
            }
        });
    });
};

// Call transporter verification (non-blocking)
verifyTransporter().catch(err => console.error("Transporter Error:", err));

// Function to send OTP email
export const adminChPass = (to, otp, subject) => {
    const mailOptions = {
        from: process.env.Nodemailer_Email,
        to,
        subject,
        text: `${subject}: ${otp}`,
        html: `
            <div style="font-family: 'Arial', sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #E91E63; text-align: center;">Welcome to StyleDivaa!</h2>
                <p style="font-size: 16px;">Dear Fashion Lover,</p>
                <p style="font-size: 16px;">To change Admin Password, use the One-Time Password (OTP) below:</p>
                <div style="text-align: center; margin: 20px 0;">
                    <span style="font-size: 24px; font-weight: bold;">Your OTP: ${otp}</span>
                </div>
                <p style="color: #777; font-size: 14px;">Best regards,<br/>The StyleDivaa Team</p>
            </div>
        `,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error("Error sending email:", error);
                reject(error);
            } else {
                console.log("Email sent:", info.response);
                resolve(info);
            }
        });
    });
};
