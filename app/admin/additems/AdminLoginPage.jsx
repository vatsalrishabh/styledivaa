"use client";
import React, { useState } from "react";
import { Button, TextField, CircularProgress } from "@mui/material";
import axios from "axios";

const AdminLoginPage = () => {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP, Step 3: New Password

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!isForgotPassword) {
      if (formData.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters.";
      }
    } else {
      if (step === 2 && formData.otp.length !== 6) {
        newErrors.otp = "Enter a valid 6-digit OTP.";
      }
      if (step === 3) {
        if (formData.newPassword.length < 6) {
          newErrors.newPassword = "Password must be at least 6 characters.";
        }
        if (formData.newPassword !== formData.confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match.";
        }
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    setLoading(true);

    try {
      if (!isForgotPassword) {
        // Normal Admin Login
        const response = await axios.post("/api/admin/login", {
          email: formData.email,
          password: formData.password,
          role:"admin",
        });

        if (response.status === 200) {
          localStorage.setItem("adminDetails", JSON.stringify({ token: response.data.token }));
          alert("Login Successful!");
        } else {
          alert(response.data.message || "Login failed");
        }
      } else {
        if (step === 1) {
          // Send OTP
          await axios.post("/api/admin/sendotp", { email: formData.email });
          alert("OTP sent to your email.");
          setStep(2);
        } else if (step === 2) {
          // Verify OTP
          await axios.post("/api/admin/verifyotp", { email: formData.email, otp: formData.otp ,
            newPassword: formData.newPassword,});
          alert("OTP Verified. Set a new password.");
         
        } else {
          // Reset Password
          await axios.post("/api/admin/reset-password", {
           
          });
          alert("Password Updated Successfully!");
          setIsForgotPassword(false);
          setStep(1);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <div className="w-96 p-6 bg-gray-900 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-blue-400">
          {isForgotPassword ? (step === 3 ? "Reset Password" : "Forgot Password") : "Admin Login"}
        </h2>

        <div className="mt-6 space-y-4">
          {/* Email Input */}
          <TextField
            name="email"
            type="email"
            label="Admin Email"
            variant="outlined"
            fullWidth
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{ style: { color: "white" } }}
            className="bg-gray-800 text-white"
          />

          {/* Password or OTP */}
          {isForgotPassword ? (
            step === 2 ? (
              <TextField
                name="otp"
                type="text"
                label="Enter OTP"
                variant="outlined"
                fullWidth
                value={formData.otp}
                onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                error={!!errors.otp}
                helperText={errors.otp}
                InputProps={{ style: { color: "white" } }}
                className="bg-gray-800 text-white"
              />
            ) : step === 3 ? (
              <>
                <TextField
                  name="newPassword"
                  type="password"
                  label="New Password"
                  variant="outlined"
                  fullWidth
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  error={!!errors.newPassword}
                  helperText={errors.newPassword}
                  InputProps={{ style: { color: "white" } }}
                  className="bg-gray-800 text-white"
                />
                <TextField
                  name="confirmPassword"
                  type="password"
                  label="Confirm New Password"
                  variant="outlined"
                  fullWidth
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}
                  InputProps={{ style: { color: "white" } }}
                  className="bg-gray-800 text-white"
                />
              </>
            ) : null
          ) : (
            <TextField
              name="password"
              type="password"
              label="Admin Password"
              variant="outlined"
              fullWidth
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{ style: { color: "white" } }}
              className="bg-gray-800 text-white"
            />
          )}

          {/* Login / Submit Button */}
          <Button
            variant="contained"
            fullWidth
            className="mt-4 py-3 bg-blue-500 hover:bg-blue-600 transition"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : isForgotPassword ? (step === 3 ? "Reset Password" : "Send OTP") : "Login"}
          </Button>

          {/* Switch Between Login and Forgot Password */}
          <p
            className="mt-4 text-blue-400 hover:underline cursor-pointer"
            onClick={() => {
              setIsForgotPassword(!isForgotPassword);
              setStep(1);
            }}
          >
            {isForgotPassword ? "Back to Login" : "Forgot Password?"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
