"use client";
import React from "react";
import { motion, useAnimation } from "framer-motion";

const CountingAbout = () => {
  // Array of icon, number, and title data
  const countingIconAndValue = [
    {
      icon: "🎉", // Replace with actual icons
      theNumber: 1324,
      title: "Projects Completed",
    },
    {
      icon: "💼",
      theNumber: 1120,
      title: "Happy Clients",
    },
    {
      icon: "🏆",
      theNumber: 13,
      title: "Awards Won",
    },
  ];

  const formatNumber = (num) => Math.floor(num); // To format and round numbers during counting

  return (
    <div className="grid lg:grid-cols-3 gap-8 p-8">
      {countingIconAndValue.map((item, index) => (
        <div
          key={index}
          className="icon-countingflex flex flex-col items-center bg-pink-50 shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300"
        >
          {/* Icon */}
          <div className="icon text-pink-600 text-5xl mb-4">{item.icon}</div>

          {/* Animated Number */}
          <motion.div
            className="value text-4xl font-bold text-gray-800 mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <AnimatedCounter to={item.theNumber} />
          </motion.div>

          {/* Title */}
          <div className="title text-lg font-medium text-gray-600">
            {item.title}
          </div>
        </div>
      ))}
    </div>
  );
};

// Component for animated counting
const AnimatedCounter = ({ to }) => {
  const controls = useAnimation();
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    controls.start({
      value: to,
      transition: { duration: 2, ease: "easeOut" },
    });
    controls.set({ value: 0 });
  }, [to, controls]);

  return (
    <motion.span
      initial={{ value: 0 }}
      animate={controls}
      onUpdate={(latest) => setCount(Math.floor(latest.value))}
    >
      {count}
    </motion.span>
  );
};

export default CountingAbout;
