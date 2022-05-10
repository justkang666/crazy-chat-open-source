const user = require('../../model/user')
const chatList = require('../../model//chatList')

module.exports = (res) =>{
  let userNum = null
  let friendNum = null
  let chatNum = null
  // 用户查询
  user.find({},(err,doc)=>{
    if(err) {
      res.send({
        code:'402',
        msg:'数据库操作错误'
      })
    } else {
      if(doc.length > 0) {
        // 查询到
        userNum = doc.length
        // 聊天数量
        chatList.find({},(err,doc)=>{
          if(err) {
            res.send({
              code:'402',
              msg:'数据库操作错误'
            })
          } else {
            if(doc.length > 0) {
              // 查询到
              friendNum = doc.length
              doc.forEach((item)=>{
                chatNum+=item.chatList.length
              })
              res.send({
                code:'200',
                data:{
                  userNum,
                  friendNum,
                  chatNum,
                }
              })
            } else {
              res.send({
                code:'401',
                msg:'查询错误'
              })
            }
          }
        })
      } else {
        res.send({
          code:'401',
          msg:'查询错误'
        })
      }
    }
  })

}