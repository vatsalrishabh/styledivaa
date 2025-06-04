import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  CreditCardIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import Script from "next/script";
import SnackBarr from "../components/SnackBarr";

const StepTwo = ({ gotoPrevStep }) => {
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [finalCart, setFinalCart] = useState(null); // 1. Initialize finalCart to nul
  const [snackMessage, setSnackMessage] = useState("");
  const [showSnackBar, setShowSnackBar] = useState(false);

  useEffect(() => {
 
    const cartData = JSON.parse(localStorage.getItem("finalCart")); //   // finalCart structure example:
  // {
  //   loggedInUser: { ... }, // user info (not used here)
  //   allAddress: {
  //     name: "Vatsal Rishabh Pandey",
  //     mobileNumber: "8123573669",
  //     streetAddress: "234/2 LAN STREET",
  //     houseNumber: "G-02 Lake beauty appartment KR puram banmglore",
  //     roomNumber: "flat 32 ",
  //     floor: "2nd floor",
  //     city: "Bengaluru",
  //     state: "Uttar Pradesh",
  //     zipcode: "211008",
  //     email: "vatsalrishabh00@gmail.com",
  //     category: "Home"
  //   },
  //   cartItems: [
  //     {
  //       productId: "PRD000001",
  //       name: "Product one ",
  //       price: 1300,
  //       mrp: 1500,
  //       discount: 13.33,
  //       image: "/uploads/PRD000001-imageFour.png",
  //       color: "blue",
  //       size: "XXL",
  //       quantity: 2,
  //       id: "PRD000001-blue-XXL"
  //     },
  //     {
  //       productId: "PRD000001",
  //       name: "Product one ",
  //       price: 1300,
  //       mrp: 1500,
  //       discount: 13.33,
  //       image: "/uploads/PRD000001-image1.jpg",
  //       color: "red",
  //       size: "L",
  //       quantity: 4,
  //       id: "PRD000001-red-L"
  //     }
  //   ]
  // }
    if (cartData) {
      setFinalCart({
        ...cartData, // spread operator to include all properties from cartDat
        allAddress: [cartData.formData], // converting formData into address array
      });
        console.log(finalCart)
    }
  }, []);

  const placeOrder = async () => {
    const { cartItems, allAddress } = finalCart || {};

    if (!allAddress || allAddress.length === 0) {
      setSnackMessage("Address not found! Please add your shipping address.");
      setShowSnackBar(true);
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      setSnackMessage("Your cart is empty! Add items before checkout.");
      setShowSnackBar(true);
      return;
    }

    try {
      const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      const gst = subtotal * 0.18;
      const totalWithGst = subtotal + gst;

      const orderData = {
        address: allAddress[0],
        items: cartItems,
        paymentMethod,
        totalAmount: totalWithGst, // <-- send total with GST
      };

      const response = await axios.post("/api/orders/createOrder", orderData);

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: Math.round(totalWithGst * 100), // <-- use totalWithGst
        currency: "INR",
        name: "Styledivaa Fashion Boutique",
        description: "Product Purchase",
        order_id: response.data.id,
        callback_url: `/api/orders/paymentSuccess`,
        prefill: {
          name: allAddress[0]?.name || "",
          email: allAddress[0]?.email || "noemail@example.com",
          contact: allAddress[0]?.mobileNumber || "",
        },
        theme: {
          color: "#a32121",
        },
        handler: async function (response) {
          try {
            const verificationResponse = await axios.post(
              `/api/orders/verifyPayment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderData,
              }
            );

            if (verificationResponse.data.status === "ok") {
              localStorage.removeItem("finalCart");
              window.location.href = "/";
            } else {
              console.error("Payment verification failed");
            }
          } catch (error) {
            console.error("Error verifying payment:", error);
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Try again.");
    }
  };

  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      {showSnackBar && (
        <SnackBarr
          message={snackMessage}
          severity="error"
          open={showSnackBar}
          onClose={() => setShowSnackBar(false)}
        />
      )}

      <div className="bg-pink-50 min-h-screen w-full flex flex-col md:flex-row justify-center items-center p-12">
        {/* Payment Method Selection */}
        <div className="w-full md:w-1/2 bg-white p-10 rounded-2xl shadow-lg">
          <h2 className="text-pink-600 text-3xl font-bold flex items-center gap-2 mb-6">
            <CreditCardIcon className="h-8 w-8 text-pink-500" />
            Select Payment Method
          </h2>

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
            <p className="text-green-600 text-sm mt-2">
              Save ₹15, pay ₹231 instead.
            </p>
          </div>
        </div>

        {/* Price Details */}
        <div className="w-full md:w-1/2 bg-white p-10 rounded-2xl shadow-lg md:ml-10 mt-8 md:mt-0">
          <h2 className="text-pink-600 text-3xl font-bold flex items-center gap-2 mb-6">
            <ShoppingCartIcon className="h-8 w-8 text-pink-500" />
            Price Details
          </h2>

          {finalCart ? (
            <div className="bg-pink-100 p-6 rounded-2xl text-lg">
              <p className="text-gray-700 font-semibold mb-4">
                User: {finalCart?.allAddress[0]?.name}
                <br />
                Address:{" "}
                {`${finalCart.allAddress[0]?.roomNumber || ""} ${
                  finalCart.allAddress[0]?.houseNumber || ""
                }, ${finalCart.allAddress[0]?.floor || ""}, ${
                  finalCart.allAddress[0]?.streetAddress || ""
                }, ${finalCart.allAddress[0]?.city || ""}, ${
                  finalCart.allAddress[0]?.state || ""
                } - ${finalCart.allAddress[0]?.zipcode || ""}`}
              </p>

              <hr className="my-4 border-gray-300" />

              <div className="max-h-40 overflow-y-auto">
                {finalCart.cartItems.map((item, idx) => (
                  <p
                    key={idx}
                    className="text-gray-800 flex justify-between"
                  >
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </p>
                ))}
              </div>

              <hr className="my-4 border-gray-300" />
              {/* GST Calculation */}
              {(() => {
                const subtotal = finalCart.cartItems.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                );
                const gst = subtotal * 0.18;
                const totalWithGst = subtotal + gst;
                return (
                  <>
                    <p className="flex justify-between text-gray-800 font-semibold text-lg">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between text-gray-800 font-semibold text-lg">
                      <span>GST (18%)</span>
                      <span>₹{gst.toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between text-gray-800 font-bold text-xl mt-2">
                      <span>Order Total</span>
                      <span>₹{totalWithGst.toFixed(2)}</span>
                    </p>
                  </>
                );
              })()}
            </div>
          ) : (
            <p className="text-red-500 text-center">No cart data available</p>
          )}

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
                finalCart?.allAddress?.length === 0 ||
                finalCart?.cartItems?.length === 0
              }
              className="w-1/2 bg-pink-600 text-white px-6 py-4 rounded-lg hover:bg-pink-700 transition text-lg"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepTwo;
