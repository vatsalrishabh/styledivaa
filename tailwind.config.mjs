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
        custombg: "rgb(79 66 75)", // Dark background
        brightPink: "#FF6F91", // Bright pink for active states
        lightPink: "#FFD3E2", // Light pink for hover
        customText: "rgb(81 75 75);", // Default text color
        customIcon: "#B0B0B0", // Icon default color
      },
    },
  },
  plugins: [],
};
