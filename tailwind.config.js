/** @type {import('tailwindcss').Config} */
export default {
  // Tell Tailwind which files to scan for classes
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // This is the magic part that connects to your :root variables
        oasis: {
          lime: 'var(--color-oasis-lime)',
          moss: 'var(--color-oasis-moss)',
          sky: 'var(--color-oasis-sky)',
          navy: 'var(--color-oasis-navy)',
          bg: 'var(--color-oasis-bg)',
        },
      },
      fontFamily: {
        quicksand: ['Quicksand', 'sans-serif'],
      },
    },
  },
  plugins: [],
}