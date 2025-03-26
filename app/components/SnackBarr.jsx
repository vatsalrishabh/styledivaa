"use client";
import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import "animate.css";

const SnackBarr = ({ message, statusCode, showSnackBar }) => { 
  const [open, setOpen] = useState(showSnackBar || false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setOpen(true);
    const timer = setTimeout(() => setOpen(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setOpen(false);

  const getColor = () => {
    switch (statusCode) {
      case 200: return '#4CAF50';  // Green - Success
      case 400: return '#FF9800';  // Orange - Warning
      case 500: return '#F44336';  // Red - Error
      default: return '#E91E63';   // Pink - Default
    }
  };

  if (!isClient || !open) return null;

  return (
    <div
      className="animate__animated animate__fadeInDown"
      style={{
        position: 'fixed',
        top: '40px',
        right: '10px',
        transform: 'translateX(-50%)',
        backgroundColor: getColor(),
        color: 'white',
        padding: '8px 15px',
        borderRadius: '6px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
        fontSize: '14px',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        minWidth: '250px',
        maxWidth: '400px',
        zIndex: 1000,
      }}
    >
      {message}
      <IoClose 
        size={18} 
        style={{ cursor: 'pointer', marginLeft: 'auto' }} 
        onClick={handleClose} 
      />
    </div>
  );
};

export default SnackBarr;
