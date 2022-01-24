module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  outputDir: './docs',
  publicPath: process.env.NODE_ENV === 'production' ? 'https://arodri19.github.io/calendar_test/' : '/'
}
