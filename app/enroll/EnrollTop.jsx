"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const EnrollTop = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic (e.g., API call)
  };

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-pink-100 rounded-2xl shadow-lg">
      {/* Image & Description Section */}
      <motion.div
        className="flex flex-col items-center text-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Image
          src="/img/wal.jpg"
          alt="Enrollment"
          width={300}
          height={200}
          className="w-4/6 rounded-lg shadow-md"
        />
        <p className="mt-4 text-lg font-semibold text-gray-800">
          Get the best courses with expert guidance. Enroll now!
        </p>
      </motion.div>

      {/* Form Section */}
      <motion.div
        className="bg-white p-6 rounded-lg shadow-md"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 className="text-xl font-bold text-pink-600">Apply Now!</h2>
        <p className="text-gray-600">Get in touch.</p>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone No."
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="Course of Interest (optional)"
            className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-400"
          />
          <button type="submit" className="w-full p-3 bg-pink-500 text-white font-semibold rounded-lg hover:bg-pink-600 transition">
            Submit
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default EnrollTop;
