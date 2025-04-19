/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        custombg: "rgb(239 183 221)", // pink background
        brightPink: "#FF6F91", // Bright pink for active states
        lightPink: "#FFD3E2", // Light pink for hover
        customText: "rgb(81 75 75)", // Default text color
        customIcon: "#B0B0B0", // Icon default color
        gray: {
          900: "#121212", // Very dark gray for primary background
          700: "#2A2A2A", // Slightly lighter gray for borders
          300: "#B0B0B0", // Text color of the pink
          100: "#E0E0E0", // Hover text color
        },
      },
    },
  },
  plugins: [],
};
