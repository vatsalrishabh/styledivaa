"use client";
import React, { useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import Image from "next/image";
import Link from "next/link"; // Import Link
import logo from "../../public/assets/styledivaalogo.png";
import { FaCheck } from "react-icons/fa";
import RightSlideCart from "../components/RightSlideCart";
import RightIconSmartphone from "../components/SmartphoneCartIcon/RightIconSmartphone";

const Page = () => {
  const [step, setStep] = useState(1);

  const gotoNextStep = () => setStep((prev) => Math.min(prev + 1, 2));
  const gotoPrevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <>
      <RightSlideCart />
      <RightIconSmartphone />

      <div className="min-h-screen bg-pink-50 flex flex-col items-center">
        {/* Header */}
        <div className="h-16 border-b w-full flex items-center justify-center bg-white shadow-md">
          <div className="w-4/6 flex items-center justify-between">
            <div className="logo">
              <Image src={logo} alt="Logo" width={120} height={40} />
            </div>
          
            {/* Steps Indicator */}
            <div className="steps flex items-center">
              {/* Step 1 */}
              <div
                className={`rounded-full w-8 h-8 flex items-center justify-center 
                ${step > 1 ? "bg-pink-500 text-white" : "border border-pink-500 text-pink-500"}`}
              >
                {step > 1 ? <FaCheck /> : "1"}
              </div>

              <div className="h-1 w-12 bg-gray-400 mx-2"></div>


              {/* Step 2 */}
              <div
                className={`rounded-full w-8 h-8 flex items-center justify-center 
                ${step === 2 ? "bg-pink-500 text-white" : "border border-pink-500 text-pink-500"}`}
              >
                {step === 2 ? "2" : "2"}
              </div>
            </div>
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="w-full max-w-4xl px-4 py-3">
          <nav className="text-sm">
            <Link href="/" className="text-pink-600 hover:underline">
              Home
            </Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-700 font-semibold">Checkout</span>
          </nav>
        </div>

        {/* Body */}
        <div className="body mt-8 flex flex-col items-center">
          {step === 1 && <StepOne gotoNextStep={gotoNextStep} />}
          {step === 2 && <StepTwo gotoPrevStep={gotoPrevStep} />}
        </div>
      </div>
    </>
  );
};

export default Page;
