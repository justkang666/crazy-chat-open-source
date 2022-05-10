const user = require('../model/user')

module.exports = (data,res)=>{
  const {email,emailCode,password,username} = data
  const newUser = new user({email,emailCode,password,username})
  user.find({email:data.email},(err,result)=>{
    if(err) {
      console.log('数据库操作失败')
    } else{
      if(result.length > 0) {
        res.send({
          code:'401',
          msg:'邮箱已存在'
        })
      } else {
        newUser.save((err,result)=>{
          // console.log(err,result)
          res.send({
            code:'200',
            msg:'注册成功'
          })
        })
        console.log(1)
      }
    }
  })
  
}