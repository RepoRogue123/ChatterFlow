export default {
  plugins: {
    '@tailwindcss/postcss': {
      // Add the "from" option to fix the warning
      postcssOptions: {
        from: undefined
      }
    },
    autoprefixer: {}
  }
}