const addChatList = require('../db/DAO/addChatList')
module.exports = (app)=>{
  let socketServer = app.listen(8801,()=>{
    console.log('socket 开启成功')
  })
  let io = require('socket.io')(socketServer,{
    cors: {
        origin: '*'
    }
  })
  io.on('connection',(socket)=>{
    console.log('socket 已有连接！')
    // console.log(socket)
    socket.on('sendMsg',(data)=>{
      console.log(data)
      addChatList(data)
      socket.broadcast.emit(`${data.Fid}`)
    })
  })
}