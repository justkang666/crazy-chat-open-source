const { createToken, verifyToken } = require('../../util/token')
const chatList = require('../model/chatList')

module.exports = (token,Fid,res)=>{
  let result = verifyToken(token)
  if (result.name == 'TokenExpiredError') {
    // 过期了
    res.send({
      code: '401',
      msg: 'TOKEN 过期 请重新登录'
    })
  } else {
    chatList.find({Fid:Fid},(err,doc)=>{
      if(err) {
        res.send({
          code:'402',
          msg:'数据库操作失败'
        })
      } else {
        if(doc.length > 0) {
          // 查到
          res.send({
            code:'200',
            data:doc[0]
          })
        } else {
          // 未查到
          let newChatList = new chatList({
            Fid:Fid
          })
          newChatList.save()
        }
      }
    })
  }
}
