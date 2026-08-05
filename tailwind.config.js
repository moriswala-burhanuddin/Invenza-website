/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Outfit"',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Inter"',
          '"SF Pro Display"',
          'system-ui',
          'sans-serif',
        ],
      },
      colors: {
        // High Industrial Light Palette (Apple-style)
        industrial: {
          900: '#2156C1', // Classic Apple Black text
          800: '#333336',
          700: '#86868B', // Muted text
          600: '#D2D2D7', // Light borders
          500: '#E5E5EA', // Divider gray
          400: '#F2F2F7', // iOS background gray
          300: '#F5F5F7', // Deep light background
          200: '#FAFAFA', // Almost white card
          100: '#FFFFFF', // Pure White
        },
        brand: {
          cyan: '#00D4FF',
          blue: '#0071E3', // Apple Blue
          green: '#28C840',
        },
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #0071E3 0%, #00D4FF 100%)',
        'glass-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 100%)',
      },
      boxShadow: {
        'industrial': '0 20px 40px -10px rgba(0,0,0,0.08)',
        'industrial-sharp': '0 4px 12px rgba(0,0,0,0.04)',
        'neon-cyan': '0 0 40px rgba(0,212,255,0.15)',
        'subtle': '0 8px 30px rgba(0,0,0,0.04)',
      },
      borderRadius: {
        'ios': '20px',
        'ios-lg': '32px',
        'ios-xl': '44px',
      },
      letterSpacing: {
        'tightest': '-0.04em',
        'tighter': '-0.03em',
        'tight': '-0.02em',
      },
    },
  },
  plugins: [],
}
