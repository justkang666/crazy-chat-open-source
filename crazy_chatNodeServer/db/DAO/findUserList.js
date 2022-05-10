const {createToken,verifyToken} = require('../../util/token') 
const user = require('../model/user')

module.exports = (data,res)=>{
  let reg = new RegExp(data.username)
  user.find({username:reg},{password:0,token:0,__v:0,_id:0},(err,suc)=>{
    if(err) {
      res.send({
        code:'402',
        msg:'网络错误'
      })
    } else {
      if(suc.length > 0) {
        res.send({
          code:'200',
          data:suc
        })
      } else {
        res.send({
          code:'401',
          msg:'未查询到用户'
        })
      }
    }
  })
}