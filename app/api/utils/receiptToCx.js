import nodemailer from "nodemailer";

// Configure the transporter for sending emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.Nodemailer_Email,
        pass: process.env.Nodemailer_Pass
    }
});

// Function to verify transporter
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

// Non-blocking verification
verifyTransporter().catch(err => console.error("Transporter Error:", err));

// Function to send OTP + Order Receipt email
export const receiptToCx =  (to,  subject, receipt,orderData) => {

    const mailOptions = {
        from: process.env.Nodemailer_Email,
        to,
        subject,
        cc:"rathnastylediva19@gmail.com",
        text: `Payement Receipt- Order Confirmation`,
        html: `
            <div style="font-family: 'Arial', sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #E91E63; text-align: center;">Welcome to StyleDivaa!</h2>
                <p style="font-size: 16px;">Dear ${orderData.address.name},</p>
                <p style="font-size: 16px;">Thank you for shopping with us! </p>
              

                <hr style="margin: 30px 0;" />

                <h3 style="color: #E91E63;">Order Receipt</h3>
                <p><strong>Receipt ID:</strong> ${receipt}</p>
                <p><strong>Order Amount:</strong> ₹${orderData.totalAmount}</p>
                <p><strong>Payment Status:</strong> Pending</p>

                <h4 style="margin-top: 20px;">Shipping Details:</h4>
                <p>
                    ${orderData.address.name}<br />
                    ${orderData.address.roomNumber}, ${orderData.address.floor}<br />
                    ${orderData.address.houseNumber}<br />
                    ${orderData.address.streetAddress}, ${orderData.address.city}<br />
                    ${orderData.address.state} - ${orderData.address.zipcode}<br />
                    Mobile: ${orderData.address.mobileNumber}<br />
                    Email: ${orderData.address.email ||"NA"}
                </p>

                <h4 style="margin-top: 20px;">Item Details:</h4>
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th style="border: 1px solid #ccc; padding: 8px;">Product</th>
                            <th style="border: 1px solid #ccc; padding: 8px;">Color</th>
                            <th style="border: 1px solid #ccc; padding: 8px;">Qty</th>
                            <th style="border: 1px solid #ccc; padding: 8px;">Price</th>
                            <th style="border: 1px solid #ccc; padding: 8px;">MRP</th>
                            <th style="border: 1px solid #ccc; padding: 8px;">Discount</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${orderData.items.map(item => `
    <tr>
      <td style="border: 1px solid #ccc; padding: 8px;">
        <img src="https://www.styledivadesignerboutique.com/${item.image}" alt="Product Image" width="60" />
        <br />${item.productId}
      </td>
      <td style="border: 1px solid #ccc; padding: 8px;">${item.color}</td>
      <td style="border: 1px solid #ccc; padding: 8px;">${item.quantity}</td>
      <td style="border: 1px solid #ccc; padding: 8px;">₹${item.price}</td>
      <td style="border: 1px solid #ccc; padding: 8px;">₹${item.mrp}</td>
      <td style="border: 1px solid #ccc; padding: 8px;">${item.discount}%</td>
    </tr>
  `).join("")}
                    </tbody>
                </table>
<p style="text-align: right; font-size: 16px; font-weight: bold; margin-top: 10px;">
  Total Amount: ₹${orderData.totalAmount}
</p>
                <p style="color: #777; font-size: 14px; margin-top: 30px;">Best regards,<br/>The StyleDivaa Team</p>
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
