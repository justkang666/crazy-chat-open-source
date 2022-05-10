const { createToken, verifyToken } = require('../../util/token')
const friendList = require('../model/friendList')


module.exports = (token, res) => {
  let result = verifyToken(token)
  // console.log(result,'aaa')
  if (result.name == 'TokenExpiredError') {
    // 过期了
    res.send({
      code: '401',
      msg: 'TOKEN 过期 请重新登录'
    })
  } else {
    // token 未过期 进行下一步操作
    friendList.find({ crazyId: result.data.crazyId },(err, suc) => {
      if (err) {
        res.send({ code: '402', msg: '网络错误' })
      } else {
        // console.log(suc)
        if (suc.length > 0) {
          // 匹配到
          console.log(suc[0])
          res.send({
            code: '200',
            data: suc[0]
          })
        } else {
          // 未匹配
          // console.log(result.crazyId,11111111111)
          let newFriendList = new friendList({
            crazyId: result.data.crazyId,
            friends: []
          })
          newFriendList.save((err, suc) => {
            if (err) {
              res.send({ code: '402', msg: '网络错误' })
            } else {
              // console.log(suc)
              res.send({ code: '200', data: suc })
            }
          })
        }
      }
    })
  }
}