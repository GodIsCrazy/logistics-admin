const path = require('path')

module.exports = {
  devServer: {
    proxy: {
      '/logistics': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },
  chainWebpack: (config) => {
    // 修改文件引入自定义路径
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
  }
}
