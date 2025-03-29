"use client";
import React, { useState } from "react";
import { Button, TextField, CircularProgress } from "@mui/material";
import axios from "axios";
import SnackBarr from "@/app/components/SnackBarr";

const AdminLoginPage = () => {
  const [changeTheForm, setIsForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [snackMessage, setSnackMessage] = useState("");
  const [statusCode, setStatusCode] = useState(null);
  const [showSnackBar, setShowSnackBar] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSnackBar = (message, status) => {
    setSnackMessage(message);
    setStatusCode(status);
    setShowSnackBar(true);
    setTimeout(() => setShowSnackBar(false), 3000); // Auto-close after 3 seconds
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!changeTheForm) {
        const response = await axios.post("/api/admin/login", {
          email: formData.email,
          password: formData.password,
          role: "admin",
        });
        localStorage.setItem(
          "adminDetails",
          JSON.stringify({ token: response.data.token })
        );
        handleSnackBar("Login successful!", 200);
      } else {
        if (step === 1) {
          await axios.post("/api/admin/sendotp", {
            email: formData.email,
            role: "admin",
          });
          handleSnackBar("OTP sent successfully!", 200);
          setStep(2);
        } else if (step === 2) {
          await axios.post("/api/admin/verifyotp", {
            email: formData.email,
            otp: formData.otp,
          });
          handleSnackBar("OTP verified successfully!", 200);
          setStep(3);
        } else {
          await axios.post("/api/admin/resetpassword", {
            email: formData.email,
            newPassword: formData.newPassword,
          });
          handleSnackBar("Password reset successful!", 200);
          setIsForgotPassword(false);
          setStep(1);
        }
      }
    } catch (error) {
      handleSnackBar(
        error.response?.data?.message || "Something went wrong.",
        400
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black text-white">
      <div className="w-96 p-6 bg-gray-900 rounded-xl shadow-lg text-center">
        <h2 className="text-2xl font-bold text-blue-400">
          {changeTheForm
            ? step === 3
              ? "Reset Password"
              : "Forgot Password"
            : "Admin Login"}
        </h2>
        <div className="mt-6 space-y-4">
          <TextField
            name="email"
            type="email"
            label="Admin Email"
            fullWidth
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            InputProps={{ style: { color: "white" } }}
            className="bg-gray-800 text-white"
          />
          {!changeTheForm && (
            <TextField
              name="password"
              type="password"
              label="Admin Password"
              fullWidth
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              InputProps={{ style: { color: "white" } }}
              className="bg-gray-800 text-white"
            />
          )}
          {changeTheForm && step === 2 && (
            <TextField
              name="otp"
              type="text"
              label="Enter OTP"
              fullWidth
              value={formData.otp}
              onChange={(e) =>
                setFormData({ ...formData, otp: e.target.value })
              }
              InputProps={{ style: { color: "white" } }}
              className="bg-gray-800 text-white"
            />
          )}
          {changeTheForm && step === 3 && (
            <>
              <TextField
                name="newPassword"
                type="password"
                label="New Password"
                fullWidth
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData({ ...formData, newPassword: e.target.value })
                }
                InputProps={{ style: { color: "white" } }}
                className="bg-gray-800 text-white"
              />
              <TextField
                name="confirmPassword"
                type="password"
                label="Confirm New Password"
                fullWidth
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                InputProps={{ style: { color: "white" } }}
                className="bg-gray-800 text-white"
              />
            </>
          )}
          <Button
            variant="contained"
            fullWidth
            className="mt-4 py-3 bg-blue-500 hover:bg-blue-600"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : step === 3 ? "Reset Password" : changeTheForm ? "Send OTP" : "Login"}
          </Button>
          <p
            className="mt-4 text-blue-400 hover:underline cursor-pointer"
            onClick={() => {
              setIsForgotPassword(!changeTheForm);
              setStep(1);
            }}
          >
            {changeTheForm ? "Back to Login" : "Forgot Password?"}
          </p>
        </div>
      </div>
      {showSnackBar && (
        <SnackBarr message={snackMessage} statusCode={statusCode} showSnackBar={showSnackBar} />
      )}
    </div>
  );
};

export default AdminLoginPage;
