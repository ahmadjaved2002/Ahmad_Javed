/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#080808',
        charcoal: '#121212',
        panel: '#171717',
        line: '#262626',
        paper: '#F2F0EA',
        mute: '#929292',
        lime: '#C6FF4D',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      spacing: {
        gutter: 'clamp(1.25rem, 4.5vw, 4.5rem)',
      },
    },
  },
  plugins: [],
};
