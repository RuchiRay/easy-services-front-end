module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: {
          500: "#DD4B19",
          400: "#d62828",
          300: "#FD9464",
          200: "#F4DDC7",
          100: "#F6F4EB",
        },
        blue: {
          300: "#666C9C",
        },
      },
      boxShadow: {
        "3xl": " 5px 5px 14px #d7c2af",
      },
    },
  },
  plugins: [ require('@tailwindcss/forms')],
};
