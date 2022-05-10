const { createToken, verifyToken } = require('../../util/token')
const user = require('../model/user')

module.exports = (friendId,token,res)=>{
  let result = verifyToken(token)
  // console.log(result,'aaa')
  if (result.name == 'TokenExpiredError') {
    // 过期了
    res.send({
      code: '401',
      msg: 'TOKEN 过期 请重新登录'
    })
  } else {
    user.find({crazyId:friendId},{password:0,token:0,__v:0,_id:0},(err,doc)=>{
      if(err) {
        res.send({
          code:'402',
          msg:'数据库操作失败'
        })
      } else {
        if(doc.length>0) {
          res.send({
            code:'200',
            data:doc[0]
          })
        } else {
          res.send({
            code:'401',
            msg:'未查到该用户'
          })
        }
      }
    })
  } 
}