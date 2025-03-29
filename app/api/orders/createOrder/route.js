import Razorpay from 'razorpay';
import { NextRequest, NextResponse } from 'next/server';
import connectDB from "../../config/db";
import Order from "../../models/Order";


//Access - Public
//Method - POST
//API - api/orders/createOrder
export async function POST(req) {
  try {
    // Connect to the database
    await connectDB();

    // Initialize Razorpay
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Parse request body
    const body = await req.json();
    console.log(body);

    // Create orderData from the incoming request body
    const orderData = {
      amount: body.totalAmount, // Total amount for the order
      currency: "INR", // Currency type
      receipt: 'receipt_001', // Unique receipt ID
      notes: { order_notes: 'Order notes here' }, // Notes should be an object
      name: body.user.name, // User's name
      email: body.user.email, // User's email
      mobileNumber: body.user.mobile, // User's mobile number
      roomNumber: body.address.roomNumber, // Room number
      floor: body.address.floor, // Floor number
      houseNumber: body.address.houseNumber, // House number
      streetAddress: body.address.streetAddress, // Street address
      city: body.address.city, // City
      state: body.address.state, // State
      zipcode: body.address.zipcode, // Zip code
      imageOne: body.items[0].imageOne, // Item image
      category: body.items[0].category, // Item category
      quantity: body.items[0].quantity, // Item quantity
      productId: body.items[0].productId, // Product ID
      price: body.items[0].price, // Product price
      mrp: body.items[0].mrp, // MRP
      discount: body.items[0].discount // Discount
    };

    console.log(orderData);

    // Razorpay order options
    const options = {
      amount: orderData.amount * 100, // Convert to paise (Razorpay expects amount in paise)
      currency: orderData.currency,
      receipt: orderData.receipt,
      notes: orderData.notes, // Send notes as an object
    };

    // Create Razorpay order
    const razorpayOrder = await razorpay.orders.create(options);

    // Create order document to save in the database
    const newOrder = new Order({
      name: orderData.name,
      email: orderData.email,
      mobileNumber: orderData.mobileNumber,
      roomNumber: orderData.roomNumber,
      floor: orderData.floor,
      houseNumber: orderData.houseNumber,
      streetAddress: orderData.streetAddress,
      city: orderData.city,
      state: orderData.state,
      zipcode: orderData.zipcode,
      imageOne: orderData.imageOne,
      category: orderData.category,
      quantity: orderData.quantity,
      productId: orderData.productId,
      price: orderData.price,
      mrp: orderData.mrp,
      discount: orderData.discount,
      paymentId: razorpayOrder.id, // Store Razorpay order ID
      razorpayId: razorpayOrder.id, // Razorpay ID for tracking
      paymentStatus: 'Pending', // Initial payment status
      deliveryStatus: 'Pending', // Initial delivery status
    });

    // Save order in the database
    await newOrder.save();

    // Return the Razorpay order details
    return NextResponse.json(razorpayOrder);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
