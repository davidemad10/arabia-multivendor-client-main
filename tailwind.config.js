/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Almarai: ["Almarai", 'sans-serif'],
        Reem: ["Reem Kufi", 'sans-serif'],
        Poppins: ["Poppins", 'sans-serif'],
      },
      colors:{
          "Red":"#ff0000",
          "blackText":"#414141"
      }
    },
  },
  plugins: [],
}

