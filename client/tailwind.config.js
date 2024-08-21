/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      height: {
        '0.45': '45%'
      },
      width: {
        '0.45': '45%',
        '0.55': '55%'
      },
      colors: {
        "aquamarine": "rgb(83, 226, 169)",
        "aquablue": "rgb(83, 207, 226)",
        "darkaquamarine": "rgb(77, 206, 137)"
      },
      borderRadius: {
        '3xl': '3rem',
        '4xl': '8rem'
      },
      borderWidth: {
        '1': '1px'
      },
      margin: {
        '3.5': '0.875rem'
      },
      translate: {
        '0': '0',
        '50': '50%'
      }, 
      transitionDuration: {
        '1500': '1500ms'
      },
      zIndex: {
        '5': '5'
      }
    },
  },
  plugins: [],
}

