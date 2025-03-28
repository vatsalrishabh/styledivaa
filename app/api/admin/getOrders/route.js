import { NextResponse } from "next/server";
import Order from "../../models/Order";
import connectDB from "../../config/db"; 

// @api - api/admin/getOrders
// @method - POST
// @access - ADMIN
export async function POST(request) {
    try {
        await connectDB(); // Ensure database connection
        // Find all orders by email
        const allOrders = await Order.find({});

        if (!allOrders || allOrders.length === 0) {
            return NextResponse.json({ message: "No orders found for this email" }, { status: 404 });
        }

        // Return the orders
        return NextResponse.json({ orders: allOrders }, { status: 200 });

    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
