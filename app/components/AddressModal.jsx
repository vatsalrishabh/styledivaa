import React from "react";
import { XCircleIcon, MapPinIcon } from "@heroicons/react/24/solid";

const AddressModal = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-pink-600">ADD DELIVERY ADDRESS</h2>
          <XCircleIcon 
            className="h-8 w-8 text-gray-500 cursor-pointer hover:text-gray-700 transition"
            onClick={closeModal}
          />
        </div>

        {/* Contact Details */}
        <div className="space-y-4">
          <button className="w-full flex items-center justify-center gap-2 bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-700 transition">
            <MapPinIcon className="h-6 w-6" />
            Use My Location
          </button>

          <input type="text" placeholder="Name" className="input-style" />
          <input type="text" placeholder="Contact Number" className="input-style" />
          <input type="text" placeholder="Address" className="input-style" />
          <input type="text" placeholder="House no./ Building name" className="input-style" />
          <input type="text" placeholder="Road name / Area / Colony" className="input-style" />
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Pincode" className="input-style" />
            <input type="text" placeholder="City" className="input-style" />
          </div>
          <input type="text" placeholder="State" className="input-style" />
          <input type="text" placeholder="Nearby Famous Place/Shop/School, etc. (optional)" className="input-style" />

          {/* Save Address Button */}
          <button className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition mt-4">
            Save Address and Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
