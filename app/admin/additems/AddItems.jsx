"use client";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { Button, TextField, CircularProgress } from "@mui/material";
import axios from "axios";

const AddItems = ({ isOpen, onClose, productData }) => {
  const [formData, setFormData] = useState({
    productId: productData?.productId || "",
    productName: productData?.productName || "",
    description: productData?.description || "",
    rating: productData?.rating || "",
    price: productData?.price || "",
    discountPercentage: productData?.discountPercentage || "",
    images: Array(6).fill(null),
    color: productData?.color || "",
    sizes: {
      XS: productData?.sizes?.XS || "",
      S: productData?.sizes?.S || "",
      M: productData?.sizes?.M || "",
      L: productData?.sizes?.L || "",
      XL: productData?.sizes?.XL || "",
      XXL: productData?.sizes?.XXL || ""
    },
    instagramLink: productData?.instagramLink || ""
  });

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});

  useEffect(() => {
    const getAdminDetails = localStorage.getItem("adminDetails");
    if (getAdminDetails) {
      setLoggedInUser(JSON.parse(getAdminDetails));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...formData.images];
      newImages[index] = file;
      setFormData({ ...formData, images: newImages });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/admin/gallery/postNew", formData, {
        headers: {
          Authorization: `Bearer ${loggedInUser.jwt}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      setError({ api: "Failed to submit. Try again." });
    } finally {
      setLoading(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50 w-full h-full">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full h-full overflow-auto relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-500">
          <FaTimes size={20} />
        </button>

        <h2 className="text-xl font-bold text-center mb-4">Add Product</h2>

        <div className="space-y-3">
          <TextField fullWidth label="Product ID" name="productId" value={formData.productId} onChange={handleChange} />
          <TextField fullWidth label="Product Name" name="productName" value={formData.productName} onChange={handleChange} />
          <TextField fullWidth label="Description" name="description" value={formData.description} onChange={handleChange} />
          <TextField fullWidth label="Price" name="price" value={formData.price} onChange={handleChange} />
          <TextField fullWidth label="Discount %" name="discountPercentage" value={formData.discountPercentage} onChange={handleChange} />
          <TextField fullWidth label="Color" name="color" value={formData.color} onChange={handleChange} />

          <div className="grid grid-cols-2 gap-2">
            {Object.keys(formData.sizes).map((size) => (
              <TextField
                key={size}
                fullWidth
                label={size}
                name={size}
                value={formData.sizes[size]}
                onChange={(e) => setFormData({
                  ...formData,
                  sizes: { ...formData.sizes, [size]: e.target.value },
                })}
              />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {formData.images.map((image, index) => (
              <label key={index} className="relative flex items-center justify-center w-32 h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                {image ? (
                  <img src={URL.createObjectURL(image)} alt={`Preview ${index}`} className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <p className="text-xs text-gray-500 text-center">Click to Upload</p>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={(e) => handleImageChange(e, index)}
                />
              </label>
            ))}
          </div>

          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            disabled={loading}
            sx={{ backgroundColor: "black", color: "white", "&:hover": { backgroundColor: "#333" } }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddItems;