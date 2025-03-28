import { NextRequest, NextResponse } from "next/server";

// Access - Public
// Method - POST
// API - /api/orders/paymentSuccess
export async function POST(req) {
  try {
    const htmlResponse = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Success</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                text-align: center;
                margin: 50px;
            }
            .success-message {
                color: green;
                font-size: 24px;
                margin-top: 20px;
            }
            .thank-you {
                font-size: 20px;
            }
        </style>
    </head>
    <body>
        <h1>Payment Successful!</h1>
        <p class="success-message">Thank you for your payment.</p>
        <p class="thank-you">Your transaction was completed successfully.</p>
    </body>
    </html>`;

    return new NextResponse(htmlResponse, {
      status: 200,
      headers: { "Content-Type": "text/html" },
    });
  } catch (error) {
    console.error("Error processing payment success response:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
