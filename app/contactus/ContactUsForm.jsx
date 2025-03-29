"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import logo from "../../public/assets/styledivaalogo.png";

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const res = await axios.post("/api/users/contactus", formData);
      if (res.status === 201) {
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
          <div className="col1 flex flex-col items-center">
            <div className="logo-img mb-6">
              <Image src={logo} alt="STYLE DIVAA" height={200} width={200} />
            </div>
            <div className="text-center text-gray-800 mb-6">
              #54, 7th cross, 24th main road,<br /> J.P.Nagar 2nd Phase <br /> Bangalore 560078, India
            </div>
          </div>

          <div className="col2 flex flex-col">
            <form onSubmit={handleSubmit} className="space-y-6">
              {["name", "email", "number", "subject", "message"].map((field) => (
                <input
                  key={field}
                  type={field === "email" ? "email" : field === "number" ? "tel" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-blue-500"
                  required={field !== "subject"}
                />
              ))}
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

          <div className="col3 flex flex-col justify-center items-center text-center">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to Style Divaa</h1>
            <p className="text-gray-600 text-lg font-medium">
              Custom clothing and expert stitching services in Bangalore.
            </p>
          </div>
        </div>
      </div>

      <div className="thebigContact bg-custombg flex justify-center items-center pb-6 space-x-6">
        <Link
          href="tel:+919742782429"
          className="text-2xl font-light text-gray-800 hover:text-blue-600"
        >
          Call us +91 9742782429
        </Link>
        <Link
          href="mailto:contact@styledivaa.com"
          className="text-2xl font-light text-gray-800 hover:text-blue-600"
        >
          Email us at contact@styledivaa.com
        </Link>
      </div>
    </>
  );
};

export default ContactUsForm;
