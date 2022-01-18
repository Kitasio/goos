module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.svelte'],
  variants: {
    extend: {
      padding: ['hover'],
      width: ['hover'],
    }
  },
  theme: {
    extend: {
      fontFamily: {
        'bt': 'americana-bt',
        'font-sans': '"Helvetica Neue", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
      },
      gridTemplateColumns: {
        'top': '1fr 50% 1fr',
      },
    },
    boxShadow: {
      'border': 'inset 0px 0px 0px 2px #000000',
      'white': 'inset 0px 0px 0px 2px #ffffff',
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
