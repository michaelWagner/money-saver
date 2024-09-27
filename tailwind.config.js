/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'primary-focus': 'var(--color-primary-focus)',
        secondary: 'var(--color-secondary)',
        'secondary-hover': 'var(--color-secondary-hover)',
        'secondary-focus': 'var(--color-secondary-focus)',
        accent: 'var(--color-accent)',
        'accent-hover': 'var(--color-accent-hover)',
        'accent-focus': 'var(--color-accent-focus)',
        background: 'var(--color-background)',
        'input-bg': 'var(--color-input-bg)',
        'input-hover': 'var(--color-input-hover)',
        'input-focus': 'var(--color-input-focus)',
        'card-bg': 'var(--color-card)',
        'card-hover': 'var(--color-card-hover)',
        font: 'var(--color-font)',
        'font-muted': 'var(--color-font-muted)',
        'font-button': 'var(--color-font-button)',
        'border-color': 'var(--color-border)',
        'border-focus': 'var(--color-border-focus)',
        shadow: 'var(--color-shadow)',
        'shadow-hover': 'var(--color-shadow-hover)',
        'shadow-focus': 'var(--color-shadow-focus)',
        disabled: 'var(--color-disabled)',
        'disabled-bg': 'var(--color-disabled-bg)',
        'disabled-border': 'var(--color-disabled-border)',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Nunito', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
