"use client";
import React, { useState } from "react";
import logo from "../../public/assets/styledivaalogo.png";
import Image from "next/image";
import Link from "next/link";

const ContactUsForm = () => {
  const [namee, setName] = useState("");
  const [number, setNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  return (
    <>
      <div className=" w-full bg-custombg pb-10 flex justify-center items-center">
        <div className="whiteBox bg-white p-8  shadow-xl grid grid-cols-1 md:grid-cols-3 gap-8 transition-transform duration-500 ease-in-out transform ">
          {/* column one starts */}
          <div className="col1 flex flex-col items-center">
            <div className="logo-img mb-6">
              <Image src={logo} alt="STYLE DIVAA" height={100} width={100} />
            </div>
            <div className="logo-address text-center text-gray-800 mb-6">
              #54, 7th cross, 24th main road,<br/> J.P.nagar 2nd phase <br/> Bangalore
              560078 India
            </div>
            <div className="opening-table w-full">
              <table className="w-full border-collapse border border-gray-200 rounded-lg">
                <thead>
                  <tr>
                    <th className="border-b-2 border-gray-300 p-2 text-sm font-semibold text-gray-700">
                      Day
                    </th>
                    <th className="border-b-2 border-gray-300 p-2 text-sm font-semibold text-gray-700">
                      Opening Time
                    </th>
                    <th className="border-b-2 border-gray-300 p-2 text-sm font-semibold text-gray-700">
                      Closing Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b border-gray-300 p-2 text-sm text-gray-700">
                      Mon-Fri
                    </td>
                    <td className="border-b border-gray-300 p-2 text-sm text-gray-700">
                      10:00 a.m.
                    </td>
                    <td className="border-b border-gray-300 p-2 text-sm text-gray-700">
                      10:30 p.m.
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b border-gray-300 p-2 text-sm text-gray-700">
                      Sat
                    </td>
                    <td className="border-b border-gray-300 p-2 text-sm text-gray-700">
                      11:00 a.m.
                    </td>
                    <td className="border-b border-gray-300 p-2 text-sm text-gray-700">
                      11:00 p.m.
                    </td>
                  </tr>
                  <tr>
                    <td className="border-b border-gray-300 p-2 text-sm text-gray-700">
                      Sun
                    </td>
                    <td className="border-b border-gray-300 p-2 text-sm text-gray-700">
                      11:00 a.m.
                    </td>
                    <td className="border-b border-gray-300 p-2 text-sm text-gray-700">
                      11:00 p.m.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* column one ends */}

          {/* column two starts */}
          <div className="col2 flex flex-col">
            <form className="space-y-6">
              <div className="form-row lg:flex sm:block ">
                <div className="w-full p-1">
                  <input
                    type="text"
                    value={namee}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:ring-4 hover:ring-blue-400"
                    required
                  />
                </div>
                <div className="w-full p-1">
                  <input
                    type="tel"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    placeholder="10-Digit Number"
                    maxLength="10"
                    pattern="^[7-9][0-9]{9}$" // Indian phone number format
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:ring-4 hover:ring-blue-400 sm:ml-0"
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Subject"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:ring-4 hover:ring-blue-400"
                />
              </div>
              <div className="form-row">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Message"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:ring-4 hover:ring-blue-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-custombg text-white p-4 rounded-lg hover:bg-pink-500 transition-all duration-300 ease-in-out"
              >
                Submit
              </button>
            </form>
          </div>
          {/* column two ends */}

          {/* column three starts */}
          <div className="col3 flex flex-col justify-center items-center text-center">
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              Welcome to Style Divaa
            </h1>
            <p className="text-gray-600 mb-4 text-lg font-medium">
            Based in the vibrant city of Bangalore, Style Divaa redefines fashion with custom clothing and expert stitching services.
            </p>
            <p className="text-gray-400 mb-4 text-base">
            Whether you're looking to tailor your unique wardrobe or learn the art of fashion design through our specialized lessons, we empower you to bring your vision to life with precision and style.
            </p>
          </div>
          {/* column three ends */}
        </div>
      </div>

      {/* Call-to-action section */}
      <div className="thebigContact bg-custombg flex justify-center items-center pb-6">
        <Link
          href="callto:9742782429"
          className="text-2xl font-light text-gray-800 hover:text-blue-600 transition-all duration-300"
        >
          Call us +91 (9) 7 4278 2429
        </Link>
      </div>
    </>
  );
};

export default ContactUsForm;
