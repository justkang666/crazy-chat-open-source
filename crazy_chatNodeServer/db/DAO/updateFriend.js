const { createToken, verifyToken } = require('../../util/token')
const friendList = require('../model/friendList')


module.exports = (token, friendId,state, res) => {
  let result = verifyToken(token)
  if (result.name == 'TokenExpiredError') {
    // 过期了
    res.send({
      code: '401',
      msg: 'TOKEN 过期 请重新登录'
    })
  } else {
    // 
    friendList.findOne({crazyId:result.data.crazyId},(err, data) => {
      if(!err) {
        let newData = JSON.parse(JSON.stringify(data))
        newData.friends.forEach(item => {
          if(item.friendId == friendId) {
            item.state = state
          }
        });
        friendList.updateOne(data,newData,(err,doc)=>{
          console.log(doc)
        })
        friendList.findOne({crazyId:friendId},(err, data) => {
          if(!err) {
            let newData = JSON.parse(JSON.stringify(data))
            newData.friends.forEach(item => {
              if(item.friendId == result.data.crazyId) {
                item.state = state
              }
            });
            friendList.updateOne(data,newData,(err,doc)=>{
              if(!err) {
                res.send({
                  code:'200',
                  msg:'修改成功'
                })
              }
            })
            
          } else {
            res.send({
              code:'402',
              msg:'数据库操作失败'
            })
          }
        })

      } else {
        res.send({
          code:'402',
          msg:'数据库操作失败'
        })
      }
      
    })

  }
}