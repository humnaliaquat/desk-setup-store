// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        slideX: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(4px)' }, // move 4px to the right
        },
      },
      animation: {
        'slide-x': 'slideX 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
