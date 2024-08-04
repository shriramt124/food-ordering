/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "tab":'800px'
      },
      fontFamily:{
        'customFont':["Edu AU VIC WA NT Hand", 'cursive','sans-serif'],
        'roboto':['"Roboto", sans-serif','sans-serif']
      },
      backgroundImage:{
        'hero-pattern': "url('restuarant.png')"
      }
      
    },
  },
  plugins: [],
}

