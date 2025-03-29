import React from "react";
import { FaTruck, FaDollarSign, FaGlobe, FaClock } from "react-icons/fa";

const page = () => {
  return (
    <div className="bg-pink-100 min-h-screen py-10 px-5 md:px-20">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-pink-600 mb-4 text-center">Shipping and Delivery Policy</h1>
        <p className="text-gray-600 text-center mb-6">Effective Date: March 2025</p>
        
        <div className="space-y-6">
          <section className="flex items-start space-x-4">
            <FaClock className="text-pink-500 text-2xl" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Order Processing & Shipping Time</h2>
              <p className="text-gray-600">Orders are processed within 2-3 business days and shipped within 5-7 business days.</p>
            </div>
          </section>
          
          <section className="flex items-start space-x-4">
            <FaDollarSign className="text-pink-500 text-2xl" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Shipping Costs</h2>
              <p className="text-gray-600">Shipping is free for orders above INR 3000. A flat rate of INR 120 applies for lower orders.</p>
            </div>
          </section>

          <section className="flex items-start space-x-4">
            <FaGlobe className="text-pink-500 text-2xl" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">International Shipping</h2>
              <p className="text-gray-600">We ship worldwide! Delivery times vary based on the destination, typically 10-20 business days.</p>
            </div>
          </section>
        </div>
        
        <div className="mt-8 text-center">
          <FaTruck className="text-pink-500 text-3xl mx-auto" />
          <p className="text-gray-700 mt-2">For any shipping-related queries, contact us at:</p>
          <a href="mailto:support@syledivaa.com" className="text-pink-600 font-semibold hover:underline">
            support@syledivaa.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default page;