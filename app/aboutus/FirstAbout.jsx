"use client";
import React from "react";
import Image from "next/image";
import aboutimg from "../../public/assets/aboutpg.jpg"

const FirstAbout = () => {
  return (
    <div className="First-About bg-gray-50 p-8">
      {/* Top Heading */}
      <div className="top-heading flex justify-center p-6">
        <h1 className="text-5xl font-extrabold text-pink-600 font-serif tracking-wide">
          Style Diva Designer Boutique
        </h1>
      </div>

      {/* Bottom Section */}
      <div className="bot-heading grid lg:grid-cols-3 gap-8">
        {/* Image Section */}
        <div className="image-container relative group">
          <Image
            src={aboutimg}
            alt="Pink Street Style Fashion"
            width={500}
            height={500}
            className="rounded-lg shadow-lg transform transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-pink-600 bg-opacity-20 opacity-0 group-hover:opacity-100 transition duration-300"></div>
        </div>

        {/* Text Content 1 */}
        <div className="content space-y-4">
          <h2 className="text-3xl font-semibold text-gray-800 font-serif">
            Our Vision
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            At Style Diva, we envision creating bespoke fashion that celebrates
            individuality and elegance. From bridal couture to casual wear, our
            designs blend tradition with modernity, crafted with meticulous
            attention to detail.
          </p>
          <button className="px-6 py-2 text-white bg-pink-600 rounded-lg hover:bg-pink-700 focus:ring focus:ring-pink-300 transform transition hover:-translate-y-1">
            Learn More
          </button>
        </div>

        {/* Text Content 2 */}
        <div className="content space-y-4">
          <h2 className="text-3xl font-semibold text-gray-800 font-serif">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            We offer a wide range of customized stitching services for bridal
            blouses, lehengas, half sarees, and designer dresses. Our expertise
            in embroidery and tailoring ensures every piece is a masterpiece.
          </p>
          <button className="px-6 py-2 text-white bg-pink-600 rounded-lg hover:bg-pink-700 focus:ring focus:ring-pink-300 transform transition hover:-translate-y-1">
            Explore Services
          </button>
        </div>
      </div>

      {/* Additional Section */}
      <div className="mt-12 text-center">
        <h2 className="text-4xl font-bold text-gray-800 font-serif">
          Why Choose Us?
        </h2>
        <p className="text-lg text-gray-600 mt-4 leading-relaxed max-w-3xl mx-auto">
          With over a decade of experience in the fashion industry, we take
          pride in delivering unparalleled craftsmanship and customer
          satisfaction. Located in JP Nagar, Bangalore, Style Diva is your
          trusted partner for all things fashion.
        </p>
        <button className="px-8 py-3 mt-6 text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:ring focus:ring-gray-400 transform transition hover:-translate-y-1">
          Visit Us Today
        </button>
      </div>
    </div>
  );
};

export default FirstAbout;
