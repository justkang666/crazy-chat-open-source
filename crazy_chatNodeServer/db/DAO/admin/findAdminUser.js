const user = require('../../model/user')
const {createToken,verifyToken} = require('../../../util/token') 

module.exports = (data,res)=>{
  user.find(data,(err,result)=>{
    if(err) {
      console.log('数据库操作失败'+err)
    } else{
      if(result.length > 0) {
        // 有匹配内容
        if(result[0].__v === 1) {
          // 权限正确
          res.send({
            code:'200',
            msg:'登陆成功',
            data:{
              token:createToken({email:data.email,crazyId:result[0].crazyId,v:result[0].__v}),
              userInfo:{
                crazyId:result[0].crazyId,
                username:result[0].username,
                regTime:result[0].regTime,
                viaUrl:result[0].viaUrl,
                __v:result[0].__v
              }
            }
            
          })
        } else {
          res.send({
            code:'403',
            msg:'您的权限不够 无法登录',
          })
        }
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