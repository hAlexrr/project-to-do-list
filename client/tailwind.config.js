/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          'bg-color': "#010c1e",
          'accent-color': "#001e38",
          'border-color': '#4a6d88',
          'text-color': "#c6cdd7",
          'text-color-light': "#d5d9e0",
        },
      },
      fontSize: {
        '2xs': '0.65rem',
        '3xs': '0.5rem',
        '4xs': '0.4rem',
        '5xs': '0.3rem',
        '6xs': '0.2rem',
      },
      scale: {
        '102': '1.02',        
        '175': '1.75',
        '200': '2',
      },
      height: {
        'full-85': '85vh',
      },
      width: {
        'full-85': '85%',
      }
    },
    plugins: [],
  }
}