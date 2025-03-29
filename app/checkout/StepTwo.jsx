import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CreditCardIcon,
  ShoppingCartIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import Script from "next/script";
import SnackBarr from "../components/SnackBarr";

const StepTwo = ({ gotoPrevStep }) => {
  const [paymentMethod, setPaymentMethod] = useState("cod"); // Default: Cash on Delivery
  const [finalCart, setFinalCart] = useState(null);
    const [snackMessage, setSnackMessage] = useState("");
    const [statusCode, setStatusCode] = useState(null);
    const [showSnackBar, setShowSnackBar] = useState(false);


  // Load cart details from localStorage
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("finalCart"));
    if (cartData) {
      setFinalCart(cartData);
      console.log(cartData?.loggedInUser);
      console.log(cartData?.allAddress?.[0]);
      console.log(cartData?.cartItems);
      console.log(cartData?.allAddress?.[0]?.city);
    }
  }, []);

  // Handle Order Placement
  const placeOrder = async () => {
    if (!user?.userName || !user?.userEmail || !user?.userNumber) {
      setSnackMessage("User details missing! Please complete your profile.");
      setShowSnackBar(true);
      return;
    }

    if (!user?.address) {
      setSnackMessage("Address not found! Please add your shipping address.");
      setShowSnackBar(true);
      return;
    }

    if (cartItems.length === 0) {
      setSnackMessage("Your cart is empty! Add items before checkout.");
      setShowSnackBar(true);
      return;
    }
    if (!finalCart) return;

    try {
      const totalAmount = finalCart?.cartItems?.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      const orderData = {
        user: finalCart?.loggedInUser,
        address: finalCart?.allAddress?.[0], // Assuming the first address is selected
        items: finalCart?.cartItems,
        paymentMethod,
        totalAmount,
      };

      const response = await axios.post(
        "/api/orders/createOrder",
        orderData
      );
      console.log("Order Response:", response.data);
      // Clear cart after order placement


      const options = {
        key: 'rzp_test_l0gnUnaG8U4VmM',
        amount: totalAmount * 100,
        currency: "INR",
        name: 'Styledivaa Fashion Boutique',
        description: 'Product Purchase',
        order_id: response.data.id,  // Ensure `order.id` exists
        callback_url: `api/orders/paymentSuccess`,
        prefill: {
          name: finalCart?.loggedInUser?.name,
          email: finalCart?.loggedInUser?.email,
          contact: finalCart?.loggedInUser?.mobile,
        },
        theme: {
          color: '#a32121',
        },
        handler: async function (response) {
          try {
            const verificationResponse = await axios.post(`/api/orders/verifyPayment`, {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            if (verificationResponse.data.status === 'ok') {
              window.location.href = '/'; // take to donate page
            } else {
              console.error('Payment verification failed');
            }
          } catch (error) {
            console.error('Error verifying payment:', error);
          }
        }
      };


      const rzp = new window.Razorpay(options);
      rzp.open();
      // localStorage.removeItem("finalCart");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Try again.");
    }
  };

  return (
<>

{/* razorpay script starts */}
<Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
{/* razorpay script ends */}    

<div className="bg-pink-50 min-h-screen w-full flex flex-col md:flex-row justify-center items-center p-12">
      {/* Left Section - Payment Options */}
      <div className="w-full md:w-1/2 bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-105">
        <h2 className="text-pink-600 text-3xl font-bold flex items-center gap-2 mb-6">
          <CreditCardIcon className="h-8 w-8 text-pink-500" />
          Select Payment Method
        </h2>

        {/* Cash on Delivery */}
        <div
          className={`p-6 mt-6 rounded-2xl border-2 cursor-pointer transition text-lg ${
            paymentMethod === "cod"
              ? "border-pink-500 bg-pink-100"
              : "border-gray-300"
          }`}
          onClick={() => setPaymentMethod("cod")}
        >
          <label className="flex justify-between items-center cursor-pointer">
            <span className="text-gray-700 font-semibold">Cash on Delivery</span>
            <input
              type="radio"
              checked={paymentMethod === "cod"}
              className="form-radio text-pink-600"
              readOnly
            />
          </label>
          <p className="text-gray-500 text-sm mt-2">Pay on delivery.</p>
        </div>

        {/* Online Payment */}
        <div
          className={`p-6 mt-6 rounded-2xl border-2 cursor-pointer transition text-lg ${
            paymentMethod === "online"
              ? "border-pink-500 bg-pink-100"
              : "border-gray-300"
          }`}
          onClick={() => setPaymentMethod("online")}
        >
          <label className="flex justify-between items-center cursor-pointer">
            <span className="text-gray-700 font-semibold">Pay Online</span>
            <input
              type="radio"
              checked={paymentMethod === "online"}
              className="form-radio text-pink-600"
              readOnly
            />
          </label>
          <p className="text-green-600 text-sm mt-2">Save ₹15, pay ₹231 instead.</p>
        </div>
      </div>

      {/* Right Section - Price Details & Place Order */}
      <div className="w-full md:w-1/2 bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 md:ml-10 mt-8 md:mt-0">
        <h2 className="text-pink-600 text-3xl font-bold flex items-center gap-2 mb-6">
          <ShoppingCartIcon className="h-8 w-8 text-pink-500" />
          Price Details
        </h2>

        {finalCart ? (
          <div className="bg-pink-100 p-6 rounded-2xl text-lg">
            {/* User Details */}
            <p className="text-gray-700 font-semibold">
              <span className="block">
                User: {finalCart?.loggedInUser?.name || "N/A"}
              </span>
              <span className="block">
                Address: { 
                  `${finalCart?.allAddress?.[0]?.roomNumber || ""} 
                  ${finalCart?.allAddress?.[0]?.houseNumber || ""}, 
                  ${finalCart?.allAddress?.[0]?.floor || ""}, 
                  ${finalCart?.allAddress?.[0]?.streetAddress || ""}, 
                  ${finalCart?.allAddress?.[0]?.city || ""}, 
                  ${finalCart?.allAddress?.[0]?.state || ""} - 
                  ${finalCart?.allAddress?.[0]?.zipcode || "N/A"}`.trim()
                }
              </span>
            </p>
            <hr className="my-4 border-gray-300" />

            {/* Cart Items */}
            <div className="max-h-40 overflow-y-auto">
              {finalCart?.cartItems?.map((item, index) => (
                <p key={index} className="text-gray-800 flex justify-between">
                  <span>
                    {item?.name} x {item?.quantity}
                  </span>
                  <span>₹{item?.price * item?.quantity}</span>
                </p>
              ))}
            </div>
            <hr className="my-4 border-gray-300" />

            {/* Order Total */}
            <p className="flex justify-between text-gray-800 font-bold text-xl">
              <span>Order Total</span>
              <span>
                ₹{finalCart?.cartItems?.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )}
              </span>
            </p>
          </div>
        ) : (
          <p className="text-red-500 text-center">No cart data available</p>
        )}

        {/* Buttons */}
        <div className="flex gap-6 mt-10">
          <button
            onClick={gotoPrevStep}
            className="w-1/2 bg-gray-500 text-white px-6 py-4 rounded-lg hover:bg-gray-700 transition text-lg"
          >
            Back
          </button>
          <button
            onClick={placeOrder}
            disabled={
              !finalCart?.loggedInUser?.name ||
              finalCart?.allAddress?.length === 0 ||
              finalCart?.cartItems?.length === 0
            }
            className={`w-1/2 px-6 py-4 rounded-lg flex items-center justify-center gap-2 text-lg transition transform hover:scale-105 ${
              !finalCart?.loggedInUser?.name ||
              finalCart?.allAddress?.length === 0 ||
              finalCart?.cartItems?.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-pink-500 text-white hover:bg-pink-700"
            }`}
          >
            <CheckCircleIcon className="h-6 w-6" />
            Place Order
          </button>
        </div>
      </div>
    </div>
    {showSnackBar && <SnackBarr message={snackMessage} statusCode={statusCode} showSnackBar={showSnackBar} />}

</>

  );
};

export default StepTwo;
