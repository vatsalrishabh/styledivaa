import React, { useState } from "react";
import { CreditCardIcon, InformationCircleIcon, ShoppingCartIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

const StepTwo = ({ gotoPrevStep }) => {
  const [paymentMethod, setPaymentMethod] = useState("cod"); // Default: Cash on Delivery
  const [showTooltip, setShowTooltip] = useState(false);

  return (
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
            paymentMethod === "cod" ? "border-pink-500 bg-pink-100" : "border-gray-300"
          }`} 
          onClick={() => setPaymentMethod("cod")}
        >
          <label className="flex justify-between items-center cursor-pointer">
            <span className="text-gray-700 font-semibold">Cash on Delivery</span>
            <input type="radio" checked={paymentMethod === "cod"} className="form-radio text-pink-600" readOnly />
          </label>
          <p className="text-gray-500 text-sm mt-2">Pay ₹246 on delivery.</p>
        </div>

        {/* Online Payment */}
        <div 
          className={`p-6 mt-6 rounded-2xl border-2 cursor-pointer transition text-lg ${
            paymentMethod === "online" ? "border-pink-500 bg-pink-100" : "border-gray-300"
          }`} 
          onClick={() => setPaymentMethod("online")}
        >
          <label className="flex justify-between items-center cursor-pointer">
            <span className="text-gray-700 font-semibold">Pay Online</span>
            <input type="radio" checked={paymentMethod === "online"} className="form-radio text-pink-600" readOnly />
          </label>
          <p className="text-green-600 text-sm mt-2">Save ₹15, pay ₹231 instead.</p>
        </div>

        {/* Reselling Section */}
        <div className="mt-10">
          <p className="text-gray-700 text-lg font-semibold flex items-center gap-2">
            Reselling the order?
            <InformationCircleIcon 
              className="h-6 w-6 text-gray-500 cursor-pointer"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            />
          </p>
          {showTooltip && (
            <div className="absolute mt-2 bg-black text-white text-sm px-4 py-2 rounded-lg shadow-lg">
              Select 'Yes' to add the final price for your customer.
            </div>
          )}
          <div className="flex gap-6 mt-4">
            <button className="bg-gray-300 px-6 py-3 rounded-lg hover:bg-gray-400 transition text-lg">No</button>
            <button className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition text-lg">Yes</button>
          </div>
        </div>
      </div>

      {/* Right Section - Price Details & Place Order */}
      <div className="w-full md:w-1/2 bg-white p-10 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 md:ml-10 mt-8 md:mt-0">
        <h2 className="text-pink-600 text-3xl font-bold flex items-center gap-2 mb-6">
          <ShoppingCartIcon className="h-8 w-8 text-pink-500" />
          Price Details (1 Item)
        </h2>

        <div className="bg-pink-100 p-6 rounded-2xl text-lg">
          <p className="flex justify-between text-gray-700 font-semibold">
            <span>Total Product Price</span>
            <span>₹246</span>
          </p>
          <hr className="my-4 border-gray-300" />
          <p className="flex justify-between text-gray-800 font-bold text-xl">
            <span>Order Total</span>
            <span>{paymentMethod === "online" ? "₹231" : "₹246"}</span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-6 mt-10">
          <button 
            onClick={gotoPrevStep} 
            className="w-1/2 bg-gray-500 text-white px-6 py-4 rounded-lg hover:bg-gray-700 transition text-lg">
            Back
          </button>
          <button 
            className="w-1/2 bg-pink-500 text-white px-6 py-4 rounded-lg flex items-center justify-center gap-2 hover:bg-pink-700 transition transform hover:scale-105 text-lg">
            <CheckCircleIcon className="h-6 w-6" />
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
