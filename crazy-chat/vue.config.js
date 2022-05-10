const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 跨域代理处理
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:8800',
  //       // ws: false,
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '^/api': ''
  //       }
  //     }
  //   }
  // }
  devServer: {
    proxy: {//配置跨域
      '/apis': {
        target: 'http://pv.sohu.com',//搜狐的域名
        ws: true,
        changOrigin: true,//允许跨域
        pathRewrite: {
          '^/apis': ''//请求的时候使用这个api就可以
        }
      }

    }
  }
})