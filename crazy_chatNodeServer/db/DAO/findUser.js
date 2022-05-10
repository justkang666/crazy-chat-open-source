const {createToken,verifyToken} = require('../../util/token') 
const user = require('../model/user')
module.exports = (data,res)=>{
  user.find(data,(err,result)=>{
    if(err) {
      console.log('数据库操作失败'+err)
    } else{
      if(result.length > 0) {
        // 有匹配内容
        res.send({
          code:'200',
          msg:'登陆成功',
          token:createToken({email:data.email,crazyId:result[0].crazyId})
        })
        // console.log('查询成功'+result[0].crazyId)
      } else {
        // 无匹配内容
        res.send({  
          code:'401',
          msg:'登陆失败，密码或邮箱错误',
        })
      }
    }
  })
} 