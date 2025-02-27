"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios"; // Import axios for API calls
import logo from "../../public/assets/styledivaalogo.png";

const ContactUsForm = () => {
  const [namee, setName] = useState("");
  const [number, setNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    const formData = {
      name: namee,
      number,
      subject,
      message,
    };

    try {
      const res = await axios.post("/api/users/contactus", formData); // Replace with your API URL
      if (res.data.success) {
        setResponseMessage("Your message has been sent successfully!");
      } else {
        setResponseMessage("Failed to send the message. Please try again.");
      }
    } catch (error) {
      setResponseMessage("Error submitting the form. Please try again later.");
      console.error("API Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full bg-custombg pb-10 flex justify-center items-center">
        <div className="whiteBox bg-white p-8 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Logo & Address */}
          <div className="col1 flex flex-col items-center">
            <div className="logo-img mb-6">
              <Image src={logo} alt="STYLE DIVAA" height={100} width={100} />
            </div>
            <div className="text-center text-gray-800 mb-6">
              #54, 7th cross, 24th main road,<br /> J.P.Nagar 2nd Phase <br /> Bangalore 560078, India
            </div>
          </div>

          {/* Column 2: Contact Form */}
          <div className="col2 flex flex-col">
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                value={namee}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-blue-500"
                required
              />
              <input
                type="tel"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="10-Digit Number"
                maxLength="10"
                pattern="^[7-9][0-9]{9}$"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-blue-500"
                required
              />
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-blue-500"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-blue-500"
              />
              <button
                type="submit"
                className="w-full bg-custombg text-white p-4 rounded-lg hover:bg-pink-500"
                disabled={loading}
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </form>
            {responseMessage && (
              <p className="text-center mt-4 text-gray-700">{responseMessage}</p>
            )}
          </div>

          {/* Column 3: Business Info */}
          <div className="col3 flex flex-col justify-center items-center text-center">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to Style Divaa</h1>
            <p className="text-gray-600 text-lg font-medium">
              Custom clothing and expert stitching services in Bangalore.
            </p>
          </div>
        </div>
      </div>

      {/* Call-to-action section */}
      <div className="thebigContact bg-custombg flex justify-center items-center pb-6">
        <Link
          href="tel:+919742782429"
          className="text-2xl font-light text-gray-800 hover:text-blue-600"
        >
          Call us +91 9742782429
        </Link>
      </div>
    </>
  );
};

export default ContactUsForm;
