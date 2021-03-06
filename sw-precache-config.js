module.exports = {
  staticFileGlobs: [
    'build/static/css/**.css',
    'build/static/js/**.js'
  ],
  swFilePath: './public/sw.js',
  templateFilePath: './public/service-worker.js',
  stripPrefix: 'build/',
  handleFetch: false,
  runtimeCaching: [{
    urlPattern: /this\\.is\\.a\\.regex/,
    handler: 'networkFirst'
  }]
}