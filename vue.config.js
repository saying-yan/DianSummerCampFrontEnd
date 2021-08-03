const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  configureWebpack: {
      resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          '@': resolve('src'),
          '~': process.cwd(),
          public: resolve('public'),
          components: resolve('src/components'),
          util: resolve('src/utils'),
          store: resolve('src/store'),
          router: resolve('src/router')
        }
      }
    },
}