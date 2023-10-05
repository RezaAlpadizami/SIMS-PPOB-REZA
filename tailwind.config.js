/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        saldo: "url('/src/assets/img/img-background-saldo.png')",
        banner: "url('/src/assets/banner/IllustrasiLogin.png')",
      },
    },
  },
  plugins: [],
};
