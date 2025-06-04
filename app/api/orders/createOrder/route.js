import Razorpay from 'razorpay';
import { NextResponse } from 'next/server';
import connectDB from '../../config/db';
import Order from '../../models/Order';

export async function POST(req) {
  const body = await req.json();
  console.log(body);

  try {
    await connectDB();

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: body.totalAmount * 100, // in paise
      currency: 'INR',
      receipt: 'receipt_001',
      notes: { order_notes: 'Order notes here' },
    };

    const razorpayOrder = await razorpay.orders.create(options);

    const newOrder = new Order({
      name: body.address.name,
      email: body.address.email,
      mobileNumber: body.address.mobileNumber,
      roomNumber: body.address.roomNumber,
      floor: body.address.floor,
      houseNumber: body.address.houseNumber,
      streetAddress: body.address.streetAddress,
      city: body.address.city,
      state: body.address.state,
      zipcode: body.address.zipcode,
      items: body.items, // ✅ will work now since schema and payload match
      paymentMethod: body.paymentMethod,
      paymentId: razorpayOrder.id,
      razorpayId: razorpayOrder.id,
      paymentStatus: 'Pending',
      deliveryStatus: 'Pending',
    });

    await newOrder.save();

    return NextResponse.json(razorpayOrder);
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
