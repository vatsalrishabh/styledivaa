"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode"; 
import "animate.css"; 
import { FaBoxOpen, FaMoneyCheckAlt, FaShippingFast } from "react-icons/fa";

const OrderAfterLogin = () => {
    const [yourOrders, setYourOrders] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const loadUserDetails = () => {
            const userDetails = localStorage.getItem("userDetails");

            if (!userDetails) {
                router.push("/home");
                return;
            }

            try {
                const parsedData = JSON.parse(userDetails);
                const decodedToken = jwtDecode(parsedData.token);
                setLoggedInUser(decodedToken);
            } catch (error) {
                console.error("Error decoding token:", error);
                router.push("/home");
            }
        };

        loadUserDetails();
    }, [router]);

    useEffect(() => {
        if (!loggedInUser) return;

        const fetchAllOrders = async () => {
            try {
                const response = await axios.post(`/api/users/getOrders`, {
                    email: loggedInUser.email,
                });

                if (response.data.orders) {
                    setYourOrders(response.data.orders);
                } else {
                    console.warn("No orders found for this user.");
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllOrders();
    }, [loggedInUser]);

    return (
        <div className="p-6 bg-pink-100 min-h-screen animate__animated animate__fadeIn">
            <h2 className="text-2xl font-bold text-pink-800 mb-6 text-center">Your Orders</h2>

            {loading ? (
                <p className="text-center text-pink-600">Loading orders...</p>
            ) : yourOrders.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {yourOrders.map((order) => (
                        <div
                            key={order._id}
                            className="relative p-4 bg-white/60 backdrop-blur-lg rounded-2xl shadow-lg border border-pink-300 hover:scale-[1.02] transition-transform duration-300 hover:shadow-xl"
                        >
                            <img 
                                src={order.imageOne} 
                                alt="Product" 
                                className="w-full h-44 object-cover rounded-lg border border-pink-200"
                            />

                            <div className="p-3">
                                <h3 className="text-lg font-bold text-pink-900">
                                    {order.productId}
                                </h3>
                                
                                <p className="text-sm text-gray-700 mb-2">
                                    Category: <span className="font-medium">{order.category}</span>
                                </p>

                                <div className="flex items-center gap-2 text-gray-800 text-sm">
                                    <FaBoxOpen className="text-pink-500" />
                                    <span>Qty: {order.quantity} | Price: ₹{order.price} (MRP: ₹{order.mrp})</span>
                                </div>

                                <div className="flex items-center gap-2 text-gray-800 text-sm mt-1">
                                    <FaMoneyCheckAlt className="text-green-500" />
                                    <span className="font-medium">Payment: {order.paymentStatus}</span>
                                </div>

                                <div className="flex items-center gap-2 text-gray-800 text-sm mt-1">
                                    <FaShippingFast className="text-blue-500" />
                                    <span className="font-medium">Delivery: {order.deliveryStatus}</span>
                                </div>

                                <p className="text-xs text-gray-500 mt-2">
                                    Ordered on: {new Date(order.createdAt).toLocaleDateString()}
                                </p>

                                {/* Gradient Border Line */}
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-pink-400 to-pink-600 rounded-b-lg"></div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-pink-700">No orders found.</p>
            )}
        </div>
    );
};

export default OrderAfterLogin;
