import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import Order from "../../models/Order";
import Product from "../../models/Product";
import { receiptToCx } from "../../utils/receiptToCx";

export async function POST(req) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature,orderData } = await req.json();
    console.log("verify payment ")
    console.log(razorpay_payment_id );
        console.log(razorpay_signature );
            console.log(orderData );

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      throw new Error("Razorpay secret key is missing. Check your environment variables.");
    }

    // Create HMAC SHA256 signature
    const hmac = crypto.createHmac("sha256", secret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest("hex");

    // Validate signature
    const isValidSignature = generatedSignature === razorpay_signature;

    if (!isValidSignature) {
      return NextResponse.json({ status: "error", message: "Invalid signature" }, { status: 400 });
    }

    console.log("✅ Signature valid:", isValidSignature);

    // **Update Payment Status in Database**
    const updatedOrder = await Order.findOneAndUpdate(
      { razorpayId:razorpay_order_id },
      { $set: { paymentStatus: "Paid", razorpay_payment_id } }, // Fixing paymentStatus field name
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ status: "error", message: "Order not found" }, { status: 404 });
    }
    // //update the stock in database 


    await receiptToCx(orderData.address.email, "Payment Receipt", razorpay_payment_id,orderData);
    return NextResponse.json({ 
      status: "ok", 
      message: "Payment verified & order updated", 
      order: updatedOrder 
    });
  } catch (error) {
    console.error("❌ Error verifying payment:", error);
    return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 });
  }
}
