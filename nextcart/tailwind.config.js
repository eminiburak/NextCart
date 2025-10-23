/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/app/**/*.{js,jsx}',
      './src/components/**/*.{js,jsx}',
      './src/context/**/*.{js,jsx}',
    ],
    theme: {
        extend: {
          colors: {
            primary: '#2563eb',
            secondary: '#f59e0b',
            accent: '#10b981',
          },
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
          },
        },
      },
    plugins: [],
  }
  