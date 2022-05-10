const user = require('../model/user')
const { createToken, verifyToken } = require('../../util/token')


module.exports = (token, res) => {
  let result = verifyToken(token)
  if (result.name == 'TokenExpiredError') {
    // 过期了
    res.send({
      code: '401',
      msg: 'TOKEN 过期 请重新登录'
    })
  } else {
    user.find({ crazyId: result.data.crazyId },{password:0,_id:0,__v:0,token:0}, (err, suc) => {
      if (err) {
        res.send({
          code: '402',
          msg: '网络错误'
        })
      } else {
        if(suc.length>0) {
          // 有匹配
          res.send({
            code:'200',
            data:suc[0]
          })
        } else {
          res.send({
            code:'401',
            msg:'错误'
          })
        }
      }
    })
    // .populate('parent',{password:0,_id:0,_v:0,token:0})
  }
} 