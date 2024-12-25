/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#121212',
        'second': '#1e1e1e',
        'primary': '#BB86FC'
      }
    },
  },
  plugins: [],
}

