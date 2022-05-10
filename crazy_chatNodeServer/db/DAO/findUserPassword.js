const user = require('../model/user')
const EmailCode = require('../model/emailCode')

module.exports = (data,res)=>{
  // 查询
  EmailCode.find({email:data.email},(error,result)=>{
    if(error) {
      console.log('数据库操作失败')
    } else {
      if(result.length > 0) {
        console.log(11)
        // 有匹配内容
        if(result[0].emailCode == data.emailCode) {
          // 更改密码操作
          user.find({email:data.email},(err,doc)=>{
            if(err){
              res.send({
                code:'402',
                msg:'网络错误'
              })
            } else {
              if(doc) {
                if(doc.length > 0) {
                  console.log(doc[0])
                  user.updateOne(doc[0],{password:data.password},(err,doc)=>{
                    if(err){
                      res.send({
                        code:'401',
                        msg:'修改失败'
                      })
                    } else {
                      res.send({
                        code:'200',
                        msg:'修改成功'
                      })
                    }  
                  })
                } else {
                  res.send({
                    code:'401',
                    msg:'修改失败'
                  })
                }
              } else {
                res.send({
                  code:'401',
                  msg:'修改失败'
                })
              }
              
            }
          })
        } else {
          res.send({
            code:'401',
            msg:'验证码错误'
          })
        }
      } else {
        res.send({
          code:'401',
          msg:'请先获取验证码'
        })
      }
    }
  })
}