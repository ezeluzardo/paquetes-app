module.exports = {
  plugins: [
    require('@tailwindcss/postcss8'),
    require('autoprefixer'),
    require('postcss-flexbugs-fixes'),
    require('postcss-preset-env')({ stage: 3 })
  ]
}
