const express = require('express')
const app = express()


app.use(express.static('public/'))
app.use(express.json({limit:'100mb'}))

// 连接数据库
require('./db')

// 设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'crazytoken,Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

// 路由
const router = require('./router')
router(app)
// socket.io 服务
const socket = require('./socket')
socket(app)
// 开启8800端口
app.listen(8800,()=>{
  console.log('8800端口开启成功')
})

