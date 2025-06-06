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
          Style Divaa Designer Boutique
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
            At Style Divaa, we envision creating bespoke fashion that celebrates
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
          <h2 className="text-3xl font-semibold text-gray-800 font-serif mb-4 flex items-center gap-2">
            <span className="text-pink-600 animate-bounce">✨</span>
            Our Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-pink-100 hover:border-pink-400 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl group">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl text-pink-500 animate-pulse">👰‍♀️</span>
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-pink-600 transition">Bridal & Designer Wear</h3>
              </div>
              <p className="text-gray-600">
                Custom bridal blouses, lehengas, half sarees, and designer dresses tailored to perfection for your special day.
              </p>
            </div>
            {/* Card 2 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-pink-100 hover:border-pink-400 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl group delay-100">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl text-yellow-500 animate-bounce">🪡</span>
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-pink-600 transition">Expert Embroidery</h3>
              </div>
              <p className="text-gray-600">
                Intricate handwork and embroidery by skilled artisans, adding elegance and uniqueness to every piece.
              </p>
            </div>
            {/* Card 3 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-pink-100 hover:border-pink-400 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl group delay-200">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl text-green-500 animate-spin">🧵</span>
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-pink-600 transition">Personal Styling</h3>
              </div>
              <p className="text-gray-600">
                Personalized styling and consultation to help you find the perfect look for every occasion.
              </p>
            </div>
            {/* Card 4 */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-pink-100 hover:border-pink-400 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl group delay-300">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl text-blue-500 animate-bounce">🚚</span>
                <h3 className="font-bold text-lg text-gray-800 group-hover:text-pink-600 transition">Fast Delivery</h3>
              </div>
              <p className="text-gray-600">
                Quick turnaround times and doorstep delivery, ensuring you get your dream outfit on time.
              </p>
            </div>
          </div>
          <button className="px-6 py-2 mt-6 text-white bg-pink-600 rounded-lg hover:bg-pink-700 focus:ring focus:ring-pink-300 transform transition hover:-translate-y-1 shadow-lg">
            Explore All Services
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

      {/* Legacy Section */}
      <div className="mt-12">
        <div className="content space-y-4">
          <h2 className="text-3xl font-semibold text-gray-800 font-serif flex items-center gap-2">
            <span className="animate-bounce text-pink-600">🎉</span>
            Since 2008: Why People Love Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
            {/* Experience */}
            <div className="flex items-start gap-4 animate-fadeInUp">
              <span className="text-4xl text-pink-500 animate-pulse">⏳</span>
              <div>
                <h3 className="font-bold text-lg text-gray-700">16+ Years of Excellence</h3>
                <p className="text-gray-600 text-base">
                  Trusted since 2008 for bespoke tailoring and designer wear in Bangalore.
                </p>
              </div>
            </div>
            {/* Celebrity Work */}
            <div className="flex items-start gap-4 animate-fadeInUp delay-100">
              <span className="text-4xl text-yellow-500 animate-bounce">🌟</span>
              <div>
                <h3 className="font-bold text-lg text-gray-700">Celebrity Designers</h3>
                <p className="text-gray-600 text-base">
                  Proudly dressing celebrities and influencers with exclusive, custom creations.
                </p>
              </div>
            </div>
            {/* Premium Fabrics */}
            <div className="flex items-start gap-4 animate-fadeInUp delay-200">
              <span className="text-4xl text-green-500 animate-spin">🧵</span>
              <div>
                <h3 className="font-bold text-lg text-gray-700">Premium Fabrics</h3>
                <p className="text-gray-600 text-base">
                  Only the finest materials for comfort, durability, and luxury in every stitch.
                </p>
              </div>
            </div>
            {/* Latest Designs & Fits */}
            <div className="flex items-start gap-4 animate-fadeInUp delay-300">
              <span className="text-4xl text-blue-500 animate-bounce">👗</span>
              <div>
                <h3 className="font-bold text-lg text-gray-700">Latest Designs & Perfect Fits</h3>
                <p className="text-gray-600 text-base">
                  Stay ahead with trending styles, innovative cuts, and flawless fitting for all.
                </p>
              </div>
            </div>
          </div>
          <ul className="mt-6 space-y-2 text-gray-700 text-base list-disc list-inside">
            <li>Custom bridal blouses, lehengas, and designer dresses</li>
            <li>Expert embroidery and handwork</li>
            <li>Personalized styling and consultation</li>
            <li>Fast turnaround and doorstep delivery</li>
          </ul>
          <button className="px-6 py-2 mt-4 text-white bg-pink-600 rounded-lg hover:bg-pink-700 focus:ring focus:ring-pink-300 transform transition hover:-translate-y-1">
            Explore Our Legacy
          </button>
        </div>
      </div>

      {/* Our Vision Section */}
      <div className="relative group">
        {/* Decorative background image (optional, replace with your own if desired) */}
        <img
          src="/assets/vision-bg.jpg"
          alt="Elegant Fashion Illustration"
          className="absolute inset-0 w-full h-full object-cover opacity-20 rounded-2xl pointer-events-none"
          style={{ zIndex: 0 }}
        />
        <div className="relative z-10 bg-gradient-to-br from-pink-50 via-white to-pink-100 rounded-2xl shadow-xl p-8 border border-pink-100 overflow-hidden transition-all duration-500 group-hover:shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl animate-bounce text-pink-400 drop-shadow-lg">🪄</span>
            <h2 className="text-3xl font-extrabold text-gray-800 font-serif tracking-tight">
              Our Vision: Where Dreams Become Dresses
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            {/* Icon Card */}
            <div className="flex flex-col items-center justify-center bg-white bg-opacity-80 rounded-xl shadow-lg p-6 border-2 border-pink-100 animate-fadeInUp">
              <span className="text-5xl text-pink-500 animate-pulse mb-2">👑</span>
              <h3 className="font-bold text-lg text-gray-800 mb-1">Bespoke Elegance</h3>
              <p className="text-gray-600 text-center text-base">
                Every piece is crafted to celebrate your unique style and story.
              </p>
            </div>
            {/* Main Vision Text */}
            <div className="flex-1">
              <blockquote className="border-l-4 border-pink-400 pl-6 italic text-xl text-gray-700 bg-pink-50 py-4 rounded-lg shadow-md animate-fadeInUp">
                “At <span className="font-bold text-pink-600">Style Divaa</span>, we believe every woman deserves to shine in her own unique way. Our vision is to weave <span className="font-semibold">bespoke bridal couture, designer wear, and everyday elegance</span>—blending tradition with modernity, stitched with love and a touch of magic in Bangalore.”
              </blockquote>
              <ul className="list-disc list-inside text-gray-700 text-base pl-2 mt-4 animate-fadeInUp delay-100">
                <li className="flex items-center gap-2"><span className="text-pink-400">💍</span> Signature bridal blouses, lehengas, and sarees</li>
                <li className="flex items-center gap-2"><span className="text-yellow-400">🪡</span> Modern silhouettes, timeless craftsmanship</li>
                <li className="flex items-center gap-2"><span className="text-green-400">🧵</span> Personalized styling for every occasion</li>
                <li className="flex items-center gap-2"><span className="text-blue-400">🌸</span> Handcrafted embroidery & luxurious fabrics</li>
              </ul>
              <div className="flex items-center gap-2 mt-4">
                <span className="text-pink-500 animate-pulse text-2xl">✨</span>
                <span className="text-gray-600 font-medium">
                  Experience the magic of Style Divaa — Bangalore’s trusted name for designer fashion since 2008.
                </span>
              </div>
              <button className="px-8 py-3 mt-4 text-white bg-gradient-to-r from-pink-600 to-pink-400 rounded-lg shadow-lg hover:from-pink-700 hover:to-pink-500 focus:ring focus:ring-pink-300 transform transition hover:-translate-y-1 text-lg font-semibold tracking-wide">
                Discover Our Magic
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstAbout;
