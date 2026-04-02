/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#1A6BFF',
        income: '#16A34A',
        expense: '#DC2626',
      },
    },
  },
  plugins: [],
}

