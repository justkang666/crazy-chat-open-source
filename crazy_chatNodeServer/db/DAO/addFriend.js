const { createToken, verifyToken } = require('../../util/token')
const friendList = require('../model/friendList')
const customId = require('custom-id')


module.exports = (token,friendId, res) => {
  let result = verifyToken(token)
  // console.log(result,'aaa')
  if (result.name == 'TokenExpiredError') {
    // 过期了
    res.send({
      code: '401',
      msg: 'TOKEN 过期 请重新登录'
    })
  } else {
    let Fid = customId({})
    let myNewdoc = {
      friendId:friendId,
      sendId:result.data.crazyId,
      Fid:Fid,
      state:0
    }

    let friendNewdoc = {
      friendId:result.data.crazyId,
      sendId:result.data.crazyId,
      Fid:Fid,
      state:0
    }
    friendList.find({crazyId:result.data.crazyId, friends: { $elemMatch: { friendId: friendId} } },(err,data)=>{
      if(err) {
        res.send({
          code:'402',
          msg:'数据库操作失败'
        })
       } else {
          if(data.length <= 0) {
            // 证明这里面没有没有这个id的好友
            console.log(data)
            // 把好友保存在我的好友表里
            friendList.updateOne({crazyId:result.data.crazyId},{$push:{friends:myNewdoc}},(err,doc)=>{
              if(err) {
                res.send({
                  code:'402',
                  msg:'数据库操作错误'
                })
              } else {
                // 把好友保存在好友的好友表里
                friendList.updateOne({crazyId:friendId},{$push:{friends:friendNewdoc}},(err,doc)=>{
                  if(err) {
                    res.send({
                      code:'402',
                      msg:'数据库操作错误'
                    })
                  } else {
                    console.log(doc,friendId)
                    res.send({
                      code:'200',
                      msg:'好友请求发送成功'
                    })
                  }
                })
              }
            })
          } else {
            res.send({
              code:'401',
              msg:'您已添加过，或对方添加了您 请到好友申请内查看'
            })
          }
       }

        
        
    })
    
  }
}