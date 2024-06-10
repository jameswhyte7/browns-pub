/** @type {import('tailwindcss').Config} */
import withMT from "@material-tailwind/react/utils/withMT";

export default withMT({
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/preline/preline.js",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-light': '0 5px 10px rgba(0, 0, 0, 0.1)',
        'custom-medium': '0 12px 50px rgba(0, 0, 0, 0.15)',
        // Add more custom shadows as needed
      },
    },
  },
  plugins: [],
});
