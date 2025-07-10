/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{tsx,ts,jsx,js}",      // Expo Router pages & components
  ],
  presets: [require("nativewind/tailwind/native")], // <-- Add this line
  theme: {
    extend: {},                        // put any overrides here
  },
  plugins: [],
};
