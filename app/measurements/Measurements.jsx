import { useState } from "react";

export default function Measurements() {
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    clothingType: "",
    measurements: {},
  });

  const measurementFields = {
    "Blouse": ["Bust", "Waist", "Shoulder Width", "Sleeve Length"],
    "Lehenga Choli": ["Waist", "Hip", "Lehenga Length", "Flare"],
    "Kurta Set": ["Bust", "Waist", "Hip", "Kurta Length", "Sleeve Length"],
    "Sherwani": ["Chest", "Waist", "Hip", "Shoulder Width", "Sleeve Length"],
  };

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleMeasurementChange = (e, field) => {
    setCustomer({
      ...customer,
      measurements: { ...customer.measurements, [field]: e.target.value },
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Customer Measurement Form</h2>
      <div className="grid grid-cols-2 gap-4">
        <input type="text" name="name" placeholder="Full Name" onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="phone" placeholder="Phone Number" onChange={handleChange} className="p-2 border rounded" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="p-2 border rounded" />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} className="p-2 border rounded" />
      </div>

      <label className="block mt-4">Select Clothing Type</label>
      <select name="clothingType" onChange={handleChange} className="p-2 border rounded w-full">
        {Object.keys(measurementFields).map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      {customer.clothingType && (
        <div className="mt-4">
          <h3 className="font-semibold">Measurements for {customer.clothingType}</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {measurementFields[customer.clothingType]?.map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field}
                onChange={(e) => handleMeasurementChange(e, field)}
                className="p-2 border rounded"
              />
            ))}
          </div>
        </div>
      )}
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Save Details</button>
    </div>
  );
}
