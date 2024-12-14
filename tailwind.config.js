/** @type {import('tailwindcss').Config} */
export default {
  content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'dark-blue-900': '#0A1A3E',
        primary:{
          // 50: '#F1F5F9',  // Lightest shade
          50: '#D9E3F0',
          100: '#B3C6E0',
          200: '#8DA9D0',
          300:"#556E94",
          400: '#1D3359',  // Darker shade
          500: '#162846',
          600: '#12203A',
          700: '#0D1830',
          800: '#091025',
          900: '#040818',  // Darkest shade
        },
        secondary: {
          100: '#F5EBFF',   // Lightest purple shade
          200: '#E6CFFF',
          300: '#D6B2FF',
          400: '#B186FF',  // Base purple
          500: '#8D5AFF',  // Medium purple
          600: '#733ACC',  // Darker purple
          700: '#5A2B99',
          800: '#401F66',
          900: '#2A1333',
        },
        accent: {
          100: '#E0F7F3',  // Light aqua
          200: '#A8E9E0',
          300: '#70DACC',
          400: '#38CBC8',
          500: '#00BBC4',  // Base aqua
          600: '#009799',  // Darker aqua
          700: '#006B70',
          800: '#004046',
          900: '#00161C',
        },

      }
    },
  },
  plugins: [],
}

