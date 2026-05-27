/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#fdf6ec",
        surface: "#fffaf0",
        surfaceSecondary: "#f5ebe0",
        textPrimary: "#2c1a0e",
        textSecondary: "#6b3f1f",
        primary: "#c8956c",
        secondary: "#8b6347",
        gold: "#c8956c",
        border: "rgba(44, 26, 14, 0.12)"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 24px rgba(107, 63, 31, 0.10)',
        'lift': '0 10px 30px rgba(107, 63, 31, 0.15)',
        'minimal': '0 1px 3px rgba(107, 63, 31, 0.05)',
      },
      animation: {
        'float-slow': 'float 8s ease-in-out infinite',
        'float-medium': 'float 6s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 15s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.6, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.05)', filter: 'drop-shadow(0 0 15px rgba(107, 63, 31, 0.2))' },
        }
      }
    },
  },
  plugins: [],
}
