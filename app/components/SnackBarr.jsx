"use client";
import React, { useState } from "react";
import SnackBarr from "./SnackBarr"; // Import Snackbar component

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [statusCode, setStatusCode] = useState(null);
  const [isForgotPassword, setIsForgotPassword] = useState(false); // Controls which form is visible

  console.log("isForgotPassword State:", isForgotPassword); // Debugging to check state changes

  const triggerSnackBar = (message, code) => {
    setSnackbarMessage(message);
    setStatusCode(code);
    setShowSnackBar(true);
    setTimeout(() => {
      setShowSnackBar(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Forgot Password Form */}
      <div className={isForgotPassword ? "w-80" : "hidden"}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!email) {
              triggerSnackBar("Please enter your email", 400);
              return;
            }
            triggerSnackBar("Reset link sent to your email", 200);
          }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold mb-4 text-center">Reset Password</h2>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full mb-3 rounded"
          />
          <button type="submit" className="bg-green-500 text-white p-2 w-full rounded">
            Send Reset Link
          </button>
          <p
            className="text-blue-600 text-sm mt-2 cursor-pointer text-center"
            onClick={() => setIsForgotPassword(false)}
          >
            ⬅ Back to Login
          </p>
        </form>
      </div>

      {/* Login Form */}
      <div className={!isForgotPassword ? "w-80" : "hidden"}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!email || !password) {
              triggerSnackBar("Please fill in all fields", 400);
              return;
            }
            triggerSnackBar("Login Successful", 200);
          }}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold mb-4 text-center">Admin Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 w-full mb-3 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 w-full mb-3 rounded"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">
            Login
          </button>
          <p
            className="text-blue-600 text-sm mt-2 cursor-pointer text-center"
            onClick={() => setIsForgotPassword(true)}
          >
            Forgot Password?
          </p>
        </form>
      </div>

      {showSnackBar && <SnackBarr message={snackbarMessage} statusCode={statusCode} showSnackBar />}
    </div>
  );
};

export default AdminLoginPage;
