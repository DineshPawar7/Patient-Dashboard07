/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        'acme-primary': '#1D4ED8', // Example primary color (blue-700)
        'acme-secondary': '#10B981', // Example secondary color (emerald-500)
      
    },
    },
  },
  plugins: [],
}
